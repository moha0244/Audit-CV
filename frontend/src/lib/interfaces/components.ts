import { LucideIcon } from "lucide-react";
import { FAQ, FAQSectionProps, HeroSectionProps } from './ui';

// General Component Interfaces

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

export interface FeaturesSectionProps {
  features?: Feature[];
}

export interface TrustBadge {
  icon: LucideIcon;
  text: string;
  description: string;
}

export interface TrustBadgeConfig {
  text: string;
  description: string;
}

export interface TrustBadgesProps {
  badges?: TrustBadge[];
}

export interface HowItWorksStep {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface HowItWorksSectionProps {
  steps?: HowItWorksStep[];
}

export interface RouteGuardProps {
  children: React.ReactNode;
  requireAnalysis?: boolean;
  requireUploadedFile?: boolean;
}
