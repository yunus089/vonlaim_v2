"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { query } from "@/lib/db";
import { sendLeadNotification } from "@/lib/mail";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().max(160).optional().default(""),
  email: z.string().trim().email(),
  phone: z.string().trim().max(60).optional().default(""),
  current_website: z.string().trim().max(240).optional().default(""),
  trade: z.string().trim().max(120).optional().default(""),
  region_goal: z.string().trim().max(160).optional().default(""),
  service_interest: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().min(3).max(2500),
  consent: z.literal("on"),
  website: z.string().optional().default("")
});

function normalizeWebsite(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export async function submitLead(formData: FormData) {
  const parsed = leadSchema.safeParse({
    name: formData.get("name"),
    company: formData.get("company"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    current_website: formData.get("current_website"),
    trade: formData.get("trade"),
    region_goal: formData.get("region_goal"),
    service_interest: formData.get("service_interest"),
    message: formData.get("message"),
    consent: formData.get("consent"),
    website: formData.get("website")
  });

  if (!parsed.success) {
    redirect("/kontakt?error=1");
  }

  if (parsed.data.website.trim()) {
    redirect("/danke");
  }

  const recentLeads = await query<{ count: string }>(
    `
      SELECT count(*)::text AS count
      FROM leads
      WHERE lower(email) = lower($1)
        AND created_at > now() - interval '30 minutes'
    `,
    [parsed.data.email]
  );

  if (Number(recentLeads.rows[0]?.count ?? 0) >= 2) {
    redirect("/kontakt?error=1");
  }

  const enrichedMessage = [
    parsed.data.trade ? `Gewerk: ${parsed.data.trade}` : "",
    parsed.data.region_goal ? `Region / Einsatzgebiet: ${parsed.data.region_goal}` : "",
    parsed.data.current_website ? `Aktuelle Website: ${normalizeWebsite(parsed.data.current_website)}` : "",
    `Nachricht: ${parsed.data.message}`
  ]
    .filter(Boolean)
    .join("\n");

  await query(
    `
      INSERT INTO leads(name, company, email, phone, service_interest, message, consent)
      VALUES ($1,$2,$3,$4,$5,$6,true)
    `,
    [
      parsed.data.name,
      parsed.data.company,
      parsed.data.email,
      parsed.data.phone,
      parsed.data.service_interest,
      enrichedMessage
    ]
  );

  await sendLeadNotification({
    name: parsed.data.name,
    company: parsed.data.company,
    email: parsed.data.email,
    phone: parsed.data.phone,
    serviceInterest: parsed.data.service_interest,
    message: enrichedMessage
  }).catch((error) => {
    console.error("Lead wurde gespeichert, aber die E-Mail-Benachrichtigung ist fehlgeschlagen.", error);
  });

  redirect("/danke");
}
