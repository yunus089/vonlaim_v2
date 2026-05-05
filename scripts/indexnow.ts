import { getBranchPages, getPublishedPosts, getRegionPages } from "../src/lib/public-content";
import { submitIndexNow } from "../src/lib/indexnow";

const siteUrl = process.env.APP_URL ?? "https://www.vonlaim.de";

function absolute(path: string) {
  return new URL(path, siteUrl).href;
}

async function main() {
  const [branchPages, regionPages, posts] = await Promise.all([
    getBranchPages().catch(() => []),
    getRegionPages().catch(() => []),
    getPublishedPosts(100).catch(() => [])
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
    ...branchPages.map((page) => `/branchen/${page.slug}`),
    ...regionPages.map((page) => `/regionen/${page.slug}`),
    ...posts.map((post) => `/blog/${post.slug}`)
  ].map(absolute);

  await submitIndexNow(urls);
  console.log(`IndexNow: ${new Set(urls).size} URL(s) übermittelt.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
