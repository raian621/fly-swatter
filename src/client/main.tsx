import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { fetchSessionInfo, getSessionInfo } from "./utils/sessionInfo";

const sessionInfoIngress = await fetchSessionInfo();
const sessionInfo = sessionInfoIngress ? getSessionInfo(sessionInfoIngress) : null;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App sessionInfo={sessionInfo}/>
  </React.StrictMode>,
);
