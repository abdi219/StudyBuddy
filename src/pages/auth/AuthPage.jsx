import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import StudentDoodles from "../../components/ui/StudentDoodles";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    navigate("/onboarding");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-base)", overflow: "hidden" }}>

      {/* ── Left Side: Full-panel Mascot Video ── */}
      <div style={{
        flex: 1, position: "relative",
        borderRight: "1px solid var(--border-light)", overflow: "hidden",
        background: "#faf9f6"
      }}>
        {/* Video fills the entire left panel — plays once then stops */}
        <video
          src="/Chibi_Student_Waving_and_Pointing.mp4"
          autoPlay
          muted
          playsInline
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            mixBlendMode: "multiply",
            filter: "sepia(0.15) saturate(0.9) brightness(1.02)"
          }}
        />

        {/* Subtle doodles layered on top of video */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <StudentDoodles count={20} opacity={0.06} seed={404} color="var(--text-primary)" />
        </div>

        {/* Brand overlay in bottom-left corner */}
        <div style={{
          position: "absolute", bottom: 32, left: 32, zIndex: 10,
          display: "flex", alignItems: "center", gap: 12, pointerEvents: "none"
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12, background: "var(--text-primary)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "var(--shadow-md)"
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 800, color: "var(--text-primary)", fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.2 }}>
              Abdi's Library
            </p>
            <p style={{ fontSize: 11, fontWeight: 500, color: "var(--text-muted)" }}>
              Your study space, redefined.
            </p>
          </div>
        </div>
      </div>

      {/* ── Right Side: Auth Form ── */}
      <div style={{
        flex: "0 0 500px", position: "relative", padding: "60px",
        display: "flex", flexDirection: "column", justifyContent: "center",
        background: "rgba(255,255,255,0.4)", backdropFilter: "blur(20px)"
      }}>
        <style>{`
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}</style>

        <div style={{ width: "100%", maxWidth: 380, margin: "0 auto", animation: "slideInRight 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>

          {/* Login / Signup Toggle */}
          <div style={{
            background: "var(--bg-elevated)", padding: 5, borderRadius: 14,
            display: "flex", gap: 5, marginBottom: 36, border: "1px solid var(--border-light)"
          }}>
            {[{ label: "Sign In", val: true }, { label: "New Account", val: false }].map((t) => (
              <button key={t.label} onClick={() => setIsLogin(t.val)} style={{
                flex: 1, padding: 10, borderRadius: 11, border: "none", fontSize: 13,
                fontWeight: 700, cursor: "pointer", transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                fontFamily: "'Inter', sans-serif",
                background: isLogin === t.val ? "var(--text-primary)" : "transparent",
                color: isLogin === t.val ? "#fff" : "var(--text-secondary)",
                boxShadow: isLogin === t.val ? "0 4px 12px rgba(0,0,0,0.1)" : "none"
              }}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Heading */}
          <h2 style={{
            fontSize: 28, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif",
            color: "var(--text-primary)", marginBottom: 6
          }}>
            {isLogin ? "Welcome back" : "Join the library"}
          </h2>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 28 }}>
            {isLogin
              ? "Enter your credentials to access your dashboard."
              : "Create an account to start configuring your workspace."}
          </p>

          {/* Form */}
          <form onSubmit={handleAuth} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {!isLogin && (
              <input type="text" placeholder="Full Name" required style={{
                width: "100%", padding: "13px 16px", fontSize: 14,
                border: "1.5px solid var(--border)", borderRadius: 12,
                background: "rgba(255,255,255,0.7)", outline: "none",
                color: "var(--text-primary)", fontWeight: 600,
                fontFamily: "'Inter', sans-serif", transition: "border-color 0.2s"
              }} />
            )}

            <div style={{ position: "relative" }}>
              <Mail size={17} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-faint)" }} />
              <input type="email" placeholder="Student Email" required style={{
                width: "100%", padding: "13px 16px 13px 42px", fontSize: 14,
                border: "1.5px solid var(--border)", borderRadius: 12,
                background: "rgba(255,255,255,0.7)", outline: "none",
                color: "var(--text-primary)", fontWeight: 600,
                fontFamily: "'Inter', sans-serif", transition: "border-color 0.2s"
              }} />
            </div>

            <div style={{ position: "relative" }}>
              <Lock size={17} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-faint)" }} />
              <input type="password" placeholder="Password" required style={{
                width: "100%", padding: "13px 16px 13px 42px", fontSize: 14,
                border: "1.5px solid var(--border)", borderRadius: 12,
                background: "rgba(255,255,255,0.7)", outline: "none",
                color: "var(--text-primary)", fontWeight: 600,
                fontFamily: "'Inter', sans-serif", transition: "border-color 0.2s"
              }} />
            </div>

            {isLogin && (
              <a href="#" style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)", alignSelf: "flex-end", opacity: 0.6 }}>
                Reset Password?
              </a>
            )}

            <button type="submit" style={{
              marginTop: 6, padding: 15, borderRadius: 12, border: "none",
              background: "var(--text-primary)", color: "#fff", fontSize: 14,
              fontWeight: 800, cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center", gap: 10,
              boxShadow: "0 6px 20px rgba(0,0,0,0.12)", transition: "all 0.2s",
              fontFamily: "'Inter', sans-serif"
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
            >
              {isLogin ? "Proceed to Dashboard" : "Create My Account"}
              <ArrowRight size={17} />
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "28px 0" }}>
            <div style={{ flex: 1, height: 1, background: "var(--border-light)" }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Or</span>
            <div style={{ flex: 1, height: 1, background: "var(--border-light)" }} />
          </div>

          {/* Social login */}
          <button style={{
            width: "100%", padding: 13, borderRadius: 12,
            border: "1.5px solid var(--border)", background: "#fff",
            fontSize: 13, fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            transition: "all 0.2s", fontFamily: "'Inter', sans-serif",
            color: "var(--text-secondary)"
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-elevated)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
          >
            <svg viewBox="0 0 24 24" width="17" height="17">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
