import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  BookOpen,
  Code,
  MonitorPlay,
  Clock,
  ArrowRight,
} from "lucide-react";

const mockClassrooms = [
  {
    id: "ds-101",
    name: "Data Structures Lab",
    subject: "CS-201 — Data Structures",
    lastAccessed: "2 hours ago",
  },
  {
    id: "oop-102",
    name: "OOP Study Session",
    subject: "CS-102 — Object Oriented Programming",
    lastAccessed: "Yesterday",
  },
  {
    id: "math-201",
    name: "Linear Algebra Review",
    subject: "MATH-201 — Linear Algebra",
    lastAccessed: "3 days ago",
  },
];

export default function ClassroomList() {
  const navigate = useNavigate();
  const [showBuilder, setShowBuilder] = useState(false);
  const [modules, setModules] = useState({
    notes: true,
    ai: true,
    video: false,
  });
  const [layout, setLayout] = useState("2");

  return (
    <div className="space-y-6 max-w-5xl fade-enter">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1f2430]">Classrooms</h1>
          <p className="text-sm text-[#626a7c] mt-0.5">
            Your study workspaces. Pick up where you left off.
          </p>
        </div>
        <button
          onClick={() => setShowBuilder(!showBuilder)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1f2430] text-white text-[13px] font-medium rounded-xl hover:bg-[#2c3344] transition-colors cursor-pointer clay-btn"
        >
          <Plus size={15} /> New Classroom
        </button>
      </div>

      {showBuilder && (
        <div className="glass-card p-5 space-y-4 animate-fade-in-up">
          <h3 className="text-[13px] font-semibold text-[#2f384d]">
            Classroom Builder
          </h3>
          <div>
            <p className="text-[10px] font-semibold text-[#7f8799] uppercase tracking-wider mb-2">
              Modules
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { key: "notes", label: "Notes Panel", icon: BookOpen },
                { key: "ai", label: "AI Chat", icon: Code },
                { key: "video", label: "Video Panel", icon: MonitorPlay },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setModules((p) => ({ ...p, [key]: !p[key] }))}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                    modules[key]
                      ? "bg-[#e6eefc] border-[#b5c8ef] text-[#2a4066]"
                      : "bg-white border-[#d6dce8] text-[#626c81] hover:border-[#b9c4da]"
                  }`}
                >
                  <Icon size={14} /> {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-[#7f8799] uppercase tracking-wider mb-2">
              Layout
            </p>
            <div className="flex gap-2">
              {[
                { v: "2", l: "2 Panels" },
                { v: "3", l: "3 Panels" },
              ].map((o) => (
                <button
                  key={o.v}
                  onClick={() => setLayout(o.v)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                    layout === o.v
                      ? "bg-[#e6eefc] border-[#b5c8ef] text-[#2a4066]"
                      : "bg-white border-[#d6dce8] text-[#626c81]"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => navigate("/classroom/new-session")}
            className="px-4 py-2 bg-[#1f2430] text-white text-[13px] font-medium rounded-xl hover:bg-[#2c3344] transition-colors cursor-pointer clay-btn"
          >
            Launch Classroom
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
        {mockClassrooms.map((r) => (
          <div
            key={r.id}
            className="card p-4 cursor-pointer group surface-lift"
            onClick={() => navigate(`/classroom/${r.id}`)}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1.5">
                <h3 className="text-[13px] font-semibold text-[#2f374a] group-hover:text-[#2b4169] transition-colors">
                  {r.name}
                </h3>
                <p className="text-xs text-[#656d80]">{r.subject}</p>
                <div className="flex items-center gap-1 text-[11px] text-[#848b9d]">
                  <Clock size={11} /> <span>{r.lastAccessed}</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-white border border-[#d7dce6] text-[#8a92a4] flex items-center justify-center group-hover:bg-[#e6eefc] group-hover:text-[#2c3f63] transition-colors">
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
