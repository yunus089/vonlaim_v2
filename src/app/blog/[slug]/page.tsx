import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { getPostBySlug } from "@/lib/public-content";

export const dynamic = "force-dynamic";

const siteUrl = process.env.APP_URL ?? "https://www.vonlaim.de";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`
    },
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article"
    },
    keywords: post.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${siteUrl}/blog/${post.slug}#article`,
    url: `${siteUrl}/blog/${post.slug}`,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at?.toISOString(),
    dateModified: post.updated_at.toISOString(),
    articleSection: post.category,
    keywords: post.tags,
    author: {
      "@type": "Person",
      name: "Yunus Kilic"
    },
    publisher: {
      "@type": "Organization",
      name: "vonLaim",
      "@id": `${siteUrl}/#organization`
    }
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <article className="section">
        <div className="container article-copy">
          <Link href="/blog" className="btn btn-secondary">
            <ArrowLeft size={16} aria-hidden="true" />
            Zurück zum Blog
          </Link>
          <p className="blog-meta" style={{ marginTop: "2rem" }}>
            {post.category}
          </p>
          <h1>{post.title}</h1>
          <p className="lead">{post.excerpt}</p>
          <div style={{ marginTop: "2.5rem", whiteSpace: "pre-wrap" }}>
            {post.content}
          </div>
          <div className="cta-band" style={{ marginTop: "3rem" }}>
            <h2>Sie möchten wissen, was davon für Ihren Betrieb zählt?</h2>
            <p className="lead">
              Schicken Sie kurz Ihre aktuelle Website oder Ihr Vorhaben. Wir
              geben Ihnen eine ehrliche Einschätzung, welche nächsten Schritte
              sinnvoll sind.
            </p>
            <Link className="btn btn-accent" href="/kontakt">
              Website-Check anfragen
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
