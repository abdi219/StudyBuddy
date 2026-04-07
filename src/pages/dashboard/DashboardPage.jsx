import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap, Clock, Activity, TrendingUp, ArrowRight,
  BookOpen, Calculator, Sparkles, CalendarDays, Timer,
  Zap, Coffee, Target, PenTool,
} from "lucide-react";
import StudentDoodles from "../../components/ui/StudentDoodles";

const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
};

const tips = [
  "Try the Pomodoro technique: 25 min focus, 5 min break! 🍅",
  "Review your notes within 24 hours — it boosts retention by 60%! 📝",
  "Break complex topics into smaller chunks for better understanding. 🧩",
  "Stay hydrated! Your brain works better with enough water. 💧",
  "Use active recall instead of passive reading for better results. 🧠",
];

const quickActions = [
  { title: "Study Session", desc: "Open interactive classroom", icon: BookOpen, to: "/classroom", color: "#5b5bd6" },
  { title: "Calculate GPA", desc: "Multi-scale calculator", icon: Calculator, to: "/gpa/calculate", color: "#2d9d78" },
  { title: "Study Planner", desc: "Plan your week", icon: CalendarDays, to: "/planner", color: "#e5a31d" },
  { title: "Focus Timer", desc: "Pomodoro sessions", icon: Timer, to: "/pomodoro", color: "#d14343" },
  { title: "Analytics", desc: "Track progress", icon: Target, to: "/analytics", color: "#3e8ed0" },
  { title: "Take Notes", desc: "Quick note capture", icon: PenTool, to: "/notes", color: "#9333ea" },
];

const stats = [
  { title: "Current GPA", value: "3.45", sub: "4.0 Scale", icon: GraduationCap, color: "#5b5bd6", bg: "#ededfc" },
  { title: "Study Time", value: "12.5h", sub: "This week", icon: Clock, color: "#2d9d78", bg: "#e6f7f0" },
  { title: "Sessions", value: "8", sub: "Last 7 days", icon: Activity, color: "#e5a31d", bg: "#fef6e0" },
  { title: "Improvement", value: "+0.12", sub: "vs. last semester", icon: TrendingUp, color: "#d14343", bg: "#fde8e8" },
];

const streak = 5;

const activityList = [
  { action: "Calculated SGPA", detail: "4.0 Scale — Result: 3.67", time: "2 hours ago", emoji: "📊" },
  { action: "Study Session", detail: "Data Structures — 45 min", time: "Yesterday", emoji: "📖" },
  { action: "Notes Updated", detail: "OOP Concepts — Added 3 new entries", time: "2 days ago", emoji: "✏️" },
  { action: "GPA Updated", detail: "Semester 3 — 3.45 CGPA", time: "1 week ago", emoji: "🎓" },
];

/* ─── Sticky Note Card ─── */
function StickyNote({ children, color = "#fef6e0", rotation = 0, style = {} }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        background: color, borderRadius: 4, padding: "20px 22px",
        boxShadow: hovered
          ? "0 8px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)"
          : "0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        transform: hovered
          ? `rotate(${rotation * 0.3}deg) translateY(-4px) scale(1.02)`
          : `rotate(${rotation}deg)`,
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        cursor: "default", position: "relative", ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tape effect */}
      <div style={{
        position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)",
        width: 40, height: 16, background: "rgba(255,255,255,0.7)",
        borderRadius: 2, border: "1px solid rgba(0,0,0,0.05)",
      }} />
      {children}
    </div>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const tipOfDay = tips[new Date().getDate() % tips.length];

  return (
    <div style={{ maxWidth: 1000, position: "relative" }} className="fade-enter">
      <StudentDoodles count={6} opacity={0.035} seed={33} />

      <div style={{ display: "flex", flexDirection: "column", gap: 28, position: "relative", zIndex: 1 }}>

        {/* ── Greeting Header ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 16,
        }}>
          <div>
            <h1 style={{
              fontSize: 28, fontWeight: 800, color: "var(--text-primary)",
              fontFamily: "'Space Grotesk', sans-serif", marginBottom: 4,
            }}>
              {greeting()}, Abdullah! 👋
            </h1>
            <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
              Here's your academic snapshot. Keep up the great work!
            </p>
          </div>

          {/* Study Streak */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 18px", borderRadius: "var(--radius-full)",
            background: "var(--accent-soft)", border: "1.5px dashed var(--border-accent)",
          }}>
            <Zap size={18} style={{ color: "var(--accent)" }} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "var(--accent)", lineHeight: 1 }}>
                {streak} days
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>study streak 🔥</div>
            </div>
          </div>
        </div>

        {/* ── Tip of the Day ── */}
        <div style={{
          background: "var(--accent-soft)", border: "1.5px dashed var(--border-accent)",
          borderRadius: "var(--radius-lg)", padding: "14px 20px",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <Coffee size={18} style={{ color: "var(--accent)", flexShrink: 0 }} />
          <p style={{ fontSize: 13, color: "var(--accent)", fontWeight: 500 }}>
            <strong>Tip of the day:</strong> {tipOfDay}
          </p>
        </div>

        {/* ── Stats as Sticky Notes ── */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20,
        }}>
          {stats.map((s, i) => (
            <StickyNote
              key={s.title}
              color={s.bg}
              rotation={[1.5, -1, 0.8, -1.2][i]}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                <p style={{
                  fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.06em", color: s.color, opacity: 0.7,
                }}>{s.title}</p>
                <s.icon size={18} style={{ color: s.color, opacity: 0.5 }} />
              </div>
              <p style={{
                fontSize: 30, fontWeight: 800, color: s.color,
                fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1,
              }}>{s.value}</p>
              <p style={{ fontSize: 12, color: s.color, opacity: 0.6, marginTop: 6 }}>{s.sub}</p>
            </StickyNote>
          ))}
        </div>

        {/* ── Quick Actions ── */}
        <div>
          <h2 style={{
            fontSize: 12, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: 14,
          }}>Quick Actions</h2>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 12,
          }}>
            {quickActions.map((a) => (
              <div
                key={a.title}
                onClick={() => navigate(a.to)}
                style={{
                  background: "var(--bg-surface)", border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)", padding: "18px 20px",
                  cursor: "pointer", transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  display: "flex", alignItems: "center", gap: 14,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px) rotate(-0.5deg)";
                  e.currentTarget.style.boxShadow = `0 8px 24px ${a.color}18`;
                  e.currentTarget.style.borderColor = `${a.color}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: "var(--radius-md)",
                  background: `${a.color}12`, border: `1.5px solid ${a.color}25`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: a.color, flexShrink: 0,
                }}>
                  <a.icon size={18} strokeWidth={1.8} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>{a.title}</h3>
                  <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{a.desc}</p>
                </div>
                <ArrowRight size={14} style={{ color: "var(--text-faint)", flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Recent Activity ── */}
        <div>
          <h2 style={{
            fontSize: 12, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: 14,
          }}>Recent Activity</h2>
          <div style={{
            background: "var(--bg-surface)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)", overflow: "hidden",
          }}>
            {activityList.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "15px 22px",
                borderBottom: i < activityList.length - 1 ? "1px solid var(--border-light)" : "none",
                transition: "background 0.2s ease",
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-elevated)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 18 }}>{item.emoji}</span>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>{item.action}</p>
                    <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{item.detail}</p>
                  </div>
                </div>
                <span style={{ fontSize: 12, color: "var(--text-faint)", whiteSpace: "nowrap", flexShrink: 0 }}>{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
