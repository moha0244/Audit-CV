import { cn } from "@/services";
import { getProgressColor, getVerdictColor } from "@/services/analysis-utils";

interface ScoreProps {
  score: number;
  verdict?: "excellent" | "bon" | "moyen" | "faible";
  label?: string;
  hint?: string;
  variant: "bar" | "circular" | "card";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Score({ 
  score, 
  verdict, 
  label, 
  hint, 
  variant, 
  size = "md",
  className 
}: ScoreProps) {
  const safeScore = Math.max(0, Math.min(100, score));

  if (variant === "bar") {
    return (
      <div className={cn("space-y-2", className)}>
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-semibold text-slate-800">{label}</span>
          <span className="text-sm font-semibold text-slate-800">
            {safeScore}/100
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className={cn("h-full rounded-full", getProgressColor(safeScore))}
            style={{ width: `${safeScore}%` }}
          />
        </div>
        {hint && <p className="text-xs text-slate-500">{hint}</p>}
      </div>
    );
  }

  if (variant === "circular") {
    const sizes = { sm: 120, md: 152, lg: 200 };
    const innerSizes = { sm: 80, md: 112, lg: 150 };
    const currentSize = sizes[size];
    const currentInnerSize = innerSizes[size];
    
    const ring = verdict ? getVerdictColor(verdict).ring : "#3B82F6";

    return (
      <div className={cn("flex flex-col items-center", className)}>
        <div
          className="relative flex shrink-0 items-center justify-center rounded-full"
          style={{
            width: `${currentSize}px`,
            height: `${currentSize}px`,
            background: `conic-gradient(${ring} ${safeScore * 3.6}deg, #E5E7EB 0deg)`,
          }}
        >
          <div
            className="flex flex-col items-center justify-center rounded-full bg-white"
            style={{
              width: `${currentInnerSize}px`,
              height: `${currentInnerSize}px`,
            }}
          >
            <span className={`font-bold leading-none text-slate-950 ${
              size === "sm" ? "text-[24px]" : 
              size === "md" ? "text-[34px]" : 
              "text-[42px]"
            }`}>
              {safeScore}
            </span>
            <span className={`text-slate-500 ${
              size === "sm" ? "text-[12px] mt-1" : 
              size === "md" ? "text-[16px] mt-2" : 
              "text-[18px] mt-2"
            }`}>/100</span>
          </div>
        </div>
        {label && (
          <p className="mt-3 text-sm font-medium text-slate-700">{label}</p>
        )}
        {verdict && (
          <p className="mt-1 text-xs text-slate-500">{verdict}</p>
        )}
      </div>
    );
  }

  // Card variant
  return (
    <div className={cn(
      "bg-white rounded-xl border border-slate-200 p-6 shadow-sm",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">{label}</h3>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-lg font-bold text-slate-900">{safeScore}/100</span>
        </div>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 mb-3">
        <div
          className={cn("h-full rounded-full", getProgressColor(safeScore))}
          style={{ width: `${safeScore}%` }}
        />
      </div>
      {hint && <p className="text-sm text-slate-600">{hint}</p>}
    </div>
  );
}

