"use client";

import { Badge, UploadArea, Button, AnalysisSteps } from "@/components/ui";
import { UI_CONSTANTS } from "@/lib/constants/index";
import { HeroSectionProps } from "@/lib/interfaces";
import { Upload, BarChart3, CheckCircle2, Circle, Zap } from "lucide-react";
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection({
  file,
  dragActive,
  isAnalyzing,
  analysisResult,
  analysisSteps,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onFileChange,
  onClear,
  onAnalyze,
  onResetAnalysis,
}: HeroSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="flex flex-col items-center text-center px-4 pt-8 pb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Badge variant="default" icon={Zap}>
          {UI_CONSTANTS.HERO.BADGE_TEXT}
        </Badge>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 max-w-2xl leading-tight"
      >
        {UI_CONSTANTS.HERO.TITLE.split(", ").map((part, index) => (
          <span key={index}>
            {index === 0 && <span> {part}</span>}
            {index === 1 && <span className="text-blue-600"> {part}</span>}
          </span>
        ))}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-gray-500 max-w-xl mb-12 leading-relaxed text-lg"
      >
        {UI_CONSTANTS.HERO.SUBTITLE}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-200 p-10"
      >
        <AnimatePresence mode="wait">
          {isAnalyzing ? (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  {UI_CONSTANTS.HERO.ANALYZING_STATUS}
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {UI_CONSTANTS.HERO.ANALYZING_TITLE}
                </h2>
              </div>
              <AnalysisSteps steps={analysisSteps} />
            </motion.div>
          ) : analysisResult ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium mb-4">
                  <CheckCircle2 size={16} />
                  {UI_CONSTANTS.HERO.RESULT_COMPLETED}
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {UI_CONSTANTS.HERO.RESULT_TITLE}
                </h2>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="text-4xl font-bold text-blue-600 mb-2"
                >
                  {analysisResult.score}/100
                </motion.div>
                <div className="text-lg font-medium text-gray-700 capitalize">
                  CV {analysisResult.overallVerdict}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors">
                  <div className="text-2xl font-bold text-gray-700">
                    {analysisResult.atsScore}
                  </div>
                  <div className="text-xs text-gray-500">Score ATS</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors">
                  <div className="text-2xl font-bold text-gray-700">
                    {analysisResult.readabilityScore}
                  </div>
                  <div className="text-xs text-gray-500">Lisibilité</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors">
                  <div className="text-2xl font-bold text-gray-700">
                    {analysisResult.formattingScore}
                  </div>
                  <div className="text-xs text-gray-500">Formatage</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-green-700 mb-3">
                    Points forts
                  </h3>
                  <ul className="space-y-2">
                    {analysisResult.strengths.map(
                      (strength: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-green-500 mt-0.5 flex-shrink-0"
                          />
                          {strength}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-orange-700 mb-3">
                    Points à améliorer
                  </h3>
                  <ul className="space-y-2">
                    {analysisResult.weaknesses.map(
                      (weakness: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <Circle
                            size={16}
                            className="text-orange-500 mt-0.5 flex-shrink-0"
                          />
                          {weakness}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-blue-700 mb-3">
                  Recommandations
                </h3>
                <ul className="space-y-2">
                  {analysisResult.recommendations.map(
                    (rec: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        {rec}
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={
                    onResetAnalysis ||
                    (() => {
                      if (inputRef.current) inputRef.current.value = "";
                    })
                  }
                  variant="secondary"
                  className="flex-1"
                >
                  {UI_CONSTANTS.HERO.RESET_BUTTON}
                </Button>
                <Button
                  onClick={() => (window.location.href = "/result")}
                  variant="primary"
                  className="flex-1"
                >
                  {UI_CONSTANTS.HERO.DETAIL_BUTTON}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <UploadArea
                file={file}
                dragActive={dragActive}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
                onClear={onClear}
                icon={Upload}
                title={UI_CONSTANTS.HERO.UPLOAD_TITLE}
                subtitle={UI_CONSTANTS.HERO.UPLOAD_SUBTITLE}
                maxSize={UI_CONSTANTS.HERO.UPLOAD_MAX_SIZE}
              />
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept=".pdf,.docx"
                onChange={onFileChange}
              />
              <motion.div
                whileHover={{ scale: file ? 1.02 : 1 }}
                whileTap={{ scale: file ? 0.98 : 1 }}
              >
                <Button
                  onClick={onAnalyze}
                  size="lg"
                  icon={BarChart3}
                  iconPosition="left"
                  className="w-full mt-6"
                  disabled={!file}
                >
                  {UI_CONSTANTS.HERO.ANALYZE_BUTTON}
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
