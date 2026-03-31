from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
from dal.interfaces import AnalysisResult, StepResult

class ICVAnalysisService(ABC):
    """Interface pour les services d'analyse de CV"""
    
    @abstractmethod
    async def extract_text(self, file_content: bytes, filename: str) -> StepResult:
        """Extraire le texte d'un fichier"""
        pass
    
    @abstractmethod
    async def analyze_structure(self, content: str) -> StepResult:
        """Analyser la structure du CV"""
        pass
    
    @abstractmethod
    async def evaluate_ats(self, content: str) -> StepResult:
        """Évaluer la compatibilité ATS"""
        pass
    
    @abstractmethod
    async def complete_analysis(self, content: str) -> AnalysisResult:
        """Analyse complète du CV"""
        pass
