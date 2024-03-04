import argon2 from "argon2";
import { db } from "./database.js";
import { User, sessions, users } from "./schema.js";
import { and, eq } from "drizzle-orm";

export async function validCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const results = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  if (results.length != 1) {
    return false;
  }

  const { passhash } = results[0];
  return await verifyPassword(password, passhash as string);
}

export async function hashPassword(password: string): Promise<string> {
  return await argon2.hash(password);
}

export async function verifyPassword(
  password: string,
  passhash: string
): Promise<boolean> {
  return await argon2.verify(passhash, password);
}

export async function authenticated(
  sessionId: string
): Promise<boolean> {
  const result = await db
    .select({ id: sessions.id, expires: sessions.expires })
    .from(sessions)
    .where(eq(sessions.id, sessionId));

  if (result.length !== 1) return false;
  const { id, expires } = result[0];
  if (Date.now() >= expires.getTime()) {
    db.delete(sessions).where(eq(sessions.id, id));
    return false;
  }

  return true;
}
