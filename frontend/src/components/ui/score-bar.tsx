import { cn } from "@/services/cn";
import { getProgressColor } from "@/services/analysis-utils";
import { ScoreBarProps } from "@/lib/ui-types";

export function ScoreBar({ label, score, hint }: ScoreBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-slate-800">{label}</span>
        <span className="text-sm font-semibold text-slate-800">
          {score}/100
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn("h-full rounded-full", getProgressColor(score))}
          style={{ width: `${Math.max(0, Math.min(100, score))}%` }}
        />
      </div>
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}
