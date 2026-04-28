import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { getContentConfig } from "@/lib/admin-config";
import { listAdminItems } from "@/lib/admin-data";
import { deleteContentAction } from "@/app/admin/(dashboard)/content/actions";

export const dynamic = "force-dynamic";

type ContentListPageProps = {
  params: Promise<{ type: string }>;
};

function display(value: unknown) {
  if (value instanceof Date) return value.toLocaleDateString("de-DE");
  if (value === null || value === undefined || value === "") return "—";
  return String(value);
}

export default async function ContentListPage({ params }: ContentListPageProps) {
  const { type } = await params;
  const config = getContentConfig(type);
  if (!config) notFound();

  const items = await listAdminItems(type);

  return (
    <>
      <div className="admin-topbar">
        <div>
          <span className="eyebrow">CMS</span>
          <h1 style={{ fontSize: "2.4rem" }}>{config.plural}</h1>
        </div>
        <Link className="btn btn-accent" href={`/admin/content/${type}/new`}>
          <Plus size={18} aria-hidden="true" />
          Neu
        </Link>
      </div>
      <div className="admin-surface">
        <table className="admin-table">
          <thead>
            <tr>
              {config.listFields.map((field) => (
                <th key={field}>{field.replace(/_/g, " ")}</th>
              ))}
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={String(item.id)}>
                {config.listFields.map((field) => (
                  <td key={field}>
                    {field === "status" ? (
                      <span className={`status ${String(item[field])}`}>{display(item[field])}</span>
                    ) : (
                      display(item[field])
                    )}
                  </td>
                ))}
                <td>
                  <div className="admin-actions">
                    <Link className="btn btn-secondary icon-btn" href={`/admin/content/${type}/${item.id}`} aria-label="Bearbeiten" title="Bearbeiten">
                      <Pencil size={16} aria-hidden="true" />
                    </Link>
                    <Link className="btn btn-secondary icon-btn" href={`/admin/preview/${type}/${item.id}`} aria-label="Vorschau" title="Vorschau">
                      <Eye size={16} aria-hidden="true" />
                    </Link>
                    <form action={deleteContentAction.bind(null, type, String(item.id))}>
                      <button className="btn btn-secondary icon-btn danger" type="submit" aria-label="Löschen" title="Löschen">
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 ? (
          <p className="muted">
            Noch keine Einträge.{" "}
            <Link href={`/admin/content/${type}/new`}>
              Ersten Eintrag anlegen <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </p>
        ) : null}
      </div>
    </>
  );
}
