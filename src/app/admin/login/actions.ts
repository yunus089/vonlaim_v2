"use server";

import { redirect } from "next/navigation";
import { createSession, verifyLogin } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const user = await verifyLogin(email, password);

  if (!user) {
    redirect("/admin/login?error=1");
  }

  await createSession(user.id);
  redirect("/admin");
}
