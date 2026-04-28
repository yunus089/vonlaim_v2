import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/public-content";

const appUrl = process.env.APP_URL ?? "https://www.vonlaim.de";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes = [
    "",
    "/leistungen",
    "/warum-vonlaim",
    "/blog",
    "/faq",
    "/kontakt"
  ];

  const routes: MetadataRoute.Sitemap = [
    ...staticRoutes.map((route) => ({
      url: `${appUrl}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7
    }))
  ];

  try {
    const posts = await getPublishedPosts(100);
    routes.push(...posts.map((post) => ({
      url: `${appUrl}/blog/${post.slug}`,
      lastModified: post.updated_at,
      changeFrequency: "monthly" as const,
      priority: 0.55
    })));
  } catch {
    // Build environments may not have database access yet. Runtime sitemap
    // generation still includes CMS content as soon as PostgreSQL is available.
  }

  return routes;
}
