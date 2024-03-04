import express from "express";
import { validCredentials } from "./authentication.js";
import { createSession, deleteSession, getSessionInfo } from "./crud/sessions.js";
import { getUserId } from "./database.js";
import { getCookie, getSessionId } from "./utils/getCookie.js";

const app = express();
const apiRouter = express.Router();

apiRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const credentialsValid = await validCredentials(username, password);

  if (!credentialsValid) {
    res.status(400).end("incorrect credentials");
    return;
  }

  const userId = await getUserId(username) as string
  const newSession = await createSession(userId)
  const { id: sessionId } = newSession;

  res
    .cookie("sessionId", sessionId, {
      sameSite: true,
      httpOnly: true
    })
    .status(200)
    .end("ok");
});

apiRouter.post("/logout", async (req, res) => {
  const { headers: { cookie } } = req;
  if (!cookie) {
    res.status(400).end();
    return;
  } 

  const sessionId = getCookie('sessionId', cookie);
  if (!sessionId) {
    res.status(400).end();
    return;
  }
  
  await deleteSession(sessionId)
  res.status(200).clearCookie('sessionId').end()
})

apiRouter.get("/session", async (req, res) => {
  const sessionId = getSessionId(req)
  if (!sessionId) {
    res.status(400).end()
    return;
  }
  const sessionInfo = await getSessionInfo(sessionId)
  console.log(sessionInfo)
  if (!sessionInfo) {
    res.status(400).end();
    return;
  }

  res.status(200).json(sessionInfo).end()
})

app.use(express.json());
app.use("/api", apiRouter);

export { app };
