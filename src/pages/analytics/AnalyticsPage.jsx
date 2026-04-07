import { useState, useEffect } from "react";
import { Clock, Calendar, BookOpen, TrendingUp, Target, Zap } from "lucide-react";
import StudentDoodles from "../../components/ui/StudentDoodles";

/* Animated counter */
function AnimCounter({ target, duration = 1000 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.floor(start * 10) / 10);
    }, 16);
    return () => clearInterval(t);
  }, [target, duration]);
  return val;
}

const stats = [
  { title: "Total Study Time", value: 48.5, suffix: "h", sub: "This month", icon: Clock },
  { title: "Sessions", value: 24, suffix: "", sub: "This month", icon: Calendar },
  { title: "Subjects", value: 6, suffix: "", sub: "Active", icon: BookOpen },
  { title: "Avg. Session", value: 2.0, suffix: "h", sub: "Per session", icon: TrendingUp },
];

const sessions = [
  { subject: "Data Structures", duration: "1h 15m", date: "Today", score: "A" },
  { subject: "OOP Concepts", duration: "45m", date: "Yesterday", score: "B+" },
  { subject: "Linear Algebra", duration: "2h", date: "Apr 2", score: "A-" },
  { subject: "Database Systems", duration: "1h 30m", date: "Apr 1", score: "B" },
  { subject: "Algorithms", duration: "55m", date: "Mar 30", score: "A" },
];

const weekly = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 1.0 },
  { day: "Wed", hours: 3.0 },
  { day: "Thu", hours: 0.5 },
  { day: "Fri", hours: 2.0 },
  { day: "Sat", hours: 4.0 },
  { day: "Sun", hours: 1.5 },
];
const maxH = Math.max(...weekly.map((d) => d.hours));

export default function AnalyticsPage() {
  return (
    <div style={{ maxWidth: 960, position: "relative" }} className="fade-enter">
      <StudentDoodles count={5} opacity={0.03} seed={22} color="var(--text-primary)" />
      <div style={{ display: "flex", flexDirection: "column", gap: 24, position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div>
          <h1 style={{
            fontSize: 26, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif",
            color: "var(--text-primary)", marginBottom: 4,
          }}>
            Analytics
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
            Track your study habits and academic performance
          </p>
        </div>

        {/* Stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14,
        }} className="stagger">
          {stats.map((s) => (
            <div key={s.title} style={{
              background: "var(--bg-surface)", border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)", padding: 22,
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              position: "relative", overflow: "hidden",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "var(--shadow-lg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, width: 4, height: "100%",
                background: "var(--text-primary)", borderRadius: "0 4px 4px 0", opacity: 0.15,
              }} />
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>{s.title}</p>
                <div style={{
                  width: 34, height: 34, borderRadius: "var(--radius-sm)",
                  background: "var(--bg-elevated)", border: "1px solid var(--border-light)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--text-primary)",
                }}><s.icon size={16} strokeWidth={1.8} /></div>
              </div>
              <p style={{
                fontSize: 28, fontWeight: 800, color: "var(--text-primary)",
                fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1,
              }}>
                <AnimCounter target={s.value} />{s.suffix}
              </p>
              <p style={{ fontSize: 12, color: "var(--text-faint)", marginTop: 5 }}>{s.sub}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* Bar Chart — hand-drawn style */}
          <div style={{
            background: "var(--bg-surface)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)", padding: 24,
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 20 }}>Weekly Study Hours</h3>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 10, height: 150 }}>
              {weekly.map((d, i) => (
                <div key={d.day} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)" }}>{d.hours}h</span>
                  <div style={{
                    width: "100%", borderRadius: "8px 8px 4px 4px",
                    background: `hsl(${220 + i * 15}, 50%, ${55 + (d.hours / maxH) * 15}%)`,
                    height: `${(d.hours / maxH) * 100}%`, minHeight: 6,
                    transition: "height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    transitionDelay: `${i * 0.08}s`,
                    border: "2px solid rgba(255,255,255,0.15)",
                    boxShadow: "inset 0 -4px 8px rgba(0,0,0,0.1)",
                  }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-faint)" }}>{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* GPA Trend */}
          <div style={{
            background: "var(--bg-surface)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)", padding: 24,
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 20 }}>GPA Trend</h3>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 10, height: 150 }}>
              {[3.2, 3.4, 3.1, 3.45, 3.67].map((gpa, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)" }}>{gpa}</span>
                  <div style={{
                    width: "100%", borderRadius: "8px 8px 4px 4px",
                    background: "var(--accent-soft)", border: "2px solid var(--border-accent)",
                    height: `${(gpa / 4.0) * 100}%`, minHeight: 12,
                    transition: "height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    transitionDelay: `${i * 0.1}s`,
                  }} />
                  <span style={{ fontSize: 10, fontWeight: 500, color: "var(--text-faint)" }}>Sem {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Session History */}
        <div style={{
          background: "var(--bg-surface)", border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)", overflow: "hidden",
        }}>
          <div style={{
            padding: "14px 22px", borderBottom: "1px solid var(--border-light)",
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>Session History</h3>
          </div>
          <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                {["Subject", "Duration", "Date", "Performance"].map((h) => (
                  <th key={h} style={{
                    textAlign: "left", padding: "10px 22px", fontSize: 10, fontWeight: 700,
                    color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessions.map((s, i) => (
                <tr key={i} style={{
                  borderBottom: i < sessions.length - 1 ? "1px solid var(--border-light)" : "none",
                  transition: "background 0.2s",
                }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-elevated)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "12px 22px", fontWeight: 600, color: "var(--text-primary)" }}>{s.subject}</td>
                  <td style={{ padding: "12px 22px", color: "var(--text-muted)" }}>{s.duration}</td>
                  <td style={{ padding: "12px 22px", color: "var(--text-muted)" }}>{s.date}</td>
                  <td style={{ padding: "12px 22px" }}>
                    <span style={{
                      padding: "3px 10px", borderRadius: "var(--radius-full)",
                      fontSize: 11, fontWeight: 700,
                      background: "var(--bg-elevated)", color: "var(--text-primary)",
                      border: "1px solid var(--border)",
                    }}>{s.score}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
