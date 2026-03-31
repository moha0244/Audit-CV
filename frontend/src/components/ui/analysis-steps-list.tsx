import { AnalysisStep, AnalysisStepsListProps } from "@/lib/interfaces";
import AnalysisStepItem from "./analysis-step";

export default function AnalysisStepsList({ analysisSteps, currentStep }: AnalysisStepsListProps) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-2">
      {analysisSteps.map((step: AnalysisStep, index: number) => (
        <AnalysisStepItem
          key={step.id}
          step={step}
          currentStep={currentStep}
          index={index}
        />
      ))}
    </div>
  );
}
