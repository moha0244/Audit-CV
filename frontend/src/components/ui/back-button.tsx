import { ArrowLeft, Home } from "lucide-react";

interface BackButtonProps {
  onClick?: () => void;
  showHome?: boolean;
  className?: string;
}

export default function BackButton({ 
  onClick, 
  showHome = false, 
  className = "" 
}: BackButtonProps) {
  const handleBack = () => {

    sessionStorage.removeItem('cvAnalysisResult');
    sessionStorage.removeItem('analysisResult');
    sessionStorage.removeItem('uploadedFile');
    sessionStorage.removeItem('analysisSessionStarted');
    
  
    if (onClick) {
      onClick();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Retour</span>
      {showHome && <Home className="w-4 h-4 ml-2" />}
    </button>
  );
}
