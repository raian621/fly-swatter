import { SyntheticEvent, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionInfoContext } from "../context/SessionInfoContext";
import { fetchSessionInfo, getSessionInfo } from "../utils/sessionInfo";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { TextField, useTheme } from "@mui/material";

export default function Login() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [credsValid, setCredsValid] = useState(true);
  const [_, setSessionInfo] = useContext(SessionInfoContext);
  const { palette: { background }} = useTheme()

  const handleSubmit = () => {
    return async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();

      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      try {
        let res = await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const sessionInfoIngress = await fetchSessionInfo();
          if (sessionInfoIngress) {
            setSessionInfo(getSessionInfo(sessionInfoIngress));
            console.log("navigating to home");
            navigate("/");
          }
        } else {
          setCredsValid(false);
        }
      } catch (error) {
        console.error(error);
        setCredsValid(false);
      }
    };
  };

  return (
    <Box
      sx={{
        bgcolor: background.paper,
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          component="form"
          elevation={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            p: 4,
          }}
          onSubmit={handleSubmit()}
        >
          <Typography typography="h3">Log in to FlySwatter</Typography>
          <TextField
            id="username"
            variant="standard"
            label="Username"
            inputRef={usernameRef}
          ></TextField>
          <TextField
            id="password"
            type="password"
            variant="standard"
            label="Password"
            inputRef={passwordRef}
          ></TextField>
          <Button
            aria-describedby="submit button for login form"
            type="submit"
            variant="contained"
          >
            Log in
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
