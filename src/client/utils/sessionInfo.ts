export type SessionInfo = {
  sessionId: string;
  expires: Date;
  username: string;
};

// recieved over network (expired is an ISO 8601 string)
export type SessionInfoIngress = Omit<SessionInfo, "expires"> & {
  expires: string;
};

export function getSessionInfo(
  sessionInfoIngress: SessionInfoIngress
): SessionInfo {
  return {
    ...sessionInfoIngress,
    expires: new Date(sessionInfoIngress.expires)
  }
}

export async function fetchSessionInfo(): Promise<SessionInfoIngress|null> {
  const result = await fetch("/api/session");
  if (result.ok) {
    return await result.json();
  }

  return null;
}