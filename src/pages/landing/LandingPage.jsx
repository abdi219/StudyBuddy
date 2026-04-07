import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, GraduationCap, Repeat, Scale,
  BookOpenCheck, Blocks, Timer, Sparkles, Library,
  Clock, Target, PenTool, Brain, CalendarDays, Zap,
} from "lucide-react";
import StudentDoodles from "../../components/ui/StudentDoodles";
import { PencilDrawLine } from "../../components/ui/StudentDoodles";

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function useCounter(target, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

const navLinks = [
  { label: "Home", id: "hero" },
  { label: "Features", id: "features" },
  { label: "Tools", id: "tools" },
  { label: "About", id: "about" },
];

const features = [
  { icon: GraduationCap, title: "Smart GPA Tracking", desc: "Calculate GPA across 4.0, 5.0, and 10.0 scales. Track semester and overall performance with weighted averages." },
  { icon: CalendarDays, title: "Study Planner", desc: "Plan your study week with visual timetables. Color-code subjects and never miss a deadline again." },
  { icon: Clock, title: "Pomodoro Timer", desc: "Stay focused with timed study sessions. Track your productivity streaks and build better habits." },
  { icon: PenTool, title: "Interactive Classroom", desc: "All-in-one workspace with notes, drawing board, video player, AI assistant, and code editor." },
  { icon: Brain, title: "AI Study Assistant", desc: "Get instant help with concepts, summaries, and practice questions. Your personal tutor, available 24/7." },
  { icon: Target, title: "Progress Analytics", desc: "Visualize your study patterns. See weekly trends, subject breakdowns, and performance insights." },
];

const tools = [
  { icon: GraduationCap, title: "GPA Analyzer", desc: "Multi-scale grading with real-time calculations and weighted averages.", to: "/gpa" },
  { icon: Repeat, title: "ScaleFlex", desc: "Switch between 4.0, 5.0, and 10.0 grading scales dynamically.", to: "/gpa/calculate" },
  { icon: Scale, title: "Convertify", desc: "Smart GPA converter for global compatibility and applications abroad.", to: "/gpa" },
];

const statData = [
  { label: "Grading Scales", value: 3, suffix: "" },
  { label: "Study Tools", value: 8, suffix: "+" },
  { label: "Active Features", value: 12, suffix: "+" },
];

function StatCounter({ value, suffix, label }) {
  const count = useCounter(value, 1200);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 36, fontWeight: 800, color: "var(--text-primary)", fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6 }}>{label}</div>
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
            <div style={{ width: 36, height: 36, borderRadius: "var(--radius-sm)", background: "var(--text-primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Library size={18} strokeWidth={2.2} />
            </div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>Abdi's Library</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="hide-mobile">
            {navLinks.map((item) => (
              <button key={item.id} className="nav-link" onClick={() => scrollTo(item.id)}>{item.label}</button>
            ))}
          </div>
          <Link to="/dashboard" className="btn btn-primary" style={{ padding: "10px 20px", fontSize: 13 }}>
            Dashboard <ArrowRight size={14} />
          </Link>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section id="hero" style={{ paddingTop: 140, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        {/* TONS of black & white doodles filling the hero */}
        <StudentDoodles count={20} opacity={0.055} seed={42} color="var(--text-primary)" />
        <StudentDoodles count={14} opacity={0.035} seed={99} color="var(--text-primary)" />

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

          {/* Profile */}
          <div style={{ flex: "0 0 auto", position: "relative" }}>
            <div style={{
              width: 240, height: 240, borderRadius: "50%", padding: 6,
              border: "3px dashed var(--border)", background: "var(--bg-elevated)",
              animation: "doodleFloat 6s ease-in-out infinite",
            }}>
              <img src="/abdi.jpg" alt="Abdullah Faisal" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-light)", position: "relative" }}>
        <StudentDoodles count={8} opacity={0.04} seed={99} color="var(--text-primary)" />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: 12 }}>
              Everything You Need
            </p>
            <h2 style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 14, fontFamily: "'Space Grotesk', sans-serif" }}>
              Built for the modern student
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-secondary)", maxWidth: 550, margin: "0 auto", lineHeight: 1.7 }}>
              Not just a GPA calculator — it's your complete academic companion with study tools,
              planning features, and interactive workspaces.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 18 }}>
            {features.map((f, i) => (
              <div key={f.title} style={{
                background: "var(--bg-base)",
                border: hoveredFeature === i ? "1.5px solid var(--border)" : "1px solid var(--border-light)",
                borderRadius: "var(--radius-lg)", padding: 28,
                transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                cursor: "default", position: "relative",
                transform: hoveredFeature === i ? "translateY(-4px) rotate(-0.5deg)" : "none",
                boxShadow: hoveredFeature === i ? "var(--shadow-lg)" : "var(--shadow-sm)",
              }}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: "var(--radius-md)",
                  background: "var(--bg-elevated)", border: "1.5px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--text-primary)", marginBottom: 20,
                  transition: "all 0.3s ease",
                  transform: hoveredFeature === i ? "rotate(-6deg) scale(1.1)" : "none",
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
      <section id="tools" className="notebook-bg" style={{ borderTop: "1px solid var(--border-light)", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: 12 }}>Featured Tools</p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 12, fontFamily: "'Space Grotesk', sans-serif" }}>
              Powerful tools, zero complexity
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--text-secondary)", maxWidth: 550 }}>
              Each tool is built to be intuitive, accurate, and fast.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }} className="stagger">
            {tools.map((f) => (
              <Link key={f.title} to={f.to} style={{ textDecoration: "none" }}>
                <div className="card card-interactive" style={{ padding: 28 }}>
                  <div className="icon-box" style={{ marginBottom: 20 }}><f.icon size={20} strokeWidth={1.8} /></div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" }}>{f.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-muted)", marginBottom: 16 }}>{f.desc}</p>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>Try it <ArrowRight size={13} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-light)", position: "relative" }}>
        <StudentDoodles count={5} opacity={0.04} seed={77} color="var(--text-primary)" />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: 12 }}>Meet the Creator</p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "var(--text-primary)", fontFamily: "'Space Grotesk', sans-serif" }}>Built by a student, for students</h2>
          </div>
          <div style={{
            background: "var(--bg-base)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-xl)", padding: 44, boxShadow: "var(--shadow-md)", maxWidth: 900, margin: "0 auto",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 44, flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 400px", minWidth: 0 }}>
                <p style={{ fontSize: 16, lineHeight: 1.85, color: "var(--text-secondary)", marginBottom: 18 }}>
                  Hey! I'm <strong style={{ color: "var(--text-primary)" }}>Abdullah Faisal</strong>, a Computer Science student
                  at Lahore Garrison University. I'm passionate about building tools that make student life easier and more organized.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.85, color: "var(--text-secondary)", marginBottom: 18 }}>
                  This platform started as a simple GPA calculator during my first semester — but it's grown into
                  a complete student workspace. From GPA tracking to interactive classrooms with drawing boards
                  and code editors, every feature is built because I needed it myself.
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-primary)", fontWeight: 500 }}>
                  My goal is to make every student's academic journey smoother, smarter, and more enjoyable.
                </p>
              </div>
              <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                <div style={{ width: 180, height: 180, borderRadius: 20, padding: 4, border: "2.5px dashed var(--border)", background: "var(--bg-elevated)", overflow: "hidden" }}>
                  <img src="/abdi.jpg" alt="Abdullah Faisal" style={{ width: "100%", height: "100%", borderRadius: 16, objectFit: "cover" }} />
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

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "28px 24px", textAlign: "center", background: "var(--bg-surface)" }}>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
          © {new Date().getFullYear()} Abdi's Library — Built for students, by a student.
        </p>
      </footer>

      <style>{`@media (max-width: 640px) { .hide-mobile { display: none !important; } }`}</style>
    </div>
  );
}
