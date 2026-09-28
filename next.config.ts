import type { NextConfig } from "next";
import path from "node:path";
import imageRedirects from "./src/data/image-redirects.json";

const nextConfig: NextConfig = {
  async redirects() {
    return imageRedirects;
  },
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
