"use client";

import { useMemo, useState } from "react";
import { TopPrioritiesProps } from "@/lib/interfaces";
import { cn } from "@/services/cn";
import { getPriorityStyle } from "@/services/analysis-utils";
import { AlertTriangle } from "lucide-react";

export function TopPriorities({ priorities }: TopPrioritiesProps) {
  const [resolved, setResolved] = useState<number[]>([]);

  const progress = useMemo(() => {
    if (!priorities?.length) return 0;
    return Math.round((resolved.length / priorities.length) * 100);
  }, [priorities, resolved]);

  if (!priorities?.length) return null;

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] md:p-8">
      <div className="flex items-center gap-3">
        <AlertTriangle size={22} className="text-amber-500" />
        <h3 className="text-[20px] font-bold tracking-[-0.02em] text-slate-950">
          Top priorités
        </h3>
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <p className="text-[15px] text-slate-500">
          Cochez les éléments résolus
        </p>
        <p className="text-[15px] font-medium text-slate-500">
          {resolved.length}/{priorities.length} — {progress}%
        </p>
      </div>

      <div className="mt-5 h-3 rounded-full bg-slate-100">
        <div
          className="h-3 rounded-full bg-emerald-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-8 space-y-4">
        {priorities.map((item, index) => {
          const checked = resolved.includes(index);
          const styles = getPriorityStyle(item.priority);

          return (
            <label
              key={`${item.title}-${index}`}
              className={cn(
                "flex cursor-pointer items-start gap-4 rounded-3xl border px-5 py-5 transition-colors",
                checked
                  ? "border-emerald-100 bg-emerald-50/50"
                  : "border-slate-200 bg-slate-50/70 hover:bg-slate-50",
              )}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => {
                  setResolved((current) =>
                    current.includes(index)
                      ? current.filter((value) => value !== index)
                      : [...current, index],
                  );
                }}
                className="sr-only"
              />

              <span
                className={cn(
                  "mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 text-lg font-semibold transition-colors",
                  checked
                    ? "border-emerald-400 bg-emerald-400 text-white"
                    : "border-slate-300 bg-white text-transparent",
                )}
              >
                ✓
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h4
                    className={cn(
                      "text-[18px] font-semibold text-slate-950",
                      checked && "text-slate-400 line-through",
                    )}
                  >
                    {item.title}
                  </h4>
                  <span
                    className={cn(
                      "inline-flex rounded-full border px-4 py-1 text-sm font-semibold capitalize",
                      styles.badge,
                    )}
                  >
                    {item.priority}
                  </span>
                </div>
                <p className="mt-3 text-[15px] leading-7 text-slate-500">
                  {item.description}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}
