import { ProblematicExtractsListProps } from "@/lib/interfaces";
import { cn } from "@/services/cn";
import { getPriorityStyle } from "@/services/analysis-utils";
import { AlertCircle } from "lucide-react";

export function ProblematicExtractsList({
  extracts,
}: ProblematicExtractsListProps) {
  if (!extracts?.length) return null;

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] md:p-8">
      <div className="flex items-center gap-3">
        <AlertCircle size={22} className="text-red-500" />
        <h3 className="text-[20px] font-bold tracking-[-0.02em] text-slate-950">
          Extraits problématiques détectés
        </h3>
      </div>

      <p className="mt-3 text-[15px] text-slate-500">
        Passages de votre CV identifiés comme à améliorer
      </p>

      <div className="mt-8 space-y-5">
        {extracts.map((extract, index) => {
          const styles = getPriorityStyle(extract.priority);

          return (
            <div
              key={`${extract.text}-${index}`}
              className={cn(
                "rounded-[24px] border border-red-100 bg-red-50/40 px-6 py-5",
                "border-l-4",
                styles.line,
              )}
            >
              <div>
                <span
                  className={cn(
                    "inline-flex rounded-full border px-4 py-1 text-sm font-semibold capitalize",
                    styles.badge,
                  )}
                >
                  {extract.priority}
                </span>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-5 py-5">
                <p className="font-mono text-[15px] leading-8 text-slate-900">
                  « {extract.text} »
                </p>
              </div>

              <p className="mt-4 flex items-start gap-2 text-[15px] leading-7 text-slate-500">
                <AlertCircle
                  size={16}
                  className="mt-1 shrink-0 text-slate-400"
                />
                <span>{extract.feedback}</span>
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
