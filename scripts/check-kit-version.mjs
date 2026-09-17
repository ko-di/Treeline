#!/usr/bin/env node
/**
 * The site states a forest-kit version in its footer. Nothing syncs it, so this
 * compares it with the kit's own .kit-version when that repo is checked out
 * beside this one. A site advertising a version nobody can download is worse
 * than a site with no version at all.
 *
 *   node scripts/check-kit-version.mjs
 *
 * Skips with exit 0 when the kit is not on this machine, so CI is not broken
 * by its absence.
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const site = readFileSync(join(here, "..", "src/lib/content.ts"), "utf8")
  .match(/KIT_VERSION = "([^"]+)"/)?.[1];

const kitFile = join(here, "..", "..", "forest-kit", ".kit-version");
if (!existsSync(kitFile)) {
  console.log(`  site says v${site}. forest-kit is not checked out beside this repo, skipping.`);
  process.exit(0);
}
const kit = readFileSync(kitFile, "utf8").trim();

if (site === kit) {
  console.log(`  ok    site and kit both say v${kit}`);
  process.exit(0);
}
console.error(`  DIFF  site says v${site}, forest-kit says v${kit}`);
console.error(`        update KIT_VERSION in src/lib/content.ts`);
process.exit(1);
