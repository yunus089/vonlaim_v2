import { Pool, type QueryResultRow } from "pg";

const connectionString =
  process.env.DATABASE_URL ?? "postgres://vonlaim:vonlaim@localhost:5433/vonlaim";

declare global {
  var __vonlaimPool: Pool | undefined;
}

export const pool =
  globalThis.__vonlaimPool ??
  new Pool({
    connectionString,
    max: 8,
    idleTimeoutMillis: 30_000
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__vonlaimPool = pool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: unknown[] = []
) {
  return pool.query<T>(text, params);
}

export async function queryOne<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: unknown[] = []
) {
  const result = await query<T>(text, params);
  return result.rows[0] ?? null;
}
