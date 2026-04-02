import PyPDF2
import docx
import io
import re
from mistralai import Mistral
from typing import Dict, Any
from .interfaces import IDataAccess, AnalysisResult
import json
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import settings

class FileExtractionService(IDataAccess):
    """Service d'extraction de fichiers"""
    
    def __init__(self, mistral_api_key: str):
        self.client = Mistral(api_key=mistral_api_key)
    
    async def extract_text_from_file(self, file_content: bytes, filename: str) -> str:
        """Extraire le texte d'un fichier PDF ou DOCX"""
        try:
            if filename.endswith('.pdf'):
                return self._extract_from_pdf(file_content)
            elif filename.endswith('.docx'):
                return self._extract_from_docx(file_content)
            else:
                raise ValueError(f"Format de fichier non supporté: {filename}")
        except Exception as e:
            raise Exception(f"Erreur extraction fichier: {str(e)}")
    
    def _extract_from_pdf(self, pdf_content: bytes) -> str:
        """Extraire le texte d'un PDF"""
        try:
            pdf_file = io.BytesIO(pdf_content)
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
            
            return text.strip()
        except Exception as e:
            # Fallback method
            content = pdf_content.decode('latin-1', errors='ignore')
            text_streams = re.findall(r'BT\s*([^*]+?)\s*ET', content)
            extracted_text = ' '.join(text_streams)
            return re.sub(r'\s+', ' ', extracted_text).strip()
    
    def _extract_from_docx(self, docx_content: bytes) -> str:
        """Extraire le texte d'un DOCX"""
        try:
            doc = docx.Document(io.BytesIO(docx_content))
            text = ""
            for paragraph in doc.paragraphs:
                text += paragraph.text + "\n"
            return text.strip()
        except Exception as e:
            raise Exception(f"Erreur extraction DOCX: {str(e)}")
    
    async def analyze_with_ai(self, content: str) -> Dict[str, Any]:
        """Analyser le contenu avec Mistral AI"""
        try:
            prompt = f"""
            Analyse ce CV comme un recruteur expérimenté, et fournis une évaluation détaillée au format JSON avec la structure suivante:
            {{
                "score": 0-100,
                "strengths": ["force1", "force2"],
                "weaknesses": ["faiblesse1", "faiblesse2"],
                "recommendations": ["recommandation1", "recommandation2"],
                "atsScore": 0-100,
                "readabilityScore": 0-100,
                "formattingScore": 0-100,
                "formulationScore": 0-100,
                "quantifiedResultsScore": 0-100,
                "overallVerdict": "excellent|bon|moyen|faible",
                "description": "description globale",
                "priorities": [
                    {{
                        "priority": "critique|important|mineur",
                        "title": "titre",
                        "description": "description"
                    }}
                ],
                "sections": [
                    {{
                        "title": "nom de la section",
                        "score": 0-20,
                        "maxScore": 20,
                        "goodPoints": ["point positif1"],
                        "corrections": ["correction1"],
                        "rewrittenExample": {{
                            "before": "texte original",
                            "after": "texte amélioré"
                        }}
                    }}
                ],
                "problematicExtracts": [
                    {{
                        "priority": "critique|important|mineur",
                        "text": "texte problématique",
                        "feedback": "suggestion d'amélioration"
                    }}
                ]
            }}
            
            CV à analyser:
            {content}
            """
            
            response = self.client.chat.complete(
                model=settings.mistral_model,
                messages=[{"role": "user", "content": prompt}]
            )
            response_text = response.choices[0].message.content
            
            # Extraire le JSON de la réponse
            json_match = re.search(r'\{[\s\S]*\}', response_text)
            if not json_match:
                raise Exception("Format de réponse invalide")
            
            analysis = json.loads(json_match[0])
            
            # Valider et normaliser les données
            return {
                "score": min(100, max(0, analysis.get("score", 0))),
                "strengths": analysis.get("strengths", []),
                "weaknesses": analysis.get("weaknesses", []),
                "recommendations": analysis.get("recommendations", []),
                "atsScore": min(100, max(0, analysis.get("atsScore", 0))),
                "readabilityScore": min(100, max(0, analysis.get("readabilityScore", 0))),
                "formattingScore": min(100, max(0, analysis.get("formattingScore", 0))),
                "formulationScore": min(100, max(0, analysis.get("formulationScore", 0))),
                "quantifiedResultsScore": min(100, max(0, analysis.get("quantifiedResultsScore", 0))),
                "overallVerdict": analysis.get("overallVerdict", "moyen"),
                "description": analysis.get("description", "Analyse du CV complétée avec succès"),
                "priorities": analysis.get("priorities", []),
                "sections": analysis.get("sections", []),
                "problematicExtracts": analysis.get("problematicExtracts", [])
            }
            
        except Exception as e:
            raise Exception(f"Erreur analyse Mistral: {str(e)}")
    
    async def analyze_structure_with_ai(self, content: str) -> Dict[str, Any]:
        """Analyser la structure du CV avec Mistral AI"""
        try:
            prompt = f"""
            Analyse la structure de ce CV comme un recruteur expérimenté et fournis une évaluation au format JSON:
            {{
                "structure": {{
                    "hasContactInfo": true/false,
                    "hasExperience": true/false,
                    "hasEducation": true/false,
                    "hasSkills": true/false,
                    "hasObjective": true/false,
                    "hasProjects": true/false,
                    "hasCertifications": true/false,
                    "sectionCount": nombre,
                    "wellOrganized": true/false,
                    "missingSections": ["section1", "section2"]
                }}
            }}
            
            CV à analyser:
            {content}
            """
            
            response = self.client.chat.complete(
                model=settings.mistral_model,
                messages=[{"role": "user", "content": prompt}]
            )
            response_text = response.choices[0].message.content
            
            # Extraire le JSON de la réponse
            json_match = re.search(r'\{[\s\S]*\}', response_text)
            if not json_match:
                raise Exception("Format de réponse invalide")
            
            analysis = json.loads(json_match[0])
            return analysis
            
        except Exception as e:
            raise Exception(f"Erreur analyse structure IA: {str(e)}")
    
    async def evaluate_ats_with_ai(self, content: str) -> Dict[str, Any]:
        """Évaluer la compatibilité ATS avec Mistral AI"""
        try:
            prompt = f"""
            Évalue la compatibilité ATS de ce CV comme un recruteur expérimenté et fournis une évaluation au format JSON:
            {{
                "atsScore": 0-100,
                "recommendations": [
                    "recommandation1",
                    "recommandation2"
                ],
                "strengths": [
                    "force1",
                    "force2"
                ],
                "weaknesses": [
                    "faiblesse1",
                    "faiblesse2"
                ],
                "formatIssues": [
                    "problème1",
                    "problème2"
                ]
            }}
            
            CV à analyser:
            {content}
            """
            
            response = self.client.chat.complete(
                model=settings.mistral_model,
                messages=[{"role": "user", "content": prompt}]
            )
            response_text = response.choices[0].message.content
            
            # Extraire le JSON de la réponse
            json_match = re.search(r'\{[\s\S]*\}', response_text)
            if not json_match:
                raise Exception("Format de réponse invalide")
            
            analysis = json.loads(json_match[0])
            
            # Valider et normaliser les données
            return {
                "atsScore": min(100, max(0, analysis.get("atsScore", 0))),
                "recommendations": analysis.get("recommendations", []),
                "strengths": analysis.get("strengths", []),
                "weaknesses": analysis.get("weaknesses", []),
                "formatIssues": analysis.get("formatIssues", [])
            }
            
        except Exception as e:
            raise Exception(f"Erreur évaluation ATS IA: {str(e)}")
    
    async def check_formulation_with_ai(self, content: str) -> Dict[str, Any]:
        """Vérifier la formulation du CV avec Mistral AI"""
        try:
            prompt = f"""
            Analyse la formulation et le style de ce CV comme un recruteur expérimenté et fournis une évaluation au format JSON:
            {{
                "formulationScore": 0-100,
                "formulationIssues": [
                    {{
                        "type": "grammaire|orthographe|style|terminologie",
                        "text": "texte problématique",
                        "correction": "texte corrigé",
                        "explanation": "explication de l'erreur"
                    }}
                ],
                "suggestions": [
                    "suggestion d'amélioration 1",
                    "suggestion d'amélioration 2"
                ],
                "strengths": [
                    "force de formulation 1",
                    "force de formulation 2"
                ]
            }}
            
            CV à analyser:
            {content}
            """
            
            response = self.client.chat.complete(
                model=settings.mistral_model,
                messages=[{"role": "user", "content": prompt}]
            )
            response_text = response.choices[0].message.content
            
            # Extraire le JSON de la réponse
            json_match = re.search(r'\{[\s\S]*\}', response_text)
            if not json_match:
                raise Exception("Format de réponse invalide")
            
            analysis = json.loads(json_match[0])
            
            # Valider et normaliser les données
            return {
                "formulationScore": min(100, max(0, analysis.get("formulationScore", 0))),
                "formulationIssues": analysis.get("formulationIssues", []),
                "suggestions": analysis.get("suggestions", []),
                "strengths": analysis.get("strengths", [])
            }
            
        except Exception as e:
            raise Exception(f"Erreur vérification formulation IA: {str(e)}")
    
    async def save_analysis_result(self, result: AnalysisResult) -> bool:
        """Sauvegarder le résultat d'analyse (simulation)"""
        # Dans une vraie application, sauvegarder en base de données
        return True
    
    async def get_analysis_result(self, analysis_id: str) -> AnalysisResult:
        """Récupérer un résultat d'analyse (simulation)"""
        # Dans une vraie application, récupérer depuis la base de données
        return None
