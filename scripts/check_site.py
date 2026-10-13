# /// script
# requires-python = ">=3.10"
# dependencies = ["playwright"]
# ///
"""
End-to-end checks of a built olicorne.org, run against the live site or a local build.

Usage:
    uv run scripts/check_site.py                          # live site
    uv run scripts/check_site.py http://127.0.0.1:4999    # local docker build
    uv run scripts/check_site.py --no-axe --no-firefox    # faster

Crawls sitemap.xml plus every internal link found, then for each page reports:
JS errors and console errors (Chromium and Firefox), CSP violations, failed
subresources, broken internal links and #anchors, WCAG 2.2 AA issues (axe-core,
light and dark), and basic metadata (title, description, canonical, lang,
hreflang, JSON-LD, duplicate ids). Also checks static files (robots, sitemap,
feeds, llms*.txt, security.txt expiry), security headers (https only) and the
interactive widgets (language dropdown, theme toggle, referrer override).
Exits 1 if anything failed.

If playwright complains about missing browsers:
    uv run --with playwright playwright install chromium firefox
"""
import argparse
import collections
import datetime
import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

from playwright.sync_api import sync_playwright

LIVE = "https://olicorne.org"
AXE_URL = "https://cdn.jsdelivr.net/npm/axe-core@4.10.3/axe.min.js"
AXE_CACHE = Path.home() / ".cache" / "check_site" / "axe-4.10.3.min.js"
AXE_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"]
PAGE_EXT = ("", ".html")
# Drafts are only reachable from the owner's IP (Caddy redirects everyone else), so skip them.
SKIP = re.compile(r"/drafts/|draft$")
# Collect CSP violations even in Report-Only mode.
INIT_JS = """
window.__csp = [];
document.addEventListener('securitypolicyviolation', e =>
  window.__csp.push(e.violatedDirective + ' ' + e.blockedURI));
"""

failures = collections.defaultdict(set)  # problem -> set of urls


def fail(problem, url):
    failures[problem].add(url)


def fetch(url, method="GET"):
    """Return (status, headers, body) without raising on HTTP errors."""
    req = urllib.request.Request(url, method=method, headers={"User-Agent": "check_site"})
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return r.status, r.headers, r.read() if method == "GET" else b""
    except urllib.error.HTTPError as e:
        return e.code, e.headers, b""
    except Exception as e:  # noqa: BLE001 network errors are reported as status 0
        return 0, {}, str(e).encode()


def localize(url, base):
    """Map absolute olicorne.org urls (as written in sitemap.xml) to the base under test."""
    return base + url[len(LIVE):] if url.startswith(LIVE) else url


def strip_frag(url):
    return urllib.parse.urldefrag(url)[0]


def is_page(url):
    path = urllib.parse.urlparse(url).path
    return Path(path).suffix in PAGE_EXT


def check_static(base):
    status, _, body = fetch(base + "/sitemap.xml")
    urls = []
    if status != 200:
        fail(f"sitemap.xml status {status}", base)
    else:
        try:
            root = ET.fromstring(body)
            urls = [localize(e.text.strip(), base) for e in root.iter("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")]
        except ET.ParseError as e:
            fail(f"sitemap.xml invalid XML: {e}", base)
    for path in ["/robots.txt", "/llms.txt", "/llms-full.txt", "/feed.xml", "/.well-known/security.txt", "/favicon.ico"]:
        status, _, body = fetch(base + path)
        if status != 200:
            fail(f"status {status}", base + path)
            continue
        text = body.decode("utf-8", "replace")
        if path.endswith(".txt") and re.search(r"\{%|\{\{", text):
            fail("unrendered Liquid in text file", base + path)
        if path == "/feed.xml":
            try:
                ET.fromstring(body)
            except ET.ParseError as e:
                fail(f"feed.xml invalid XML: {e}", base + path)
        if path == "/.well-known/security.txt":
            m = re.search(r"^Expires:\s*(\S+)", text, re.M)
            exp = m and datetime.datetime.fromisoformat(m.group(1).replace("Z", "+00:00"))
            if not exp or exp - datetime.datetime.now(datetime.timezone.utc) < datetime.timedelta(days=60):
                fail("security.txt Expires missing or within 60 days, renew it", base + path)
    return urls


def check_headers(base):
    if not base.startswith("https://"):
        return
    _, headers, _ = fetch(base + "/en/")
    for h in ["Strict-Transport-Security", "X-Content-Type-Options", "X-Frame-Options", "Permissions-Policy", "Link"]:
        if not headers.get(h):
            fail(f"missing header {h}", base)
    if not (headers.get("Content-Security-Policy") or headers.get("Content-Security-Policy-Report-Only")):
        fail("missing header Content-Security-Policy", base)
    for h, v in headers.items():
        if "\n" in v or "\r" in v:
            fail(f"header {h} contains a newline", base)


