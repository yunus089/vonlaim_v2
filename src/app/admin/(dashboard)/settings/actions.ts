"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { query } from "@/lib/db";

const editableSettings = [
  "brand_name",
  "claim",
  "contact_email",
  "contact_phone",
  "booking_url",
  "office_region",
  "service_area",
  "legal_company_name",
  "legal_address",
  "analytics_mode",
  "cookie_consent_mode"
];

export async function updateSettingsAction(formData: FormData) {
  for (const key of editableSettings) {
    const value = String(formData.get(key) ?? "");
    await query(
      `
        INSERT INTO site_settings(key, value)
        VALUES ($1, $2)
        ON CONFLICT (key) DO UPDATE
        SET value = EXCLUDED.value, updated_at = now()
      `,
      [key, value]
    );
  }

  revalidatePath("/");
  revalidatePath("/kontakt");
  redirect("/admin/settings?saved=1");
}
