import os
from typing import List
from pydantic_settings import BaseSettings
from pydantic import ConfigDict


class Settings(BaseSettings):
    model_config = ConfigDict(
        env_file=".env",
        case_sensitive=False,
        extra="allow"  # Permettre les champs supplémentaires comme les clés API
    )
    # API Configuration
    api_title: str = "CV Analysis API"
    api_version: str = "1.0.0"
    
    # Server Configuration
    host: str = "0.0.0.0"
    port: int = 8000
    
    # CORS Configuration
    cors_origins: List[str] = ["*"]
    cors_allow_credentials: bool = True
    cors_allow_methods: List[str] = ["*"]
    cors_allow_headers: List[str] = ["*"]
    
    # AI Configuration
    mistral_model: str = "mistral-small-latest"
    google_api_key: str = ""
    gemini_api_key: str = ""
    
    # File Processing
    min_content_length: int = 50
    max_file_size: int = 10 * 1024 * 1024  # 10MB
    supported_formats: List[str] = [".pdf", ".docx"]
    
    # Error Messages
    error_no_file: str = "Aucun fichier fourni"
    error_invalid_format: str = "Format de fichier non supporté"
    error_extraction_failed: str = "Impossible d'extraire suffisamment de texte du fichier"


# Global settings instance
settings = Settings()
