import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: {
    index: false,
    follow: true
  }
};

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="container legal-copy">
        <span className="eyebrow">Rechtliches</span>
        <h1>Datenschutzerklärung</h1>
        <p>
          Diese Datenschutzseite ist eine technische und strukturelle
          Vorbereitung. Die finale Fassung muss vor Veröffentlichung anhand der
          tatsächlich eingesetzten Dienste, Anbieter und Prozesse juristisch
          geprüft werden.
        </p>
        <h2>Verantwortlicher</h2>
        <p>
          Yunus Kilic<br />
          vonLaim<br />
          Kriegerstr. 3a<br />
          82110 Germering<br />
          Deutschland<br />
          E-Mail: <a href="mailto:kontakt@vonlaim.de">kontakt@vonlaim.de</a><br />
          Telefon: <a href="tel:+4915205200600">+49 152 05200600</a>
        </p>
        <h2>Kontaktformular</h2>
        <p>
          Übermittelte Angaben werden zur Bearbeitung der Anfrage gespeichert.
          Dazu gehören Name, Betrieb, E-Mail, Telefonnummer, Anliegen,
          Einwilligung und Zeitpunkt der Anfrage.
        </p>
        <h2>Cookies</h2>
        <p>
          Zum Start werden nur technisch notwendige Cookies eingesetzt,
          insbesondere für den geschützten Admin-Login. Tracking wird erst nach
          sauberer Consent- und Anbieterprüfung aktiviert.
        </p>
        <h2>Hosting und Auftragsverarbeitung</h2>
        <p>
          Für Hosting, E-Mail, Analytics oder Medienablage sind geeignete
          Verträge zur Auftragsverarbeitung und EU-/DSGVO-konforme Anbieter zu
          prüfen.
        </p>
      </div>
    </section>
  );
}
