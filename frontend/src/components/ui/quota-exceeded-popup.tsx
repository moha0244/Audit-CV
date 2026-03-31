"use client";

import { AlertCircle, Home, X } from "lucide-react";

interface QuotaExceededPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuotaExceededPopup({ isOpen, onClose }: QuotaExceededPopupProps) {
  if (!isOpen) return null;

  const handleGoHome = () => {
    // Nettoyer toutes les données sessionStorage
    sessionStorage.removeItem('cvAnalysisResult');
    sessionStorage.removeItem('analysisResult');
    sessionStorage.removeItem('uploadedFile');
    sessionStorage.removeItem('analysisSessionStarted');
    
    window.location.href = '/';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icône d'alerte */}
        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
          <AlertCircle className="w-6 h-6 text-red-600" />
        </div>

        {/* Contenu */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Quota Gemini dépassé
          </h2>
          <p className="text-gray-600 mb-6">
            Désolé, le quota d&apos;analyse Gemini a été atteint. Veuillez réessayer plus tard ou contacter l&apos;administrateur.
          </p>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-3">
         
          <button
            onClick={handleGoHome}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Retour à l&apos;accueil
          </button>
        </div>
      </div>
    </div>
  );
}
