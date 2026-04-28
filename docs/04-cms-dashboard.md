# CMS- und Dashboard-Dokumentation

## Zugang

Admin-URL:

`/admin`

Lokale Seed-Zugangsdaten nur für Entwicklung:

- E-Mail: `admin@vonlaim.local`
- Passwort: `ChangeMe123!`

Wichtig:

Diese Zugangsdaten dürfen nicht in Produktion verwendet werden. Für den Livebetrieb müssen `ADMIN_EMAIL`, `ADMIN_PASSWORD` und `SESSION_SECRET` in der Server-Umgebung gesetzt werden. Der Seed-Prozess bricht in Produktion ab, wenn die Admin-Zugangsdaten fehlen oder das lokale Standardpasswort verwendet wird.

## Login

1. `/admin/login` öffnen.
2. E-Mail und Passwort eingeben.
3. Nach erfolgreichem Login öffnet sich das Dashboard.

Die Session wird serverseitig gespeichert und per HTTP-only Cookie referenziert.

## Inhalte

Das Dashboard verwaltet:

- Blogbeiträge
- Leistungen
- Projekte / Referenzen
- Testimonials
- FAQs
- Startseiten-Blöcke
- Medien
- Anfragen
- Grundeinstellungen

## Blogbeitrag erstellen

1. Im Admin `Blog` öffnen.
2. `Neu` klicken.
3. Titel, Kurzbeschreibung und Inhalt ausfüllen.
4. Slug leer lassen, wenn er automatisch aus dem Titel erzeugt werden soll.
5. Kategorie und Tags ergänzen.
6. Optional Featured Image hochladen oder URL eintragen.
7. Alt-Text ausfüllen.
8. Status auf `published` setzen, wenn der Beitrag live erscheinen soll.
9. SEO Title und SEO Description ergänzen.
10. Speichern.

Live-Verhalten:

Ein veröffentlichter Beitrag erscheint automatisch unter `/blog` und `/blog/[slug]`.

## Entwurf und Veröffentlichung

Status:

- `draft`: nicht öffentlich sichtbar
- `published`: öffentlich sichtbar
- `archived`: für spätere Archivlogik vorgesehen

Wenn ein Beitrag veröffentlicht wird und kein Veröffentlichungsdatum gesetzt ist, wird automatisch ein Datum gesetzt.

## Vorschau

In den Content-Listen gibt es ein Auge-Icon für Vorschau.

Die Vorschau zeigt den Inhalt im Admin-Bereich, auch wenn er noch nicht live veröffentlicht ist. Sie ist bewusst einfach gehalten und dient zur redaktionellen Prüfung.

## Medien hochladen

1. `Medien` öffnen.
2. Bild auswählen.
3. Alt-Text ergänzen.
4. Hochladen.

Aktuell:

- lokale Speicherung in `public/uploads`
- erlaubte Formate: JPG, PNG, WebP und AVIF

Geplant / vorbereitet:

- spätere S3-kompatible Ablage
- CDN
- automatische Bildvarianten

## Leistungen verwalten

Leistungen haben:

- Titel
- Slug
- Kategoriezeile
- Kurzbeschreibung
- Detailtext
- Icon-Name
- Status
- Sortierung
- SEO-Felder

Hinweis:

Leistungen sind keine Blogartikel. Sie sollten stabil, klar und angebotsnah formuliert sein.

## Projekte / Referenzen verwalten

Projekte sind vorbereitet für:

- Kunde/Betrieb
- Branche
- Region
- Zusammenfassung
- Ausgangslage
- Lösung
- Ergebnis
- Projektbild
- SEO-Felder

Regel:

Keine erfundenen Kunden, Zahlen oder Bewertungen veröffentlichen.

## Testimonials

Testimonials sollten nur veröffentlicht werden, wenn:

- die Aussage echt ist
- die Freigabe vorliegt
- Name/Betrieb/Quelle korrekt sind

Keine Review-Sterne als Schema auszeichnen, solange die rechtliche und plattformbezogene Grundlage nicht sauber geklärt ist.

## FAQs

FAQs sollten echte Einwände beantworten:

- Was kostet das?
- Wie lange dauert es?
- Wer liefert Texte und Bilder?
- Ist SEO enthalten?
- Kann ich später Inhalte ändern?

FAQ-Schema wird nur auf der öffentlichen FAQ-Seite für sichtbare Inhalte ausgegeben.

## Startseiten-Blöcke

Editierbare Startseiten-Blöcke:

- `home_problem`
- `home_process`
- `home_final_cta`

Regel:

Diese Blöcke sollten kurz bleiben. Die Startseite ist eine Entscheidungsstrecke, kein Roman.

## Einstellungen

Pflegbar:

- Markenname
- Claim
- Kontakt-E-Mail
- Telefon
- Terminbuchungs-URL
- Sitz / Region
- Servicegebiet
- rechtlicher Name
- Impressumsadresse
- Analytics-Status
- Cookie-Status

Aktuell sind Header und Footer noch teilweise statisch. Für den nächsten Ausbauschritt sollten Kontaktwerte vollständig aus `site_settings` gelesen werden.

## Anfragen

Kontaktformular-Eingänge erscheinen unter `Anfragen`.

Gespeichert werden:

- Name
- Betrieb
- E-Mail
- Telefon
- Interesse
- Nachricht
- Einwilligung
- Zeitpunkt

Für Produktion empfohlen:

- E-Mail-Benachrichtigung
- Statuswechsel
- Lösch- und Exportfunktion
- DSGVO-Löschkonzept
