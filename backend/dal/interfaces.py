from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
import os
from pydantic import BaseModel

class AnalysisResult(BaseModel):
    score: int
    strengths: list
    weaknesses: list
    recommendations: list
    atsScore: int
    readabilityScore: int
    formattingScore: int
    formulationScore: int
    quantifiedResultsScore: int
    overallVerdict: str
    description: str
    priorities: list
    sections: list
    problematicExtracts: list

class StepResult(BaseModel):
    step: str
    status: str
    message: str
    contentLength: Optional[int] = None
    nextStep: Optional[str] = None
    structure: Optional[Dict[str, bool]] = None
    atsScore: Optional[int] = None
    recommendations: Optional[list] = None

class IDataAccess(ABC):
    """Interface pour l'accès aux données"""
    
    @abstractmethod
    async def extract_text_from_file(self, file_content: bytes, filename: str) -> str:
        """Extraire le texte d'un fichier"""
        pass
    
    @abstractmethod
    async def analyze_with_ai(self, content: str) -> Dict[str, Any]:
        """Analyser le contenu avec l'IA"""
        pass
    
    @abstractmethod
    async def analyze_structure_with_ai(self, content: str) -> Dict[str, Any]:
        """Analyser la structure du CV avec l'IA"""
        pass
    
    @abstractmethod
    async def evaluate_ats_with_ai(self, content: str) -> Dict[str, Any]:
        """Évaluer la compatibilité ATS avec l'IA"""
        pass
    
    @abstractmethod
    async def save_analysis_result(self, result: AnalysisResult) -> bool:
        """Sauvegarder le résultat d'analyse"""
        pass
    
    @abstractmethod
    async def get_analysis_result(self, analysis_id: str) -> Optional[AnalysisResult]:
        """Récupérer un résultat d'analyse"""
        pass
