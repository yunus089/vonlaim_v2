import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies",
  robots: {
    index: false,
    follow: true
  }
};

export default function CookiesPage() {
  return (
    <section className="section">
      <div className="container legal-copy">
        <span className="eyebrow">Rechtliches</span>
        <h1>Cookie- und Consent-Hinweise</h1>
        <p>
          Diese Seite erklärt, welche Kategorien auf vonLaim eingesetzt werden
          und wie Sie Ihre Auswahl ändern können. Einwilligungsbedürftige
          Analytics werden erst gestartet, wenn Sie aktiv zustimmen.
        </p>
        <h2>Notwendige Funktionen</h2>
        <p>
          Notwendige Funktionen dienen dem sicheren Betrieb der Website, der
          Speicherung Ihrer Datenschutzauswahl und dem geschützten
          Admin-Login. Diese Funktionen sind erforderlich, damit die Website
          technisch bereitgestellt werden kann.
        </p>
        <h2>Optionale Analytics</h2>
        <p>
          Optional kann eine interne, first-party Analytics-Erfassung aktiviert
          werden. Sie misst Seitenaufrufe, Klicks und Formularinteraktionen,
          Scroll-Tiefen und Kontaktweg-Nutzung, damit vonLaim die Website
          verbessern kann. Es werden keine externen Google-, Meta- oder
          Werbe-Skripte geladen. Analytics startet nur nach Ihrer Zustimmung.
        </p>
        <h2>Auswahl ändern</h2>
        <p>
          Sie können Cookies ablehnen, alle optionalen Cookies akzeptieren oder
          einzelne Kategorien einstellen. Ihre Auswahl können Sie jederzeit über
          den Button „Datenschutz“ unten rechts oder über den Link
          „Cookie-Einstellungen“ im Footer ändern.
        </p>
        <h2>Rechtsgrundlagen</h2>
        <p>
          Notwendige Speicher- und Zugriffsvorgänge stützen sich auf § 25 Abs. 2
          TDDDG. Optionale Analytics stützt sich auf Ihre Einwilligung nach
          § 25 Abs. 1 TDDDG und Art. 6 Abs. 1 lit. a DSGVO. Der Widerruf ist
          jederzeit mit Wirkung für die Zukunft möglich.
        </p>
      </div>
    </section>
  );
}
