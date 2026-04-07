import { FileText, Clock } from "lucide-react";
import GlassCard from "../ui/GlassCard";

export default function NoteCard({ title, preview, timestamp, onClick }) {
  return (
    <GlassCard
      className="p-5 cursor-pointer group hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-amber-50 text-amber-500 mt-0.5">
          <FileText size={18} strokeWidth={1.8} />
        </div>
        <div className="flex-1 min-w-0 space-y-1.5">
          <h3 className="font-semibold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
            {preview}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock size={11} />
            <span>{timestamp}</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
