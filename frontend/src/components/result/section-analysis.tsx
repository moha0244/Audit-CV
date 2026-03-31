import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";

interface SectionAnalysisProps {
  title: string;
  score: number;
  maxScore: number;
  goodPoints: string[];
  corrections: string[];
  rewrittenExample: {
    before: string;
    after: string;
  };
}

export function SectionAnalysis({
  title,
  score,
  maxScore,
  goodPoints,
  corrections,
  rewrittenExample
}: SectionAnalysisProps) {
  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "bg-green-50";
    if (percentage >= 60) return "bg-blue-50";
    if (percentage >= 40) return "bg-orange-50";
    return "bg-red-50";
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className={`${getScoreBg(score, maxScore)} p-6 border-b border-gray-200`}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <div className={`text-2xl font-bold ${getScoreColor(score, maxScore)}`}>
            {score}/{maxScore}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Good Points */}
        <div>
          <h4 className="font-medium text-green-700 mb-3 flex items-center gap-2">
            <CheckCircle2 size={18} />
            Ce qui est bien
          </h4>
          <ul className="space-y-2">
            {goodPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Corrections */}
        <div>
          <h4 className="font-medium text-orange-700 mb-3 flex items-center gap-2">
            <XCircle size={18} />
            À corriger
          </h4>
          <ul className="space-y-2">
            {corrections.map((correction, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
                {correction}
              </li>
            ))}
          </ul>
        </div>

        {/* Rewritten Example */}
        <div>
          <h4 className="font-medium text-blue-700 mb-3 flex items-center gap-2">
            <ArrowRight size={18} />
            Exemple réécrit
          </h4>
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-xs font-medium text-red-600 mb-2">Avant :</div>
              <p className="text-sm text-gray-700 italic">"{rewrittenExample.before}"</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-xs font-medium text-green-600 mb-2">Après :</div>
              <p className="text-sm text-gray-700">"{rewrittenExample.after}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
