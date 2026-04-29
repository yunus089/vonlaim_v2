import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { getFaqs } from "@/lib/public-content";

export const dynamic = "force-dynamic";

const siteUrl = process.env.APP_URL ?? "https://www.vonlaim.de";

export const metadata: Metadata = {
  title: "FAQ zu Handwerker-Websites, Local SEO & Relaunch",
  description:
    "Antworten zu Kosten, Ablauf, Relaunch, Local SEO, Texten, Pflege, Datenschutz und Anfragequalität für Websites von Handwerksbetrieben.",
  alternates: {
    canonical: "/faq"
  },
  openGraph: {
    title: "FAQ zu Handwerker-Websites, Local SEO & Relaunch | vonLaim",
    description:
      "Antworten zu Kosten, Ablauf, Relaunch, Local SEO, Texten, Pflege, Datenschutz und Anfragequalität für Websites von Handwerksbetrieben.",
    url: "/faq",
    type: "website"
  }
};

export default async function FaqPage() {
  const faqs = await getFaqs();
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/faq#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <section className="section compact-hero">
        <div className="container">
          <span className="eyebrow">FAQ</span>
          <h1>Antworten auf die Einwände, die vor einem Website-Projekt normal sind.</h1>
          <p className="lead">
            Kosten, Aufwand, Relaunch, SEO, Pflege und Datenschutz: Hier sehen
            Sie, was realistisch ist, was von Ihnen gebraucht wird und wann ein
            Projekt sinnvoll ist.
          </p>
          <div className="hero-cta">
            <Link className="btn btn-accent" href="/kontakt">
              Kostenlosen Website-Check anfragen
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="container faq-list">
          {faqs.map((faq) => (
            <details className="faq-item" key={faq.id}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <h2>Nicht sicher, ob ein Relaunch lohnt?</h2>
            <p className="lead">
              Schicken Sie kurz Ihre Website oder Ihr Vorhaben. vonLaim sagt
              Ihnen ehrlich, ob ein kompletter Relaunch, ein kleiner Start oder
              ein späterer Zeitpunkt sinnvoll ist.
            </p>
            <Link className="btn btn-accent" href="/kontakt">
              Website-Check anfragen
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
