#!/usr/bin/env python3
"""Check forest's prose against WRITING-GUIDE.md, which lives in the hub.

    python3 scripts/lint-writing.py              the kit, including the taste layer
    python3 scripts/lint-writing.py --summary    counts only
    python3 scripts/lint-writing.py path...      named files or folders (.md, .tsx, .ts)

The guide is the source of truth. This script encodes the rules that can be
checked mechanically. It cannot check whether the most important thing comes
first, so a clean run is necessary rather than sufficient.

Markdown: code blocks, inline code and HTML comments are skipped. Template
text inside a bare code fence is what the reader sees, so the voice rules
apply there. A fence with a language tag, or holding a shell command, is code.

TSX and TS: JSX text and prose-like string literals are the prose. Tags,
expressions, object keys, style values, imports and <pre> blocks are skipped.

Quoted text is other people's words: a recorded answer, a phrase the reader
types, or another product's label, which keeps its own spelling. The voice
and spelling rules skip it.

This file is the single source. scripts/release.sh copies it into treeline
so the site's own checks run the same rules. scripts/ is export-ignore in
.gitattributes, so it never reaches a reader.
"""
import re
import sys
import pathlib
import collections

ROOT = pathlib.Path(__file__).resolve().parent.parent
SUMMARY = "--summary" in sys.argv


def kit_targets():
    out = list((ROOT / ".claude").rglob("*.md"))
    # WHATS-NEW.md is export-ignored, but /resupply reads it aloud and the
    # site publishes it, so a reader sees every word of it.
    out += [ROOT / f for f in ("README.md", "BUILDING.md", "START-HERE.md", "WHATS-NEW.md")]
    return [p for p in out if p.exists()]


def expand(args):
    out = []
    for a in args:
        p = pathlib.Path(a)
        if p.is_dir():
            out += [f for f in p.rglob("*") if f.suffix in (".md", ".tsx", ".ts") and "node_modules" not in f.parts]
        elif p.exists():
            out.append(p)
    return out


# ---------------------------------------------------------------- rules

NUMBERS = ("two three four five six seven eight nine ten eleven twelve thirteen "
           "fourteen fifteen sixteen seventeen eighteen nineteen twenty thirty "
           "forty fifty sixty seventy eighty ninety hundred thousand").split()

BANNED = ("utilise leverage facilitate assist commence purchase obtain require "
          "additional approximately ensure upon simply obviously straightforward "
          "easy easily seamless powerful robust unlock streamline harness empower "
          "elevate crucial pivotal foster testament delve embark realm tapestry "
          "intuitive delightful holistic magic supercharge effortless "
          "user-centric game-changing revolutionary cutting-edge").split()

PHRASES = ["in order to", "prior to", "a number of", "reach out", "going forward",
           "with regard to", "in the event of", "is able to", "of course",
           "and/or", "best-in-class", "world-class", "please note", "it's worth noting",
           "it is worth noting", "dive in", "have a go", "out of the box"]

US_SPELLING = {"organize": "organise", "analyze": "analyse", "summarize": "summarise",
               "behavior": "behaviour", "flavored": "flavoured", "flavor": "flavour",
               "judgment": "judgement", "artifact": "artefact", "center": "centre",
               "color": "colour", "gray": "grey", "whilst": "while", "amongst": "among",
               "gotten": "got", "toward": "towards", "optimize": "optimise",
               "customize": "customise", "recognize": "recognise",
               "labeled": "labelled", "modeling": "modelling", "canceled": "cancelled"}

WORD_LIST = {"click": "select", "tap": "select", "log in": "sign in",
             "login": "sign in", "navigate to": "go to", "key in": "enter",
             "head to": "go to"}

