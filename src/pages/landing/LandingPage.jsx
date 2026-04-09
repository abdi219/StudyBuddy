import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, GraduationCap, Repeat, Scale,
  BookOpenCheck, Timer, Sparkles, Library,
  Clock, Target, PenTool, Brain, CalendarDays,
} from "lucide-react";
import StudentDoodles from "../../components/ui/StudentDoodles";
import { PencilDrawLine } from "../../components/ui/StudentDoodles";

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function useCounter(target, dur = 1500) {
  const [c, setC] = useState(0);
  useEffect(() => {
    let s = 0;
    const step = target / (dur / 16);
    const t = setInterval(() => { s += step; if (s >= target) { setC(target); clearInterval(t); } else setC(Math.floor(s)); }, 16);
    return () => clearInterval(t);
  }, [target, dur]);
  return c;
}

const navLinks = [
  { label: "Home", id: "hero" },
  { label: "Features", id: "features" },
  { label: "Tools", id: "tools" },
  { label: "About", id: "about" },
];

const features = [
  { icon: GraduationCap, title: "Smart GPA Tracking", desc: "Calculate GPA across 4.0, 5.0, and 10.0 scales with weighted averages and semester tracking." },
  { icon: CalendarDays, title: "Study Planner", desc: "Plan your study week with visual timetables. Color-code subjects and never miss a deadline." },
  { icon: Clock, title: "Pomodoro Timer", desc: "Stay focused with timed study sessions. Track your productivity streaks and build habits." },
  { icon: PenTool, title: "Interactive Classroom", desc: "All-in-one workspace with notes, drawing board, video player, AI assistant, and code editor." },
  { icon: Brain, title: "AI Study Assistant", desc: "Get instant help with concepts, summaries, and practice questions — your personal tutor." },
  { icon: Target, title: "Progress Analytics", desc: "Visualize study patterns with weekly trends, subject breakdowns, and performance insights." },
];

const tools = [
  { icon: GraduationCap, title: "GPA Analyzer", desc: "Multi-scale grading with real-time calculations.", to: "/gpa" },
  { icon: Repeat, title: "ScaleFlex", desc: "Switch between 4.0, 5.0, and 10.0 scales dynamically.", to: "/gpa" },
  { icon: Scale, title: "Convertify", desc: "Smart GPA converter for global compatibility.", to: "/gpa" },
];

const statData = [
  { label: "Grading Scales", value: 3, suffix: "" },
  { label: "Study Tools", value: 8, suffix: "+" },
  { label: "Active Features", value: 12, suffix: "+" },
];

function StatCounter({ value, suffix, label }) {
  const c = useCounter(value, 1200);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 36, fontWeight: 800, color: "var(--text-primary)", fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>{c}{suffix}</div>
      <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6 }}>{label}</div>
    </div>
  );
}

