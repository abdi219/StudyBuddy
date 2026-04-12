import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCommand } from "../../context/CommandContext";
import {
  Terminal, ChevronRight, Clock, Calendar, Zap, Coffee, BookOpen,
  RotateCcw, HelpCircle, X
} from "lucide-react";

// ─── Quick-suggestion chips shown before user types ────────────────────────
const SUGGESTIONS = [
  { icon: Clock,     label: "/timer 25",                  desc: "Start 25-min timer" },
  { icon: BookOpen,  label: "/pomodoro",                  desc: "Start focus session" },
  { icon: Coffee,    label: "/break short",               desc: "Take a 5-min break" },
  { icon: Calendar,  label: "/add Math Monday 9-11",      desc: "Add subject to planner" },
  { icon: Zap,       label: "/break long",                desc: "Long break (15 min)" },
  { icon: RotateCcw, label: "/reset",                     desc: "Reset timer" },
  { icon: HelpCircle,label: "/help",                      desc: "See all commands" },
];

// ─── History ring (last 30 commands, persisted per session) ────────────────
const cmdHistory = [];

export default function CommandBar({ onClose }) {
  const { executeCommand } = useCommand();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [value, setValue] = useState("");
  const [histIdx, setHistIdx] = useState(-1);
  const [filteredSuggestions, setFilteredSuggestions] = useState(SUGGESTIONS);
  const [activeSugg, setActiveSugg] = useState(-1);

  // auto-focus
  useEffect(() => { inputRef.current?.focus(); }, []);

  // filter suggestions as user types
  useEffect(() => {
    if (!value) {
      setFilteredSuggestions(SUGGESTIONS);
    } else {
      setFilteredSuggestions(
        SUGGESTIONS.filter(s => s.label.includes(value.toLowerCase()) || s.desc.toLowerCase().includes(value.toLowerCase()))
      );
    }
    setActiveSugg(-1);
  }, [value]);

  const submit = useCallback((cmd) => {
    const text = (cmd ?? value).trim();
    if (!text) return;
    if (text.startsWith("/")) {
      executeCommand(text);
    } else {
      // Navigate shortcuts (no slash)
      const nav = {
        "dashboard": "/dashboard", "home": "/dashboard",
        "notes": "/notes", "planner": "/planner", "plan": "/planner",
        "pomodoro": "/pomodoro", "timer": "/pomodoro", "gpa": "/gpa",
        "classroom": "/classroom", "analytics": "/analytics",
      };
      const dest = nav[text.toLowerCase()];
      if (dest) {
        navigate(dest);
      } else {
        executeCommand("/" + text); // try as command anyway
      }
    }
    if (text && cmdHistory[0] !== text) cmdHistory.unshift(text);
    if (cmdHistory.length > 30) cmdHistory.pop();
    onClose();
  }, [value, executeCommand, navigate, onClose]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (activeSugg >= 0 && filteredSuggestions[activeSugg]) {
        setValue(filteredSuggestions[activeSugg].label);
        submit(filteredSuggestions[activeSugg].label);
      } else {
        submit();
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (activeSugg > 0) {
        setActiveSugg(a => a - 1);
        setValue(filteredSuggestions[activeSugg - 1]?.label || value);
      } else if (histIdx < cmdHistory.length - 1) {
        const next = histIdx + 1;
        setHistIdx(next);
        setValue(cmdHistory[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (activeSugg < filteredSuggestions.length - 1) {
        setActiveSugg(a => a + 1);
        setValue(filteredSuggestions[activeSugg + 1]?.label || value);
      } else if (histIdx > 0) {
        const next = histIdx - 1;
        setHistIdx(next);
        setValue(cmdHistory[next]);
      } else {
        setHistIdx(-1);
        setValue("");
      }
    } else if (e.key === "Escape") {
      onClose();
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (filteredSuggestions[0]) setValue(filteredSuggestions[0].label);
    }
  };

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          zIndex: 9998,
          animation: "fadeIn 0.15s ease",
        }}
      />

      {/* ── Panel ── */}
      <div
        style={{
          position: "fixed",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(640px, 92vw)",
          zIndex: 9999,
          animation: "cmdSlideIn 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Search bar */}
        <div style={{
          background: "rgba(255,255,255,0.95)",
          borderRadius: 20,
          border: "1.5px solid rgba(0,0,0,0.1)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.8)",
          overflow: "hidden",
        }}>
          {/* Input row */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "16px 20px",
            borderBottom: filteredSuggestions.length > 0 ? "1px solid rgba(0,0,0,0.07)" : "none",
          }}>
            <Terminal size={20} style={{ color: "var(--accent)", flexShrink: 0 }} />
            <input
              ref={inputRef}
              value={value}
              onChange={e => { setValue(e.target.value); setHistIdx(-1); }}
              onKeyDown={handleKeyDown}
              placeholder="Type a command or page name… (e.g. /timer 25  ·  /add Math Mon 9-11)"
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                fontSize: 16, color: "var(--text-primary)",
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
              }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <kbd style={{
                fontSize: 10, padding: "3px 6px", borderRadius: 5,
                background: "#f1f0ef", border: "1px solid #ddd",
                color: "#888", fontFamily: "monospace", fontWeight: 700,
              }}>ESC</kbd>
              <button onClick={onClose} style={{
                padding: 4, background: "none", border: "none",
                cursor: "pointer", color: "var(--text-faint)",
                display: "flex", transition: "color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--text-primary)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--text-faint)"}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Suggestions list */}
          {filteredSuggestions.length > 0 && (
            <div style={{ maxHeight: 340, overflowY: "auto" }}>
              {filteredSuggestions.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === activeSugg;
                return (
                  <div
                    key={s.label}
                    onClick={() => { setValue(s.label); submit(s.label); }}
                    onMouseEnter={() => setActiveSugg(i)}
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "11px 20px", cursor: "pointer",
                      background: isActive ? "rgba(91,91,214,0.07)" : "transparent",
                      transition: "background 0.12s",
                      borderBottom: "1px solid rgba(0,0,0,0.04)",
                    }}
                  >
                    <div style={{
                      width: 34, height: 34, borderRadius: 10,
                      background: isActive ? "var(--accent)" : "rgba(0,0,0,0.05)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.15s", flexShrink: 0,
                    }}>
                      <Icon size={16} style={{ color: isActive ? "#fff" : "var(--text-secondary)" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: 13, fontWeight: 700,
                        color: "var(--text-primary)",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}>{s.label}</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 1 }}>{s.desc}</div>
                    </div>
                    <ChevronRight size={14} style={{ color: "var(--text-faint)", opacity: isActive ? 1 : 0 }} />
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer hint */}
          <div style={{
            display: "flex", gap: 16, padding: "8px 20px",
            borderTop: "1px solid rgba(0,0,0,0.05)",
            background: "rgba(0,0,0,0.02)",
          }}>
            {[
              ["↑↓", "navigate"],
              ["↵", "run"],
              ["Tab", "autocomplete"],
              ["Esc", "close"],
            ].map(([key, label]) => (
              <span key={key} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--text-faint)" }}>
                <kbd style={{
                  fontSize: 10, padding: "2px 5px", borderRadius: 4,
                  background: "#f1f0ef", border: "1px solid #ddd",
                  fontFamily: "monospace", color: "#666",
                }}>{key}</kbd>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
