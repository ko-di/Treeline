import type { MetadataRoute } from "next";

const SITE = "https://treeline-sand.vercel.app";

/** Every page, for search engines. Add a route here when one is added. */
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/camps", "/after", "/setup", "/versions"].map((path) => ({
    url: `${SITE}${path}`,
  }));
}
