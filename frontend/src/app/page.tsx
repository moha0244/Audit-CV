// src/app/page.tsx
"use client";

import Navbar from "@/components/header";
import HeroSection from "@/components/hero-section";
import HowItWorksSection from "@/components/how-it-works-section";
import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer";

import BackToTop from "@/components/back-to-top";
import { useState, useRef, useEffect } from "react";
import { UI_CONSTANTS } from "@/lib/constants/index";
import {
  startAnalysisSession,
  clearAllSessionData,
} from "@/components/guards/route-guard";
import { clearAnalysisResult } from "@/services";

export default function Home() {
 
  useEffect(() => {
    clearAllSessionData();
    clearAnalysisResult();
  }, []);

  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    score: number;
    overallVerdict: string;
    atsScore: number;
    readabilityScore: number;
    formattingScore: number;
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  } | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const uploadedFile = e.dataTransfer.files[0];
      if (
        uploadedFile.type === "application/pdf" ||
        uploadedFile.name.endsWith(".docx")
      ) {
        setFile(uploadedFile);
      } else {
        alert("Veuillez uploader un fichier PDF ou DOCX");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (
        selectedFile.type === "application/pdf" ||
        selectedFile.name.endsWith(".docx")
      ) {
        setFile(selectedFile);
      } else {
        alert("Veuillez uploader un fichier PDF ou DOCX");
      }
    }
  };

  const clearFile = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert("Veuillez d'abord sélectionner un CV");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const base64 = (e.target.result as string).split(",")[1];
        const fileData = {
          name: file.name,
          type: file.type,
          size: file.size,
          content: base64,
        };
        // Start the analysis session before navigating
        startAnalysisSession();
        sessionStorage.setItem("uploadedFile", JSON.stringify(fileData));
        window.location.href = "/loading";
      }
    };
    reader.readAsDataURL(file);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const faqs = [...UI_CONSTANTS.FAQ.QUESTIONS];

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <HeroSection
        file={file}
        dragActive={dragActive}
        isAnalyzing={isAnalyzing}
        analysisResult={analysisResult}
        analysisSteps={[]}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onFileChange={handleFileChange}
        onClear={clearFile}
        onAnalyze={handleAnalyze}
        onResetAnalysis={() => {
          // Clear all session data including previous analysis results
          clearAllSessionData();
          clearAnalysisResult();
          setAnalysisResult(null);
          setFile(null);
          if (inputRef.current) inputRef.current.value = "";
        }}
      />

      <HowItWorksSection />

      <FAQSection faqs={faqs} />

      <Footer />

      <BackToTop show={showBackToTop} onClick={scrollToTop} />
    </main>
  );
}
