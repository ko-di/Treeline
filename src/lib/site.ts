/**
 * The site's own address, in one place.
 *
 * Vercel sets VERCEL_PROJECT_PRODUCTION_URL to the production hostname of
 * whatever the project is currently called, with no protocol. Reading it here
 * means renaming the project in Vercel moves the canonical URL, the sitemap
 * and the Open Graph base with it, and nothing in this repo has to change.
 *
 * The fallback is for local builds, where the variable is absent. It is only
 * ever used to build absolute URLs, so a stale value locally costs nothing.
 */
export const SITE = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://treeline-sand.vercel.app";
