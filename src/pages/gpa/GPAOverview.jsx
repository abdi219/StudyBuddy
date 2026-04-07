import { useNavigate } from "react-router-dom";
import { Calculator, Scale, ArrowRight, GraduationCap, BookOpen, Award } from "lucide-react";
import StudentDoodles from "../../components/ui/StudentDoodles";

const scales = [
  {
    title: "4.0 Scale",
    desc: "The most common GPA scale used in US universities. Grades range from A (4.0) to F (0.0).",
    tag: "Most Popular",
    emoji: "🇺🇸",
    color: "#5b5bd6",
    bg: "#ededfc",
  },
  {
    title: "5.0 Scale",
    desc: "Used in many South Asian and African institutions. Provides wider grade distribution.",
    tag: "Extended",
    emoji: "🌍",
    color: "#2d9d78",
    bg: "#e6f7f0",
  },
  {
    title: "10.0 Scale",
    desc: "Common in European and Indian grading systems. Offers fine-grained academic measurement.",
    tag: "Precision",
    emoji: "🎯",
    color: "#e5a31d",
    bg: "#fef6e0",
  },
];

export default function GPAOverview() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 900, position: "relative" }} className="fade-enter">
      <StudentDoodles count={4} opacity={0.03} seed={67} />
      <div style={{ display: "flex", flexDirection: "column", gap: 24, position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{
              fontSize: 26, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif",
              color: "var(--text-primary)", marginBottom: 4,
            }}>
              🎓 GPA System
            </h1>
            <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
              Choose your grading scale and start calculating
            </p>
          </div>
          <button onClick={() => navigate("/gpa/calculate")} className="btn btn-primary" style={{ padding: "10px 18px", fontSize: 13 }}>
            <Calculator size={15} /> Open Calculator
          </button>
        </div>

        {/* Scale Cards */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16,
        }} className="stagger">
          {scales.map((s) => (
            <div key={s.title} onClick={() => navigate("/gpa/calculate")} style={{
              background: "var(--bg-surface)", border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)", padding: 24,
              cursor: "pointer", transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
              position: "relative", overflow: "hidden",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px) rotate(-0.5deg)";
                e.currentTarget.style.boxShadow = `0 12px 32px ${s.color}15`;
                e.currentTarget.style.borderColor = `${s.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              {/* Left accent bar */}
              <div style={{
                position: "absolute", top: 0, left: 0, width: 4, height: "100%",
                background: s.color, borderRadius: "0 4px 4px 0",
              }} />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: "var(--radius-md)",
                  background: s.bg, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20,
                }}>
                  {s.emoji}
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.06em", color: s.color,
                  background: s.bg, padding: "4px 10px", borderRadius: "var(--radius-full)",
                }}>{s.tag}</span>
              </div>

              <h3 style={{
                fontSize: 16, fontWeight: 700, color: "var(--text-primary)",
                marginBottom: 6, fontFamily: "'Space Grotesk', sans-serif",
              }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.65, marginBottom: 14 }}>{s.desc}</p>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                fontSize: 12, fontWeight: 600, color: s.color,
              }}>Calculate <ArrowRight size={12} /></span>
            </div>
          ))}
        </div>

        {/* Relative Grading Card */}
        <div style={{
          background: "var(--bg-surface)", border: "1.5px dashed var(--border-accent)",
          borderRadius: "var(--radius-lg)", padding: 22,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>📐 Relative Grading</h3>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
              Grade on a curve based on class performance distribution.
            </p>
          </div>
          <button onClick={() => navigate("/gpa/relative")} className="btn btn-secondary" style={{ padding: "8px 16px", fontSize: 12 }}>
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
