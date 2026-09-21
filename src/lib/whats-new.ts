/**
 * The release notes, parsed from the file the kit publishes.
 *
 * public/forest-whats-new.md is not written here. forest-studio's release
 * script copies its own WHATS-NEW.md over it on every release, beside
 * forest.zip and forest-version.txt. Do not edit it in this repo — the next
 * release will overwrite whatever you write.
 *
 * That is also why this parses the file rather than holding the same prose as
 * structured data in content.ts. `/resupply` fetches the very same bytes over
 * HTTP and reads them in a terminal, so a second authored copy would drift,
 * and the drift would be invisible: the site would say one thing and the
 * update command another, about the same release.
 *
 * Parsing is hand-rolled on purpose. The dialect is four constructs written
 * by the same person who owns this renderer, and a markdown library would
 * hand back an HTML string — which means dangerouslySetInnerHTML, which gives
 * up the property sections.tsx states plainly: no HTML is built from the
 * string, so there is nothing to inject.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

export type Block =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] };

export type Release = {
  version: string;
  /** "1.0.3" → "1-0-3". Only ever used as an id, never as a CSS selector. */
  anchor: string;
  breaking: boolean | null;
  projectUpdate: boolean | null;
  blocks: Block[];
};

/**
 * Exactly what release.sh greps for: `grep -q "^## $VERSION$"`. resupply.sh's
 * own regex is looser, so the strict form is the binding one — matching it
 * here means a heading this page cannot read is a heading that would have
 * stopped the release anyway.
 */
const HEADING = /^## (\d+\.\d+\.\d+)\s*$/;
const FLAGS = /Breaking:\s*(yes|no)\s*·\s*Project update:\s*(yes|no)/i;

/** The same ordering resupply.sh uses, so page order matches terminal order. */
function rank(v: string): number {
  const [a, b, c] = v.split(".").map(Number);
  return a * 1_000_000 + b * 1_000 + c;
}

function toBlocks(lines: string[]): Block[] {
  const blocks: Block[] = [];
  let para: string[] = [];
  let items: string[] = [];

  const flushPara = () => {
    if (para.length) blocks.push({ kind: "p", text: para.join(" ") });
    para = [];
  };
  const flushList = () => {
    if (items.length) blocks.push({ kind: "ul", items });
    items = [];
  };

  for (const line of lines) {
    if (!line.trim()) {
      flushPara();
      flushList();
    } else if (line.startsWith("- ")) {
      flushPara();
      items.push(line.slice(2).trim());
    } else {
      flushList();
      para.push(line.trim());
    }
  }
  flushPara();
  flushList();
  return blocks;
}

export function readReleases(): Release[] {
  const raw = readFileSync(
    join(process.cwd(), "public", "forest-whats-new.md"),
    "utf8",
  );

  const releases: Release[] = [];
  let version: string | null = null;
  let body: string[] = [];

  // Everything before the first version heading is dropped, which mirrors
  // resupply.sh starting at on=0. It means the preamble can be reworded
  // freely without touching this page.
  const close = () => {
    if (!version) return;
    const blocks = toBlocks(body);

    let breaking: boolean | null = null;
    let projectUpdate: boolean | null = null;
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      if (b.kind !== "p") continue;
      const m = b.text.match(FLAGS);
      if (!m) continue;
      breaking = m[1].toLowerCase() === "yes";
      projectUpdate = m[2].toLowerCase() === "yes";
      // 1.0.1 to 1.0.3 put the flags on a line of their own, so that line is
      // now redundant. 1.0.0 embeds them in a sentence that says other things
      // too, so it stays. Never rewrite the sentence to make the shapes match.
      if (!b.text.replace(m[0], "").replace(/[.\s]/g, "")) blocks.splice(i, 1);
      break;
    }

    releases.push({
      version,
      anchor: version.replace(/\./g, "-"),
      breaking,
      projectUpdate,
      blocks,
    });
  };

  for (const line of raw.split("\n")) {
    const m = line.match(HEADING);
    if (m) {
      close();
      version = m[1];
      body = [];
    } else if (version) {
      body.push(line);
    }
  }
  close();

  if (!releases.length) {
    // The file is committed, so an empty parse means something is genuinely
    // wrong — a malformed heading, or a release that wrote nothing. Failing
    // the build is better than shipping a page with no history on it.
    throw new Error(
      "public/forest-whats-new.md has no '## X.Y.Z' sections. " +
        "Headings must be exactly 2 hashes, a space, and 3 numbers.",
    );
  }

  return releases.sort((a, b) => rank(b.version) - rank(a.version));
}
