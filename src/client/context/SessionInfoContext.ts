import { Dispatch, SetStateAction, createContext } from "react";
import { SessionInfo } from "../utils/sessionInfo";

export type SessionInfoContextData = [
  SessionInfo | null,
  Dispatch<SetStateAction<SessionInfo | null>>
];

export const SessionInfoContext = createContext<SessionInfoContextData>([
  null,
  () => {},
]);
