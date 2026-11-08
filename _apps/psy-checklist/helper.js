/*
 * Trame helper: keyboard (and mouse) driven assistant that walks through every
 * notion of trame.md and builds a "compte rendu" in real time.
 *
 * Design decisions:
 * - trame.md stays the single source of truth. This file parses the raw
 *   markdown text (not the HTML rendered by Jekyll/kramdown) because the raw
 *   text is predictable: kramdown would turn quotes into smart quotes and
 *   "*(...)*" into <em>, which would make the parser fragile.
 * - Everything runs in the browser, nothing is sent anywhere, and the answers
 *   only live in memory (a reload clears them). This is deliberate: the answers
 *   are patient data and the page may be used on a shared hospital computer.
 *   Only UI preferences (key mode, collapsed report pane or toolbar) are
 *   stored in localStorage.
 * - Every action is defined once in ACTIONS. Keyboard bindings and toolbar
 *   buttons both point to these action ids, so anything doable with the keys is
 *   doable with the mouse, and the help screen is generated from the same
 *   tables (no duplicated list of shortcuts to keep in sync).
 * - Two key modes: "basic" (arrows, Enter, Delete, +, -, Insert, Ctrl+Z...) and
 *   "vim" (basic keys plus hjkl, HJKL, a, x, n, o, O, /, u, y, gg, G...). Vim mode is
 *   a superset so arrows keep working; basic mode leaves letters inert so a stray
 *   keypress never changes the compte rendu.
 *
 * Usage:
 *   TrameHelper.open(markdownText)  // opens the overlay (parses on first call)
 *   Auto wiring: if the page contains an element with id="trame-src" (a hidden
 *   <pre> holding the raw trame markdown, see build.py for why a <pre>)
 *   then every element with a data-trame-open attribute opens the helper on it.
 *   If the page holds the rendered trame between #trame-start and #trame-end
 *   (see build.py), enhancePage() folds it into sections with a table of
 *   contents.
 * The header fields (date, moment, sex, people present) give the opening
 * sentence of the compte rendu, see headerText(). They are shown in the list,
 * right under the section marked "<!-- entete -->" (in trame.md:
 * "## Informations administratives <!-- entete -->"), or at the top of the
 * list if no section has the marker.
 *
 * Code layout, in this order: parsing (trame.md -> items), output (items ->
 * compte rendu text, pure functions), state and navigation, actions (the only
 * place that changes answers), keys, rendering (state -> HTML, no state
 * change), DOM setup (CSS, event wiring), page enhancement (the rendered
 * trame, independent of the overlay). New features should fit one of these.
 *
 * Trame format understood (see trame.md):
 *   "# Group" then "## Section"         -> two levels of sections, e.g.
 *                                          "# Mode de vie" / "## Sommeil"
 *   "# Title <!-- checklist -->"        -> reminder shown as plain text, never
 *                                          in the compte rendu (e.g. the
 *                                          introduction of the consultation)
 *   "## Title <!-- rare -->"            -> rarely used section, folded when the
 *                                          assistant opens (unfold with a click)
 *   "## Title <!-- entete -->"          -> section showing the header fields
 *   "## Title <!-- urgence suivi -->"   -> section kept open by these
 *                                          consultation presets (see
 *                                          PRESETS); tags combine, e.g.
 *                                          "<!-- entete urgence suivi -->"
 *   "- label : field1 / field2 / ..."   -> notion with fields
 *   "- a / b / c" (no " : ")            -> notion made only of fields
 *   indentation by 4 spaces              -> sub notion (depth 1, 2, ...)
 *     Sub notions are conditional: they stay hidden until their parent notion
 *     is added (as is, with text or with a picked field), so a negative answer
 *     ("pas d'arrêt du traitement") skips all its follow-up questions. The
 *     "zh" (vim) / "*" key or the eye button shows the hidden steps, dimmed.
 *   sections can be folded (Space, "za", or the triangle) to hide them;
 *   folding a group hides its sections too.
 *   A section with nothing below it (e.g. "# Motif de consultation") is
 *   filled by typing a text on its title.
 *   HTML comments (invisible on the rendered page) carry tooltips:
 *     - a multi line block starting with "<!-- glossaire", one
 *       "terme : définition" per line (variants as "terme | variante : déf"),
 *       gives a definition to every label or field containing the term, e.g.
 *       "tachypsychie : accélération du cours de la pensée". Several blocks
 *       are allowed, typically one per section near the terms it defines.
 *       A definition must not contain "--" (it would end the HTML comment).
 *     - a trailing comment on a notion line, "- tristesse : ... <!-- note -->",
 *       is a note shown as the tooltip of that notion.
 *     - any other comment is ignored.
 *   Tooltips show on mouse hover and on long press (touch screens).
 *   "/" and " : " inside parentheses are ignored when splitting, and
 *   parenthesised parts are shown as hints but dropped from the compte rendu.
 *   So a label entirely in parentheses outputs only the answer:
 *   "- (Nom et prénom)" with "Jean Martin" typed gives "Jean Martin", and
 *   "    - (contrat) : CDI / CDD" with CDI picked gives "CDI".
 *   Sub notions are chained into the line of their top level notion, so the
 *   compte rendu reads as a sentence (see notionText), e.g.
 *     - Travail
 *         - (activité) : en activité / sans activité
 *         - (temps de travail) : temps plein / mi-temps thérapeutique
 *         - arrêts de travail prolongés
 *         - aime son travail
 *   gives "- Travail : en activité, mi-temps thérapeutique, pas d'arrêts de
 *   travail prolongés, aime son travail".
 *
 * Writing conventions of trame.md (not enforced by the parser, they keep the
 * file predictable):
 *   - "#" is a part of the consultation ("# Antécédents"), in capitals in the
 *     compte rendu; "##" is a topic inside it ("## Sommeil"). A part with a
 *     single topic has no "##" (e.g. "# Addictologie").
 *   - a top level line is one question, "- Label : options", the label
 *     starting with a capital ("- Travail : en activité / ..."); a yes/no
 *     question or a product may be a bare label ("- Idées suicidaires",
 *     "- Tabac"). No line made only of options: give it a label.
 *   - an indented line is a follow-up detail of the line above, starting with
 *     a lowercase letter unless it is an acronym, usually named after one of
 *     the parent options ("    - ressources : salaire / AAH / ...").
 *   - a long list of options mixing several questions is better split into
 *     indented one-question lines with a parenthesised label
 *     ("    - (contrat) : CDI / CDD / ..."), which chain into a sentence.
 *   - no en or em dashes (U+2013, U+2014): use " : ", "/" or parentheses.
 */
