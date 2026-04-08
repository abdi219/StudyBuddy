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
      {/* ── BOTTOM NAV DOCK (Mac Style) ── */}
      <div style={{
        position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 40,
        height: 64, display: "flex", alignItems: "center",
        padding: "0 16px", gap: 12, borderRadius: 32,
        background: "rgba(255, 255, 255, 0.7)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.5)",
        backdropFilter: "blur(24px) saturate(180%)", WebkitBackdropFilter: "blur(24px) saturate(180%)",
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}>
        {/* Brand */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", marginRight: 8, flexShrink: 0 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "var(--text-primary)", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
          }}>
            <Library size={16} strokeWidth={2.4} />
          </div>
        </Link>

        {/* Separator */}
        <div style={{ width: 1, height: 28, background: "rgba(0,0,0,0.1)", borderRadius: 1 }} />

        {/* Nav Links */}
        <nav style={{
          display: "flex", alignItems: "center", gap: 6,
        }}>
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = isActive(to);
            return (
              <NavLink key={to} to={to} style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 44, height: 44, borderRadius: 18,
                color: active ? "#ffffff" : "var(--text-secondary)",
                background: active ? "var(--text-primary)" : "transparent",
                transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)", textDecoration: "none",
                position: "relative",
              }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.transform = "translateY(-6px) scale(1.15)";
                  if (!active) e.currentTarget.style.background = "rgba(0,0,0,0.05)";
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.transform = "none";
                  if (!active) e.currentTarget.style.background = "transparent";
                }}
                title={label}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                {active && (
                  <div style={{ position: "absolute", bottom: -6, width: 4, height: 4, borderRadius: "50%", background: "var(--text-primary)" }} />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Separator */}
        <div style={{ width: 1, height: 28, background: "rgba(0,0,0,0.1)", borderRadius: 1 }} />

        {/* Profile */}
        <div style={{
          width: 38, height: 38, borderRadius: "50%", overflow: "hidden",
          border: "2px solid #fff", flexShrink: 0, cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)", transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)"
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px) scale(1.1)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
        >
          <img src="/abdi.jpg" alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
    </>
  );
}
