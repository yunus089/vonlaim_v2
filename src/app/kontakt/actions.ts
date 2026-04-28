"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { query } from "@/lib/db";

const leadSchema = z.object({
  name: z.string().min(2),
  company: z.string().optional().default(""),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  service_interest: z.string().optional().default(""),
  message: z.string().min(10),
  consent: z.literal("on")
});

export async function submitLead(formData: FormData) {
  const parsed = leadSchema.safeParse({
    name: formData.get("name"),
    company: formData.get("company"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    service_interest: formData.get("service_interest"),
    message: formData.get("message"),
    consent: formData.get("consent")
  });

  if (!parsed.success) {
    redirect("/kontakt?error=1");
  }

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
      parsed.data.message
    ]
  );

  redirect("/danke");
}
