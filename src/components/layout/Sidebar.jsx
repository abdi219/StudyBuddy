import { createContext, useContext } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard, GraduationCap, BookOpen, StickyNote,
  BarChart3, Library, CalendarDays, Timer, Home, Terminal,
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
  const { openCmd } = useContext(SidebarContext);

  const isActive = (path) => {
    if (path === "/gpa") return location.pathname === "/gpa" || location.pathname.startsWith("/gpa/");
    if (path === "/classroom") return location.pathname === "/classroom";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* ── BOTTOM NAV DOCK (Mac Style) ── */}
      <div style={{
        position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", zIndex: 40,
        height: 52, display: "flex", alignItems: "center",
        padding: "0 10px", gap: 6, borderRadius: 26,
        background: "rgba(255, 255, 255, 0.7)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.5)",
        backdropFilter: "blur(24px) saturate(180%)", WebkitBackdropFilter: "blur(24px) saturate(180%)",
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}>
        {/* Brand */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", marginRight: 6, flexShrink: 0 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "var(--text-primary)", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
          }}>
            <Library size={14} strokeWidth={2.4} />
          </div>
        </Link>

        {/* Separator */}
        <div style={{ width: 1, height: 24, background: "rgba(0,0,0,0.1)", borderRadius: 1 }} />

        {/* Nav Links */}
        <nav style={{
          display: "flex", alignItems: "center", gap: 4,
        }}>
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = isActive(to);
            return (
              <NavLink key={to} to={to} style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 38, height: 38, borderRadius: 14,
                color: active ? "#ffffff" : "var(--text-secondary)",
                background: active ? "var(--text-primary)" : "transparent",
                transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)", textDecoration: "none",
                position: "relative",
              }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.transform = "translateY(-4px) scale(1.1)";
                  if (!active) e.currentTarget.style.background = "rgba(0,0,0,0.05)";
                  const tooltip = e.currentTarget.querySelector('.dock-tooltip');
                  if(tooltip) { 
                    tooltip.style.opacity = "1"; 
                    tooltip.style.animation = "liquidDrop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards";
                  }
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.transform = "none";
                  if (!active) e.currentTarget.style.background = "transparent";
                  const tooltip = e.currentTarget.querySelector('.dock-tooltip');
                  if(tooltip) { 
                    tooltip.style.opacity = "0"; 
                    tooltip.style.animation = "none";
                  }
                }}
              >
                {/* Tooltip */}
                <div className="dock-tooltip" style={{
                  position: "absolute", top: -34, background: "var(--text-primary)", color: "#fff",
                  fontSize: 11, fontWeight: 700, padding: "4px 8px", borderRadius: 8,
                  pointerEvents: "none", whiteSpace: "nowrap", opacity: 0,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  fontFamily: "'Space Grotesk', sans-serif"
                }}>
                  {label}
                  <div style={{ position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)", borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "4px solid var(--text-primary)" }} />
                </div>

                <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                {active && (
                  <div style={{ position: "absolute", bottom: -6, width: 4, height: 4, borderRadius: "50%", background: "var(--text-primary)" }} />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Separator */}
        <div style={{ width: 1, height: 24, background: "rgba(0,0,0,0.1)", borderRadius: 1 }} />

        {/* ⌘K Command Button */}
        <button
          onClick={openCmd}
          title="Command Bar (Ctrl+K)"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 38, height: 38, borderRadius: 14,
            background: "transparent", border: "none", cursor: "pointer",
            color: "var(--text-secondary)",
            transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px) scale(1.1)";
            e.currentTarget.style.background = "rgba(91,91,214,0.1)";
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          <Terminal size={18} strokeWidth={2} />
          {/* Kbd badge */}
          <div style={{
            position: "absolute", top: -2, right: -2,
            background: "var(--text-primary)", color: "#fff",
            fontSize: 7, fontWeight: 800, fontFamily: "monospace",
            padding: "1px 3px", borderRadius: 4, lineHeight: 1.3
          }}>⌘K</div>
        </button>

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
