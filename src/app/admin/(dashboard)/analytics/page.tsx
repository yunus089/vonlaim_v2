import { BarChart3 } from "lucide-react";
import { query, queryOne } from "@/lib/db";

export const dynamic = "force-dynamic";

type CountRow = { count: string };
type TopRow = { label: string; count: string };
type EventRow = {
  event_name: string;
  path: string;
  referrer: string;
  metadata: Record<string, unknown>;
  created_at: Date;
};

async function scalar(sql: string) {
  const row = await queryOne<CountRow>(sql).catch(() => null);
  return row?.count ?? "0";
}

async function top(sql: string) {
  const rows = await query<TopRow>(sql).catch(() => ({ rows: [] }));
  return rows.rows;
}

export default async function AnalyticsPage() {
  const [events, pageViews, sessions, clicks, forms, scrolls, topPages, topClicks, referrers, recent] =
    await Promise.all([
      scalar("SELECT COUNT(*)::text AS count FROM analytics_events WHERE created_at > now() - interval '30 days'"),
      scalar("SELECT COUNT(*)::text AS count FROM analytics_events WHERE event_name = 'page_view' AND created_at > now() - interval '30 days'"),
      scalar("SELECT COUNT(DISTINCT session_id)::text AS count FROM analytics_events WHERE session_id <> '' AND created_at > now() - interval '30 days'"),
      scalar("SELECT COUNT(*)::text AS count FROM analytics_events WHERE event_name = 'click' AND created_at > now() - interval '30 days'"),
      scalar("SELECT COUNT(*)::text AS count FROM analytics_events WHERE event_name IN ('form_start','form_submit') AND created_at > now() - interval '30 days'"),
      scalar("SELECT COUNT(*)::text AS count FROM analytics_events WHERE event_name = 'scroll_depth' AND created_at > now() - interval '30 days'"),
      top(`
        SELECT path AS label, COUNT(*)::text AS count
        FROM analytics_events
        WHERE event_name = 'page_view' AND created_at > now() - interval '30 days'
        GROUP BY path
        ORDER BY COUNT(*) DESC
        LIMIT 10
      `),
      top(`
        SELECT COALESCE(NULLIF(metadata->>'label', ''), metadata->>'href', 'Unbekannt') AS label, COUNT(*)::text AS count
        FROM analytics_events
        WHERE event_name = 'click' AND created_at > now() - interval '30 days'
        GROUP BY label
        ORDER BY COUNT(*) DESC
        LIMIT 10
      `),
      top(`
        SELECT COALESCE(NULLIF(referrer, ''), 'Direkt / unbekannt') AS label, COUNT(*)::text AS count
        FROM analytics_events
        WHERE event_name = 'page_view' AND created_at > now() - interval '30 days'
        GROUP BY label
        ORDER BY COUNT(*) DESC
        LIMIT 10
      `),
      query<EventRow>(`
        SELECT event_name, path, referrer, metadata, created_at
        FROM analytics_events
        ORDER BY created_at DESC
        LIMIT 50
      `).catch(() => ({ rows: [] }))
    ]);

  const metrics = [
    ["Events", events],
    ["Seitenaufrufe", pageViews],
    ["Sessions", sessions],
    ["Klicks", clicks],
    ["Formular-Events", forms],
    ["Scroll-Tiefe", scrolls]
  ];

  return (
    <>
      <div className="admin-topbar">
        <div>
          <span className="eyebrow">CMS</span>
          <h1 style={{ fontSize: "2.4rem" }}>Analytics</h1>
        </div>
      </div>

      <div className="grid-4">
        {metrics.map(([label, value]) => (
          <div className="card" key={label}>
            <BarChart3 size={24} aria-hidden="true" />
            <strong style={{ display: "block", fontSize: "2rem", marginTop: "1rem" }}>{value}</strong>
            <span className="muted">{label} / 30 Tage</span>
          </div>
        ))}
      </div>

      <div className="grid-3" style={{ marginTop: "1rem" }}>
        <AnalyticsTable title="Top-Seiten" rows={topPages} />
        <AnalyticsTable title="Top-Klicks" rows={topClicks} />
        <AnalyticsTable title="Referrer" rows={referrers} />
      </div>

      <div className="admin-surface" style={{ marginTop: "1rem" }}>
        <h2 style={{ fontSize: "1.8rem" }}>Letzte Events</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Zeit</th>
              <th>Event</th>
              <th>Pfad</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {recent.rows.map((event) => (
              <tr key={`${event.created_at.toISOString()}-${event.event_name}-${event.path}`}>
                <td>{event.created_at.toLocaleString("de-DE")}</td>
                <td>{event.event_name}</td>
                <td><code>{event.path}</code></td>
                <td><code>{JSON.stringify(event.metadata)}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
        {recent.rows.length === 0 ? (
          <p className="muted">Noch keine Analytics-Events. Es wird erst nach Zustimmung getrackt.</p>
        ) : null}
      </div>
    </>
  );
}

function AnalyticsTable({ title, rows }: { title: string; rows: TopRow[] }) {
  return (
    <div className="admin-surface">
      <h2 style={{ fontSize: "1.45rem" }}>{title}</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Eintrag</th>
            <th>Anzahl</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td>{row.label}</td>
              <td>{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 ? <p className="muted">Noch keine Daten.</p> : null}
    </div>
  );
}
