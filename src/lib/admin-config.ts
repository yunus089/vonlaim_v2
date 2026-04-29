export type AdminField = {
  name: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "richtext"
    | "select"
    | "number"
    | "image"
    | "datetime";
  required?: boolean;
  help?: string;
  options?: Array<{ label: string; value: string }>;
};

export type AdminContentType =
  | "posts"
  | "services"
  | "branch_pages"
  | "region_pages"
  | "projects"
  | "testimonials"
  | "faqs"
  | "content_blocks";

export type AdminContentConfig = {
  type: AdminContentType;
  table: string;
  singular: string;
  plural: string;
  titleField: string;
  slugField?: string;
  orderBy: string;
  fields: AdminField[];
  listFields: string[];
};

const statusOptions = [
  { label: "Entwurf", value: "draft" },
  { label: "Veröffentlicht", value: "published" },
  { label: "Archiviert", value: "archived" }
];

export const contentConfigs: Record<AdminContentType, AdminContentConfig> = {
  posts: {
    type: "posts",
    table: "posts",
    singular: "Blogbeitrag",
    plural: "Blogbeiträge",
    titleField: "title",
    slugField: "slug",
    orderBy: "updated_at DESC",
    listFields: ["title", "status", "category", "updated_at"],
    fields: [
      { name: "title", label: "Titel", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", help: "Wird automatisch aus dem Titel erzeugt, wenn leer." },
      { name: "excerpt", label: "Kurzbeschreibung", type: "textarea", required: true },
      { name: "content", label: "Inhalt", type: "richtext", required: true },
      { name: "category", label: "Kategorie", type: "text" },
      { name: "tags", label: "Tags", type: "text", help: "Kommagetrennt, z. B. Handwerk, Local SEO" },
      { name: "featured_image", label: "Featured Image", type: "image" },
      { name: "featured_image_alt", label: "Alt-Text", type: "text" },
      { name: "status", label: "Status", type: "select", options: statusOptions },
      { name: "published_at", label: "Veröffentlicht am", type: "datetime" },
      { name: "seo_title", label: "SEO Title", type: "text" },
      { name: "seo_description", label: "SEO Description", type: "textarea" }
    ]
  },
  services: {
    type: "services",
    table: "services",
    singular: "Leistung",
    plural: "Leistungen",
    titleField: "title",
    slugField: "slug",
    orderBy: "sort_order ASC, title ASC",
    listFields: ["title", "status", "eyebrow", "sort_order"],
    fields: [
      { name: "title", label: "Titel", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "eyebrow", label: "Kategoriezeile", type: "text" },
      { name: "summary", label: "Kurzbeschreibung", type: "textarea", required: true },
      { name: "body", label: "Detailtext", type: "richtext", required: true },
      { name: "icon", label: "Icon-Name", type: "text", help: "Lucide-Name: Hammer, MapPinned, Wrench..." },
      { name: "status", label: "Status", type: "select", options: statusOptions },
      { name: "sort_order", label: "Sortierung", type: "number" },
      { name: "seo_title", label: "SEO Title", type: "text" },
      { name: "seo_description", label: "SEO Description", type: "textarea" }
    ]
  },
  branch_pages: {
    type: "branch_pages",
    table: "branch_pages",
    singular: "Branchenseite",
    plural: "Branchenseiten",
    titleField: "title",
    slugField: "slug",
    orderBy: "sort_order ASC, title ASC",
    listFields: ["title", "status", "audience", "sort_order"],
    fields: [
      { name: "title", label: "Seitentitel", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", help: "Beispiel: webdesign-elektriker" },
      { name: "h1", label: "H1", type: "text", required: true },
      { name: "description", label: "Einleitung / Meta-Beschreibung", type: "textarea", required: true },
      { name: "audience", label: "Zielgruppe", type: "text", help: "z. B. Elektrobetriebe und Elektrofachbetriebe" },
      {
        name: "services",
        label: "Empfohlene Website-Module",
        type: "textarea",
        help: "Eine Zeile pro Punkt."
      },
      {
        name: "pain_points",
        label: "Typische Engpässe",
        type: "textarea",
        help: "Eine Zeile pro Punkt."
      },
      {
        name: "faqs",
        label: "FAQs",
        type: "textarea",
        help: "Eine FAQ pro Zeile im Format: Frage | Antwort"
      },
      { name: "status", label: "Status", type: "select", options: statusOptions },
      { name: "sort_order", label: "Sortierung", type: "number" },
      { name: "seo_title", label: "SEO Title", type: "text" },
      { name: "seo_description", label: "SEO Description", type: "textarea" }
    ]
  },
  region_pages: {
    type: "region_pages",
    table: "region_pages",
    singular: "Regionseite",
    plural: "Regionseiten",
    titleField: "title",
    slugField: "slug",
    orderBy: "sort_order ASC, title ASC",
    listFields: ["title", "status", "region", "sort_order"],
    fields: [
      { name: "title", label: "Seitentitel", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", help: "Beispiel: webdesign-handwerker-muenchen" },
      { name: "h1", label: "H1", type: "text", required: true },
      { name: "description", label: "Einleitung / Meta-Beschreibung", type: "textarea", required: true },
      { name: "region", label: "Hauptregion", type: "text", required: true },
      { name: "nearby", label: "Orte und Bezüge", type: "textarea", help: "Eine Zeile pro Ort oder Bezug." },
      { name: "focus", label: "Lokaler Fokus", type: "textarea" },
      { name: "status", label: "Status", type: "select", options: statusOptions },
      { name: "sort_order", label: "Sortierung", type: "number" },
      { name: "seo_title", label: "SEO Title", type: "text" },
      { name: "seo_description", label: "SEO Description", type: "textarea" }
    ]
  },
  projects: {
    type: "projects",
    table: "projects",
    singular: "Projekt",
    plural: "Projekte",
    titleField: "title",
    slugField: "slug",
    orderBy: "sort_order ASC, title ASC",
    listFields: ["title", "status", "industry", "region"],
    fields: [
      { name: "title", label: "Titel", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "client_name", label: "Kunde/Betrieb", type: "text" },
      { name: "industry", label: "Branche", type: "text" },
      { name: "region", label: "Region", type: "text" },
      { name: "summary", label: "Zusammenfassung", type: "textarea" },
      { name: "challenge", label: "Ausgangslage", type: "textarea" },
      { name: "solution", label: "Lösung", type: "textarea" },
      { name: "result", label: "Ergebnis", type: "textarea" },
      { name: "featured_image", label: "Projektbild", type: "image" },
      { name: "featured_image_alt", label: "Alt-Text", type: "text" },
      { name: "status", label: "Status", type: "select", options: statusOptions },
      { name: "sort_order", label: "Sortierung", type: "number" },
      { name: "seo_title", label: "SEO Title", type: "text" },
      { name: "seo_description", label: "SEO Description", type: "textarea" }
    ]
  },
  testimonials: {
    type: "testimonials",
    table: "testimonials",
    singular: "Testimonial",
    plural: "Testimonials",
    titleField: "name",
    orderBy: "sort_order ASC, name ASC",
    listFields: ["name", "status", "company", "rating"],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "company", label: "Betrieb", type: "text" },
      { name: "role", label: "Rolle", type: "text" },
      { name: "quote", label: "Zitat", type: "textarea", required: true },
      { name: "rating", label: "Bewertung", type: "number" },
      { name: "status", label: "Status", type: "select", options: statusOptions },
      { name: "sort_order", label: "Sortierung", type: "number" }
    ]
  },
  faqs: {
    type: "faqs",
    table: "faqs",
    singular: "FAQ",
    plural: "FAQs",
    titleField: "question",
    orderBy: "sort_order ASC, question ASC",
    listFields: ["question", "status", "category", "sort_order"],
    fields: [
      { name: "question", label: "Frage", type: "text", required: true },
      { name: "answer", label: "Antwort", type: "textarea", required: true },
      { name: "category", label: "Kategorie", type: "text" },
      { name: "status", label: "Status", type: "select", options: statusOptions },
      { name: "sort_order", label: "Sortierung", type: "number" }
    ]
  },
  content_blocks: {
    type: "content_blocks",
    table: "content_blocks",
    singular: "Content-Block",
    plural: "Content-Blöcke",
    titleField: "title",
    orderBy: "block_key ASC",
    listFields: ["block_key", "title", "status", "updated_at"],
    fields: [
      { name: "block_key", label: "Block Key", type: "text", required: true },
      { name: "title", label: "Titel", type: "text", required: true },
      { name: "eyebrow", label: "Kategoriezeile", type: "text" },
      { name: "body", label: "Text", type: "textarea" },
      { name: "cta_label", label: "CTA Label", type: "text" },
      { name: "cta_href", label: "CTA Link", type: "text" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [
          { label: "Veröffentlicht", value: "published" },
          { label: "Versteckt", value: "hidden" }
        ]
      }
    ]
  }
};

export function getContentConfig(type: string) {
  if (type in contentConfigs) {
    return contentConfigs[type as AdminContentType];
  }
  return null;
}
