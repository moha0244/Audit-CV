from typing import Dict, Any
from bll.interfaces import ICVAnalysisService
from dal.interfaces import IDataAccess, AnalysisResult, StepResult

class CVAnalysisService(ICVAnalysisService):
    """Service d'analyse de CV - Logique métier"""
    
    def __init__(self, data_access: IDataAccess):
        self.data_access = data_access
    
    async def extract_text(self, file_content: bytes, filename: str) -> StepResult:
        """Extraire le texte d'un fichier"""
        try:
            text = await self.data_access.extract_text_from_file(file_content, filename)
            
            if not text or len(text) < 50:
                raise Exception("Impossible d'extraire suffisamment de texte du fichier")
            
            return StepResult(
                step="extraction",
                status="completed",
                message="Contenu du CV extrait avec succès",
                contentLength=len(text),
                nextStep="structure"
            )
        except Exception as e:
            raise Exception(f"Erreur extraction: {str(e)}")
    
    async def analyze_structure(self, content: str) -> StepResult:
        """Analyser la structure du CV avec l'IA"""
        try:
            # Utiliser l'IA pour analyser la structure
            structure_analysis = await self.data_access.analyze_structure_with_ai(content)
            
            return StepResult(
                step="structure",
                status="completed",
                message="Structure du CV analysée par l'IA",
                structure=structure_analysis["structure"],
                sections=structure_analysis.get("sections", []),
                nextStep="ats"
            )
        except Exception as e:
            raise Exception(f"Erreur analyse structure: {str(e)}")
    
    async def evaluate_ats(self, content: str) -> StepResult:
        """Évaluer la compatibilité ATS avec l'IA"""
        try:
            # Utiliser l'IA pour l'évaluation ATS
            ats_analysis = await self.data_access.evaluate_ats_with_ai(content)
            
            return StepResult(
                step="ats",
                status="completed",
                message="Évaluation ATS terminée par l'IA",
                atsScore=ats_analysis["atsScore"],
                recommendations=ats_analysis["recommendations"],
                nextStep="complete"
            )
        except Exception as e:
            raise Exception(f"Erreur évaluation ATS: {str(e)}")
    
    async def complete_analysis(self, content: str) -> AnalysisResult:
        """Analyse complète du CV"""
        try:
            analysis_data = await self.data_access.analyze_with_ai(content)
            
            # Sauvegarder le résultat
            result = AnalysisResult(**analysis_data)
            await self.data_access.save_analysis_result(result)
            
            return result
        except Exception as e:
            raise Exception(f"Erreur analyse complète: {str(e)}")
    
    
