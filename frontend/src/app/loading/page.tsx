// app/loading/page.tsx (version mise à jour avec les nouveaux composants)
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setAnalysisResult, AnalysisAPI } from "@/services";
import RouteGuard, {
  startAnalysisSession,
} from "@/components/guards/route-guard";
import { LoadingHeader, AnalysisProgress, QuotaExceededPopup } from "@/components";
import { getStoredFile } from "@/services/file-utils";

export default function Loading() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [showQuotaPopup, setShowQuotaPopup] = useState(false);

  useEffect(() => {
    // Start analysis session when entering loading page
    startAnalysisSession();

    if (!isAnalyzing) return;

    const performAnalysis = async () => {
      try {
        const file = getStoredFile();
        if (!file) {
          console.error("Aucun fichier trouvé");
          setIsAnalyzing(false);
          return;
        }

        const result = await AnalysisAPI.performFullAnalysis(
          file,
          (step) => setCurrentStep(step)
        );

        setAnalysisResult(result);
        sessionStorage.removeItem("uploadedFile");

        setTimeout(() => {
          router.push("/result");
        }, 1000);
      } catch (error) {
        console.error("Erreur lors de l'analyse:", error);
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        if (errorMessage === "QUOTA_EXCEEDED") {
          setShowQuotaPopup(true);
        }
        setIsAnalyzing(false);
      }
    };

    performAnalysis();
  }, [isAnalyzing]);

  return (
    <RouteGuard requireUploadedFile={true} redirectTo="/">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center p-4">
        <LoadingHeader />
        <AnalysisProgress currentStep={currentStep} />
        <QuotaExceededPopup
          isOpen={showQuotaPopup}
          onClose={() => setShowQuotaPopup(false)}
        />
      </div>
    </RouteGuard>
  );
}
