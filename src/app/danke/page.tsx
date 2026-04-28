import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  robots: {
    index: false
  }
};

export default function ThanksPage() {
  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">Danke</span>
        <h1>Ihre Anfrage ist angekommen.</h1>
        <p className="lead">
          vonLaim meldet sich mit einer ehrlichen Einschätzung und einem
          sinnvollen nächsten Schritt. Bis dahin können Sie prüfen, welche
          Leistungen für Ihren Betrieb relevant sind oder welche Fragen im FAQ
          bereits beantwortet werden.
        </p>
        <div className="hero-cta">
          <Link className="btn btn-accent" href="/leistungen">
            Leistungen ansehen
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link className="btn btn-secondary" href="/faq">
            FAQ ansehen
          </Link>
        </div>
      </div>
    </section>
  );
}
