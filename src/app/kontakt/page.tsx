import type { Metadata } from "next";
import { Calendar, Mail, Phone } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { submitLead } from "@/app/kontakt/actions";

const siteUrl = process.env.APP_URL ?? "https://www.vonlaim.de";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kostenlose Einschätzung für Ihre Handwerker-Website anfragen: Relaunch, Local SEO, bessere Anfragen oder professionellerer erster Eindruck.",
  alternates: {
    canonical: "/kontakt"
  },
  openGraph: {
    title: "Kontakt | vonLaim",
    description:
      "Kostenlose Einschätzung für Ihre Handwerker-Website anfragen: Relaunch, Local SEO, bessere Anfragen oder professionellerer erster Eindruck.",
    url: "/kontakt",
    type: "website"
  }
};

type ContactPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { error } = await searchParams;
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteUrl}/kontakt#contact`,
    name: "Kontakt mit vonLaim",
    about: {
      "@id": `${siteUrl}/#organization`
    },
    mainEntity: {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#organization`,
      name: "vonLaim",
      email: "kontakt@vonlaim.de",
      telephone: "+4915205200600",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Kriegerstr. 3a",
        postalCode: "82110",
        addressLocality: "Germering",
        addressRegion: "Bayern",
        addressCountry: "DE"
      },
      areaServed: ["Bayern", "Deutschland"]
    }
  };

  return (
    <>
      <JsonLd data={contactSchema} />
      <section className="section">
        <div className="container">
          <span className="eyebrow">Kontakt</span>
          <h1>Kostenlose Einschätzung für Ihre Handwerker-Website anfragen.</h1>
          <p className="lead">
            Schreiben Sie kurz, wo Ihr Betrieb steht und was Sie erreichen
            wollen: mehr passende Anfragen, bessere lokale Sichtbarkeit, einen
            Relaunch oder einen professionelleren ersten Eindruck. Sie erhalten
            eine ehrliche Einschätzung und einen sinnvollen nächsten Schritt.
          </p>
        </div>
      </section>

      <section className="section alt">
        <div className="container grid-2">
          <form action={submitLead} className="card form-grid">
            {error ? (
              <p className="status draft">
                Bitte ergänzen Sie Name, gültige E-Mail, Beschreibung und Datenschutz-Zustimmung.
              </p>
            ) : null}
            <div className="field">
              <label htmlFor="name">Ihr Name *</label>
              <input id="name" name="name" required autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="company">Betrieb / Firma</label>
              <input id="company" name="company" autoComplete="organization" />
            </div>
            <div className="field">
              <label htmlFor="email">E-Mail *</label>
              <input id="email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="field">
              <label htmlFor="phone">Telefon (optional)</label>
              <input id="phone" name="phone" autoComplete="tel" />
              <small>Nur für kurze Rückfragen oder die Terminabstimmung.</small>
            </div>
            <div className="field">
              <label htmlFor="service_interest">Was möchten Sie verbessern?</label>
              <select id="service_interest" name="service_interest" defaultValue="Website-Relaunch">
                <option>Website-Relaunch</option>
                <option>Neue Website</option>
                <option>Local SEO / Sichtbarkeit</option>
                <option>Pflege / Weiterentwicklung</option>
                <option>Noch unklar</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">Wobei sollen wir helfen? *</label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="z. B. Gewerk, Region, aktuelle Website und wichtigstes Ziel"
              />
            </div>
            <label className="plain-list" style={{ display: "flex", gap: "0.6rem" }}>
              <input name="consent" type="checkbox" required />
              <span>
                Ich stimme zu, dass meine Angaben zur Bearbeitung der Anfrage
                verarbeitet werden. *
              </span>
            </label>
            <button className="btn btn-accent" type="submit">
              Einschätzung anfragen
            </button>
            <small className="muted">Kein Newsletter. Keine automatische Angebotsstrecke.</small>
          </form>

          <aside className="card">
            <h2 style={{ fontSize: "2rem" }}>Kurz, direkt, ohne Verkaufsdruck</h2>
            <ul className="plain-list">
              <li>
                <Phone size={20} aria-hidden="true" />
                <a href="tel:+4915205200600">+49 152 05200600</a>
              </li>
              <li>
                <Mail size={20} aria-hidden="true" />
                <a href="mailto:kontakt@vonlaim.de">kontakt@vonlaim.de</a>
              </li>
              <li>
                <Calendar size={20} aria-hidden="true" />
                Termin nach kurzer Abstimmung
              </li>
            </ul>
            <p className="muted">
              Kein langer Fragebogen, kein Fachchinesisch. Eine kurze
              Einschätzung reicht oft, um zu sehen, ob ein Relaunch, ein
              kleiner Start oder ein späterer Zeitpunkt sinnvoll ist.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
