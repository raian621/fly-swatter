import "dotenv/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./database.js";

export async function migrateDB() {
  await migrate(db, { migrationsFolder: "src/server/drizzle" });
}
