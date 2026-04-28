# Designsystem und Styleguide

## Brand-Prinzipien

vonLaim wirkt:

- klar statt laut
- kreativ statt chaotisch
- hochwertig statt elitär
- handwerksnah statt werblich
- professionell statt technisch abgehoben

Aktualisierte Creative Direction:

> Bayerisches Digital-Werkstatt-Cockpit.

Die Website soll sich nicht wie eine übliche Agentur-Landingpage anfühlen, sondern wie ein präzises System für Sichtbarkeit, Vertrauen und Anfrageführung. Der Look kombiniert handwerksnahe Klarheit, technische Blueprint-Logik, hochwertige Kontraste und kontrollierte kinetic Elemente.

Jede Sektion muss mindestens eine dieser Aufgaben erfüllen:

- Vertrauen erhöhen
- Nutzen verständlich machen
- Einwand reduzieren
- Kontakt erleichtern
- regionale oder fachliche Relevanz stärken

## Farbpalette

Tokens in `src/app/globals.css`:

- `--ink` `#121416`: Haupttext, starke Flächen
- `--paper` `#f7f8f4`: ruhiger Seitenhintergrund
- `--surface` `#ffffff`: Inhaltsflächen
- `--surface-strong` `#ecf2ee`: dezente UI-Flächen
- `--teal` `#0d5b63`: Kompetenz, Local SEO, Links/Icons
- `--lime` `#c8f25c`: CTA-Akzent
- `--copper` `#c76543`: Fokus, Warnung, Detailakzent
- `--line` `#dce2df`: Grenzen und Tabellen

Regeln:

- Lime sparsam für primäre CTAs und kleine Signale nutzen.
- Teal für Struktur, Icons und Vertrauensakzente nutzen.
- Keine großflächigen Ein-Farb-Welten erzeugen.
- Kontrast vor Dekoration.

## Typografie

Systemfont-Stack:

- Display: `Bahnschrift`, `DIN Alternate`, `Aptos Display`, sans-serif
- Body: `Segoe UI Variable`, `Segoe UI`, system-ui, sans-serif
- Mono/Labels: `Cascadia Code`, `Fira Code`, Consolas, monospace

Warum:

- schnell
- robust
- keine externen Font-Requests
- klare Lesbarkeit für lokale Zielgruppen
- markanter als generische Arial-/Inter-Ästhetik

Regeln:

- H1 groß und direkt, aber nicht verspielt.
- Karten und Admin-Flächen nutzen kleinere, dichtere Typografie.
- Keine negativen Letter-Spacings.
- Keine viewportabhängige Font-Skalierung außerhalb von `clamp()`.
- Letter-Spacing bleibt auf `0`, auch bei Labels.

## Spacing

Grundlogik:

- breite, ruhige Sektionen
- klare Abstände zwischen Argumenten
- kompakte Admin-Oberfläche
- Kartenradius maximal 8px

Wichtige Klassen:

- `.container`
- `.section`
- `.section.alt`
- `.section-head`
- `.grid-2`, `.grid-3`, `.grid-4`

## Buttons

Varianten:

- `.btn`: primär dunkel
- `.btn-accent`: Lime-CTA
- `.btn-secondary`: sekundär, ruhig
- `.icon-btn`: kompakte Admin-/Telefon-Aktion

Regeln:

- Primärer CTA pro Abschnitt.
- Telefon und Erstgespräch sind gleichwertige Hauptwege.
- Icon plus Text nutzen, wenn der Befehl dadurch schneller verstanden wird.

## Cards

Cards werden genutzt für:

- Leistungen
- Blogbeiträge
- Prozessschritte
- Admin-Surfaces
- FAQ-Items

Regeln:

- keine Cards in Cards
- keine kompletten Seitenabschnitte als schwebende Karten
- Karten sind einzelne Inhaltseinheiten, nicht Dekoration

## Formulare

Regeln:

- Labels immer sichtbar über dem Feld
- Pflichtfelder klar markieren
- kurze Formulare, keine unnötigen Hürden
- Hilfetexte dort, wo Unsicherheit entsteht
- mobile Bedienung priorisieren

Kontaktformular:

- Name
- Betrieb
- E-Mail
- Telefon
- Interesse
- Kurzbeschreibung
- Einwilligung

## Iconografie

Lucide Icons werden verwendet:

- konsistent
- linear
- zurückhaltend
- funktional statt dekorativ

Beispiele:

- `Phone` für Anruf
- `Calendar` für Termin
- `Hammer` für Handwerk
- `MapPinned` für lokale Relevanz
- `MousePointerClick` für Conversion

## Motion

Prinzipien:

- Motion unterstützt Hierarchie, räumliches Gefühl und Feedback.
- Primär werden `transform` und `opacity` animiert, weil diese Eigenschaften browserseitig performant optimierbar sind.
- Die Startseite nutzt Scroll-Fortschritt, Pointer-Crosshair, Reveal-Animationen, Hero-Sweep, Headline-Akzent, Lab-Tilt, Scanline, Button-Shine, Card-Lift und Icon-Microinteractions.
- Neu ergänzt: Kinetic Marquee, Magnet-Buttons, bentoartige Signal-Panels, Branchen-Pills und ein dunkles Qualitäts-Gate.
- Keine Animation darf Inhalt verdecken oder Bedienung erschweren.
- `prefers-reduced-motion` deaktiviert Animationen praktisch vollständig.
- Große Scroll-Hijacking-Spielereien vermeiden.

21st.dev-Pattern-Transfer:

- genutzt als Inspiration für Hero-, Animated-, Feature-Grid-, CTA- und Bento-Patterns
- keine Komponenten wurden blind kopiert
- übernommen wurden Pattern-Prinzipien: starke erste Fläche, wiederverwendbare Module, klare Zustände, visuelle Rhythmik, schnelle Iterierbarkeit

Quelle:

- MDN prefers-reduced-motion: https://developer.mozilla.org/en-US/docs/Web/CSS/%40media/prefers-reduced-motion
- web.dev Animations and Performance: https://web.dev/animations-and-performance/
- Apple HIG Motion: https://developer.apple.com/design/human-interface-guidelines/motion

## Do

- echte Projektbilder später prominent nutzen
- klare Headline pro Sektion
- kurze Absätze
- sichtbare CTAs
- Trust mit Kontext

## Don't

- Fake-Testimonials
- Stockfoto-Klischees
- Buzzwords wie "360 Grad", "digitale Exzellenz", "maßgeschneiderte Lösungen" ohne Substanz
- zu viele CTA-Arten gleichzeitig
- große Animationen ohne Informationswert
