import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="brand">
            <span className="brand-mark">vL</span>
            <span>vonLaim</span>
          </Link>
          <p>
            Websites für Handwerksbetriebe und technische Dienstleister in
            Bayern: klar erklärt, lokal auffindbar und auf passende Anfragen
            ausgelegt.
          </p>
        </div>
        <div className="footer-links">
          <strong>Seiten</strong>
          <Link href="/leistungen">Leistungen</Link>
          <Link href="/warum-vonlaim">Warum vonLaim</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <div className="footer-links">
          <strong>Kontakt</strong>
          <a href="tel:+4915205200600">+49 152 05200600</a>
          <a href="mailto:kontakt@vonlaim.de">kontakt@vonlaim.de</a>
          <Link href="/kontakt">Erstgespräch anfragen</Link>
        </div>
        <div className="footer-links">
          <strong>Rechtliches</strong>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
