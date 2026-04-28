"use server";

import { redirect } from "next/navigation";
import { saveUpload } from "@/lib/storage";

export async function uploadMediaAction(formData: FormData) {
  const file = formData.get("file");
  const alt = String(formData.get("alt") ?? "");
  if (file instanceof File && file.size > 0) {
    await saveUpload(file, alt);
  }
  redirect("/admin/media");
}