/* ── Animated 3D Study Desk Visual ── */
function StudyDeskVisual() {
  return (
    <div style={{
      width: 360, height: 320, position: "relative",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {/* Desk surface */}
      <div style={{
        width: 300, height: 200, borderRadius: 16, position: "relative",
        background: "#f5f0e8", border: "2px solid var(--text-primary)",
        boxShadow: "8px 8px 0 var(--text-primary)",
        transform: "perspective(600px) rotateX(5deg) rotateY(-3deg)",
        transition: "transform 0.5s ease",
      }}>
        {/* Notebook lines */}
        {[40, 65, 90, 115, 140, 165].map((y) => (
          <div key={y} style={{
            position: "absolute", left: 50, right: 20, top: y,
            height: 1, background: "rgba(0,0,0,0.08)",
          }} />
        ))}
        {/* Red margin line */}
        <div style={{
          position: "absolute", left: 44, top: 20, bottom: 15,
          width: 1.5, background: "rgba(200,80,80,0.25)",
        }} />
        {/* Writing animation */}
        <svg style={{ position: "absolute", left: 55, top: 35, opacity: 0.4 }} width="200" height="130" viewBox="0 0 200 130">
          <path d="M0,10 Q30,5 60,12 Q90,18 120,8 Q150,0 180,10" fill="none" stroke="var(--text-primary)" strokeWidth="1.5" strokeLinecap="round" className="writing-line" />
          <path d="M0,35 Q40,30 80,38 Q120,45 160,32" fill="none" stroke="var(--text-primary)" strokeWidth="1.5" strokeLinecap="round" className="writing-line-2" />
          <path d="M0,60 Q50,55 100,62 Q140,68 180,58" fill="none" stroke="var(--text-primary)" strokeWidth="1.5" strokeLinecap="round" className="writing-line-3" />
        </svg>
        {/* Pencil on desk */}
        <div style={{
          position: "absolute", bottom: -10, right: 20,
          width: 80, height: 8, background: "#e8c840",
          transform: "rotate(-15deg)", borderRadius: 2,
          border: "1px solid rgba(0,0,0,0.15)",
        }}>
          <div style={{ position: "absolute", right: -8, top: 0, width: 0, height: 0, borderLeft: "8px solid #d4a830", borderTop: "4px solid transparent", borderBottom: "4px solid transparent" }} />
          <div style={{ position: "absolute", left: 0, top: 0, width: 6, height: "100%", background: "#f0d060", borderRadius: "2px 0 0 2px" }} />
        </div>
      </div>

      {/* Floating book */}
      <div style={{
        position: "absolute", top: 10, right: 10,
        width: 60, height: 44, background: "var(--text-primary)",
        borderRadius: "3px 8px 8px 3px", animation: "doodleFloat 5s ease-in-out infinite",
        boxShadow: "3px 3px 0 rgba(0,0,0,0.15)",
      }}>
        <div style={{ position: "absolute", left: 5, top: 8, right: 8, height: 1.5, background: "rgba(255,255,255,0.3)" }} />
        <div style={{ position: "absolute", left: 5, top: 14, right: 12, height: 1.5, background: "rgba(255,255,255,0.2)" }} />
        <div style={{ position: "absolute", left: 5, top: 20, right: 10, height: 1.5, background: "rgba(255,255,255,0.2)" }} />
      </div>

      {/* Floating coffee cup */}
      <div style={{
        position: "absolute", bottom: 30, left: 0,
        animation: "doodleFloat 7s ease-in-out infinite 1s",
      }}>
        <div style={{
          width: 30, height: 28, background: "#fff",
          border: "2px solid var(--text-primary)", borderRadius: "0 0 6px 6px",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", right: -12, top: 5, width: 10, height: 14,
            border: "2px solid var(--text-primary)", borderLeft: "none", borderRadius: "0 6px 6px 0",
          }} />
          {/* Steam */}
          <div style={{ position: "absolute", top: -16, left: 6, width: 4, height: 12, background: "transparent", borderLeft: "1.5px solid rgba(0,0,0,0.15)", borderRadius: 10, animation: "doodleFloat 3s ease-in-out infinite" }} />
          <div style={{ position: "absolute", top: -14, left: 14, width: 4, height: 10, background: "transparent", borderLeft: "1.5px solid rgba(0,0,0,0.1)", borderRadius: 10, animation: "doodleFloat 4s ease-in-out infinite 0.5s" }} />
        </div>
      </div>

      {/* Floating sticky note */}
      <div style={{
        position: "absolute", top: 40, left: 15, width: 50, height: 50,
        background: "#fffde7", border: "1.5px solid rgba(0,0,0,0.1)",
        borderRadius: 2, transform: "rotate(-6deg)",
        animation: "doodleFloat 6s ease-in-out infinite 2s",
        boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
      }}>
        <div style={{ padding: 6 }}>
          <div style={{ height: 1, background: "rgba(0,0,0,0.1)", marginBottom: 4 }} />
          <div style={{ height: 1, background: "rgba(0,0,0,0.07)", marginBottom: 4, width: "80%" }} />
          <div style={{ height: 1, background: "rgba(0,0,0,0.07)", width: "60%" }} />
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <div style={{ background: "var(--bg-base)", minHeight: "100vh", position: "relative" }}>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: 64,
        display: "flex", alignItems: "center", justifyContent: "center",
        borderBottom: "1px solid var(--border-light)",
        background: "rgba(250, 249, 246, 0.88)",
        backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
      }}>
        <div style={{ width: "100%", maxWidth: 1200, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--text-primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Library size={18} strokeWidth={2.2} />
            </div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>Abdi's Library</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="hide-mobile">
            {navLinks.map((item) => (
              <button key={item.id} className="nav-link" onClick={() => scrollTo(item.id)}>{item.label}</button>
            ))}
          </div>
          <Link to="/dashboard" className="btn btn-primary" style={{ padding: "10px 20px", fontSize: 13 }}>Dashboard <ArrowRight size={14} /></Link>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section id="hero" style={{ paddingTop: 140, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        {/* Dense black doodles filling the entire hero */}
        <StudentDoodles count={35} opacity={0.35} seed={42} color="#1a1a2e" />
        <StudentDoodles count={25} opacity={0.25} seed={99} color="#1a1a2e" />

        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 24px",
          display: "flex", alignItems: "center", gap: 56, flexWrap: "wrap",
          position: "relative", zIndex: 1,
        }} className="stagger">

          <div style={{ flex: "1 1 520px", minWidth: 0 }}>
            <div className="doodle-chip" style={{ marginBottom: 20, borderColor: "var(--border)", color: "var(--text-secondary)", background: "var(--bg-elevated)" }}>
              <Sparkles size={14} /> Student Productivity Platform
            </div>

            <h1 style={{
              fontSize: "clamp(34px, 5vw, 54px)", fontWeight: 800, lineHeight: 1.12,
              color: "var(--text-primary)", marginBottom: 8,
              fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em",
            }}>
              Your all-in-one
              <br />
              <span style={{ position: "relative", display: "inline-block" }}>
                study workspace
                <PencilDrawLine
                  d="M0,8 Q60,14 120,6 Q180,0 240,8"
                  width={240} height={16} strokeWidth={2.5}
                  color="var(--text-primary)" duration={1.5} delay={0.5}
                  style={{ position: "absolute", bottom: -6, left: 0, width: "100%", opacity: 0.25 }}
                />
              </span>
            </h1>

            <p style={{ fontSize: 17, lineHeight: 1.75, color: "var(--text-secondary)", maxWidth: 500, marginBottom: 32, marginTop: 16 }}>
              Calculate GPAs, plan your study schedule, take notes, run a Pomodoro timer,
              and dive into interactive classrooms — all designed for students who want to stay ahead.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 40 }}>
              <Link to="/dashboard" className="btn btn-primary">Get Started <ArrowRight size={15} /></Link>
              <Link to="/classroom" className="btn btn-secondary">Explore Classroom</Link>
            </div>

            <div style={{ display: "flex", gap: 40, paddingTop: 24, borderTop: "1.5px dashed var(--border)" }}>
              {statData.map((s) => <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />)}
            </div>
          </div>

          {/* Animated Study Desk Visual instead of profile pic */}
          <StudyDeskVisual />
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-light)", position: "relative" }}>
        <StudentDoodles count={16} opacity={0.25} seed={99} color="#1a1a2e" />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: 12 }}>Everything You Need</p>
            <h2 style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 14, fontFamily: "'Space Grotesk', sans-serif" }}>Built for the modern student</h2>
            <p style={{ fontSize: 15, color: "var(--text-secondary)", maxWidth: 550, margin: "0 auto", lineHeight: 1.7 }}>
              Not just a GPA calculator — your complete academic companion with study tools, planning features, and interactive workspaces.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 18 }}>
            {features.map((f, i) => (
              <div key={f.title} style={{
                background: "var(--bg-base)", border: hoveredFeature === i ? "1.5px solid var(--border)" : "1px solid var(--border-light)",
                borderRadius: 16, padding: 28, transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)", cursor: "default",
                transform: hoveredFeature === i ? "translateY(-4px) rotate(-0.5deg)" : "none",
                boxShadow: hoveredFeature === i ? "var(--shadow-lg)" : "var(--shadow-sm)",
              }}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12, background: "var(--bg-elevated)", border: "1.5px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-primary)", marginBottom: 20,
                  transition: "all 0.3s ease", transform: hoveredFeature === i ? "rotate(-6deg) scale(1.1)" : "none",
                }}>
                  <f.icon size={22} strokeWidth={1.8} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" }}>{f.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-muted)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TOOLS ═══ */}
      <section id="tools" className="notebook-bg" style={{ borderTop: "1px solid var(--border-light)", position: "relative", height: "100%" }}>
        <StudentDoodles count={14} opacity={0.2} seed={77} color="#1a1a2e" />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: 12 }}>Featured Tools</p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 12, fontFamily: "'Space Grotesk', sans-serif" }}>Powerful tools, zero complexity</h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--text-secondary)", maxWidth: 550 }}>Each tool is built to be intuitive, accurate, and fast.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }} className="stagger">
            {tools.map((f) => (
              <div key={f.title} className="card" style={{ padding: 28, display: "flex", flexDirection: "column", height: "100%" }}>
                <div className="icon-box" style={{ marginBottom: 20 }}><f.icon size={20} strokeWidth={1.8} /></div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" }}>{f.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-muted)", marginBottom: 0, flexGrow: 1 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-light)", position: "relative" }}>
        <StudentDoodles count={12} opacity={0.2} seed={55} color="#1a1a2e" />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: 12 }}>Meet the Creator</p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "var(--text-primary)", fontFamily: "'Space Grotesk', sans-serif" }}>Built by a student, for students</h2>
          </div>
          <div style={{ background: "var(--bg-base)", border: "1px solid var(--border)", borderRadius: 20, padding: 44, boxShadow: "var(--shadow-md)", maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 44, flexWrap: "wrap", justifyContent: "center" }}>
              <div style={{ flex: "1 1 400px", minWidth: 0 }}>
                <p style={{ fontSize: 16, lineHeight: 1.85, color: "var(--text-secondary)", marginBottom: 18 }}>
                  Hey! I'm <strong style={{ color: "var(--text-primary)" }}>Abdullah Faisal</strong>, a Computer Science student
                  at Lahore Garrison University. I'm passionate about building tools that make student life easier.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.85, color: "var(--text-secondary)", marginBottom: 18 }}>
                  This platform started as a GPA calculator during my first semester — but it's grown into a complete student workspace.
                  From GPA tracking to interactive classrooms with drawing boards and code editors, every feature is built because I needed it myself.
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-primary)", fontWeight: 500 }}>
                  My goal is to make every student's academic journey smoother, smarter, and more enjoyable.
                </p>
              </div>
              <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                <div style={{ width: 180, height: 180, borderRadius: "50%", border: "4px solid #fff", boxShadow: "var(--shadow-md)", background: "var(--bg-elevated)", overflow: "hidden" }}>
                  <img src="/abdi.jpg" alt="Abdullah Faisal" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>Abdullah Faisal</p>
                  <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 3 }}>CS Student · LGU Lahore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid var(--border)", padding: "28px 24px", textAlign: "center", background: "var(--bg-surface)" }}>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>© {new Date().getFullYear()} Abdi's Library — Built for students, by a student.</p>
      </footer>

      <style>{`
        @media (max-width: 640px) { .hide-mobile { display: none !important; } }
        .writing-line { stroke-dasharray: 300; stroke-dashoffset: 300; animation: writeDraw 3s ease-in-out infinite; }
        .writing-line-2 { stroke-dasharray: 250; stroke-dashoffset: 250; animation: writeDraw 3s ease-in-out infinite 0.5s; }
        .writing-line-3 { stroke-dasharray: 280; stroke-dashoffset: 280; animation: writeDraw 3s ease-in-out infinite 1s; }
        @keyframes writeDraw { 0%,100% { stroke-dashoffset: 300; } 40%,60% { stroke-dashoffset: 0; } }
      `}</style>
    </div>
  );
}
