import { Construction } from "lucide-react";
import GlassCard from "./GlassCard";

export default function EmptyState({
  title = "Coming Soon",
  description = "This feature is currently under development.",
  icon: Icon = Construction,
}) {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <GlassCard className="p-10 text-center max-w-md">
        <div className="inline-flex p-4 rounded-2xl bg-white border border-[#dde2ec] mb-5">
          <Icon size={32} className="text-[#6a7488]" strokeWidth={1.5} />
        </div>
        <h3 className="text-lg font-semibold text-[#2d3548] mb-2">{title}</h3>
        <p className="text-sm text-[#616a7e] leading-relaxed">{description}</p>
      </GlassCard>
    </div>
  );
}
