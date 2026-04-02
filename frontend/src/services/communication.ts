import { AnalysisResult } from "@/lib/interfaces/analysis";
import {
  AnalysisStepResponse,
} from "@/lib/interfaces/api";
import { environment } from "@/config/environment";

export class AnalysisAPI {
  private static async makeRequest(formData: FormData): Promise<Response> {
    const response = await fetch(environment.apiUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // Vérifier si c'est une erreur de quota
      if (
     
        response.status === 429
      ) {
        throw new Error("QUOTA_EXCEEDED");
      }

      throw new Error(errorData.error || `Erreur: ${response.status}`);
    }

    return response;
  }

  static async extractContent(file: File): Promise<AnalysisStepResponse> {
    const formData = new FormData();
    formData.append("file", file);
    formData.set("step", "extraction");

    const response = await this.makeRequest(formData);
    return response.json();
  }

  static async analyzeStructure(file: File): Promise<AnalysisStepResponse> {
    const formData = new FormData();
    formData.append("file", file);
    formData.set("step", "structure");

    const response = await this.makeRequest(formData);
    return response.json();
  }

  static async evaluateATS(file: File): Promise<AnalysisStepResponse> {
    const formData = new FormData();
    formData.append("file", file);
    formData.set("step", "ats");

    const response = await this.makeRequest(formData);
    return response.json();
  }

  static async checkFormulation(file: File): Promise<AnalysisStepResponse> {
    const formData = new FormData();
    formData.append("file", file);
    formData.set("step", "formulation");

    const response = await this.makeRequest(formData);
    return response.json();
  }

  static async completeAnalysis(file: File): Promise<AnalysisResult> {
    const formData = new FormData();
    formData.append("file", file);
    formData.set("step", "complete");

    const response = await this.makeRequest(formData);
    return response.json();
  }

  static async performFullAnalysis(
    file: File,
    onStepChange?: (step: number) => void,
  ): Promise<AnalysisResult> {
    try {
      // Étape 1: Extraction du contenu
      onStepChange?.(1);
      await this.extractContent(file);

      // Étape 2: Analyse de la structure
      onStepChange?.(2);
      await this.analyzeStructure(file);

      // Étape 3: Évaluation ATS
      onStepChange?.(3);
      await this.evaluateATS(file);

      // Étape 4: Vérification de la formulation
      onStepChange?.(4);
      await this.checkFormulation(file);

      // Étape 5: Analyse complète
      onStepChange?.(5);
      const result = await this.completeAnalysis(file);

      return result;
    } catch (error) {
      console.error("Erreur lors de l'analyse complète:", error);
      throw error;
    }
  }
}
