"use server";

import { redirect } from "next/navigation";
import {
  createAdminItem,
  deleteAdminItem,
  updateAdminItem
} from "@/lib/admin-data";

export async function createContentAction(type: string, formData: FormData) {
  await createAdminItem(type, formData);
  redirect(`/admin/content/${type}`);
}

export async function updateContentAction(type: string, id: string, formData: FormData) {
  await updateAdminItem(type, id, formData);
  redirect(`/admin/content/${type}`);
}

export async function deleteContentAction(type: string, id: string) {
  await deleteAdminItem(type, id);
  redirect(`/admin/content/${type}`);
}
