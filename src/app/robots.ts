import type { MetadataRoute } from "next";

const appUrl = process.env.APP_URL ?? "https://www.vonlaim.de";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/"]
      }
    ],
    sitemap: `${appUrl}/sitemap.xml`
  };
}
