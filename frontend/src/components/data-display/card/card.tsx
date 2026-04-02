import { cn } from "@/services";
import { AlertTriangle, CheckCircle, Info, TrendingUp } from "lucide-react";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "priority" | "analysis" | "score";
  severity?: "low" | "medium" | "high";
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function Card({ 
  children, 
  variant = "default", 
  severity,
  title, 
  description, 
  icon,
  className 
}: CardProps) {
  const baseStyles = "bg-white rounded-xl border shadow-sm transition-all hover:shadow-md";
  
  const variants = {
    default: "border-slate-200",
    priority: severity === "high" ? "border-red-200 bg-red-50" : 
              severity === "medium" ? "border-orange-200 bg-orange-50" : 
              "border-yellow-200 bg-yellow-50",
    analysis: "border-blue-200 bg-blue-50",
    score: "border-slate-200"
  };

  const getSeverityIcon = () => {
    if (icon) return icon;
    if (!severity) return null;
    
    switch (severity) {
      case "high": return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case "medium": return <Info className="w-5 h-5 text-orange-600" />;
      case "low": return <CheckCircle className="w-5 h-5 text-yellow-600" />;
      default: return null;
    }
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)}>
      {(title || description || icon) && (
        <div className="p-6 pb-4">
          <div className="flex items-start gap-3">
            {getSeverityIcon()}
            <div className="flex-1">
              {title && (
                <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
              )}
              {description && (
                <p className="text-sm text-slate-600">{description}</p>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="px-6 pb-6">
        {children}
      </div>
    </div>
  );
}

export function PriorityCard({ 
  title, 
  description, 
  severity, 
  actions,
  className 
}: {
  title: string;
  description?: string;
  severity: "low" | "medium" | "high";
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card 
      variant="priority"
      severity={severity}
      title={title}
      description={description}
      className={className}
    >
      {actions && (
        <div className="flex gap-2 mt-4">
          {actions}
        </div>
      )}
    </Card>
  );
}

export function AnalysisCard({ 
  title, 
  score, 
  details,
  recommendations,
  className 
}: {
  title: string;
  score: number;
  details?: string[];
  recommendations?: string[];
  className?: string;
}) {
  return (
    <Card 
      variant="analysis"
      title={title}
      icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
      className={className}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">Score</span>
          <span className="text-lg font-bold text-blue-600">{score}/100</span>
        </div>
        
        {details && details.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-slate-700 mb-2">Détails</h4>
            <ul className="space-y-1">
              {details.map((detail, index) => (
                <li key={index} className="text-sm text-slate-600">• {detail}</li>
              ))}
            </ul>
          </div>
        )}
        
        {recommendations && recommendations.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-slate-700 mb-2">Recommandations</h4>
            <ul className="space-y-1">
              {recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-blue-600">• {rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
}
