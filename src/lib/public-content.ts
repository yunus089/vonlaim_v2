import { query, queryOne } from "@/lib/db";
import { branchLandingPages, regionLandingPages } from "@/lib/site-data";

export type Service = {
  id: string;
  title: string;
  slug: string;
  eyebrow: string;
  summary: string;
  body: string;
  icon: string;
  sort_order: number;
  seo_title: string;
  seo_description: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  featured_image: string;
  featured_image_alt: string;
  published_at: Date | null;
  seo_title: string;
  seo_description: string;
  updated_at: Date;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  client_name: string;
  industry: string;
  region: string;
  summary: string;
  challenge: string;
  solution: string;
  result: string;
  featured_image: string;
  featured_image_alt: string;
};

export type Testimonial = {
  id: string;
  name: string;
  company: string;
  role: string;
  quote: string;
  rating: number;
};

export type ContentBlock = {
  block_key: string;
  title: string;
  eyebrow: string;
  body: string;
  cta_label: string;
  cta_href: string;
};

export type BranchPage = {
  id: string;
  slug: string;
  title: string;
  h1: string;
  description: string;
  audience: string;
  services: string[];
  painPoints: string[];
  faqs: Array<[string, string]>;
  seo_title: string;
  seo_description: string;
  sort_order: number;
};

export type RegionPage = {
  id: string;
  slug: string;
  title: string;
  h1: string;
  description: string;
  region: string;
  nearby: string[];
  focus: string;
  seo_title: string;
  seo_description: string;
  sort_order: number;
};

type BranchPageRow = Omit<BranchPage, "services" | "painPoints" | "faqs"> & {
  services: string;
  pain_points: string;
  faqs: string;
};

type RegionPageRow = Omit<RegionPage, "nearby"> & {
  nearby: string;
};

function lines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function faqLines(value: string): Array<[string, string]> {
  return lines(value)
    .map((line) => {
      const [question, ...answer] = line.split("|");
      return [question?.trim() ?? "", answer.join("|").trim()] as [string, string];
    })
    .filter(([question, answer]) => question && answer);
}

function fallbackBranchPages(): BranchPage[] {
  return branchLandingPages.map((page, index) => ({
    id: `fallback-branch-${page.slug}`,
    slug: page.slug,
    title: page.title,
    h1: page.h1,
    description: page.description,
    audience: page.audience,
    services: page.services,
    painPoints: page.painPoints,
    faqs: page.faqs.map(([question, answer]) => [question, answer] as [string, string]),
    seo_title: `${page.title} | vonLaim`,
    seo_description: page.description,
    sort_order: (index + 1) * 10
  }));
}

function fallbackRegionPages(): RegionPage[] {
  return regionLandingPages.map((page, index) => ({
    id: `fallback-region-${page.slug}`,
    slug: page.slug,
    title: page.title,
    h1: page.h1,
    description: page.description,
    region: page.region,
    nearby: page.nearby,
    focus: page.focus,
    seo_title: `${page.title} | vonLaim`,
    seo_description: page.description,
    sort_order: (index + 1) * 10
  }));
}

function mapBranchPage(row: BranchPageRow): BranchPage {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    h1: row.h1,
    description: row.description,
    audience: row.audience,
    services: lines(row.services),
    painPoints: lines(row.pain_points),
    faqs: faqLines(row.faqs),
    seo_title: row.seo_title,
    seo_description: row.seo_description,
    sort_order: row.sort_order
  };
}

function mapRegionPage(row: RegionPageRow): RegionPage {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    h1: row.h1,
    description: row.description,
    region: row.region,
    nearby: lines(row.nearby),
    focus: row.focus,
    seo_title: row.seo_title,
    seo_description: row.seo_description,
    sort_order: row.sort_order
  };
}

