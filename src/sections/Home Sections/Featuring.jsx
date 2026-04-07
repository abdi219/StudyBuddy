import { useNavigate } from "react-router-dom";
import { ArrowRight, GraduationCap, Repeat, Scale } from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "GPA Analyzer",
    desc: "Calculates semester and overall GPA with real-time updates and weighted averages.",
    to: "/gpa",
  },
  {
    icon: Repeat,
    title: "ScaleFlex",
    desc: "A dynamic grading system switcher supporting 4.0, 5.0, and 10.0 GPA scales.",
    to: "/gpa/calculate",
  },
  {
    icon: Scale,
    title: "Convertify",
    desc: "A smart converter that translates GPAs between different grading scales for global compatibility.",
    to: "/gpa",
  },
];

export function Featuring() {
  const navigate = useNavigate();

  return (
    <section id="featuring" className="bg-slate-50 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Featuring Some Tools
          </h2>
          <p className="text-sm text-slate-500">
            Helping students work smarter, not harder.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="card p-6 cursor-pointer group transition-all duration-200 hover:-translate-y-0.5"
              onClick={() => navigate(f.to)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate(f.to)}
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
                <f.icon size={20} strokeWidth={1.8} />
              </div>
              <h3 className="text-sm font-semibold text-slate-800 mb-1.5 group-hover:text-indigo-600 transition-colors">
                {f.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">{f.desc}</p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Explore <ArrowRight size={12} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
