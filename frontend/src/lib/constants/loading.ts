export const LOADING_CONSTANTS = {
  HEADER: {
    TITLE: "Analyse en cours...",
    SUBTITLE: "Notre IA analyse votre CV comme un véritable recruteur",
    BADGE_TEXT: "Simulation ATS en temps réel",
  },
  PROGRESS: {
    TITLE: "Analyse en cours",
    STEPS: [
      {
        id: 1,
        label: "Extraction du contenu",
        description: "Lecture et analyse du texte",
      },
      {
        id: 2,
        label: "Analyse de la structure",
        description: "Vérification de l'organisation",
      },
      {
        id: 3,
        label: "Évaluation ATS",
        description: "Compatibilité avec les filtres",
      },
      {
        id: 4,
        label: "Vérification de la formulation",
        description: "Qualité du contenu et impact",
      },
      {
        id: 5,
        label: "Génération du verdict",
        description: "Préparation des résultats",
      },
    ],
    STATUS: {
      COMPLETED: "Terminé",
      CURRENT: "En cours",
      PENDING: "En attente",
    },
    FINAL_MESSAGE: "Finalisation du rapport...",
  },
  ANIMATION: {
    DURATION: 2,
    SCALE_RANGE: [1, 1.1, 1],
    ROTATE_RANGE: [0, 5, -5, 0],
    STEP_DELAY: 0.1,
    PROGRESS_DURATION: 0.5,
    CIRCLE_DURATION: 2,
  },
} as const;
