# SEO, Local SEO, GEO und LLM Discoverability

## SEO-Grundstruktur

Implementiert:

- semantische Seitenstruktur
- Metadata pro Hauptseite
- dynamische Metadata für Blogbeiträge
- `sitemap.ts`
- `robots.ts`
- JSON-LD für Organisation / ProfessionalService
- BlogPosting-Schema für Blogbeiträge
- FAQPage-Schema für sichtbare FAQs
- OfferCatalog/Service-Schema für Leistungen
- CollectionPage-Schema für Branchen- und Regionen-Hubs
- Service-Schema und BreadcrumbList für Branchen- und Regionenseiten
- `llms.txt` mit Kernantworten, Kontakt, Branchen- und Regionenlinks
- indexierbare HTML-Inhalte

Quellen:

- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Snippets und Meta Descriptions: https://developers.google.com/search/docs/appearance/snippet
- Schema.org: https://schema.org/

## Lokale Discoverability

Startpositionierung:

- Bayern als Region
- perspektivisch Deutschland
- Handwerk und lokale Dienstleister als klare Zielgruppe
- Germering, München und Landkreis Fürstenfeldbruck als erste konkrete regionale Einstiegspunkte

Wichtige Signale:

- sichtbarer regionaler Bezug im Hero
- `areaServed` in JSON-LD
- Kontaktseite
- regionale Landingpages mit eigenem Nutzen
- spätere konsistente NAP-Daten
- spätere Google Business Profile Integration

Google Local Ranking basiert laut Google vor allem auf:

- Relevanz
- Entfernung
- Bekanntheit / Prominenz

Quelle:

- https://support.google.com/business/answer/4454429

## GEO-Strategie

Aktuelle Struktur:

1. Regionen-Hub `/regionen`.
2. Erste regionale Seiten für München, Germering und Landkreis Fürstenfeldbruck.
3. Keine massenhaft kopierten Stadtseiten.
4. Jede Regionseite braucht spezifische Inhalte:
   - lokale Zielgruppe
   - regionale Herausforderungen
   - passende Leistungen
   - echte Referenzen, sobald vorhanden
   - FAQ

Beispiele:

- `/regionen/webdesign-handwerker-muenchen`
- `/regionen/webdesign-handwerker-germering`
- `/regionen/webdesign-handwerker-fuerstenfeldbruck`

## Branchen-SEO

Aktuelle Branchenstruktur:

- `/branchen/webdesign-elektriker`
- `/branchen/webdesign-shk`
- `/branchen/webdesign-dachdecker`
- `/branchen/webdesign-maler`
- `/branchen/webdesign-reinigungsfirma`

Jede Branchenseite braucht:

- spezifische Probleme der Branche
- passende Website-Struktur
- typische Leistungen
- lokale Suchintentionen
- Einwände und FAQ
- CTA zum Erstgespräch
- spätere Case Studies aus derselben oder ähnlichen Branche

## LLM / AI Search Discoverability

Ziel:

AI-Systeme sollen eindeutig erkennen:

- vonLaim ist eine Webdesign-Agentur
- Zielgruppe sind Handwerksbetriebe und lokale Dienstleister
- Hauptregion ist Bayern
- Leistungen sind Webdesign, Local SEO Struktur, Conversion-Optimierung und Pflege
- Inhalte sind deutschsprachig und auf Deutschland ausgerichtet

Content-Regeln:

- klare Definitionen
- kurze Q&A-Blöcke
- strukturierte Listen
- sichtbare Autor-/Publisher-Logik
- Aktualisierungsdaten bei Ratgebern
- keine generischen KI-Massenartikel
- Fakten und Zahlen nur mit Quelle
- `llms.txt` hält zentrale Fakten, Kernantworten und wichtige URLs maschinenlesbar zusammen
- wiederholbare Direktantworten erklären, was vonLaim macht, für wen es geeignet ist und wo die Agentur arbeitet

Wichtig:

Google empfiehlt keine spezielle "AI SEO"-Magie, sondern hilfreiche, crawlbare Inhalte, gute Page Experience und saubere Struktur.

Quelle:

- Google AI Features: https://developers.google.com/search/docs/appearance/ai-features
- Google Helpful Content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content

## Crawler-Hinweise

`robots.ts` blockiert aktuell:

- `/admin/`

Nicht blockiert werden:

- Googlebot
- Bingbot
- OAI-SearchBot

Für ChatGPT Search Sichtbarkeit sollte `OAI-SearchBot` nicht blockiert werden. Training-Crawler können separat behandelt werden.

Quelle:

- OpenAI Crawler: https://platform.openai.com/docs/bots

## Metadata-Regeln

Title:

- spezifisch
- klarer Nutzen
- Marke am Ende

Beispiel:

`Webdesign für Handwerker in Bayern | vonLaim`

Description:

- 1 bis 2 Sätze
- Ergebnis und Zielgruppe
- kein Keyword-Stuffing

Beispiel:

`vonLaim baut moderne Websites für Handwerksbetriebe in Bayern, die Vertrauen schaffen, lokal gefunden werden und qualifizierte Anfragen erleichtern.`

## Schema-Regeln

Do:

- Schema muss sichtbare Inhalte widerspiegeln.
- FAQPage nur bei sichtbaren FAQs.
- BlogPosting nur bei echten Artikeln.
- Service-Schema für klar beschriebene Leistungen.

Don't:

- keine Fake-Reviews
- keine erfundenen AggregateRatings
- keine unsichtbaren FAQ-Schema-Fragen
- keine LocalBusiness-Daten ohne echte Adresse/Telefonbasis
- keine dünnen Branchen- oder Ortsseiten mit nur ausgetauschtem Keyword

## Performance und SEO

Zielwerte:

- LCP unter 2,5 Sekunden
- INP unter 200 ms
- CLS unter 0,1

Quelle:

- web.dev Core Web Vitals: https://web.dev/articles/vitals

Aktuelle Umsetzung:

- keine externen Fonts
- wenig JavaScript
- serverseitige Inhalte
- kontrollierte Animationen
- CSS-basierte Hero-Visualisierung

## Barrierefreiheit

Basis:

- semantische Struktur
- sichtbare Fokuszustände
- Skip-Link
- Labels bei Formularfeldern
- Motion-Reduktion
- ausreichende Kontraste

Quelle:

- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/
