import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root. A stray lockfile in the home folder otherwise
  // makes Turbopack watch the wrong directory and miss file changes.
  turbopack: {
    root: path.resolve(__dirname),
  },

  // /stages was this page's name until the site adopted the kit's own
  // vocabulary. It shipped publicly, so the old URL keeps working.
  async redirects() {
    return [{ source: "/stages", destination: "/camps", permanent: true }];
  },
};

export default nextConfig;
