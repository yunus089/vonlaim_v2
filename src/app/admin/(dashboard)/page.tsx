import Link from "next/link";
import { ArrowRight, FileText, MapPinned, MessageSquare, Sparkles, Wrench } from "lucide-react";
import { queryOne } from "@/lib/db";

export const dynamic = "force-dynamic";

async function count(table: string) {
  const row = await queryOne<{ count: string }>(`SELECT COUNT(*)::text AS count FROM ${table}`).catch(() => null);
  return row?.count ?? "0";
}

export default async function AdminDashboard() {
  const [posts, services, branchPages, regionPages, projects, leads] = await Promise.all([
    count("posts"),
    count("services"),
    count("branch_pages"),
    count("region_pages"),
    count("projects"),
    count("leads")
  ]);

  const metrics = [
    ["Blogbeiträge", posts, FileText, "/admin/content/posts"],
    ["Leistungen", services, Wrench, "/admin/content/services"],
    ["Branchenseiten", branchPages, Sparkles, "/admin/content/branch_pages"],
    ["Regionseiten", regionPages, MapPinned, "/admin/content/region_pages"],
    ["Projekte", projects, Sparkles, "/admin/content/projects"],
    ["Anfragen", leads, MessageSquare, "/admin/leads"]
  ] as const;

  return (
    <>
      <div className="admin-topbar">
        <div>
          <span className="eyebrow">CMS</span>
          <h1 style={{ fontSize: "2.4rem" }}>Dashboard</h1>
        </div>
        <Link className="btn btn-accent" href="/admin/content/posts/new">
          Neuer Beitrag
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
      <div className="grid-4">
        {metrics.map(([label, value, Icon, href]) => (
          <Link className="card" href={href} key={label}>
            <Icon size={24} aria-hidden="true" />
            <strong style={{ display: "block", fontSize: "2rem", marginTop: "1rem" }}>{value}</strong>
            <span className="muted">{label}</span>
          </Link>
        ))}
      </div>
      <section className="admin-surface" style={{ marginTop: "1rem" }}>
        <h2 style={{ fontSize: "1.8rem" }}>Redaktionelle Leitplanken</h2>
        <ul className="plain-list">
          <li>Keine erfundenen Bewertungen, Zahlen oder Referenzen veröffentlichen.</li>
          <li>Jeder Beitrag braucht einen klaren Nutzen, eine Zielgruppe und saubere SEO-Felder.</li>
          <li>Featured Images brauchen aussagekräftige Alt-Texte.</li>
          <li>Branchenseiten erst veröffentlichen, wenn echter Branchenbezug vorhanden ist.</li>
        </ul>
      </section>
    </>
  );
}
