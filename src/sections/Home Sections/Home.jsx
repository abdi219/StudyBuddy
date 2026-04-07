import { useNavigate } from "react-router-dom";
import { ArrowRight, Calculator, BarChart3, Layers } from "lucide-react";

export function Home() {
  const navigate = useNavigate();

  return (
    <section id="home" className="pt-[60px] bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero content */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full mb-5 uppercase tracking-wider">
            Student Productivity Platform
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-slate-900 leading-tight mb-5">
            Track your academic progress with ease
          </h1>
          <p className="text-base md:text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
            Calculate GPA across multiple scales, manage study sessions, and
            stay on top of your performance — all in one place.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Open Dashboard
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate("/gpa/calculate")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 text-sm font-semibold rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Try Calculator
            </button>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: Calculator,
              title: "Credit Hours",
              desc: "Track total and per-course credit hours used in GPA calculation.",
            },
            {
              icon: BarChart3,
              title: "Weighted Average",
              desc: "Compute GPA using credit-weighted averages so larger courses carry more weight.",
            },
            {
              icon: Layers,
              title: "Scaled Mapping",
              desc: "Map raw scores to grade points with configurable grading scales.",
            },
          ].map((item) => (
            <div key={item.title} className="card p-5 transition-all duration-200">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                <item.icon size={18} strokeWidth={1.8} />
              </div>
              <h3 className="text-sm font-semibold text-slate-800 mb-1">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
