import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, BookOpen, Clock, ArrowRight, Sparkles } from "lucide-react";
import StudentDoodles from "../../components/ui/StudentDoodles";

const COLORS = [
  { bg: "#ededfc", border: "#5b5bd6", text: "#5b5bd6" },
  { bg: "#e6f7f0", border: "#2d9d78", text: "#2d9d78" },
  { bg: "#fef6e0", border: "#e5a31d", text: "#e5a31d" },
  { bg: "#fde8e8", border: "#d14343", text: "#d14343" },
  { bg: "#f3e8ff", border: "#9333ea", text: "#9333ea" },
];

const mockClassrooms = [
  { id: "ds-101", name: "Data Structures Lab", subject: "CS-201 — Data Structures", lastAccessed: "2 hours ago", emoji: "🗂️", colorIdx: 0 },
  { id: "oop-102", name: "OOP Study Session", subject: "CS-102 — Object Oriented Programming", lastAccessed: "Yesterday", emoji: "🧬", colorIdx: 1 },
  { id: "math-201", name: "Linear Algebra Review", subject: "MATH-201 — Linear Algebra", lastAccessed: "3 days ago", emoji: "📐", colorIdx: 2 },
  { id: "db-301", name: "Database Systems", subject: "CS-301 — Database Management", lastAccessed: "1 week ago", emoji: "💾", colorIdx: 3 },
];

export default function ClassroomList() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div style={{ maxWidth: 900, position: "relative" }} className="fade-enter">
      <StudentDoodles count={5} opacity={0.03} seed={66} />
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 24 }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{
              fontSize: 26, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif",
              color: "var(--text-primary)", marginBottom: 4,
            }}>
              📚 Classrooms
            </h1>
            <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
              Your study workspaces. Pick up where you left off.
            </p>
          </div>
          <button onClick={() => navigate("/classroom/new-session")} className="btn btn-primary" style={{ padding: "10px 18px", fontSize: 13 }}>
            <Plus size={15} /> New Classroom
          </button>
        </div>

        {/* Info Banner */}
        <div style={{
          background: "var(--accent-soft)", border: "1.5px dashed var(--border-accent)",
          borderRadius: "var(--radius-lg)", padding: "14px 20px",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <Sparkles size={18} style={{ color: "var(--accent)", flexShrink: 0 }} />
          <p style={{ fontSize: 13, color: "var(--accent)", fontWeight: 500 }}>
            Each classroom comes with <strong>YouTube, Notes, Drawing Board, AI Chat, Code Editor, Calculator & Flashcards</strong>!
          </p>
        </div>

        {/* Classroom Grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14,
        }} className="stagger">
          {mockClassrooms.map((r) => {
            const c = COLORS[r.colorIdx];
            const hovered = hoveredId === r.id;
            return (
              <div key={r.id} onClick={() => navigate(`/classroom/${r.id}`)}
                onMouseEnter={() => setHoveredId(r.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  background: "var(--bg-surface)", border: hovered ? `1.5px solid ${c.border}40` : "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)", padding: 22,
                  cursor: "pointer",
                  transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transform: hovered ? "translateY(-4px) rotate(-0.5deg)" : "none",
                  boxShadow: hovered ? `0 12px 28px ${c.border}15` : "var(--shadow-sm)",
                  position: "relative", overflow: "hidden",
                }}
              >
                {/* Accent bar */}
                <div style={{
                  position: "absolute", top: 0, left: 0, width: "100%", height: 4,
                  background: c.border, borderRadius: "0 0 4px 4px", opacity: hovered ? 1 : 0.4,
                  transition: "opacity 0.3s ease",
                }} />

                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "var(--radius-md)",
                    background: c.bg, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22,
                    transition: "all 0.3s ease",
                    transform: hovered ? "rotate(-6deg) scale(1.1)" : "none",
                  }}>
                    {r.emoji}
                  </div>
                  <div style={{
                    width: 32, height: 32, borderRadius: "var(--radius-sm)",
                    background: hovered ? c.bg : "var(--bg-elevated)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: hovered ? c.text : "var(--text-faint)",
                    transition: "all 0.3s ease",
                  }}>
                    <ArrowRight size={14} />
                  </div>
                </div>

                <h3 style={{
                  fontSize: 15, fontWeight: 700, color: "var(--text-primary)",
                  marginBottom: 4, fontFamily: "'Space Grotesk', sans-serif",
                }}>{r.name}</h3>
                <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 10 }}>{r.subject}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--text-faint)" }}>
                  <Clock size={11} /> {r.lastAccessed}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
