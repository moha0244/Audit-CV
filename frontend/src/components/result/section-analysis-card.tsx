"use client";

import { useState } from "react";
import { SectionAnalysisCardProps } from "@/lib/interfaces";
import {
  CheckCircle2,
  ChevronDown,
  Copy,
  XCircle,
  User,
  Briefcase,
  GraduationCap,
  Code2,
} from "lucide-react";

function SectionIcon({ title }: { title: string }) {
  const normalized = title.toLowerCase();

  if (
    normalized.includes("profil") ||
    normalized.includes("résumé") ||
    normalized.includes("resume")
  ) {
    return <User size={20} className="text-blue-600" />;
  }

  if (normalized.includes("exp")) {
    return <Briefcase size={20} className="text-blue-600" />;
  }

  if (normalized.includes("formation") || normalized.includes("education")) {
    return <GraduationCap size={20} className="text-blue-600" />;
  }

  return <Code2 size={20} className="text-blue-600" />;
}

export function SectionAnalysisCard({
  section,
  index,
}: SectionAnalysisCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left"
      >
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-50">
            <SectionIcon title={section.title} />
          </div>
          <h4 className="text-[18px] font-semibold text-slate-950">
            {section.title}
          </h4>
        </div>

        <ChevronDown
          size={22}
          className={`shrink-0 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="border-t border-slate-200 px-6 py-6">
          {section.goodPoints?.length > 0 && (
            <div>
              <h5 className="text-sm font-bold uppercase tracking-[0.08em] text-emerald-600">
                Ce qui est bien
              </h5>
              <ul className="mt-4 space-y-3">
                {section.goodPoints.map((point, pointIndex) => (
                  <li
                    key={pointIndex}
                    className="flex items-start gap-3 text-[16px] leading-7 text-slate-900"
                  >
                    <CheckCircle2
                      size={20}
                      className="mt-1 shrink-0 text-emerald-500"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {section.corrections?.length > 0 && (
            <div className="mt-8">
              <h5 className="text-sm font-bold uppercase tracking-[0.08em] text-red-500">
                À corriger
              </h5>
              <ul className="mt-4 space-y-3">
                {section.corrections.map((correction, correctionIndex) => (
                  <li
                    key={correctionIndex}
                    className="flex items-start gap-3 text-[16px] leading-7 text-slate-900"
                  >
                    <XCircle size={20} className="mt-1 shrink-0 text-red-400" />
                    <span>{correction}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {section.rewrittenExample?.after && (
            <div className="mt-8">
              <h5 className="text-sm font-bold uppercase tracking-[0.08em] text-blue-600">
                Exemples réécrits
              </h5>

              <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/50 p-5">
                <p className="text-[16px] leading-8 text-slate-900">
                  {section.rewrittenExample.after}
                </p>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        section.rewrittenExample?.after || "",
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-500 shadow-sm ring-1 ring-slate-200 transition hover:text-slate-700"
                  >
                    <Copy size={16} />
                    Copier
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
