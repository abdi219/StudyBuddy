import { createContext, useContext, useState, useRef } from "react";

// ─── Color palette for subjects auto-added via commands ───
const COLORS = [
  { name: "Blue", value: "#5b5bd6", bg: "#ededfc" },
  { name: "Green", value: "#2d9d78", bg: "#e6f7f0" },
  { name: "Orange", value: "#e5a31d", bg: "#fef6e0" },
  { name: "Red", value: "#d14343", bg: "#fde8e8" },
  { name: "Purple", value: "#9333ea", bg: "#f3e8ff" },
  { name: "Pink", value: "#ec4899", bg: "#fce7f3" },
];

// ─── Day name → index map ───
export const DAY_MAP = {
  monday: 0, mon: 0,
  tuesday: 1, tue: 1,
  wednesday: 2, wed: 2,
  thursday: 3, thu: 3,
  friday: 4, fri: 4,
  saturday: 5, sat: 5,
  sunday: 6, sun: 6,
};

export const CommandContext = createContext(null);

export function CommandProvider({ children }) {
  // ── Pomodoro shared state ──
  const [pomodoroMode, setPomodoroMode] = useState(null);   // { duration: number } signal
  const pomodoroTriggerRef = useRef(null);                  // callback injected by PomodoroPage

  // ── Planner shared state ──
  const plannerAddRef = useRef(null);                       // callback injected by StudyPlannerPage

  // ── Toast notifications ──
  const [toasts, setToasts] = useState([]);
  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  // ── Command execution engine ──
  const executeCommand = (raw) => {
    const input = raw.trim().toLowerCase();
    const original = raw.trim();

    // ─── /timer [minutes] ───────────────────────────────
    //  Examples: /timer 25   /timer 45min
    const timerMatch = input.match(/^\/timer\s+(\d+)(?:m(?:in)?)?$/);
    if (timerMatch) {
      const mins = parseInt(timerMatch[1]);
      if (mins < 1 || mins > 180) return showToast("Timer must be between 1 and 180 minutes.", "error");
      if (pomodoroTriggerRef.current) {
        pomodoroTriggerRef.current({ type: "custom", duration: mins * 60 });
        return showToast(`⏱ Timer set to ${mins} minutes! Go to Pomodoro to see it.`);
      }
      return showToast("Open the Pomodoro page first, then try again.", "error");
    }

    // ─── /pomodoro  (start default 25min focus) ─────────
    if (input === "/pomodoro" || input === "/focus") {
      if (pomodoroTriggerRef.current) {
        pomodoroTriggerRef.current({ type: "focus" });
        return showToast("🎯 25-min Focus session started!");
      }
      return showToast("Open the Pomodoro page first, then try again.", "error");
    }

    // ─── /break [short|long|5|15] ───────────────────────
    const breakMatch = input.match(/^\/break(?:\s+(short|long|\d+))?$/);
    if (breakMatch) {
      const arg = breakMatch[1] || "short";
      const isLong = arg === "long" || parseInt(arg) >= 10;
      if (pomodoroTriggerRef.current) {
        pomodoroTriggerRef.current({ type: isLong ? "long" : "short" });
        return showToast(isLong ? "☕ Long break started (15 min)!" : "🍃 Short break started (5 min)!");
      }
      return showToast("Open the Pomodoro page first, then try again.", "error");
    }

    // ─── /add [subject] [day] [start]-[end] ─────────────
    //  Examples:
    //   /add Math Monday 9-11
    //   /add "Data Structures" Wed 14-16
    const addMatch = original.match(
      /^\/add\s+["']?(.+?)["']?\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thu|fri|sat|sun)\s+(\d{1,2})[-–:](\d{1,2})/i
    );
    if (addMatch) {
      const subject = addMatch[1].trim();
      const dayKey = addMatch[2].toLowerCase();
      const dayIdx = DAY_MAP[dayKey];
      const startHour = parseInt(addMatch[3]);
      const endHour = parseInt(addMatch[4]);

      if (startHour >= endHour) return showToast("Start time must be before end time.", "error");
      if (startHour < 0 || endHour > 23) return showToast("Hours must be between 0 and 23.", "error");

      const colorIdx = Math.floor(Math.random() * COLORS.length);
      const block = { id: Date.now(), day: dayIdx, startHour, endHour, subject, colorIdx };

      if (plannerAddRef.current) {
        plannerAddRef.current(block);
        return showToast(`📅 "${subject}" added to ${addMatch[2]} ${startHour}:00–${endHour}:00!`);
      }
      return showToast("Open the Study Planner first, then try again.", "error");
    }

    // ─── /clear-timer ────────────────────────────────────
    if (input === "/clear" || input === "/reset") {
      if (pomodoroTriggerRef.current) {
        pomodoroTriggerRef.current({ type: "reset" });
        return showToast("🔄 Timer reset.");
      }
      return showToast("Nothing to reset.", "error");
    }

    // ─── /help ───────────────────────────────────────────
    if (input === "/help" || input === "help" || input === "?") {
      return showToast("Commands: /timer [min] · /pomodoro · /break · /add [subject] [day] [start]-[end]", "info");
    }

    // ─── Unknown command ─────────────────────────────────
    showToast(`Unknown command: "${original}". Type /help for a list.`, "error");
  };

  return (
    <CommandContext.Provider value={{
      executeCommand,
      pomodoroTriggerRef,
      plannerAddRef,
      toasts,
      showToast,
      COLORS,
    }}>
      {children}
    </CommandContext.Provider>
  );
}

export const useCommand = () => useContext(CommandContext);
