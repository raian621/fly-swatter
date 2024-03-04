import "./App.css";

import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Home, Login, NotFound } from "./pages";
import { SessionInfoContext } from "./context/SessionInfoContext";
import { useEffect, useState } from "react";
import {
  SessionInfo,
  fetchSessionInfo,
  getSessionInfo,
} from "./utils/sessionInfo";
import { Header } from "./components/Header";

function App({ sessionInfo } : { sessionInfo: SessionInfo|null}) {
  const [_sessionInfo, setSessionInfo] = useState<SessionInfo | null>(
    sessionInfo
  );

  useEffect(() => {
    const _getSessionInfo = async () => {
      const _sessionInfoIngress = await fetchSessionInfo();
      if (_sessionInfoIngress) {
        const _sessionInfo = getSessionInfo(_sessionInfoIngress);
        setSessionInfo(_sessionInfo);
      }
    };
    _getSessionInfo();
  }, [sessionInfo, setSessionInfo]);

  return (
    <BrowserRouter>
      <SessionInfoContext.Provider value={[sessionInfo, setSessionInfo]}>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SessionInfoContext.Provider>
    </BrowserRouter>
  );
}

export default App;
