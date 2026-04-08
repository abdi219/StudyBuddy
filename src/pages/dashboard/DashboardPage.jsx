import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap, Clock, Activity, TrendingUp, ArrowRight,
  BookOpen, Calculator, CalendarDays, Timer,
  Target, PenTool, Zap, Lightbulb,
} from "lucide-react";
import StudentDoodles from "../../components/ui/StudentDoodles";

const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
};

const tips = [
  "Try the Pomodoro technique: 25 min focus, 5 min break!",
  "Review your notes within 24 hours — it boosts retention by 60%!",
  "Break complex topics into smaller chunks for better understanding.",
  "Stay hydrated! Your brain works better with enough water.",
  "Use active recall instead of passive reading for better results.",
];

const quickActions = [
  { title: "Study Session", desc: "Open interactive classroom", icon: BookOpen, to: "/classroom" },
  { title: "Calculate GPA", desc: "Multi-scale calculator", icon: Calculator, to: "/gpa/calculate" },
  { title: "Study Planner", desc: "Plan your week", icon: CalendarDays, to: "/planner" },
  { title: "Focus Timer", desc: "Pomodoro sessions", icon: Timer, to: "/pomodoro" },
  { title: "Analytics", desc: "Track progress", icon: Target, to: "/analytics" },
  { title: "Take Notes", desc: "Quick note capture", icon: PenTool, to: "/notes" },
];

const stats = [
  { title: "Current GPA", value: "3.45", sub: "4.0 Scale", icon: GraduationCap },
  { title: "Study Time", value: "12.5h", sub: "This week", icon: Clock },
  { title: "Sessions", value: "8", sub: "Last 7 days", icon: Activity },
  { title: "Improvement", value: "+0.12", sub: "vs. last semester", icon: TrendingUp },
];

const activityList = [
  { action: "Calculated SGPA", detail: "4.0 Scale — Result: 3.67", time: "2 hours ago" },
  { action: "Study Session", detail: "Data Structures — 45 min", time: "Yesterday" },
  { action: "Notes Updated", detail: "OOP Concepts — Added 3 new entries", time: "2 days ago" },
  { action: "GPA Updated", detail: "Semester 3 — 3.45 CGPA", time: "1 week ago" },
];

/* Realistic Sticky Note */
function StickyNote({ children, rotation = 0 }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        background: "#fffde7",
        borderRadius: "2px 2px 2px 2px",
        padding: "22px 20px 18px",
        position: "relative",
        boxShadow: hovered
          ? "2px 4px 16px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)"
          : "1px 2px 8px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)",
        transform: hovered
          ? `rotate(${rotation * 0.2}deg) translateY(-3px)`
          : `rotate(${rotation}deg)`,
        transition: "all 0.3s ease",
        cursor: "default",
        /* Realistic fold shadow at bottom */
        backgroundImage: "linear-gradient(180deg, transparent 85%, rgba(0,0,0,0.03) 100%)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tape */}
      <div style={{
        position: "absolute", top: -7, left: "50%", transform: "translateX(-50%) rotate(-1deg)",
        width: 44, height: 14,
        background: "rgba(200,200,180,0.5)",
        borderRadius: 1,
        backdropFilter: "blur(1px)",
      }} />
      {/* Subtle corner fold */}
      <div style={{
        position: "absolute", bottom: 0, right: 0, width: 20, height: 20,
        background: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.04) 50%)",
        borderRadius: "0 0 2px 0",
      }} />
      {children}
    </div>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const tipOfDay = tips[new Date().getDate() % tips.length];

  return (
    <div style={{ maxWidth: 960, position: "relative" }} className="fade-enter">
      <StudentDoodles count={14} opacity={0.15} seed={33} color="var(--text-primary)" />

      <div style={{ display: "flex", flexDirection: "column", gap: 24, position: "relative", zIndex: 1 }}>

        {/* Greeting */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 16,
        }}>
          <div>
            <h1 style={{
              fontSize: 26, fontWeight: 800, color: "var(--text-primary)",
              fontFamily: "'Space Grotesk', sans-serif", marginBottom: 4,
            }}>
              {greeting()}, Abdullah
            </h1>
            <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
              Here's your academic snapshot for today.
            </p>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "8px 16px", borderRadius: "var(--radius-full)",
            border: "1.5px dashed var(--border)",
            background: "var(--bg-surface)",
          }}>
            <Zap size={16} style={{ color: "var(--text-primary)" }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>5 day streak</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{
          background: "var(--bg-elevated)", border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-md)", padding: "12px 18px",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <Lightbulb size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
          <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            <strong style={{ color: "var(--text-primary)" }}>Tip:</strong> {tipOfDay}
          </p>
        </div>

        {/* Stats — Realistic Sticky Notes */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 20, padding: "10px 0",
        }}>
          {stats.map((s, i) => (
            <StickyNote key={s.title} rotation={[1.2, -0.8, 0.6, -1.0][i]}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#999" }}>
                  {s.title}
                </p>
                <s.icon size={16} style={{ color: "#bbb" }} />
              </div>
              <p style={{
                fontSize: 28, fontWeight: 800, color: "var(--text-primary)",
                fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1,
              }}>{s.value}</p>
              <p style={{ fontSize: 11, color: "#aaa", marginTop: 5 }}>{s.sub}</p>
            </StickyNote>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 style={{
            fontSize: 11, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.06em", color: "var(--text-faint)", marginBottom: 12,
          }}>Quick Actions</h2>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10,
          }}>
            {quickActions.map((a) => (
              <div key={a.title} onClick={() => navigate(a.to)} style={{
                background: "var(--bg-surface)", border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)", padding: "16px 18px",
                cursor: "pointer", transition: "all 0.25s ease",
                display: "flex", alignItems: "center", gap: 12,
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-md)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: "var(--bg-elevated)", border: "1px solid var(--border-light)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--text-primary)", flexShrink: 0,
                }}>
                  <a.icon size={16} strokeWidth={1.8} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>{a.title}</h3>
                  <p style={{ fontSize: 11, color: "var(--text-muted)" }}>{a.desc}</p>
                </div>
                <ArrowRight size={13} style={{ color: "var(--text-faint)", flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 style={{
            fontSize: 11, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.06em", color: "var(--text-faint)", marginBottom: 12,
          }}>Recent Activity</h2>
          <div style={{
            background: "var(--bg-surface)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)", overflow: "hidden",
          }}>
            {activityList.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 20px",
                borderBottom: i < activityList.length - 1 ? "1px solid var(--border-light)" : "none",
                transition: "background 0.2s ease",
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-elevated)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>{item.action}</p>
                  <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{item.detail}</p>
                </div>
                <span style={{ fontSize: 11, color: "var(--text-faint)", whiteSpace: "nowrap", flexShrink: 0 }}>{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
