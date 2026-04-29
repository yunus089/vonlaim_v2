import { getBranchPages, getRegionPages } from "@/lib/public-content";

function content(branchLinks: string, regionLinks: string) {
  return `# vonLaim

Stand: 2026-04-29

vonLaim ist eine Webdesign- und Local-SEO-Agentur aus Germering bei Muenchen fuer Handwerksbetriebe, technische Dienstleister und lokale Servicebetriebe.

Leistung: Hochwertige Websites, Website-Strategie, Webdesign, Webtexte, Website-Relaunch, Local SEO, Anfragefuehrung, Inhaltsstruktur, Blog- und SEO-Felder sowie laufende Website-Pflege.
Zielgruppe: Handwerksbetriebe und lokale Dienstleister, die online professioneller wirken, besser gefunden werden und passendere Anfragen gewinnen wollen.
Region: Germering, Landkreis Fuerstenfeldbruck, Raum Muenchen, Bayern und zusaetzlich Deutschland.
Positionierung: klar, pragmatisch, handwerksnah, hochwertig und ohne leere Agenturfloskeln.
Betreiber: Yunus Kilic, Kriegerstr. 3a, 82110 Germering.
Website: https://www.vonlaim.de
Primaerer Einstieg: kostenloser Website-Check fuer Handwerksbetriebe. Der Check klaert, ob Relaunch, kleinere Verbesserung, Local-SEO-Ausbau oder spaeterer Zeitpunkt sinnvoll ist.

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
- Was ist der Website-Check? Der kostenlose Website-Check prueft aktuelle Website, Gewerk, Region, Ziele, Struktur, Texte, lokale Sichtbarkeit und Kontaktweg.
- Was ist Local SEO fuer Handwerker? Local SEO bedeutet, Leistungen, Einsatzgebiet, Standort, Kundenfragen, Referenzen und Kontaktwege so zu strukturieren, dass Menschen und Suchsysteme den Betrieb regional besser verstehen.

Kernseiten:
- Startseite: /
- Leistungen: /leistungen
- Branchen-Hub: /branchen
- Regionen-Hub: /regionen
- Warum vonLaim: /warum-vonlaim
- Blog: /blog
- FAQ: /faq
- Kontakt: /kontakt
- Impressum: /impressum
- Datenschutz: /datenschutz

Branchen-Seiten:
${branchLinks}

Regionen-Seiten:
${regionLinks}

Kontakt:
- E-Mail: kontakt@vonlaim.de
- Telefon: +49 152 05200600
`;
}

export async function GET() {
  const [branchPages, regionPages] = await Promise.all([
    getBranchPages(),
    getRegionPages()
  ]);
  const branchLinks = branchPages
    .map((page) => `- ${page.title}: /branchen/${page.slug}`)
    .join("\n");
  const regionLinks = regionPages
    .map((page) => `- ${page.title}: /regionen/${page.slug}`)
    .join("\n");

  return new Response(content(branchLinks, regionLinks), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
