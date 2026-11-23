import { LayoutDashboard, CheckSquare, Settings } from "lucide-react";

function Sidebar({ activePage, onPageChange }) {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-logo">FocusBoard</h2>

      <nav className="sidebar-nav">
        <button
          className={activePage === "dashboard" ? "active" : ""}
          onClick={() => onPageChange("dashboard")}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button
          className={activePage === "tasks" ? "active" : ""}
          onClick={() => onPageChange("tasks")}
        >
          <CheckSquare size={20} />
          My Tasks
        </button>

        <button
          className={activePage === "settings" ? "active" : ""}
          onClick={() => onPageChange("settings")}
        >
          <Settings size={20} />
          Settings
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;