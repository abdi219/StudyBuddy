import { useState } from "react";
import { Plus, Trash2, RotateCcw, GraduationCap } from "lucide-react";

const scaleTabs = [
  { label: "4.0 Scale", value: "4" },
  { label: "5.0 Scale", value: "5" },
  { label: "10.0 Scale", value: "10" },
];

const gradeOptions = {
  4: [
    { label: "A  (4.0)", value: 4.0 }, { label: "A- (3.7)", value: 3.7 },
    { label: "B+ (3.3)", value: 3.3 }, { label: "B  (3.0)", value: 3.0 },
    { label: "B- (2.7)", value: 2.7 }, { label: "C+ (2.3)", value: 2.3 },
    { label: "C  (2.0)", value: 2.0 }, { label: "C- (1.7)", value: 1.7 },
    { label: "D  (1.0)", value: 1.0 }, { label: "F  (0.0)", value: 0.0 },
  ],
  5: [
    { label: "A+ (5.0)", value: 5.0 }, { label: "A  (4.0)", value: 4.0 },
    { label: "B  (3.0)", value: 3.0 }, { label: "C  (2.0)", value: 2.0 },
    { label: "D  (1.0)", value: 1.0 }, { label: "F  (0.0)", value: 0.0 },
  ],
  10: [
    { label: "O  (10.0)", value: 10.0 }, { label: "A+ (9.0)", value: 9.0 },
    { label: "A  (8.0)", value: 8.0 }, { label: "B+ (7.0)", value: 7.0 },
    { label: "B  (6.0)", value: 6.0 }, { label: "C  (5.0)", value: 5.0 },
    { label: "D  (4.0)", value: 4.0 }, { label: "F  (0.0)", value: 0.0 },
  ],
};

const makeRow = () => ({ id: Date.now() + Math.random(), subject: "", credits: "", grade: "" });

