const umlautMap: Record<string, string> = {
  ä: "ae",
  ö: "oe",
  ü: "ue",
  ß: "ss",
  Ä: "ae",
  Ö: "oe",
  Ü: "ue"
};

export function slugify(input: string) {
  return input
    .replace(/[äöüßÄÖÜ]/g, (char) => umlautMap[char] ?? char)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}
