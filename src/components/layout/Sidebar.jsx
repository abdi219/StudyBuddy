import { createContext, useContext } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard, GraduationCap, BookOpen, StickyNote,
  BarChart3, Library, CalendarDays, Timer, Home,
} from "lucide-react";

export const SidebarContext = createContext({ collapsed: false, setCollapsed: () => {} });
export function useSidebar() { return useContext(SidebarContext); }

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { to: "/gpa", icon: GraduationCap, label: "GPA" },
  { to: "/classroom", icon: BookOpen, label: "Class" },
  { to: "/notes", icon: StickyNote, label: "Notes" },
  { to: "/planner", icon: CalendarDays, label: "Plan" },
  { to: "/pomodoro", icon: Timer, label: "Focus" },
  { to: "/analytics", icon: BarChart3, label: "Stats" },
];

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/gpa") return location.pathname === "/gpa" || location.pathname.startsWith("/gpa/");
    if (path === "/classroom") return location.pathname === "/classroom";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* ── TOP NAV BAR ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
        height: 56, display: "flex", alignItems: "center",
        padding: "0 24px", gap: 16,
        background: "rgba(255, 255, 255, 0.92)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      }}>
        {/* Brand */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", marginRight: 8, flexShrink: 0 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: "var(--text-primary)", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Library size={14} strokeWidth={2.4} />
          </div>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: 14, color: "var(--text-primary)", whiteSpace: "nowrap",
          }}>Abdi's Library</span>
        </Link>

        {/* Nav Links - centered */}
        <nav style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 2,
        }}>
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = isActive(to);
            return (
              <NavLink key={to} to={to} style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "7px 14px", borderRadius: 10,
                fontSize: 12, fontWeight: active ? 600 : 500,
                color: active ? "var(--text-primary)" : "var(--text-muted)",
                background: active ? "var(--bg-elevated)" : "transparent",
                transition: "all 0.2s ease", textDecoration: "none",
                whiteSpace: "nowrap",
              }}
                onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = "var(--bg-elevated)"; e.currentTarget.style.color = "var(--text-secondary)"; }}}
                onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-muted)"; }}}
              >
                <Icon size={15} strokeWidth={active ? 2 : 1.6} />
                <span>{label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Profile */}
        <div style={{
          width: 32, height: 32, borderRadius: "50%", overflow: "hidden",
          border: "1.5px solid var(--border)", flexShrink: 0, cursor: "pointer",
        }}>
          <img src="/abdi.jpg" alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </header>
    </>
  );
}
