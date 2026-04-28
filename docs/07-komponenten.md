# Komponenten-Dokumentation

## Öffentliche Komponenten

### `Header`

Datei:

`src/components/Header.tsx`

Aufgabe:

- Hauptnavigation
- Branding
- Telefon-Icon
- Erstgespräch-CTA

Regel:

Navigation kurz halten. Keine zusätzlichen Menüpunkte ohne klare Aufgabe.

### `Footer`

Datei:

`src/components/Footer.tsx`

Aufgabe:

- sekundäre Navigation
- Kontaktlinks
- rechtliche Links
- Admin-Link

Nächster Ausbauschritt:

Kontaktwerte aus `site_settings` laden.

### `HeroLab`

Datei:

`src/components/HeroLab.tsx`

Aufgabe:

- visuelles Hero-System
- vermittelt Website-Struktur, Local SEO und Anfrage-Logik
- ersetzt generische Stockfotos im ersten Launch

Regel:

Wenn echte Projektbilder verfügbar sind, kann `HeroLab` mit realen Website-Screenshots kombiniert oder ersetzt werden.

### `Icon`

Datei:

`src/components/Icon.tsx`

Aufgabe:

- kontrollierte Lucide-Icon-Auswahl für CMS-Leistungen
- verhindert freie, inkonsistente Icon-Nutzung

### `JsonLd`

Datei:

`src/components/JsonLd.tsx`

Aufgabe:

- strukturierte Daten sicher in Seiten rendern

Regel:

Nur Schema ausgeben, das zum sichtbaren Inhalt passt.

### `Reveal`

Datei:

`src/components/Reveal.tsx`

Aufgabe:

- dezente Entrance-Animation
- CSS berücksichtigt `prefers-reduced-motion`

## Admin-Komponenten

### `ContentForm`

Datei:

`src/components/admin/ContentForm.tsx`

Aufgabe:

- generisches Formular für CMS-Inhaltstypen
- rendert Felder aus `admin-config`
- unterstützt Text, Textarea, Richtext-Textarea, Select, Number, Datetime und Image-Upload

Regel:

Neue CMS-Inhaltstypen zuerst in `src/lib/admin-config.ts` definieren.

## Datenzugriff

### `public-content`

Datei:

`src/lib/public-content.ts`

Aufgabe:

- liest veröffentlichte Inhalte für öffentliche Seiten
- kapselt SQL-Abfragen für Services, Posts, FAQs, Projekte, Testimonials und Settings

### `admin-data`

Datei:

`src/lib/admin-data.ts`

Aufgabe:

- generisches CRUD für erlaubte Admin-Inhaltstypen
- verarbeitet Upload-Felder
- erzeugt Slugs
- revalidiert öffentliche Routen

Sicherheit:

- Inhaltstypen werden über Whitelist-Konfiguration geprüft
- Tabellen und Felder kommen nicht frei aus Requests

### `auth`

Datei:

`src/lib/auth.ts`

Aufgabe:

- Login prüfen
- Session erstellen
- Session lesen
- Admin schützen
- Logout

## Seiten-Komponentenlogik

### Startseite

Datei:

`src/app/page.tsx`

Genutzte Daten:

- Services
- Blogposts
- FAQs
- Content-Blöcke

### Blog

Dateien:

- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`

Genutzte Daten:

- veröffentlichte Posts
- SEO-Felder pro Post
- BlogPosting-Schema

### FAQ

Datei:

`src/app/faq/page.tsx`

Genutzte Daten:

- veröffentlichte FAQs
- FAQPage-Schema

### Kontakt

Dateien:

- `src/app/kontakt/page.tsx`
- `src/app/kontakt/actions.ts`

Logik:

- serverseitige Validierung
- Lead-Speicherung
- Weiterleitung zu Danke-Seite

## Erweiterungsregeln

Neue öffentliche Seite:

1. Seite in `src/app` anlegen.
2. Metadata ergänzen.
3. interne Links setzen.
4. Sitemap erweitern, falls statisch.
5. Schema nur bei echtem Inhalt ergänzen.
6. Dokumentation aktualisieren.

Neuer CMS-Typ:

1. Tabelle per Migration anlegen.
2. Typ in `AdminContentType` ergänzen.
3. Config in `contentConfigs` ergänzen.
4. öffentliche Query in `public-content` ergänzen.
5. Admin-Link in Admin-Layout ergänzen.
6. ggf. öffentliche Seite bauen.
