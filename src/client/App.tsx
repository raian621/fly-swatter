import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Login, NotFound } from "./pages";
import { SessionInfoProvider } from "./context/SessionInfoContext";
import { SessionInfo } from "./utils/sessionInfo";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { useMemo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { blue } from "@mui/material/colors";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: blue[900],
    },
    secondary: {
      main: blue[700],
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: "#111122",
    },
    text: {
      primary: "#ffffff",
    },
    primary: {
      main: blue[100],
    },
    secondary: {
      main: blue[400],
    },
  },
});

function App({ sessionInfo }: { sessionInfo: SessionInfo | null }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(() => {
    let mode: string | null = sessionStorage.getItem("themeMode");
    if (mode === null) {
      mode = prefersDarkMode ? "dark" : "light";
      sessionStorage.setItem("themeMode", mode);
    }

    switch (mode) {
      case "dark":
        return darkTheme;
      case "light":
        return lightTheme;
      default:
        return lightTheme;
    }
  }, [prefersDarkMode]);

  return (
    <>
      <CssBaseline enableColorScheme />
      <BrowserRouter>
        <SessionInfoProvider value={sessionInfo}>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/">
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ThemeProvider>
        </SessionInfoProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
