import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  HelpCircle,
  Home,
  Image,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Sparkles,
  Star,
  Wrench
} from "lucide-react";
import { requireAdmin } from "@/lib/auth";

const nav = [
  ["Dashboard", "/admin", LayoutDashboard],
  ["Blog", "/admin/content/posts", FileText],
  ["Leistungen", "/admin/content/services", Wrench],
  ["Projekte", "/admin/content/projects", Sparkles],
  ["Testimonials", "/admin/content/testimonials", Star],
  ["FAQs", "/admin/content/faqs", HelpCircle],
  ["Startseiten-Blöcke", "/admin/content/content_blocks", Home],
  ["Medien", "/admin/media", Image],
  ["Anfragen", "/admin/leads", MessageSquare],
  ["Einstellungen", "/admin/settings", Settings]
] as const;

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false
  }
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();

  return (
    <main className="admin-page admin-layout">
      <aside className="admin-sidebar">
        <Link href="/" className="brand">
          <span className="brand-mark">vL</span>
          <span>vonLaim</span>
        </Link>
        <p style={{ color: "rgba(255,255,255,.68)" }}>{user.email}</p>
        <nav aria-label="Admin Navigation">
          {nav.map(([label, href, Icon]) => (
            <Link key={href} href={href}>
              <Icon size={18} aria-hidden="true" />
              {label}
            </Link>
          ))}
          <Link href="/admin/logout">
            <LogOut size={18} aria-hidden="true" />
            Logout
          </Link>
        </nav>
      </aside>
      <section className="admin-main">{children}</section>
    </main>
  );
}