const fallbackServices: Service[] = [
  {
    id: "fallback-webdesign",
    title: "Website-Strategie & Webdesign",
    slug: "webdesign-handwerk",
    eyebrow: "Kernleistung",
    summary:
      "Hochwertige Websites, die Ihre Leistungen schnell verständlich machen, Vertrauen aufbauen und passende Anfragen erleichtern.",
    body:
      "Ihre Website muss mehr leisten als gut auszusehen. Kunden sollen schnell erkennen, welche Leistungen Sie anbieten, in welcher Region Sie arbeiten und warum Ihr Betrieb der richtige Ansprechpartner ist.",
    icon: "Hammer",
    sort_order: 10,
    seo_title: "Webdesign für Handwerksbetriebe | vonLaim",
    seo_description:
      "Moderne Websites für Handwerksbetriebe, die Vertrauen schaffen und Anfragen erleichtern."
  },
  {
    id: "fallback-local-seo",
    title: "Lokale Sichtbarkeit & Google-Struktur",
    slug: "local-seo-struktur",
    eyebrow: "Sichtbarkeit",
    summary:
      "Leistungen, Einzugsgebiet und Kundenfragen werden so strukturiert, dass Menschen, Google und KI-Suche Ihr Angebot besser verstehen.",
    body:
      "Wir planen klare Leistungsseiten, regionale Bezüge, verständliche Metadaten und spätere Branchen- oder Regionseiten mit echtem Nutzen.",
    icon: "MapPinned",
    sort_order: 20,
    seo_title: "Local SEO Struktur | vonLaim",
    seo_description:
      "Saubere Local-SEO-Struktur für Handwerksbetriebe und lokale Dienstleister."
  },
  {
    id: "fallback-conversion",
    title: "Kontaktwege & Anfrageführung",
    slug: "conversion-optimierung",
    eyebrow: "Anfragen",
    summary:
      "Telefon, Formular, CTAs und Vertrauenselemente werden so geplant, dass Interessenten den nächsten Schritt leichter gehen.",
    body:
      "Wir reduzieren Reibung durch sichtbare Telefonnummern, verständliche Formulare, klare CTAs und FAQ-Bereiche, die wichtige Einwände vor dem ersten Gespräch klären.",
    icon: "MousePointerClick",
    sort_order: 30,
    seo_title: "Conversion-Optimierung | vonLaim",
    seo_description:
      "Websites für Handwerksbetriebe mit klaren Kontaktwegen und weniger Reibung."
  },
  {
    id: "fallback-care",
    title: "Pflege, Inhalte & Weiterentwicklung",
    slug: "pflege-weiterentwicklung",
    eyebrow: "Betrieb",
    summary:
      "Nach dem Launch bleibt Ihre Website pflegbar, erweiterbar und auf neue Inhalte vorbereitet.",
    body:
      "Blog, FAQ, Referenzen, Leistungen, SEO-Felder und ausgewählte Startseitenbereiche werden so vorbereitet, dass Inhalte später wachsen können.",
    icon: "Wrench",
    sort_order: 40,
    seo_title: "Pflege und Weiterentwicklung | vonLaim",
    seo_description:
      "Website-Pflege und Weiterentwicklung für lokale Betriebe."
  }
];

const fallbackPost: Post = {
  id: "fallback-post",
  title: "Handwerker-Website: Warum klare Struktur bessere Anfragen bringt",
  slug: "warum-handwerksbetriebe-klare-website-brauchen",
  excerpt:
    "Eine moderne Website muss nicht kompliziert sein. Für Handwerksbetriebe zählt, dass Interessenten schnell Vertrauen fassen, die passende Leistung finden und ohne Umwege Kontakt aufnehmen können.",
  content:
    "Viele Handwerksbetriebe verlieren Anfragen nicht, weil die Arbeit schlecht ist. Sie verlieren Anfragen, weil der erste digitale Eindruck zu wenig erklärt.\n\nKunden vergleichen heute online: Was bietet der Betrieb an? In welcher Region arbeitet er? Gibt es Referenzen? Wie läuft eine Anfrage ab? Wie schnell bekomme ich eine Rückmeldung?\n\nEine klare Website beantwortet diese Fragen, bevor der Kunde zum Telefon greift. Sie zeigt Leistungen verständlich, macht regionale Nähe sichtbar und nimmt Unsicherheit aus der Entscheidung.",
  category: "Webdesign",
  tags: "Handwerk, Website, Vertrauen, Local SEO",
  featured_image: "",
  featured_image_alt: "",
  published_at: new Date("2026-04-24T00:00:00.000Z"),
  seo_title: "Handwerker-Website: Warum klare Struktur bessere Anfragen bringt | vonLaim",
  seo_description:
    "Wie eine klare Website Handwerksbetrieben hilft, Vertrauen aufzubauen, lokale Sichtbarkeit zu stärken und bessere Anfragen zu erhalten.",
  updated_at: new Date("2026-04-24T00:00:00.000Z")
};

