import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { Client } from "pg";

const connectionString =
  process.env.DATABASE_URL ?? "postgres://vonlaim:vonlaim@localhost:5433/vonlaim";

async function main() {
  const client = new Client({ connectionString });
  await client.connect();

  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);

  const migrationsDir = path.join(process.cwd(), "db", "migrations");
  const files = (await readdir(migrationsDir))
    .filter((file) => file.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const alreadyApplied = await client.query(
      "SELECT filename FROM schema_migrations WHERE filename = $1",
      [file]
    );

    if (alreadyApplied.rowCount) {
      console.log(`skip ${file}`);
      continue;
    }

    const sql = await readFile(path.join(migrationsDir, file), "utf8");
    await client.query("BEGIN");
    try {
      await client.query(sql);
      await client.query("INSERT INTO schema_migrations(filename) VALUES ($1)", [
        file
      ]);
      await client.query("COMMIT");
      console.log(`applied ${file}`);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    }
  }

  await client.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
