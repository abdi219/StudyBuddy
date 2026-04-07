import { useState } from "react";
import { Plus, Trash2, RotateCcw } from "lucide-react";
import TabBar from "../../components/ui/TabBar";

const scaleTabs = [
  { label: "4.0 Scale", value: "4" },
  { label: "5.0 Scale", value: "5" },
  { label: "10.0 Scale", value: "10" },
];

const gradeOptions = {
  4: [
    { label: "A  (4.0)", value: 4.0 },
    { label: "A- (3.7)", value: 3.7 },
    { label: "B+ (3.3)", value: 3.3 },
    { label: "B  (3.0)", value: 3.0 },
    { label: "B- (2.7)", value: 2.7 },
    { label: "C+ (2.3)", value: 2.3 },
    { label: "C  (2.0)", value: 2.0 },
    { label: "C- (1.7)", value: 1.7 },
    { label: "D  (1.0)", value: 1.0 },
    { label: "F  (0.0)", value: 0.0 },
  ],
  5: [
    { label: "A+ (5.0)", value: 5.0 },
    { label: "A  (4.0)", value: 4.0 },
    { label: "B  (3.0)", value: 3.0 },
    { label: "C  (2.0)", value: 2.0 },
    { label: "D  (1.0)", value: 1.0 },
    { label: "F  (0.0)", value: 0.0 },
  ],
  10: [
    { label: "O  (10.0)", value: 10.0 },
    { label: "A+ (9.0)", value: 9.0 },
    { label: "A  (8.0)", value: 8.0 },
    { label: "B+ (7.0)", value: 7.0 },
    { label: "B  (6.0)", value: 6.0 },
    { label: "C  (5.0)", value: 5.0 },
    { label: "D  (4.0)", value: 4.0 },
    { label: "F  (0.0)", value: 0.0 },
  ],
};

const makeRow = () => ({
  id: Date.now() + Math.random(),
  subject: "",
  credits: "",
  grade: "",
});

