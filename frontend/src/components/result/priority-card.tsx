import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { PriorityCardProps } from "@/lib/result-types";

export function PriorityCard({ priority, title, description }: PriorityCardProps) {
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "critique":
        return {
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          textColor: "text-red-700",
          badgeColor: "bg-red-100 text-red-800",
          icon: AlertTriangle,
          label: "Critique"
        };
      case "important":
        return {
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
          textColor: "text-orange-700",
          badgeColor: "bg-orange-100 text-orange-800",
          icon: AlertCircle,
          label: "Important"
        };
      case "mineur":
        return {
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          textColor: "text-blue-700",
          badgeColor: "bg-blue-100 text-blue-800",
          icon: Info,
          label: "Mineur"
        };
      default:
        return {
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          textColor: "text-gray-700",
          badgeColor: "bg-gray-100 text-gray-800",
          icon: Info,
          label: "Normal"
        };
    }
  };

  const config = getPriorityConfig(priority);
  const Icon = config.icon;

  return (
    <div className={`${config.bgColor} ${config.borderColor} border rounded-xl p-6`}>
      <div className="flex items-start gap-4">
        <div className={`${config.badgeColor} rounded-full p-2`}>
          <Icon size={20} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className={`font-semibold ${config.textColor}`}>{title}</h3>
            <span className={`${config.badgeColor} text-xs font-medium px-2 py-1 rounded-full`}>
              {config.label}
            </span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
