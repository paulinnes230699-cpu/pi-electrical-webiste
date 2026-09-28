import type { MetadataRoute } from "next";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { SITE_URL } from "@/data/business";

// Generate during the build so production does not need the source directory.
export const dynamic = "force-static";

const pageFile = /^page\.(?:tsx?|jsx?|mdx)$/;

async function discoverPages(
  directory: string,
  segments: string[] = [],
): Promise<MetadataRoute.Sitemap> {
  const entries = await readdir(directory, { withFileTypes: true });
  const pages = await Promise.all(entries.map(async (entry) => {
    const filename = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      // Private folders, parallel/intercepted routes and unresolved dynamic
      // segments must not become public sitemap URLs.
      if (/^(?:_|@|\[|\(\.)/.test(entry.name)) return [];
      const isRouteGroup = /^\(.*\)$/.test(entry.name);
      return discoverPages(filename, isRouteGroup ? segments : [...segments, entry.name]);
    }

    if (!entry.isFile() || !pageFile.test(entry.name)) return [];

    const route = `/${segments.map((segment) => encodeURIComponent(segment)).join("/")}`;
    const { mtime } = await stat(filename);
    const priority = route === "/" ? 1
      : route === "/services" ? 0.9
      : route === "/projects-about" ? 0.8
      : route === "/privacy" ? 0.2 : 0.7;

    return [{
      url: `${SITE_URL}${route}`,
      lastModified: mtime,
      changeFrequency: route === "/privacy" ? "yearly" as const : "monthly" as const,
      priority,
    }];
  }));

  return pages.flat();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await discoverPages(path.join(process.cwd(), "src/app"));
  return [...new Map(pages.map((page) => [page.url, page])).values()]
    .sort((a, b) => a.url.localeCompare(b.url));
}
