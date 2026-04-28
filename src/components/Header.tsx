import Link from "next/link";
import { Calendar, Phone } from "lucide-react";

const nav = [
  ["Leistungen", "/leistungen"],
  ["Warum vonLaim", "/warum-vonlaim"],
  ["Blog", "/blog"],
  ["FAQ", "/faq"],
  ["Kontakt", "/kontakt"]
];

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="vonLaim Startseite">
          <span className="brand-mark">vL</span>
          <span>vonLaim</span>
        </Link>
        <nav className="nav" aria-label="Hauptnavigation">
          {nav.map(([label, href]) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <a className="btn btn-secondary icon-btn" href="tel:+4915205200600" aria-label="vonLaim anrufen" title="Anrufen">
            <Phone size={18} aria-hidden="true" />
          </a>
          <Link className="btn btn-accent" href="/kontakt">
            <Calendar size={18} aria-hidden="true" />
            Erstgespräch anfragen
          </Link>
        </div>
      </div>
    </header>
  );
}
