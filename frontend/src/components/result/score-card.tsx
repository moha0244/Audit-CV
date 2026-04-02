import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { ScoreCardProps } from "@/lib/interfaces";

export function ScoreCard({ 
  score, 
  title, 
  description, 
  compact = false, 
  verdict 
}: ScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-50";
    if (score >= 60) return "bg-blue-50";
    if (score >= 40) return "bg-orange-50";
    return "bg-red-50";
  };

  const getVerdictColor = (verdict: string) => {
    if (verdict?.toLowerCase().includes("excellent")) return "text-green-700";
    if (verdict?.toLowerCase().includes("bon")) return "text-blue-700";
    if (verdict?.toLowerCase().includes("moyen")) return "text-orange-700";
    return "text-red-700";
  };

  if (compact) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
            {score}/100
          </div>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    );
  }

  return (
    <div className={`${getScoreBg(score)} rounded-xl p-8 text-center`}>
      <div className={`text-5xl font-bold ${getScoreColor(score)} mb-3`}>
        {score}/100
      </div>
      {verdict && (
        <div className={`text-xl font-medium mb-4 ${getVerdictColor(verdict)}`}>
          CV {verdict}
        </div>
      )}
      {description && (
        <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
