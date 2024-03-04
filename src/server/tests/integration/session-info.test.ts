import { afterAll, assert, beforeAll, expect, test } from "vitest";
import { Session, User } from "../../schema.js";
import { createUser, deleteUser } from "../../crud/users.js";
import {
  SessionInfo,
  createSession,
  deleteSession,
} from "../../crud/sessions.js";
import { describe } from "node:test";
import { default as request } from "supertest";
import { app } from "../../app.js";

let testUser: User | null = null;
let testSession: Session | null = null;

describe("session info endpoint", () => {
  beforeAll(async () => {
    testUser = await createUser("test", "user");
    testSession = await createSession(testUser?.id as string);
  });

  test("get session data", async () => {
    if (!testSession || !testUser) assert(false);

    // no session cookie
    await request(app).get("/api/session").expect(400);

    // incorrect session cookie
    await request(app)
      .get("/api/session")
      .set("Cookie", [`sessionId=ligma; Path=/; SameSite=strict;`])
      .expect(400);

    // with session cookie
    const result = await request(app)
      .get("/api/session")
      .set("Cookie", [`sessionId=${testSession.id}; Path=/; SameSite=strict;`])
      .expect(200);

    const expected: SessionInfo = {
      sessionId: testSession.id,
      expires: testSession.expires.toISOString(),
      username: testUser.username,
    };
    const sessionInfo: SessionInfo = result.body;

    expect(sessionInfo).toMatchObject(expected);
  });

  afterAll(async () => {
    if (testUser && testSession) {
      await deleteUser(testUser.id);
      await deleteSession(testSession.id);
    }
  });
});