# Words that keep a capital inside a heading without making it Title Case.
PROPER = set("""Claude Code Figma FigJam Make Vercel Sanity GSAP CSS JS JSON React Next
Framer Motion Rive Theatre Playwright Tailwind Camp Frame Learn Decide Shape Build Ship
UK GOV NHS Google Material Apple iOS Android Netlify GitHub Whimsical PRD MCP API
Dovetail Lovable Bolt v0 Cursor MOTION DESIGN BRAND STACK INSPIRATIONS README SUMMIT
BRIEF EVIDENCE HANDOFF LICENSE VERSION Camps Challenge Terse Balanced Structured Open
Guided Branch Press Reroute Turn Overview Colors Typography Layout Elevation Depth
Shapes Components Do's Don'ts Pentagram Collins EBGE Beetroot Awwwards Godly Native
Reanimated Expo Router Design Human Interface Bézier Bezier Transitions Intersection
Observer Observers Design Material SKStudio SaaS Carbon Productive Expressive""".split())

CODE_LANGS = {"bash", "sh", "json", "yaml", "yml", "ts", "tsx", "js", "jsx", "css",
              "html", "markdown", "md", "mermaid", "diff", "text", "txt", "toml"}

QUOTED = r"\"[^\"]*\"|“[^”]*”|'[^'\n]*'|‘[^’]*’"


# ------------------------------------------------------------ extraction

def md_prose(raw):
    """Markdown → list of (line_no, text) with code and comments blanked."""
    text = re.sub(r"```.*?```", lambda m: "\n" * m.group(0).count("\n"), raw, flags=re.S)
    text = re.sub(r"<!--.*?-->", lambda m: "\n" * m.group(0).count("\n"), text, flags=re.S)
    text = re.sub(r"`[^`\n]*`", "", text)
    return list(enumerate(text.split("\n"), 1))


def md_templates(raw):
    """Reader-facing text inside bare code fences → list of (line_no, text)."""
    out = []
    for m in re.finditer(r"```(\w*)\n(.*?)```", raw, re.S):
        lang, body = m.group(1), m.group(2)
        if lang in CODE_LANGS or re.search(r"^\s*(cd|git|npm|npx|bash|python3?|curl|export)\b", body, re.M):
            continue
        base = raw[:m.start()].count("\n") + 2
        out += [(base + i, l) for i, l in enumerate(body.split("\n"))]
    return out


ENTITIES = {"&rsquo;": "’", "&lsquo;": "‘", "&rdquo;": "”", "&ldquo;": "“",
            "&amp;": "&", "&nbsp;": " ", "&mdash;": "—", "&ndash;": "–"}


def _entities(t):
    for k, v in ENTITIES.items():
        t = t.replace(k, v)
    return re.sub(r"&\w+;", " ", t)


def _blank_code_regions(raw):
    """Blank <pre>…</pre> and <code>…</code>, keeping line numbers."""
    return re.sub(r"<pre\b.*?</pre>|<code\b[^>]*>.*?</code>",
                  lambda m: "\n" * m.group(0).count("\n"), raw, flags=re.S)


def _jsx_text(line):
    if re.match(r"^\s*[\w-]+\s*:\s*[\"'#\d{\[]", line) or "=>" in line:
        return ""                                  # object literal, style value
    t = re.sub(r"\{\{[^{}]*\}\}|\{[^{}]*\}", " ", line)
    t = re.sub(r"<[^>]+>", " ", t)
    t = _entities(t).strip()
    if t and not re.search(r"[=;{}()]", t) and re.search(r"[A-Za-z]{3,} [A-Za-z]{2,}", t):
        return t
    return ""


def _literals(line):
    out = []
    for s in re.findall(r'"([^"\\]*(?:\\.[^"\\]*)*)"', line):
        if re.search(r"[A-Za-z]{3,} [A-Za-z]{2,}", s) and not re.match(r"^[(\[#./@-]", s) \
                and not re.search(r"^[\w./:-]+$|\([a-z-]+:\s", s):
            out.append(_entities(s))
    return out


