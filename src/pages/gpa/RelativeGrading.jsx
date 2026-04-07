import EmptyState from "../../components/ui/EmptyState";
import { Scale } from "lucide-react";

export default function RelativeGrading() {
  return (
    <div className="space-y-6 max-w-4xl fade-enter">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-[#1f2430]">Relative Grading</h1>
        <p className="text-sm text-[#626a7c]">
          Grade on a curve based on class performance distribution.
        </p>
      </div>
      <EmptyState
        icon={Scale}
        title="Relative Grading — Coming Soon"
        description="This feature will allow you to grade students on a curve using standard deviations and class averages. Stay tuned for updates."
      />
    </div>
  );
}
