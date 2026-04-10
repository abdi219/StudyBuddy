import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2, RotateCcw, Calculator, BarChart3, Settings, Download, Columns } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from "recharts";

const makeStudent = (components) => {
  const scores = {};
  components.forEach(c => scores[c.id] = "");
  return { id: Date.now() + Math.random(), name: "", scores };
};

export default function RelativeGrading() {
  const [components, setComponents] = useState([{ id: "c1", name: "Final Grade", max: 100 }]);
  const [students, setStudents] = useState([
    { id: 1, name: "", scores: { "c1": "" } },
    { id: 2, name: "", scores: { "c1": "" } },
    { id: 3, name: "", scores: { "c1": "" } }
  ]);
  const [stats, setStats] = useState(null);
  const [bounds, setBounds] = useState({ A: 1.5, B: 0.5, C: -0.5, D: -1.5 });
  const [showSettings, setShowSettings] = useState(false);

  const addComponent = () => {
    const newId = `c${Date.now()}`;
    setComponents([...components, { id: newId, name: `Task ${components.length + 1}`, max: 100 }]);
    setStudents(students.map(s => ({ ...s, scores: { ...s.scores, [newId]: "" } })));
  };

  const removeComponent = (id) => {
    if (components.length <= 1) return;
    setComponents(components.filter(c => c.id !== id));
    setStudents(students.map(s => {
      const newScores = { ...s.scores };
      delete newScores[id];
      return { ...s, scores: newScores };
    }));
  };

  const updateComponent = (id, field, val) => {
    setComponents(components.map(c => c.id === id ? { ...c, [field]: val } : c));
  };

  const addStudent = () => setStudents([...students, makeStudent(components)]);
  const removeStudent = (id) => { if (students.length > 1) setStudents(students.filter((s) => s.id !== id)); };
  
  const updateStudentScore = (studentId, compId, val) => {
    setStudents(students.map(s => s.id === studentId ? { ...s, scores: { ...s.scores, [compId]: val } } : s));
  };
  const updateStudentName = (studentId, val) => {
    setStudents(students.map(s => s.id === studentId ? { ...s, name: val } : s));
  };

  const updateBound = (grade, val) => setBounds(prev => ({ ...prev, [grade]: parseFloat(val) || 0 }));
  
  const reset = () => { 
    setComponents([{ id: "c1", name: "Final Grade", max: 100 }]);
    setStudents([{ id: 1, name: "", scores: { "c1": "" } }, { id: 2, name: "", scores: { "c1": "" } }, { id: 3, name: "", scores: { "c1": "" } }]); 
    setStats(null); 
  };

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
    const compHeaders = components.map(c => `${c.name} (/${c.max})`).join(",");
    const header = `Student,${compHeaders},Total,Z-Score,Percentile,Grade\n`;
    const rows = stats.gradedStudents.map(s => {
      const compScores = components.map(c => s.scores[c.id]).join(",");
      return `${s.name},${compScores},${s.totalScore},${s.zScore},${s.percentile}%,${s.grade}`;
    }).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "weighted_relative_grades.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const calculateCurve = () => {
    // Calc total scores
    const calculatedStudents = students.map(s => {
      let total = 0;
      components.forEach(c => {
         const val = parseFloat(s.scores[c.id]) || 0;
         total += val;
      });
      return { ...s, totalScore: isNaN(total) ? 0 : Number(total.toFixed(2)) };
    });

    const validStudents = calculatedStudents.filter(s => s.name.trim() !== "" && s.totalScore > 0);

    if (validStudents.length < 2) {
      alert("Please enter at least 2 valid students with scores to generate a curve.");
      return;
    }

    const scores = validStudents.map(s => s.totalScore);
    const n = scores.length;
    const mean = scores.reduce((a, b) => a + b, 0) / n;
    const variance = scores.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (n > 1 ? n - 1 : 1);
    const stdDev = Math.sqrt(variance) || 1;

    const classMaxTotal = components.reduce((acc, c) => acc + (parseFloat(c.max) || 0), 0);

    const gradedStudents = validStudents.map(s => {
      const zScore = (s.totalScore - mean) / stdDev;
      const percentile = getPercentile(zScore);
      let grade = "C";
      if (zScore >= bounds.A) grade = "A";
      else if (zScore >= bounds.B) grade = "B";
      else if (zScore >= bounds.C) grade = "C";
      else if (zScore >= bounds.D) grade = "D";
      else grade = "F";

      return { ...s, zScore: zScore.toFixed(2), percentile, grade };
    }).sort((a, b) => b.totalScore - a.totalScore);

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
      classMaxTotal,
      mean: mean.toFixed(2), stdDev: stdDev.toFixed(2),
      highest: Math.max(...scores).toFixed(1), count: n,
      gradedStudents, curvePoints
    });
  };

  const inputStyle = {
    padding: "8px 12px", fontSize: 13, border: "1px solid var(--border)", 
    borderRadius: 8, background: "rgba(255,255,255,0.6)", outline: "none",
    color: "var(--text-primary)", transition: "all 0.2s ease", fontFamily: "'Inter', sans-serif"
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }} className="fade-enter">
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

        {/* Header & Modes */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ display: "inline-flex", background: "var(--bg-surface)", padding: 6, borderRadius: 12, border: "1px solid var(--border)", gap: 6, marginBottom: 20 }}>
              <Link to="/gpa/calculate" style={{ textDecoration: "none", padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "var(--text-muted)", transition: "all 0.2s ease" }} onMouseEnter={(e) => e.target.style.color = "var(--text-primary)"} onMouseLeave={(e) => e.target.style.color = "var(--text-muted)"}>Absolute Grading</Link>
              <Link to="/gpa/relative" style={{ textDecoration: "none", padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700, background: "var(--text-primary)", color: "#fff", transition: "all 0.2s ease", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>Relative Curved</Link>
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)", marginBottom: 6 }}>
              Dynamic Weighted Curve
            </h1>
            <p style={{ fontSize: 14, color: "var(--text-muted)", maxWidth: 650 }}>
              Add custom assessments (e.g. Quizzes, Midterms) with max weights. Class scores are auto-aggregated and mapped dynamically to a customizable Z-Score bell curve.
            </p>
          </div>
          
          <button onClick={() => setShowSettings(!showSettings)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", background: showSettings ? "var(--text-primary)" : "var(--bg-surface)", border: "1px solid var(--border)", color: showSettings ? "#fff" : "var(--text-secondary)", borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>
            <Settings size={16} /> Z-Score Thresholds
          </button>
        </div>

        {/* Dynamic Settings Dropdown */}
        {showSettings && (
          <div style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", padding: "20px 26px", border: "1px solid var(--border)", borderRadius: 16, animation: "fadeInDown 0.3s ease-out", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {["A", "B", "C", "D"].map(grade => (
              <div key={grade}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>Grade {grade} (Z ≥)</label>
                <input type="number" step="0.1" value={bounds[grade]} onChange={(e) => updateBound(grade, e.target.value)} style={{ ...inputStyle, width: "100%", background: "#fff" }} />
              </div>
            ))}
          </div>
        )}

        {/* Full-width Glass Table Module for Student Entry */}
        <div style={{ background: "rgba(255, 255, 255, 0.6)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.9)", borderRadius: 20, overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
          
          {/* Table Toolbar */}
          <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.4)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ background: "var(--text-primary)", color: "#fff", padding: 8, borderRadius: 10 }}><Columns size={16} /></div>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--text-primary)" }}>Assessment Builder</h3>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={addComponent} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "var(--text-primary)", background: "#fff", border: "1px solid var(--border)", padding: "8px 14px", borderRadius: 10, cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.03)" }}>
                <Plus size={14} /> Add Column
              </button>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            {/* Table Header / Component Definitions */}
            <div style={{ display: "inline-flex", minWidth: "100%", padding: "16px 24px", borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.7)", gap: 16 }}>
              <div style={{ width: 180, flexShrink: 0, fontWeight: 800, fontSize: 12, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "flex", alignItems: "flex-end", paddingBottom: 6 }}>
                Student Roll
              </div>
              
              {components.map((c) => (
                <div key={c.id} style={{ width: 140, flexShrink: 0, background: "#fff", border: "1px solid var(--border-light)", padding: "10px", borderRadius: 12, position: "relative" }}>
                  <input type="text" value={c.name} onChange={(e) => updateComponent(c.id, "name", e.target.value)} placeholder="Task" style={{ width: "100%", border: "none", outline: "none", fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6, background: "transparent" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 10, color: "var(--text-faint)", fontWeight: 700 }}>MAX:</span>
                    <input type="number" value={c.max} onChange={(e) => updateComponent(c.id, "max", e.target.value)} style={{ width: 60, border: "none", outline: "none", fontSize: 12, fontWeight: 600, background: "var(--bg-elevated)", padding: "4px 6px", borderRadius: 4 }} />
                  </div>
                  {components.length > 1 && (
                    <button onClick={() => removeComponent(c.id)} style={{ position: "absolute", top: -8, right: -8, background: "#fff", border: "1px solid var(--border)", borderRadius: "50%", padding: 4, cursor: "pointer", color: "var(--text-faint)", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                      <Trash2 size={10} />
                    </button>
                  )}
                </div>
              ))}
              
              <div style={{ width: 40, flexShrink: 0 }}></div> {/* spacer for trash bin */}
            </div>

            {/* Student Rows */}
            <div style={{ minWidth: "100%", padding: "8px 24px 24px", display: "flex", flexDirection: "column", gap: 8 }}>
              {students.map((stu, i) => (
                <div key={stu.id} style={{ display: "inline-flex", gap: 16, alignItems: "center", animation: "fadeInUp 0.3s ease-out", animationDelay: `${i*0.05}s` }}>
                  <input type="text" placeholder={`Student ${i + 1}`} value={stu.name} onChange={(e) => updateStudentName(stu.id, e.target.value)} style={{ ...inputStyle, width: 180, flexShrink: 0, fontWeight: 600, background: "#fff" }} />
                  
                  {components.map((c) => (
                    <div key={c.id} style={{ width: 140, flexShrink: 0 }}>
                      <input type="number" placeholder="--" value={stu.scores[c.id]} onChange={(e) => updateStudentScore(stu.id, c.id, e.target.value)} style={{ ...inputStyle, width: "100%", textAlign: "center", fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }} />
                    </div>
                  ))}

                  <button onClick={() => removeStudent(stu.id)} style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 10, background: "rgba(255,255,255,0.5)", border: "none", cursor: "pointer", color: "var(--text-faint)", transition: "all 0.2s ease" }} onMouseEnter={(e) => {e.currentTarget.style.color = "#c0392b"; e.currentTarget.style.background = "#fff"}} onMouseLeave={(e) => {e.currentTarget.style.color = "var(--text-faint)"; e.currentTarget.style.background = "rgba(255,255,255,0.5)"}}>
                    <Trash2 size={16} style={{ margin: "0 auto" }} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Table Footer actions */}
          <div style={{ padding: "16px 24px", background: "rgba(255,255,255,0.4)", borderTop: "1px solid rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={addStudent} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: "#fff", background: "var(--text-primary)", border: "none", padding: "10px 20px", borderRadius: 12, cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", transition: "transform 0.2s" }} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                <Plus size={16} /> Row
              </button>
              <button onClick={reset} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", background: "#fff", border: "1px solid var(--border)", padding: "10px 16px", borderRadius: 12, cursor: "pointer", transition: "transform 0.2s" }}>
                <RotateCcw size={14} /> Clear
              </button>
            </div>

            <button onClick={calculateCurve} style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 800, color: "#fff", background: "linear-gradient(135deg, var(--text-primary), #4a4a68)", border: "none", padding: "12px 28px", borderRadius: 14, cursor: "pointer", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", transition: "all 0.2s" }} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.02) translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>
              <BarChart3 size={18} /> GENERATE BELL CURVE
            </button>
          </div>
        </div>

        {/* Results View */}
        {stats && (
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "32px", animation: "fadeInUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
            
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ background: "var(--text-primary)", color: "#fff", padding: 8, borderRadius: 10 }}><BarChart3 size={18} /></div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)", fontFamily: "'Space Grotesk', sans-serif" }}>Curve Analysis</h3>
                  <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Class Total Max: {stats.classMaxTotal}</p>
                </div>
              </div>
              <button onClick={exportCSV} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", background: "var(--bg-elevated)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 10, cursor: "pointer" }}>
                <Download size={14} /> EXPORT CSV
              </button>
            </div>

            {/* Stats Overview */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
              {[
                { label: "Class Average (μ)", value: stats.mean },
                { label: "Deviation (σ)", value: stats.stdDev },
                { label: "Highest Score", value: stats.highest },
                { label: "Students Curved", value: stats.count },
              ].map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.5)", border: "1px solid var(--border-light)", padding: "16px 20px", borderRadius: 16, boxShadow: "var(--shadow-sm)" }}>
                  <p style={{ fontSize: 11, fontWeight: 800, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>{s.label}</p>
                  <p style={{ fontSize: 24, fontWeight: 800, color: "var(--text-primary)", fontFamily: "'Space Grotesk', sans-serif" }}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Graphic Curve */}
            <div style={{ width: "100%", height: 320, marginBottom: 40, background: "rgba(255,255,255,0.4)", borderRadius: 16, border: "1px solid var(--border)", padding: "20px 20px 0" }}>
              <p style={{ fontSize: 12, fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16, textAlign: "center" }}>Gaussian Distribution Model</p>
              <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={stats.curvePoints} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCurve" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--text-primary)" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="var(--text-primary)" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                  <XAxis dataKey="x" tick={{ fontSize: 11, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} />
                  <YAxis tick={false} axisLine={false} tickLine={false} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const scoreX = payload[0].payload.x;
                        const z = (scoreX - mean) / stdDev;
                        const p = getPercentile(z);
                        return (
                          <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", padding: "10px 14px", borderRadius: 10, boxShadow: "var(--shadow-md)" }}>
                            <p style={{ fontSize: 13, fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>Score: {scoreX}</p>
                            <p style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", margin: "4px 0 0" }}>Percentile: {p}th</p>
                            <p style={{ fontSize: 11, fontWeight: 600, color: "var(--text-faint)", margin: "2px 0 0" }}>Z-Score: {(z > 0 ? "+" : "") + z.toFixed(2)}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area type="monotone" dataKey="probability" stroke="var(--text-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorCurve)" />
                  <ReferenceLine x={Number(stats.mean)} stroke="rgba(200,80,80,0.6)" strokeDasharray="4 4" label={{ position: 'top', value: 'Mean', fill: 'rgba(200,80,80,0.8)', fontSize: 11, fontWeight: 600 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Results Output Table */}
            <div>
              <p style={{ fontSize: 13, fontWeight: 800, color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>Class Roster Analytics</p>
              <div style={{ border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden", background: "#fff" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px 80px 60px", gap: 16, padding: "14px 20px", background: "var(--bg-elevated)", borderBottom: "1px solid var(--border-light)", fontSize: 11, fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  <span>Student Identity</span>
                  <span style={{ textAlign: "center" }}>Total Score</span>
                  <span style={{ textAlign: "center" }}>Z-Score</span>
                  <span style={{ textAlign: "center" }}>Percentile</span>
                  <span style={{ textAlign: "center" }}>Letter Grade</span>
                </div>
                {stats.gradedStudents.map((s, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px 80px 60px", gap: 16, padding: "16px 20px", alignItems: "center", borderBottom: i < stats.gradedStudents.length - 1 ? "1px solid var(--border-light)" : "none", fontSize: 14 }}>
                    <span style={{ fontWeight: 700, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.name}</span>
                    <span style={{ textAlign: "center", color: "var(--text-primary)", fontWeight: 800 }}>{s.totalScore}</span>
                    <span style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 13, fontWeight: 600 }}>{s.zScore > 0 ? `+${s.zScore}` : s.zScore}</span>
                    <span style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: 13, fontWeight: 600 }}>{s.percentile}th</span>
                    <span style={{ textAlign: "center", fontWeight: 900, fontSize: 16, color: s.grade === "A" ? "#10b981" : s.grade === "B" ? "#0ea5e9" : s.grade === "C" ? "#f59e0b" : s.grade === "D" ? "#ef4444" : "#b91c1c" }}>
                      {s.grade}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
