import { GlobalVerdictProps } from "@/lib/interfaces";
import { cn } from "@/services/cn";
import { getVerdictLabel, getVerdictColor } from "@/services/analysis-utils";
import { Score } from "@/components";

export function GlobalVerdict({ analysisData }: GlobalVerdictProps) {
  const verdict = getVerdictLabel(analysisData.overallVerdict);
  const verdictStyle = getVerdictColor(analysisData.overallVerdict);

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white px-8 py-10 shadow-[0_1px_2px_rgba(15,23,42,0.04)] md:px-12 md:py-12">
      <div className="grid gap-10 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
        <div className="flex flex-col items-center justify-center gap-5">
          <Score
            variant="circular"
            score={analysisData.score}
            verdict={analysisData.overallVerdict}
            size="md"
          />

          <span
            className={cn(
              "inline-flex items-center rounded-full px-6 py-2.5 text-[18px] font-semibold",
              verdictStyle.soft,
            )}
          >
            {verdict}
          </span>
        </div>

        <div className="min-w-0">
          <h2 className="text-[30px] font-bold tracking-[-0.02em] text-slate-950 md:text-[32px]">
            Verdict global
          </h2>

          <p className="mt-3 text-[18px] text-slate-500 md:text-[20px]">
            Analyse personnalisée du CV
          </p>

          <p className="mt-7 max-w-4xl text-[20px] leading-[1.55] text-slate-900 md:text-[21px]">
            {analysisData.description}
          </p>
        </div>
      </div>
    </section>
  );
}