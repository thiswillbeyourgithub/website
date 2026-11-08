# /// script
# requires-python = ">=3.10"
# dependencies = ["click", "loguru"]
# ///
"""
Generate the website files of the psychiatric consultation checklist.

The sources (trame.md, helper.js, this script, dev.html) live in
`_apps/psy-checklist/` of the website repo: Jekyll skips folders starting with
an underscore, so the raw sources are never published as such. This script
turns them into three generated files, which are committed because the VPS
builds the site from git (deploy.sh rebuilds them and stops if they differ
from what is committed):

1. `_pages/fr/psy-checklist.md`, the French page served at /fr/psy-checklist:
   - front matter keeping it reachable but not advertised (see `common_fields`),
   - a short introduction (INTRO) and a centered button opening the helper,
   - trame.md itself between two empty marker divs (`#trame-start` and
     `#trame-end`), so the page shows the rendered trame and helper.js can
     find it to add a table of contents and collapsible sections (the
     markers are siblings rather than a wrapper because kramdown does not
     parse markdown inside a raw HTML block by default),
   - trame.md again, HTML-escaped, in a hidden `<pre id="trame-src">`, which
     is what helper.js parses (the raw markdown is more predictable than the
     HTML produced by kramdown),
   - a `<script src>` loading the helper.
2. `assets/js/psy-checklist.js`, helper.js with its version filled in (see
   `version()`), copied as is by Jekyll since it has no front matter.
3. `_pages/en/psy-checklist.md`, an English stub served at /en/psy-checklist
   saying the page is not translated yet. It shares the `ref` of the French
   page, which is what makes the site's language selector (masthead) appear
   on both pages, with `lang: fr` and `lang: en`.

Why this shape: the site layouts go through the jekyll-compress-html layout,
which collapses every newline into a space everywhere except inside `<pre>`.
An inlined script then breaks (the first `//` comment swallows the rest of
the code) and so does the raw trame (its parser is line based). Hence the
`<pre>` for the trame, and a separate static script file, which the site CSP
allows ('self' scripts).

"Not advertised" means: `sitemap: false` keeps the pages out of sitemap.xml,
the HTML site map page and llms-full.txt, `noindex: true` adds a robots
noindex meta tag (_includes/head/custom.html), and no other page links to
them. Remove these two fields and add a link on the tools page to advertise it.

A real page is written rather than including trame.md from Jekyll because
trame.md has no front matter and must not get one, and it is needed twice
(rendered, and escaped in the `<pre>`).

Usage (from anywhere, no argument, the outputs are relative to the website repo):
    uv run _apps/psy-checklist/build.py
"""

import html
import subprocess
from pathlib import Path

import click
from loguru import logger

HERE = Path(__file__).resolve().parent
# Root of the website repo (this file is in _apps/psy-checklist/).
SITE = HERE.parents[1]
TRAME = HERE / "trame.md"
HELPER = HERE / "helper.js"
SLUG = "psy-checklist"
FR_PAGE = SITE / "_pages" / "fr" / f"{SLUG}.md"
EN_PAGE = SITE / "_pages" / "en" / f"{SLUG}.md"
SCRIPT = SITE / "assets" / "js" / f"{SLUG}.js"
SCRIPT_URL = f"/assets/js/{SLUG}.js"
# Exact line of helper.js replaced by the version (see version()).
VERSION_LINE = 'const VERSION = "dev";'


def version() -> str:
    """Return the version shown by the helper: date and short hash of the last
    commit touching this folder.

    Derived from git instead of a hand bumped number, so it can never be
    forgotten. Only this folder counts, so unrelated website commits do not
    change the version. " +modifs" flags a build made with uncommitted changes
    in this folder, whose content is then not exactly that commit.

    Returns
    -------
    str
        For example "2026-11-07 8b4f826" or "2026-11-07 8b4f826 +modifs".
    """
    git = ["git", "-C", str(HERE)]
    out = subprocess.run([*git, "log", "-1", "--format=%cs %h", "--", "."], capture_output=True, text=True, check=True)
    dirty = subprocess.run([*git, "status", "--porcelain", "--", "."], capture_output=True, text=True, check=True)
    return out.stdout.strip() + (" +modifs" if dirty.stdout.strip() else "")

# Introduction shown above the button and the table of contents. Kept modest
# on purpose: it is a personal memo shared as is, not a reference. It states
# plainly what the Umami event records (helper.js sends a single event named
# "checklist-psy-open", without any data, each time the helper is opened).
# The first paragraph is a Minimal Mistakes warning notice (kramdown IAL
# "{: .notice--warning}") stating the page is experimental and not meant for
# other people yet; remove it once the checklist and assistant are stable.
INTRO = """\
**Expérimental :** cette page et son assistant sont en cours de construction et ne sont pas encore prêts à être utilisés par quelqu'un d'autre que moi. Le contenu, la structure et le fonctionnement changent encore régulièrement.
{: .notice--warning}

Cette page rassemble ma liste personnelle, volontairement exhaustive, de tout ce que j'ai un jour trouvé utile de demander en consultation de psychiatrie. Tout n'est évidemment pas pertinent dans chaque situation : c'est un aide-mémoire dans lequel piocher, pas un questionnaire à dérouler en entier.

Le bouton ci-dessous ouvre un assistant qui permet de parcourir cette liste au clavier ou à la souris et de rédiger le compte rendu au fur et à mesure (touche « ? » pour la liste des raccourcis). Tout se passe dans le navigateur : ce qui est saisi reste uniquement et entièrement sur votre appareil, rien n'est envoyé nulle part, et tout disparaît au rechargement de la page. Seule l'ouverture de l'assistant est comptée, sans aucun contenu, par l'outil de statistiques anonymes du site (Umami), pour savoir s'il sert à quelqu'un.
"""


