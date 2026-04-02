import { LucideIcon } from "lucide-react";

// Analysis and Result related interfaces
export interface AnalysisStep {
  id: string;
  title: string;
  description: string;
  status: "pending" | "loading" | "completed" | "error";
  icon?: LucideIcon;
}

export interface AnalysisResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  atsScore: number;
  readabilityScore: number;
  formattingScore: number;
  formulationScore: number;
  quantifiedResultsScore: number;
  overallVerdict: "excellent" | "bon" | "moyen" | "faible";
  description: string;
  priorities: Array<{
    priority: "critique" | "important" | "mineur";
    title: string;
    description: string;
  }>;
  sections: Array<{
    title: string;
    score: number;
    maxScore: number;
    goodPoints: string[];
    corrections: string[];
    rewrittenExample: {
      before: string;
      after: string;
    };
  }>;
  problematicExtracts: Array<{
    priority: "critique" | "important" | "mineur";
    text: string;
    feedback: string;
  }>;
}

export interface StepResult {
  step: string;
  status: "pending" | "loading" | "completed" | "error";
  message: string;
  contentLength?: number;
  nextStep?: string;
  structure?: {
    hasContactInfo: boolean;
    hasExperience: boolean;
    hasEducation: boolean;
    hasSkills: boolean;
  };
  atsScore?: number;
  recommendations?: string[];
  // Allow spreading AnalysisResult properties
  [key: string]: unknown;
}

// Result component interfaces
export interface ScoreCardProps {
  score: number;
  title?: string;
  description?: string;
  compact?: boolean;
  verdict?: string;
}

export interface PriorityCardProps {
  priority: "critique" | "important" | "mineur";
  title: string;
  description: string;
}

export interface TopPrioritiesProps {
  priorities: AnalysisResult["priorities"];
}

export interface SectionsListProps {
  sections: AnalysisResult["sections"];
}

export interface SectionAnalysisProps {
  title: string;
  score: number;
  maxScore: number;
}

export interface SectionAnalysisCardProps {
  section: AnalysisResult["sections"][number];
  index: number;
}

export interface ResultHeaderProps {
  analysisData: AnalysisResult;
}

export interface ProblematicExtractsListProps {
  extracts: AnalysisResult["problematicExtracts"];
}

export interface ProblematicExtractProps {
  extracts: AnalysisResult["problematicExtracts"];
}

export interface GlobalVerdictProps {
  analysisData: AnalysisResult;
}

export interface DetailedScoresProps {
  analysisData: AnalysisResult;
}
