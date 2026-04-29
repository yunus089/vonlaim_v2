import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  robots: {
    index: false,
    follow: true
  }
};

export default function ImprintPage() {
  return (
    <section className="section">
      <div className="container legal-copy">
        <span className="eyebrow">Rechtliches</span>
        <h1>Impressum</h1>
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          Yunus Kilic<br />
          vonLaim<br />
          Kriegerstr. 3a<br />
          82110 Germering<br />
          Deutschland
        </p>
        <h2>Kontakt</h2>
        <p>
          Telefon: <a href="tel:+4915205200600">+49 152 05200600</a><br />
          E-Mail: <a href="mailto:kontakt@vonlaim.de">kontakt@vonlaim.de</a><br />
          Website: <a href="https://www.vonlaim.de">www.vonlaim.de</a>
        </p>
        <h2>Umsatzsteuer</h2>
        <p>
          Als Kleinunternehmer im Sinne von § 19 UStG wird keine Umsatzsteuer
          ausgewiesen. Eine Umsatzsteuer-Identifikationsnummer ist nicht
          vorhanden.
        </p>
        <h2>Verantwortlich für journalistisch-redaktionelle Inhalte</h2>
        <p>
          Verantwortlich nach § 18 Abs. 2 MStV:<br />
          Yunus Kilic<br />
          Kriegerstr. 3a<br />
          82110 Germering
        </p>
        <h2>Verbraucherstreitbeilegung</h2>
        <p>
          vonLaim ist nicht verpflichtet und nicht bereit, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
        <h2>Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter ist vonLaim nach den allgemeinen Gesetzen für
          eigene Inhalte auf diesen Seiten verantwortlich. Eine Verpflichtung
          zur Überwachung übermittelter oder gespeicherter fremder
          Informationen besteht nur nach Maßgabe der gesetzlichen Vorschriften.
        </p>
        <h2>Haftung für Links</h2>
        <p>
          Diese Website kann Links zu externen Websites enthalten. Für deren
          Inhalte sind ausschließlich die jeweiligen Anbieter verantwortlich.
          Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
          erkennbar.
        </p>
      </div>
    </section>
  );
}
