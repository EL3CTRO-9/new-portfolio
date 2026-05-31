import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const SITE = "https://sahilshaikh.in";

// Dependency-free sitemap. Prerendered under output: 'static'.
export const GET: APIRoute = async () => {
  const posts = await getCollection("posts");

  const staticPaths = ["", "about", "archive", "contact"];

  // Trailing slashes match the canonical URLs emitted by BaseLayout.
  const urls: { loc: string; lastmod?: string }[] = [
    ...staticPaths.map((p) => ({ loc: p ? `${SITE}/${p}/` : `${SITE}/` })),
    ...posts.map((post) => ({
      loc: `${SITE}/posts/${post.data.slug}/`,
      lastmod: post.data.date.toISOString(),
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, lastmod }) =>
      `  <url>\n    <loc>${loc}</loc>${
        lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""
      }\n  </url>`
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