export default function GPACalculator() {
  const [scale, setScale] = useState("4");
  const [rows, setRows] = useState([makeRow(), makeRow(), makeRow()]);
  const [result, setResult] = useState(null);
  const [mode, setMode] = useState("absolute");

  const addRow = () => setRows([...rows, makeRow()]);
  const removeRow = (id) => {
    if (rows.length > 1) setRows(rows.filter((r) => r.id !== id));
  };
  const updateRow = (id, field, val) =>
    setRows(rows.map((r) => (r.id === id ? { ...r, [field]: val } : r)));
  const reset = () => {
    setRows([makeRow(), makeRow(), makeRow()]);
    setResult(null);
  };

  const calculate = () => {
    let tc = 0,
      tp = 0;
    for (const r of rows) {
      const c = parseFloat(r.credits),
        g = parseFloat(r.grade);
      if (!isNaN(c) && !isNaN(g) && c > 0) {
        tc += c;
        tp += c * g;
      }
    }
    if (tc === 0) return setResult(null);
    setResult({
      gpa: (tp / tc).toFixed(2),
      totalCredits: tc,
      scale: scale === "4" ? "4.0" : scale === "5" ? "5.0" : "10.0",
    });
  };

  const opts = gradeOptions[scale] || [];

  return (
    <div className="space-y-5 max-w-3xl fade-enter">
      <div>
        <h1 className="text-2xl font-bold text-[#1f2430]">GPA Calculator</h1>
        <p className="text-sm text-[#626a7c] mt-0.5">
          Add your courses and calculate your semester GPA.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <TabBar
          tabs={scaleTabs}
          activeTab={scale}
          onTabChange={(v) => {
            setScale(v);
            reset();
          }}
        />
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-[11px] text-[#7e8698]">Mode:</span>
          <div className="inline-flex rounded-xl border border-[#d7dce6] bg-[#fbfaf6] p-1 gap-1">
            {["absolute", "relative"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-2.5 py-1 text-[11px] rounded-lg capitalize transition-all cursor-pointer ${
                  mode === m
                    ? "bg-[#1f2430] text-white font-medium"
                    : "text-[#5f6678] hover:bg-white"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {mode === "relative" && (
        <div className="card p-4 text-center text-sm text-[#626a7c]">
          Relative grading is coming soon. Switch to Absolute to calculate.
        </div>
      )}

      {mode === "absolute" && (
        <>
          {/* Table */}
          <div className="card overflow-hidden">
            <div className="grid grid-cols-[1fr_80px_140px_40px] gap-2 px-4 py-2.5 border-b border-[#e5e8ef] text-[10px] font-semibold text-[#7e8698] uppercase tracking-wider">
              <span>Subject</span>
              <span>Credits</span>
              <span>Grade</span>
              <span></span>
            </div>
            <div className="divide-y divide-[#eceff4]">
              {rows.map((row, i) => (
                <div
                  key={row.id}
                  className="grid grid-cols-[1fr_80px_140px_40px] gap-2 px-4 py-2.5 items-center"
                >
                  <input
                    type="text"
                    placeholder={`Subject ${i + 1}`}
                    value={row.subject}
                    onChange={(e) =>
                      updateRow(row.id, "subject", e.target.value)
                    }
                    className="px-2.5 py-1.5 text-[13px] bg-white border border-[#d7dce6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9e3fb] focus:border-[#95acd8] transition placeholder:text-[#b0b7c6]"
                  />
                  <input
                    type="number"
                    placeholder="3"
                    min="0"
                    max="10"
                    value={row.credits}
                    onChange={(e) =>
                      updateRow(row.id, "credits", e.target.value)
                    }
                    className="px-2.5 py-1.5 text-[13px] bg-white border border-[#d7dce6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9e3fb] focus:border-[#95acd8] transition placeholder:text-[#b0b7c6] text-center"
                  />
                  <select
                    value={row.grade}
                    onChange={(e) => updateRow(row.id, "grade", e.target.value)}
                    className="px-2.5 py-1.5 text-[13px] bg-white border border-[#d7dce6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9e3fb] focus:border-[#95acd8] transition text-[#31384c] cursor-pointer"
                  >
                    <option value="">Select</option>
                    {opts.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeRow(row.id)}
                    className="p-1.5 rounded-lg text-[#8a92a4] hover:text-[#a23434] hover:bg-[#fff0ec] transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="px-4 py-2.5 border-t border-[#e5e8ef] flex items-center justify-between">
              <button
                onClick={addRow}
                className="inline-flex items-center gap-1 text-xs text-[#26447a] font-medium hover:text-[#1f3762] cursor-pointer"
              >
                <Plus size={14} /> Add Subject
              </button>
              <button
                onClick={reset}
                className="inline-flex items-center gap-1 text-xs text-[#81899a] hover:text-[#5b6376] cursor-pointer"
              >
                <RotateCcw size={12} /> Reset
              </button>
            </div>
          </div>

          {/* Calculate */}
          <button
            onClick={calculate}
            className="px-6 py-2.5 bg-[#1f2430] text-white text-[13px] font-semibold rounded-xl hover:bg-[#2c3344] transition-colors cursor-pointer clay-btn"
          >
            Calculate GPA
          </button>

          {/* Result */}
          {result && (
            <div className="card p-6 text-center animate-fade-in-up">
              <p className="text-[10px] font-semibold text-[#7f8799] uppercase tracking-wider mb-1">
                Your Semester GPA ({result.scale} Scale)
              </p>
              <p className="text-4xl font-extrabold text-[#22375f] mb-1">
                {result.gpa}
              </p>
              <p className="text-xs text-[#666e81]">
                Based on {result.totalCredits} credit hours
              </p>
            </div>
          )}
        </>
      )}

      {/* Weights placeholder */}
      <div className="card p-4 flex items-center justify-between">
        <div>
          <h3 className="text-[13px] font-semibold text-[#31394d]">
            Custom Grading Weights
          </h3>
          <p className="text-[11px] text-[#727a8d] mt-0.5">
            Configure quiz, mid-term, and final exam weight distribution.
          </p>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#798195] bg-[#f0f2f7] px-2 py-0.5 rounded-full">
          Coming Soon
        </span>
      </div>
    </div>
  );
}
