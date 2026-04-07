import { createContext, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  StickyNote,
  BarChart3,
  PanelLeftClose,
  PanelLeft,
  Library,
} from "lucide-react";

export const SidebarContext = createContext({
  collapsed: false,
  setCollapsed: () => {},
});

export function useSidebar() {
  return useContext(SidebarContext);
}

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/gpa", icon: GraduationCap, label: "GPA" },
  { to: "/classroom", icon: BookOpen, label: "Classroom" },
  { to: "/notes", icon: StickyNote, label: "Notes" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
];

export default function Sidebar() {
  const { collapsed, setCollapsed } = useSidebar();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/gpa")
      return location.pathname === "/gpa" || location.pathname.startsWith("/gpa/");
    if (path === "/classroom") return location.pathname === "/classroom";
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      style={{
        width: collapsed ? 68 : 240,
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s ease",
        background: "var(--bg-surface)",
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* ── Brand ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "0 16px",
          height: 64,
          borderBottom: "1px solid var(--border-light)",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "var(--radius-sm)",
            background: "var(--accent)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Library size={16} strokeWidth={2.2} />
        </div>
        {!collapsed && (
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              color: "var(--text-primary)",
              whiteSpace: "nowrap",
            }}
          >
            Abdi's Library
          </span>
        )}
      </div>

      {/* ── Navigation ── */}
      <nav
        style={{
          flex: 1,
          padding: "12px 10px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          overflowY: "auto",
        }}
      >
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = isActive(to);
          return (
            <NavLink
              key={to}
              to={to}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 14px",
                borderRadius: "var(--radius-md)",
                fontSize: 13,
                fontWeight: active ? 600 : 500,
                color: active ? "#ffffff" : "var(--text-secondary)",
                background: active ? "var(--accent)" : "transparent",
                boxShadow: active ? "0 4px 12px rgba(91, 91, 214, 0.25)" : "none",
                transition: "all 0.2s ease",
                textDecoration: "none",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "var(--bg-elevated)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }
              }}
            >
              {active && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 3,
                    height: 16,
                    background: "#f5c542",
                    borderRadius: "0 4px 4px 0",
                  }}
                />
              )}
              <Icon
                size={18}
                strokeWidth={active ? 2 : 1.6}
                style={{ flexShrink: 0 }}
              />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* ── Toggle ── */}
      <div style={{ padding: "12px 10px", flexShrink: 0 }}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "10px 14px",
            borderRadius: "var(--radius-md)",
            fontSize: 12,
            fontWeight: 500,
            color: "var(--text-muted)",
            background: "none",
            border: "1px solid var(--border-light)",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--bg-elevated)";
            e.currentTarget.style.color = "var(--text-secondary)";
            e.currentTarget.style.borderColor = "var(--border)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "none";
            e.currentTarget.style.color = "var(--text-muted)";
            e.currentTarget.style.borderColor = "var(--border-light)";
          }}
        >
          {collapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
