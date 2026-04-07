import { useLocation, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const labels = {
  dashboard: "Dashboard",
  gpa: "GPA",
  calculate: "Calculator",
  relative: "Relative Grading",
  classroom: "Classroom",
  notes: "Notes",
  analytics: "Analytics",
};

export default function TopBar() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <header
      style={{
        height: 64,
        background: "rgba(250, 249, 246, 0.92)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        flexShrink: 0,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* ── Breadcrumb ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 14,
          }}
        >
          {segments.map((seg, i) => {
            const path = "/" + segments.slice(0, i + 1).join("/");
            const isLast = i === segments.length - 1;
            const label = labels[seg] || seg;
            return (
              <span key={path} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {i > 0 && (
                  <ChevronRight size={13} style={{ color: "var(--text-faint)" }} />
                )}
                {isLast ? (
                  <span
                    style={{
                      color: "var(--text-primary)",
                      fontWeight: 600,
                    }}
                  >
                    {label}
                  </span>
                ) : (
                  <Link
                    to={path}
                    style={{
                      color: "var(--text-muted)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    {label}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>

        {/* Doodle chips */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="doodle-chip">quiz planner</span>
          <span className="doodle-chip">exam mode</span>
        </div>
      </div>

      {/* ── Profile Avatar ── */}
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid var(--border-accent)",
          cursor: "pointer",
          transition: "all 0.2s ease",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--accent)";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border-accent)";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <img
          src="/abdi.jpg"
          alt="Profile"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </header>
  );
}
