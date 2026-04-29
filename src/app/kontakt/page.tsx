import type { Metadata } from "next";
import { Calendar, CheckCircle2, Globe2, Hammer, Mail, Phone, ScanSearch } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { submitLead } from "@/app/kontakt/actions";

const siteUrl = process.env.APP_URL ?? "https://www.vonlaim.de";

export const metadata: Metadata = {
  title: "Kostenlosen Website-Check anfragen",
  description:
    "Kostenlosen Website-Check für Handwerksbetriebe anfragen: Relaunch, Local SEO, bessere Anfragen oder professionellerer erster Eindruck.",
  alternates: {
    canonical: "/kontakt"
  },
  openGraph: {
    title: "Kontakt | vonLaim",
    description:
      "Kostenlosen Website-Check für Handwerksbetriebe anfragen: Relaunch, Local SEO, bessere Anfragen oder professionellerer erster Eindruck.",
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
      <section className="section compact-hero">
        <div className="container">
          <span className="eyebrow">Kontakt</span>
          <h1>Kostenlosen Website-Check für Ihren Handwerksbetrieb anfragen.</h1>
          <p className="lead">
            Schreiben Sie kurz, welches Gewerk, welche Region und welches Ziel
            für Sie wichtig ist. Wir prüfen Ihre aktuelle Situation und sagen
            ehrlich, ob ein Relaunch, ein kleiner Umbau oder ein späterer
            Zeitpunkt sinnvoll ist.
          </p>
          <div className="trust-row" aria-label="Kontaktversprechen">
            <span className="chip">
              <ScanSearch size={16} aria-hidden="true" />
              15 bis 20 Minuten Orientierung
            </span>
            <span className="chip">
              <CheckCircle2 size={16} aria-hidden="true" />
              Kein Newsletter
            </span>
            <span className="chip">
              <Phone size={16} aria-hidden="true" />
              Rückruf nach kurzer Abstimmung
            </span>
          </div>
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
            <div className="form-trap" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
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
              <label htmlFor="current_website">Aktuelle Website (optional)</label>
              <input
                id="current_website"
                name="current_website"
                type="text"
                inputMode="url"
                placeholder="z. B. vonlaim.de"
                autoComplete="url"
              />
              <small>Hilft uns, schneller konkrete Hinweise zu geben.</small>
            </div>
            <div className="field">
              <label htmlFor="trade">Gewerk / Branche</label>
              <input
                id="trade"
                name="trade"
                placeholder="z. B. Elektro, SHK, Dach, Reinigung"
              />
            </div>
            <div className="field">
              <label htmlFor="region_goal">Region / Einsatzgebiet</label>
              <input
                id="region_goal"
                name="region_goal"
                placeholder="z. B. München, Germering, Bayern"
              />
            </div>
            <div className="field">
              <label htmlFor="service_interest">Was möchten Sie verbessern?</label>
              <select id="service_interest" name="service_interest" defaultValue="Kostenloser Website-Check">
                <option>Kostenloser Website-Check</option>
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
                placeholder="z. B. Was soll Ihre Website besser machen? Welche Anfragen möchten Sie häufiger oder seltener bekommen?"
              />
            </div>
            <label className="plain-list" style={{ display: "flex", gap: "0.6rem" }}>
              <input name="consent" type="checkbox" required />
              <span>
                Ich stimme zu, dass meine Angaben zur Bearbeitung der Anfrage
                verarbeitet werden. Hinweise dazu stehen in der{" "}
                <a href="/datenschutz">Datenschutzerklärung</a>. *
              </span>
            </label>
            <button className="btn btn-accent" type="submit">
              Kostenlosen Website-Check anfragen
            </button>
            <small className="muted">
              Unverbindlich. Keine automatische Angebotsstrecke. Wenn ein Relaunch gerade nicht sinnvoll ist, sagen wir das.
            </small>
          </form>

          <aside className="card">
            <h2 style={{ fontSize: "2rem" }}>Was nach Ihrer Anfrage passiert</h2>
            <ul className="plain-list">
              <li>
                <Globe2 size={20} aria-hidden="true" />
                Wir prüfen Ihre Angaben und, falls vorhanden, Ihre aktuelle Website.
              </li>
              <li>
                <Hammer size={20} aria-hidden="true" />
                Sie bekommen eine kurze Rückmeldung mit sinnvollem nächsten Schritt.
              </li>
              <li>
                <Calendar size={20} aria-hidden="true" />
                Wenn es passt, sprechen wir über Umfang, Ablauf und Budgetrahmen.
              </li>
            </ul>
            <h3 style={{ marginTop: "2rem" }}>Direkter Kontakt</h3>
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
