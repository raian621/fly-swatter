import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { SessionInfoContext } from "../context/SessionInfoContext";

export default function useAuthentication() {
  const [sessionInfo] = useContext(SessionInfoContext);
  const navigate = useNavigate();
  
   if (!sessionInfo) {
    navigate("/login");
  }
}