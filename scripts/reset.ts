import { Client } from "pg";

const connectionString =
  process.env.DATABASE_URL ?? "postgres://vonlaim:vonlaim@localhost:5433/vonlaim";

async function main() {
  const client = new Client({ connectionString });
  await client.connect();
  await client.query(`
    DROP TABLE IF EXISTS
      leads,
      site_settings,
      content_blocks,
      faqs,
      testimonials,
      projects,
      services,
      posts,
      media,
      sessions,
      users,
      schema_migrations
    CASCADE;
  `);
  await client.end();
  console.log("database reset");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
