import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import {
  SessionInfo,
  fetchSessionInfo,
  getSessionInfo,
} from "../utils/sessionInfo";

export type SessionInfoContextData = [
  SessionInfo | null,
  Dispatch<SetStateAction<SessionInfo | null>>
];

export const SessionInfoContext = createContext<SessionInfoContextData>([
  null,
  () => {},
]);

async function retrieveSessionInfo(
  setSessionInfo: Dispatch<SetStateAction<SessionInfo | null>>
) {
  const sessionInfoIngress = await fetchSessionInfo();
  if (sessionInfoIngress === null) return setSessionInfo(null);
  const sessionInfo = getSessionInfo(sessionInfoIngress);
  console.log(sessionInfo);
  return sessionInfo;
}

export function SessionInfoProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: SessionInfo | null
}) {
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(value);

  useEffect(() => {
    retrieveSessionInfo(setSessionInfo);
  }, [setSessionInfo]);

  return (
    <>
      <SessionInfoContext.Provider value={[sessionInfo, setSessionInfo]}>
        {children}
      </SessionInfoContext.Provider>
    </>
  );
}
