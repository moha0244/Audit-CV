# Architecture BLL/DAL pour l'analyse de CV

## Structure des dossiers

```
server/
├── main.py                 # API FastAPI (couche présentation)
├── main_refactored.py      # Version refactorisée avec BLL/DAL
├── dal/                    # Data Access Layer (DAL)
│   ├── __init__.py
│   ├── interfaces.py       # Interfaces pour l'accès aux données
│   └── file_service.py     # Implémentation: extraction fichiers + IA
├── bll/                    # Business Logic Layer (BLL)
│   ├── __init__.py
│   ├── interfaces.py       # Interfaces pour la logique métier
│   └── cv_analysis_service.py  # Implémentation: logique d'analyse
└── requirements.txt
```

## Architecture en couches

### 1. DAL (Data Access Layer)
- **Responsabilités**: Accès aux données, extraction de fichiers, communication avec les APIs externes
- **Classes**: `FileExtractionService` implémente `IDataAccess`
- **Fonctions**: Extraction PDF/DOCX, appel Gemini AI, sauvegarde/récupération données

### 2. BLL (Business Logic Layer) 
- **Responsabilités**: Logique métier, orchestration des traitements, validation
- **Classes**: `CVAnalysisService` implémente `ICVAnalysisService`
- **Fonctions**: Analyse structurelle, évaluation ATS, coordination des étapes

### 3. Couche Présentation (API)
- **Responsabilités**: Endpoints HTTP, validation des requêtes, formatage des réponses
- **Fichier**: `main_refactored.py`
- **Fonctions**: Routes FastAPI, injection de dépendances

## Avantages de cette architecture

1. **Séparation des responsabilités**: Chaque couche a un rôle clair
2. **Testabilité**: Peut mocker chaque couche indépendamment
3. **Maintenabilité**: Modifications isolées à chaque couche
4. **Réutilisabilité**: Services peuvent être réutilisés dans d'autres contextes
5. **Injection de dépendances**: Flexible et découplé

## Pour utiliser la version refactorisée

```bash
python main_refactored.py
```

Cette version maintient exactement la même API que l'originale mais avec une architecture plus propre et maintenable.
