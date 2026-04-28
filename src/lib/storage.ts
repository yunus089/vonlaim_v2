import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { query } from "@/lib/db";
import { slugify } from "@/lib/slug";

const uploadDir = path.join(process.cwd(), "public", "uploads");

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif"
]);

function extensionFor(file: File) {
  const fromName = file.name.split(".").pop()?.toLowerCase();
  if (fromName && fromName.length <= 5) return fromName;
  if (file.type === "image/jpeg") return "jpg";
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  if (file.type === "image/avif") return "avif";
  return "bin";
}

export async function saveUpload(file: File, alt = "") {
  if (!file || file.size === 0) return null;
  if (!allowedTypes.has(file.type)) {
    throw new Error("Nur JPG, PNG, WebP oder AVIF sind erlaubt.");
  }
  if (file.size > 6 * 1024 * 1024) {
    throw new Error("Die Datei ist größer als 6 MB.");
  }

  await mkdir(uploadDir, { recursive: true });

  const baseName = slugify(file.name.replace(/\.[^.]+$/, "")) || "upload";
  const filename = `${baseName}-${randomUUID().slice(0, 8)}.${extensionFor(file)}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), buffer);

  const url = `/uploads/${filename}`;
  await query(
    `
      INSERT INTO media(filename, original_name, url, alt, mime_type, size_bytes)
      VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [filename, file.name, url, alt, file.type, file.size]
  );

  return url;
}
