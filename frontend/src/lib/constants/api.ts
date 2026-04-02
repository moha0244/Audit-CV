export const API_CONFIG = {
  GEMINI_MODEL: "gemini-2.5-flash-lite",
  MIN_CONTENT_LENGTH: 50,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_FORMATS: {
    PDF: ["application/pdf", ".pdf"],
    DOCX: [".docx"],
  },
} as const;

export const ERROR_MESSAGES = {
  NO_FILE: "Aucun fichier fourni",
  INVALID_FORMAT: "Format de fichier non supporté. Utilisez PDF ou DOCX.",
  EXTRACTION_FAILED:
    "Impossible d'extraire le contenu du fichier. Vérifiez que le fichier contient du texte.",
  ANALYSIS_FAILED: "Impossible d'analyser le CV. Veuillez réessayer.",
  INVALID_RESPONSE: "Format de réponse invalide",
  CORRUPTED_FILE:
    "Erreur lors de la lecture du fichier. Assurez-vous qu'il n'est pas corrompu.",
} as const;
