import { expect, test } from "vitest";
import getCookie from "../utils/getCookie";
import { describe } from "node:test";

describe("extracting a cookie from cookies string", () => {
  test("cookie exists", () => {
    const cookieVal = getCookie(
      "sessionId",
      "ligma=a3f389123; sessionId=201231"
    );
    expect(cookieVal).toBe("201231");
  });

  test("cookie does not exist", () => {
    const cookieVal = getCookie("cat", "ligma=a3f389123; sessionId=201231");
    expect(cookieVal).toBeNull();
  });

  test("empty cookie string", () => {
    const cookieVal = getCookie("cat", "");
    expect(cookieVal).toBeNull();
  });
});
