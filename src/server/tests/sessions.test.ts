import {
  afterAll,
  afterEach,
  assert,
  beforeAll,
  describe,
  expect,
  test,
} from "vitest";
import {
  SessionInfo,
  createSession,
  generateSessionIdString,
  getSession,
  getSessionInfo,
} from "../crud/sessions.js";
import { User, sessions } from "../schema.js";
import { createUser, deleteUser } from "../crud/users.js";
import { eq } from "drizzle-orm";
import { db } from "../database.js";

test("generate a session id", async () => {
  const uniqueSID = async (_: string) => true;

  const sessionId = await generateSessionIdString(uniqueSID);
  expect(sessionId.length).toBe(43);
});

test("generate a sessionId, encountering id collisions", async () => {
  let collisions = 3;
  const uniqueSID = async (sid: string) => {
    console.log(sid);
    expect(sid.length).toBe(43);
    return --collisions === 0;
  };

  const sessionId = await generateSessionIdString(uniqueSID);
  expect(sessionId.length).toBe(43);
});

describe("session create, delete, and read", () => {
  let testUser: User | null = null;

  beforeAll(async () => {
    testUser = await createUser("test", "user");
  });

  afterAll(async () => {
    if (testUser) await deleteUser(testUser.id);
  });

  afterEach(async () => {
    if (testUser) {
      await db.delete(sessions).where(eq(sessions.user_id, testUser.id));
    }
  });

  test("get session", async () => {
    if (testUser === null) assert(false);

    const session = await createSession(testUser.id);
    const sessionStored = await getSession(session.id);

    expect(sessionStored).toMatchObject(session);
  });

  test("get session info", async () => {
    if (testUser === null) assert(false);

    const session = await createSession(testUser.id);
    const expected: SessionInfo = {
      sessionId: session.id,
      expires: session.expires.toISOString(),
      username: testUser.username,
    };

    const sessionInfo = await getSessionInfo(session.id);
    expect(sessionInfo).toMatchObject(expected);
  });

  test("delete session", async () => {
    if (testUser === null) assert(false);

    const session = await createSession(testUser.id);
    await db.delete(sessions).where(eq(sessions.id, session.id));

    const results = await db
      .select({})
      .from(sessions)
      .where(eq(sessions.id, session.id));

    expect(results.length).toBe(0);
  });
});
