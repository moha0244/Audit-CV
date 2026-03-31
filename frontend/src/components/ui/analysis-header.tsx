import { Brain, Bot } from "lucide-react";

interface AnalysisHeaderProps {
  title?: string;
  description?: string;
}

export default function AnalysisHeader({ 
  title = "Analyse en cours...", 
  description = "Notre IA passe votre CV au crible" 
}: AnalysisHeaderProps) {
  return (
    <div className="text-center mb-8">
      {/* Animated icon */}
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 text-blue-700 mb-6">
        <div className="relative">
          <Brain className="w-10 h-10 text-blue-700 animate-pulse" />
          <Bot className="w-6 h-6 text-blue-600 absolute -bottom-1 -right-1 animate-bounce" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        {title}
      </h1>
      
      <p className="text-gray-600 text-lg">
        {description}
      </p>
    </div>
  );
}
