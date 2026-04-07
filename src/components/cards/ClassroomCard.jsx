import { Clock, ArrowRight } from "lucide-react";
import GlassCard from "../ui/GlassCard";

export default function ClassroomCard({ name, subject, lastAccessed, onClick }) {
  return (
    <GlassCard
      className="p-5 cursor-pointer group hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h3 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-slate-500">{subject}</p>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock size={12} />
            <span>{lastAccessed}</span>
          </div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
          <ArrowRight size={16} />
        </div>
      </div>
    </GlassCard>
  );
}
