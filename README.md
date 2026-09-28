# pi-electrical-website
# pi-electrical-live


## Sitemap

Next.js serves `src/app/sitemap.ts` as `/sitemap.xml`. It discovers public
`page.tsx`, `page.ts`, `page.jsx`, `page.js` and `page.mdx` files under `src/app`
and regenerates the XML on every production build (`npm run build`). Add a page
and rebuild/deploy to include it automatically. Production serves the generated
XML without needing access to source files. `robots.txt` advertises the sitemap.

URLs use `https://www.pi-electrical.com` from `src/data/business.ts`. Each entry has
`loc`, `lastmod`, `changefreq` and `priority`. `lastmod` uses the page source file's
modification time (checkout times may affect this); changes only to imported
content are not reflected in that timestamp.

Route groups are omitted from URLs. Private folders, parallel/intercepted routes
and dynamic segments such as `[slug]` are excluded. If CMS/dynamic pages are added,
extend the sitemap with concrete URLs and content update dates from their data
source. If a future page is private or marked `noindex`, explicitly exclude it
from discovery as well.
