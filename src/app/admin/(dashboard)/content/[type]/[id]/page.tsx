import { notFound } from "next/navigation";
import { getContentConfig } from "@/lib/admin-config";
import { getAdminItem } from "@/lib/admin-data";
import { ContentForm } from "@/components/admin/ContentForm";
import { updateContentAction } from "@/app/admin/(dashboard)/content/actions";

type EditContentPageProps = {
  params: Promise<{ type: string; id: string }>;
};

export default async function EditContentPage({ params }: EditContentPageProps) {
  const { type, id } = await params;
  const config = getContentConfig(type);
  if (!config) notFound();
  const item = await getAdminItem(type, id);
  if (!item) notFound();

  return (
    <>
      <div className="admin-topbar">
        <div>
          <span className="eyebrow">{config.singular}</span>
          <h1 style={{ fontSize: "2.4rem" }}>Bearbeiten</h1>
        </div>
      </div>
      <ContentForm config={config} item={item} action={updateContentAction.bind(null, type, id)} />
    </>
  );
}
