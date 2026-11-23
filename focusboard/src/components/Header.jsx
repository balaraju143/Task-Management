import { Bell, UserCircle } from "lucide-react";

function Header() {
  return (
    <header className="header">
      <div>
        <h1>My Dashboard</h1>
        <p>Manage your tasks and stay productive.</p>
      </div>

      <div className="header-actions">
        <button aria-label="Notifications">
          <Bell size={20} />
        </button>

        <div className="profile">
          <UserCircle size={28} />
          <span>My Profile</span>
        </div>
      </div>
    </header>
  );
}

export default Header;