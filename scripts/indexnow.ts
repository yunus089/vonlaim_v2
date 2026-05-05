import { Pool } from "pg";

const siteUrl = process.env.APP_URL ?? "https://www.vonlaim.de";
const indexNowKey = "b1e25c9e-56f2-4d62-a7e3-fc6b5a1c9d28";
const indexNowEndpoint = "https://www.bing.com/indexnow";

type PublishedTable = "branch_pages" | "region_pages" | "posts";
type SlugRow = {
  slug: string;
};

function absolute(path: string) {
  return new URL(path, siteUrl).href;
}

function normalizeUrl(value: string) {
  try {
    const url = new URL(value, siteUrl);
    if (url.origin !== new URL(siteUrl).origin) return null;
    return url.href;
  } catch {
    return null;
  }
}

function uniqueUrls(urls: string[]) {
  return Array.from(
    new Set(urls.map((url) => normalizeUrl(url)).filter((url): url is string => Boolean(url)))
  );
}

function orderByFor(table: PublishedTable) {
  if (table === "posts") return "published_at DESC NULLS LAST, updated_at DESC";
  return "sort_order ASC, title ASC";
}

async function getPublishedSlugs(pool: Pool, table: PublishedTable) {
  const result = await pool.query<SlugRow>(
    `SELECT slug FROM ${table} WHERE status = 'published' ORDER BY ${orderByFor(table)}`
  );

  return result.rows.map((row) => row.slug).filter(Boolean);
}

async function submitIndexNow(urls: string[]) {
  const urlList = uniqueUrls(urls);

  if (!urlList.length) {
    console.log("IndexNow: keine URLs gefunden.");
    return;
  }

  const payload = {
    host: new URL(siteUrl).host,
    key: indexNowKey,
    keyLocation: absolute(`/${indexNowKey}.txt`),
    urlList
  };

  const response = await fetch(indexNowEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `IndexNow meldete ${response.status} fuer ${urlList.length} URL(s). ${body.slice(0, 500)}`
    );
  }

  console.log(`IndexNow: ${urlList.length} URL(s) übermittelt (${response.status}).`);
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL fehlt. IndexNow braucht Zugriff auf die Produktionsdatenbank.");
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    const [branchSlugs, regionSlugs, postSlugs] = await Promise.all([
      getPublishedSlugs(pool, "branch_pages"),
      getPublishedSlugs(pool, "region_pages"),
      getPublishedSlugs(pool, "posts")
    ]);

    const urls = [
      "/",
      "/leistungen",
      "/branchen",
      "/regionen",
      "/warum-vonlaim",
      "/blog",
      "/faq",
      "/kontakt",
      "/pricing.md",
      "/llms.txt",
      ...branchSlugs.map((slug) => `/branchen/${slug}`),
      ...regionSlugs.map((slug) => `/regionen/${slug}`),
      ...postSlugs.map((slug) => `/blog/${slug}`)
    ].map(absolute);

    await submitIndexNow(urls);
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
