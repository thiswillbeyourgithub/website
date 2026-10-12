# Generates /llms-full.txt at build time: the raw Markdown of every English
# page (and English publication) concatenated into one file, so it can never
# go stale. A page can opt out with `llms_full: false` in its front matter.
# See https://specification.website/spec/agent-readiness/llms-full-txt/
require "uri"

module LlmsFull
  class Generator < Jekyll::Generator
    safe true
    priority :lowest

    def generate(site)
      pages = site.pages.select do |p|
        p.data["lang"] == "en" && p.ext == ".md" &&
          p.data["sitemap"] != false && p.data["llms_full"] != false
      end
      pages.sort_by! { |p| p.url }
      pubs = site.collections["publications"].docs.select { |d| d.data["lang"] == "en" }

      out = +"# #{site.config['title']}\n\n"
      out << "> Full text of the English pages of #{site.config['url']}, generated at build time. "
      out << "Every page also has a French translation under #{site.config['url']}/fr/.\n\n"
      pages.each do |p|
        # A page whose url is also a directory (e.g. /en) is redirected to /en/, which is what relative links resolve against.
        is_dir = !p.url.end_with?("/") && site.pages.any? { |o| o.url.start_with?("#{p.url}/") }
        url = is_dir ? "#{p.url}/" : p.url
        out << section(site, p.data["title"], url, p.content)
      end
      pubs.each do |d|
        body = [d.data["citation"], d.data["paperurl"], d.content].compact.join("\n\n")
        out << section(site, d.data["title"], d.url, body)
      end

      page = Jekyll::PageWithoutAFile.new(site, site.source, "", "llms-full.txt")
      page.content = out
      page.data["layout"] = nil
      page.data["sitemap"] = false
      page.data["render_with_liquid"] = false
      site.pages << page
    end

    private

    def section(site, title, url, body)
      abs = site.config["url"] + url
      "---\n\n## #{title}\n\nSource: #{abs}\n\n#{clean(body, abs)}\n\n"
    end

    # Drop Liquid and kramdown attribute syntax, make relative links absolute.
    def clean(text, base)
      text = text.gsub(/\{%.*?%\}/m, "").gsub(/\{\{.*?\}\}/m, "").gsub(/\{:[^}]*\}/, "")
      text = text.gsub(/\]\((\.{1,2}\/[^)\s]*)\)/) { "](#{URI.join(base, Regexp.last_match(1))})" }
      # Demote headings two levels so they nest under the "## page title" of each section.
      text = text.gsub(/^(\#{1,4}) /) { "#{Regexp.last_match(1)}## " }
      text.gsub(/\n{3,}/, "\n\n").strip
    end
  end
end
