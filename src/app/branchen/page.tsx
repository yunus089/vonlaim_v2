import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { getBranchPages } from "@/lib/public-content";

const siteUrl = process.env.APP_URL ?? "https://www.vonlaim.de";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Webdesign für Handwerker nach Branche",
  description:
    "Branchen-Seiten für Handwerksbetriebe: Webdesign für Elektriker, SHK, Dachdecker, Maler, Reinigungsfirmen und lokale Dienstleister.",
  alternates: {
    canonical: "/branchen"
  },
  openGraph: {
    title: "Webdesign für Handwerker nach Branche | vonLaim",
    description:
      "Branchen-Seiten für Handwerksbetriebe: klare Website-Struktur für Elektriker, SHK, Dachdecker, Maler und Reinigungsfirmen.",
    url: "/branchen",
    type: "website"
  }
};

export default async function BranchesPage() {
  const branchPages = await getBranchPages();
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/branchen#collection`,
    url: `${siteUrl}/branchen`,
    name: "Webdesign für Handwerker nach Branche",
    description:
      "Branchen-Hub für Handwerker-Websites mit konkreter Struktur für lokale Dienstleister und technische Gewerke.",
    isPartOf: {
      "@id": `${siteUrl}/#website`
    },
    about: {
      "@id": `${siteUrl}/#organization`
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: branchPages.map((page, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/branchen/${page.slug}`,
        name: page.title
      }))
    }
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className="section compact-hero">
        <div className="container">
          <span className="eyebrow">Branchen</span>
          <h1>Webdesign für Handwerksbranchen, die online klarer eingeordnet werden wollen.</h1>
          <p className="lead">
            Ein Elektriker braucht andere Inhalte als ein SHK-Betrieb, ein
            Dachdecker oder eine Reinigungsfirma. Die Seitenstruktur muss
            typische Leistungen, Kundenfragen und Anfragewege des jeweiligen
            Gewerks verständlich abbilden.
          </p>
          <div className="hero-cta">
            <Link className="btn btn-accent" href="/kontakt">
              Website-Check anfragen
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className="btn btn-secondary" href="/regionen">
              Regionen ansehen
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container grid-3">
          {branchPages.map((page) => (
            <article className="card service-card" key={page.slug}>
              <div>
                <span className="card-icon">
                  <BadgeCheck size={22} aria-hidden="true" />
                </span>
                <p className="eyebrow" style={{ marginTop: "1.2rem" }}>
                  {page.audience}
                </p>
                <h2 style={{ fontSize: "2rem" }}>{page.title}</h2>
                <p className="muted">{page.description}</p>
              </div>
              <Link className="btn btn-secondary" href={`/branchen/${page.slug}`}>
                Seite ansehen
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
