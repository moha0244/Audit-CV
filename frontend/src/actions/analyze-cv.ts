"use server";

import { AnalysisResult } from "@/lib/types";

export async function analyzeCV(fileContent: string): Promise<AnalysisResult> {
  try {
    // Appeler l'API backend pour l'analyse
    const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:8000'}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: fileContent }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Vérifier si c'est une erreur de quota
      if (errorData.error?.includes('quota') || 
          errorData.error?.includes('rate limit') || 
          errorData.error?.includes('RESOURCE_EXHAUSTED') ||
          response.status === 429) {
        throw new Error('QUOTA_EXCEEDED');
      }
      
      throw new Error(`Erreur backend: ${response.status}`);
    }

    const result = await response.json();
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
