import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getContentConfig } from "@/lib/admin-config";
import { getPreviewItem } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

type PreviewPageProps = {
  params: Promise<{ type: string; id: string }>;
};

function paragraphText(value: unknown) {
  return String(value ?? "").split("\n").filter(Boolean);
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { type, id } = await params;
  const config = getContentConfig(type);
  if (!config) notFound();
  const item = await getPreviewItem(type, id);
  if (!item) notFound();

  const title = String(item[config.titleField] ?? config.singular);
  const summary =
    String(item.excerpt ?? "") ||
    String(item.summary ?? "") ||
    String(item.quote ?? "") ||
    String(item.answer ?? "");
  const body =
    String(item.content ?? "") ||
    String(item.body ?? "") ||
    [item.challenge, item.solution, item.result].filter(Boolean).join("\n\n") ||
    String(item.answer ?? "");

  return (
    <>
      <div className="admin-topbar">
        <Link className="btn btn-secondary" href={`/admin/content/${type}/${id}`}>
          <ArrowLeft size={16} aria-hidden="true" />
          Zurück
        </Link>
      </div>
      <article className="admin-surface article-copy">
        <span className="eyebrow">Vorschau: {config.singular}</span>
        <h1>{title}</h1>
        {summary ? <p className="lead">{summary}</p> : null}
        <div style={{ marginTop: "2rem" }}>
          {paragraphText(body).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </>
  );
}