const fallbackFaqs: Faq[] = [
  {
    id: "faq-cost",
    question: "Was kostet eine professionelle Website für einen Handwerksbetrieb?",
    answer:
      "Eine professionelle Handwerker-Website kostet je nach Umfang unterschiedlich. Entscheidend sind Seitenanzahl, Texte, Bilder, Leistungsstruktur, Local SEO, Kontaktformular, CMS und Pflege. vonLaim klärt Kosten, Aufwand und Nutzen zuerst im kostenlosen Erstgespräch.",
    category: "Kosten"
  },
  {
    id: "faq-builder",
    question: "Warum ist eine Website nicht einfach billiger mit einem Baukasten gemacht?",
    answer:
      "Ein Baukasten kann für den Start reichen. Oft fehlen aber klare Texte, saubere Struktur, lokale Auffindbarkeit, Ladezeit, Datenschutz und eine gezielte Führung zur Anfrage.",
    category: "Kosten"
  },
  {
    id: "faq-small-business",
    question: "Lohnt sich eine neue Website auch für kleinere Handwerksbetriebe?",
    answer:
      "Ja, wenn sie konkret auf Ihre Region, Leistungen und Zielkunden ausgerichtet ist. Viele Kunden prüfen heute zuerst online, ob ein Betrieb vertrauenswürdig wirkt.",
    category: "Nutzen"
  },
  {
    id: "faq-enough-work",
    question: "Wir bekommen genug Arbeit. Warum brauchen wir trotzdem eine bessere Website?",
    answer:
      "Ja, wenn die Website bessere statt nur mehr Anfragen erzeugt. Für ausgelastete Handwerksbetriebe kann eine klare Website helfen, passendere Projekte, weniger Preisdruck und bessere Vorqualifizierung zu erreichen.",
    category: "Nutzen"
  },
  {
    id: "faq-effort",
    question: "Wie viel Aufwand haben wir als Betrieb während des Projekts?",
    answer:
      "So wenig wie möglich, aber ganz ohne Ihre Erfahrung geht es nicht. Wir brauchen Informationen zu Leistungen, Region, Arbeitsweise, Bildern und typischen Kundenfragen.",
    category: "Ablauf"
  },
  {
    id: "faq-copy",
    question: "Müssen wir die Texte selbst schreiben?",
    answer:
      "Nein. Sie liefern die fachlichen Inhalte, wir formulieren daraus verständliche, handwerksnahe Webtexte.",
    category: "Inhalte"
  },
  {
    id: "faq-duration",
    question: "Wie lange dauert eine neue Website?",
    answer:
      "Je nach Umfang dauert ein hochwertiger Relaunch meist mehrere Wochen. Schneller geht es, wenn Bilder, Logo, Zugangsdaten und Inhalte früh vorliegen.",
    category: "Ablauf"
  },
  {
    id: "faq-existing-site",
    question: "Was passiert, wenn wir schon eine Website haben?",
    answer:
      "Dann prüfen wir zuerst, was weiterverwendet werden kann. Oft lassen sich Inhalte, Bilder oder die Domain behalten.",
    category: "Relaunch"
  },
  {
    id: "faq-rankings",
    question: "Wird unsere bestehende Google-Sichtbarkeit beim Relaunch schlechter?",
    answer:
      "Ein Relaunch muss sauber geplant werden. Wichtige Seiten, Weiterleitungen, Seitentitel, Inhalte und lokale Suchbegriffe sollten berücksichtigt werden.",
    category: "SEO"
  },
  {
    id: "faq-place-one",
    question: "Können Sie garantieren, dass wir bei Google auf Platz 1 kommen?",
    answer:
      "Nein, und seriös wäre eine solche Garantie nicht. Was wir tun: die Grundlagen sauber aufbauen und Ihre Chancen auf lokale Sichtbarkeit deutlich verbessern.",
    category: "SEO"
  },
  {
    id: "faq-seo",
    question: "Was bedeutet SEO für Handwerksbetriebe konkret?",
    answer:
      "SEO für Handwerksbetriebe bedeutet: Leistungen verständlich erklären, Einzugsgebiet und Standort sinnvoll einbinden, Seiten technisch sauber aufbauen und Kundenfragen beantworten.",
    category: "SEO"
  },
  {
    id: "faq-local-seo",
    question: "Bringt lokale SEO im Handwerk wirklich etwas?",
    answer:
      "Local SEO für Handwerker bedeutet, Leistungen, Einsatzgebiet, Standort, Kundenfragen und Kontaktwege so zu strukturieren, dass Google den Betrieb regional einordnen kann.",
    category: "Local SEO"
  },
  {
    id: "faq-industries",
    question: "Für welche Gewerke funktioniert das?",
    answer:
      "Für viele lokale Dienstleister und Handwerksbetriebe: Elektrik, Sanitär, Heizung, Solar, Dach, Maler, Trockenbau, Reinigung und ähnliche Betriebe.",
    category: "Branchen"
  },
  {
    id: "faq-content-frequency",
    question: "Müssen wir regelmäßig neue Inhalte veröffentlichen?",
    answer:
      "Nicht zwingend jede Woche. Wichtiger ist, dass die wichtigsten Leistungen und Einsatzgebiete sauber erklärt sind.",
    category: "Inhalte"
  },
  {
    id: "faq-cms",
    question: "Können wir die Website später selbst pflegen?",
    answer:
      "Ja. Das System ist mit einem eigenen Admin-Dashboard vorbereitet. Blogbeiträge, Leistungen, FAQs, Referenzen und SEO-Felder lassen sich ohne Codeänderung pflegen.",
    category: "CMS"
  },
  {
    id: "faq-after-launch",
    question: "Was passiert nach dem Launch?",
    answer:
      "Nach dem Start prüfen wir Formulare, Darstellung auf Smartphone und Desktop, Ladezeit, Datenschutz, Indexierung und wichtige Weiterleitungen.",
    category: "Betrieb"
  },
  {
    id: "faq-images",
    question: "Warum sind echte Bilder so wichtig?",
    answer:
      "Echte Bilder aus Ihrem Betrieb schaffen Vertrauen. Kunden wollen sehen, mit wem sie es zu tun haben und welche Arbeit Sie leisten.",
    category: "Inhalte"
  },
  {
    id: "faq-form",
    question: "Brauchen wir ein Anfrageformular?",
    answer:
      "In den meisten Fällen ja. Viele Kunden möchten nicht sofort anrufen, sondern erst kurz ihr Anliegen schildern.",
    category: "Anfragen"
  },
  {
    id: "faq-privacy",
    question: "Wie wird die Website datenschutzkonform vorbereitet?",
    answer:
      "Wir achten auf Impressum, Datenschutzerklärung, Cookie-Themen, Formularhinweise und möglichst datensparsame Einbindungen.",
    category: "Rechtliches"
  },
  {
    id: "faq-no-time",
    question: "Was ist, wenn wir keine Zeit für ein großes Projekt haben?",
    answer:
      "Dann starten wir mit dem Wesentlichen: klare Startseite, wichtigste Leistungen, Kontaktmöglichkeit und lokale Grundlagen.",
    category: "Ablauf"
  },
  {
    id: "faq-measurement",
    question: "Wie messen wir, ob die Website etwas bringt?",
    answer:
      "Zum Beispiel über Anfragen, Anrufe, Formularnutzung, Sichtbarkeit bei Google und häufig besuchte Seiten.",
    category: "Erfolg"
  },
  {
    id: "faq-why-contact",
    question: "Warum sollten Kunden gerade uns über die Website anfragen?",
    answer:
      "Weil die Website schnell verständlich machen sollte, was Sie leisten, wo Sie arbeiten, wie Sie vorgehen und warum man Ihnen vertrauen kann.",
    category: "Vertrauen"
  }
];

