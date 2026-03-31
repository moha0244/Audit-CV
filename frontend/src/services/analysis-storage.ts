import { AnalysisResult } from "@/lib/interfaces";

let analysisData: AnalysisResult | null = null;

export function setAnalysisResult(data: AnalysisResult) {
  analysisData = data;
  // Store in sessionStorage for persistence across page reloads
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('cvAnalysisResult', JSON.stringify(data));
  }
}

export function getAnalysisResult(): AnalysisResult | null {
  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem('cvAnalysisResult');
    if (stored) {
      try {
        analysisData = JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing stored analysis result:', error);
        sessionStorage.removeItem('cvAnalysisResult');
      }
    }
  }
  return analysisData;
}

export function clearAnalysisResult() {
  analysisData = null;
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('cvAnalysisResult');
    sessionStorage.removeItem('analysisResult');
    sessionStorage.removeItem('uploadedFile');
    sessionStorage.removeItem('analysisSessionStarted');
  }
}
