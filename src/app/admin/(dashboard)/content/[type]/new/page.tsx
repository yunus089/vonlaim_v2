import { notFound } from "next/navigation";
import { getContentConfig } from "@/lib/admin-config";
import { ContentForm } from "@/components/admin/ContentForm";
import { createContentAction } from "@/app/admin/(dashboard)/content/actions";

type NewContentPageProps = {
  params: Promise<{ type: string }>;
};

export default async function NewContentPage({ params }: NewContentPageProps) {
  const { type } = await params;
  const config = getContentConfig(type);
  if (!config) notFound();

  return (
    <>
      <div className="admin-topbar">
        <div>
          <span className="eyebrow">{config.singular}</span>
          <h1 style={{ fontSize: "2.4rem" }}>Neu anlegen</h1>
        </div>
      </div>
      <ContentForm config={config} action={createContentAction.bind(null, type)} />
    </>
  );
}
