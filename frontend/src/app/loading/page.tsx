// app/loading/page.tsx (version mise à jour avec les nouveaux composants)
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setAnalysisResult } from "@/services";
import RouteGuard, {
  startAnalysisSession,
} from "@/components/guards/route-guard";
import { LoadingHeader } from "@/components/loading/loading-header";
import { AnalysisProgress } from "@/components/loading/analysis-progress";
import { getStoredFile } from "@/services/file-utils";
import { QuotaExceededPopup } from "@/components/ui/quota-exceeded-popup";

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

        const formData = new FormData();
        formData.append("file", file);

        // Étape 1: Extraction du contenu
        setCurrentStep(1);
        formData.set("step", "extraction");
        const extractionResponse = await fetch("/api/analyze", {
          method: "POST",
          body: formData,
        });

        // Étape 2: Analyse de la structure
        setCurrentStep(2);
        formData.set("step", "structure");
        const structureResponse = await fetch("/api/analyze", {
          method: "POST",
          body: formData,
        });

        // Étape 3: Évaluation ATS
        setCurrentStep(3);
        formData.set("step", "ats");
        const atsResponse = await fetch("/api/analyze", {
          method: "POST",
          body: formData,
        });

        // Étape 4: Vérification de la formulation
        setCurrentStep(4);
        formData.set("step", "formulation");
        const formulationResponse = await fetch("/api/analyze", {
          method: "POST",
          body: formData,
        });

        // Étape 5: Génération du verdict
        setCurrentStep(5);
        formData.set("step", "complete");
        const response = await fetch("/api/analyze", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          if (errorData.error === "QUOTA_EXCEEDED") {
            setShowQuotaPopup(true);
            setIsAnalyzing(false);
            return;
          }
          throw new Error("Erreur lors de l'analyse");
        }

        const result = await response.json();

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
