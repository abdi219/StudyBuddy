import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Check, GraduationCap, MapPin, Target, Sparkles, BookOpen, Clock, PenTool } from "lucide-react";
import StudentDoodles from "../../components/ui/StudentDoodles";

function CosmicBackground() {
  return (
    <>
      <style>{`
        @keyframes slowMorph1 {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.15; }
          50% { transform: translate(50px, 40px) scale(1.4) rotate(15deg); opacity: 0.25; }
          100% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.15; }
        }
        @keyframes wizardFade {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", zIndex: 0, background: "var(--bg-base)" }}>
        <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(39, 39, 42, 0.1) 0%, rgba(255,255,255,0) 70%)", animation: "slowMorph1 18s infinite ease-in-out" }} />
        <StudentDoodles count={40} opacity={0.12} seed={777} color="var(--text-primary)" />
      </div>
    </>
  );
}

export default function OnboardingSurvey() {
  const [step, setStep] = useState(1);
  const [isFinishing, setIsFinishing] = useState(false);
  const navigate = useNavigate();

  // Full 6-Phase Dashboard Model
  const [data, setData] = useState({
    name: "", avatarIdx: 0,
    institute: "", major: "", semester: "",
    currentGpa: "", scale: "4.0", prevGpa: "", targetGpa: "",
    studyGoal: "15", focusRoutine: "25min Focus",
    tools: { notes: true, calc: true, flashcards: false, code: false }
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 6));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  useEffect(() => {
    if (step === 6) {
      setIsFinishing(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 4000);
    }
  }, [step, navigate]);

  const inputStyle = {
    width: "100%", padding: "16px 20px", fontSize: 15, border: "2px solid var(--border)", 
    borderRadius: 16, background: "rgba(255,255,255,0.8)", outline: "none",
    color: "var(--text-primary)", transition: "all 0.2s ease", fontWeight: 700,
    fontFamily: "'Inter', sans-serif"
  };

  const handleInput = (key, val) => setData(prev => ({ ...prev, [key]: val }));

  return (
    <div style={{ minHeight: "100vh", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <CosmicBackground />

      {/* Decorative Mascot Image on the side blending perfectly into the background */}
      {step < 6 && (
        <img 
          src="/mascot.png" 
          alt="3D Student Mascot" 
          style={{ 
            position: "fixed", bottom: "-5vh", left: "-5vw", height: "60vh", opacity: 0.8,
            mixBlendMode: "darken", pointerEvents: "none", zIndex: 5, filter: "brightness(0.95)",
            animation: "slowMorph1 12s infinite ease-in-out reverse"
          }}
        />
      )}

      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 640, padding: 24 }}>
        
        {/* Stepper Header */}
        {step < 6 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 40 }}>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ 
                  width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 800, transition: "all 0.4s",
                  background: step >= i ? "var(--text-primary)" : "var(--border)",
                  color: step >= i ? "#fff" : "var(--text-faint)",
                  boxShadow: step === i ? "0 0 0 4px rgba(39, 39, 42, 0.2)" : "none"
                }}>
                  {step > i ? <Check size={16} /> : i}
                </div>
                {i < 5 && <div style={{ width: 30, height: 2, background: step > i ? "var(--text-primary)" : "var(--border)", transition: "all 0.4s" }} />}
              </div>
            ))}
          </div>
        )}

        {/* Wizard Glass Container */}
        <div key={step} style={{ 
          background: "rgba(255, 255, 255, 0.6)", backdropFilter: "blur(40px) saturate(200%)",
          border: "1px solid rgba(255, 255, 255, 0.8)", borderRadius: 32, padding: "48px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(255,255,255,0.5)",
          animation: "wizardFade 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
        }}>
          
          {step === 1 && (
            <div>
              <div style={{ background: "var(--text-primary)", color: "#fff", width: 48, height: 48, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}><Sparkles size={24} /></div>
              <h2 style={{ fontSize: 32, fontWeight: 900, fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)", marginBottom: 8 }}>Who's stepping in?</h2>
              <p style={{ fontSize: 16, color: "var(--text-secondary)", marginBottom: 32 }}>Let's configure the identity variables of your ecosystem.</p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: 8 }}>Preferred Name</label>
                  <input type="text" placeholder="e.g. Abdi" value={data.name} onChange={(e) => handleInput('name', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: 8 }}>Avatar Identity</label>
                  <div style={{ display: "flex", gap: 16 }}>
                    {[0, 1, 2].map(idx => (
                      <div key={idx} onClick={() => handleInput('avatarIdx', idx)} style={{ width: 80, height: 80, borderRadius: 20, border: data.avatarIdx === idx ? "3px solid var(--text-primary)" : "2px solid var(--border)", background: "rgba(255,255,255,0.8)", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", opacity: data.avatarIdx === idx ? 1 : 0.6 }}>
                        <img src="/mascot.png" style={{ height: "60%", mixBlendMode: "darken" }} alt="Avatar Pick" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ background: "var(--text-primary)", color: "#fff", width: 48, height: 48, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}><MapPin size={24} /></div>
              <h2 style={{ fontSize: 32, fontWeight: 900, fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)", marginBottom: 8 }}>Academic Context</h2>
              <p style={{ fontSize: 16, color: "var(--text-secondary)", marginBottom: 32 }}>Establishing the organizational bounds of your studies.</p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: 8 }}>Institute / University</label>
                  <input type="text" placeholder="e.g. Stanford University" value={data.institute} onChange={(e) => handleInput('institute', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: 8 }}>Primary Major / Track</label>
                  <input type="text" placeholder="e.g. Computer Science" value={data.major} onChange={(e) => handleInput('major', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: 8 }}>Term Label</label>
                  <input type="text" placeholder="e.g. Fall 2024" value={data.semester} onChange={(e) => handleInput('semester', e.target.value)} style={inputStyle} />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div style={{ background: "var(--text-primary)", color: "#fff", width: 48, height: 48, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}><Target size={24} /></div>
              <h2 style={{ fontSize: 32, fontWeight: 900, fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)", marginBottom: 8 }}>Tracking Baselines</h2>
              <p style={{ fontSize: 16, color: "var(--text-secondary)", marginBottom: 32 }}>We use these to calculate your Improvement Charts.</p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "flex", gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: 8 }}>Current CGPA</label>
                    <input type="number" step="0.01" placeholder="3.50" value={data.currentGpa} onChange={(e) => handleInput('currentGpa', e.target.value)} style={inputStyle} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: 8 }}>GPA Scale</label>
                    <select value={data.scale} onChange={(e) => handleInput('scale', e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                      <option>4.0 Base</option>
                      <option>5.0 Base</option>
                      <option>10.0 Base</option>
                    </select>
                  </div>
                </div>
                
                <div style={{ display: "flex", gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: 8 }}>Previous Term GPA</label>
                    <input type="number" step="0.01" placeholder="e.g. 3.42" value={data.prevGpa} onChange={(e) => handleInput('prevGpa', e.target.value)} style={inputStyle} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "text-primary", marginBottom: 8 }}>Target Goal GPA</label>
                    <input type="number" step="0.01" placeholder="e.g. 3.80" value={data.targetGpa} onChange={(e) => handleInput('targetGpa', e.target.value)} style={{ ...inputStyle, border: "2px solid var(--text-primary)" }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div style={{ background: "var(--text-primary)", color: "#fff", width: 48, height: 48, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}><Clock size={24} /></div>
              <h2 style={{ fontSize: 32, fontWeight: 900, fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)", marginBottom: 8 }}>Productivity Goals</h2>
              <p style={{ fontSize: 16, color: "var(--text-secondary)", marginBottom: 32 }}>Setting up your time-management mechanics.</p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: 8 }}>Weekly Study Hours Goal</label>
                  <input type="number" placeholder="e.g. 15" value={data.studyGoal} onChange={(e) => handleInput('studyGoal', e.target.value)} style={{ ...inputStyle, fontSize: 24 }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: 8 }}>Preferred Pomodoro Focus Chunk</label>
                  <select value={data.focusRoutine} onChange={(e) => handleInput('focusRoutine', e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                    <option>25m Focus / 5m Break</option>
                    <option>50m Focus / 10m Break</option>
                    <option>90m Deep Work / 15m Break</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <div style={{ background: "var(--text-primary)", color: "#fff", width: 48, height: 48, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}><PenTool size={24} /></div>
              <h2 style={{ fontSize: 32, fontWeight: 900, fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)", marginBottom: 8 }}>Classroom Layout</h2>
              <p style={{ fontSize: 16, color: "var(--text-secondary)", marginBottom: 32 }}>Which virtual widgets do you predominantly use?</p>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { id: 'notes', label: "Rich Text Notes" },
                  { id: 'calc', label: "Calculator Tools" },
                  { id: 'flashcards', label: "Interactive Flashcards" },
                  { id: 'code', label: "Code Compiler" }
                ].map(tool => (
                  <div key={tool.id} onClick={() => handleInput('tools', { ...data.tools, [tool.id]: !data.tools[tool.id] })} style={{ 
                    padding: "20px", borderRadius: 16, border: data.tools[tool.id] ? "2px solid var(--text-primary)" : "2px solid var(--border)", 
                    background: data.tools[tool.id] ? "rgba(39,39,42,0.03)" : "rgba(255,255,255,0.8)", cursor: "pointer", transition: "all 0.2s",
                    display: "flex", alignItems: "center", gap: 12, fontWeight: 700, fontSize: 14, color: "var(--text-primary)"
                  }}>
                    <div style={{ width: 20, height: 20, borderRadius: 6, border: "2px solid var(--text-primary)", display: "flex", alignItems: "center", justifyContent: "center", background: data.tools[tool.id] ? "var(--text-primary)" : "transparent" }}>
                      {data.tools[tool.id] && <Check size={14} color="#fff" />}
                    </div>
                    {tool.label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 6 && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <style>{`
                @keyframes pulseRing {
                  0% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(39, 39, 42, 0.4); }
                  70% { transform: scale(1); box-shadow: 0 0 0 40px rgba(39, 39, 42, 0); }
                  100% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(39, 39, 42, 0); }
                }
              `}</style>
              <div style={{ position: "relative", width: 140, height: 140, margin: "0 auto 40px" }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--text-primary)", animation: "pulseRing 2s infinite delay-1s" }} />
                <img src="/mascot.png" style={{ position: "absolute", inset: "-20%", width: "140%", height: "140%", mixBlendMode: "lighten", filter: "brightness(2)" }} alt="Loading Core" />
              </div>
              <h2 style={{ fontSize: 32, fontWeight: 900, fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)", marginBottom: 12 }}>
                Synthesizing Ecosystem
              </h2>
              <p style={{ fontSize: 16, color: "var(--text-muted)", maxWidth: 350, margin: "0 auto" }}>
                Initializing your unique dashboard bounds, populating analytical schemas, and rendering workspaces...
              </p>
            </div>
          )}

          {/* Nav Buttons */}
          {step < 6 && (
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 48 }}>
              {step > 1 ? (
                <button onClick={prevStep} style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 24px", borderRadius: 14, background: "#fff", border: "1px solid var(--border)", color: "var(--text-primary)", fontSize: 15, fontWeight: 800, cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "var(--bg-elevated)"} onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
                  <ArrowLeft size={18} /> Back
                </button>
              ) : <div />}
              
              <button onClick={nextStep} style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 32px", borderRadius: 14, background: "var(--text-primary)", border: "none", color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = "none"}>
                {step === 5 ? "Deploy Workspace" : "Continue"} <ArrowRight size={18} />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
