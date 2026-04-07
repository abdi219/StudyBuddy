import { useNavigate } from "react-router-dom";
import { Calculator, Scale, ArrowRight } from "lucide-react";

const scales = [
  {
    title: "4.0 Scale",
    desc: "The most common GPA scale used in US universities. Grades range from A (4.0) to F (0.0).",
    tag: "Most Popular",
  },
  {
    title: "5.0 Scale",
    desc: "Used in many South Asian and African institutions. Provides wider grade distribution.",
    tag: "Extended",
  },
  {
    title: "10.0 Scale",
    desc: "Common in European and Indian grading systems. Offers fine-grained academic measurement.",
    tag: "Precision",
  },
];

export default function GPAOverview() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-5xl fade-enter">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1f2430]">GPA System</h1>
          <p className="text-sm text-[#626a7c] mt-0.5">
            Choose your grading mode and jump into calculation.
          </p>
        </div>
        <button
          onClick={() => navigate("/gpa/calculate")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1f2430] text-white text-[13px] font-medium rounded-xl hover:bg-[#2c3344] transition-colors cursor-pointer clay-btn"
        >
          <Calculator size={15} /> Open Calculator
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger">
        {scales.map((s) => (
          <div
            key={s.title}
            className="card p-5 cursor-pointer group surface-lift"
            onClick={() => navigate("/gpa/calculate")}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl border border-[#dbe0ea] bg-white text-[#304059] flex items-center justify-center">
                <Scale size={18} strokeWidth={1.8} />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7c8496] bg-[#f2f4f8] px-2 py-0.5 rounded-full">
                {s.tag}
              </span>
            </div>
            <h3 className="text-sm font-bold text-[#263046] mb-1.5 group-hover:text-[#22355e] transition-colors">
              {s.title}
            </h3>
            <p className="text-xs text-[#616a7e] leading-relaxed mb-3">
              {s.desc}
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#2b406a] opacity-0 group-hover:opacity-100 transition-opacity">
              Calculate <ArrowRight size={12} />
            </span>
          </div>
        ))}
      </div>

      <div className="card p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[13px] font-semibold text-[#2a3348]">
              Relative Grading
            </h3>
            <p className="text-xs text-[#646c80] mt-0.5">
              Grade on a curve based on class performance distribution.
            </p>
          </div>
          <button
            onClick={() => navigate("/gpa/relative")}
            className="px-3.5 py-1.5 text-xs font-medium text-[#38445f] bg-white border border-[#d6dce8] rounded-xl hover:bg-[#f6f7fa] transition-colors cursor-pointer"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
