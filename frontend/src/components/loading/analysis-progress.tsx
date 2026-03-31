// components/loading/analysis-progress.tsx
"use client";

import {
  CheckCircle2,
  Loader2,
  Circle,
  FileText,
  Layout,
  BarChart3,
  PenTool,
  FileCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AnalysisProgressProps {
  currentStep: number;
}

export function AnalysisProgress({ currentStep }: AnalysisProgressProps) {
  const steps = [
    {
      id: 1,
      label: "Extraction du contenu",
      description: "Lecture et analyse du texte",
      icon: FileText,
    },
    {
      id: 2,
      label: "Analyse de la structure",
      description: "Vérification de l'organisation",
      icon: Layout,
    },
    {
      id: 3,
      label: "Évaluation ATS",
      description: "Compatibilité avec les filtres",
      icon: BarChart3,
    },
    {
      id: 4,
      label: "Vérification de la formulation",
      description: "Qualité du contenu et impact",
      icon: PenTool,
    },
    {
      id: 5,
      label: "Génération du verdict",
      description: "Préparation des résultats",
      icon: FileCheck,
    },
  ];

  // Déterminer l'état de chaque étape
  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "current";
    return "pending";
  };

  // Calculer la progression globale
  const progressPercentage = ((currentStep - 1) / steps.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Barre de progression principale */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Analyse en cours</span>
          <span className="font-medium text-blue-600">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          />
        </div>
      </div>

      {/* Liste des étapes */}
      <div className="space-y-3">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                relative flex items-start gap-4 p-4 rounded-xl transition-all duration-300
                ${
                  status === "completed"
                    ? "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100"
                    : status === "current"
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 shadow-lg"
                      : "bg-white border border-gray-100"
                }
              `}
            >
              {/* Cercle avec état */}
              <div className="flex-shrink-0">
                {status === "completed" ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-md"
                  >
                    <CheckCircle2 size={20} className="text-white" />
                  </motion.div>
                ) : status === "current" ? (
                  <div className="relative w-10 h-10">
                    {/* Cercle de progression animé */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="20"
                        cy="20"
                        r="16"
                        stroke="#e2e8f0"
                        strokeWidth="3"
                        fill="none"
                      />
                      <motion.circle
                        cx="20"
                        cy="20"
                        r="16"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "0 100" }}
                        animate={{ strokeDasharray: "100 100" }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{ strokeDashoffset: 0 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2
                        size={20}
                        className="text-blue-600 animate-spin"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-200">
                    <Circle size={18} className="text-gray-400" />
                  </div>
                )}
              </div>

              {/* Contenu */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <step.icon
                    size={16}
                    className={`
                    ${status === "completed" ? "text-green-600" : status === "current" ? "text-blue-600" : "text-gray-400"}
                  `}
                  />
                  <h3
                    className={`
                    font-semibold text-sm
                    ${status === "completed" ? "text-green-800" : status === "current" ? "text-blue-800" : "text-gray-700"}
                  `}
                  >
                    {step.label}
                  </h3>
                </div>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>

              {/* Badge d'état */}
              <div className="flex-shrink-0">
                {status === "completed" ? (
                  <span className="text-xs font-medium text-green-600 bg-green-100 px-2.5 py-1 rounded-full">
                    Terminé
                  </span>
                ) : status === "current" ? (
                  <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full animate-pulse">
                    En cours
                  </span>
                ) : (
                  <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                    En attente
                  </span>
                )}
              </div>

              {/* Ligne de connexion entre les étapes */}
              {index < steps.length - 1 && status === "completed" && (
                <div className="absolute left-[1.625rem] top-[3.75rem] w-px h-8 bg-green-300" />
              )}
              {index < steps.length - 1 && status === "current" && (
                <div className="absolute left-[1.625rem] top-[3.75rem] w-px h-8 bg-blue-300 animate-pulse" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Message de progression */}
      <AnimatePresence>
        {currentStep === 5 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full">
              <Loader2 size={14} className="text-purple-600 animate-spin" />
              <span className="text-sm font-medium text-purple-600">
                Finalisation du rapport...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
