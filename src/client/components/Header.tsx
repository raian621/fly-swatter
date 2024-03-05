import { useContext } from "react"
import { SessionInfoContext } from "../context/SessionInfoContext"
import UserDropdown from "./UserDropdown"

export function Header() {
  const [ sessionInfo, _ ] = useContext(SessionInfoContext)

  return (
    <nav>
      <li>
        <h1>Fly Swatter</h1>
        { sessionInfo?.username && <UserDropdown username={sessionInfo.username}/>}
      </li>
    </nav>
  )
}