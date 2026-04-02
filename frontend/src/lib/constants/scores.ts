export const SCORE_RANGES = {
  EXCELLENT: { min: 85, max: 100 },
  GOOD: { min: 70, max: 84 },
  AVERAGE: { min: 50, max: 69 },
  POOR: { min: 0, max: 49 },
} as const;

export const PRIORITY_LEVELS = {
  CRITIQUE: "critique",
  IMPORTANT: "important",
  MINEUR: "mineur",
} as const;

export const VERDICT_LEVELS = {
  EXCELLENT: "excellent",
  BON: "bon",
  MOYEN: "moyen",
  FAIBLE: "faible",
} as const;

export const DEFAULT_SCORES = {
  OVERALL: 75,
  ATS: 75,
  READABILITY: 80,
  FORMATTING: 85,
  FORMULATION: 70,
  QUANTIFIED_RESULTS: 60,
} as const;

export const COLOR_THRESHOLDS = {
  SCORE: {
    EXCELLENT: 80,
    GOOD: 60,
    AVERAGE: 40,
  },
  PERCENTAGE: {
    EXCELLENT: 80,
    GOOD: 60,
    AVERAGE: 40,
  },
} as const;