const fallbackBlocks: Record<string, ContentBlock> = {
  home_problem: {
    block_key: "home_problem",
    title: "Viele starke Betriebe wirken online schwächer, als sie wirklich sind.",
    eyebrow: "Ausgangslage",
    body:
      "Das Problem ist selten die Arbeit vor Ort. Es ist der erste digitale Eindruck: veraltete Optik, unklare Leistungen, wenig regionale Einordnung oder ein Kontaktweg, der zu viel Geduld verlangt.",
    cta_label: "Website-Potenzial prüfen lassen",
    cta_href: "/kontakt"
  },
  home_process: {
    block_key: "home_process",
    title: "Ein Website-Projekt, das neben Ihrem Tagesgeschäft machbar bleibt.",
    eyebrow: "Ablauf",
    body:
      "Wir klären zuerst, was Ihre Website leisten soll. Danach entstehen Struktur, Inhalte, Design und Technik in nachvollziehbaren Schritten. Sie wissen jederzeit, was als Nächstes passiert.",
    cta_label: "Ablauf ansehen",
    cta_href: "/warum-vonlaim"
  },
  home_final_cta: {
    block_key: "home_final_cta",
    title: "Lassen Sie uns prüfen, was Ihre Website besser leisten kann.",
    eyebrow: "Kostenloses Erstgespräch",
    body:
      "In einem kurzen Gespräch schauen wir auf Ihren Betrieb, Ihre aktuelle Website und Ihre wichtigsten Ziele. Danach wissen Sie, welche nächsten Schritte sinnvoll sind und ob eine Zusammenarbeit passt.",
    cta_label: "Website einschätzen lassen",
    cta_href: "/kontakt"
  }
};

