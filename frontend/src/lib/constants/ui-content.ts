export const UI_CONTENT = {
  HERO: {
    BADGE_TEXT: "Audit gratuit en 30 secondes",
    TITLE: "Votre CV vu par un recruteur, instantanément",
    SUBTITLE:
      "Découvrez ce qu'un recruteur pense de votre CV en moins d'une minute. Score ATS, lisibilité, formulation - obtenez un verdict détaillé et des conseils concrets pour décrocher votre alternance.",
    UPLOAD_TITLE: "Glissez-déposez votre CV",
    UPLOAD_SUBTITLE: "PDF ou DOCX — 5 Mo maximum",
    UPLOAD_MAX_SIZE: "5 Mo",
    ANALYZE_BUTTON: "Analyser mon CV",
    ANALYZING_TITLE: "Analyse de votre CV avec Gemini AI",
    ANALYZING_STATUS: "Analyse en cours...",
    RESULT_TITLE: "Résultats de l'analyse",
    RESULT_COMPLETED: "Analyse terminée",
    RESET_BUTTON: "Analyser un autre CV",
    DETAIL_BUTTON: "Voir les résultats détaillés",
  },

  FEATURES: [
    {
      title: "Analyse IA avancée",
      description: "Gemini AI analyse votre CV comme un recruteur",
      color: "from-blue-500 to-purple-500",
    },
    {
      title: "Résultat instantané",
      description: "Obtenez votre analyse en moins de 30 secondes",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Conseils personnalisés",
      description: "Des recommandations concrètes pour améliorer votre CV",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Score ATS optimisé",
      description: "Maximisez vos chances de passer les filtres ATS",
      color: "from-orange-500 to-red-500",
    },
  ],
  HOW_IT_WORKS: {
    BADGE_TEXT: "En 3 étapes",
    TITLE: "Comment ça marche ?",
    STEPS: [
      {
        title: "1. Uploadez",
        description: "Glissez votre CV au format PDF ou DOCX.",
      },
      {
        title: "2. Analyse IA",
        description: "Notre IA analyse votre CV comme un recruteur.",
      },
      {
        title: "3. Verdict",
        description: "Obtenez un score, des priorités et des conseils.",
      },
    ],
  },
  FAQ: {
    TITLE: "Questions fréquentes",
    QUESTIONS: [
      {
        question: "Comment fonctionne l'analyse IA ?",
        answer:
          "Notre IA utilise Mistral AI pour analyser votre CV selon les critères des recruteurs : format ATS, lisibilité, mots-clés pertinents, structure et formulation.",
      },
      {
        question: "Mes données sont-elles conservées ?",
        answer:
          "Non, votre CV est analysé instantanément et supprimé après l'analyse. Nous ne conservons aucune donnée personnelle.",
      },
      {
        question: "Quels formats sont acceptés ?",
        answer:
          "Nous acceptons les fichiers PDF et DOCX (Word). La taille maximale est de 5 Mo.",
      },
      {
        question: "L'analyse est-elle vraiment gratuite ?",
        answer:
          "Oui, l'analyse de base est totalement gratuite. Vous obtenez un score détaillé et des recommandations personnalisées.",
      },
    ],
  },
  FOOTER: {
    TITLE: "CV à analyser",
    DESCRIPTION:
      "Optimisez votre CV avec l'intelligence artificielle et découvrez comment améliorer vos chances de recrutement.",
    COPYRIGHT: "© 2026 CV à analyser. Tous droits réservés.",
    LINKS: {
      RESOURCES: [
        {
          text: "Guide ATS",
          href: "https://fr.indeed.com/conseils-carrieres/cv-lettres-motivation/comment-faire-cv-sur-word",
        },
      ],
    },
  },
  BACK_TO_TOP: {
    POSITION: "fixed bottom-8 right-8",
    STYLE:
      "bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all z-50",
  },
} as const;
