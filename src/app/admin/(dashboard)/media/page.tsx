import { Upload } from "lucide-react";
import { uploadMediaAction } from "@/app/admin/(dashboard)/media/actions";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

type MediaRow = {
  id: string;
  original_name: string;
  url: string;
  alt: string;
  mime_type: string;
  size_bytes: number;
  created_at: Date;
};

export default async function MediaPage() {
  const media = await query<MediaRow>(
    "SELECT id, original_name, url, alt, mime_type, size_bytes, created_at FROM media ORDER BY created_at DESC LIMIT 100"
  );

  return (
    <>
      <div className="admin-topbar">
        <div>
          <span className="eyebrow">CMS</span>
          <h1 style={{ fontSize: "2.4rem" }}>Medien</h1>
        </div>
      </div>
      <div className="grid-2">
        <form action={uploadMediaAction} className="admin-surface form-grid">
          <h2 style={{ fontSize: "1.8rem" }}>Bild hochladen</h2>
          <div className="field">
            <label htmlFor="file">Datei</label>
            <input id="file" name="file" type="file" accept="image/*" required />
          </div>
          <div className="field">
            <label htmlFor="alt">Alt-Text</label>
            <input id="alt" name="alt" placeholder="Beschreiben, was auf dem Bild zu sehen ist." />
          </div>
          <button className="btn btn-accent" type="submit">
            <Upload size={18} aria-hidden="true" />
            Hochladen
          </button>
        </form>
        <div className="admin-surface">
          <h2 style={{ fontSize: "1.8rem" }}>Hinweis</h2>
          <p className="muted">
            Aktuell werden Medien lokal in <code>/public/uploads</code> gespeichert.
            Die Architektur ist so dokumentiert, dass später ein S3-kompatibler
            Storage angebunden werden kann.
          </p>
        </div>
      </div>
      <div className="admin-surface" style={{ marginTop: "1rem" }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Datei</th>
              <th>URL</th>
              <th>Alt</th>
              <th>Größe</th>
            </tr>
          </thead>
          <tbody>
            {media.rows.map((item) => (
              <tr key={item.id}>
                <td>{item.original_name}</td>
                <td><code>{item.url}</code></td>
                <td>{item.alt || "—"}</td>
                <td>{Math.round(item.size_bytes / 1024)} KB</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
