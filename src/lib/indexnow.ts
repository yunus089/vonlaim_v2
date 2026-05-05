import type { AdminContentType } from "@/lib/admin-config";

const siteUrl = process.env.APP_URL ?? "https://www.vonlaim.de";
const indexNowKey = "b1e25c9e-56f2-4d62-a7e3-fc6b5a1c9d28";
const indexNowEndpoint = "https://www.bing.com/indexnow";

export type IndexNowRow = Record<string, string | number | Date | null | undefined>;

function currentUrl(path: string) {
  return new URL(path, siteUrl).href;
}

function keyLocation() {
  return currentUrl(`/${indexNowKey}.txt`);
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

function pushPath(urls: string[], path: string) {
  const normalized = normalizeUrl(path);
  if (normalized) urls.push(normalized);
}

export function resolveIndexNowUrls(
  type: AdminContentType,
  current: IndexNowRow,
  previous?: IndexNowRow | null
) {
  const urls: string[] = [];
  const currentSlug = typeof current.slug === "string" ? current.slug.trim() : "";
  const previousSlug = typeof previous?.slug === "string" ? previous.slug.trim() : "";

  switch (type) {
    case "posts":
      pushPath(urls, "/blog");
      if (previousSlug) pushPath(urls, `/blog/${previousSlug}`);
      if (currentSlug) pushPath(urls, `/blog/${currentSlug}`);
      break;
    case "services":
      pushPath(urls, "/");
      pushPath(urls, "/leistungen");
      break;
    case "branch_pages":
      pushPath(urls, "/branchen");
      if (previousSlug) pushPath(urls, `/branchen/${previousSlug}`);
      if (currentSlug) pushPath(urls, `/branchen/${currentSlug}`);
      break;
    case "region_pages":
      pushPath(urls, "/regionen");
      if (previousSlug) pushPath(urls, `/regionen/${previousSlug}`);
      if (currentSlug) pushPath(urls, `/regionen/${currentSlug}`);
      break;
    case "faqs":
      pushPath(urls, "/");
      pushPath(urls, "/faq");
      break;
    case "content_blocks":
      pushPath(urls, "/");
      break;
    default:
      break;
  }

  return Array.from(new Set(urls));
}

export async function submitIndexNow(urls: string[]) {
  if (process.env.NODE_ENV !== "production") return;

  const uniqueUrls = Array.from(
    new Set(urls.map((url) => normalizeUrl(url)).filter((url): url is string => Boolean(url)))
  );

  if (!uniqueUrls.length) return;

  const payload = {
    host: new URL(siteUrl).host,
    key: indexNowKey,
    keyLocation: keyLocation(),
    urlList: uniqueUrls
  };

  try {
    const response = await fetch(indexNowEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.warn(
        `IndexNow meldete ${response.status} fuer ${uniqueUrls.length} URL(s).`
      );
    }
  } catch (error) {
    console.warn("IndexNow-Ping ist fehlgeschlagen.", error);
  }
}

export function getIndexNowKeyLocation() {
  return keyLocation();
}
