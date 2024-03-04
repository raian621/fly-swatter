import { afterAll, assert, beforeAll, describe, expect, test } from "vitest";
import { db, pgClient } from "../../database.js";
import { User, sessions, users } from "../../schema.js";
import { eq } from "drizzle-orm";
import { default as request } from "supertest";
import { app } from "../../app.js";
import { createSession } from "../../crud/sessions.js";
import { createUser } from "../../crud/users.js";

const TEST_USERNAME = "test_user";
const TEST_PASSWORD = "password";

describe("ensure logging in and logging out works", () => {
  let testUser: User | null = null;

  beforeAll(async () => {
    await createUser(TEST_USERNAME, TEST_PASSWORD);
    const result = await db
      .select()
      .from(users)
      .where(eq(users.username, TEST_USERNAME));
    if (result.length != 1) {
      console.error("could not find test user");
      assert(false);
    }

    testUser = result[0];
  });

  test("atomic login, session must be created", async () => {
    if (!testUser) assert(false);

    const response = await request(app)
      .post("/api/login")
      .send({
        username: TEST_USERNAME,
        password: TEST_PASSWORD,
      })
      .expect(200);

    // I don't know why, but response.get says it returns a string, but
    // actually returns a string array
    const cookies = <Array<string>>(<unknown>response.get("set-cookie"));
    const re = new RegExp(/sessionId=[\w-_]{43};/);
    assert(cookies.some((cookie) => re.test(cookie)));

    const result = await db
      .select({ id: sessions.id })
      .from(sessions)
      .where(eq(sessions.user_id, testUser.id));

    expect(result.length).toBe(1);
  });

  test("atomic logout", async () => {
    if (!testUser) assert(false);

    const testSession = await createSession(testUser.id);
    const response = await request
      .agent(app)
      .post("/api/logout")
      .set("Cookie", [`sessionId=${testSession.id}; Path=/; SameSite=strict;`])
      .send()
      .expect(200);

    expect(response.get("set-cookie")).toContain(
      "sessionId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );

    const result = await db
      .select({})
      .from(sessions)
      .where(eq(sessions.id, testSession.id));

    expect(result.length).toBe(0);
  });

  test("login and logout", () => {});

  test("atomic login incorrect credentials", () => {});

  afterAll(async () => {
    await db.delete(users).where(eq(users.username, TEST_USERNAME));
    pgClient.end();
  });
});
