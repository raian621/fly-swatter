import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Login, NotFound } from "./pages";
import { SessionInfoProvider } from "./context/SessionInfoContext";
import { SessionInfo } from "./utils/sessionInfo";

function App({ sessionInfo }: { sessionInfo: SessionInfo | null }) {
  return (
    <BrowserRouter>
      <SessionInfoProvider value={sessionInfo}>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SessionInfoProvider>
    </BrowserRouter>
  );
}

export default App;
