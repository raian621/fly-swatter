import { SyntheticEvent, useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorWidget from "../components/ErrorWidget";
import { SessionInfoContext } from "../context/SessionInfoContext";
import { fetchSessionInfo, getSessionInfo } from "../utils/sessionInfo";

export default function Login() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [credsValid, setCredsValid] = useState(true);
  const [_, setSessionInfo] = useContext(SessionInfoContext)

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
            setSessionInfo(getSessionInfo(sessionInfoIngress))
            console.log("navigating to home")
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
    <div className="flex-col-padding">
      <ErrorWidget
        message="Incorrect username or password"
        hidden={credsValid}
        setHidden={setCredsValid}
      />
      <form onSubmit={handleSubmit()}>
        <h2>Login</h2>
        <label htmlFor="username">Username</label>
        <input name="username" type="text" ref={usernameRef} />
        <label htmlFor="password">Password</label>
        <input name="password" type="password" ref={passwordRef} />
        <input type="submit" value="Log in" />
        <span>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </span>
      </form>
    </div>
  );
}
