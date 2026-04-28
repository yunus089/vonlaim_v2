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
        <h1>Cookie-Hinweise</h1>
        <p>
          Aktuell ist die Website so vorbereitet, dass nur technisch notwendige
          Cookies verwendet werden. Der Admin-Login benötigt ein sicheres
          Session-Cookie.
        </p>
        <h2>Tracking</h2>
        <p>
          Analytics oder Marketing-Dienste werden erst eingebunden, wenn ein
          passendes Consent-Konzept, Datenschutztext und Anbieterprüfung
          vorliegen.
        </p>
      </div>
    </section>
  );
}
