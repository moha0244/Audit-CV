"use client";

import { useState } from "react";
import { DetailedScoresProps } from "@/lib/interfaces";
import { ChevronDown, Info } from "lucide-react";
import { cn } from "@/services/cn";
import { getScoreHints } from "@/services/analysis-utils";

type ScoreItem = {
  key: string;
  label: string;
  score: number;
  hint?: string;
};

function getBarClasses(score: number) {
  if (score >= 80) return "bg-emerald-500 bg-emerald-100";
  if (score >= 60) return "bg-emerald-500 bg-emerald-100";
  if (score >= 40) return "bg-amber-500 bg-amber-100";
  return "bg-red-500 bg-red-100";
}

export function DetailedScores({ analysisData }: DetailedScoresProps) {
  const scoreHints = getScoreHints(analysisData);
  const [expanded, setExpanded] = useState<string>("");

  const items: ScoreItem[] = [
    {
      key: "readability",
      label: "Lisibilité",
      score: analysisData.readabilityScore,
      hint: scoreHints.readability,
    },
    {
      key: "ats",
      label: "Score ATS",
      score: analysisData.atsScore,
      hint: scoreHints.ats,
    },
    {
      key: "formulation",
      label: "Formulation",
      score: analysisData.formulationScore,
      hint: scoreHints.formulation,
    },
    {
      key: "quantified",
      label: "Résultats chiffrés",
      score: analysisData.quantifiedResultsScore,
      hint: scoreHints.quantified,
    },
  ];

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] md:p-8">
      <h3 className="text-[20px] font-bold tracking-[-0.02em] text-slate-950">
        Scores détaillés
      </h3>
      <p className="mt-2 text-[15px] text-slate-500">
        Cliquez sur un score pour voir le détail
      </p>

      <div className="mt-8 space-y-5">
        {items.map((item) => {
          const isOpen = expanded === item.key;
          const [barColor, trackColor] = getBarClasses(item.score).split(" ");

          return (
            <div
              key={item.key}
              className={cn(
                "rounded-2xl transition-colors",
                isOpen && "bg-slate-50 px-4 py-4",
              )}
            >
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? "" : item.key)}
                className="flex w-full items-center gap-3 text-left"
              >
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <span className="text-[18px] font-semibold text-slate-950">
                    {item.label}
                  </span>
                  <Info size={16} className="shrink-0 text-slate-400" />
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[18px] font-semibold text-slate-950">
                    {item.score}/100
                  </span>
                  <ChevronDown
                    size={18}
                    className={cn(
                      "text-slate-500 transition-transform",
                      isOpen && "rotate-180",
                    )}
                  />
                </div>
              </button>

              <div className={cn("mt-3 h-3 rounded-full", trackColor)}>
                <div
                  className={cn("h-3 rounded-full", barColor)}
                  style={{
                    width: `${Math.max(8, Math.min(item.score, 100))}%`,
                  }}
                />
              </div>

              {isOpen && item.hint && (
                <div className="mt-4 text-[15px] leading-7 text-slate-600">
                  <p>{item.hint}</p>
                  <p className="mt-2 font-semibold text-blue-600">
                    {item.score >= 75
                      ? "Bon score — continuez ainsi"
                      : item.score >= 55
                        ? "Peut être renforcé avec quelques ajustements"
                        : "À retravailler en priorité"}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
