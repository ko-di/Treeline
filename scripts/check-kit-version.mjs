#!/usr/bin/env node
/**
 * The site states a forest version in its footer. Nothing syncs it, so this
 * compares it with forest-studio's VERSION file and fails the build if they
 * differ. A site advertising a version nobody can download is worse than a
 * site with no version at all.
 *
 *   npm run check          (also runs before every build, as prebuild)
 *
 * Compares against forest-studio checked out beside this repo when there is
 * one, which is the case on the maker's machine. Otherwise, on Vercel and in
 * CI, it reads public/forest-version.txt, which the release script writes next
 * to forest.zip.
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LOCAL_COPY = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "forest-version.txt");

const here = dirname(fileURLToPath(import.meta.url));
const site = readFileSync(join(here, "..", "src/lib/content.ts"), "utf8")
  .match(/KIT_VERSION = "([^"]+)"/)?.[1];

let kit;
let from;
const kitFile = join(here, "..", "..", "forest-studio", ".claude", "forest", "VERSION");
if (existsSync(kitFile)) {
  kit = readFileSync(kitFile, "utf8").trim();
  from = "the kit beside this repo";
} else {
  if (!existsSync(LOCAL_COPY)) {
    console.warn(`  skip  site says v${site}; no public/forest-version.txt to compare with`);
    process.exit(0);
  }
  kit = readFileSync(LOCAL_COPY, "utf8").trim();
  from = "the download on this site";
}

if (site === kit) {
  console.log(`  ok    site and ${from} both say v${kit}`);
  process.exit(0);
}
console.error(`  DIFF  site says v${site}, ${from} says v${kit}`);
console.error(`        update KIT_VERSION in src/lib/content.ts`);
process.exit(1);
