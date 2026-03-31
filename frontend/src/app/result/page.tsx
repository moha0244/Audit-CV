"use client";

import { useEffect, useState } from "react";
import { getAnalysisResult } from "@/services";
import { AnalysisResult } from "@/lib/interfaces";
import RouteGuard from "@/components/guards/route-guard";
import { ResultHeader } from "@/components/result/result-header";
import { GlobalVerdict } from "@/components/result/global-verdict";
import { DetailedScores } from "@/components/result/detailed-scores";
import { TopPriorities } from "@/components/result/top-priorities";
import { SectionsList } from "@/components/result/sections-list";
import { ProblematicExtractsList } from "@/components/result/problematic-extracts-list";

export default function Result() {
  const [analysisData] = useState<AnalysisResult | null>(() => {
    return getAnalysisResult();
  });

  useEffect(() => {
    if (!analysisData) {
      window.location.href = "/";
    }
  }, [analysisData]);

  if (!analysisData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="text-sm text-slate-500">Chargement...</div>
      </div>
    );
  }

  return (
    <RouteGuard requireAnalysis={true} redirectTo="/">
      <div className="min-h-screen bg-[#F8FAFC]">
        <ResultHeader analysisData={analysisData} />

        <div className="mx-auto max-w-7xl grid-cols-1 gap-8 px-4 py-8 md:px-6 lg:grid-cols-1 lg:items-start">
          <div className="space-y-6 w-full">
            <GlobalVerdict analysisData={analysisData} />
            <DetailedScores analysisData={analysisData} />
            <TopPriorities priorities={analysisData.priorities} />
            <SectionsList sections={analysisData.sections} />
            <ProblematicExtractsList
              extracts={analysisData.problematicExtracts}
            />
          </div>
        </div>
      </div>
    </RouteGuard>
  );
}