def tsx_prose(raw):
    """TSX/TS → (lines, paragraphs). Lines are (line_no, text) for the
    per-line rules. Paragraphs join JSX text across lines so sentence length
    can be measured; every prose-like string literal is its own paragraph."""
    src = _blank_code_regions(raw).split("\n")
    lines, paras = [], []
    cur, start = [], None
    for n, line in enumerate(src, 1):
        if re.match(r"^\s*(import|//|/\*|\*|type |interface )", line):
            lines.append((n, ""))
            continue
        lits = _literals(line)
        t = _jsx_text(line) if not lits else ""
        lines.append((n, " ".join(lits + ([t] if t else []))))
        for lit in lits:
            paras.append((n, lit))
        closes = re.search(r"</(p|li|td|th|h[1-6]|dd|dt|summary|figcaption|label|button|a)>", line)
        if t:
            if start is None:
                start = n
            cur.append(t)
        if (closes or not t) and cur:
            paras.append((start, " ".join(cur)))
            cur, start = [], None
    if cur:
        paras.append((start, " ".join(cur)))
    return lines, paras


def tsx_headings(raw):
    return [(n, _entities(m.group(2))) for n, line in enumerate(raw.split("\n"), 1)
            for m in re.finditer(r"<h([1-6])[^>]*>([^<{]+)", line)]


# ---------------------------------------------------------------- checks

def title_case(text):
    words = re.findall(r"[A-Za-z][A-Za-z'’.-]*", text)
    caps = [w for w in words[1:] if w[0].isupper() and w not in PROPER and not w.isupper()
            and not re.match(r"^[A-Z]\.", w)]
    return len(caps) >= 2


def check_lines(lines, hits, prefix="", frontmatter_ok=True):
    frontmatter = False
    for i, (n, line) in enumerate(lines):
        s = line.strip()
        if frontmatter_ok and s == "---" and n <= 2:
            frontmatter = True
            continue
        if frontmatter and s == "---":
            frontmatter = False
            continue
        if not s:
            continue
        low = s.lower()
        heading = s.startswith("#")
        unq = re.sub(QUOTED, "", s)
        unq_low = unq.lower()

        # Punctuation and structure. A dash after a short label with no
        # sentence punctuation before it separates a name from its subject,
        # as in a heading or a menu row. Anything else joins clauses.
        if not heading:
            for d in re.finditer(r"\s+[—–]\s+", s):
                before = re.sub(r"^[|>\-*·•→\s]+", "", s[:d.start()]).strip()
                before = re.sub(r"^\*\*|\*\*$", "", before)
                if len(before) > 30 or re.search(r"[.!?:,;]", before) or len(before.split()) > 4:
                    hits[prefix + "dash joining clauses"].append(n)
                    break
        if "!" in unq and not s.startswith(("|", ">")) and "!important" not in s:
            hits[prefix + "exclamation mark"].append(n)
        if re.search(r"(?<![&\w])&(?![\w#])", s):
            hits[prefix + "ampersand"].append(n)
        if re.search(r"\b(eg|ie|etc)\b\.?", low):
            hits[prefix + "eg / ie / etc"].append(n)
        if re.search(r"\band/or\b", low):
            hits[prefix + "and/or"].append(n)
        prev = lines[i - 1][1].strip() if i > 0 else ""
        if (not prev or prev.endswith((".", "!", "?", ":"))) and re.match(r"^\d{1,3} [a-z]", s) and not re.match(r"^\d+\.", s):
            hits[prefix + "sentence starts with a numeral"].append(n)

        # Emphasis. One bold label at the start of a bullet or cell is structural.
        body = re.sub(r"^(?:[-*+]|\d+\.)\s+", "", s)
        rest = re.sub(r"^\*\*[^*]+\*\*", "", body)
        if re.search(r"\*\*[^*]+\*\*", rest) and not s.startswith("|"):
            hits[prefix + "bold inside a sentence"].append(n)
        if re.search(r"(?<![*\w])\*[^*\s][^*]*\*(?!\*)", body) and not heading:
            hits[prefix + "italic for emphasis"].append(n)
        if re.search(r"<(strong|em|b|i)>", s):
            hits[prefix + "strong/em tag for emphasis"].append(n)

        # Headings in sentence case
        if heading and title_case(re.sub(r"^#+\s*", "", s)):
            hits[prefix + "heading in Title Case"].append(n)

        # Voice
        if not frontmatter and re.search(r"\b(I|I'm|I'll|I've|I'd|my|we|we'll|we're|we've|our|us)\b", unq):
            hits[prefix + "first person"].append(n)

        # Vocabulary
        if re.search(r"\b(" + "|".join(NUMBERS) + r")\b", unq_low):
            hits[prefix + "number as a word"].append(n)
        for w in BANNED:
            if re.search(r"\b" + re.escape(w) + r"\b", unq_low):
                hits[prefix + f"banned: {w}"].append(n)
        for p in PHRASES:
            if p in unq_low:
                hits[prefix + f"banned: {p}"].append(n)
        for us, uk in US_SPELLING.items():
            # 'towards' is the UK form, so that one gets no suffix.
            suffix = "" if us == "toward" else r"(s|d|ed|ing)?"
            if re.search(r"\b" + us + suffix + r"\b", unq_low):
                hits[prefix + f"US spelling: {us} -> {uk}"].append(n)
        for bad, good in WORD_LIST.items():
            if re.search(r"\b" + bad + r"\b", unq_low):
                hits[prefix + f"word list: {bad} -> {good}"].append(n)
        if re.search(r"\bjust (add|type|run|do|use|write|paste|select|open|say|drop)\b", unq_low):
            hits[prefix + "banned: just (talking down)"].append(n)

        # Machine-written patterns
        if re.search(r"\b(it'?s not (a|an|just|about) [^.]{2,40},? it'?s\b|not only [^.]+ but also\b)", low):
            hits[prefix + "contrast for effect"].append(n)
        if re.search(r"\b(you may want to consider|it can be helpful to|generally speaking|whether you'?re a)\b", low):
            hits[prefix + "hedge or machine pattern"].append(n)
        if re.search(r"^(in this (stage|section|guide|camp)|let'?s (dive|get started|begin))", low):
            hits[prefix + "announces the text"].append(n)


