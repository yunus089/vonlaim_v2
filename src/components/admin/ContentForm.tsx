import Link from "next/link";
import { Save } from "lucide-react";
import type { AdminContentConfig } from "@/lib/admin-config";
import type { AdminRow } from "@/lib/admin-data";

function valueFor(item: AdminRow | null, field: string) {
  const value = item?.[field];
  if (value instanceof Date) return value.toISOString().slice(0, 16);
  if (value === null || value === undefined) return "";
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) return value.slice(0, 16);
  return String(value);
}

type ContentFormProps = {
  config: AdminContentConfig;
  item?: AdminRow | null;
  action: (formData: FormData) => Promise<void>;
};

export function ContentForm({ config, item = null, action }: ContentFormProps) {
  return (
    <form action={action} className="admin-surface form-grid">
      {config.fields.map((field) => {
        const id = `${config.type}-${field.name}`;
        const value = valueFor(item, field.name);

        if (field.type === "textarea" || field.type === "richtext") {
          return (
            <div className="field" key={field.name}>
              <label htmlFor={id}>{field.label}{field.required ? " *" : ""}</label>
              <textarea
                id={id}
                name={field.name}
                required={field.required}
                defaultValue={value}
                rows={field.type === "richtext" ? 12 : 4}
              />
              {field.help ? <small>{field.help}</small> : null}
            </div>
          );
        }

        if (field.type === "select") {
          return (
            <div className="field" key={field.name}>
              <label htmlFor={id}>{field.label}</label>
              <select id={id} name={field.name} defaultValue={value || field.options?.[0]?.value}>
                {field.options?.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (field.type === "image") {
          return (
            <div className="field" key={field.name}>
              <label htmlFor={id}>{field.label}</label>
              <input id={id} name={field.name} defaultValue={value} placeholder="/uploads/bild.webp" />
              <input name={`${field.name}_file`} type="file" accept="image/*" />
              {value ? <small>Aktuell: {value}</small> : <small>Optional: Datei hochladen oder URL eintragen.</small>}
            </div>
          );
        }

        return (
          <div className="field" key={field.name}>
            <label htmlFor={id}>{field.label}{field.required ? " *" : ""}</label>
            <input
              id={id}
              name={field.name}
              type={field.type === "number" ? "number" : field.type === "datetime" ? "datetime-local" : "text"}
              required={field.required}
              defaultValue={value}
            />
            {field.help ? <small>{field.help}</small> : null}
          </div>
        );
      })}
      <div className="admin-actions">
        <button className="btn btn-accent" type="submit">
          <Save size={18} aria-hidden="true" />
          Speichern
        </button>
        <Link className="btn btn-secondary" href={`/admin/content/${config.type}`}>
          Abbrechen
        </Link>
      </div>
    </form>
  );
}
