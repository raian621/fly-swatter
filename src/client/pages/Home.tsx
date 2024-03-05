import { useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import { SessionInfoContext } from "../context/SessionInfoContext"
import LayoutWithHeader from "../LayoutWithHeader";

export default function Home() {
  const [ sessionInfo ] = useContext(SessionInfoContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (!sessionInfo) {
      navigate("/login");
    }
  }, [sessionInfo]);

  return (
    <>
      <LayoutWithHeader>
        <section>
          <h1>Home</h1>
        </section>
      </LayoutWithHeader>
    </>
  );
}