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
        <p className="muted">Stand: April 2026</p>
        <p>
          Diese Datenschutzerklärung informiert darüber, welche
          personenbezogenen Daten beim Besuch dieser Website und bei einer
          Kontaktaufnahme verarbeitet werden.
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
        <h2>Hosting und Server-Logfiles</h2>
        <p>
          Beim Aufruf der Website werden technisch erforderliche Daten
          verarbeitet, damit die Seite ausgeliefert und sicher betrieben werden
          kann. Dazu können IP-Adresse, Datum und Uhrzeit des Zugriffs,
          angefragte URL, Referrer, Browser-/Geräteinformationen und
          Serverstatus gehören. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO;
          das berechtigte Interesse liegt im sicheren und stabilen Betrieb der
          Website.
        </p>
        <h2>Kontaktformular</h2>
        <p>
          Übermittelte Angaben werden zur Bearbeitung der Anfrage gespeichert.
          Dazu gehören Name, Betrieb, E-Mail, Telefonnummer, aktuelle Website,
          Gewerk/Branche, Region/Einsatzgebiet, Anliegen, Einwilligung und
          Zeitpunkt der Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO,
          soweit die Anfrage auf vorvertragliche Maßnahmen gerichtet ist, sowie
          Art. 6 Abs. 1 lit. f DSGVO für die strukturierte Bearbeitung und
          Nachverfolgung der Anfrage.
        </p>
        <h2>Cookies</h2>
        <p>
          Die Website nutzt notwendige Speicher- und Zugriffsvorgänge für den
          sicheren Betrieb, die Datenschutzauswahl und den geschützten
          Admin-Login. Diese sind nach § 25 Abs. 2 TDDDG erforderlich.
          Optionale Analytics werden nur nach Einwilligung nach § 25 Abs. 1
          TDDDG und Art. 6 Abs. 1 lit. a DSGVO aktiviert.
        </p>
        <h2>First-party Analytics</h2>
        <p>
          Wenn Sie Analytics akzeptieren, werden Seitenaufrufe, Klicks und
          Formularinteraktionen sowie Scroll-Tiefen intern erfasst. Dazu werden
          eine Session-ID, URL, Referrer, Zeitpunkt, Browserinformationen,
          Darstellungsgröße, Spracheinstellung und Ereignisdetails verarbeitet.
          IP-Adressen werden nicht im Klartext gespeichert, sondern serverseitig
          gehasht. Es werden keine externen Werbe- oder Tracking-Skripte wie
          Google Analytics, Meta Pixel oder vergleichbare Dienste geladen. Sie
          können Ihre Einwilligung jederzeit über die Datenschutzeinstellungen
          widerrufen.
        </p>
        <h2>Medien und externe Inhalte</h2>
        <p>
          Bilder und Medien werden grundsätzlich lokal über diese Website
          bereitgestellt. Externe Inhalte wie Karten, Videos, Social-Media-
          Embeds oder externe Fonts sollten erst eingebunden werden, wenn eine
          passende Rechtsgrundlage, Anbieterprüfung und Information in dieser
          Datenschutzerklärung ergänzt wurden.
        </p>
        <h2>Speicherdauer</h2>
        <p>
          Anfragen werden gespeichert, solange dies für die Bearbeitung,
          mögliche Anschlusskommunikation und gesetzliche Nachweispflichten
          erforderlich ist. Gesetzliche Aufbewahrungspflichten bleiben
          unberührt. Analytics-Daten werden nur solange gespeichert, wie sie für
          Website-Optimierung und Erfolgsmessung erforderlich sind, und
          regelmäßig auf Löschbedarf geprüft.
        </p>
        <h2>Hosting und Auftragsverarbeitung</h2>
        <p>
          Für Hosting, E-Mail, Analytics oder Medienablage sind geeignete
          Verträge zur Auftragsverarbeitung und EU-/DSGVO-konforme Anbieter zu
          prüfen.
        </p>
        <h2>Ihre Rechte</h2>
        <p>
          Sie haben nach Maßgabe der DSGVO das Recht auf Auskunft, Berichtigung,
          Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie
          Widerspruch gegen bestimmte Verarbeitungen. Soweit eine Verarbeitung
          auf Einwilligung beruht, können Sie diese jederzeit mit Wirkung für
          die Zukunft widerrufen.
        </p>
        <h2>Beschwerderecht</h2>
        <p>
          Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu
          beschweren. Zuständig kann insbesondere die Aufsichtsbehörde Ihres
          Aufenthaltsorts, Arbeitsplatzes oder des Orts des mutmaßlichen
          Verstoßes sein.
        </p>
      </div>
    </section>
  );
}
