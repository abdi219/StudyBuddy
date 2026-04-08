import { useState } from "react";
import { CalendarDays, Plus, Trash2, Clock } from "lucide-react";
import StudentDoodles from "../../components/ui/StudentDoodles";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const HOURS = Array.from({ length: 14 }, (_, i) => i + 7); // 7 AM to 8 PM
const COLORS = [
  { name: "Blue", value: "#5b5bd6", bg: "#ededfc" },
  { name: "Green", value: "#2d9d78", bg: "#e6f7f0" },
  { name: "Orange", value: "#e5a31d", bg: "#fef6e0" },
  { name: "Red", value: "#d14343", bg: "#fde8e8" },
  { name: "Purple", value: "#9333ea", bg: "#f3e8ff" },
  { name: "Pink", value: "#ec4899", bg: "#fce7f3" },
];

const initialBlocks = [
  { id: 1, day: 0, startHour: 9, endHour: 11, subject: "Data Structures", colorIdx: 0 },
  { id: 2, day: 1, startHour: 14, endHour: 16, subject: "OOP Concepts", colorIdx: 1 },
  { id: 3, day: 2, startHour: 10, endHour: 12, subject: "Linear Algebra", colorIdx: 2 },
  { id: 4, day: 3, startHour: 13, endHour: 15, subject: "Database Systems", colorIdx: 3 },
  { id: 5, day: 4, startHour: 9, endHour: 10, subject: "Algorithms", colorIdx: 4 },
];

