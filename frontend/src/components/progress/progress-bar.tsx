import { ProgressBarProps } from "@/lib/interfaces";

export default function ProgressBar({ currentStep, totalSteps, className = "" }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className="bg-blue-600 h-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
