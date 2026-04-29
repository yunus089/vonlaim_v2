import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, MapPinned } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { getRegionPageBySlug, getRegionPages } from "@/lib/public-content";

const siteUrl = process.env.APP_URL ?? "https://www.vonlaim.de";
export const dynamic = "force-dynamic";

type RegionPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const pages = await getRegionPages();
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: RegionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getRegionPageBySlug(slug);
  if (!page) return {};

  return {
    title: page.seo_title || page.title,
    description: page.seo_description || page.description,
    alternates: {
      canonical: `/regionen/${page.slug}`
    },
    openGraph: {
      title: `${page.title} | vonLaim`,
      description: page.description,
      url: `/regionen/${page.slug}`,
      type: "website"
    }
  };
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { slug } = await params;
  const page = await getRegionPageBySlug(slug);
  if (!page) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/regionen/${page.slug}#webpage`,
        url: `${siteUrl}/regionen/${page.slug}`,
        name: page.title,
        description: page.description,
        inLanguage: "de-DE",
        isPartOf: {
          "@id": `${siteUrl}/#website`
        },
        about: {
          "@id": `${siteUrl}/#organization`
        }
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/regionen/${page.slug}#service`,
        name: page.title,
        serviceType: "Webdesign und Local SEO für Handwerksbetriebe",
        provider: {
          "@id": `${siteUrl}/#organization`
        },
        areaServed: [page.region, ...page.nearby, "Bayern"],
        audience: {
          "@type": "Audience",
          audienceType: "Handwerksbetriebe und lokale Dienstleister"
        },
        description: page.description
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/regionen/${page.slug}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Startseite",
            item: siteUrl
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Regionen",
            item: `${siteUrl}/regionen`
          },
          {
            "@type": "ListItem",
            position: 3,
            name: page.title,
            item: `${siteUrl}/regionen/${page.slug}`
          }
        ]
      }
    ]
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className="section compact-hero">
        <div className="container">
          <Link href="/regionen" className="btn btn-secondary">
            <ArrowLeft size={16} aria-hidden="true" />
            Alle Regionen
          </Link>
          <p className="eyebrow" style={{ marginTop: "2rem" }}>
            {page.region}
          </p>
          <h1>{page.h1}</h1>
          <p className="lead">{page.description}</p>
          <div className="hero-cta">
            <Link className="btn btn-accent" href="/kontakt">
              Website-Check anfragen
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a className="btn btn-secondary" href="tel:+4915205200600">
              Direkt anrufen
            </a>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container grid-2">
          <div>
            <span className="eyebrow">
              <MapPinned size={16} aria-hidden="true" />
              Lokale Einordnung
            </span>
            <h2>Regionale Nähe zeigen, ohne austauschbare Ortsseiten zu bauen.</h2>
            <p className="lead">{page.focus}</p>
          </div>
          <div className="proof-card proof-card-clean">
            <h3 style={{ marginTop: 0 }}>Wichtige Orte und Bezüge</h3>
            <ul className="plain-list">
              {[page.region, ...page.nearby].map((item) => (
                <li key={item}>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Local SEO</span>
              <h2>Was eine regionale Handwerker-Website leisten sollte.</h2>
            </div>
            <p>
              Eine regionale Website sollte nicht nur den Ort nennen. Sie muss
              zeigen, welche Leistungen in welchem Einzugsgebiet relevant sind,
              wie der erste Kontakt funktioniert und warum der Betrieb für
              lokale Kunden vertrauenswürdig ist.
            </p>
          </div>
          <div className="grid-3">
            {[
              "Leistungen und Einzugsgebiet verständlich verbinden",
              "Kundenfragen aus der Region direkt beantworten",
              "Kontaktwege für Anruf, Formular und Termin sichtbar machen",
              "Spätere Referenzen mit Ort und Gewerk sauber einordnen",
              "Google, KI-Suche und Menschen mit klaren Fakten versorgen",
              "Keine dünnen Ortsseiten ohne echten Nutzen veröffentlichen"
            ].map((item) => (
              <article className="card" key={item}>
                <CheckCircle2 size={22} aria-hidden="true" />
                <h3 style={{ marginTop: "1rem" }}>{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="cta-band">
            <span className="eyebrow">Website-Check</span>
            <h2>Soll Ihre Website in {page.region} besser verstanden werden?</h2>
            <p className="lead">
              Schicken Sie kurz aktuelle Website, Gewerk und Einsatzgebiet.
              vonLaim prüft, welche lokale Struktur sinnvoll ist und welcher
              nächste Schritt zu Ihrem Betrieb passt.
            </p>
            <Link className="btn btn-accent" href="/kontakt">
              Kostenlosen Website-Check anfragen
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