export default function StudyPlannerPage() {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [showAdd, setShowAdd] = useState(false);
  const [newBlock, setNewBlock] = useState({ subject: "", day: 0, startHour: 9, endHour: 10, colorIdx: 0 });

  const addBlock = () => {
    if (!newBlock.subject.trim()) return;
    setBlocks([...blocks, { ...newBlock, id: Date.now() }]);
    setNewBlock({ subject: "", day: 0, startHour: 9, endHour: 10, colorIdx: 0 });
    setShowAdd(false);
  };

  const removeBlock = (id) => setBlocks(blocks.filter((b) => b.id !== id));

  const totalHours = blocks.reduce((sum, b) => sum + (b.endHour - b.startHour), 0);

  return (
    <div style={{ maxWidth: 1100, position: "relative" }} className="fade-enter">
      <StudentDoodles count={10} opacity={0.15} seed={55} color="var(--text-primary)" />
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 24 }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{
              fontSize: 26, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif",
              color: "var(--text-primary)", marginBottom: 4,
            }}>
              Study Planner
            </h1>
            <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
              Plan your study week • {totalHours} hours scheduled
            </p>
          </div>
          <button onClick={() => setShowAdd(!showAdd)} className="btn btn-primary" style={{ padding: "10px 18px", fontSize: 13 }}>
            <Plus size={15} /> Add Block
          </button>
        </div>

        {/* Add Form */}
        {showAdd && (
          <div style={{
            background: "var(--bg-surface)", border: "1.5px dashed var(--border-accent)",
            borderRadius: "var(--radius-lg)", padding: 24,
            display: "flex", flexWrap: "wrap", gap: 14, alignItems: "flex-end",
            animation: "fadeInUp 0.3s ease-out",
          }}>
            <div style={{ flex: "1 1 160px" }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Subject</label>
              <input type="text" placeholder="e.g. Data Structures" value={newBlock.subject}
                onChange={(e) => setNewBlock({ ...newBlock, subject: e.target.value })}
                style={{
                  width: "100%", marginTop: 6, padding: "10px 14px", fontSize: 13,
                  border: "1.5px solid var(--border)", borderRadius: "var(--radius-sm)",
                  background: "var(--bg-base)", outline: "none",
                }} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Day</label>
              <select value={newBlock.day} onChange={(e) => setNewBlock({ ...newBlock, day: +e.target.value })}
                style={{ marginTop: 6, padding: "10px 14px", fontSize: 13, border: "1.5px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--bg-base)" }}>
                {DAYS.map((d, i) => <option key={i} value={i}>{d}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Start</label>
              <select value={newBlock.startHour} onChange={(e) => setNewBlock({ ...newBlock, startHour: +e.target.value })}
                style={{ marginTop: 6, padding: "10px 14px", fontSize: 13, border: "1.5px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--bg-base)" }}>
                {HOURS.map((h) => <option key={h} value={h}>{h}:00</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>End</label>
              <select value={newBlock.endHour} onChange={(e) => setNewBlock({ ...newBlock, endHour: +e.target.value })}
                style={{ marginTop: 6, padding: "10px 14px", fontSize: 13, border: "1.5px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--bg-base)" }}>
                {HOURS.filter((h) => h > newBlock.startHour).map((h) => <option key={h} value={h}>{h}:00</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Color</label>
              <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                {COLORS.map((c, i) => (
                  <div key={i} onClick={() => setNewBlock({ ...newBlock, colorIdx: i })}
                    style={{
                      width: 28, height: 28, borderRadius: "50%", background: c.value, cursor: "pointer",
                      border: newBlock.colorIdx === i ? "3px solid var(--text-primary)" : "2px solid transparent",
                      transition: "all 0.2s ease",
                    }} />
                ))}
              </div>
            </div>
            <button onClick={addBlock} className="btn btn-primary" style={{ padding: "10px 18px", fontSize: 13 }}>Add</button>
          </div>
        )}

        {/* Timetable Grid */}
        <div style={{
          background: "var(--bg-surface)", border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)", overflow: "hidden",
        }}>
          <div style={{
            display: "grid", gridTemplateColumns: "60px repeat(7, 1fr)",
            borderBottom: "1px solid var(--border)",
          }}>
            <div style={{ padding: 12, borderRight: "1px solid var(--border-light)" }} />
            {DAYS.map((d) => (
              <div key={d} style={{
                padding: "12px 8px", textAlign: "center",
                fontSize: 12, fontWeight: 700, color: "var(--text-secondary)",
                textTransform: "uppercase", letterSpacing: "0.04em",
                borderRight: "1px solid var(--border-light)",
              }}>
                {d.slice(0, 3)}
              </div>
            ))}
          </div>

          {HOURS.map((hour, hIdx) => (
            <div key={hour} style={{
              display: "grid", gridTemplateColumns: "60px repeat(7, 1fr)",
              minHeight: 48,
              borderBottom: hIdx < HOURS.length - 1 ? "1px solid var(--border-light)" : "none",
            }}>
              <div style={{
                padding: "4px 8px", fontSize: 11, color: "var(--text-faint)",
                textAlign: "right", borderRight: "1px solid var(--border-light)",
                paddingTop: 6,
              }}>
                {hour}:00
              </div>
              {DAYS.map((_, dayIdx) => {
                const block = blocks.find((b) => b.day === dayIdx && hour >= b.startHour && hour < b.endHour);
                const isStart = block && hour === block.startHour;
                const c = block ? COLORS[block.colorIdx] : null;
                return (
                  <div key={dayIdx} style={{
                    borderRight: "1px solid var(--border-light)",
                    position: "relative", padding: 2,
                  }}>
                    {isStart && (
                      <div style={{
                        position: "absolute", top: 2, left: 2, right: 2,
                        height: `${(block.endHour - block.startHour) * 48 - 4}px`,
                        background: c.bg, border: `1.5px solid ${c.value}40`,
                        borderRadius: 8, padding: "6px 8px",
                        zIndex: 2, cursor: "default",
                        transition: "all 0.2s ease",
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = `0 4px 12px ${c.value}20`; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                      >
                        <div style={{
                          fontSize: 11, fontWeight: 700, color: c.value,
                          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                        }}>{block.subject}</div>
                        <div style={{ fontSize: 10, color: c.value, opacity: 0.6, marginTop: 2 }}>
                          {block.startHour}:00 – {block.endHour}:00
                        </div>
                        <button onClick={() => removeBlock(block.id)} style={{
                          position: "absolute", top: 4, right: 4, background: "none",
                          border: "none", cursor: "pointer", color: c.value, opacity: 0.4,
                          padding: 2,
                        }}
                          onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
                          onMouseLeave={(e) => e.currentTarget.style.opacity = "0.4"}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
