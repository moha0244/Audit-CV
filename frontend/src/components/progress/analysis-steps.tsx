import { cn } from "@/services";
import { LucideIcon } from "lucide-react";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

interface AnalysisStep {
  id: string;
  title: string;
  description: string;
  status: "pending" | "loading" | "completed" | "error";
  icon?: LucideIcon;
}

interface AnalysisStepsProps {
  steps: AnalysisStep[];
  className?: string;
}

const AnalysisSteps = ({ steps, className }: AnalysisStepsProps) => {
  const getStatusIcon = (status: AnalysisStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "loading":
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case "error":
        return <Circle className="w-5 h-5 text-red-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-300" />;
    }
  };

  const getStatusColor = (status: AnalysisStep["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "loading":
        return "text-blue-600";
      case "error":
        return "text-red-600";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {steps.map((step) => (
        <div
          key={step.id}
          className={cn(
            "flex items-start gap-4 p-4 rounded-lg transition-all",
            step.status === "completed" && "bg-green-50",
            step.status === "loading" && "bg-blue-50",
            step.status === "error" && "bg-red-50",
            step.status === "pending" && "bg-gray-50"
          )}
        >
          <div className="flex-shrink-0 mt-0.5">
            {getStatusIcon(step.status)}
          </div>
          
          <div className="flex-1">
            <h3 className={cn(
              "font-semibold text-sm mb-1",
              getStatusColor(step.status)
            )}>
              {step.title}
            </h3>
            <p className={cn(
              "text-xs",
              step.status === "completed" ? "text-green-600" : "text-gray-500"
            )}>
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export { AnalysisSteps };
