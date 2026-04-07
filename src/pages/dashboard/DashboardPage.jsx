import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Clock,
  Activity,
  TrendingUp,
  ArrowRight,
  BookOpen,
  Calculator,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    title: "Current GPA",
    value: "3.45",
    sub: "4.0 Scale",
    icon: GraduationCap,
    accent: "var(--accent)",
    accentSoft: "var(--accent-soft)",
  },
  {
    title: "Study Time",
    value: "12.5h",
    sub: "This week",
    icon: Clock,
    accent: "var(--success)",
    accentSoft: "var(--success-soft)",
  },
  {
    title: "Sessions",
    value: "8",
    sub: "Last 7 days",
    icon: Activity,
    accent: "var(--warning)",
    accentSoft: "var(--warning-soft)",
  },
  {
    title: "Improvement",
    value: "+0.12",
    sub: "vs. last semester",
    icon: TrendingUp,
    accent: "var(--danger)",
    accentSoft: "var(--danger-soft)",
  },
];

const actions = [
  {
    title: "Start Study Session",
    desc: "Open your classroom workspace",
    icon: BookOpen,
    to: "/classroom",
  },
  {
    title: "Calculate GPA",
    desc: "Multi-scale GPA calculator",
    icon: Calculator,
    to: "/gpa/calculate",
  },
  {
    title: "View Analytics",
    desc: "Track your progress over time",
    icon: Sparkles,
    to: "/analytics",
  },
];

const activityList = [
  {
    action: "Calculated SGPA",
    detail: "4.0 Scale — Result: 3.67",
    time: "2 hours ago",
  },
  {
    action: "Study Session",
    detail: "Data Structures — 45 min",
    time: "Yesterday",
  },
  {
    action: "Notes Updated",
    detail: "OOP Concepts — Added 3 new entries",
    time: "2 days ago",
  },
  {
    action: "GPA Updated",
    detail: "Semester 3 — 3.45 CGPA",
    time: "1 week ago",
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 960, display: "flex", flexDirection: "column", gap: 28 }} className="fade-enter">

      {/* ── Header ── */}
      <div>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "var(--text-primary)",
            fontFamily: "'Space Grotesk', sans-serif",
            marginBottom: 6,
          }}
        >
          Dashboard
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
          Welcome back. Your semester snapshot is ready.
        </p>
      </div>

      {/* ── Stats Grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
        }}
        className="stagger"
      >
        {stats.map((s) => (
          <div
            key={s.title}
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: 24,
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
              cursor: "default",
            }}
            className="surface-lift"
          >
            {/* Left accent bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 4,
                height: "100%",
                background: s.accent,
                borderRadius: "0 4px 4px 0",
                opacity: 0.6,
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--text-muted)",
                }}
              >
                {s.title}
              </p>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "var(--radius-sm)",
                  background: s.accentSoft,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: s.accent,
                  flexShrink: 0,
                }}
              >
                <s.icon size={16} strokeWidth={1.8} />
              </div>
            </div>
            <p
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "var(--text-primary)",
                fontFamily: "'Space Grotesk', sans-serif",
                lineHeight: 1,
              }}
            >
              {s.value}
            </p>
            <p
              style={{
                fontSize: 12,
                color: "var(--text-faint)",
                marginTop: 6,
              }}
            >
              {s.sub}
            </p>
          </div>
        ))}
      </div>

      {/* ── Quick Actions ── */}
      <div>
        <h2
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "var(--text-muted)",
            marginBottom: 14,
          }}
        >
          Quick Actions
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 14,
          }}
        >
          {actions.map((a) => (
            <div
              key={a.title}
              onClick={() => navigate(a.to)}
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: 20,
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
              className="card-interactive"
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "var(--radius-md)",
                  background: "var(--accent-soft)",
                  border: "1.5px solid var(--border-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent)",
                  flexShrink: 0,
                  transition: "all 0.25s ease",
                }}
              >
                <a.icon size={18} strokeWidth={1.8} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginBottom: 3,
                  }}
                >
                  {a.title}
                </h3>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--text-muted)",
                  }}
                >
                  {a.desc}
                </p>
              </div>
              <ArrowRight
                size={14}
                style={{
                  color: "var(--text-faint)",
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Recent Activity ── */}
      <div>
        <h2
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "var(--text-muted)",
            marginBottom: 14,
          }}
        >
          Recent Activity
        </h2>
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          }}
        >
          {activityList.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 24px",
                borderBottom:
                  i < activityList.length - 1
                    ? "1px solid var(--border-light)"
                    : "none",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--bg-elevated)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginBottom: 3,
                  }}
                >
                  {item.action}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--text-muted)",
                  }}
                >
                  {item.detail}
                </p>
              </div>
              <span
                style={{
                  fontSize: 12,
                  color: "var(--text-faint)",
                  whiteSpace: "nowrap",
                  marginLeft: 16,
                  flexShrink: 0,
                }}
              >
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
