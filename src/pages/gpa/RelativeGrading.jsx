import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2, RotateCcw, Calculator, BarChart3, Settings, DownloadX } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from "recharts";

const makeStudent = () => ({ id: Date.now() + Math.random(), name: "", score: "" });

export default function RelativeGrading() {
  const [students, setStudents] = useState([makeStudent(), makeStudent(), makeStudent(), makeStudent(), makeStudent()]);
  const [stats, setStats] = useState(null);
  
  // Custom Settings
  const [bounds, setBounds] = useState({ A: 1.5, B: 0.5, C: -0.5, D: -1.5 });
  const [showSettings, setShowSettings] = useState(false);

  const addStudent = () => setStudents([...students, makeStudent()]);
  const removeStudent = (id) => { if (students.length > 1) setStudents(students.filter((s) => s.id !== id)); };
  const updateStudent = (id, field, val) => setStudents(students.map((s) => (s.id === id ? { ...s, [field]: val } : s)));
  const updateBound = (grade, val) => setBounds(prev => ({ ...prev, [grade]: parseFloat(val) || 0 }));
  const reset = () => { setStudents([makeStudent(), makeStudent(), makeStudent(), makeStudent(), makeStudent()]); setStats(null); };

  // Helper approx for Normal CDF to get percentile
  function getPercentile(z) {
    const p = 0.3275911;
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429;
    const sign = z < 0 ? -1 : 1;
    const x = Math.abs(z) / Math.sqrt(2.0);
    const t = 1.0 / (1.0 + p * x);
    const erf = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return Math.round(0.5 * (1.0 + sign * erf) * 100);
  }

  const exportCSV = () => {
    if (!stats) return;
    const header = "Student,Score,Z-Score,Percentile,Grade\n";
    const rows = stats.gradedStudents.map(s => `${s.name},${s.score},${s.zScore},${s.percentile}%,${s.grade}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "relative_grades.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const calculateCurve = () => {
    const validStudents = students.filter(s => {
      const score = parseFloat(s.score);
      return s.name.trim() !== "" && !isNaN(score) && score >= 0;
    });

    if (validStudents.length < 2) {
      alert("Please enter at least 2 valid students to generate a curve.");
      return;
    }

    const scores = validStudents.map(s => parseFloat(s.score));
    const n = scores.length;
    const mean = scores.reduce((a, b) => a + b, 0) / n;
    const variance = scores.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance) || 1;

    const gradedStudents = validStudents.map(s => {
      const score = parseFloat(s.score);
      const zScore = (score - mean) / stdDev;
      const percentile = getPercentile(zScore);
      let grade = "C";
      if (zScore >= bounds.A) grade = "A";
      else if (zScore >= bounds.B) grade = "B";
      else if (zScore >= bounds.C) grade = "C";
      else if (zScore >= bounds.D) grade = "D";
      else grade = "F";

      return { ...s, score, zScore: zScore.toFixed(2), percentile, grade };
    }).sort((a, b) => b.score - a.score);

    const curvePoints = [];
    const minX = mean - 3.5 * stdDev;
    const maxX = mean + 3.5 * stdDev;
    const step = (maxX - minX) / 100;

    for (let x = minX; x <= maxX; x += step) {
      const exponent = Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
      const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * exponent;
      curvePoints.push({ x: Number(x.toFixed(1)), probability: y });
    }

    setStats({
      mean: mean.toFixed(2), stdDev: stdDev.toFixed(2),
      highest: Math.max(...scores).toFixed(1), count: n,
      gradedStudents, curvePoints
    });
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px", fontSize: 13,
    border: "1.5px solid var(--border)", borderRadius: 10,
    background: "var(--bg-base)", outline: "none",
    color: "var(--text-primary)", transition: "border-color 0.2s ease",
  };

  return (
    <div style={{ maxWidth: 900 }} className="fade-enter">
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

        {/* Grading Mode Switcher */}
        <div style={{ display: "inline-flex", background: "var(--bg-surface)", padding: 6, borderRadius: 12, border: "1px solid var(--border)", gap: 6, alignSelf: "flex-start" }}>
          <Link to="/gpa/calculate" style={{ textDecoration: "none", padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "var(--text-muted)", transition: "all 0.2s ease" }} onMouseEnter={(e) => e.target.style.color = "var(--text-primary)"} onMouseLeave={(e) => e.target.style.color = "var(--text-muted)"}>Absolute Grading</Link>
          <Link to="/gpa/relative" style={{ textDecoration: "none", padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 700, background: "var(--text-primary)", color: "#fff", transition: "all 0.2s ease" }}>Relative Grading (Curve)</Link>
        </div>

        {/* Header */}
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)", marginBottom: 6 }}>
            Relative Grading
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-muted)", maxWidth: 650 }}>
            Dynamically calculate Standard Deviations to grade a classroom on a curve. Tweak the Z-Score boundaries in settings to modify grade thresholds.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 24, alignItems: "start" }}>

          {/* Left Panel: Data Entry & Settings */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            
            {/* Input Module */}
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--border-light)", background: "var(--bg-elevated)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ background: "var(--text-primary)", color: "#fff", padding: 6, borderRadius: 8 }}><Calculator size={16} /></div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>Class Data</h3>
                </div>
                <button onClick={() => setShowSettings(!showSettings)} style={{ background: "none", border: "none", cursor: "pointer", color: showSettings ? "var(--text-primary)" : "var(--text-faint)", transition: "all 0.2s ease" }}>
                  <Settings size={18} />
                </button>
              </div>

              {/* Dynamic Settings Dropdown */}
              {showSettings && (
                <div style={{ background: "var(--bg-elevated)", padding: "16px 22px", borderBottom: "1px solid var(--border-light)", animation: "fadeInDown 0.3s ease-out" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Custom Thresholds (Z-Score ≥)</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                    {["A", "B", "C", "D"].map(grade => (
                      <div key={grade}>
                        <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: "var(--text-faint)", marginBottom: 4, textAlign: "center" }}>Grade {grade}</label>
                        <input type="number" step="0.1" value={bounds[grade]} onChange={(e) => updateBound(grade, e.target.value)} style={{ ...inputStyle, textAlign: "center", padding: "6px" }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ maxHeight: 400, overflowY: "auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 44px", gap: 10, padding: "12px 22px 8px", borderBottom: "1px solid var(--border-light)" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Student Name</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "center" }}>Score</span>
                  <span></span>
                </div>
                
                {students.map((stu, index) => (
                  <div key={stu.id} style={{ display: "grid", gridTemplateColumns: "1fr 100px 44px", gap: 10, padding: "10px 22px", alignItems: "center", borderBottom: index < students.length - 1 ? "1px solid var(--border-light)" : "none" }}>
                    <input type="text" placeholder={`Student ${index + 1}`} value={stu.name} onChange={(e) => updateStudent(stu.id, "name", e.target.value)} style={inputStyle} />
                    <input type="number" placeholder="85" value={stu.score} onChange={(e) => updateStudent(stu.id, "score", e.target.value)} style={{ ...inputStyle, textAlign: "center" }} />
                    <button onClick={() => removeStudent(stu.id)} style={{ width: 36, height: 36, borderRadius: 8, background: "none", border: "none", cursor: "pointer", color: "var(--text-faint)", transition: "all 0.2s ease" }} onMouseEnter={(e) => e.currentTarget.style.color = "#c0392b"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-faint)"}>
                      <Trash2 size={14} style={{ margin: "0 auto" }} />
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 22px", borderTop: "1px solid var(--border-light)" }}>
                <button onClick={addStudent} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "var(--text-primary)", background: "none", border: "none", cursor: "pointer", padding: "6px 12px", borderRadius: 8 }}>
                  <Plus size={14} /> Add Student
                </button>
                <button onClick={reset} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--text-faint)", background: "none", border: "none", cursor: "pointer" }}>
                  <RotateCcw size={12} /> Reset
                </button>
              </div>
              
              <div style={{ padding: "0 22px 22px" }}>
                <button onClick={calculateCurve} className="btn btn-primary" style={{ width: "100%", padding: "12px", fontSize: 14 }}>
                  Generate Bell Curve
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel: Results View */}
          {stats ? (
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "26px", animation: "fadeInUp 0.4s ease-out" }}>
              
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ background: "var(--text-primary)", color: "#fff", padding: 6, borderRadius: 8 }}><BarChart3 size={16} /></div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", fontFamily: "'Space Grotesk', sans-serif" }}>Curve Analysis</h3>
                </div>
                <button onClick={exportCSV} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", background: "var(--bg-elevated)", border: "1px solid var(--border)", padding: "6px 12px", borderRadius: 8, cursor: "pointer" }}>
                  <DownloadX size={12} /> CSV
                </button>
              </div>

              {/* Stats Module */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
                {[
                  { label: "Class Mean (μ)", value: stats.mean },
                  { label: "Standard Deviation", value: stats.stdDev },
                  { label: "Highest Score", value: stats.highest },
                  { label: "Total Students", value: stats.count },
                ].map(s => (
                  <div key={s.label} style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-light)", padding: "12px 16px", borderRadius: 12 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{s.label}</p>
                    <p style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)", fontFamily: "'Space Grotesk', sans-serif" }}>{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Chart Graphics */}
              <div style={{ width: "100%", height: 260, marginBottom: 32 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12, textAlign: "center" }}>Distribution Model</p>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.curvePoints} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCurve" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--text-primary)" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="var(--text-primary)" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                    <XAxis dataKey="x" tick={{ fontSize: 11, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} />
                    <YAxis tick={false} axisLine={false} tickLine={false} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", padding: "8px 12px", borderRadius: 8, boxShadow: "var(--shadow-sm)" }}>
                              <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>Score: {payload[0].payload.x}</p>
                              <p style={{ fontSize: 10, color: "var(--text-muted)", margin: "4px 0 0" }}>{(payload[0].payload.probability * 100).toFixed(1)}% Density</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area type="monotone" dataKey="probability" stroke="var(--text-primary)" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCurve)" />
                    <ReferenceLine x={Number(stats.mean)} stroke="rgba(200,80,80,0.6)" strokeDasharray="4 4" label={{ position: 'top', value: 'Mean', fill: 'rgba(200,80,80,0.8)', fontSize: 10 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Automated Table Results */}
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Grading Analytics</p>
                <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 50px 50px 60px 40px", gap: 10, padding: "10px 16px", background: "var(--bg-elevated)", borderBottom: "1px solid var(--border-light)", fontSize: 10, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    <span>Student</span>
                    <span style={{ textAlign: "center" }}>Score</span>
                    <span style={{ textAlign: "center" }}>Z-Scr</span>
                    <span style={{ textAlign: "center" }}>% Rank</span>
                    <span style={{ textAlign: "center" }}>Gr</span>
                  </div>
                  {stats.gradedStudents.map((s, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 50px 50px 60px 40px", gap: 10, padding: "12px 16px", alignItems: "center", borderBottom: i < stats.gradedStudents.length - 1 ? "1px solid var(--border-light)" : "none", fontSize: 13 }}>
                      <span style={{ fontWeight: 500, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.name}</span>
                      <span style={{ textAlign: "center", color: "var(--text-muted)" }}>{s.score}</span>
                      <span style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 12 }}>{s.zScore > 0 ? `+${s.zScore}` : s.zScore}</span>
                      <span style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: 12, fontWeight: 500 }}>{s.percentile}th</span>
                      <span style={{ textAlign: "center", fontWeight: 800, color: s.grade === "A" ? "#2ecc71" : s.grade === "B" ? "#3498db" : s.grade === "C" ? "#f39c12" : s.grade === "D" ? "#d35400" : "#c0392b" }}>
                        {s.grade}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
             <div style={{ background: "transparent", border: "1.5px dashed var(--border)", borderRadius: 16, height: 400, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--text-faint)" }}>
               <BarChart3 size={32} style={{ marginBottom: 16, opacity: 0.5 }} />
               <p style={{ fontSize: 14 }}>Add student data and generate the curve to view analytics here.</p>
             </div>
          )}

        </div>
      </div>
    </div>
  );
}
