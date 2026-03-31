from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import Dict, Any, Optional
import os
from dotenv import load_dotenv

# Importer les couches BLL et DAL
from dal.file_service import FileExtractionService
from bll.cv_analysis_service import CVAnalysisService
from dal.interfaces import IDataAccess
from bll.interfaces import ICVAnalysisService
from config import settings

# Charger les variables d'environnement depuis .env
load_dotenv()

# Configuration
app = FastAPI(title=settings.api_title, version=settings.api_version)

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=settings.cors_allow_credentials,
    allow_methods=settings.cors_allow_methods,
    allow_headers=settings.cors_allow_headers,
)

# Configuration Mistral et injection de dépendances
mistral_key = os.getenv("MISTRAL_API_KEY")


# Initialisation des services (Injection de dépendances)
data_access: IDataAccess = FileExtractionService(mistral_key)
business_logic: ICVAnalysisService = CVAnalysisService(data_access)

@app.post("/extract")
async def extract_text(file: UploadFile = File(...)):
    """Extraire le texte d'un fichier PDF ou DOCX"""
    if not file.filename:
        raise HTTPException(status_code=400, detail=settings.error_no_file)
    
    if not any(file.filename.endswith(fmt) for fmt in settings.supported_formats):
        raise HTTPException(status_code=400, detail=settings.error_invalid_format)
    
    try:
        content = await file.read()
        result = await business_logic.extract_text(content, file.filename)
        
        return {
            "text": result.contentLength,
            "length": result.contentLength
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur extraction: {str(e)}")

@app.post("/analyze")
async def analyze_cv(file: UploadFile = File(...), step: str = "complete"):
    """Analyser un CV selon l'étape spécifiée"""
    if not file.filename:
        raise HTTPException(status_code=400, detail=settings.error_no_file)
    
    if not any(file.filename.endswith(fmt) for fmt in settings.supported_formats):
        raise HTTPException(status_code=400, detail=settings.error_invalid_format)
    
    try:
        content = await file.read()
        
        # Extraction du texte
        extraction_result = await business_logic.extract_text(content, file.filename)
        text = await data_access.extract_text_from_file(content, file.filename)
        
        if not text or len(text) < settings.min_content_length:
            raise HTTPException(status_code=400, detail=settings.error_extraction_failed)
        
        # Traiter selon l'étape demandée
        if step == "extraction":
            return extraction_result
        
        elif step == "structure":
            return await business_logic.analyze_structure(text)
        
        elif step == "ats":
            return await business_logic.evaluate_ats(text)
        
        else:  # complete
            analysis = await business_logic.complete_analysis(text)
            return {
                "step": "complete",
                "status": "completed",
                "message": "Analyse complète terminée",
                **analysis.dict()
            }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de l'analyse: {str(e)}")

@app.get("/health")
async def health_check():
    """Vérifier l'état du serveur"""
    return {"status": "healthy", "message": "Serveur Python opérationnel"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=settings.host, port=settings.port)
