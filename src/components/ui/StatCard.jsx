import GlassCard from "./GlassCard";

export default function StatCard({ title, value, subtitle, icon: Icon, accent = "indigo" }) {
  const accentColors = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
  };

  return (
    <GlassCard className="p-5 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
          {subtitle && (
            <p className="text-xs text-slate-500">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-xl ${accentColors[accent]}`}>
            <Icon size={20} strokeWidth={1.8} />
          </div>
        )}
      </div>
    </GlassCard>
  );
}
