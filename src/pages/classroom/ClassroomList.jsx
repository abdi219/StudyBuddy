import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, BookOpen, Clock, ArrowRight, Sparkles } from "lucide-react";
import StudentDoodles from "../../components/ui/StudentDoodles";

const mockClassrooms = [
  { id: "ds-101", name: "Data Structures Lab", subject: "CS-201 — Data Structures", lastAccessed: "2 hours ago" },
  { id: "oop-102", name: "OOP Study Session", subject: "CS-102 — Object Oriented Programming", lastAccessed: "Yesterday" },
  { id: "math-201", name: "Linear Algebra Review", subject: "MATH-201 — Linear Algebra", lastAccessed: "3 days ago" },
  { id: "db-301", name: "Database Systems", subject: "CS-301 — Database Management", lastAccessed: "1 week ago" },
];

export default function ClassroomList() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 900, position: "relative" }} className="fade-enter">
      <StudentDoodles count={10} opacity={0.15} seed={66} color="var(--text-primary)" />
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 24 }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)", marginBottom: 4 }}>
              Classrooms
            </h1>
            <p style={{ fontSize: 14, color: "var(--text-muted)" }}>Your study workspaces. Pick up where you left off.</p>
          </div>
          <button onClick={() => navigate("/classroom/new-session")} className="btn btn-primary" style={{ padding: "10px 18px", fontSize: 13 }}>
            <Plus size={15} /> New Classroom
          </button>
        </div>

        <div style={{
          background: "var(--bg-elevated)", border: "1.5px dashed var(--border)",
          borderRadius: "var(--radius-md)", padding: "12px 18px",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <Sparkles size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
          <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Each classroom has <strong style={{ color: "var(--text-primary)" }}>YouTube, Notes, Drawing Board, AI Chat, Code Editor, Calculator & Flashcards</strong> — drag and drop to create split screens.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }} className="stagger">
          {mockClassrooms.map((r) => (
            <div key={r.id} onClick={() => navigate(`/classroom/${r.id}`)} style={{
              background: "var(--bg-surface)", border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)", padding: 22, cursor: "pointer",
              transition: "all 0.3s ease", position: "relative", overflow: "hidden",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 3, background: "var(--text-primary)", opacity: 0.08 }} />
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: "var(--radius-md)",
                  background: "var(--bg-elevated)", border: "1px solid var(--border-light)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--text-primary)",
                }}>
                  <BookOpen size={18} />
                </div>
                <div style={{
                  width: 30, height: 30, borderRadius: 8,
                  background: "var(--bg-elevated)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--text-faint)",
                }}>
                  <ArrowRight size={13} />
                </div>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4, fontFamily: "'Space Grotesk', sans-serif" }}>{r.name}</h3>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 10 }}>{r.subject}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--text-faint)" }}>
                <Clock size={11} /> {r.lastAccessed}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
