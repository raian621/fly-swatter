import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.js";
import { eq } from "drizzle-orm";
import { createUser } from './crud/users.js'

dotenv.config();

export const pgClient = postgres("", {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT as string),
});

export const db = drizzle(pgClient, { schema });

export async function guaranteeAdminUser() {
  const results = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.username, "admin"));
  if (results.length === 0) {
    if (await createUser("admin", "admin")) {
      console.log("Created admin user");
    } else {
      console.log("Failed creating admin user");
    }
  }
}

export async function getUserId(username: string): Promise<string|null> {
  const results = await db
    .select({ userId: schema.users.id })
    .from(schema.users)
    .where(eq(schema.users.username, username));

    if (results.length === 0) return null;
    const { userId } = results[0]
    return userId
}
