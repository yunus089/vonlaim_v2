import { revalidatePath } from "next/cache";
import { query, queryOne } from "@/lib/db";
import {
  type AdminContentConfig,
  type AdminContentType,
  getContentConfig
} from "@/lib/admin-config";
import { slugify } from "@/lib/slug";
import { saveUpload } from "@/lib/storage";

export type AdminRow = Record<string, string | number | Date | null>;

function assertConfig(type: string): AdminContentConfig {
  const config = getContentConfig(type);
  if (!config) throw new Error("Unbekannter Inhaltstyp.");
  return config;
}

function selectColumns(config: AdminContentConfig) {
  const columns = new Set(["id", ...config.listFields, ...config.fields.map((field) => field.name)]);
  return Array.from(columns).join(", ");
}

export async function listAdminItems(type: string) {
  const config = assertConfig(type);
  const result = await query<AdminRow>(
    `SELECT ${selectColumns(config)} FROM ${config.table} ORDER BY ${config.orderBy}`
  );
  return result.rows;
}

export async function getAdminItem(type: string, id: string) {
  const config = assertConfig(type);
  return queryOne<AdminRow>(
    `SELECT ${selectColumns(config)} FROM ${config.table} WHERE id = $1`,
    [id]
  );
}

export async function getPreviewItem(type: string, id: string) {
  return getAdminItem(type, id);
}

function formValue(formData: FormData, name: string) {
  const value = formData.get(name);
  if (typeof value !== "string") return "";
  return value.trim();
}

async function valuesFromForm(config: AdminContentConfig, formData: FormData) {
  const values: Record<string, string | number | null> = {};

  for (const field of config.fields) {
    if (field.type === "image") {
      const file = formData.get(`${field.name}_file`);
      const alt = formValue(formData, `${field.name}_alt`) || formValue(formData, "featured_image_alt");
      if (file instanceof File && file.size > 0) {
        values[field.name] = await saveUpload(file, alt);
      } else {
        values[field.name] = formValue(formData, field.name);
      }
      continue;
    }

    if (field.type === "number") {
      const raw = formValue(formData, field.name);
      values[field.name] = raw ? Number(raw) : 0;
      continue;
    }

    if (field.type === "datetime") {
      const raw = formValue(formData, field.name);
      values[field.name] = raw ? new Date(raw).toISOString() : null;
      continue;
    }

    values[field.name] = formValue(formData, field.name);
  }

  if (config.slugField) {
    const slug = String(values[config.slugField] ?? "");
    const title = String(values[config.titleField] ?? "");
    values[config.slugField] = slug || slugify(title);
  }

  if ("status" in values && !values.status) values.status = "draft";
  if ("published_at" in values && values.status === "published" && !values.published_at) {
    values.published_at = new Date().toISOString();
  }

  return values;
}

export async function createAdminItem(type: string, formData: FormData) {
  const config = assertConfig(type);
  const values = await valuesFromForm(config, formData);
  const columns = Object.keys(values);
  const params = Object.values(values);
  const placeholders = columns.map((_, index) => `$${index + 1}`);

  await query(
    `
      INSERT INTO ${config.table}(${columns.join(", ")})
      VALUES (${placeholders.join(", ")})
    `,
    params
  );

  revalidateFor(type as AdminContentType);
}

export async function updateAdminItem(type: string, id: string, formData: FormData) {
  const config = assertConfig(type);
  const values = await valuesFromForm(config, formData);
  const columns = Object.keys(values);
  const params = [...Object.values(values), id];
  const assignments = columns.map((column, index) => `${column} = $${index + 1}`);

  if (config.table !== "content_blocks") {
    assignments.push("updated_at = now()");
  } else {
    assignments.push("updated_at = now()");
  }

  await query(
    `
      UPDATE ${config.table}
      SET ${assignments.join(", ")}
      WHERE id = $${params.length}
    `,
    params
  );

  revalidateFor(type as AdminContentType);
}

export async function deleteAdminItem(type: string, id: string) {
  const config = assertConfig(type);
  await query(`DELETE FROM ${config.table} WHERE id = $1`, [id]);
  revalidateFor(type as AdminContentType);
}

function revalidateFor(type: AdminContentType) {
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  if (type === "posts") revalidatePath("/blog");
  if (type === "services") revalidatePath("/leistungen");
  if (type === "branch_pages") revalidatePath("/branchen");
  if (type === "region_pages") revalidatePath("/regionen");
  if (type === "faqs") revalidatePath("/faq");
}
