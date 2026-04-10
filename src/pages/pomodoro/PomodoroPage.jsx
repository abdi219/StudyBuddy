import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Coffee, BookOpen, Zap } from "lucide-react";
import StudentDoodles from "../../components/ui/StudentDoodles";

const MODES = [
  { key: "focus", label: "Focus", duration: 25 * 60, icon: BookOpen },
  { key: "short", label: "Short Break", duration: 5 * 60, icon: Coffee },
  { key: "long", label: "Long Break", duration: 15 * 60, icon: Zap },
];

const quotes = [
  "The secret of getting ahead is getting started. — Mark Twain",
  "It always seems impossible until it's done. — Nelson Mandela",
  "Don't watch the clock; do what it does. Keep going. — Sam Levenson",
  "The only way to do great work is to love what you do. — Steve Jobs",
  "Believe you can and you're halfway there. — Theodore Roosevelt",
  "Success is the sum of small efforts repeated day in and day out.",
  "What we learn with pleasure we never forget. — Alfred Mercier",
  "Education is not filling a bucket, but lighting a fire. — W.B. Yeats",
];

export default function PomodoroPage() {
  const [modeIdx, setModeIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(MODES[0].duration);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef(null);

  const mode = MODES[modeIdx];
  const progress = 1 - timeLeft / mode.duration;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const quote = quotes[new Date().getDate() % quotes.length];

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else {
      clearInterval(intervalRef.current);
      if (timeLeft === 0 && running) {
        setRunning(false);
        if (modeIdx === 0) setSessions((s) => s + 1);
      }
    }
    return () => clearInterval(intervalRef.current);
  }, [running, timeLeft, modeIdx]);

  const switchMode = (idx) => {
    setModeIdx(idx);
    setTimeLeft(MODES[idx].duration);
    setRunning(false);
  };

  const reset = () => { setTimeLeft(mode.duration); setRunning(false); };

  const circumference = 2 * Math.PI * 120;
  const dashOffset = circumference * (1 - progress);

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }} className="fade-enter">
      <StudentDoodles count={10} opacity={0.15} seed={88} color="var(--text-primary)" />
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 28, alignItems: "center" }}>

        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <h1 style={{
            fontSize: 26, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif",
            color: "var(--text-primary)", marginBottom: 4,
          }}>
            Pomodoro Timer
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
            Stay focused, take breaks, build momentum
          </p>
        </div>

        {/* Mode Tabs */}
        <div style={{
          display: "flex", gap: 6, background: "var(--bg-elevated)",
          padding: 5, borderRadius: "var(--radius-full)",
          border: "1px solid var(--border)",
        }}>
          {MODES.map((m, i) => (
            <button key={m.key} onClick={() => switchMode(i)} style={{
              padding: "8px 18px", borderRadius: "var(--radius-full)",
              fontSize: 13, fontWeight: modeIdx === i ? 600 : 500,
              background: modeIdx === i ? "var(--text-primary)" : "transparent",
              color: modeIdx === i ? "#fff" : "var(--text-secondary)",
              border: "none", cursor: "pointer",
              transition: "all 0.25s ease",
            }}>
              {m.label}
            </button>
          ))}
        </div>

        {/* Timer Circle */}
        <div style={{ position: "relative", width: 280, height: 280 }}>
          <svg width="280" height="280" style={{ transform: "rotate(-90deg)" }}>
            {/* Background ring */}
            <circle cx="140" cy="140" r="120" fill="none" stroke="var(--border)" strokeWidth="8" />
            {/* Progress ring */}
            <circle cx="140" cy="140" r="120" fill="none"
              stroke="var(--text-primary)" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circumference} strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 0.5s ease" }}
            />
          </svg>
          <div style={{
            position: "absolute", inset: 0, display: "flex",
            flexDirection: "column", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{
              fontSize: 56, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif",
              color: "var(--text-primary)", lineHeight: 1,
              animation: running ? "none" : "doodleFloat 3s ease-in-out infinite",
            }}>
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 8 }}>
              {mode.label}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: 14 }}>
          <button onClick={() => setRunning(!running)} style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "var(--text-primary)", color: "#fff", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", fontSize: 22,
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            {running ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: 2 }} />}
          </button>
          <button onClick={reset} style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "var(--bg-surface)", border: "1.5px solid var(--border)",
            color: "var(--text-secondary)", display: "flex",
            alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "all 0.2s ease",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-elevated)"; e.currentTarget.style.transform = "scale(1.05)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg-surface)"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            <RotateCcw size={20} />
          </button>
        </div>

        {/* Session Counter */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 20px", borderRadius: "var(--radius-full)",
          background: "var(--bg-elevated)", border: "1.5px dashed var(--border)",
        }}>
          <Zap size={16} style={{ color: "var(--text-primary)" }} />
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>
            {sessions} sessions completed today
          </span>
        </div>

        {/* Quote */}
        <div style={{
          maxWidth: 500, textAlign: "center",
          padding: "20px 28px", borderRadius: "var(--radius-lg)",
          background: "var(--bg-surface)", border: "1px solid var(--border)",
          boxShadow: "var(--shadow-sm)",
        }}>
          <p style={{
            fontSize: 14, fontStyle: "italic", color: "var(--text-secondary)",
            lineHeight: 1.7,
          }}>
            "{quote}"
          </p>
        </div>
      </div>
    </div>
  );
}