(function () {
  "use strict";

  /* Version shown in the help screen and next to the key mode, so a printed or
   * shared report can be matched to the trame that produced it. "dev" when the
   * file is served as is (dev.html); build.py replaces this exact line
   * with the date and short hash of the last commit touching its folder, plus
   * " +modifs" if the working tree had uncommitted changes, ex:
   * "2026-11-07 8b4f826". Keep the line exactly as is or the build fails. */
  const VERSION = "dev";

  // ------------------------------------------------------------------ parsing

  /* Consultation presets: each folds the sections that type of consultation
   * will probably not need (still unfolded with a click). Which sections a
   * preset keeps is written in trame.md, as a tag on the heading
   * ("## Sommeil <!-- urgence suivi -->"), so this table only names them;
   * "exhaustif" keeps everything, rare sections included. Applied by
   * applyPreset(), one toolbar button each (action id "preset-<id>"), vim keys
   * "z 1", "z 2"... in this order. */
  const PRESETS = {
    exhaustif: { label: "Consultation exhaustive", short: "Ex", tip: "Déplie toutes les sections, y compris les sections rares." },
    urgence: { label: "Consultation d'urgence", short: "Urg", tip: "Ne garde dépliées que les sections utiles en urgence (marquées « urgence » dans la trame : motif, histoire de la maladie, suicidologie, évaluation clinique, traitements actuels, conclusion...) ; les autres restent dépliables d'un clic." },
    suivi: { label: "Consultation de suivi", short: "Suivi", tip: "Ne garde dépliées que les sections qui évoluent d'une consultation à l'autre (marquées « suivi » dans la trame : sommeil, alimentation, fonctionnement, consommations, traitements actuels, état clinique...) ; les autres restent dépliables d'un clic." },
  };

  /* Split `str` on `sep`, ignoring separators nested inside parentheses, so that
   * "moyen (lame / brûlure) / gravité" gives ["moyen (lame / brûlure)", "gravité"]. */
  function splitTop(str, sep, maxSplits) {
    const out = [];
    let depth = 0;
    let start = 0;
    for (let i = 0; i < str.length; i++) {
      const c = str[i];
      if (c === "(") depth++;
      else if (c === ")") depth = Math.max(0, depth - 1);
      else if (depth === 0 && str.startsWith(sep, i) && (maxSplits === undefined || out.length < maxSplits)) {
        out.push(str.slice(start, i));
        start = i + sep.length;
        i += sep.length - 1;
      }
    }
    out.push(str.slice(start));
    return out.map((s) => s.trim()).filter((s) => s.length > 0);
  }

  /* Remove markdown emphasis markers, which only matter for the rendered page. */
  function stripMarkdown(s) {
    return s.replace(/\*+/g, "").replace(/\s+/g, " ").trim();
  }

  /* Text used in the compte rendu: hints in parentheses are dropped, e.g.
   * "moyen (lame, brûlure, coups)" -> "moyen". */
  function clean(s) {
    // Gender marks follow the sex chosen in the header: "s'est renseigné(e)"
    // gives "s'est renseignée" for "f" (femme); for "m" (homme) and "n" (non
    // pertinent) the "(e)" is simply
    // dropped with the other parentheses.
    if (S.header.sex === "f") s = s.replace(/\(e\)/g, "e");
    return s.replace(/\s*\([^)]*\)/g, "").replace(/\s+/g, " ").trim();
  }

  /* Glossary lookup: definitions of every glossary term found in `text`.
   * Matching ignores case and accents, needs word boundaries (so "manie" does
   * not match "maniérisme") and accepts a plural "s" or "x", e.g. the term
   * "hallucination" matches "hallucinations auditives". Returns the
   * definitions as "Terme : définition" lines, or "" when none matches. */
  function lookup(glossary, text) {
    const hay = norm(text);
    return glossary
      .filter((g) => g.res.some((re) => re.test(hay)))
      .map((g) => `${capitalize(g.label)} : ${g.def}`)
      .join("\n");
  }

  /* Glossary entry from a "terme | variante : définition" line, or null. */
  function glossaryEntry(line) {
    const parts = splitTop(line.trim(), " : ", 1);
    if (parts.length < 2) return null;
    const terms = parts[0].split("|").map((t) => t.trim()).filter(Boolean);
    const res = terms.map((t) => {
      const escaped = norm(t).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return new RegExp(`(^|[^a-z0-9])${escaped}[sx]?([^a-z0-9]|$)`);
    });
    return { label: terms[0], def: parts[1], res };
  }

  /* Parse trame.md into a flat list of items. A flat list (instead of a tree)
   * keeps navigation trivial: up/down is just index -1/+1.
   * Item shapes:
   *   {kind: "section", level, title, text, collapsed, head}
   *     head: true on the section marked "<!-- entete -->" (header fields).
   *     level: 1 for "# Mode de vie", 2 for "## Sommeil" (a sub section of the
   *     previous level 1 section). Deeper headings count as level 2.
   *     collapsed starts true for a heading marked "<!-- rare -->".
   *     presets: ids of PRESETS tagged on the heading, e.g. ["urgence"].
   *   {kind: "notion", depth, raw, label, fields: [{name, picked, neg, value}], state, text}
   *     state: "pending" | "as_is" | "negative" | "excluded"
   *   {kind: "free", depth, text}   (free text inserted between notions)
   *   {kind: "checklist", title, lines: [{depth, text}]}
   *     A heading marked "<!-- checklist -->", e.g.
   *     "# Introduction de la consultation <!-- checklist -->": a reminder of
   *     things to do before or after the consultation. Its bullets are shown
   *     as plain text, cannot be selected and never reach the compte rendu.
   * Example: "# Mode de vie\n## Sommeil\n- endormissement" gives
   *   [{kind: "section", level: 1, title: "Mode de vie"},
   *    {kind: "section", level: 2, title: "Sommeil"},
   *    {kind: "notion", depth: 0, label: "endormissement", ...}] */
  function parseTrame(md) {
    const items = [];
    const glossary = [];
    let comment = null; // inside a multi line comment: "glossaire" or "other"
    let checklist = null; // the checklist item collecting the current lines, if any
    for (let line of md.split(/\r?\n/)) {
      if (comment) {
        const end = line.indexOf("-->");
        const body = end >= 0 ? line.slice(0, end) : line;
        if (comment === "glossaire" && glossaryEntry(body)) glossary.push(glossaryEntry(body));
        if (end >= 0) comment = null;
        continue;
      }
      const opening = line.trim().match(/^<!--\s*(glossaire)?/i);
      if (opening) {
        if (!line.includes("-->")) comment = opening[1] ? "glossaire" : "other";
        continue;
      }
      // Trailing comments are notes of the notion written on the same line.
      const notes = [];
      line = line.replace(/<!--([\s\S]*?)-->/g, (_, c) => (notes.push(c.trim()), ""));
      if (!line.trim()) continue;
      const heading = line.match(/^(#+)\s+(.*)$/);
      if (heading) {
        const title = stripMarkdown(heading[2]);
        checklist = notes.includes("checklist") ? { kind: "checklist", title, lines: [] } : null;
        // Several tags may share one comment: "<!-- entete urgence suivi -->".
        const tags = notes.join(" ").split(/\s+/);
        items.push(
          checklist || {
            kind: "section",
            level: Math.min(heading[1].length, 2),
            title,
            text: "",
            collapsed: tags.includes("rare"),
            head: tags.includes("entete"),
            presets: tags.filter((t) => t in PRESETS),
          }
        );
        continue;
      }
      const expanded = line.replace(/\t/g, "    ");
      const indent = expanded.match(/^ */)[0].length;
      const bullet = expanded.trim().match(/^[-*+]\s+(.*)$/);
      const raw = stripMarkdown(bullet ? bullet[1] : expanded.trim());
      if (checklist) {
        checklist.lines.push({ depth: Math.floor(indent / 4), text: raw });
        continue;
      }
      // A notion before any heading still needs a section for the output.
      if (!items.length) items.push({ kind: "section", level: 1, title: "", text: "", collapsed: false });
      const head = splitTop(raw, " : ", 1);
      let label, fieldPart;
      if (head.length === 2) {
        [label, fieldPart] = head;
      } else {
        label = "";
        fieldPart = raw;
      }
      let names = splitTop(fieldPart, " / ");
      // A line without " : " and without " / " is a single statement, not a
      // list of fields: keep it as the label so it reads naturally.
      if (!label && names.length < 2) {
        label = raw;
        names = [];
      }
      items.push({
        kind: "notion",
        depth: Math.floor(indent / 4),
        raw,
        label,
        fields: names.map((name) => ({ name, picked: false, neg: false, value: "" })),
        state: "pending",
        text: "",
        note: notes.join("\n"),
      });
    }
    // Tooltips are resolved once here rather than at every render: the glossary
    // can be anywhere in the file and the matching runs a regex per term.
    for (const it of items) {
      if (it.kind !== "notion") continue;
      it.tip = [it.note, lookup(glossary, it.label)].filter(Boolean).join("\n");
      for (const f of it.fields) f.tip = lookup(glossary, f.name);
    }
    return items;
  }

  // ------------------------------------------------------------------ output

  /* clean(), but a text entirely in parentheses keeps its words: "(Nom et
   * prénom)" gives "Nom et prénom". Used where an empty text would be
   * meaningless (a negation, a notion added as is). */
  const bare = (s) => clean(s) || clean(s.replace(/[()]/g, ""));

  const lowerFirst = (s) => (s ? s[0].toLowerCase() + s.slice(1) : s);

  function capitalize(s) {
    return s ? s[0].toUpperCase() + s.slice(1) : s;
  }

  /* French negation with elision: "idées suicidaires" -> "Pas d'idées
   * suicidaires", "contact" -> "Pas de contact". The trailing "?" of question
   * style notions is dropped. The result can always be refined with free text. */
  function negate(s) {
    const t = bare(s).replace(/\s*\?\s*$/, "");
    const lower = t ? t[0].toLowerCase() + t.slice(1) : t;
    return /^[aeiouyhâàäéèêëîïôöûüœ]/i.test(lower) ? `Pas d'${lower}` : `Pas de ${lower}`;
  }

  function notionIncluded(n) {
    if (n.state === "excluded") return false;
    return n.state !== "pending" || n.text !== "" || n.fields.some((f) => f.picked);
  }

  /* Text of a notion in the compte rendu. `subs` are the texts of its sub
   * notions (see phraseOf), chained after its own answers with ", " so the
   * line reads as a sentence. `top` is true for the notion starting the line:
   *   top:    "Médecin traitant : nom : Dr X, coordonnées"
   *           "Travail : en activité, CDI, pas d'arrêts de travail prolongés"
   *   nested: "souffrance au travail (surcharge, conflit)", "CDI" (label in
   *           parentheses: answers only), "pas d'horaires décalés" (negative),
   *           "aime son travail" (as is, a trailing "?" dropped).
   * A top label in parentheses gives the answers alone, e.g. "- (Nom et
   * prénom)" with "Jean Martin" typed gives "Jean Martin". */
  function notionText(n, subs = [], top = true) {
    const parts = n.fields
      .filter((f) => f.picked)
      .map((f) => (f.neg ? negate(f.name).toLowerCase() : f.value ? `${clean(f.name)} : ${f.value}` : clean(f.name)));
    if (n.text) parts.push(n.text);
    const all = [...parts, ...subs];
    const label = clean(n.label);
    if (n.state === "negative" && !parts.length) {
      const neg = negate(n.label || n.raw);
      return top ? neg : lowerFirst(neg);
    }
    const alone = bare(n.raw).replace(/\s*\?\s*$/, ""); // nothing picked nor typed
    if (top) {
      if (!label) return capitalize(all.length ? all.join(", ") : alone);
      const prefix = n.state === "negative" ? negate(n.label) : capitalize(label);
      return all.length ? `${prefix} : ${all.join(", ")}` : prefix;
    }
    if (!label) return all.length ? all.join(", ") : lowerFirst(alone);
    const head = n.state === "negative" ? lowerFirst(negate(n.label)) : label.replace(/\s*\?\s*$/, "");
    return all.length ? `${head} (${all.join(", ")})` : head;
  }

  /* Index of the parent notion of every item (-1 at the top of a section),
   * from the indentation. Free texts get a parent too but are never one.
   * Example: [section, "Travail" (depth 0), "(contrat)" (depth 1), "Loisirs"
   * (depth 0)] gives [-1, -1, 1, -1]. Shared by visibility() and
   * buildReport() so both read the same tree. */
  function notionParents(items) {
    const parent = new Array(items.length).fill(-1);
    let stack = []; // ancestor notions of the current item, outermost first
    items.forEach((it, i) => {
      if (it.kind === "section" || it.kind === "checklist") return void (stack = []);
      while (stack.length && items[stack[stack.length - 1]].depth >= it.depth) stack.pop();
      if (stack.length) parent[i] = stack[stack.length - 1];
      if (it.kind === "notion") stack.push(i);
    });
    return parent;
  }

  /* Text of notion i with its answered sub notions chained in (recursively),
   * or "" if nothing in it was answered. A negative or excluded notion hides
   * its sub notions in the list, so their old answers are left out too. */
  function phraseOf(items, kids, i, top) {
    const n = items[i];
    const closed = n.state === "negative" || n.state === "excluded";
    const subs = closed ? [] : kids[i].map((j) => phraseOf(items, kids, j, false)).filter(Boolean);
    if (!notionIncluded(n) && !subs.length) return "";
    return notionText(n, subs, top);
  }

  /* First line of the compte rendu, e.g. with
   * {date: "01/02/2026", moment: "matin", present: "l'interne X, la Dre Y"}:
   * "Entretien du 01/02/2026 matin, avec l'interne X, la Dre Y :".
   * An empty moment or present is left out. The patient is not named here
   * (implied); the sex field only drives the gender marks, see clean(). */
  function headerText(h) {
    return `Entretien du ${h.date}${h.moment ? ` ${h.moment}` : ""}${h.present ? `, avec ${h.present}` : ""} :`;
  }

  /* Section title as written in the compte rendu: level 1 in capitals so the
   * two levels stay distinct in plain text, e.g. "MODE DE VIE :" then
   * "Sommeil :". */
  const headingText = (sec) => `${sec.level === 1 ? sec.title.toUpperCase() : sec.title} :`;

  /* Build the compte rendu as a list of {idx, text, heading?} lines. Keeping
   * the index of the source item lets the preview jump back to a notion when a
   * line is clicked. `heading` is the section level (1 or 2) on title lines.
   * Section titles are written lazily, just before the first line of content
   * below them, so empty sections (and groups whose sub sections are all
   * empty) are left out. Checklists are never written. `header` (optional,
   * see headerText) adds the opening sentence.
   * Example: answering only "endormissement" under "# Mode de vie / ## Sommeil"
   * gives the texts ["MODE DE VIE :", "Sommeil :", "- Endormissement"].
   * One line per top level notion: its sub notions are chained into it (see
   * phraseOf), the line keeping the index of the top level notion. */
  function buildReport(items, header) {
    // idx -1: the header line has no source item (clicking it opens the header fields).
    const out = header ? [{ idx: -1, text: headerText(header) }] : [];
    let open = []; // sections containing the current item, outermost first: {idx, sec, written}
    const write = (line) => {
      for (const o of open) {
        if (o.written) continue;
        o.written = true;
        // A blank line between top level groups only, to keep the text compact.
        if (o.sec.level === 1 && out.length) out.push({ idx: o.idx, text: "" });
        if (o.sec.title) out.push({ idx: o.idx, text: headingText(o.sec), heading: o.sec.level });
      }
      out.push(line);
    };
    const parent = notionParents(items);
    const kids = items.map(() => []); // direct sub notions of each notion
    items.forEach((it, i) => it.kind === "notion" && parent[i] >= 0 && kids[parent[i]].push(i));
    items.forEach((it, idx) => {
      if (it.kind === "section") {
        open = open.filter((o) => o.sec.level < it.level);
        open.push({ idx, sec: it, written: false });
        if (it.text) write({ idx, text: it.text });
      } else if (it.kind === "checklist") {
        open = []; // what follows a checklist is not inside the previous section
      } else if (it.kind === "free") {
        if (it.text) write({ idx, text: "  ".repeat(it.depth) + it.text });
      } else if (parent[idx] < 0) {
        const text = phraseOf(items, kids, idx, true);
        if (text) write({ idx, text: "- " + text });
      }
    });
    return out;
  }

  // ------------------------------------------------------------------ state

  const S = {
    items: null,
    cur: 0, // index in items
    field: -1, // -1 = the notion itself, otherwise index of the selected field
    undo: [],
    lastSearch: "",
    mode: localStorage.getItem("trame-helper-mode") || "basic",
    pendingKey: "", // first key of a vim two key sequence ("g g", "z h"...)
    showHidden: false, // show the sub notions hidden because their parent was not added
    preset: null, // id of the last applied PRESETS entry, shown next to the key mode
    tour: null, // {i, saved} while the tutorial runs, see TOUR
    md: "", // raw trame, kept so the tutorial can start from a blank copy
    // Collapsed panes, e.g. to give the whole screen to the list on a phone, or
    // to drop the buttons on a tablet used with a keyboard.
    hideReport: localStorage.getItem("trame-helper-hide-report") === "1",
    hideBar: localStorage.getItem("trame-helper-hide-bar") === "1",
    prompt: null, // {label, onDone} while the text input bar is open
    root: null,
    // Opening sentence of the compte rendu, edited in the header row. Kept in
    // memory only, like the answers. Date prefilled with today, as DD/MM/YYYY.
    header: { date: new Date().toLocaleDateString("fr-FR"), moment: "", sex: "n", present: "" },
  };

  const report = () => buildReport(S.items, S.header);

  function snapshot() {
    S.undo.push(JSON.stringify({ items: S.items, cur: S.cur, field: S.field }));
    if (S.undo.length > 300) S.undo.shift();
  }

  const cur = () => S.items[S.cur];

  /* A notion "opens" its sub notions once it is added in a positive way: as is,
   * with text, or with at least one picked field. Pending, negative and excluded
   * notions keep them closed, e.g. negating "arrêts du traitement ?" hides the
   * "motif" and "conséquences" follow-ups. */
  function isOpen(n) {
    return n.state !== "negative" && n.state !== "excluded" && notionIncluded(n);
  }

  /* Visibility of every item, computed in one pass from the indentation, so it
   * always reflects the current answers (nothing to keep in sync on edits).
   * Returns {vis, kids, nest}:
   *   vis[i]  = "ok" (shown), "hidden" (a parent notion is not open),
   *             "folded" (an enclosing section is collapsed; a level 2 section
   *             is folded when its level 1 section is) or "static" (a
   *             checklist: displayed but never selected).
   *   kids[i] = number of sub notions below notion i, shown as "+n" while they
   *             are hidden, so the user knows there is more behind.
   *   nest[i] = number of sections containing item i (0 to 2), used to indent
   *             the notions of a "## Sommeil" below their title.
   * Example: items [section, "observance" (depth 0, pending), "motif"
   * (depth 1)] give vis ["ok", "ok", "hidden"] and kids [0, 1, 0]. Free texts
   * are never "hidden": the user typed them, they must stay reachable. */
  function visibility() {
    const vis = new Array(S.items.length);
    const kids = new Array(S.items.length).fill(0);
    const nest = new Array(S.items.length).fill(0);
    let secs = []; // sections containing the current item, outermost first
    const parent = notionParents(S.items);
    // reach[i]: notion i is open and not under a closed one, so its sub notions show.
    const reach = new Array(S.items.length).fill(false);
    const folded = () => secs.some((s) => s.collapsed);
    S.items.forEach((it, i) => {
      if (it.kind === "section" || it.kind === "checklist") {
        // A checklist acts as a level 1 heading: it ends the previous group.
        secs = secs.filter((s) => s.level < (it.level || 1));
        vis[i] = it.kind === "checklist" ? "static" : folded() ? "folded" : "ok";
        if (it.kind === "section") secs.push(it);
        return;
      }
      nest[i] = secs.length;
      const closed = parent[i] >= 0 && !reach[parent[i]];
      vis[i] = folded() ? "folded" : closed && it.kind === "notion" ? "hidden" : "ok";
      if (it.kind !== "notion") return;
      for (let a = parent[i]; a >= 0; a = parent[a]) kids[a]++;
      reach[i] = isOpen(it) && !closed;
    });
    return { vis, kids, nest };
  }

  /* Whether item i is displayed and reachable by the navigation keys. */
  const shown = (vis, i) => vis[i] === "ok" || (vis[i] === "hidden" && S.showHidden);

  /* Move by `delta` displayed items, skipping hidden and folded ones. */
  function move(delta) {
    const { vis } = visibility();
    const step = Math.sign(delta);
    let i = S.cur;
    for (let n = Math.abs(delta); n > 0; n--) {
      let j = i + step;
      while (j >= 0 && j < S.items.length && !shown(vis, j)) j += step;
      if (j < 0 || j >= S.items.length) break;
      i = j;
    }
    S.cur = i;
    S.field = -1;
  }

  /* Up / down keys. The fields of the selected notion are shown one per line
   * (see renderRow), so going down walks through them like through the rows:
   * label, field 0, field 1... then the next row. Going up enters the row above
   * on its last field. Example: on "Travail" (fields ["en activité", "sans
   * activité"]), down goes label -> "en activité" -> "sans activité" -> next
   * row. move() stays item level for the actions that "pass to the next
   * notion" after a decision. */
  function step(dir) {
    const it = cur();
    const n = it.kind === "notion" ? it.fields.length : 0;
    if (dir > 0 && S.field < n - 1) return void S.field++;
    if (dir < 0 && S.field > -1) return void S.field--;
    move(dir);
    if (dir < 0 && cur().kind === "notion") S.field = cur().fields.length - 1;
  }

  /* Indices of the sections containing item i, innermost first (a section
   * contains itself). E.g. for a notion under "## Sommeil" of "# Mode de vie":
   * [index of Sommeil, index of Mode de vie]. Empty for a checklist. */
  function sectionsOf(i) {
    const out = [];
    let level = Infinity;
    for (let j = i; j >= 0 && level > 1; j--) {
      const it = S.items[j];
      if (it.kind === "checklist") break;
      if (it.kind === "section" && it.level < level) {
        out.push(j);
        level = it.level;
      }
    }
    return out;
  }

  /* Index of the innermost section containing item i (i itself if it is one). */
  const sectionOf = (i) => (sectionsOf(i).length ? sectionsOf(i)[0] : i);

  /* Select an item, making it visible first: its sections are unfolded and, if
   * it is a hidden sub notion (e.g. reached from the compte rendu or a search),
   * hidden steps are shown. */
  function jumpTo(idx, field = -1) {
    for (const s of sectionsOf(idx)) S.items[s].collapsed = false;
    if (visibility().vis[idx] === "hidden" && !S.showHidden) {
      S.showHidden = true;
      flash("Étapes masquées affichées");
    }
    S.cur = idx;
    S.field = field;
  }

  /* After an action, the selected item may have become invisible (its parent
   * was negated, hidden steps were turned off, its group was folded...) or be
   * a checklist (e.g. index 0 when opening): go up to the nearest displayed
   * item, or down if there is none above. */
  function fixCur() {
    const { vis } = visibility();
    if (shown(vis, S.cur)) return;
    S.field = -1;
    const find = (step) => {
      for (let i = S.cur; i >= 0 && i < S.items.length; i += step) if (shown(vis, i)) return i;
      return -1;
    };
    const up = find(-1);
    S.cur = up >= 0 ? up : Math.max(0, find(1));
  }

  /* Next (dir 1) or previous (dir -1) displayed section title, either level. */
  function nextSection(dir) {
    const { vis } = visibility();
    for (let i = S.cur + dir; i >= 0 && i < S.items.length; i += dir) {
      if (S.items[i].kind === "section" && shown(vis, i)) {
        S.cur = i;
        break;
      }
    }
    S.field = -1;
  }

  /* Tree navigation (sibling / parent / child). The flat item list is read
   * as a tree through a rank per item: "#" section 0, "##" section 1, a
   * notion or free text nest + depth (nest = number of enclosing sections, 1
   * or 2). Example under "# Mode de vie" / "## Évaluation du fonctionnement":
   * "Travail" (depth 0) has rank 2, its detail "activité" (depth 1) rank 3.
   * Only displayed items count. */
  function rankOf(i, nest) {
    const it = S.items[i];
    return it.kind === "section" ? it.level - 1 : nest[i] + it.depth;
  }

  /* Next (dir 1) or previous (dir -1) displayed item of the same rank or
   * above, so it reaches the next sibling and, past the last one, the next
   * item of the parent level (e.g. from the last notion of "## Sommeil" to
   * "## Transit"). On a field, it acts as from its notion. */
  function sibling(dir) {
    const { vis, nest } = visibility();
    const r = rankOf(S.cur, nest);
    for (let i = S.cur + dir; i >= 0 && i < S.items.length; i += dir) {
      if (shown(vis, i) && S.items[i].kind !== "checklist" && rankOf(i, nest) <= r) {
        S.cur = i;
        break;
      }
    }
    S.field = -1;
  }

  /* One level up: from a field to its notion, from a notion to its parent
   * notion or section, from "##" to "#". */
  function parent() {
    if (S.field >= 0) return void (S.field = -1);
    const { vis, nest } = visibility();
    const r = rankOf(S.cur, nest);
    for (let i = S.cur - 1; i >= 0; i--) {
      if (shown(vis, i) && S.items[i].kind !== "checklist" && rankOf(i, nest) < r) return void (S.cur = i);
    }
  }

  /* One level down: the first displayed child item (sub section, notion or
   * detail), or else the first field of the notion. */
  function child() {
    const { vis, nest } = visibility();
    const r = rankOf(S.cur, nest);
    for (let i = S.cur + 1; i < S.items.length && S.items[i].kind !== "checklist"; i++) {
      if (!shown(vis, i)) continue;
      if (rankOf(i, nest) > r) {
        S.cur = i;
        S.field = -1;
        return;
      }
      break;
    }
    if (S.field < 0 && cur().kind === "notion" && cur().fields.length) S.field = 0;
  }

  /* Accent and case insensitive matching so "idees" finds "idées". */
  function norm(s) {
    return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }

  function search(q) {
    if (q) S.lastSearch = q;
    q = norm(S.lastSearch);
    if (!q) return;
    const n = S.items.length;
    for (let k = 1; k <= n; k++) {
      const i = (S.cur + k) % n;
      const it = S.items[i];
      const hay = norm([it.title, it.raw, it.text].filter(Boolean).join(" "));
      if (hay.includes(q)) return jumpTo(i);
    }
  }

  /* Open the bottom text bar. `initial` pre-fills it so existing text can be
   * edited instead of retyped. */
  function ask(label, initial, onDone) {
    S.prompt = { label, onDone };
    render();
    const input = S.root.querySelector(".trh-prompt input");
    input.value = initial || "";
    input.focus();
    input.select();
  }

  function insertFree(offset) {
    snapshot();
    const depth = cur().kind === "section" ? 0 : cur().depth;
    const at = S.cur + offset;
    S.items.splice(at, 0, { kind: "free", depth, text: "" });
    jumpTo(at);
    ask("Texte libre", "", (v) => {
      // An empty free text has no purpose: drop it so it does not clutter the list.
      if (v) cur().text = v;
      else S.items.splice(S.cur, 1), (S.cur = Math.min(S.cur, S.items.length - 1));
    });
  }

  function copyReport() {
    const text = report().map((l) => l.text).join("\n");
    const fallback = () => {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).catch(fallback);
    else fallback();
    flash("Compte rendu copié");
  }

  function flash(msg) {
    const el = S.root.querySelector(".trh-flash");
    el.textContent = msg;
    el.classList.add("trh-show");
    clearTimeout(flash.t);
    flash.t = setTimeout(() => el.classList.remove("trh-show"), 1500);
  }

  // ------------------------------------------------------------------ actions

  /* Single source of truth for what the helper can do. `run` mutates the state;
   * render() is called afterwards by dispatch(). After a decision made on a
   * whole notion we move to the next item automatically, which is what makes
   * walking through the trame fast. Decisions on a field do not move, because
   * several fields of the same notion are usually picked in a row. */
  const ACTIONS = {
    up: { label: "Précédent", tip: "Remonte d'une ligne ou d'un champ de la notion sélectionnée (les lignes masquées ou repliées sont sautées).", run: () => step(-1) },
    down: { label: "Suivant", tip: "Descend d'une ligne ; sur la notion sélectionnée, passe d'abord par ses champs, affichés l'un sous l'autre (les lignes masquées ou repliées sont sautées).", run: () => step(1) },
    left: {
      label: "Champ précédent",
      tip: "Sélectionne le champ (pastille) précédent ; tout à gauche, la notion elle-même.",
      run: () => (S.field = Math.max(-1, S.field - 1)),
    },
    right: {
      label: "Champ suivant",
      tip: "Sélectionne le champ (pastille) suivant de la notion.",
      run: () => {
        const f = cur().fields;
        if (f) S.field = Math.min(f.length - 1, S.field + 1);
      },
    },
    prevSibling: { label: "Frère précédent", tip: "Remonte au titre ou à la notion précédente de même niveau (ou au niveau parent s'il n'y en a plus), en sautant les détails.", run: () => sibling(-1) },
    nextSibling: { label: "Frère suivant", tip: "Descend au titre ou à la notion suivante de même niveau (ou au niveau parent après la dernière), en sautant les détails et les champs.", run: () => sibling(1) },
    parent: { label: "Niveau parent", tip: "Remonte d'un niveau : du champ à sa notion, de la notion à sa notion parente ou à sa section, de la section à sa partie.", run: parent },
    child: { label: "Niveau enfant", tip: "Descend d'un niveau : de la partie à sa première section, de la section à sa première notion, de la notion à son premier détail ou à son premier champ.", run: child },
    prevSection: { label: "Section précédente", tip: "Va au titre de la section précédente.", run: () => nextSection(-1) },
    nextSection: { label: "Section suivante", tip: "Va au titre de la section suivante.", run: () => nextSection(1) },
    first: { label: "Début", tip: "Va à la première ligne de la trame.", run: () => ((S.cur = 0), (S.field = -1)) },
    // fixCur() (run after every action) climbs back to a displayed item.
    last: { label: "Fin", tip: "Va à la dernière ligne de la trame.", run: () => ((S.cur = S.items.length - 1), (S.field = -1)) },
    add: {
      label: "Ajouter tel quel",
      tip: "Sur une notion : l'ajoute au compte rendu telle quelle, fait apparaître ses sous-notions et passe à la suivante. Sur un champ : le coche ou le décoche.",
      run: () => {
        const it = cur();
        if (it.kind === "free" || it.kind === "section") return ACTIONS.addText.run();
        snapshot();
        if (S.field >= 0) {
          const f = it.fields[S.field];
          f.picked = !(f.picked && !f.neg);
          f.neg = false;
          if (it.state === "excluded") it.state = "pending";
        } else {
          it.state = "as_is";
          move(1);
        }
      },
    },
    addText: {
      label: "Ajouter + texte",
      tip: "Ajoute avec un texte libre (réponse du patient, précision). Sur un champ, donne « champ : texte ». Sur un titre de section, texte placé sous le titre.",
      run: () => {
        const it = cur();
        if (it.kind === "section") return ask(`Texte sous « ${it.title} »`, it.text, (v) => (it.text = v));
        if (it.kind === "free") return ask("Texte libre", it.text, (v) => (it.text = v));
        if (S.field >= 0) {
          const f = it.fields[S.field];
          return ask(`${clean(it.label) || "Champ"} › ${clean(f.name)}`, f.value, (v) => {
            f.value = v;
            f.picked = true;
            f.neg = false;
            if (it.state === "excluded") it.state = "pending";
          });
        }
        ask(clean(it.label) || clean(it.raw), it.text, (v) => {
          it.text = v;
          if (it.state === "pending" || it.state === "excluded") it.state = "as_is";
          move(1);
        });
      },
    },
    exclude: {
      label: "Ne pas ajouter",
      tip: "N'écrit rien pour cette notion (barrée), garde ses sous-notions masquées et passe à la suivante. Sur un champ : l'efface. Sur un texte libre : le supprime.",
      run: () => {
        const it = cur();
        snapshot();
        if (it.kind === "free") {
          S.items.splice(S.cur, 1);
          S.cur = Math.min(S.cur, S.items.length - 1);
        } else if (it.kind === "section") {
          it.text = "";
        } else if (S.field >= 0) {
          Object.assign(it.fields[S.field], { picked: false, neg: false, value: "" });
        } else {
          it.state = "excluded";
          move(1);
        }
      },
    },
    negative: {
      label: "Négatif (pas de...)",
      tip: "Ajoute au négatif : « Pas de ... » / « Pas d'... ». Sur une notion, garde ses sous-notions masquées et passe à la suivante.",
      run: () => {
        const it = cur();
        if (it.kind !== "notion") return;
        snapshot();
        if (S.field >= 0) {
          Object.assign(it.fields[S.field], { picked: true, neg: true, value: "" });
          if (it.state === "excluded") it.state = "pending";
        } else {
          it.state = "negative";
          move(1);
        }
      },
    },
    freeBelow: { label: "Texte libre après", tip: "Insère une ligne de texte libre sous la ligne courante.", run: () => insertFree(1) },
    freeAbove: { label: "Texte libre avant", tip: "Insère une ligne de texte libre au-dessus de la ligne courante.", run: () => insertFree(0) },
    toggleFold: {
      label: "Replier / déplier la section",
      tip: "Replie ou déplie la section courante pour la cacher (ex : Sommeil, ou tout Mode de vie depuis son titre). Aussi : clic sur le titre de la section.",
      run: () => {
        const sec = S.items[sectionOf(S.cur)];
        sec.collapsed = !sec.collapsed;
        S.cur = sectionOf(S.cur);
        S.field = -1;
      },
    },
    foldAll: {
      label: "Tout replier / déplier",
      tip: "Replie toutes les sections, ou les déplie toutes si elles sont déjà toutes repliées.",
      run: () => {
        const secs = S.items.filter((it) => it.kind === "section");
        // Fold everything unless everything is already folded.
        const fold = secs.some((s) => !s.collapsed);
        for (const s of secs) s.collapsed = fold;
        S.cur = sectionOf(S.cur);
        S.field = -1;
      },
    },
    toggleHidden: {
      label: "Afficher les étapes masquées",
      tip: "Affiche (grisées) ou cache les sous-notions masquées parce que leur notion parente n'a pas été ajoutée.",
      run: () => {
        S.showHidden = !S.showHidden;
        flash(S.showHidden ? "Étapes masquées affichées" : "Étapes masquées cachées");
      },
    },
    toggleReport: {
      label: "Masquer / afficher le compte rendu",
      tip: "Masque ou affiche le volet du compte rendu pour laisser toute la place à la trame.",
      run: () => {
        S.hideReport = !S.hideReport;
        localStorage.setItem("trame-helper-hide-report", S.hideReport ? "1" : "0");
      },
    },
    toggleBar: {
      label: "Masquer / afficher les boutons",
      tip: "Masque ou affiche les boutons (utile avec un clavier). Ce bouton et celui du compte rendu restent toujours visibles.",
      run: () => {
        S.hideBar = !S.hideBar;
        localStorage.setItem("trame-helper-hide-bar", S.hideBar ? "1" : "0");
      },
    },
    search: {
      label: "Rechercher",
      tip: "Cherche dans la trame sans tenir compte des accents ni de la casse. Valider vide pour aller à l'occurrence suivante.",
      run: () => ask("Rechercher (vide = recherche précédente)", "", (v) => search(v)) },
    undo: {
      label: "Annuler",
      tip: "Annule la dernière modification.",
      run: () => {
        const prev = S.undo.pop();
        if (!prev) return flash("Rien à annuler");
        Object.assign(S, JSON.parse(prev));
      },
    },
    copy: { label: "Copier le CR", tip: "Copie le compte rendu dans le presse-papiers.", run: copyReport },
    header: {
      label: "En-tête",
      tip: "Va aux champs de l'en-tête (date, moment, sexe, présents), sous « Informations administratives ». Tab pour passer au champ suivant, Entrée ou Échap pour revenir à la trame. Aussi : clic sur la première ligne du compte rendu.",
      run: () => {
        // The fields sit under their section: unfold it first so the form is attached.
        const idx = S.items.findIndex((it) => it.head);
        if (idx >= 0) {
          jumpTo(idx);
          S.items[idx].collapsed = false;
        }
        render();
        S.head.querySelector("input").focus();
      },
    },
    toggleMode: {
      label: "Mode basique / vim",
      tip: "Bascule entre le mode basique (flèches, Entrée, Suppr...) et le mode vim (hjkl, a, x, n, zh...).",
      run: () => {
        S.mode = S.mode === "vim" ? "basic" : "vim";
        localStorage.setItem("trame-helper-mode", S.mode);
        flash(`Mode ${S.mode}`);
      },
    },
    help: { label: "Aide", tip: "Affiche la liste des raccourcis.", run: () => S.root.classList.toggle("trh-help-open") },
    close: { label: "Fermer", tip: "Ferme l'assistant. Les réponses sont gardées jusqu'au rechargement de la page.", run: () => close() },
    tutorial: { label: "Tutoriel", tip: "Démonstration pas à pas sur une consultation fictive : écrit quelques phrases types avec les vraies commandes (ajout, champs, négatif, texte, enchaînement des sous-questions) en expliquant chaque étape. Les réponses déjà saisies sont mises de côté et reviennent à la fin.", run: () => tourStart() },
  };
  // One action per consultation preset, generated so PRESETS stays the only list.
  for (const [id, p] of Object.entries(PRESETS)) ACTIONS[`preset-${id}`] = { label: p.label, tip: p.tip, run: () => applyPreset(id) };

  /* Fold the sections a consultation preset does not need (see PRESETS).
   * A "##" section stays open when its heading carries the preset tag; a "#"
   * part stays open when one of its "##" sections does or, for a part
   * without sections ("# Histoire de la maladie"), when it carries the tag
   * itself. "exhaustif" opens everything, rare sections included.
   * Example with "urgence": "## Sommeil <!-- urgence suivi -->" stays open,
   * "## Hygiène" is folded, "# Mode de vie" stays open thanks to Sommeil. */
  function applyPreset(id) {
    const keep = (sec) => id === "exhaustif" || sec.presets.includes(id);
    let part = null; // current "#" section
    let subs = []; // its "##" sections
    const closePart = () => part && (part.collapsed = !(subs.length ? subs.some(keep) : keep(part)));
    for (const it of S.items) {
      if (it.kind !== "section") continue;
      if (it.level === 1) {
        closePart();
        part = it;
        subs = [];
      } else {
        it.collapsed = !keep(it);
        subs.push(it);
      }
    }
    closePart();
    S.preset = id;
    S.cur = 0; // fixCur() then goes down to the first displayed item
    S.field = -1;
    flash(PRESETS[id].label);
  }

  /* Tutorial ("Tutoriel" button): fills a fictitious consultation step by step
   * through the real actions, so what it shows is exactly what the keys do,
   * and explains each step in a bar under the list. The answers entered before
   * are set aside (S.tour.saved) and given back when the tour ends, finished
   * or quit, so it can be run in the middle of a real consultation.
   * Each step is {run, say}: run performs the step (none on the first and the
   * last), say() gives the explanation shown once it is done; a function so
   * the quoted keys follow the current key mode (keysFor).
   * Compte rendu at the end, e.g.:
   *   Entretien du 07/11/2026 matin, avec sa mère :
   *   MOTIF DE CONSULTATION : Adressée par son médecin traitant pour ...
   *   - Travail : en activité, CDI, pas d'arrêts de travail prolongés
   *   - Plaintes : insomnie d'endormissement, réveil précoce, pas de somnolence diurne
   *   - Corpulence : poids : 52 kg, IMC : 18,6
   *   - Pas d'idées suicidaires
   * A trame change that renames a notion used here makes tourGo() throw,
   * which the Playwright checks catch. */
  const keyOf = (id) => keysFor(id).join(" ou ") || "bouton";
  const TOUR = [
    {
      say: () =>
        "Tutoriel : une consultation fictive va être remplie pas à pas avec les vraies commandes, pour voir comment se construit le compte rendu (à droite, ou en bas sur téléphone). Vos réponses actuelles sont mises de côté et reviendront à la fin. Entrée ou « Suivant » pour avancer, Échap pour quitter.",
    },
    {
      run: () => tourHeader({ moment: "matin", sex: "f", present: "sa mère" }),
      say: () => `En-tête (${keyOf("header")}) : date, moment et personnes présentes donnent la phrase d'ouverture ; le sexe accorde les « (e) » de la trame.`,
    },
    {
      run: () => {
        tourGo("Motif de consultation");
        tourType("addText", "Adressée par son médecin traitant pour une humeur triste depuis deux mois.");
      },
      say: () => `Texte libre (${keyOf("addText")}) : sur un titre de section sans questions, comme « Motif de consultation », le texte tapé s'écrit sous le titre.`,
    },
    {
      run: () => {
        tourGo("Travail");
        ACTIONS.add.run();
      },
      say: () => `Ajouter tel quel (${keyOf("add")}) sur « Travail » : la notion entre dans le compte rendu, ses sous-questions apparaissent et la sélection passe à la première.`,
    },
    {
      run: () => {
        tourField("en activité");
        ACTIONS.add.run();
      },
      say: () => `Sur une pastille (un champ, atteint avec ${keyOf("down")}), ${keyOf("add")} la coche. Le libellé entre parenthèses « (activité) » n'est pas écrit : seule la réponse l'est.`,
    },
    {
      run: () => {
        tourGo("(contrat)");
        tourField("CDI");
        ACTIONS.add.run();
        tourGo("arrêts de travail prolongés");
        ACTIONS.negative.run();
      },
      say: () => `Négatif (${keyOf("negative")}) sur « arrêts de travail prolongés » écrit « pas d'arrêts de travail prolongés » et garde ses sous-questions masquées. Toutes les sous-questions s'enchaînent en une phrase sur la ligne « Travail ».`,
    },
    {
      run: () => {
        tourGo("Plaintes");
        for (const f of ["insomnie d'endormissement", "réveil précoce"]) tourField(f), ACTIONS.add.run();
        tourField("somnolence diurne");
        ACTIONS.negative.run();
      },
      say: () => `Plusieurs pastilles d'une même notion se cochent à la suite, et ${keyOf("negative")} sur une pastille la met au négatif : « pas de somnolence diurne ».`,
    },
    {
      run: () => {
        tourGo("Corpulence");
        tourField("poids");
        tourType("addText", "52 kg");
        tourField("IMC");
        tourType("addText", "18,6");
      },
      say: () => `${keyOf("addText")} sur une pastille donne « champ : texte », pratique pour les mesures.`,
    },
    {
      run: () => {
        tourGo("Tabac");
        ACTIONS.exclude.run();
      },
      say: () => `Ne pas ajouter (${keyOf("exclude")}) : « Tabac » est barré et rien n'est écrit, pour marquer une question vue mais sans objet.`,
    },
    {
      run: () => {
        tourGo("Idées suicidaires");
        ACTIONS.negative.run();
      },
      say: () => `${keyOf("negative")} sur « Idées suicidaires » écrit « Pas d'idées suicidaires » et toutes les questions détaillées restent masquées (${keyOf("toggleHidden")} les montre, grisées).`,
    },
    {
      say: () =>
        `Fin : un clic sur une ligne du compte rendu ramène à sa notion, ${keyOf("undo")} annule, ${keyOf("copy")} copie le compte rendu pour le coller dans le dossier, et les boutons « Consultation d'urgence / de suivi » replient ce qui sert rarement. « Terminer » rend vos réponses.`,
    },
  ];

  /* Select the first section titled `text`, or notion whose line is `text` or
   * starts with "text :" (e.g. "Plaintes" for "Plaintes : insomnie ..."). */
  function tourGo(text) {
    const i = S.items.findIndex((it) => it.title === text || (it.kind === "notion" && (it.raw === text || it.raw.startsWith(`${text} :`))));
    if (i < 0) throw new Error(`Tutoriel : « ${text} » introuvable dans la trame`);
    jumpTo(i);
  }

  /* Select the field named `name` of the current notion. */
  function tourField(name) {
    const f = cur().fields.findIndex((x) => clean(x.name) === name);
    if (f < 0) throw new Error(`Tutoriel : champ « ${name} » introuvable`);
    S.field = f;
  }

  /* Run an action that opens the text bar (addText) and answer it with
   * `value` at once, through the same onDone as a typed answer. */
  function tourType(actionId, value) {
    ACTIONS[actionId].run();
    const p = S.prompt;
    S.prompt = null;
    S.root.querySelector(".trh-prompt input").blur();
    p.onDone(value);
  }

  /* Set header fields both in the state and in the (persistent) form. */
  function tourHeader(h) {
    Object.assign(S.header, h);
    for (const [name, v] of Object.entries(h)) S.head.elements[name].value = v;
  }

  function tourStart() {
    if (S.tour) return;
    S.root.classList.remove("trh-help-open");
    const { items, cur: c, field, undo, header, showHidden, preset } = S;
    S.tour = { i: 0, saved: JSON.stringify({ items, cur: c, field, undo, header, showHidden, preset }) };
    Object.assign(S, { items: parseTrame(S.md), cur: 0, field: -1, undo: [], showHidden: false, preset: null });
    tourHeader({ moment: "", sex: "n", present: "" });
  }

  function tourNext() {
    S.tour.i++;
    if (S.tour.i >= TOUR.length) return tourEnd();
    const step = TOUR[S.tour.i];
    if (step.run) step.run();
  }

  function tourEnd() {
    const saved = JSON.parse(S.tour.saved);
    S.tour = null;
    tourHeader(saved.header);
    delete saved.header;
    Object.assign(S, saved);
    flash("Tutoriel terminé : vos réponses sont revenues");
  }

  /* Tour steps are not ACTIONS (they would land in the toolbar and the help),
   * so they get their own fixCur() + render(), like dispatch(). */
  function tourDo(fn) {
    fn();
    fixCur();
    render();
  }

  /* Key names: printable keys use event.key as is (so "J" means shift+j and "?"
   * works on any layout), special keys get "S-" / "C-" prefixes. */
  const BASIC_KEYS = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
    "S-ArrowUp": "prevSibling",
    "S-ArrowDown": "nextSibling",
    "S-ArrowLeft": "parent",
    "S-ArrowRight": "child",
    PageUp: "prevSection",
    PageDown: "nextSection",
    Home: "first",
    End: "last",
    Enter: "add",
    "S-Enter": "addText",
    "+": "addText",
    Delete: "exclude",
    Backspace: "exclude",
    "-": "negative",
    Insert: "freeBelow",
    "S-Insert": "freeAbove",
    " ": "toggleFold",
    F3: "foldAll",
    "*": "toggleHidden",
    "C-j": "toggleReport",
    "C-b": "toggleBar",
    "C-f": "search",
    "C-z": "undo",
    "C-c": "copy",
    F2: "toggleMode",
    F1: "help",
    "?": "help", // not a letter, so harmless in basic mode
    F4: "header",
    Escape: "close",
  };
  const VIM_KEYS = {
    k: "up",
    j: "down",
    h: "left",
    l: "right",
    K: "prevSibling",
    J: "nextSibling",
    H: "parent",
    L: "child",
    "g g": "first",
    "z a": "toggleFold",
    "z A": "foldAll",
    "z h": "toggleHidden",
    "z r": "toggleReport",
    "z b": "toggleBar",
    ...Object.fromEntries(Object.keys(PRESETS).map((id, i) => [`z ${i + 1}`, `preset-${id}`])),
    G: "last",
    a: "addText",
    x: "exclude",
    n: "negative",
    o: "freeBelow",
    O: "freeAbove",
    "/": "search",
    u: "undo",
    y: "copy",
    e: "header",
  };

  const keymap = () => (S.mode === "vim" ? { ...BASIC_KEYS, ...VIM_KEYS } : BASIC_KEYS);

  function keyName(e) {
    let k = e.key;
    const special = k.length > 1;
    if (special && e.shiftKey) k = "S-" + k;
    if (e.ctrlKey || e.metaKey) k = "C-" + k.toLowerCase();
    return k;
  }

  function dispatch(actionId) {
    ACTIONS[actionId].run();
    fixCur();
    render();
  }

  function onKey(e) {
    if (!S.root || !S.root.classList.contains("trh-open")) return;
    if (S.prompt) return; // the input bar handles its own keys
    // During the tutorial only "next" and "quit" keys work: other keys would
    // change the demo under its explanations.
    if (S.tour) {
      if (["Enter", " ", "ArrowRight", "ArrowDown"].includes(e.key)) tourDo(tourNext);
      else if (e.key === "Escape") tourDo(tourEnd);
      else return;
      return e.preventDefault();
    }
    if (e.target.closest && e.target.closest(".trh-head")) return; // typing in the header fields
    let k = keyName(e);
    // Do not hijack Ctrl+C while the user is selecting text in the preview.
    if (k === "C-c" && String(window.getSelection())) return;
    // Two key sequences are written "g g", "z h"... in the keymaps. The first
    // key is held until the next one; an unknown pair is dropped, like in vim.
    const km = keymap();
    // While the help is open, keys do not act: they highlight the matching
    // shortcut rows instead, to look up what a key does. Escape, "?" or F1
    // close the help.
    const helpOpen = S.root.classList.contains("trh-help-open");
    if (S.pendingKey) {
      k = `${S.pendingKey} ${k}`;
      S.pendingKey = "";
    } else if (k.length === 1 && Object.keys(km).some((s) => s.startsWith(k + " "))) {
      S.pendingKey = k;
      e.preventDefault();
      if (helpOpen) highlightHelp(k + " ", true); // e.g. "z" lights up every "z …" row
      return;
    }
    const action = km[k];
    if (helpOpen) {
      if (/^(Shift|Control|Alt|Meta|S-Shift)$/.test(k)) return; // lone modifier: wait for the real key
      e.preventDefault();
      if (k === "Escape" || action === "help") return dispatch("help");
      return highlightHelp(k, false);
    }
    if (!action) return;
    e.preventDefault();
    dispatch(action);
  }

  /* Highlight the rows of the help table bound to key `k` (exact key name, or
   * every sequence starting with `k` when `prefix` is true). */
  function highlightHelp(k, prefix) {
    let first = null;
    for (const tr of S.root.querySelectorAll(".trh-help tr[data-keys]")) {
      const keys = tr.dataset.keys.split("\n");
      const hit = keys.some((x) => (prefix ? x.startsWith(k) : x === k));
      tr.classList.toggle("trh-hl", hit);
      if (hit && !first) first = tr;
    }
    const shown = prettyKey(prefix ? k.trim() : k);
    S.root.querySelector(".trh-help-key").textContent = first
      ? `Touche « ${shown} »${prefix ? " … (début de séquence)" : ""}`
      : `Touche « ${shown} » : aucun raccourci dans ce mode`;
    if (first) first.scrollIntoView({ block: "nearest" });
  }

  // ------------------------------------------------------------------ rendering

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  const BADGE = { pending: "·", as_is: "✓", negative: "¬", excluded: "✗" };

  const prettyKey = (k) => (k === " " ? "Espace" : k.replace(/^C-/, "Ctrl+").replace(/^S-/, "Maj+"));

  // Raw key names bound to an action in the current mode, e.g. ["Enter"].
  const rawKeysFor = (actionId) =>
    Object.entries(keymap())
      .filter(([, a]) => a === actionId)
      .map(([k]) => k);

  function keysFor(actionId) {
    return rawKeysFor(actionId).map(prettyKey);
  }

  /* A checklist (see parseTrame) is a plain text reminder, set apart from the
   * selectable rows: no data-idx, so clicks and keys never reach it. */
  function renderChecklist(it) {
    const lines = it.lines.map((l) => `<li style="margin-left:${l.depth * 1.5}em">${esc(l.text)}</li>`).join("");
    return `<div class="trh-check"><b>${esc(it.title)}</b> <small>(pense-bête, hors compte rendu)</small><ul>${lines}</ul></div>`;
  }

  /* A section with nothing below it (e.g. "Motif de consultation") is filled
   * by typing a text on its title: say so, otherwise it looks like a mere
   * heading. A level 1 group followed by its level 2 sections is not empty. */
  function isEmptySection(idx) {
    const next = S.items[idx + 1];
    return !next || next.kind === "checklist" || (next.kind === "section" && next.level <= S.items[idx].level);
  }

  /* HTML of item idx. `v` is the result of visibility(). */
  function renderRow(it, idx, v) {
    const { vis, kids, nest } = v;
    if (it.kind === "checklist") return renderChecklist(it);
    if (!shown(vis, idx)) return "";
    const sel = idx === S.cur;
    const cls = ["trh-row", `trh-${it.kind}`, sel ? "trh-cur" : "", vis[idx] === "hidden" ? "trh-hidden" : ""];
    if (it.kind === "section") {
      cls.push(`trh-sec${it.level}`);
      const note = it.text
        ? `<div class="trh-note">${esc(it.text)}</div>`
        : isEmptySection(idx)
          ? `<div class="trh-note trh-empty">✎ à écrire (${esc(keysFor("addText").join(", ") || "✓✎")})</div>`
          : "";
      // A click anywhere on the title row of a section that has content toggles
      // its fold (data-fold on the row). An empty section (ex: Motif) has nothing
      // to fold, so it gets no arrow and a click just selects it, ready for typing.
      // The arrow floats right so titles stay aligned with their notions.
      if (isEmptySection(idx)) return `<div class="${cls.join(" ")}" data-idx="${idx}"><b>${esc(it.title || "(début)")}</b>${note}</div>`;
      // The header form is a persistent node moved into this slot by render().
      const slot = it.head && !it.collapsed ? '<div class="trh-head-slot"></div>' : "";
      return `<div class="${cls.join(" ")}" data-idx="${idx}" data-fold="${idx}"><span class="trh-fold">${
        it.collapsed ? "◂" : "▾"
      }</span><b>${esc(it.title || "(début)")}</b>${note}</div>${slot}`;
    }
    // Same 1.2em step as the margin of .trh-sec2, so notions sit under their title.
    const pad = `style="padding-left:${0.6 + Math.max(0, nest[idx] - 1) * 1.2 + it.depth * 1.5}em"`;
    if (it.kind === "free") {
      return `<div class="${cls.join(" ")}" data-idx="${idx}" ${pad}>✎ ${esc(it.text || "…")}</div>`;
    }
    // The selected notion shows its fields one per line (trh-vert), so the
    // up / down keys walk through them (see step()); other rows stay compact.
    cls.push(`trh-st-${it.state}`, notionIncluded(it) ? "trh-in" : "", sel && it.fields.length ? "trh-vert" : "");
    const chips = it.fields
      .map((f, fi) => {
        const c = ["trh-chip", f.picked ? (f.neg ? "trh-neg" : "trh-picked") : "", sel && fi === S.field ? "trh-fcur" : ""];
        if (f.tip) c.push("trh-term");
        return `<span class="${c.join(" ")}" data-idx="${idx}" data-field="${fi}"${f.tip ? ` data-tip="${esc(f.tip)}"` : ""}>${esc(f.name)}${
          f.value ? ` : <i>${esc(f.value)}</i>` : ""
        }</span>`;
      })
      .join("");
    const labelCls = `trh-label${sel && S.field === -1 ? " trh-fcur" : ""}${it.tip ? " trh-term" : ""}`;
    return `<div class="${cls.join(" ")}" data-idx="${idx}" ${pad}>
      <span class="trh-badge">${BADGE[it.state]}</span>
      <span class="${labelCls}" data-idx="${idx}" data-field="-1"${it.tip ? ` data-tip="${esc(it.tip)}"` : ""}>${esc(it.label || (it.fields.length ? "…" : it.raw))}</span>
      ${chips}${kids[idx] && !isOpen(it) ? `<span class="trh-kids">+${kids[idx]}</span>` : ""}${
        it.text ? `<div class="trh-note">${esc(it.text)}</div>` : ""
      }
    </div>`;
  }

  /* Compte rendu pane only: also called on its own while typing in the header
   * fields, where re-rendering the list would steal their focus. */
  function renderLines() {
    S.root.querySelector(".trh-lines").innerHTML = report()
      .map((l) => `<div class="trh-line${l.heading ? " trh-h" : ""}${l.idx === S.cur ? " trh-lcur" : ""}" data-idx="${l.idx}">${esc(l.text) || "&nbsp;"}</div>`)
      .join("");
  }

  function render() {
    const r = S.root;
    r.classList.toggle("trh-noreport", S.hideReport);
    r.classList.toggle("trh-nobar", S.hideBar);
    const v = visibility();
    // Rewriting the list detaches the header form, which drops its focus:
    // remember it to give it back (e.g. the header action focuses a field,
    // then dispatch() renders again).
    const active = S.head.contains(document.activeElement) ? document.activeElement : null;
    const list = r.querySelector(".trh-list");
    list.innerHTML = S.items.map((it, i) => renderRow(it, i, v)).join("");
    // The header form is not rebuilt (it would lose its values and focus): the
    // same node is moved under its section, or to the top of the list when no
    // section is marked "<!-- entete -->". Inside a folded section it stays
    // detached, hence hidden.
    const slot = list.querySelector(".trh-head-slot");
    if (slot) slot.replaceWith(S.head);
    else if (!S.items.some((it) => it.head)) list.prepend(S.head);
    if (active && S.head.isConnected) active.focus();
    r.querySelector('.trh-bar [data-action="toggleHidden"]').classList.toggle("trh-on", S.showHidden);
    r.querySelector('.trh-bar [data-action="toggleBar"]').classList.toggle("trh-on", S.hideBar);
    r.querySelector('.trh-bar [data-action="toggleReport"]').classList.toggle("trh-on", S.hideReport);
    renderLines();
    r.querySelector(".trh-mode").textContent =
      `Mode : ${S.mode} (F2)${S.preset ? ` · ${PRESETS[S.preset].label}` : ""} · version ${VERSION}`;
    for (const id of Object.keys(PRESETS)) r.querySelector(`.trh-bar [data-action="preset-${id}"]`).classList.toggle("trh-on", S.preset === id);
    const tour = r.querySelector(".trh-tour");
    tour.hidden = !S.tour;
    if (S.tour) {
      tour.querySelector("p").textContent = `${S.tour.i + 1}/${TOUR.length} · ${TOUR[S.tour.i].say()}`;
      tour.querySelector("[data-tour=next]").textContent = S.tour.i === TOUR.length - 1 ? "Terminer" : "Suivant";
    }
    for (const b of r.querySelectorAll("[data-action]")) {
      const a = ACTIONS[b.dataset.action];
      const keys = keysFor(b.dataset.action);
      b.dataset.tip = `${a.label}\n${a.tip}${keys.length ? `\nRaccourci : ${keys.join(", ")}` : ""}`;
    }
    r.querySelector(".trh-help-body").innerHTML =
      `<h3>Raccourcis (mode ${S.mode})</h3>` +
      `<p class="trh-help-tip">Version : ${esc(VERSION)}</p>` +
      `<p class="trh-help-key">Appuyez sur une touche pour voir à quoi elle sert (Échap ou « ? » pour fermer).</p><table>` +
      Object.entries(ACTIONS)
        .map(
          ([id, a]) =>
            // data-keys: raw key names, one per line, matched by highlightHelp.
            `<tr data-keys="${esc(rawKeysFor(id).join("\n"))}"><td><kbd>${esc(keysFor(id).join(", ") || "souris")}</kbd></td>` +
            `<td><b>${esc(a.label)}</b></td><td class="trh-help-tip">${esc(a.tip)}</td></tr>`
        )
        .join("") +
      `</table><p>Souris ou écran tactile : un seul clic (ou toucher) sur un champ le coche ou le décoche, sur le libellé d'une notion l'ajoute telle quelle (un second clic la retire), ailleurs sur une ligne la sélectionne, chaque bouton de la barre fait la même chose que son raccourci, clic sur une ligne du compte rendu pour revenir à la notion, clic sur ▸ / ▾ pour replier une section. Survol à la souris ou appui long au doigt : infobulle expliquant un bouton, ou définissant un terme souligné en pointillés. Les sous-notions (indentées) n'apparaissent qu'une fois la notion parente ajoutée ; « +n » indique combien sont masquées.</p>`;
    const bar = r.querySelector(".trh-prompt");
    bar.hidden = !S.prompt;
    if (S.prompt) bar.querySelector("label").textContent = S.prompt.label;
    const row = r.querySelector(".trh-row.trh-cur");
    if (row) row.scrollIntoView({ block: "nearest" });
    const line = r.querySelector(".trh-line.trh-lcur");
    if (line) line.scrollIntoView({ block: "nearest" });
  }

  // ------------------------------------------------------------------ DOM setup

  /* Colors are CSS variables so the overlay follows the site's day / night
   * theme: the site marks night mode with data-theme="dark" on <html> (set
   * before first paint from the theme toggle or the system setting), and
   * leaves it out in day mode. The local dev page has no toggle: day colors.
   * The accent is the site's purple (indigo #4b0082 by day, lavender #b39ddb
   * by night, as in its blockquotes); the other tints are derived from it. */
  const CSS = `
  .trh{--bg:#fafafa;--panel:#fff;--fg:#222;--muted:#666;--faint:#888;--border:#ccc;--btn-border:#bbb;--hover:#f1ebf8;
    --accent:#4b0082;--cur:#f3ecfb;--on:#e6d9f5;--sec1:#e4dcef;--sec2:#f0ebf6;--head:#f5f0fa;--check:#fbf7e6;--check-border:#d9cf9f;
    --ok:#080;--ok-bg:#dfd;--ok-fg:#050;--neg:#c60;--neg-bg:#fed;--neg-fg:#840;--hl:#ffe680;--hl-border:#c90}
  html[data-theme="dark"] .trh{--bg:#1b1d22;--panel:#23262d;--fg:#e2e2e2;--muted:#a3a3a3;--faint:#8c8c8c;--border:#3a3e47;
    --btn-border:#4b505b;--hover:#2f2a3a;--accent:#b39ddb;--cur:#2e2640;--on:#3d3058;--sec1:#363042;--sec2:#2c2836;--head:#28252f;
    --check:#2c2a1e;--check-border:#5e5634;--ok:#5c5;--ok-bg:#1e3a23;--ok-fg:#9e9;--neg:#e93;--neg-bg:#3d2b17;--neg-fg:#fc8;
    --hl:#5a4a10;--hl-border:#c90}
  .trh{position:fixed;top:0;left:0;width:100%;height:100vh;height:100dvh;z-index:99999;display:none;flex-direction:column;
    background:var(--bg);color:var(--fg);font:14px/1.4 system-ui,sans-serif;touch-action:manipulation}
  .trh.trh-open{display:flex}
  .trh button{font:inherit;padding:.25em .6em;margin:.15em;border:1px solid var(--btn-border);border-radius:4px;background:var(--panel);color:var(--fg);cursor:pointer}
  .trh button:hover{background:var(--hover)}
  .trh-bar{padding:.3em .5em;border-bottom:1px solid var(--border);background:var(--panel);display:flex;flex-wrap:wrap;align-items:center}
  .trh-group{display:inline-flex;flex-wrap:wrap;padding-right:.4em;margin-right:.4em;border-right:1px solid var(--border)}
  .trh-btn-short{display:none}
  .trh-mode{margin-left:auto;color:var(--muted);font-size:.9em}
  /* Collapsed toolbar: only the group holding the two pane toggles stays, so a
   * touch screen can always bring the buttons back. */
  .trh-nobar .trh-group:not(.trh-keep),.trh-nobar .trh-mode{display:none}
  .trh-noreport .trh-report{display:none}
  .trh-noreport .trh-list{border:none}
  .trh-main{flex:1;display:flex;min-height:0}
  .trh-list,.trh-report{overflow:auto;padding:.5em}
  .trh-list{flex:3;border-right:1px solid var(--border)}
  .trh-report{flex:2;background:var(--panel)}
  /* Header fields, in the list under their section (indented like its
   * notions). Every field is "label + control" centered on one line, so the
   * selects and the inputs line up. */
  .trh-head{margin:.3em 0 .3em 1.8em;padding:.4em .6em;background:var(--head);border:1px solid var(--border);border-radius:4px;
    display:flex;flex-wrap:wrap;gap:.3em .9em;align-items:center}
  .trh-head label{display:inline-flex;align-items:center;gap:.35em}
  .trh-head input,.trh-head select{font:inherit;height:1.9em;box-sizing:border-box;padding:0 .3em;border:1px solid var(--btn-border);
    border-radius:4px;background:var(--panel);color:var(--fg)}
  .trh-head-present{flex:1;min-width:14em}
  .trh-head-present input{flex:1}
  .trh-lines{font-family:ui-monospace,monospace;font-size:13px;white-space:pre-wrap}
  .trh-row{padding:.2em .6em;border-radius:4px;cursor:pointer}
  .trh-sec1{margin-top:.8em;background:var(--sec1);font-size:1.05em}
  .trh-sec2{margin-top:.4em;margin-left:1.2em;background:var(--sec2)}
  .trh-fold{float:right;width:1.2em;text-align:center;color:var(--accent)}
  .trh-check{margin:.6em 0;padding:.4em .8em;border:1px dashed var(--check-border);border-radius:6px;background:var(--check);color:var(--muted)}
  .trh-check ul{margin:.2em 0 0;padding-left:1.4em}
  .trh-hidden{opacity:.45}
  .trh-kids{margin-left:.3em;color:var(--faint);font-size:.85em}
  .trh button.trh-on{background:var(--on);border-color:var(--accent)}
  .trh-cur{outline:2px solid var(--accent);background:var(--cur)}
  .trh-badge{display:inline-block;width:1.2em;color:var(--faint)}
  .trh-st-as_is .trh-badge,.trh-in .trh-badge{color:var(--ok)}
  .trh-st-negative .trh-badge{color:var(--neg)}
  .trh-st-excluded{color:var(--faint);text-decoration:line-through}
  .trh-label{padding:0 .2em;border-radius:3px}
  .trh-chip{display:inline-block;margin:.1em .2em;padding:0 .4em;border:1px solid var(--border);border-radius:10px;font-size:.9em;color:var(--muted);
    max-width:100%;box-sizing:border-box;overflow-wrap:anywhere} /* long fields wrap instead of widening the row */
  .trh-vert .trh-chip{display:block;width:fit-content;margin-left:1.6em}
.trh-picked{background:var(--ok-bg);border-color:var(--ok);color:var(--ok-fg)}
  .trh-neg{background:var(--neg-bg);border-color:var(--neg);color:var(--neg-fg)}
  .trh-fcur{outline:2px solid var(--accent)}
  .trh-note{margin-left:1.4em;color:var(--accent);font-style:italic;font-weight:normal}
  .trh-empty{color:var(--faint)}
  .trh-free{color:var(--accent)}
  .trh-line{cursor:pointer}
  .trh-line:hover,.trh-lcur{background:var(--cur)}
  .trh-h{font-weight:bold}
  .trh-prompt{padding:.5em;border-top:2px solid var(--accent);background:var(--panel);display:flex;gap:.5em;align-items:center}
  /* Author display:flex above would override the hidden attribute without this. */
  .trh-prompt[hidden],.trh-tour[hidden]{display:none}
  .trh-tour{padding:.5em;border-top:2px solid var(--accent);background:var(--cur);display:flex;gap:.5em;align-items:center}
  .trh-tour p{flex:1;margin:0}
  .trh-prompt input{flex:1;font:inherit;padding:.3em;background:var(--bg);color:var(--fg);border:1px solid var(--btn-border)}
  .trh-help{display:none;position:absolute;inset:3em 10%;overflow:auto;background:var(--panel);border:2px solid var(--accent);padding:1em;border-radius:6px}
  .trh-help-open .trh-help{display:block}
  .trh-help td{padding:.15em .8em;vertical-align:top}
  .trh-help kbd{color:var(--fg)}
  .trh-help-tip{color:var(--muted);font-size:.9em}
  .trh-help-key{font-weight:bold;color:var(--accent)}
  .trh-help tr.trh-hl{background:var(--hl);outline:2px solid var(--hl-border)}
  .trh-flash{position:absolute;bottom:4em;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:.4em .8em;border-radius:4px;opacity:0;transition:opacity .3s;pointer-events:none}
  .trh-flash.trh-show{opacity:1}
  .trh-term{text-decoration:underline dotted var(--faint);text-underline-offset:3px}
  .trh-tip{position:fixed;z-index:1;max-width:min(26em,90vw);background:#333;color:#fff;padding:.4em .6em;border-radius:4px;
    font-size:13px;white-space:pre-line;pointer-events:none;box-shadow:0 2px 6px rgba(0,0,0,.3)}
  .trh-tip[hidden]{display:none}
  /* No text selection or system callout on long press, which would hide the tooltip. */
  .trh button,.trh-chip,.trh-label{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
  /* Touch screens: bigger tap targets (about 44px, the usual minimum). */
  @media (pointer:coarse){
    .trh button{min-height:44px;min-width:44px}
    .trh-row{padding:.45em .6em}
    .trh-chip{padding:.35em .7em;margin:.2em}
    .trh-label{display:inline-block;padding:.35em .3em}
    .trh-head input,.trh-head select{height:2.4em}
  }
  /* Narrow screens (phones): panes stacked, toolbar at the bottom within thumb
   * reach with symbol labels, and the text bar at the top so the virtual
   * keyboard cannot cover it. The 16px input font stops iOS from zooming in. */
  @media (max-width:800px){
    .trh-main{flex-direction:column}
    /* min-height:0 lets the panes shrink and scroll instead of overflowing onto the toolbar. */
    .trh-list,.trh-report{min-height:0}
    .trh-list{flex:3;border-right:none;border-bottom:2px solid var(--border)}
    .trh-report{flex:2}
    /* Grid instead of wrapping groups: nested flex groups refused to wrap and
     * pushed buttons off screen. display:contents makes the buttons direct
     * grid cells while keeping the group markup for the desktop layout. */
    .trh-bar{order:2;border-bottom:none;border-top:1px solid var(--border);padding:.2em;
      display:grid;grid-template-columns:repeat(auto-fill,minmax(44px,1fr))}
    .trh-group{display:contents}
    .trh button{margin:.1em;padding:.2em .4em;font-size:18px}
    .trh-btn-long,.trh-mode{display:none}
    .trh-btn-short{display:inline}
    .trh-prompt{order:-1;border-top:none;border-bottom:2px solid var(--accent);flex-wrap:wrap}
    .trh-prompt label{width:100%}
    .trh-tour{order:-1;border-top:none;border-bottom:2px solid var(--accent);flex-wrap:wrap}
    .trh-prompt input,.trh-head input,.trh-head select{font-size:16px}
    .trh-help{inset:.5em}
  }
  `;

  /* Toolbar groups. Every action of ACTIONS appears here so the mouse can do
   * everything the keyboard can. */
  const TOOLBAR = [
    ["toggleBar", "toggleReport"], // first group: kept when the toolbar is collapsed
    ["up", "down", "left", "right", "prevSibling", "nextSibling", "parent", "child", "prevSection", "nextSection", "first", "last"],
    ["add", "addText", "negative", "exclude", "freeAbove", "freeBelow"],
    ["toggleFold", "foldAll", "toggleHidden"],
    Object.keys(PRESETS).map((id) => `preset-${id}`),
    ["header", "search", "undo", "copy", "toggleMode", "tutorial", "help", "close"],
  ];

  /* Symbol labels used instead of the full labels on phones, where the full
   * toolbar would not fit. The full label stays available as aria-label. */
  const SHORT = {
    up: "↑", down: "↓", left: "←", right: "→", prevSibling: "⇡", nextSibling: "⇣", parent: "⇠", child: "⇢", prevSection: "⇞", nextSection: "⇟", first: "⤒", last: "⤓",
    add: "✓", addText: "✓✎", negative: "¬", exclude: "✗", freeAbove: "✎↑", freeBelow: "✎↓",
    toggleFold: "▾", foldAll: "▸▸", toggleHidden: "👁", toggleBar: "☰", toggleReport: "▤",
    header: "📅", search: "🔍", undo: "↶", copy: "⧉", toggleMode: "⌨", tutorial: "🎓", help: "?", close: "✕",
    ...Object.fromEntries(Object.entries(PRESETS).map(([id, p]) => [`preset-${id}`, p.short])),
  };

  function build() {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
    const root = document.createElement("div");
    root.className = "trh";
    root.innerHTML = `
      <div class="trh-bar">${TOOLBAR.map(
        (g, gi) =>
          `<span class="trh-group${gi === 0 ? " trh-keep" : ""}">${g
            .map(
              (id) =>
                `<button type="button" data-action="${id}" aria-label="${esc(ACTIONS[id].label)}"><span class="trh-btn-long">${esc(
                  ACTIONS[id].label
                )}</span><span class="trh-btn-short">${SHORT[id]}</span></button>`
            )
            .join("")}</span>`
      ).join("")}<span class="trh-mode"></span></div>
      <div class="trh-main"><div class="trh-list"></div><div class="trh-report">
        <div class="trh-lines" title="Clic : revenir à la notion"></div>
      </div></div>
      <form class="trh-prompt" hidden><label></label><input type="text" autocomplete="off">
        <button type="submit">OK</button><button type="button" data-cancel>Annuler</button></form>
      <div class="trh-tour" hidden><p></p><button type="button" data-tour="next">Suivant</button><button type="button" data-tour="quit">Quitter le tutoriel</button></div>
      <div class="trh-help"><div class="trh-help-body"></div><button type="button" data-action="help">Fermer l'aide</button></div>
      <div class="trh-flash"></div>
      <div class="trh-tip" hidden></div>`;
    document.body.appendChild(root);
    S.root = root;
    // Header form: built once and moved into the list by render(), see there.
    S.head = document.createElement("form");
    S.head.className = "trh-head";
    S.head.autocomplete = "off";
    S.head.innerHTML = `
      <label>Entretien du <input name="date" size="10" value="${esc(S.header.date)}"></label>
      <label>Moment <select name="moment"><option value="">ø</option><option>matin</option><option>après-midi</option></select></label>
      <label>Sexe <select name="sex"><option value="n">non pertinent</option><option value="m">homme</option><option value="f">femme</option></select></label>
      <label class="trh-head-present">Présents <input name="present" placeholder="l'interne X, la Dre Y"></label>`;

    root.addEventListener("click", (e) => {
      const tourBtn = e.target.closest("[data-tour]");
      if (tourBtn) return tourDo(tourBtn.dataset.tour === "next" ? tourNext : tourEnd);
      const btn = e.target.closest("[data-action]");
      if (btn) return dispatch(btn.dataset.action);
      const fold = e.target.closest("[data-fold]");
      if (fold && !S.prompt) {
        S.cur = Number(fold.dataset.fold);
        return dispatch("toggleFold");
      }
      const target = e.target.closest("[data-idx]");
      if (target && !S.prompt) {
        // One click acts, no double click: a click on a field (chip) picks or
        // unpicks it, a click on the label of a notion adds it as is (and a
        // second click on an "as is" notion takes it back), like Enter on the
        // keyboard. Anywhere else on a row (or on a line of the compte rendu)
        // a click only selects.
        const idx = Number(target.dataset.idx);
        if (idx < 0) return dispatch("header"); // the header line of the compte rendu
        const field = target.dataset.field !== undefined ? Number(target.dataset.field) : -1;
        jumpTo(idx, field);
        const it = cur();
        if (target.dataset.field === undefined || it.kind !== "notion") return render();
        if (field < 0 && it.state === "as_is" && !notionIncluded({ ...it, state: "pending" })) {
          snapshot();
          it.state = "pending";
          return render();
        }
        dispatch("add");
      }
    });

    const form = root.querySelector(".trh-prompt");
    const finish = (value) => {
      const p = S.prompt;
      S.prompt = null;
      // Leave the (now hidden) input, otherwise unbound letters would be typed into it.
      form.querySelector("input").blur();
      if (value !== null) {
        // Search does not modify the compte rendu, so it should not fill the undo stack.
        if (!/^Rechercher/.test(p.label)) snapshot();
        p.onDone(value.trim());
      } else if (p.label === "Texte libre" && cur().kind === "free" && !cur().text) {
        // Cancelled a brand new free text: remove the empty placeholder.
        S.items.splice(S.cur, 1);
        S.cur = Math.min(S.cur, S.items.length - 1);
      }
      render();
    };
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      finish(form.querySelector("input").value);
    });
    form.querySelector("[data-cancel]").addEventListener("click", () => finish(null));
    form.querySelector("input").addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        finish(null);
      }
    });
    // Header fields: every change goes straight to S.header and the preview.
    // Enter or Escape gives the keyboard back to the trame (onKey ignores keys
    // typed in these fields).
    const head = S.head;
    head.addEventListener("input", (e) => {
      S.header[e.target.name] = e.target.value.trim();
      renderLines();
    });
    head.addEventListener("submit", (e) => e.preventDefault());
    head.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        e.target.blur();
      }
    });

    document.addEventListener("keydown", onKey);
    setupTips(root);
  }

  /* Tooltips for every element with a data-tip attribute. The native title
   * attribute is not used because touch screens never show it. Mouse: shown
   * after a short hover. Touch: shown by a long press (500 ms without moving),
   * and the click that follows the release is swallowed so that reading a
   * tooltip never triggers the button. */
  function setupTips(root) {
    const tip = root.querySelector(".trh-tip");
    let timer = 0;
    let swallowClick = false;
    let start = null;
    const hide = () => {
      clearTimeout(timer);
      tip.hidden = true;
    };
    const show = (el) => {
      tip.textContent = el.dataset.tip;
      tip.hidden = false;
      // Above the element if there is room (a finger covers what is below it on
      // touch screens), otherwise below; kept inside the viewport horizontally.
      const r = el.getBoundingClientRect();
      const t = tip.getBoundingClientRect();
      const left = Math.max(4, Math.min(window.innerWidth - t.width - 4, r.left + r.width / 2 - t.width / 2));
      const top = r.top - t.height - 6 >= 0 ? r.top - t.height - 6 : r.bottom + 6;
      tip.style.left = `${left}px`;
      tip.style.top = `${top}px`;
    };
    root.addEventListener("pointerover", (e) => {
      if (e.pointerType !== "mouse") return;
      const el = e.target.closest("[data-tip]");
      hide();
      if (el) timer = setTimeout(() => show(el), 350);
    });
    root.addEventListener("pointerdown", (e) => {
      hide();
      if (e.pointerType === "mouse") return;
      const el = e.target.closest("[data-tip]");
      if (!el) return;
      start = { x: e.clientX, y: e.clientY };
      timer = setTimeout(() => {
        show(el);
        swallowClick = true;
      }, 500);
    });
    root.addEventListener("pointermove", (e) => {
      if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > 10) clearTimeout(timer), (start = null);
    });
    for (const ev of ["pointerup", "pointercancel"]) {
      root.addEventListener(ev, () => {
        clearTimeout(timer);
        start = null;
        // The tooltip of a long press stays a moment after the finger lifts.
        if (!tip.hidden && ev === "pointerup") timer = setTimeout(hide, 2500);
      });
    }
    root.addEventListener(
      "click",
      (e) => {
        if (!swallowClick) return;
        swallowClick = false;
        e.stopPropagation();
        e.preventDefault();
      },
      true // capture: runs before the click handler of build()
    );
    // Android fires contextmenu on long press: keep it for the tooltip only.
    root.addEventListener("contextmenu", (e) => e.target.closest("[data-tip]") && e.preventDefault());
    root.addEventListener("scroll", hide, true);
    // Key presses target the page, not the overlay, hence document.
    document.addEventListener("keydown", hide, true);
  }

  function open(md) {
    if (!S.root) build();
    // Parse only once so closing and reopening keeps everything already entered.
    if (!S.items) {
      S.md = md;
      S.items = parseTrame(md);
      fixCur(); // index 0 may be a checklist, which cannot be selected
    }
    S.root.classList.add("trh-open");
    document.body.style.overflow = "hidden";
    render();
  }

  function close() {
    if (S.tour) tourEnd(); // never leave the demo in place of the real answers
    S.root.classList.remove("trh-open");
    document.body.style.overflow = "";
  }

  // ------------------------------------------------------------------ page enhancement

  /* Styles of the page itself (not of the overlay): the open button, the table
   * of contents and the collapsible sections. Injected here because the page
   * is a generated Jekyll page without its own stylesheet, and an inline style
   * attribute could be blocked by the site CSP. Colors that must follow the
   * light and dark themes use currentColor / inherit. */
  const PAGE_CSS = `
  .trame-open-wrap{text-align:center;margin:2em 0}
  .trame-open-btn{font:inherit;font-size:1.2em;font-weight:600;padding:.8em 1.8em;border:none;border-radius:999px;cursor:pointer;
    color:#fff;background:linear-gradient(135deg,#4b0082,#7b4bd1);box-shadow:0 4px 14px rgba(75,0,130,.35);
    transition:transform .15s,box-shadow .15s}
  .trame-open-btn:hover,.trame-open-btn:focus-visible{transform:translateY(-2px);box-shadow:0 6px 20px rgba(75,0,130,.5)}
  .trp-toc{border-left:3px solid #7b4bd1;padding:.3em 1em;margin:1.5em 0 1em}
  .trp-toc>ol{margin:.3em 0 0;columns:2 16em}
  .trp-toc>ol>li{break-inside:avoid}
  .trp-toc ol ol{margin:0;font-size:.9em}
  .trp-tools{display:flex;gap:.5em;flex-wrap:wrap;margin:1em 0}
  .trp-tools button{font:inherit;font-size:.85em;padding:.3em .9em;border:1px solid currentColor;border-radius:4px;
    background:transparent;color:inherit;cursor:pointer}
  details.trp-sec>summary{cursor:pointer}
  details.trp-sec>summary>h1,details.trp-sec>summary>h2{display:inline}
  details.trp-sec1>summary>h1{font-size:1.3em}
  details.trp-sec2{margin-left:1.2em}
  details.trp-sec2>summary>h2{font-size:1.1em}
  li.trp-kids{list-style:none}
  details.trp-li>summary{cursor:pointer}
  details.trp-li>summary>p{display:inline}
  `;

  /* Turn the rendered trame (between the #trame-start and #trame-end markers
   * written by build.py) into collapsed sections with a table of contents:
   * - each heading and what follows it, up to the next heading of the same or
   *   a higher level, goes into a closed <details> whose <summary> is the
   *   heading itself (so its id, and links to it, keep working); "## Sommeil"
   *   is thus nested inside "# Mode de vie",
   * - each list item holding a sub list becomes a closed <details> too, so
   *   sub notions unfold level by level,
   * - "Tout déplier" / "Tout replier" open or close every one of them, at
   *   every depth.
   * Plain DOM moves of the HTML produced by kramdown: without JavaScript the
   * page simply shows everything unfolded. */
  function enhancePage() {
    const start = document.getElementById("trame-start");
    const end = document.getElementById("trame-end");
    if (!start || !end || start.parentNode !== end.parentNode) return;
    const style = document.createElement("style");
    style.textContent = PAGE_CSS;
    document.head.appendChild(style);
    const nodes = [];
    for (let n = start.nextSibling; n && n !== end; n = n.nextSibling) nodes.push(n);

    for (const n of nodes) {
      if (!n.querySelectorAll) continue;
      for (const li of n.querySelectorAll("li")) {
        const subs = [...li.children].filter((c) => c.tagName === "UL" || c.tagName === "OL");
        if (!subs.length) continue;
        const d = document.createElement("details");
        d.className = "trp-li";
        const sum = document.createElement("summary");
        for (const c of [...li.childNodes]) if (!subs.includes(c)) sum.appendChild(c);
        d.append(sum, ...subs);
        li.appendChild(d);
        li.classList.add("trp-kids"); // the summary triangle replaces the bullet
      }
    }

    // H1 groups ("Mode de vie") hold the details of their H2 sections
    // ("Sommeil"), which hold their content. `open` is the chain of details
    // currently receiving nodes, outermost first, e.g. [Mode de vie, Sommeil].
    const headings = []; // {h, level}, in page order
    const open = [];
    for (const n of nodes) {
      const level = { H1: 1, H2: 2 }[n.tagName];
      if (!level) {
        if (open.length) open[open.length - 1].el.appendChild(n);
        continue;
      }
      while (open.length && open[open.length - 1].level >= level) open.pop();
      const d = document.createElement("details");
      d.className = `trp-sec trp-sec${level}`;
      if (open.length) open[open.length - 1].el.appendChild(d);
      else n.parentNode.insertBefore(d, n);
      const sum = document.createElement("summary");
      sum.appendChild(n);
      d.appendChild(sum);
      if (!n.id) n.id = `trame-section-${headings.length + 1}`;
      headings.push({ h: n, level });
      open.push({ el: d, level });
    }

    // Heading text without the anchor link some themes append to headings.
    const label = (h) => {
      const c = h.cloneNode(true);
      for (const a of c.querySelectorAll(".header-link")) a.remove();
      return c.textContent.trim();
    };
    // Table of contents with the same two levels: each H1 entry lists its H2s.
    const groups = [];
    for (const x of headings) {
      if (x.level === 1 || !groups.length) groups.push({ top: x.h, subs: [] });
      else groups[groups.length - 1].subs.push(x.h);
    }
    const link = (h) => `<a href="#${esc(h.id)}">${esc(label(h))}</a>`;
    const nav = document.createElement("nav");
    nav.className = "trp-toc";
    nav.innerHTML =
      "<strong>Sommaire</strong><ol>" +
      groups
        .map((g) => `<li>${link(g.top)}${g.subs.length ? `<ol>${g.subs.map((h) => `<li>${link(h)}</li>`).join("")}</ol>` : ""}</li>`)
        .join("") +
      "</ol>";
    const tools = document.createElement("div");
    tools.className = "trp-tools";
    tools.innerHTML =
      '<button type="button" data-trp-all="1">Tout déplier</button><button type="button" data-trp-all="0">Tout replier</button>';
    start.parentNode.insertBefore(nav, start);
    start.parentNode.insertBefore(tools, start);

    const all = () => start.parentNode.querySelectorAll("details.trp-sec, details.trp-li");
    tools.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-trp-all]");
      if (btn) for (const d of all()) d.open = btn.dataset.trpAll === "1";
    });
    // A link to a section (table of contents, or a URL with #anchor) opens
    // the folded sections around its target before the browser scrolls to it.
    const reveal = (id) => {
      const t = id && document.getElementById(id);
      if (!t) return null;
      for (let d = t.closest("details"); d; d = d.parentElement.closest("details")) d.open = true;
      return t;
    };
    nav.addEventListener("click", (e) => {
      const a = e.target.closest("a[href^='#']");
      if (a) reveal(decodeURIComponent(a.getAttribute("href").slice(1)));
    });
    const fromHash = () => {
      const t = reveal(decodeURIComponent(location.hash.slice(1)));
      if (t) t.scrollIntoView();
    };
    window.addEventListener("hashchange", fromHash);
    fromHash();
  }

  window.TrameHelper = { open, parseTrame, buildReport };

  document.addEventListener("DOMContentLoaded", () => {
    enhancePage();
    const src = document.getElementById("trame-src");
    if (!src) return;
    for (const el of document.querySelectorAll("[data-trame-open]")) {
      el.addEventListener("click", () => {
        // Usage count only: the event carries no data at all, so nothing
        // typed in the helper ever leaves the browser. umami is the site's
        // analytics script, absent locally or when blocked.
        if (typeof umami !== "undefined") umami.track("checklist-psy-open");
        open(src.textContent);
      });
    }
  });
})();
