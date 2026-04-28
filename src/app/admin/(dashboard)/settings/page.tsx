import { updateSettingsAction } from "@/app/admin/(dashboard)/settings/actions";
import { getSettings } from "@/lib/public-content";

export const dynamic = "force-dynamic";

const fields = [
  ["brand_name", "Markenname"],
  ["claim", "Claim"],
  ["contact_email", "Kontakt E-Mail"],
  ["contact_phone", "Telefon"],
  ["booking_url", "Terminbuchung URL"],
  ["office_region", "Sitz / Region"],
  ["service_area", "Servicegebiet"],
  ["legal_company_name", "Rechtlicher Name"],
  ["legal_address", "Impressumsadresse"],
  ["analytics_mode", "Analytics-Status"],
  ["cookie_consent_mode", "Cookie-Status"]
] as const;

type SettingsPageProps = {
  searchParams: Promise<{ saved?: string }>;
};

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
  const [{ saved }, settings] = await Promise.all([searchParams, getSettings()]);

  return (
    <>
      <div className="admin-topbar">
        <div>
          <span className="eyebrow">CMS</span>
          <h1 style={{ fontSize: "2.4rem" }}>Einstellungen</h1>
        </div>
      </div>
      <form action={updateSettingsAction} className="admin-surface form-grid">
        {saved ? <p className="status">Gespeichert</p> : null}
        {fields.map(([key, label]) => (
          <div className="field" key={key}>
            <label htmlFor={key}>{label}</label>
            <input id={key} name={key} defaultValue={settings[key] ?? ""} />
          </div>
        ))}
        <button className="btn btn-accent" type="submit">
          Einstellungen speichern
        </button>
      </form>
    </>
  );
}
