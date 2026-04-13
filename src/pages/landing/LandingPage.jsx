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
  { icon: Brain, title: "AI Study Assistant", desc: "Get instant help with concepts, summaries, and practice questions. Your personal tutor." },
  { icon: Target, title: "Progress Analytics", desc: "Visualize study patterns with weekly trends, subject breakdowns, and performance insights." },
];

const tools = [
  { icon: Target, title: "Grade Forecaster", desc: "Predict how your upcoming finals and assignments will impact your overall standing.", to: "/gpa" },
  { icon: Timer, title: "Focus Timer", desc: "Custom Pomodoro sessions with habit tracking, streak counts, and productivity analytics.", to: "/gpa" },
  { icon: Brain, title: "Concept Mapper", desc: "AI-driven visual study notes and flashcards generated directly from your lectures.", to: "/gpa" },
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
          <Link to="/auth" className="btn btn-primary" style={{ padding: "10px 20px", fontSize: 13 }}>Launch App <ArrowRight size={14} /></Link>
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
              and dive into interactive classrooms. All designed for students who want to stay ahead.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 40 }}>
              <Link to="/auth" className="btn btn-primary">Start Your Setup <ArrowRight size={15} /></Link>
              <span className="btn btn-secondary">Explore Classroom</span>
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
              Not just a GPA calculator but your complete academic companion with study tools, planning features, and interactive workspaces.
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(30px, 5vw, 60px)", maxWidth: 1050, margin: "0 auto", alignItems: "center" }}>
            
            {/* ── Left Navigation Menu ── */}
            <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: 8, position: "relative" }}>
              
              {features.map((f, i) => {
                const isActive = (hoveredFeature !== null ? hoveredFeature : 0) === i;
                return (
                  <div 
                    key={f.title}
                    onMouseEnter={() => setHoveredFeature(i)}
                    style={{
                      display: "flex", alignItems: "center", gap: 16,
                      padding: "16px 24px", cursor: "pointer", position: "relative", zIndex: 1,
                      transition: "all 0.3s ease",
                      background: isActive ? "var(--bg-elevated)" : "transparent",
                      borderRadius: 16, border: isActive ? "1px solid var(--border)" : "1px solid transparent",
                      boxShadow: isActive ? "var(--shadow-sm)" : "none"
                    }}
                  >
                    <div style={{ 
                      fontSize: 15, fontWeight: 800, color: isActive ? "var(--text-primary)" : "var(--text-faint)",
                      fontFamily: "'Space Grotesk', sans-serif", width: 24, flexShrink: 0
                    }}>
                      0{i+1}
                    </div>

                    <div>
                      <h4 style={{ 
                        fontSize: 16, fontWeight: isActive ? 700 : 600, 
                        color: isActive ? "var(--text-primary)" : "var(--text-secondary)", 
                        fontFamily: "'Space Grotesk', sans-serif", margin: 0,
                        transition: "all 0.25s ease"
                      }}>{f.title}</h4>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Right Dynamic Display Canvas ── */}
            <div style={{ 
              flex: "1 1 420px", position: "relative", minHeight: 420,
              display: "flex", alignItems: "center", padding: 24
            }}>
              {/* Background styling - notebook paper feel */}
              <div style={{ 
                position: "absolute", inset: 0, background: "var(--bg-base)", borderRadius: 24, 
                border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)", overflow: "hidden" 
              }}>
                <div style={{ position: "absolute", left: 0, right: 0, top: 40, height: 1, background: "rgba(0,0,0,0.04)" }} />
                <div style={{ position: "absolute", left: 0, right: 0, top: 70, height: 1, background: "rgba(0,0,0,0.04)" }} />
                <div style={{ position: "absolute", left: 40, top: 0, bottom: 0, width: 2, background: "var(--border-accent)", opacity: 0.5 }} />
              </div>

              {features.map((f, i) => {
                const isActive = (hoveredFeature !== null ? hoveredFeature : 0) === i;
                return (
                  <div 
                    key={"display"+f.title}
                    style={{
                      position: "absolute", top: 40, left: 70, right: 40, bottom: 40,
                      display: "flex", flexDirection: "column", justifyContent: "center",
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(15px)",
                      pointerEvents: isActive ? "auto" : "none",
                      transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
                    }}
                  >
                    <div style={{ 
                      width: 60, height: 60, borderRadius: 16, 
                      background: "var(--text-primary)", color: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 24, transform: isActive ? "scale(1) rotate(-4deg)" : "scale(0.8)", transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.15)"
                    }}>
                      <f.icon size={26} strokeWidth={1.8} />
                    </div>
                    
                    <h3 style={{ fontSize: 26, fontWeight: 800, color: "var(--text-primary)", marginBottom: 14, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.2 }}>
                      {f.title}
                    </h3>
                    
                    <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text-secondary)", margin: 0 }}>
                      {f.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TOOLS ═══ */}
      <section id="tools" style={{ background: "var(--bg-base)", padding: "70px 0", position: "relative", overflow: "hidden", borderTop: "1px solid var(--border-light)" }}>
        
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 99, background: "var(--bg-elevated)", border: "1px dashed var(--border-accent)", marginBottom: 20 }}>
              <Sparkles size={14} color="var(--text-primary)" />
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-primary)" }}>Next-Gen Toolset</span>
            </div>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 46px)", fontWeight: 800, color: "var(--text-primary)", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em", margin: 0, lineHeight: 1.15 }}>
              Not just tools. <br/> <u style={{ textDecorationStyle: "wavy", textDecorationColor: "var(--border-accent)", textDecorationThickness: 3, textUnderlineOffset: 6 }}>Superpowers.</u>
            </h2>
          </div>

          {/* Compact Themed Accordion */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(12px, 2vw, 24px)", height: 380, width: "100%" }}>
            {tools.map((f, i) => {
              const hoverIndex = i + 10;
              const isHovered = hoveredFeature === hoverIndex;
              const isActive = isHovered || (hoveredFeature === null && i === 0) || (hoveredFeature !== null && hoveredFeature < 10 && i === 0);
              const flexValue = isActive ? 3 : 1;

              return (
                <div 
                  key={f.title}
                  onMouseEnter={() => setHoveredFeature(hoverIndex)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  style={{
                    flex: flexValue, minWidth: isActive ? 300 : 120,
                    position: "relative", borderRadius: 28,
                    background: "var(--bg-elevated)",
                    border: isActive ? "2px solid var(--text-primary)" : "1px dashed var(--border)",
                    transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                    overflow: "hidden", cursor: "pointer",
                    boxShadow: isActive ? "var(--shadow-lg)" : "none",
                    transform: isActive ? "translateY(-4px)" : "translateY(0)"
                  }}
                >
                   {/* Oversized watermark doodle inside card */}
                   <div style={{
                      position: "absolute", top: "50%", left: isActive ? "50%" : "-20%",
                      transform: "translate(-50%, -50%) rotate(-15deg)", 
                      color: "var(--text-primary)", opacity: 0.03, pointerEvents: "none",
                      transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1)"
                   }}>
                      <f.icon size={250} strokeWidth={1.2} />
                   </div>

                   <div style={{ display: "flex", flexDirection: "column", padding: "32px", height: "100%", position: "relative", zIndex: 2 }}>
                      <div style={{
                         width: 64, height: 64, borderRadius: 16, 
                         background: isActive ? "var(--text-primary)" : "var(--bg-base)", border: isActive ? "none" : "1.5px solid var(--border)",
                         display: "flex", alignItems: "center", justifyContent: "center",
                         color: isActive ? "#fff" : "var(--text-primary)",
                         boxShadow: isActive ? "var(--shadow-md)" : "none",
                         transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                         transform: isActive ? "scale(1.05) rotate(-6deg)" : "scale(1) rotate(0)",
                      }}>
                         <f.icon size={28} strokeWidth={isActive ? 2 : 1.5} style={{ transition: "all 0.5s ease" }} />
                      </div>

                      <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", height: 110, justifyContent: "flex-end" }}>
                         <h3 style={{
                            fontSize: isActive ? 28 : 20, fontWeight: 800, color: "var(--text-primary)",
                            fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em",
                            margin: 0, transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                            whiteSpace: "nowrap"
                         }}>
                            {f.title}
                         </h3>
                         
                         <p style={{
                            fontSize: 15, lineHeight: 1.65, color: "var(--text-secondary)", margin: 0,
                            opacity: isActive ? 1 : 0, maxWidth: "90%",
                            transform: isActive ? "translateY(0)" : "translateY(15px)",
                            transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                            marginTop: isActive ? 8 : 0, height: isActive ? "auto" : 0, overflow: "hidden"
                         }}>
                            {f.desc}
                         </p>
                      </div>

                      {/* Stylish vertical text overlay when NOT active */}
                      {!isActive && (
                         <div style={{
                            position: "absolute", top: "50%", left: "50%",
                            transform: "translate(-50%, -50%) rotate(-90deg)",
                            fontSize: 42, fontWeight: 900, color: "var(--text-primary)", opacity: 0.05,
                            pointerEvents: "none", whiteSpace: "nowrap", fontFamily: "'Space Grotesk', sans-serif",
                            transition: "opacity 0.3s ease"
                         }}>
                            {f.title}
                         </div>
                      )}

                      {/* Floating arrow for active state */}
                      {isActive && (
                         <div style={{ position: "absolute", bottom: 32, right: 32, animation: "bounceRight 2s infinite" }}>
                            <ArrowRight color="var(--text-primary)" size={22} />
                         </div>
                      )}
                   </div>
                </div>
              );
            })}
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
                  This platform started as a GPA calculator during my first semester, but it's grown into a complete student workspace.
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
        @keyframes gradientFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes bounceRight { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(8px); } }
      `}</style>
    </div>
  );
}
