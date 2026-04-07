import { createContext, useContext, useState } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard, GraduationCap, BookOpen, StickyNote,
  BarChart3, Library, CalendarDays, Timer, Home,
  ChevronLeft, ChevronRight, Search, Settings,
} from "lucide-react";

export const SidebarContext = createContext({ collapsed: false, setCollapsed: () => {} });
export function useSidebar() { return useContext(SidebarContext); }

const navGroups = [
  {
    label: "Main",
    items: [
      { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/classroom", icon: BookOpen, label: "Classroom" },
    ],
  },
  {
    label: "Academics",
    items: [
      { to: "/gpa", icon: GraduationCap, label: "GPA" },
      { to: "/notes", icon: StickyNote, label: "Notes" },
      { to: "/analytics", icon: BarChart3, label: "Analytics" },
    ],
  },
  {
    label: "Productivity",
    items: [
      { to: "/planner", icon: CalendarDays, label: "Planner" },
      { to: "/pomodoro", icon: Timer, label: "Pomodoro" },
    ],
  },
];

export default function Sidebar() {
  const { collapsed, setCollapsed } = useSidebar();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/gpa") return location.pathname === "/gpa" || location.pathname.startsWith("/gpa/");
    if (path === "/classroom") return location.pathname === "/classroom";
    return location.pathname.startsWith(path);
  };

  return (
    <aside style={{
      width: collapsed ? 64 : 220,
      position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 40,
      display: "flex", flexDirection: "column",
      transition: "width 0.3s ease",
      background: "#ffffff",
      borderRight: "1px solid var(--border)",
    }}>
      {/* Brand */}
      <div style={{
        display: "flex", alignItems: "center",
        padding: collapsed ? "0 0 0 16px" : "0 16px",
        height: 60, flexShrink: 0, overflow: "hidden",
        justifyContent: collapsed ? "center" : "flex-start",
        gap: 10,
      }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "var(--text-primary)", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <Library size={14} strokeWidth={2.4} />
          </div>
          {!collapsed && (
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: "var(--text-primary)", whiteSpace: "nowrap" }}>
              Abdi's Library
            </span>
          )}
        </Link>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "var(--border-light)", margin: "0 12px" }} />

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
        {navGroups.map((group) => (
          <div key={group.label} style={{ marginBottom: 16 }}>
            {!collapsed && (
              <p style={{
                fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.08em", color: "var(--text-faint)",
                padding: "0 10px", marginBottom: 6,
              }}>{group.label}</p>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {group.items.map(({ to, icon: Icon, label }) => {
                const active = isActive(to);
                return (
                  <NavLink key={to} to={to} style={{
                    display: "flex", alignItems: "center",
                    gap: 10, padding: collapsed ? "9px 0" : "9px 12px",
                    justifyContent: collapsed ? "center" : "flex-start",
                    borderRadius: 10, fontSize: 13, fontWeight: active ? 600 : 500,
                    color: active ? "var(--text-primary)" : "var(--text-muted)",
                    background: active ? "var(--bg-elevated)" : "transparent",
                    transition: "all 0.2s ease", textDecoration: "none",
                    position: "relative",
                  }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = "var(--bg-elevated)";
                        e.currentTarget.style.color = "var(--text-secondary)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "var(--text-muted)";
                      }
                    }}
                  >
                    {active && (
                      <div style={{
                        position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
                        width: 3, height: 18, background: "var(--text-primary)", borderRadius: "0 3px 3px 0",
                      }} />
                    )}
                    <Icon size={17} strokeWidth={active ? 2 : 1.6} style={{ flexShrink: 0 }} />
                    {!collapsed && <span>{label}</span>}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Profile + Toggle */}
      <div style={{ padding: "10px 8px", flexShrink: 0 }}>
        {!collapsed && (
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px", marginBottom: 8,
            borderRadius: 10, background: "var(--bg-elevated)",
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: "50%", overflow: "hidden",
              border: "1.5px solid var(--border)", flexShrink: 0,
            }}>
              <img src="/abdi.jpg" alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Abdullah</p>
              <p style={{ fontSize: 10, color: "var(--text-faint)" }}>Student</p>
            </div>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
          padding: "8px", borderRadius: 8, fontSize: 12, color: "var(--text-faint)",
          background: "none", border: "1px solid var(--border-light)", cursor: "pointer",
          transition: "all 0.2s ease",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-elevated)"; e.currentTarget.style.color = "var(--text-muted)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--text-faint)"; }}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>
    </aside>
  );
}
