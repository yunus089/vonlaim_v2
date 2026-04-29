import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPinned } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { getRegionPages } from "@/lib/public-content";

const siteUrl = process.env.APP_URL ?? "https://www.vonlaim.de";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Webdesign für Handwerker in Bayern",
  description:
    "Regionale Webdesign-Seiten für Handwerksbetriebe in München, Germering und dem Landkreis Fürstenfeldbruck.",
  alternates: {
    canonical: "/regionen"
  },
  openGraph: {
    title: "Webdesign für Handwerker in Bayern | vonLaim",
    description:
      "Regionale Webdesign-Seiten für Handwerksbetriebe in München, Germering und dem Landkreis Fürstenfeldbruck.",
    url: "/regionen",
    type: "website"
  }
};

export default async function RegionsPage() {
  const regionPages = await getRegionPages();
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/regionen#collection`,
    url: `${siteUrl}/regionen`,
    name: "Webdesign für Handwerker in Bayern",
    description:
      "Regionen-Hub für lokale Handwerker-Websites in München, Germering und dem Landkreis Fürstenfeldbruck.",
    isPartOf: {
      "@id": `${siteUrl}/#website`
    },
    about: {
      "@id": `${siteUrl}/#organization`
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: regionPages.map((page, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/regionen/${page.slug}`,
        name: page.title
      }))
    }
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className="section compact-hero">
        <div className="container">
          <span className="eyebrow">Regionen</span>
          <h1>Webdesign für Handwerker in Bayern, klar lokal aufgebaut.</h1>
          <p className="lead">
            Regionale Sichtbarkeit entsteht nicht durch gestapelte Ortsnamen.
            Sie entsteht, wenn Leistungen, Einzugsgebiet, Kundenfragen und
            Kontaktwege sinnvoll zusammenarbeiten.
          </p>
          <div className="hero-cta">
            <Link className="btn btn-accent" href="/kontakt">
              Website-Check anfragen
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className="btn btn-secondary" href="/branchen">
              Branchen ansehen
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container grid-3">
          {regionPages.map((page) => (
            <article className="card service-card" key={page.slug}>
              <div>
                <span className="card-icon">
                  <MapPinned size={22} aria-hidden="true" />
                </span>
                <p className="eyebrow" style={{ marginTop: "1.2rem" }}>
                  {page.region}
                </p>
                <h2 style={{ fontSize: "2rem" }}>{page.title}</h2>
                <p className="muted">{page.description}</p>
              </div>
              <Link className="btn btn-secondary" href={`/regionen/${page.slug}`}>
                Region ansehen
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