export async function getSettings() {
  try {
    const result = await query<{ key: string; value: string }>(
      "SELECT key, value FROM site_settings"
    );
    return Object.fromEntries(result.rows.map((row) => [row.key, row.value]));
  } catch {
    return {
      brand_name: "vonLaim",
      claim: "Webseiten, die Handwerk sichtbar machen.",
      contact_email: "kontakt@vonlaim.de",
      contact_phone: "+49 152 05200600",
      office_region: "Bayern",
      service_area: "Bayern und perspektivisch ganz Deutschland",
      legal_company_name: "Yunus Kilic / vonLaim",
      legal_address: "Kriegerstr. 3a, 82110 Germering, Deutschland",
      legal_website: "https://www.vonlaim.de",
      vat_status:
        "Kleinunternehmer im Sinne von § 19 UStG, keine Umsatzsteuer-Identifikationsnummer vorhanden"
    };
  }
}

export async function getSetting(key: string, fallback = "") {
  try {
    const row = await queryOne<{ value: string }>(
      "SELECT value FROM site_settings WHERE key = $1",
      [key]
    );
    return row?.value ?? fallback;
  } catch {
    return fallback;
  }
}

export async function getContentBlocks() {
  try {
    const result = await query<ContentBlock>(
      "SELECT block_key, title, eyebrow, body, cta_label, cta_href FROM content_blocks WHERE status = 'published'"
    );
    return Object.fromEntries(result.rows.map((row) => [row.block_key, row]));
  } catch {
    return fallbackBlocks;
  }
}

export async function getServices() {
  try {
    const result = await query<Service>(
      `
        SELECT id, title, slug, eyebrow, summary, body, icon, sort_order, seo_title, seo_description
        FROM services
        WHERE status = 'published'
        ORDER BY sort_order ASC, title ASC
      `
    );
    return result.rows;
  } catch {
    return fallbackServices;
  }
}

