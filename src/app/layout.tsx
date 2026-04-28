import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Phone } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { MotionOrchestrator } from "@/components/MotionOrchestrator";
import "./globals.css";

const appUrl = process.env.APP_URL ?? "https://www.vonlaim.de";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  applicationName: "vonLaim",
  generator: "Next.js",
  title: {
    default: "Webdesign für Handwerker in Bayern | vonLaim",
    template: "%s | vonLaim"
  },
  description:
    "vonLaim aus Germering entwickelt Websites für Handwerksbetriebe: klare Leistungen, Local SEO, Vertrauen und Kontaktwege für bessere Anfragen in Bayern und Deutschland.",
  openGraph: {
    title: "Webdesign für Handwerker in Bayern | vonLaim",
    description:
      "Websites für Handwerksbetriebe: klare Leistungen, Local SEO, Vertrauen und Kontaktwege für bessere Anfragen in Bayern und Deutschland.",
    url: appUrl,
    siteName: "vonLaim",
    locale: "de_DE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Webdesign für Handwerker in Bayern | vonLaim",
    description:
      "Websites für Handwerksbetriebe: klare Leistungen, Local SEO, Vertrauen und Kontaktwege für bessere Anfragen in Bayern und Deutschland."
  },
  alternates: {
    canonical: "/"
  },
  category: "Webdesign Agentur",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organization = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${appUrl}/#organization`,
        name: "vonLaim",
        legalName: "Yunus Kilic / vonLaim",
        alternateName: "vonLaim Webdesign",
        url: appUrl,
        slogan: "Webseiten, die Handwerk sichtbar machen.",
        description:
          "Webdesign-Agentur für Handwerksbetriebe und technische Dienstleister in Bayern und Deutschland. vonLaim entwickelt Websites, die Leistungen verständlich machen, Vertrauen aufbauen und Anfragen erleichtern.",
        founder: {
          "@type": "Person",
          name: "Yunus Kilic"
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Kriegerstr. 3a",
          postalCode: "82110",
          addressLocality: "Germering",
          addressRegion: "Bayern",
          addressCountry: "DE"
        },
        areaServed: ["Bayern", "Deutschland"],
        email: "kontakt@vonlaim.de",
        telephone: "+4915205200600",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "kontakt@vonlaim.de",
          telephone: "+4915205200600",
          areaServed: ["DE", "Bayern"],
          availableLanguage: ["de"]
        },
        knowsAbout: [
          "Webdesign für Handwerker",
          "Local SEO",
          "Conversion-Optimierung",
          "Handwerker-Websites",
          "Websites für lokale Dienstleister",
          "CMS für Unternehmenswebsites"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${appUrl}/#website`,
        url: appUrl,
        name: "vonLaim",
        inLanguage: "de-DE",
        publisher: {
          "@id": `${appUrl}/#organization`
        }
      }
    ]
  };

  return (
    <html lang="de" data-scroll-behavior="smooth">
      <body>
        <a href="#main" className="skip-link">
          Zum Inhalt springen
        </a>
        <JsonLd data={organization} />
        <div className="site-shell">
          <MotionOrchestrator />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <div className="mobile-sticky" aria-label="Schnellkontakt">
            <a className="btn btn-secondary" href="tel:+4915205200600">
              <Phone size={18} aria-hidden="true" />
              Anrufen
            </a>
            <Link className="btn btn-accent" href="/kontakt">
              <Calendar size={18} aria-hidden="true" />
              Termin
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