def front_matter(fields: list[str]) -> str:
    """
    Build a front matter block.

    Parameters
    ----------
    fields : list[str]
        YAML lines, already formatted.

    Returns
    -------
    str
        The block, between `---` fences, followed by a newline.
    """
    return "\n".join(["---", *fields, "---", ""])


def common_fields(ref: str) -> list[str]:
    """
    Front matter lines shared by the French and English pages.

    `sitemap: false` keeps them out of sitemap.xml, the HTML site map and
    llms-full.txt, `noindex: true` asks search engines not to index them, the
    `ref` (unique to these pages) keeps them out of the language selector of
    other pages, and the empty excerpt separator disables excerpts (Jekyll
    would otherwise render the first paragraph on its own, which can cut
    through a {% raw %} wrapper).

    Parameters
    ----------
    ref : str
        Value of the `ref` field, e.g. "psy-checklist".

    Returns
    -------
    list[str]
        YAML lines.
    """
    return [
        "sitemap: false",
        "noindex: true",
        f"ref: {ref}",
        'excerpt_separator: ""',
        "share: false",
        "related: false",
        "read_time: false",
    ]


def strip_blank_lines(text: str) -> str:
    """
    Remove empty lines.

    kramdown ends a raw HTML block at a blank line, which would make it parse
    the rest of the `<pre>` as markdown. Blank lines carry no meaning for the
    trame parser of helper.js, so removing them is harmless.

    Parameters
    ----------
    text : str
        Text to clean.

    Returns
    -------
    str
        The same text without empty lines.
    """
    return "\n".join(line for line in text.splitlines() if line.strip())


def check_embeddable(name: str, text: str) -> None:
    """
    Fail loudly if `text` would break out of its {% raw %} wrapper.

    Parameters
    ----------
    name : str
        File name, for the error message.
    text : str
        Content that will be wrapped in {% raw %}.

    Raises
    ------
    click.ClickException
        If the content contains a Liquid endraw tag.
    """
    if "endraw" in text.lower():
        raise click.ClickException(f"{name} contains 'endraw', which would break the generated page")


@click.command()
def main() -> None:
    """Write the French page, its script and its English stub into the website repo."""
    trame = TRAME.read_text(encoding="utf-8")
    helper = HELPER.read_text(encoding="utf-8")
    assert helper.count(VERSION_LINE) == 1, f"{VERSION_LINE!r} must appear exactly once in helper.js"
    ver = version()
    helper = helper.replace(VERSION_LINE, f'const VERSION = "{ver}";')
    logger.info(f"version {ver}")
    check_embeddable(name="trame.md", text=trame)

    page = "\n".join(
        [
            front_matter(
                fields=[
                    'title: "Checklist de consultation psychiatrique"',
                    f"permalink: /fr/{SLUG}",
                    "lang: fr",
                    *common_fields(ref=SLUG),
                ]
            ),
            INTRO,
            # Styled by helper.js (class trame-open-btn), not by an inline
            # style attribute, which the site CSP may block.
            '<p class="trame-open-wrap"><button type="button" class="trame-open-btn" data-trame-open>'
            "Ouvrir l'assistant de consultation</button></p>",
            "",
            '<div id="trame-start"></div>',
            "",
            "{% raw %}",
            trame,
            "{% endraw %}",
            "",
            '<div id="trame-end"></div>',
            "",
            '<pre hidden id="trame-src">{% raw %}',
            html.escape(strip_blank_lines(text=trame), quote=False),
            "{% endraw %}</pre>",
            "",
            f'<script src="{SCRIPT_URL}"></script>',
            "",
        ]
    )
    en_page = "\n".join(
        [
            front_matter(
                fields=[
                    'title: "Psychiatric consultation checklist"',
                    f"permalink: /en/{SLUG}",
                    "lang: en",
                    *common_fields(ref=SLUG),
                ]
            ),
            f"Not yet translated to English. The French version is [here](/fr/{SLUG}).",
            "",
        ]
    )
    FR_PAGE.write_text(page, encoding="utf-8")
    SCRIPT.write_text(helper, encoding="utf-8")
    EN_PAGE.write_text(en_page, encoding="utf-8")
    logger.info(f"Wrote {FR_PAGE} ({len(page)} chars), {SCRIPT} ({len(helper)} chars) and {EN_PAGE}")


if __name__ == "__main__":
    main()
