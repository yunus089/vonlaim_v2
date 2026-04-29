import bcrypt from "bcryptjs";
import { Client } from "pg";
import { branchLandingPages, regionLandingPages } from "../src/lib/site-data";

const connectionString =
  process.env.DATABASE_URL ?? "postgres://vonlaim:vonlaim@localhost:5433/vonlaim";

const localAdminEmail = "admin@vonlaim.local";
const localAdminPassword = "ChangeMe123!";
const adminEmail = process.env.ADMIN_EMAIL ?? localAdminEmail;
const adminPassword = process.env.ADMIN_PASSWORD ?? localAdminPassword;
const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    throw new Error("ADMIN_EMAIL und ADMIN_PASSWORD müssen in Produktion gesetzt sein.");
  }
  if (adminPassword === localAdminPassword || adminPassword.length < 14) {
    throw new Error("ADMIN_PASSWORD ist für Produktion zu schwach oder noch der lokale Standardwert.");
  }
}

async function upsertSetting(client: Client, key: string, value: string) {
  await client.query(
    `
      INSERT INTO site_settings(key, value)
      VALUES ($1, $2)
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()
    `,
    [key, value]
  );
}

async function main() {
  const client = new Client({ connectionString });
  await client.connect();

  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await client.query(
    `
      INSERT INTO users(name, email, password_hash, role)
      VALUES ($1, $2, $3, 'admin')
      ON CONFLICT (email) DO UPDATE
      SET password_hash = EXCLUDED.password_hash, updated_at = now()
    `,
    ["vonLaim Admin", adminEmail, passwordHash]
  );

  const settings: Array<[string, string]> = [
    ["brand_name", "vonLaim"],
    ["claim", "Webseiten, die Handwerk sichtbar machen."],
    ["contact_email", "kontakt@vonlaim.de"],
    ["contact_phone", "+49 152 05200600"],
    ["booking_url", "/kontakt"],
    ["office_region", "Bayern"],
    ["service_area", "Bayern und perspektivisch ganz Deutschland"],
    ["legal_company_name", "Yunus Kilic / vonLaim"],
    ["legal_address", "Kriegerstr. 3a, 82110 Germering, Deutschland"],
    ["legal_website", "https://www.vonlaim.de"],
    ["vat_status", "Kleinunternehmer im Sinne von § 19 UStG, keine Umsatzsteuer-Identifikationsnummer vorhanden"],
    ["analytics_mode", "Noch nicht aktiv"],
    ["cookie_consent_mode", "Nur technisch notwendige Cookies"]
  ];

  for (const [key, value] of settings) {
    await upsertSetting(client, key, value);
  }

  const services = [
    {
      title: "Website-Strategie & Webdesign",
      slug: "webdesign-handwerk",
      eyebrow: "Kernleistung",
      summary:
        "Hochwertige Websites, die Ihre Leistungen schnell verständlich machen, Vertrauen aufbauen und passende Anfragen erleichtern.",
      body:
        "Ihre Website muss mehr leisten als gut auszusehen. Kunden sollen schnell erkennen, welche Leistungen Sie anbieten, in welcher Region Sie arbeiten und warum Ihr Betrieb der richtige Ansprechpartner ist. vonLaim entwickelt dafür klare Seitenstrukturen, überzeugende Webtexte, hochwertige Gestaltung, mobile Kontaktwege und eine technische Basis, die langfristig tragfähig bleibt.",
      icon: "Hammer",
      sort: 10
    },
    {
      title: "Lokale Sichtbarkeit & Google-Struktur",
      slug: "local-seo-struktur",
      eyebrow: "Sichtbarkeit",
      summary:
        "Leistungen, Einzugsgebiet und Kundenfragen werden so strukturiert, dass Menschen, Google und KI-Suche Ihr Angebot besser verstehen.",
      body:
        "Lokale Sichtbarkeit entsteht nicht durch Keyword-Listen. Sie entsteht, wenn Leistungen, Orte, Kundenfragen, Kontaktwege und Vertrauenssignale sauber zusammenarbeiten. Wir planen klare Leistungsseiten, regionale Bezüge, verständliche Metadaten und spätere Branchen- oder Regionseiten mit echtem Nutzen.",
      icon: "MapPinned",
      sort: 20
    },
    {
      title: "Kontaktwege & Anfrageführung",
      slug: "conversion-optimierung",
      eyebrow: "Anfragen",
      summary:
        "Telefon, Formular, CTAs und Vertrauenselemente werden so geplant, dass Interessenten den nächsten Schritt leichter gehen.",
      body:
        "Viele Interessenten springen nicht wegen des Angebots ab, sondern weil der nächste Schritt unklar ist. vonLaim reduziert diese Reibung durch sichtbare Telefonnummern, verständliche Formulare, klare CTAs, ehrliche Vertrauenselemente und FAQ-Bereiche, die wichtige Einwände vor dem ersten Gespräch klären.",
      icon: "MousePointerClick",
      sort: 30
    },
    {
      title: "Pflege, Inhalte & Weiterentwicklung",
      slug: "pflege-weiterentwicklung",
      eyebrow: "Betrieb",
      summary:
        "Nach dem Launch bleibt Ihre Website pflegbar, erweiterbar und auf neue Inhalte vorbereitet.",
      body:
        "Eine gute Website ist kein einmaliges Plakat. Blog, FAQ, Referenzen, Leistungen, SEO-Felder und ausgewählte Startseitenbereiche werden so vorbereitet, dass Inhalte später wachsen können. Auf Wunsch übernimmt vonLaim Pflege, technische Updates und laufende Verbesserungen.",
      icon: "Wrench",
      sort: 40
    }
  ];

  for (const service of services) {
    await client.query(
      `
        INSERT INTO services(title, slug, eyebrow, summary, body, icon, status, sort_order, seo_title, seo_description)
        VALUES ($1,$2,$3,$4,$5,$6,'published',$7,$8,$9)
        ON CONFLICT (slug) DO UPDATE
        SET title = EXCLUDED.title,
            eyebrow = EXCLUDED.eyebrow,
            summary = EXCLUDED.summary,
            body = EXCLUDED.body,
            icon = EXCLUDED.icon,
            status = EXCLUDED.status,
            sort_order = EXCLUDED.sort_order,
            seo_title = EXCLUDED.seo_title,
            seo_description = EXCLUDED.seo_description,
            updated_at = now()
      `,
      [
        service.title,
        service.slug,
        service.eyebrow,
        service.summary,
        service.body,
        service.icon,
        service.sort,
        `${service.title} | vonLaim`,
        service.summary
      ]
    );
  }

  const faqs: Array<[string, string, string, number]> = [
    [
      "Was kostet eine professionelle Website für einen Handwerksbetrieb?",
      "Eine professionelle Handwerker-Website kostet je nach Umfang unterschiedlich. Entscheidend sind Seitenanzahl, Texte, Bilder, Leistungsstruktur, Local SEO, Kontaktformular, CMS und Pflege. vonLaim klärt Kosten, Aufwand und Nutzen zuerst im kostenlosen Erstgespräch, bevor ein konkretes Angebot entsteht.",
      "Kosten",
      10
    ],
    [
      "Warum ist eine Website nicht einfach billiger mit einem Baukasten gemacht?",
      "Ein Baukasten kann für den Start reichen. Oft fehlen aber klare Texte, saubere Struktur, lokale Auffindbarkeit, Ladezeit, Datenschutz und eine gezielte Führung zur Anfrage. Genau diese Punkte entscheiden, ob aus Besuchern Kunden werden.",
      "Kosten",
      20
    ],
    [
      "Lohnt sich eine neue Website auch für kleinere Handwerksbetriebe?",
      "Ja, wenn sie konkret auf Ihre Region, Leistungen und Zielkunden ausgerichtet ist. Viele Kunden prüfen heute zuerst online, ob ein Betrieb vertrauenswürdig wirkt. Eine gute Website hilft, bessere Anfragen zu bekommen und nicht nur von Empfehlungen abhängig zu sein.",
      "Nutzen",
      30
    ],
    [
      "Wir bekommen genug Arbeit. Warum brauchen wir trotzdem eine bessere Website?",
      "Ja, wenn die Website bessere statt nur mehr Anfragen erzeugt. Für ausgelastete Handwerksbetriebe kann eine klare Website helfen, passendere Projekte, weniger Preisdruck, bessere Vorqualifizierung und einen professionelleren Eindruck bei Kunden, Bewerbern und Partnern zu erreichen.",
      "Nutzen",
      40
    ],
    [
      "Wie viel Aufwand haben wir als Betrieb während des Projekts?",
      "So wenig wie möglich, aber ganz ohne Ihre Erfahrung geht es nicht. Wir brauchen Informationen zu Leistungen, Region, Arbeitsweise, Bildern und typischen Kundenfragen. Daraus machen wir klare Texte und eine saubere Struktur.",
      "Ablauf",
      50
    ],
    [
      "Müssen wir die Texte selbst schreiben?",
      "Nein. Sie liefern die fachlichen Inhalte, wir formulieren daraus verständliche, handwerksnahe Webtexte. Ziel ist nicht Werbesprache, sondern Klarheit: Was machen Sie, für wen, wo und warum sollte man Sie anfragen?",
      "Inhalte",
      60
    ],
    [
      "Wie lange dauert eine neue Website?",
      "Je nach Umfang dauert ein hochwertiger Relaunch meist mehrere Wochen. Schneller geht es, wenn Bilder, Logo, Zugangsdaten und Inhalte früh vorliegen. Wir planen den Ablauf so, dass Ihr Tagesgeschäft möglichst wenig gestört wird.",
      "Ablauf",
      70
    ],
    [
      "Was passiert, wenn wir schon eine Website haben?",
      "Dann prüfen wir zuerst, was weiterverwendet werden kann. Oft lassen sich Inhalte, Bilder oder die Domain behalten. Wenn Struktur, Technik oder Texte nicht mehr passen, bauen wir gezielt neu, statt nur optisch zu verschönern.",
      "Relaunch",
      80
    ],
    [
      "Wird unsere bestehende Google-Sichtbarkeit beim Relaunch schlechter?",
      "Ein Relaunch muss sauber geplant werden. Wichtige Seiten, Weiterleitungen, Seitentitel, Inhalte und lokale Suchbegriffe sollten berücksichtigt werden. So vermeiden wir, dass bestehende Sichtbarkeit unnötig verloren geht.",
      "SEO",
      90
    ],
    [
      "Können Sie garantieren, dass wir bei Google auf Platz 1 kommen?",
      "Nein, und seriös wäre eine solche Garantie nicht. Google hängt von Wettbewerb, Standort, Inhalten, Technik und vielen weiteren Faktoren ab. Was wir tun: die Grundlagen sauber aufbauen und Ihre Chancen auf lokale Sichtbarkeit deutlich verbessern.",
      "SEO",
      100
    ],
    [
      "Was bedeutet SEO für Handwerksbetriebe konkret?",
      "SEO für Handwerksbetriebe bedeutet: Leistungen verständlich erklären, Einzugsgebiet und Standort sinnvoll einbinden, Seiten technisch sauber aufbauen und Kundenfragen beantworten. So verstehen Google und andere Suchsysteme besser, wofür und wo Ihr Betrieb gefunden werden soll.",
      "SEO",
      110
    ],
    [
      "Bringt lokale SEO im Handwerk wirklich etwas?",
      "Local SEO für Handwerker bedeutet, Leistungen, Einsatzgebiet, Standort, Kundenfragen und Kontaktwege so zu strukturieren, dass Google den Betrieb regional einordnen kann. Wichtig sind klare Leistungsseiten, Ortsbezug, Google-Unternehmensprofil, technische Basis, FAQ-Inhalte und echte Vertrauenssignale.",
      "Local SEO",
      120
    ],
    [
      "Für welche Gewerke funktioniert das?",
      "Für viele lokale Dienstleister und Handwerksbetriebe: Elektrik, Sanitär, Heizung, Solar, Dach, Maler, Trockenbau, Reinigung, Garten- und Landschaftsbau, Metallbau, Bodenleger und ähnliche Betriebe. Entscheidend ist immer die regionale Nachfrage.",
      "Branchen",
      130
    ],
    [
      "Müssen wir regelmäßig neue Inhalte veröffentlichen?",
      "Nicht zwingend jede Woche. Wichtiger ist, dass die wichtigsten Leistungen und Einsatzgebiete sauber erklärt sind. Später können Referenzen, Ratgeberseiten oder neue Leistungsbereiche ergänzt werden, wenn es sinnvoll ist.",
      "Inhalte",
      140
    ],
    [
      "Können wir die Website später selbst pflegen?",
      "Ja. Das System ist mit einem eigenen Admin-Dashboard vorbereitet. Typische Inhalte wie Blogbeiträge, Leistungen, FAQs, Referenzen, Testimonials und SEO-Felder lassen sich ohne Codeänderung pflegen.",
      "CMS",
      150
    ],
    [
      "Was passiert nach dem Launch?",
      "Nach dem Start prüfen wir Formulare, Darstellung auf Smartphone und Desktop, Ladezeit, Datenschutz, Indexierung und wichtige Weiterleitungen. Danach kann die Seite gepflegt, erweitert und für Google weiter verbessert werden.",
      "Betrieb",
      160
    ],
    [
      "Warum sind echte Bilder so wichtig?",
      "Echte Bilder aus Ihrem Betrieb schaffen Vertrauen. Kunden wollen sehen, mit wem sie es zu tun haben und welche Arbeit Sie leisten. Wenn noch keine guten Bilder vorhanden sind, planen wir, was gebraucht wird und wie man es pragmatisch lösen kann.",
      "Inhalte",
      170
    ],
    [
      "Brauchen wir ein Anfrageformular?",
      "In den meisten Fällen ja. Viele Kunden möchten nicht sofort anrufen, sondern erst kurz ihr Anliegen schildern. Ein gutes Formular fragt nur das ab, was nötig ist, und hilft Ihnen, Anfragen besser einzuschätzen.",
      "Anfragen",
      180
    ],
    [
      "Wie wird die Website datenschutzkonform vorbereitet?",
      "Wir achten auf Impressum, Datenschutzerklärung, Cookie-Themen, Formularhinweise und möglichst datensparsame Einbindungen. Für eine rechtliche Endprüfung empfehlen wir bei Bedarf einen spezialisierten Anwalt oder Datenschutzdienst.",
      "Rechtliches",
      190
    ],
    [
      "Was ist, wenn wir keine Zeit für ein großes Projekt haben?",
      "Dann starten wir mit dem Wesentlichen: klare Startseite, wichtigste Leistungen, Kontaktmöglichkeit und lokale Grundlagen. Die Website kann später wachsen. Entscheidend ist, dass der erste Schritt sauber und brauchbar ist.",
      "Ablauf",
      200
    ],
    [
      "Wie messen wir, ob die Website etwas bringt?",
      "Zum Beispiel über Anfragen, Anrufe, Formularnutzung, Sichtbarkeit bei Google und häufig besuchte Seiten. Wichtig ist nicht nur die Besucherzahl, sondern ob die richtigen Menschen Kontakt aufnehmen.",
      "Erfolg",
      210
    ],
    [
      "Warum sollten Kunden gerade uns über die Website anfragen?",
      "Weil die Website schnell verständlich machen sollte, was Sie leisten, wo Sie arbeiten, wie Sie vorgehen und warum man Ihnen vertrauen kann. Gute Webtexte beantworten Fragen, die Kunden sonst unausgesprochen im Kopf behalten.",
      "Vertrauen",
      220
    ],
    [
      "Welche Website-Struktur braucht ein Elektriker?",
      "Eine gute Elektriker-Website sollte Leistungen wie Installation, Sanierung, Wallbox, Smart Home, PV-Anbindung und Wartung verständlich trennen. Zusätzlich braucht sie Region, Kontaktweg, Ablauf, Bilder und FAQ, damit Kunden schnell erkennen, ob der Betrieb passt.",
      "Branchen",
      230
    ],
    [
      "Was gehört auf eine gute Website für SHK-Betriebe?",
      "Wichtig sind klare Bereiche für Heizung, Sanitär, Bad, Wartung und Modernisierung, dazu Einzugsgebiet, Ablauf, Kontaktmöglichkeiten, FAQ und echte Bilder. Kunden müssen schnell sehen, welche Aufgaben der Betrieb übernimmt.",
      "Branchen",
      240
    ],
    [
      "Braucht jede Leistung eine eigene Unterseite?",
      "Nicht jede Kleinigkeit braucht eine eigene Seite. Eigene Unterseiten sind sinnvoll, wenn eine Leistung eigene Suchanfragen, eigene Fragen, eigene Zielkunden oder einen eigenen Anfrageweg hat. So bleibt die Website klar und wird nicht künstlich aufgebläht.",
      "SEO",
      250
    ],
    [
      "Sollte ein Handwerksbetrieb Seiten für einzelne Orte erstellen?",
      "Regionseiten können sinnvoll sein, wenn sie echten Nutzen bieten: konkrete Einzugsgebiete, lokale Bezüge, passende Leistungen, FAQ und Kontaktwege. Dünne Ortsseiten mit ausgetauschten Städtenamen sollten vermieden werden.",
      "Local SEO",
      260
    ],
    [
      "Wie viele Bilder braucht eine gute Handwerker-Website?",
      "Wichtiger als die Menge ist die Glaubwürdigkeit. Sinnvoll sind echte Bilder von Team, Arbeit, Fahrzeugen, Projekten und Betrieb. Wenn noch keine guten Bilder vorhanden sind, kann die Website zunächst sauber geplant und später mit echten Motiven verbessert werden.",
      "Inhalte",
      270
    ],
    [
      "Was ist beim Relaunch einer Handwerker-Website wichtig?",
      "Ein Relaunch sollte bestehende Sichtbarkeit schützen, wichtige Inhalte übernehmen oder verbessern, Weiterleitungen planen, Leistungen neu ordnen und den Kontaktweg vereinfachen. Nur die Optik zu erneuern reicht meistens nicht.",
      "Relaunch",
      280
    ],
    [
      "Wie vermeidet man falsche Anfragen über die Website?",
      "Die Website sollte klar zeigen, welche Leistungen, Regionen, Projektgrößen und Kundentypen passen. Zusätzlich helfen FAQ, Beispielprojekte, verständliche Kontaktfelder und Hinweise zum Ablauf. So melden sich eher passende Interessenten.",
      "Anfragen",
      290
    ],
    [
      "Kann eine Website auch bei der Mitarbeitersuche helfen?",
      "Ja. Bewerber prüfen oft online, wie professionell und sympathisch ein Betrieb wirkt. Eine klare Website mit Team, Arbeitsweise, Projekten und Kontaktmöglichkeiten kann Vertrauen schaffen, auch wenn Recruiting nicht das Hauptziel ist.",
      "Nutzen",
      300
    ],
    [
      "Was unterscheidet Local SEO von normalem SEO?",
      "Local SEO konzentriert sich auf regionale Suchanfragen. Entscheidend sind Standort, Einzugsgebiet, Leistungen, lokale Inhalte, Google-Unternehmensprofil, Kontaktinformationen und Vertrauenssignale. Normales SEO ist oft breiter und weniger ortsbezogen.",
      "Local SEO",
      310
    ],
    [
      "Was bekomme ich im kostenlosen Website-Check?",
      "Im Website-Check schauen wir auf aktuelle Website, Gewerk, Region, Ziele, Struktur, Texte, lokale Sichtbarkeit und Kontaktweg. Danach wissen Sie, ob ein Relaunch, ein kleiner Umbau oder ein späterer Zeitpunkt sinnvoll ist.",
      "Ablauf",
      320
    ]
  ];

  const managedFaqQuestions = [
    "Was kostet eine neue Website für einen Handwerksbetrieb?",
    "Muss ich Texte und Bilder selbst liefern?",
    "Ist SEO enthalten?",
    "Wie lange dauert ein Relaunch?",
    "Kann ich Inhalte später selbst ändern?",
    ...faqs.map(([question]) => question)
  ];
  await client.query("DELETE FROM faqs WHERE question = ANY($1::text[])", [
    managedFaqQuestions
  ]);

  for (const [question, answer, category, sort] of faqs) {
    await client.query(
      `
        INSERT INTO faqs(question, answer, category, status, sort_order)
        VALUES ($1,$2,$3,'published',$4)
        ON CONFLICT DO NOTHING
      `,
      [question, answer, category, sort]
    );
  }

  for (const [index, page] of branchLandingPages.entries()) {
    await client.query(
      `
        INSERT INTO branch_pages(slug, title, h1, description, audience, services, pain_points, faqs, status, sort_order, seo_title, seo_description)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'published',$9,$10,$11)
        ON CONFLICT (slug) DO UPDATE
        SET title = EXCLUDED.title,
            h1 = EXCLUDED.h1,
            description = EXCLUDED.description,
            audience = EXCLUDED.audience,
            services = EXCLUDED.services,
            pain_points = EXCLUDED.pain_points,
            faqs = EXCLUDED.faqs,
            status = EXCLUDED.status,
            sort_order = EXCLUDED.sort_order,
            seo_title = EXCLUDED.seo_title,
            seo_description = EXCLUDED.seo_description,
            updated_at = now()
      `,
      [
        page.slug,
        page.title,
        page.h1,
        page.description,
        page.audience,
        page.services.join("\n"),
        page.painPoints.join("\n"),
        page.faqs.map(([question, answer]) => `${question} | ${answer}`).join("\n"),
        (index + 1) * 10,
        `${page.title} | vonLaim`,
        page.description
      ]
    );
  }

  for (const [index, page] of regionLandingPages.entries()) {
    await client.query(
      `
        INSERT INTO region_pages(slug, title, h1, description, region, nearby, focus, status, sort_order, seo_title, seo_description)
        VALUES ($1,$2,$3,$4,$5,$6,$7,'published',$8,$9,$10)
        ON CONFLICT (slug) DO UPDATE
        SET title = EXCLUDED.title,
            h1 = EXCLUDED.h1,
            description = EXCLUDED.description,
            region = EXCLUDED.region,
            nearby = EXCLUDED.nearby,
            focus = EXCLUDED.focus,
            status = EXCLUDED.status,
            sort_order = EXCLUDED.sort_order,
            seo_title = EXCLUDED.seo_title,
            seo_description = EXCLUDED.seo_description,
            updated_at = now()
      `,
      [
        page.slug,
        page.title,
        page.h1,
        page.description,
        page.region,
        page.nearby.join("\n"),
        page.focus,
        (index + 1) * 10,
        `${page.title} | vonLaim`,
        page.description
      ]
    );
  }

  await client.query(
    `
      INSERT INTO posts(title, slug, excerpt, content, category, tags, status, published_at, seo_title, seo_description)
      VALUES ($1,$2,$3,$4,$5,$6,'published', now(), $7, $8)
      ON CONFLICT (slug) DO UPDATE
      SET title = EXCLUDED.title,
          excerpt = EXCLUDED.excerpt,
          content = EXCLUDED.content,
          category = EXCLUDED.category,
          tags = EXCLUDED.tags,
          status = EXCLUDED.status,
          published_at = EXCLUDED.published_at,
          seo_title = EXCLUDED.seo_title,
          seo_description = EXCLUDED.seo_description,
          updated_at = now()
    `,
    [
      "Handwerker-Website: Warum klare Struktur bessere Anfragen bringt",
      "warum-handwerksbetriebe-klare-website-brauchen",
      "Eine moderne Website muss nicht kompliziert sein. Für Handwerksbetriebe zählt, dass Interessenten schnell Vertrauen fassen, die passende Leistung finden und ohne Umwege Kontakt aufnehmen können.",
      "Viele Handwerksbetriebe verlieren Anfragen nicht, weil die Arbeit schlecht ist. Sie verlieren Anfragen, weil der erste digitale Eindruck zu wenig erklärt.\n\nKunden vergleichen heute online: Was bietet der Betrieb an? In welcher Region arbeitet er? Gibt es Referenzen? Wie läuft eine Anfrage ab? Wie schnell bekomme ich eine Rückmeldung?\n\nEine klare Website beantwortet diese Fragen, bevor der Kunde zum Telefon greift. Sie zeigt Leistungen verständlich, macht regionale Nähe sichtbar und nimmt Unsicherheit aus der Entscheidung. Gerade im Handwerk entsteht Vertrauen oft, bevor der erste Termin vereinbart wird.\n\nFür lokale Dienstleister ist die Website häufig der Moment, in dem aus einer Google-Suche ein echter Kontakt wird. Deshalb sollten Navigation, Leistungsseiten, Kontaktwege, FAQ und Vertrauenselemente bewusst zusammenarbeiten.\n\nEntscheidend ist nicht möglichst viel Text, sondern die richtige Struktur: klare Leistungsbereiche, echte Bilder, nachvollziehbare Abläufe, häufige Fragen und ein Kontaktformular ohne unnötige Hürden.",
      "Webdesign",
      "Handwerk, Website, Vertrauen, Local SEO",
      "Handwerker-Website: Warum klare Struktur bessere Anfragen bringt | vonLaim",
      "Wie eine klare Website Handwerksbetrieben hilft, Vertrauen aufzubauen, lokale Sichtbarkeit zu stärken und bessere Anfragen zu erhalten."
    ]
  );

  const blocks = [
    [
      "home_problem",
      "Viele starke Betriebe wirken online schwächer, als sie wirklich sind.",
      "Ausgangslage",
      "Das Problem ist selten die Arbeit vor Ort. Es ist der erste digitale Eindruck: veraltete Optik, unklare Leistungen, wenig regionale Einordnung oder ein Kontaktweg, der zu viel Geduld verlangt.",
      "Website-Potenzial prüfen lassen",
      "/kontakt"
    ],
    [
      "home_process",
      "Ein Website-Projekt, das neben Ihrem Tagesgeschäft machbar bleibt.",
      "Ablauf",
      "Wir klären zuerst, was Ihre Website leisten soll. Danach entstehen Struktur, Inhalte, Design und Technik in nachvollziehbaren Schritten. Sie wissen jederzeit, was als Nächstes passiert.",
      "Ablauf ansehen",
      "/warum-vonlaim"
    ],
    [
      "home_final_cta",
      "Passt Ihre Website noch zu Ihrem Betrieb?",
      "Kostenloser Website-Check",
      "Wenn Ihre Website veraltet wirkt, unklare Anfragen bringt oder Ihre Leistungen nicht sauber erklärt, lohnt sich ein ruhiger Blick von außen. Im Website-Check klären wir, was ein sinnvoller nächster Schritt wäre.",
      "Kostenlosen Website-Check anfragen",
      "/kontakt"
    ]
  ];

  for (const [key, title, eyebrow, body, ctaLabel, ctaHref] of blocks) {
    await client.query(
      `
        INSERT INTO content_blocks(block_key, title, eyebrow, body, cta_label, cta_href, status)
        VALUES ($1,$2,$3,$4,$5,$6,'published')
        ON CONFLICT (block_key) DO UPDATE
        SET title = EXCLUDED.title,
            eyebrow = EXCLUDED.eyebrow,
            body = EXCLUDED.body,
            cta_label = EXCLUDED.cta_label,
            cta_href = EXCLUDED.cta_href,
            updated_at = now()
      `,
      [key, title, eyebrow, body, ctaLabel, ctaHref]
    );
  }

  await client.end();
  if (isProduction) {
    console.log(`seeded database. Admin user: ${adminEmail}`);
  } else {
    console.log(`seeded database. Local admin login: ${adminEmail} / ${adminPassword}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
