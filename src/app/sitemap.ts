import type { MetadataRoute } from "next";

const SITE = "https://treeline-sand.vercel.app";

/** Every page, for search engines. Add a route here when one is added. */
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/camps", "/brief", "/after", "/setup", "/versions", "/privacy"].map((path) => ({
    url: `${SITE}${path}`,
  }));
}
