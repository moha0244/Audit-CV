import { SectionsListProps } from "@/lib/interfaces";
import { SectionAnalysisCard } from "./section-analysis-card";

export function SectionsList({ sections }: SectionsListProps) {
  if (!sections?.length) return null;
 

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] md:p-8">
      <h3 className="text-[20px] font-bold tracking-[-0.02em] text-slate-950">
        Analyse section par section
      </h3>
      <p className="mt-2 text-[15px] text-slate-500">
        Cliquez pour développer chaque section
      </p>

      <div className="mt-8 space-y-5">
        {sections.map((section, index) => (
          <SectionAnalysisCard
            key={`${section.title}-${index}`}
            section={section}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
