import { useState } from "react";
import { Plus, Trash2, RotateCcw, Calculator, BarChart3 } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from "recharts";

const makeStudent = () => ({ id: Date.now() + Math.random(), name: "", score: "" });

export default function RelativeGrading() {
  const [students, setStudents] = useState([makeStudent(), makeStudent(), makeStudent(), makeStudent(), makeStudent()]);
  const [stats, setStats] = useState(null);

  const addStudent = () => setStudents([...students, makeStudent()]);
  const removeStudent = (id) => { if (students.length > 1) setStudents(students.filter((s) => s.id !== id)); };
  const updateStudent = (id, field, val) => setStudents(students.map((s) => (s.id === id ? { ...s, [field]: val } : s)));
  const reset = () => { setStudents([makeStudent(), makeStudent(), makeStudent(), makeStudent(), makeStudent()]); setStats(null); };

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
    const stdDev = Math.sqrt(variance) || 1; // Prevent division by zero

    // Determine grades for each student based on z-score
    const gradedStudents = validStudents.map(s => {
      const score = parseFloat(s.score);
      const zScore = (score - mean) / stdDev;
      let grade = "C";
      if (zScore >= 1.5) grade = "A";
      else if (zScore >= 0.5) grade = "B";
      else if (zScore >= -0.5) grade = "C";
      else if (zScore >= -1.5) grade = "D";
      else grade = "F";

      return {
        ...s,
        score,
        zScore: zScore.toFixed(2),
        grade
      };
    }).sort((a, b) => b.score - a.score);

    // Generate Normal Distribution Bell Curve Points
    const curvePoints = [];
    // Go 3 standard deviations out
    const minX = mean - 3.5 * stdDev;
    const maxX = mean + 3.5 * stdDev;
    const step = (maxX - minX) / 100;

    for (let x = minX; x <= maxX; x += step) {
      const exponent = Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
      const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * exponent;
      curvePoints.push({ x: Number(x.toFixed(1)), probability: y });
    }

    setStats({
      mean: mean.toFixed(2),
      stdDev: stdDev.toFixed(2),
      highest: Math.max(...scores).toFixed(1),
      count: n,
      gradedStudents,
      curvePoints
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
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

        {/* Header */}
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)", marginBottom: 6 }}>
            Relative Grading
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
            Enter class scores to automatically grade on a mathematical curve using standard deviations.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 24, alignItems: "start" }}>

          {/* Left Panel: Data Entry */}
          <div style={{
            background: "var(--bg-surface)", border: "1px solid var(--border)",
            borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column"
          }}>
            <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--border-light)", background: "var(--bg-elevated)", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ background: "var(--text-primary)", color: "#fff", padding: 6, borderRadius: 8 }}><Calculator size={16} /></div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>Class Data</h3>
            </div>

            <div style={{ maxHeight: 400, overflowY: "auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 44px", gap: 10, padding: "12px 22px 8px", borderBottom: "1px solid var(--border-light)" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Student</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "center" }}>Score</span>
                <span></span>
              </div>
              
              {students.map((stu, index) => (
                <div key={stu.id} style={{ display: "grid", gridTemplateColumns: "1fr 100px 44px", gap: 10, padding: "10px 22px", alignItems: "center", borderBottom: index < students.length - 1 ? "1px solid var(--border-light)" : "none" }}>
                  <input type="text" placeholder={`Student ${index + 1}`} value={stu.name} onChange={(e) => updateStudent(stu.id, "name", e.target.value)} style={inputStyle} />
                  <input type="number" placeholder="85" value={stu.score} onChange={(e) => updateStudent(stu.id, "score", e.target.value)} style={{ ...inputStyle, textAlign: "center" }} />
                  <button onClick={() => removeStudent(stu.id)} style={{ width: 36, height: 36, borderRadius: 8, background: "none", border: "none", cursor: "pointer", color: "var(--text-faint)", transition: "all 0.2s ease" }}>
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

          {/* Right Panel: Results & Chart */}
          {stats ? (
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "26px", animation: "fadeInUp 0.4s ease-out" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ background: "var(--text-primary)", color: "#fff", padding: 6, borderRadius: 8 }}><BarChart3 size={16} /></div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", fontFamily: "'Space Grotesk', sans-serif" }}>Curve Analysis</h3>
              </div>

              {/* Stats Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
                {[
                  { label: "Class Mean (μ)", value: stats.mean },
                  { label: "Standard Deviation (σ)", value: stats.stdDev },
                  { label: "Highest Score", value: stats.highest },
                  { label: "Total Students", value: stats.count },
                ].map(s => (
                  <div key={s.label} style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-light)", padding: "12px 16px", borderRadius: 12 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{s.label}</p>
                    <p style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)", fontFamily: "'Space Grotesk', sans-serif" }}>{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Bell Curve Chart */}
              <div style={{ width: "100%", height: 260, marginBottom: 32 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12, textAlign: "center" }}>Score Distribution</p>
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

              {/* Results Table */}
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Grading Results</p>
                <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 60px 50px", gap: 10, padding: "10px 16px", background: "var(--bg-elevated)", borderBottom: "1px solid var(--border-light)", fontSize: 10, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    <span>Student</span>
                    <span style={{ textAlign: "center" }}>Score</span>
                    <span style={{ textAlign: "center" }}>Z-Score</span>
                    <span style={{ textAlign: "center" }}>Grade</span>
                  </div>
                  {stats.gradedStudents.map((s, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 60px 60px 50px", gap: 10, padding: "12px 16px", alignItems: "center", borderBottom: i < stats.gradedStudents.length - 1 ? "1px solid var(--border-light)" : "none", fontSize: 13 }}>
                      <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>{s.name}</span>
                      <span style={{ textAlign: "center", color: "var(--text-muted)" }}>{s.score}</span>
                      <span style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 12 }}>{s.zScore > 0 ? `+${s.zScore}` : s.zScore}</span>
                      <span style={{ textAlign: "center", fontWeight: 700, color: s.grade === "A" ? "#2ecc71" : s.grade === "B" ? "#3498db" : s.grade === "C" ? "#f39c12" : s.grade === "D" ? "#d35400" : "#c0392b" }}>
                        {s.grade}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16, padding: "12px", background: "var(--bg-elevated)", borderRadius: 8, fontSize: 11, color: "var(--text-muted)", lineHeight: 1.5 }}>
                  <strong style={{ color: "var(--text-primary)" }}>Scale:</strong> A (Z ≥ 1.5), B (Z ≥ 0.5), C (Z ≥ -0.5), D (Z ≥ -1.5), F (Z &lt; -1.5)
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
