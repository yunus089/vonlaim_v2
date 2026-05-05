import { pricingAddOns, pricingOffers } from "@/lib/site-data";

const siteUrl = process.env.APP_URL ?? "https://www.vonlaim.de";

function sectionForOffer(offer: (typeof pricingOffers)[number]) {
  return [
    `## ${offer.title}`,
    `Preis: ${offer.price}`,
    `Für wen: ${offer.summary}`,
    "Enthalten:",
    ...offer.points.map((point) => `- ${point}`),
    `CTA: ${offer.cta} -> ${new URL(offer.href, siteUrl).href}`
  ].join("\n");
}

export async function GET() {
  const body = [
    "# Preise & Einstieg bei vonLaim",
    "",
    `Stand: ${new Date().toISOString().slice(0, 10)}`,
    "",
    "vonLaim baut Websites für Handwerksbetriebe, die klar wirken, lokal verständlich sind und bessere Anfragen erleichtern.",
    "Das CMS ist nicht automatisch im Website-Projekt enthalten. Es kann je nach Bedarf optional ergänzt werden.",
    "",
    ...pricingOffers.flatMap((offer) => ["", sectionForOffer(offer)]),
    "",
    "## Optionale Erweiterungen",
    ...pricingAddOns.flatMap((offer) => ["", sectionForOffer({ ...offer, cta: "CMS besprechen", href: "/kontakt", featured: false })]),
    "",
    "Kontakt:",
    `- Website: ${siteUrl}`,
    "- E-Mail: kontakt@vonlaim.de",
    "- Telefon: +49 152 05200600",
    "",
    "Hinweis: Der konkrete Umfang wird immer im kostenlosen Website-Check geklärt."
  ]
    .join("\n")
    .trim();

  return new Response(body + "\n", {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8"
    }
  });
}
