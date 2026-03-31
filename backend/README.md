# Serveur Python pour l'analyse de CV

Ce dossier contient le serveur FastAPI qui gère toute la logique d'extraction et d'analyse de CV.

## Installation

1. Installer Python 3.8+ si ce n'est pas déjà fait
2. Créer un environnement virtuel :
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   # ou
   source venv/bin/activate  # Linux/Mac
   ```

3. Installer les dépendances :
   ```bash
   pip install -r requirements.txt
   ```

4. Configurer les variables d'environnement :
   ```bash
   cp env.example .env
   # Éditer .env et ajouter votre clé Gemini API
   ```

## Démarrage

Démarrer le serveur :
```bash
python main.py
```

Le serveur sera accessible sur `http://localhost:8000`

## Endpoints

- `POST /extract` : Extraire le texte d'un fichier PDF/DOCX
- `POST /analyze` : Analyser un CV (avec paramètre `step`)
- `GET /health` : Vérifier l'état du serveur

## Intégration avec le frontend Next.js

Le frontend appelle ces endpoints au lieu des fonctions TypeScript locales.
