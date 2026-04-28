import "server-only";

import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { query, queryOne } from "@/lib/db";

const sessionCookie = "vonlaim_session";
const ttlDays = 14;

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

function hashToken(token: string) {
  const secret = process.env.SESSION_SECRET ?? "development-secret";
  if (
    process.env.NODE_ENV === "production" &&
    (!process.env.SESSION_SECRET ||
      process.env.SESSION_SECRET === "change-this-long-random-secret-before-production" ||
      process.env.SESSION_SECRET.length < 32)
  ) {
    throw new Error("SESSION_SECRET muss in Produktion gesetzt und mindestens 32 Zeichen lang sein.");
  }
  return createHash("sha256").update(`${token}.${secret}`).digest("hex");
}

function safeCompare(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function verifyLogin(email: string, password: string) {
  const user = await queryOne<
    AdminUser & {
      password_hash: string;
    }
  >(
    "SELECT id, name, email, role, password_hash FROM users WHERE lower(email) = lower($1)",
    [email]
  ).catch(() => null);

  if (!user) return null;
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
}

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000);

  await query(
    "INSERT INTO sessions(user_id, token_hash, expires_at) VALUES ($1, $2, $3)",
    [userId, tokenHash, expiresAt]
  );

  const store = await cookies();
  store.set(sessionCookie, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt
  });
}

export async function getSessionUser() {
  const store = await cookies();
  const token = store.get(sessionCookie)?.value;
  if (!token) return null;

  const tokenHash = hashToken(token);
  const session = await queryOne<
    AdminUser & {
      token_hash: string;
      expires_at: Date;
    }
  >(
    `
      SELECT users.id, users.name, users.email, users.role, sessions.token_hash, sessions.expires_at
      FROM sessions
      JOIN users ON users.id = sessions.user_id
      WHERE sessions.token_hash = $1
        AND sessions.expires_at > now()
    `,
    [tokenHash]
  ).catch(() => null);

  if (!session || !safeCompare(session.token_hash, tokenHash)) return null;
  return {
    id: session.id,
    name: session.name,
    email: session.email,
    role: session.role
  };
}

export async function requireAdmin() {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  return user;
}

export async function destroySession() {
  const store = await cookies();
  const token = store.get(sessionCookie)?.value;
  if (token) {
    await query("DELETE FROM sessions WHERE token_hash = $1", [hashToken(token)]);
  }
  store.delete(sessionCookie);
}