def check_sentences(paras, hits, prefix=""):
    for n, t in paras:
        t = t.strip()
        if not t or t.startswith(("#", "|", ">", "-", "*", "[", "```")):
            continue
        # A sentence can end in a closing quote or bracket after its full stop.
        for sentence in re.split(r"(?<=[.!?])[\"”’)\]]*\s+", t):
            if len(sentence.split()) > 25:
                hits[prefix + "sentence over 25 words"].append(n)


def check(path):
    hits = collections.defaultdict(list)
    raw = path.read_text()
    if path.suffix == ".md":
        lines = md_prose(raw)
        check_lines(lines, hits)
        check_sentences(lines, hits)
        check_lines(md_templates(raw), hits, prefix="template: ", frontmatter_ok=False)
    else:
        lines, paras = tsx_prose(raw)
        check_lines(lines, hits, frontmatter_ok=False)
        check_sentences(paras, hits)
        for n, h in tsx_headings(raw):
            if title_case(h):
                hits["heading in Title Case"].append(n)
    return hits


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    files = expand(args) if args else kit_targets()
    totals = collections.Counter()
    failing = 0
    for path in sorted(files):
        hits = check(path)
        if not hits:
            continue
        failing += 1
        for rule, lines in hits.items():
            totals[rule] += len(lines)
        if not SUMMARY:
            try:
                rel = path.resolve().relative_to(ROOT)
            except ValueError:
                rel = path
            print(f"\n{rel}")
            for rule, lines in sorted(hits.items(), key=lambda kv: -len(kv[1])):
                shown = ", ".join(str(x) for x in lines[:10])
                more = f" +{len(lines) - 10} more" if len(lines) > 10 else ""
                print(f"  {len(lines):>4}  {rule}  (lines {shown}{more})")
    print(f"\n{'-' * 52}")
    for rule, n in totals.most_common():
        print(f"  {n:>5}  {rule}")
    print(f"{'-' * 52}")
    print(f"  {sum(totals.values())} findings in {failing} of {len(files)} files")
    return 1 if totals else 0


if __name__ == "__main__":
    sys.exit(main())
