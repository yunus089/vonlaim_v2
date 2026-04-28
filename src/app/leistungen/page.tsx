import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { getServices } from "@/lib/public-content";

export const dynamic = "force-dynamic";

const siteUrl = process.env.APP_URL ?? "https://www.vonlaim.de";

export const metadata: Metadata = {
  title: "Webdesign, Local SEO & Website-Pflege fürs Handwerk",
  description:
    "Strategie, Webdesign, Texte, Local SEO, Anfrageführung und Pflege für Handwerksbetriebe und technische Dienstleister in Bayern und Deutschland.",
  alternates: {
    canonical: "/leistungen"
  },
  openGraph: {
    title: "Webdesign, Local SEO & Website-Pflege fürs Handwerk | vonLaim",
    description:
      "Strategie, Webdesign, Texte, Local SEO, Anfrageführung und Pflege für Handwerksbetriebe und technische Dienstleister in Bayern und Deutschland.",
    url: "/leistungen",
    type: "website"
  }
};

export default async function ServicesPage() {
  const services = await getServices();
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${siteUrl}/leistungen#offer-catalog`,
    name: "vonLaim Leistungen",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      url: `${siteUrl}/leistungen#${service.slug}`,
      itemOffered: {
        "@type": "Service",
        "@id": `${siteUrl}/leistungen#${service.slug}`,
        name: service.title,
        description: service.summary,
        provider: {
          "@id": `${siteUrl}/#organization`
        },
        areaServed: ["Bayern", "Deutschland"]
      }
    }))
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <section className="section">
        <div className="container">
          <span className="eyebrow">Leistungen</span>
          <h1>Alles, was Ihre Handwerker-Website braucht, um verstanden, gefunden und angefragt zu werden.</h1>
          <p className="lead">
            Strategie, Texte, Design, Technik und Local SEO greifen zusammen.
            So entsteht keine digitale Visitenkarte, sondern eine Website, die
            Ihre Leistungen erklärt, regionale Nähe zeigt und Interessenten
            sicher zur Anfrage führt.
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
        <div className="container grid-2">
          {services.map((service) => (
            <article className="card service-card" key={service.id}>
              <div>
                <span className="card-icon">
                  <Icon name={service.icon} />
                </span>
                <p className="eyebrow" style={{ marginTop: "1.2rem" }}>
                  {service.eyebrow}
                </p>
                <h2 style={{ fontSize: "2.2rem" }}>{service.title}</h2>
                <p className="muted">{service.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Gewerke</span>
              <h2>Für jedes Gewerk die Fragen beantworten, die Kunden wirklich stellen.</h2>
            </div>
            <p>
              Ob SHK, Solar, Elektro, Dach, Bau oder Reinigung: Jede Seite
              sollte zeigen, welche Probleme Sie lösen, wo Sie arbeiten und was
              nach der Anfrage passiert.
            </p>
          </div>
          <div className="grid-3">
            {[
              "Eigene Suchintention pro Gewerk",
              "Regionale Relevanz ohne Keyword-Stuffing",
              "FAQ und Einwände je Branche",
              "Referenzen je Gewerbe, sobald vorhanden",
              "Interne Links von Hub zu Detailseiten",
              "Schema und Metadaten pro Seite"
            ].map((item) => (
              <div className="card" key={item}>
                <CheckCircle2 size={22} aria-hidden="true" />
                <h3 style={{ marginTop: "1rem" }}>{item}</h3>
              </div>
            ))}
          </div>
          <div className="hero-cta">
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