def page_meta(page, url):
    """Metadata checks that only make sense on real HTML pages."""
    info = page.evaluate("""() => ({
        title: document.title.trim(),
        desc: document.querySelector('meta[name=description]')?.content?.trim() || '',
        canonical: document.querySelector('link[rel=canonical]')?.href || '',
        lang: document.documentElement.lang,
        hreflang: [...document.querySelectorAll('link[rel=alternate][hreflang]')].map(l => l.href),
        jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => s.textContent),
        dupIds: (() => { const c = {}; document.querySelectorAll('[id]').forEach(e => c[e.id] = (c[e.id] || 0) + 1);
                         return Object.keys(c).filter(k => c[k] > 1); })(),
        redirectStub: !!document.querySelector('meta[http-equiv=refresh]'),
    })""")
    if info["redirectStub"]:
        return info
    if not info["title"]:
        fail("empty <title>", url)
    if not info["desc"]:
        fail("missing meta description", url)
    if not info["canonical"]:
        fail("missing canonical", url)
    path = urllib.parse.urlparse(url).path
    for lang in ("en", "fr"):
        if (path == f"/{lang}" or path.startswith(f"/{lang}/")) and not info["lang"].startswith(lang):
            fail(f"<html lang={info['lang']!r}> on a /{lang}/ page", url)
    for raw in info["jsonld"]:
        try:
            json.loads(raw)
        except json.JSONDecodeError as e:
            fail(f"invalid JSON-LD: {e}", url)
    for dup in info["dupIds"]:
        fail(f"duplicate id #{dup}", url)
    return info


