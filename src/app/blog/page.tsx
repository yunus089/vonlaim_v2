import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPublishedPosts } from "@/lib/public-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog und Insights",
  description:
    "Praxisnahe Artikel zu Webdesign, Local SEO, Relaunch, Website-Texten und Anfragequalität für Handwerksbetriebe.",
  alternates: {
    canonical: "/blog"
  },
  openGraph: {
    title: "Blog und Insights | vonLaim",
    description:
      "Praxisnahe Artikel zu Webdesign, Local SEO, Relaunch, Website-Texten und Anfragequalität für Handwerksbetriebe.",
    url: "/blog",
    type: "website"
  }
};

export default async function BlogPage() {
  const posts = await getPublishedPosts(30);

  return (
    <>
      <section className="section">
        <div className="container">
          <span className="eyebrow">Blog / Insights</span>
          <h1>Ratgeber für Betriebe, die online bessere Entscheidungen treffen wollen.</h1>
          <p className="lead">
            Praxisnahe Artikel zu Website-Relaunch, Local SEO, Webtexten und
            Anfragequalität. Kurz genug für den Betriebsalltag, konkret genug
            für die nächste Entscheidung.
          </p>
          <div className="hero-cta">
            <Link className="btn btn-accent" href="/kontakt">
              Website einschätzen lassen
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="container grid-3">
          {posts.map((post) => (
            <article className="card blog-card" key={post.id}>
              <div>
                <p className="blog-meta">{post.category}</p>
                <h2 style={{ fontSize: "1.7rem" }}>{post.title}</h2>
                <p className="muted">{post.excerpt}</p>
              </div>
              <Link className="btn btn-secondary" href={`/blog/${post.slug}`}>
                Artikel lesen
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <h2>Sie möchten nicht erst zehn Artikel lesen?</h2>
            <p className="lead">
              Schicken Sie kurz Ihr Vorhaben. Wir sagen Ihnen, welche Punkte
              für Ihre Website zuerst zählen.
            </p>
            <Link className="btn btn-accent" href="/kontakt">
              Website einschätzen lassen
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
