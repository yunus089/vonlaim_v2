import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Warum vonLaim",
  description:
    "Warum vonLaim Websites für Handwerksbetriebe klar, pragmatisch und auf Vertrauen, Sichtbarkeit und Anfragen ausgerichtet plant.",
  alternates: {
    canonical: "/warum-vonlaim"
  },
  openGraph: {
    title: "Warum vonLaim | Webdesign für Handwerk",
    description:
      "Warum vonLaim Websites für Handwerksbetriebe klar, pragmatisch und auf Vertrauen, Sichtbarkeit und Anfragen ausgerichtet plant.",
    url: "/warum-vonlaim",
    type: "website"
  }
};

export default function WhyPage() {
  return (
    <>
      <section className="section compact-hero">
        <div className="container">
          <span className="eyebrow">Warum vonLaim</span>
          <h1>Für Betriebe, die online so professionell wirken wollen wie vor Ort.</h1>
          <p className="lead">
            vonLaim plant Websites für Handwerksbetriebe pragmatisch:
            verständliche Inhalte, saubere Local-SEO-Struktur, einfache
            Kontaktwege und ein Ablauf, der Ihr Tagesgeschäft respektiert.
          </p>
          <div className="hero-cta">
            <Link className="btn btn-accent" href="/kontakt">
              Website-Check anfragen
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container grid-3">
          {[
            ["Handwerksnah", "Texte, Struktur und Seitenlogik orientieren sich an echten Fragen von Betriebsinhabern, Kunden und regionalen Suchanfragen."],
            ["Anfrage-orientiert", "Jede wichtige Sektion hat eine Aufgabe: erklären, Vertrauen aufbauen oder Kontakt erleichtern."],
            ["Sauber skalierbar", "Blog, Projekte, Leistungen, FAQs und SEO-Felder sind im eigenen Dashboard pflegbar und später erweiterbar."]
          ].map(([title, text]) => (
            <article className="card" key={title}>
              <CheckCircle2 size={24} aria-hidden="true" />
              <h2 style={{ fontSize: "2rem", marginTop: "1rem" }}>{title}</h2>
              <p className="muted">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Arbeitsweise</span>
              <h2>Direkt, transparent und ohne technische Nebelwand.</h2>
            </div>
            <p>
              vonLaim erklärt Entscheidungen so, dass sie nachvollziehbar
              bleiben. Sie müssen nicht wissen, wie jedes System im Detail
              funktioniert. Sie sollen verstehen, warum es Ihrem Betrieb hilft
              und welcher nächste Schritt sinnvoll ist.
            </p>
          </div>
          <div className="grid-4 process">
            {[
              ["Ziel klären", "Welche Anfragen sind wertvoll? Welche Leistungen sollen sichtbar werden? Welche Kunden passen wirklich?"],
              ["Website planen", "Sitemap, Inhalte, SEO-Grundlage und Kontaktwege werden vor dem Design geklärt."],
              ["Stark gestalten", "Hochwertig, modern und glaubwürdig, aber nicht verspielt oder künstlich."],
              ["Einfach pflegen", "Das Dashboard hält laufende Inhalte ohne Codeänderung aktuell."]
            ].map(([title, text]) => (
              <article className="card" key={title}>
                <h3>{title}</h3>
                <p className="muted">{text}</p>
              </article>
            ))}
          </div>
          <div className="hero-cta">
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
