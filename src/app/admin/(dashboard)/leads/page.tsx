import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  service_interest: string;
  message: string;
  status: string;
  created_at: Date;
};

export default async function LeadsPage() {
  const leads = await query<Lead>(
    "SELECT id, name, company, email, phone, service_interest, message, status, created_at FROM leads ORDER BY created_at DESC LIMIT 100"
  );

  return (
    <>
      <div className="admin-topbar">
        <div>
          <span className="eyebrow">CMS</span>
          <h1 style={{ fontSize: "2.4rem" }}>Anfragen</h1>
        </div>
      </div>
      <div className="admin-surface">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Datum</th>
              <th>Name</th>
              <th>Kontakt</th>
              <th>Interesse</th>
              <th>Nachricht</th>
            </tr>
          </thead>
          <tbody>
            {leads.rows.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.created_at.toLocaleDateString("de-DE")}</td>
                <td>{lead.name}<br /><span className="muted">{lead.company}</span></td>
                <td>
                  <a href={`mailto:${lead.email}`}>{lead.email}</a>
                  <br />
                  <span className="muted">{lead.phone || "—"}</span>
                </td>
                <td>{lead.service_interest || "—"}</td>
                <td>{lead.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.rows.length === 0 ? <p className="muted">Noch keine Anfragen.</p> : null}
      </div>
    </>
  );
}