export async function getPublishedPosts(limit = 12) {
  try {
    const result = await query<Post>(
      `
        SELECT id, title, slug, excerpt, content, category, tags, featured_image,
               featured_image_alt, published_at, seo_title, seo_description, updated_at
        FROM posts
        WHERE status = 'published'
        ORDER BY published_at DESC NULLS LAST, updated_at DESC
        LIMIT $1
      `,
      [limit]
    );
    return result.rows;
  } catch {
    return [fallbackPost].slice(0, limit);
  }
}

export async function getPostBySlug(slug: string) {
  try {
    return queryOne<Post>(
      `
        SELECT id, title, slug, excerpt, content, category, tags, featured_image,
               featured_image_alt, published_at, seo_title, seo_description, updated_at
        FROM posts
        WHERE slug = $1 AND status = 'published'
      `,
      [slug]
    );
  } catch {
    return slug === fallbackPost.slug ? fallbackPost : null;
  }
}

export async function getFaqs() {
  try {
    const result = await query<Faq>(
      `
        SELECT id, question, answer, category
        FROM faqs
        WHERE status = 'published'
        ORDER BY sort_order ASC, question ASC
      `
    );
    return result.rows;
  } catch {
    return fallbackFaqs;
  }
}

export async function getProjects(limit = 3) {
  try {
    const result = await query<Project>(
      `
        SELECT id, title, slug, client_name, industry, region, summary, challenge,
               solution, result, featured_image, featured_image_alt
        FROM projects
        WHERE status = 'published'
        ORDER BY sort_order ASC, title ASC
        LIMIT $1
      `,
      [limit]
    );
    return result.rows;
  } catch {
    return [];
  }
}

export async function getTestimonials(limit = 4) {
  try {
    const result = await query<Testimonial>(
      `
        SELECT id, name, company, role, quote, rating
        FROM testimonials
        WHERE status = 'published'
        ORDER BY sort_order ASC, name ASC
        LIMIT $1
      `,
      [limit]
    );
    return result.rows;
  } catch {
    return [];
  }
}

export async function getBranchPages() {
  try {
    const result = await query<BranchPageRow>(
      `
        SELECT id, slug, title, h1, description, audience, services, pain_points,
               faqs, seo_title, seo_description, sort_order
        FROM branch_pages
        WHERE status = 'published'
        ORDER BY sort_order ASC, title ASC
      `
    );
    return result.rows.map(mapBranchPage);
  } catch {
    return fallbackBranchPages();
  }
}

export async function getBranchPageBySlug(slug: string) {
  try {
    const row = await queryOne<BranchPageRow>(
      `
        SELECT id, slug, title, h1, description, audience, services, pain_points,
               faqs, seo_title, seo_description, sort_order
        FROM branch_pages
        WHERE slug = $1 AND status = 'published'
      `,
      [slug]
    );
    return row ? mapBranchPage(row) : null;
  } catch {
    return fallbackBranchPages().find((page) => page.slug === slug) ?? null;
  }
}

export async function getRegionPages() {
  try {
    const result = await query<RegionPageRow>(
      `
        SELECT id, slug, title, h1, description, region, nearby, focus,
               seo_title, seo_description, sort_order
        FROM region_pages
        WHERE status = 'published'
        ORDER BY sort_order ASC, title ASC
      `
    );
    return result.rows.map(mapRegionPage);
  } catch {
    return fallbackRegionPages();
  }
}

export async function getRegionPageBySlug(slug: string) {
  try {
    const row = await queryOne<RegionPageRow>(
      `
        SELECT id, slug, title, h1, description, region, nearby, focus,
               seo_title, seo_description, sort_order
        FROM region_pages
        WHERE slug = $1 AND status = 'published'
      `,
      [slug]
    );
    return row ? mapRegionPage(row) : null;
  } catch {
    return fallbackRegionPages().find((page) => page.slug === slug) ?? null;
  }
}
