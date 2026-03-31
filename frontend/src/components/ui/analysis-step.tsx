import { AnalysisStepItemProps } from "@/lib/interfaces";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

export default function AnalysisStepItem({ step, currentStep, index }: AnalysisStepItemProps) {
  const isCompleted = step.completed;
  const isCurrent = currentStep === index + 1;
  const isPending = !isCompleted && !isCurrent;

  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg transition-all duration-300 hover:bg-gray-50">
      {/* Icon */}
      <div className="flex-shrink-0 mt-1">
        {isCompleted ? (
          <CheckCircle2 className="w-6 h-6 text-green-500" />
        ) : isCurrent ? (
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        ) : (
          <Circle className="w-6 h-6 text-gray-300" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className={`font-semibold text-lg ${
          isCompleted ? "text-green-700" : 
          isCurrent ? "text-blue-700" : 
          "text-gray-500"
        }`}>
          {step.title}
        </h3>
        <p className={`text-sm ${
          isCompleted ? "text-green-600" : 
          isCurrent ? "text-blue-600" : 
          "text-gray-400"
        }`}>
          {step.description}
        </p>
        {isCurrent && (
          <div className="mt-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-blue-600 font-medium">En cours...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
