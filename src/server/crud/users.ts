import { eq } from "drizzle-orm";
import { db } from "../database.js";
import { User, users } from "../schema.js";
import { hashPassword } from "../authentication.js";
import { v4 as uuid4 } from "uuid";

export async function createUser(
  username: string,
  password: string
): Promise<User | null> {
  const passhash = await hashPassword(password);

  const id = uuid4();

  try {
    await db.insert(users).values({
      id,
      username,
      passhash,
    });
  } catch (error) {
    console.log(error);
    return null;
  }

  return {
    id,
    username,
    passhash,
  };
}

export async function deleteUser(userId: string): Promise<boolean> {
  try {
    await db.delete(users).where(eq(users.id, userId));
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
}