export default function GPACalculator() {
  const [scale, setScale] = useState("4");
  const [rows, setRows] = useState([makeRow(), makeRow(), makeRow()]);
  const [result, setResult] = useState(null);

  const addRow = () => setRows([...rows, makeRow()]);
  const removeRow = (id) => { if (rows.length > 1) setRows(rows.filter((r) => r.id !== id)); };
  const updateRow = (id, field, val) => setRows(rows.map((r) => (r.id === id ? { ...r, [field]: val } : r)));
  const reset = () => { setRows([makeRow(), makeRow(), makeRow()]); setResult(null); };

  const calculate = () => {
    let tc = 0, tp = 0;
    for (const r of rows) {
      const c = parseFloat(r.credits), g = parseFloat(r.grade);
      if (!isNaN(c) && !isNaN(g) && c > 0) { tc += c; tp += c * g; }
    }
    if (tc === 0) return setResult(null);
    setResult({ gpa: (tp / tc).toFixed(2), totalCredits: tc, scale: scale === "4" ? "4.0" : scale === "5" ? "5.0" : "10.0" });
  };

  const opts = gradeOptions[scale] || [];

  const inputStyle = {
    width: "100%", padding: "10px 14px", fontSize: 13,
    border: "1.5px solid var(--border)", borderRadius: 10,
    background: "var(--bg-base)", outline: "none",
    color: "var(--text-primary)", transition: "border-color 0.2s ease",
  };

  return (
    <div style={{ maxWidth: 800 }} className="fade-enter">
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

        {/* Header */}
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)", marginBottom: 6 }}>
            GPA Calculator
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-muted)" }}>Add your courses and calculate your semester GPA.</p>
        </div>

        {/* Scale Tabs */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{
            display: "inline-flex", padding: 4, borderRadius: 12,
            background: "var(--bg-elevated)", border: "1px solid var(--border)",
            gap: 4,
          }}>
            {scaleTabs.map((t) => (
              <button key={t.value} onClick={() => { setScale(t.value); reset(); }} style={{
                padding: "8px 18px", borderRadius: 9, fontSize: 12, fontWeight: scale === t.value ? 600 : 500,
                background: scale === t.value ? "var(--text-primary)" : "transparent",
                color: scale === t.value ? "#fff" : "var(--text-muted)",
                border: "none", cursor: "pointer", transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}>{t.label}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div style={{
          background: "var(--bg-surface)", border: "1px solid var(--border)",
          borderRadius: 16, overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 100px 160px 44px",
            gap: 14, padding: "14px 22px",
            borderBottom: "1px solid var(--border-light)",
          }}>
            {["Subject", "Credits", "Grade", ""].map((h) => (
              <span key={h} style={{
                fontSize: 10, fontWeight: 700, color: "var(--text-faint)",
                textTransform: "uppercase", letterSpacing: "0.06em",
              }}>{h}</span>
            ))}
          </div>

          {/* Rows */}
          <div>
            {rows.map((row, i) => (
              <div key={row.id} style={{
                display: "grid", gridTemplateColumns: "1fr 100px 160px 44px",
                gap: 14, padding: "12px 22px", alignItems: "center",
                borderBottom: i < rows.length - 1 ? "1px solid var(--border-light)" : "none",
                transition: "background 0.2s ease",
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-elevated)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <input type="text" placeholder={`Subject ${i + 1}`}
                  value={row.subject} onChange={(e) => updateRow(row.id, "subject", e.target.value)}
                  style={inputStyle} />
                <input type="number" placeholder="3" min="0" max="10"
                  value={row.credits} onChange={(e) => updateRow(row.id, "credits", e.target.value)}
                  style={{ ...inputStyle, textAlign: "center" }} />
                <select value={row.grade} onChange={(e) => updateRow(row.id, "grade", e.target.value)}
                  style={{ ...inputStyle, cursor: "pointer" }}>
                  <option value="">Select</option>
                  {opts.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <button onClick={() => removeRow(row.id)} style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--text-faint)", display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#c0392b"; e.currentTarget.style.background = "#fef0f0"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-faint)"; e.currentTarget.style.background = "none"; }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px 22px", borderTop: "1px solid var(--border-light)",
          }}>
            <button onClick={addRow} style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 12, fontWeight: 600, color: "var(--text-primary)",
              background: "none", border: "none", cursor: "pointer",
              padding: "6px 12px", borderRadius: 8,
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-elevated)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "none"}
            >
              <Plus size={14} /> Add Subject
            </button>
            <button onClick={reset} style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              fontSize: 11, color: "var(--text-faint)",
              background: "none", border: "none", cursor: "pointer",
            }}>
              <RotateCcw size={12} /> Reset
            </button>
          </div>
        </div>

        {/* Calculate Button */}
        <button onClick={calculate} className="btn btn-primary" style={{
          padding: "14px 32px", fontSize: 14, alignSelf: "flex-start",
        }}>
          Calculate GPA
        </button>

        {/* Result */}
        {result && (
          <div style={{
            background: "var(--bg-surface)", border: "1px solid var(--border)",
            borderRadius: 16, padding: 36, textAlign: "center",
            animation: "fadeInUp 0.4s ease-out",
          }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
              Your Semester GPA ({result.scale} Scale)
            </p>
            <p style={{
              fontSize: 48, fontWeight: 800, color: "var(--text-primary)",
              fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1, marginBottom: 8,
            }}>
              {result.gpa}
            </p>
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Based on {result.totalCredits} credit hours</p>
          </div>
        )}

        {/* Coming Soon */}
        <div style={{
          background: "var(--bg-surface)", border: "1.5px dashed var(--border)",
          borderRadius: 14, padding: "18px 22px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>Custom Grading Weights</h3>
            <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>Configure quiz, mid-term, and final exam weight distribution.</p>
          </div>
          <span style={{
            fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em",
            color: "var(--text-faint)", background: "var(--bg-elevated)",
            padding: "4px 12px", borderRadius: 20,
          }}>Coming Soon</span>
        </div>
      </div>
    </div>
  );
}
