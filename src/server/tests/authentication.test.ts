import { test } from "vitest";
import { assert } from "console";
import { hashPassword, verifyPassword } from "../authentication.js";

test('password hashing', async() => {
  const password = "password"
  const passhash = await hashPassword(password)
  assert(await verifyPassword(password, passhash))
})
