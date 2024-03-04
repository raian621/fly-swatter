import { Request } from "express";

export function getCookie(
  name: string,
  cookieString: string
): string | null {
  const cookies = cookieString.split(";");
  let cookie = undefined;

  cookies.find((kvPair) => {
    const [key, value] = kvPair.split("=");
    if (key.trim() === name) {
      cookie = value;
      return;
    }
  });

  return cookie || null;
}

export function getSessionId(res: Request): string | null {
  const { headers: { cookie }} = res;
  if (!cookie) return null;

  return getCookie("sessionId", cookie);
}
