import crypto from "crypto";
import { db } from "../database.js";
import { Session, sessions, users } from "../schema.js";
import { eq } from "drizzle-orm";

const SESSION_EXPIRES_AFTER = 7 * 24 * 60 * 60 * 1000; // ms

export type SessionInfo = {
  sessionId: string;
  expires: string;
  username: string;
};

export async function getSession(sessionId: string): Promise<Session | null> {
  const result = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, sessionId));

  if (result.length !== 1) return null;

  return result[0];
}

export async function createSession(userId: string): Promise<Session> {
  const uniqueSID = async (sid: string) => {
    const rows = await db.select({}).from(sessions).where(eq(sessions.id, sid));
    return rows.length === 0;
  };

  const expires = new Date(SESSION_EXPIRES_AFTER + Date.now());
  const id = await generateSessionIdString(uniqueSID);

  expires.setMilliseconds(0);

  await db.insert(sessions).values({
    id,
    expires,
    user_id: userId,
  });

  return {
    id,
    expires,
    user_id: userId,
  };
}

export async function deleteSession(sessionId: string) {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}

export async function generateSessionIdString(
  uniqueSID: (sid: string) => Promise<boolean>
): Promise<string> {
  let sidCandidate = crypto.randomBytes(32).toString("base64url");

  // regenerate random sessionID if if matches an existing SID in the database
  while (!(await uniqueSID(sidCandidate))) {
    sidCandidate = crypto.randomBytes(32).toString("base64url");
  }

  return sidCandidate;
}

export async function getSessionInfo(
  sessionId: string
): Promise<SessionInfo | null> {
  const result = await db
    .select({ 
      sessionId: sessions.id,
      expires: sessions.expires,
      username: users.username
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.user_id, users.id))
    .where(eq(sessions.id, sessionId))

  if (result.length !== 1) {
    return null;
  }

  const sessionInfo: SessionInfo = {
    ...result[0],
    expires: result[0].expires.toISOString()
  };
  if (result[0].expires.getTime() <= Date.now()) {
    await deleteSession(sessionId);
    return null;
  }

  return sessionInfo;
}
