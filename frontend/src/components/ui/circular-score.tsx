import { CircularScoreProps } from "@/lib/interfaces";
import { getVerdictColor } from "@/services/analysis-utils";

export function CircularScore({
  score,
  verdict,
  size = 152,
  innerSize = 112,
}: CircularScoreProps) {
  const ring = getVerdictColor(verdict).ring;
  const safeScore = Math.max(0, Math.min(100, score));

  return (
    <div
      className="relative flex shrink-0 items-center justify-center rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `conic-gradient(${ring} ${safeScore * 3.6}deg, #E5E7EB 0deg)`,
      }}
    >
      <div
        className="flex flex-col items-center justify-center rounded-full bg-white"
        style={{
          width: `${innerSize}px`,
          height: `${innerSize}px`,
        }}
      >
        <span className="text-[34px] font-bold leading-none text-slate-950">
          {safeScore}
        </span>
        <span className="mt-2 text-[16px] text-slate-500">/100</span>
      </div>
    </div>
  );
}