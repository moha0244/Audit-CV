import { AnalysisResult } from "@/lib/interfaces";

export function getVerdictLabel(verdict?: AnalysisResult["overallVerdict"]) {
  switch (verdict) {
    case "excellent":
      return "Excellent";
    case "bon":
      return "Bon";
    case "faible":
      return "Risque";
    case "moyen":
    default:
      return "Moyen";
  }
}

export function getVerdictColor(verdict?: AnalysisResult["overallVerdict"]) {
  switch (verdict) {
    case "excellent":
      return {
        text: "text-emerald-600",
        soft: "bg-emerald-100 text-emerald-700",
        ring: "#22c55e",
      };
    case "bon":
      return {
        text: "text-green-600",
        soft: "bg-green-100 text-green-700",
        ring: "#22c55e",
      };
    case "moyen":
      return {
        text: "text-amber-600",
        soft: "bg-amber-100 text-amber-700",
        ring: "#f59e0b",
      };
    case "faible":
    default:
      return {
        text: "text-red-600",
        soft: "bg-red-100 text-red-700",
        ring: "#ef4444",
      };
  }
}

export function getPriorityStyle(priority: "critique" | "important" | "mineur") {
  switch (priority) {
    case "critique":
      return {
        badge: "bg-red-100 text-red-600 border-red-200",
        line: "border-l-red-300",
      };
    case "important":
      return {
        badge: "bg-amber-100 text-amber-700 border-amber-200",
        line: "border-l-amber-300",
      };
    case "mineur":
    default:
      return {
        badge: "bg-blue-100 text-blue-600 border-blue-200",
        line: "border-l-blue-300",
      };
  }
}

export function getProgressColor(score: number) {
  if (score >= 75) return "bg-green-500";
  if (score >= 55) return "bg-amber-500";
  return "bg-red-500";
}

export function getScoreHints(analysisData: AnalysisResult) {
  return {
    readability:
      analysisData.readabilityScore >= 75
        ? "Hiérarchie visuelle claire. La structure est globalement facile à lire."
        : analysisData.readabilityScore >= 55
          ? "La lecture reste correcte mais certains blocs peuvent être condensés."
          : "Le CV gagnerait à être davantage aéré et structuré.",
    ats:
      analysisData.atsScore >= 75
        ? "Le format et les mots-clés sont globalement compatibles ATS."
        : analysisData.atsScore >= 55
          ? "Quelques mots-clés métier manquent pour renforcer la compatibilité ATS."
          : "La compatibilité ATS doit être retravaillée en priorité.",
    formulation:
      analysisData.formulationScore >= 75
        ? "Les formulations sont plutôt claires et orientées action."
        : analysisData.formulationScore >= 55
          ? "Certaines phrases peuvent être rendues plus directes et plus impactantes."
          : "La formulation est trop générique ou passive dans plusieurs zones.",
    quantified:
      analysisData.quantifiedResultsScore >= 75
        ? "Les résultats chiffrés renforcent bien l'impact du CV."
        : analysisData.quantifiedResultsScore >= 55
          ? "Quelques chiffres sont présents, mais ils pourraient être plus nombreux."
          : "Le CV manque d'éléments mesurables pour démontrer l'impact.",
  };
}
