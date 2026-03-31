import { ProblematicExtractsListProps } from "@/lib/interfaces";
import { cn } from "@/services/cn";
import { getPriorityStyle } from "@/services/analysis-utils";
import { AlertCircle } from "lucide-react";

export function ProblematicExtractsList({ extracts }: ProblematicExtractsListProps) {
  if (!extracts?.length) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <AlertCircle size={16} className="text-red-500" />
        <h3 className="text-lg font-semibold text-slate-900">
          Extraits problématiques détectés
        </h3>
      </div>
      <p className="mt-1 text-sm text-slate-500">
        Passages du CV identifiés comme à améliorer
      </p>

      <div className="mt-5 space-y-4">
        {extracts.map((extract, index) => {
          const styles = getPriorityStyle(extract.priority);
          return (
            <div
              key={`${extract.text}-${index}`}
              className={cn(
                "rounded-xl border border-red-100 bg-red-50/40 p-4 border-l-4",
                styles.line,
              )}
            >
              <div className="mb-3">
                <span
                  className={cn(
                    "inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold capitalize",
                    styles.badge,
                  )}
                >
                  {extract.priority}
                </span>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800">
                &laquo; {extract.text} &raquo;
              </div>

              <p className="mt-3 flex items-start gap-2 text-sm text-slate-500">
                <AlertCircle
                  size={14}
                  className="mt-0.5 shrink-0 text-slate-400"
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
