import type { MetadataRoute } from "next";
import { getBranchPages, getPublishedPosts, getRegionPages } from "@/lib/public-content";

const appUrl = process.env.APP_URL ?? "https://www.vonlaim.de";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [branchPages, regionPages] = await Promise.all([
    getBranchPages(),
    getRegionPages()
  ]);
  const staticRoutes = [
    "",
    "/leistungen",
    "/branchen",
    ...branchPages.map((page) => `/branchen/${page.slug}`),
    "/regionen",
    ...regionPages.map((page) => `/regionen/${page.slug}`),
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
