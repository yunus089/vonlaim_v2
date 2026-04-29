# Legal Audit Deutschland / EU

Stand: 2026-04-29

Hinweis: Dieses Audit ist eine technische und redaktionelle Prüfung, keine Rechtsberatung. Vor dem produktiven Launch sollte der finale Wortlaut von Impressum, Datenschutz und Cookie-Hinweisen bei Bedarf juristisch geprüft werden.

## Quellenbasis

- BfDI Cookie-Banner: https://www.bfdi.bund.de/DE/Buerger/Inhalte/Telemedien/Cookie-Banner.html
- DSK Orientierungshilfe Digitale Dienste, Version 1.2, November 2024: https://www.bfdi.bund.de/SharedDocs/Downloads/DE/DSK/Orientierungshilfen/OH_Digitale-Dienste.pdf
- EDPB Consent under GDPR, April 2026: https://www.edpb.europa.eu/system/files/2026-04/edpb-summary-consent_en.pdf
- EDPB Cookie Banner Taskforce Report, Januar 2023: https://www.edpb.europa.eu/system/files/2023-01/edpb_20230118_report_cookie_banner_taskforce_en.pdf

## Ergebnis

Die Website ist strukturell deutlich besser auf deutsche und europäische Anforderungen vorbereitet:

- Impressum mit Anbieterangaben nach § 5 DDG
- redaktionell Verantwortlicher nach § 18 Abs. 2 MStV
- Hinweis zur Verbraucherstreitbeilegung ohne veralteten OS-Plattform-Link
- Datenschutzerklärung mit Verantwortlichem, Kontaktformular, Hosting/Serverlogs, Cookies, First-party Analytics, Speicherdauer, Betroffenenrechten und Beschwerderecht
- Cookie-Hinweisseite mit notwendiger Kategorie, optionaler Analytics-Kategorie, Widerruf und Rechtsgrundlagen
- Consent-Banner mit `Ablehnen`, `Akzeptieren` und `Einstellungen`
- keine Analytics vor Zustimmung
- Widerruf/Änderung jederzeit über Datenschutz-Button und Footer-Link
- kein Google Analytics, kein Meta Pixel, keine externen Marketing-Skripte
- IP-Adressen für interne Analytics nur gehasht, nicht im Klartext gespeichert

## Umgesetzte technische Maßnahmen

### Consent

Der Banner bietet direkt sichtbare Optionen:

- Ablehnen
- Einstellungen
- Akzeptieren

Die Ablehnoption ist als eigenständiger Button umgesetzt. Die Analytics-Kategorie ist nicht vorausgewählt. Notwendige Funktionen sind als erforderlich gekennzeichnet.

### Analytics

Analytics ist first-party und läuft nur bei Einwilligung:

- Seitenaufrufe
- Klicks
- Formularstart
- Formularabsendung
- Scroll-Tiefe
- Referrer
- Session-ID
- Browserinformationen
- gehashte IP

Die Daten werden in `analytics_events` gespeichert und im Adminbereich unter `/admin/analytics` ausgewertet.

### Kontaktformular

Das Formular informiert über die Verarbeitung und verlinkt auf die Datenschutzerklärung. Es erfasst nur projektbezogene Angaben:

- Name
- Betrieb
- E-Mail
- Telefon optional
- aktuelle Website optional
- Gewerk / Branche
- Region / Einsatzgebiet
- Interesse
- Nachricht
- Einwilligung zur Anfragebearbeitung

### Externe Dienste

Aktuell sind keine externen Tracking- oder Werbedienste aktiv. Externe Karten, Videos, Social-Media-Embeds oder externe Fonts sollten erst ergänzt werden, wenn Anbieter, Rechtsgrundlage, Datenübermittlung und Datenschutzerklärung vollständig aktualisiert wurden.

## Offene Launch-Prüfpunkte

- Hosting-Anbieter und AV-Vertrag final prüfen.
- E-Mail-Anbieter und AV-Vertrag final prüfen.
- Falls Terminbuchung über externen Anbieter kommt: Anbieter, Drittlandtransfer, AVV und Datenschutzhinweis ergänzen.
- Falls Analytics-Daten längerfristig genutzt werden: konkrete Löschroutine oder Aufbewahrungsfrist festlegen.
- Wenn echte Kundenreferenzen, Fotos oder Testimonials veröffentlicht werden: schriftliche Freigaben einholen.
- Wenn Newsletter, Ads, Retargeting, Google Maps, YouTube oder Social Embeds ergänzt werden: Consent und Datenschutztext erweitern.

## Bewertung

Für einen Launch ohne externe Tracking- oder Marketingdienste ist die Struktur solide vorbereitet. Das größte Restrisiko liegt nicht im Code, sondern in späteren Integrationen: Terminbuchung, externe Medien, Hosting/E-Mail-Verträge und tatsächliche Löschfristen müssen zum realen Betrieb passen.
