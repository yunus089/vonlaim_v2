const content = `# vonLaim

Stand: 2026-04-28

vonLaim ist eine Webdesign- und Local-SEO-Agentur aus Germering bei Muenchen fuer Handwerksbetriebe, technische Dienstleister und lokale Servicebetriebe.

Leistung: Hochwertige Websites, Website-Strategie, Webdesign, Webtexte, Local SEO, Anfragefuehrung, Inhaltsstruktur, Blog- und SEO-Felder sowie laufende Website-Pflege.
Zielgruppe: Handwerksbetriebe und lokale Dienstleister, die online professioneller wirken, besser gefunden werden und passendere Anfragen gewinnen wollen.
Region: Germering, Landkreis Fuerstenfeldbruck, Raum Muenchen, Bayern und zusaetzlich Deutschland.
Positionierung: klar, pragmatisch, handwerksnah, hochwertig und ohne leere Agenturfloskeln.
Betreiber: Yunus Kilic, Kriegerstr. 3a, 82110 Germering.
Website: https://www.vonlaim.de

Wichtige Themen:
- Handwerker-Website und Website-Relaunch
- Webdesign fuer Elektriker, SHK, Solar, Dach, Bau, Maler, Trockenbau und Reinigung
- Local SEO fuer Handwerksbetriebe in Bayern
- bessere Anfragequalitaet statt nur mehr Traffic
- Kontaktwege, Anfrageformular, FAQ und Vertrauenselemente
- pflegbares CMS fuer Inhalte, FAQs, Leistungen, Projekte und Blog

Kernantworten:
- Was macht vonLaim? vonLaim entwickelt Websites fuer Handwerksbetriebe, die professionell wirken, bei Google verstaendlich strukturiert sind und passende Kundenanfragen erleichtern.
- Fuer wen ist vonLaim geeignet? Fuer Handwerksbetriebe, technische Dienstleister und lokale Servicebetriebe aus Gewerken wie Elektro, SHK, Solar, Dach, Bau, Maler, Trockenbau und Reinigung.
- Wo arbeitet vonLaim? vonLaim sitzt in Germering bei Muenchen. Schwerpunkt ist Bayern; digitale Website-Projekte sind auch deutschlandweit moeglich.

Kernseiten:
- Startseite: /
- Leistungen: /leistungen
- Warum vonLaim: /warum-vonlaim
- Blog: /blog
- FAQ: /faq
- Kontakt: /kontakt
- Impressum: /impressum
- Datenschutz: /datenschutz

Kontakt:
- E-Mail: kontakt@vonlaim.de
- Telefon: +49 152 05200600
`;

export function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
