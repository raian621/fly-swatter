import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import * as schema from "./schema.js"
import postgres from "postgres";

const pgClient = postgres("", {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT as string),
});

export const db = drizzle(pgClient, { schema });
await migrate(db, { migrationsFolder: "src/server/drizzle" });
pgClient.end()