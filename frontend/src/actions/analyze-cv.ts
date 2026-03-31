"use server";

import { AnalysisResult } from "@/lib/interfaces/analysis";
import { AnalysisAPI } from "@/services";

export async function analyzeCV(fileContent: string): Promise<AnalysisResult> {
  try {
    // Convertir le contenu en fichier pour l'API
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const file = new File([blob], 'cv.txt', { type: 'text/plain' });
    
    // Utiliser le service API pour l'analyse
    const result = await AnalysisAPI.completeAnalysis(file);
    return result;
    
  } catch (error) {
    console.error("Erreur lors de l'analyse du CV:", error);
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage === 'QUOTA_EXCEEDED') {
      throw new Error('QUOTA_EXCEEDED');
    }
    
    throw new Error("Impossible d'analyser le CV. Veuillez réessayer.");
  }
}
