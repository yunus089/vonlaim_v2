# vonLaim Projektstrategie

## Phase 1: Discovery

vonLaim ist eine Agentur aus Bayern, die moderne, conversion-orientierte Websites für Handwerksbetriebe und lokale Dienstleister baut. Der erste Fokus liegt auf Bayern, die Struktur soll aber deutschlandweit skalierbar sein.

Zielgruppen:

- Handwerksbetriebe und technische Dienstleister mit ca. 5 bis 100 Mitarbeitenden
- SHK, Solar, Elektrik, Sanitär, Dach, Bau, Maler, Trockenbau, Reinigung und ähnliche Gewerke
- Inhaber und Entscheider, die klare Ergebnisse, wenig Technikaufwand und verlässliche Kommunikation erwarten

Hauptprobleme der Zielkunden:

- zu wenig qualifizierte Anfragen
- veraltete oder schwache Website
- geringe Google-Sichtbarkeit
- fehlendes Vertrauen beim ersten Eindruck
- wenig Zeit für Technik, Texte und Struktur

Ton:

- Sie-Ansprache
- direkt, pragmatisch, hochwertig
- keine leeren Agenturfloskeln
- verständlich für reale Betriebsinhaber

Arbeitsannahmen:

- Die öffentliche Domain ist auf `https://www.vonlaim.de` ausgerichtet. Ein Domainwechsel bleibt über `APP_URL`, Caddy und DNS-Anpassung möglich.
- Impressum und Datenschutz sind mit den bereitgestellten Basisdaten vorbereitet: Yunus Kilic / vonLaim, Kriegerstr. 3a, 82110 Germering.
- Echte Referenzen und Testimonials liegen noch nicht vor; das System bereitet sie professionell vor, ohne Fake-Beweise zu zeigen.
- Blog ist sekundär, aber strategisch wichtig für SEO und langfristige Sichtbarkeit.
- WhatsApp ist nicht primärer Kontaktkanal.

## Phase 2: Research-Synthese

### UX und Conversion

Die Website muss in der ersten Sekunde beantworten:

- Wer ist vonLaim?
- Für wen ist das Angebot?
- Welches Ergebnis wird geliefert?
- In welcher Region ist vonLaim relevant?
- Wie kann man schnell Kontakt aufnehmen?

Übernommen werden diese Prinzipien:

- Klarheit vor Kreativität im Hero.
- Trust vor Feature-Liste.
- Mobile Kontaktwege sichtbar halten.
- Formulare kurz, beschriftet und reibungsarm gestalten.
- Keine erfundenen Beweise.
- Premium-Design über Präzision, Raum, Typografie und Inhalt, nicht über Showeffekte.

Quellen und Benchmarks:

- Apple Human Interface Guidelines zu Layout und Motion: https://developer.apple.com/design/human-interface-guidelines/
- Baymard Form- und Checkout-UX: https://baymard.com/learn/form-design
- Nielsen Norman Group zu Unternehmensinformationen und Vertrauen: https://media.nngroup.com/media/reports/free/Presenting_Company_Information_on_Corporate_Websites_3rd_Edition.pdf
- web.dev Core Web Vitals: https://web.dev/articles/vitals

### SEO, Local SEO und AI Search

SEO wird als klare Entity- und Strukturarbeit verstanden, nicht als Keyword-Stuffing. vonLaim soll maschinenlesbar und für Menschen eindeutig als bayerische Webdesign-Agentur für Handwerksbetriebe und lokale Dienstleister erkennbar sein.

Übernommen werden diese Prinzipien:

- eindeutige Seitenintention pro URL
- hilfreiche, menschennahe Inhalte
- klare interne Verlinkung
- indexierbare HTML-Inhalte
- Metadaten pro Seite und Beitrag
- strukturierte Daten für Organisation, Services, BlogPosting und FAQ, wenn sichtbar passend
- Bayern als starker regionaler Startpunkt, spätere Stadtseiten nur mit echtem lokalen Mehrwert
- AI-Discoverability durch klare Faktenblöcke, Fragen/Antworten, Autor-/Publisher-Klarheit und konsistente Entitäten

Quellen:

- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Helpful Content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google AI Features Guidance: https://developers.google.com/search/docs/appearance/ai-features
- Google LocalBusiness Structured Data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Schema.org LocalBusiness, Service, Organization, BreadcrumbList: https://schema.org/
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/

## Phase 3: Strategisches Konzept

Positionierung:

> vonLaim baut Websites, die Handwerksbetriebe professionell sichtbar machen, lokal gefunden werden und mehr direkte Anfragen ermöglichen.

Primäre Conversion:

- kostenloses Erstgespräch
- Kontaktformular
- Telefon
- E-Mail

Sekundäre Conversion:

- Leistungen verstehen
- Blogbeiträge lesen
- FAQ öffnen
- spätere Case Studies ansehen

Kernbotschaft:

> Ihre Arbeit ist stark. Ihre Website sollte das sofort zeigen.

Claim-Richtung:

> vonLaim - Webseiten, die Handwerk sichtbar machen.

## Phase 4: Creative Direction

Visuelle Richtung:

- hell, klar, hochwertig
- markante Akzente in Teal, Lime und Copper
- kein grelles, billiges oder chaotisches Farbsystem
- keine Stockfoto-Klischees
- motion bewusst, nicht verspielt

Motiv:

Das visuelle System nutzt eine "Werkbank / Blueprint / Website-System"-Logik. Dadurch entsteht ein Bezug zu Handwerk, Struktur und digitaler Umsetzung, ohne folkloristisch zu wirken.

Motion-Prinzip:

- kleine Reveal-Animationen
- animierte Metrik-Linien im Hero
- Hover-Zustände für Vertrauen und Rückmeldung
- `prefers-reduced-motion` wird respektiert

## Phase 5: UX- und Content-Struktur

Startseite als Entscheidungsstrecke:

1. Hero: Zielgruppe, Ergebnis, Region, CTA
2. Problem: starke Arbeit, schwacher digitaler Eindruck
3. Leistungen: Website-System für lokale Nachfrage
4. Prozess: klare Schritte statt Agentur-Nebel
5. Referenzbereich: vorbereitet, aber ohne Fake-Proof
6. Blog: sekundärer Trust- und SEO-Hebel
7. FAQ: Einwände reduzieren
8. Abschluss-CTA: kostenloses Erstgespräch

CTA-Logik:

- oben: Erstgespräch und Leistungen
- mittig: Projekt besprechen
- mobil: sticky Telefon und Termin
- unten: finaler Gesprächs-CTA

## Phase 6: Technische Architektur

Gebaut wurde eine eigene Next.js-App mit:

- Next.js App Router
- TypeScript
- PostgreSQL
- eigenem Admin-Login
- serverseitigen Sessions
- eigenem CMS-Datenmodell
- lokalem Media-Upload mit späterer S3-Migrationsmöglichkeit
- Docker- und Caddy-Vorbereitung für KVM-Hosting

Bewusste Entscheidung:

Es wurde kein WordPress und kein generischer Pagebuilder verwendet. Das Dashboard bleibt kontrolliert, damit Inhaltsqualität, Layoutkonsistenz und SEO-Struktur nicht auseinanderlaufen.
