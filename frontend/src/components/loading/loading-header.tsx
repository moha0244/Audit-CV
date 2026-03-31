// components/loading/loading-header.tsx
"use client";

import { Sparkles, Brain, FileSearch } from "lucide-react";
import { motion } from "framer-motion";

export function LoadingHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      {/* Icône animée */}
      <div className="relative inline-block mb-6">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-30"
        />
        <div className="relative w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
          <Brain size={32} className="text-white" />
        </div>
      </div>

      {/* Titre */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
        Analyse en cours...
      </h1>

      {/* Sous-titre */}
      <p className="text-gray-500 text-base max-w-md mx-auto">
        Notre IA analyse votre CV comme un véritable recruteur
      </p>

      {/* Badge informatif */}
      <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full">
        <FileSearch size={14} className="text-blue-600" />
        <span className="text-xs text-blue-600 font-medium">
          Simulation ATS en temps réel
        </span>
      </div>
    </motion.div>
  );
}
