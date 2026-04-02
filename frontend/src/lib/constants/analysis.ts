// Analysis steps constants
export const ANALYSIS_STEPS = {
  EXTRACTION: {
    id: 1,
    step: "extraction",
    label: "Extraction du contenu",
    description: "Lecture et analyse du texte"
  },
  STRUCTURE: {
    id: 2,
    step: "structure",
    label: "Analyse de la structure",
    description: "Vérification de l'organisation"
  },
  ATS: {
    id: 3,
    step: "ats",
    label: "Évaluation ATS",
    description: "Compatibilité avec les filtres"
  },
  FORMULATION: {
    id: 4,
    step: "formulation",
    label: "Vérification de la formulation",
    description: "Qualité du contenu et impact"
  },
  COMPLETE: {
    id: 5,
    step: "complete",
    label: "Génération du verdict",
    description: "Préparation des résultats"
  }
} as const;

export const TOTAL_STEPS = Object.keys(ANALYSIS_STEPS).length;
