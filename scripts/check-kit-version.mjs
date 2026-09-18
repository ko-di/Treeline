#!/usr/bin/env node
/**
 * The site states a forest version in its footer. Nothing syncs it, so this
 * compares it with the kit's .claude/forest/VERSION and fails the build if they
 * differ. A site advertising a version nobody can download is worse than a
 * site with no version at all.
 *
 *   npm run check          (also runs before every build, as prebuild)
 *
 * Compares against the kit checked out beside this repo when there is one,
 * which is the case on the maker's machine. Otherwise, on Vercel and in CI, it
 * reads that file from the kit's main branch, which only changes when a
 * release is cut. If GitHub can't be reached it says so and lets the build
 * through: a network blip should not stop a deploy.
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const REMOTE = "https://raw.githubusercontent.com/ko-di/forest-kit/main/.claude/forest/VERSION";

const here = dirname(fileURLToPath(import.meta.url));
const site = readFileSync(join(here, "..", "src/lib/content.ts"), "utf8")
  .match(/KIT_VERSION = "([^"]+)"/)?.[1];

let kit;
let from;
const kitFile = join(here, "..", "..", "forest-kit", ".claude", "forest", "VERSION");
if (existsSync(kitFile)) {
  kit = readFileSync(kitFile, "utf8").trim();
  from = "the kit beside this repo";
} else {
  try {
    const res = await fetch(REMOTE, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    kit = (await res.text()).trim();
    from = "the kit on GitHub";
  } catch (err) {
    console.warn(`  skip  site says v${site}; could not reach GitHub to compare (${err.message})`);
    process.exit(0);
  }
}

if (site === kit) {
  console.log(`  ok    site and ${from} both say v${kit}`);
  process.exit(0);
}
console.error(`  DIFF  site says v${site}, ${from} says v${kit}`);
console.error(`        update KIT_VERSION in src/lib/content.ts`);
process.exit(1);