def check_widgets(page, base):
    page.goto(base + "/en/", wait_until="load")
    sel = "#lang-selector"
    if page.locator(sel).count():
        page.click(f"{sel} .dropdown-toggle")
        if "active" not in (page.get_attribute(sel, "class") or "") or page.url.endswith("#"):
            fail("language dropdown does not open on click", base + "/en/")
        page.mouse.click(5, 400)
        if "active" in (page.get_attribute(sel, "class") or ""):
            fail("language dropdown does not close on outside click", base + "/en/")
    else:
        fail("language selector not found", base + "/en/")
    before = page.get_attribute("html", "data-theme")
    page.click("#theme-toggle button")
    if page.get_attribute("html", "data-theme") == before:
        fail("theme toggle does not change data-theme", base + "/en/")
    page.goto(base + "/en/?ref=example.com", wait_until="load")
    if page.evaluate("document.referrer") != "http://example.com":
        fail("?ref= referrer override does not work", base + "/en/?ref=example.com")
    page.goto(base + "/en/", wait_until="load")
    try:
        page.evaluate("document.referrer")
    except Exception:  # noqa: BLE001
        fail("reading document.referrer throws", base + "/en/")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("base", nargs="?", default=LIVE)
    ap.add_argument("--no-axe", action="store_true", help="skip accessibility checks")
    ap.add_argument("--no-firefox", action="store_true", help="only check JS errors in Chromium")
    ap.add_argument("--max-pages", type=int, default=300)
    args = ap.parse_args()
    base = args.base.rstrip("/")
    host = urllib.parse.urlparse(base).netloc

    check_headers(base)
    found_by = {u: "sitemap.xml" for u in check_static(base) + [base + "/en/", base + "/fr/"]}
    queue = list(found_by)
    seen_pages, html_pages, other_links, anchors, ids = set(), set(), set(), [], {}

    axe = None
    if not args.no_axe:
        if not AXE_CACHE.exists():
            AXE_CACHE.parent.mkdir(parents=True, exist_ok=True)
            AXE_CACHE.write_bytes(fetch(AXE_URL)[2])
        axe = AXE_CACHE.read_text()

    with sync_playwright() as p:
        browsers = [p.chromium.launch()] + ([] if args.no_firefox else [p.firefox.launch()])
        chromium = browsers[0]

        # Crawl with Chromium: discover pages, collect errors, links and ids.
        ctx = chromium.new_context()
        ctx.add_init_script(INIT_JS)
        page = ctx.new_page()
        current = {"url": ""}
        page.on("pageerror", lambda e: fail(f"[chromium] JS error: {str(e)[:150]}", current["url"]))
        page.on("console", lambda m: m.type == "error" and "Failed to load resource" not in m.text
                and fail(f"[chromium] console error: {m.text[:150]}", current["url"]))
        page.on("response", lambda r: r.status >= 400 and r.url != current["url"]
                and fail(f"subresource {r.status}: {r.url}", current["url"]))
        while queue and len(seen_pages) < args.max_pages:
            url = strip_frag(queue.pop(0))
            if url in seen_pages or SKIP.search(urllib.parse.urlparse(url).path):
                continue
            seen_pages.add(url)
            current["url"] = url
            try:
                resp = page.goto(url, wait_until="load", timeout=30000)
            except Exception as e:  # noqa: BLE001
                if "Download is starting" in str(e):  # extensionless file, e.g. /files/PGP_public_key
                    other_links.add((url, url))
                else:
                    fail(f"failed to load: {str(e)[:100]}", url)
                continue
            if resp and resp.status >= 400:
                fail(f"page status {resp.status} for {url}, linked", found_by.get(url, "?"))
                continue
            if "text/html" not in (resp.headers.get("content-type", "") if resp else ""):
                continue
            html_pages.add(url)
            page.mouse.wheel(0, 20000)
            page.wait_for_timeout(800)
            for v in page.evaluate("window.__csp || []"):
                fail(f"CSP violation: {v}", url)
            final = strip_frag(page.url)
            page_meta(page, url)
            ids[final] = set(page.evaluate("[...document.querySelectorAll('[id],[name]')].map(e => e.id || e.name)"))
            for href in page.evaluate("[...document.querySelectorAll('a[href]')].map(a => a.href)"):
                parsed = urllib.parse.urlparse(href)
                if parsed.netloc != host or parsed.scheme not in ("http", "https"):
                    continue
                if parsed.fragment:
                    anchors.append((url, href))
                target = strip_frag(href)
                if is_page(target) and target not in seen_pages:
                    found_by.setdefault(target, url)
                    queue.append(target)
                elif not is_page(target):
                    other_links.add((url, target))
        ctx.close()

        # Non-page internal links (files, images, pdfs).
        for src, target in sorted(other_links):
            if SKIP.search(urllib.parse.urlparse(src).path):
                continue
            status = fetch(target, "HEAD")[0]
            if status >= 400 or status == 0:
                fail(f"broken link to {target} (status {status})", src)

        # #anchors must exist on their target page.
        for src, href in anchors:
            target, frag = urllib.parse.urldefrag(href)
            frag = urllib.parse.unquote(frag)
            if frag and target in ids and frag not in ids[target]:
                fail(f"broken anchor {href}", src)

        pages = sorted(html_pages)

        # Same JS checks in the other browsers.
        for browser in browsers[1:]:
            name = browser.browser_type.name
            ctx = browser.new_context()
            page = ctx.new_page()
            page.on("pageerror", lambda e, n=name: fail(f"[{n}] JS error: {str(e)[:150]}", current["url"]))
            for url in pages:
                current["url"] = url
                try:
                    page.goto(url, wait_until="load", timeout=30000)
                    page.wait_for_timeout(300)
                except Exception as e:  # noqa: BLE001
                    fail(f"[{name}] failed to load: {str(e)[:100]}", url)
            ctx.close()

        # Interactive widgets.
        ctx = chromium.new_context()
        page = ctx.new_page()
        page.on("pageerror", lambda e: fail(f"[chromium] JS error during widget checks: {str(e)[:150]}", page.url))
        check_widgets(page, base)
        ctx.close()

        # Accessibility, light and dark.
        if axe:
            for scheme in ("light", "dark"):
                ctx = chromium.new_context(color_scheme=scheme)
                page = ctx.new_page()
                for url in pages:
                    page.goto(url, wait_until="load")
                    page.wait_for_timeout(1200)  # let intro animations finish, they skew contrast
                    page.add_script_tag(content=axe)
                    res = page.evaluate("t => axe.run({runOnly: t})", AXE_TAGS)
                    for v in res["violations"]:
                        fail(f"a11y ({scheme}) {v['id']}: {v['nodes'][0]['target']}", url)
                ctx.close()

        for b in browsers:
            b.close()

    print(f"Checked {len(pages)} pages and {len(other_links)} file links on {base}")
    if not failures:
        print("All checks passed")
        return 0
    print(f"{len(failures)} problems:")
    for problem, urls in sorted(failures.items()):
        shown = sorted(urls)
        more = f" (+{len(shown) - 3} more)" if len(shown) > 3 else ""
        print(f"- {problem}\n    on {', '.join(shown[:3])}{more}")
    return 1


if __name__ == "__main__":
    sys.exit(main())
