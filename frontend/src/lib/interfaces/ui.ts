import { LucideIcon } from "lucide-react";
import { AnalysisStep, AnalysisResult } from "./analysis";

// UI Component Interfaces
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

export interface BadgeProps {
  variant?: "default" | "secondary" | "success" | "warning";
  size?: "sm" | "md";
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export interface ScoreBarProps {
  label: string;
  score: number;
  hint?: string;
}

export interface CircularScoreProps {
  score: number;
  verdict?: AnalysisResult["overallVerdict"];
  size?: number;
  innerSize?: number;
}

export interface UploadAreaProps {
  file?: File | null;
  dragActive?: boolean;
  onDragEnter?: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  onClick?: () => void;
  onClear?: () => void;
  icon?: LucideIcon;
  title?: string;
  subtitle?: string;
  acceptedTypes?: string;
  maxSize?: string;
  className?: string;
  children?: React.ReactNode;
}

export interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface SectionIconProps {
  title: string;
}

export interface BackButtonProps {
  onClick?: () => void;
  showHome?: boolean;
  className?: string;
}

export interface AnalysisStepsProps {
  steps: AnalysisStep[];
  className?: string;
}

export interface AnalysisStepsListProps {
  analysisSteps: AnalysisStep[];
  currentStep: number;
}

export interface AnalysisStepItemProps {
  step: AnalysisStep;
  currentStep: number;
  index: number;
}

export interface AnalysisHeaderProps {
  title?: string;
  description?: string;
}

export interface BackToTopProps {
  show: boolean;
  onClick: () => void;
}

export interface AnalysisProgressProps {
  currentStep: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  faqs?: FAQ[];
}

export interface HeroSectionProps {
  file?: File | null;
  dragActive?: boolean;
  isAnalyzing?: boolean;
  analysisResult?: {
    score: number;
    overallVerdict: string;
    atsScore: number;
    readabilityScore: number;
    formattingScore: number;
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  } | null;
  analysisSteps: AnalysisStep[];
  onDragEnter?: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  onAnalyze?: () => void;
  onResetAnalysis?: () => void;
}
