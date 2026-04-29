import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { query } from "@/lib/db";

const eventSchema = z.object({
  event_name: z.enum(["page_view", "click", "form_start", "form_submit", "scroll_depth"]),
  path: z.string().max(500).default(""),
  referrer: z.string().max(500).default(""),
  session_id: z.string().max(80).default(""),
  metadata: z.record(z.string(), z.unknown()).default({}),
  analytics_consent: z.literal(true)
});

function clientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    ""
  );
}

function hashIp(ip: string) {
  if (!ip) return "";
  const secret = process.env.ANALYTICS_SALT ?? process.env.SESSION_SECRET ?? "local-analytics";
  return createHash("sha256").update(`${secret}:${ip}`).digest("hex");
}

export async function POST(request: NextRequest) {
  const parsed = eventSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const payload = parsed.data;
  const userAgent = request.headers.get("user-agent") ?? "";

  await query(
    `
      INSERT INTO analytics_events(session_id, event_name, path, referrer, user_agent, consent_category, metadata, ip_hash)
      VALUES ($1,$2,$3,$4,$5,'analytics',$6,$7)
    `,
    [
      payload.session_id,
      payload.event_name,
      payload.path,
      payload.referrer,
      userAgent.slice(0, 500),
      payload.metadata,
      hashIp(clientIp(request))
    ]
  );

  return NextResponse.json({ ok: true });
}
