import defaultPFP from '../assets/default_pfp.png'
import './UserDropdown.css'

export default function UserDropdown({ username }: { username: string }) {
  return (
    <div className="user-dropdown">
      <span>{username}</span>
      <button>
        <img src={defaultPFP} alt="profile image" />
      </button>
      <ul>
        <li>adsfsf</li>
        <li>adsfgsdfgdfsfsf</li>
        <li>adsfasdfasdsf</li>
        <li>adsfsf</li>
      </ul>
    </div>
  );
}
