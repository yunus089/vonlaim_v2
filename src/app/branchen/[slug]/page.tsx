import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, MapPinned } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { getBranchPageBySlug, getBranchPages } from "@/lib/public-content";

const siteUrl = process.env.APP_URL ?? "https://www.vonlaim.de";
export const dynamic = "force-dynamic";

type BranchPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const pages = await getBranchPages();
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: BranchPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getBranchPageBySlug(slug);
  if (!page) return {};

  return {
    title: page.seo_title || page.title,
    description: page.seo_description || page.description,
    alternates: {
      canonical: `/branchen/${page.slug}`
    },
    openGraph: {
      title: `${page.title} | vonLaim`,
      description: page.description,
      url: `/branchen/${page.slug}`,
      type: "website"
    }
  };
}

export default async function BranchPage({ params }: BranchPageProps) {
  const { slug } = await params;
  const page = await getBranchPageBySlug(slug);
  if (!page) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/branchen/${page.slug}#webpage`,
        url: `${siteUrl}/branchen/${page.slug}`,
        name: page.title,
        description: page.description,
        inLanguage: "de-DE",
        isPartOf: {
          "@id": `${siteUrl}/#website`
        },
        about: {
          "@id": `${siteUrl}/branchen/${page.slug}#service`
        }
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/branchen/${page.slug}#service`,
        name: page.title,
        serviceType: `Website-Erstellung und Local SEO für ${page.audience}`,
        provider: {
          "@id": `${siteUrl}/#organization`
        },
        areaServed: ["Bayern", "Deutschland"],
        audience: {
          "@type": "Audience",
          audienceType: page.audience
        },
        description: page.description
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/branchen/${page.slug}#breadcrumb`,
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
            name: "Branchen",
            item: `${siteUrl}/branchen`
          },
          {
            "@type": "ListItem",
            position: 3,
            name: page.title,
            item: `${siteUrl}/branchen/${page.slug}`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/branchen/${page.slug}#faq`,
        mainEntity: page.faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer
          }
        }))
      }
    ]
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className="section compact-hero">
        <div className="container">
          <Link href="/branchen" className="btn btn-secondary">
            <ArrowLeft size={16} aria-hidden="true" />
            Alle Branchen
          </Link>
          <p className="eyebrow" style={{ marginTop: "2rem" }}>
            {page.audience}
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
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Typische Engpässe</span>
              <h2>Warum viele Websites in diesem Gewerk Anfragen verschenken.</h2>
            </div>
            <p>
              Eine gute Branchen-Seite beantwortet nicht nur, was angeboten
              wird. Sie zeigt auch, welche Aufträge passen, wo der Betrieb
              arbeitet und was nach der Anfrage passiert.
            </p>
          </div>
          <div className="grid-3">
            {page.painPoints.map((item) => (
              <article className="card" key={item}>
                <CheckCircle2 size={22} aria-hidden="true" />
                <p style={{ marginTop: "1rem" }}>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div>
            <span className="eyebrow">
              <MapPinned size={16} aria-hidden="true" />
              Struktur
            </span>
            <h2>Welche Inhalte für diese Branche sinnvoll sind.</h2>
            <p className="lead">
              Ziel ist keine überladene Website, sondern eine klare Struktur:
              Leistungen, Region, Ablauf, Vertrauen und Kontakt müssen so
              sortiert sein, dass Kunden schnell entscheiden können.
            </p>
          </div>
          <div className="proof-card proof-card-clean">
            <h3 style={{ marginTop: 0 }}>Empfohlene Module</h3>
            <ul className="plain-list">
              {page.services.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">FAQ</span>
              <h2>Fragen, die Kunden und Suchsysteme sauber einordnen sollten.</h2>
            </div>
            <p>
              Diese Antworten sind bewusst klar formuliert, damit echte
              Besucher und KI-Suchsysteme schnell verstehen, welche Website
              für dieses Gewerk sinnvoll ist.
            </p>
          </div>
          <div className="faq-list">
            {page.faqs.map(([question, answer]) => (
              <details className="faq-item" key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band">
            <span className="eyebrow">Website-Check</span>
            <h2>Nicht sicher, welche Struktur zu Ihrem Betrieb passt?</h2>
            <p className="lead">
              Schicken Sie kurz Gewerk, Region und aktuelle Website. vonLaim
              prüft, welche Seiten, Inhalte und Kontaktwege für Ihren Betrieb
              realistisch sinnvoll sind.
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
