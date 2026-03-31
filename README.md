# Audit CV Flow

Plateforme d'analyse intelligente de CV avec IA et dashboard interactif.

## Aperçu du Projet

Audit CV Flow est une application web full-stack qui permet de :

- Analyser des CV (PDF, DOCX) avec l'intelligence artificielle
- Extraire et évaluer les compétences et expériences
- Visualiser des scores détaillés via des dashboards interactifs
- Identifier les points forts et faibles du CV
- Obtenir des recommandations personnalisées

## Architecture Technique

### Backend (FastAPI/Python)

- **Framework** : FastAPI avec Python 3.10+
- **Architecture** : Pattern BLL/DAL avec interfaces
- **IA** : Mistral AI et Google Gemini pour l'analyse
- **Validation** : Pydantic pour la validation des données
- **CORS** : Configuration flexible pour le frontend
- **File Processing** : PyPDF2 et python-docx

### Frontend (Next.js/React)

- **Framework** : Next.js 16.2 avec TypeScript
- **UI** : TailwindCSS avec composants modernes
- **Animations** : Framer Motion
- **Icons** : Lucide React
- **File Upload** : Support PDF et DOCX
- **State Management** : Hooks React avec localStorage

### Infrastructure

- **Development** : Serveurs de développement séparés
- **Build** : Next.js build system optimisé
- **Environment** : Variables d'environnement sécurisées
- **File Storage** : Temporaire en mémoire avec cleanup

## Prérequis

- Node.js 18+ et npm
- Python 3.10+ et pip
- Clés API Mistral AI et/ou Google Gemini
- Git

## Installation

### 1. Cloner le Repository

```bash
git clone <repository-url>
cd audit-cv-flow
```

### 2. Configuration des Variables d'Environnement

Créez un fichier `.env` à la racine du projet :

```env
# Configuration IA (au moins une clé requise)
MISTRAL_API_KEY="votre_clé_mistral"
GOOGLE_API_KEY="votre_clé_google"
GEMINI_API_KEY="votre_clé_gemini"

# Configuration serveur
HOST=0.0.0.0
PORT=8000

# Configuration CORS
CORS_ORIGINS=["http://localhost:3000"]
```

### 3. Installation des Dépendances

#### Backend

```bash
cd backend

# Créer environnement virtuel
python -m venv venv

# Activer l'environnement
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Installer les dépendances
pip install -r requirements.txt
```

#### Frontend

```bash
cd frontend
npm install
```

## 🏃‍♂️ Démarrage Rapide

### Option 1: Développement Complet (Recommandé)

#### Backend (FastAPI)

```bash
cd backend
python main.py
```

Le backend démarre sur http://localhost:8000

#### Frontend (Next.js)

```bash
cd frontend
npm run dev
```

Le frontend démarre sur http://localhost:3000

### Option 2: Scripts Rapides

Depuis la racine du projet :

```bash
# Démarrer le backend
cd backend && python main.py

# Démarrer le frontend (nouveau terminal)
cd frontend && npm run dev
```

### Option 3: Fichier Batch (Windows)

```bash
# Utiliser le script fourni
start-server.bat
```

## 🔧 Utilisation

### 1. Accès à l'Application

1. **Frontend** : http://localhost:3000
2. **API Backend** : http://localhost:8000
3. **Documentation API** : http://localhost:8000/docs

### 2. Processus d'Analyse de CV

1. **Upload du Fichier** :
   - Formats supportés : PDF, DOCX
   - Taille maximale : 10MB
   - Glisser-déposer ou sélection

2. **Extraction Automatique** :
   - Extraction du texte du document
   - Validation du contenu minimal
   - Nettoyage et formatage

3. **Analyse IA** :
   - Évaluation des compétences
   - Analyse des expériences
   - Vérification de la cohérence
   - Calcul des scores globaux

4. **Résultats Interactifs** :
   - Score global avec verdict
   - Scores détaillés par catégorie
   - Priorités d'amélioration
   - Extraits problématiques identifiés

### 3. API Endpoints

L'API expose les endpoints principaux :

```bash
# Health check
GET /health

# Analyse de CV
POST /analyze_cv
Content-Type: multipart/form-data
Body: file (PDF/DOCX)

# Documentation interactive
GET /docs
```

#### Exemple de Requête

```bash
curl -X POST "http://localhost:8000/analyze_cv" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@cv.pdf"
```

#### Réponse JSON

```json
{
  "success": true,
  "overallScore": 75,
  "overallVerdict": "bon",
  "scores": {
    "competences": 80,
    "experiences": 70,
    "formation": 85,
    "coherence": 75
  },
  "strengths": ["Expérience pertinente", "Bonne formation"],
  "weaknesses": ["Formatage améliorable", "Compétences techniques"],
  "recommendations": ["Ajouter plus de détails sur les projets"],
  "problematicExtracts": [...]
}
```

## Développement

### Backend

```bash
cd backend

# Développement
python main.py

# Tests (si disponibles)
python -m pytest

# Linter
flake8 .
```

Architecture du backend :

```
backend/
├── main.py              # Point d'entrée FastAPI
├── config.py            # Configuration et settings
├── requirements.txt     # Dépendances Python
├── dal/                 # Data Access Layer
│   ├── file_service.py  # Service d'extraction de fichiers
│   └── interfaces.py    # Interfaces DAL
├── bll/                 # Business Logic Layer
│   ├── cv_analysis_service.py  # Service d'analyse IA
│   └── interfaces.py    # Interfaces BLL
└── venv/               # Environnement virtuel
```

### Frontend

```bash
cd frontend

# Développement avec hot-reload
npm run dev

# Build pour production
npm run build

# Linter
npm run lint

# Production
npm start
```

Architecture du frontend :

```
frontend/
├── src/
│   ├── app/             # Pages Next.js
│   ├── components/      # Composants React
│   │   ├── ui/         # Composants UI réutilisables
│   │   ├── result/     # Composants de résultats
│   │   └── download/   # Composants d'upload
│   ├── services/        # Services utilitaires
│   ├── lib/            # Interfaces et constantes
│   └── types/          # Types TypeScript
├── public/             # Fichiers statiques
└── package.json        # Dépendances et scripts
```

## 🎯 Fonctionnalités

### Analyse de CV

- **Formats Supportés** : PDF, DOCX
- **Extraction Intelligente** : Texte, structure, métadonnées
- **Validation** : Contenu minimal, qualité du texte
- **Nettoyage** : Suppression du bruit et formatage

### Évaluation par IA

- **Modèles IA** : Mistral AI, Google Gemini
- **Analyse Multi-dimensionnelle** :
  - Compétences techniques et soft skills
  - Expériences professionnelles
  - Formation et certifications
  - Cohérence globale
- **Scoring Détaillé** : Scores par catégorie avec recommandations

### Dashboard Interactif

- **Design Moderne** : Interface responsive et intuitive
- **Visualisations** : Graphiques, scores, indicateurs
- **Feedback** : Points forts, faiblesses, suggestions
- **Export** : Rapports détaillés (bientôt disponible)

### Sécurité

- **Validation** : Taille et format des fichiers
- **Cleanup** : Suppression automatique des fichiers temporaires
- **CORS** : Configuration sécurisée
- **Environment** : Variables sensibles protégées

## 🚀 Production

### Configuration Production

1. **Variables d'Environnement** :

```env
# Production
HOST=0.0.0.0
PORT=8000
CORS_ORIGINS=["https://votredomaine.com"]

# IA (obligatoire)
MISTRAL_API_KEY="prod_key"
GOOGLE_API_KEY="prod_key"
```

2. **Build Frontend** :

```bash
cd frontend
npm run build
npm start
```

3. **Backend Production** :

```bash
cd backend
pip install gunicorn
gunicorn main:app --workers 4 --host 0.0.0.0 --port 8000
```

### Docker (Bientôt disponible)

```dockerfile
# Structure Docker prévue
# Dockerfile.backend
# Dockerfile.frontend
# docker-compose.yml
```

## 📊 Monitoring & Logs

### Health Checks

- **Backend** : GET /health
- **Frontend** : Vérification des composants critiques

### Logs

```bash
# Backend logs
# Terminal où le backend tourne

# Frontend logs
# Navigateur (F12) et terminal Next.js
```

## 🛠️ Dépannage

### Problèmes Communs

1. **Port déjà utilisé** :

```bash
# Vérifier les ports
netstat -tulpn | grep :8000
netstat -tulpn | grep :3000

# Changer les ports si nécessaire
```

2. **Clés API invalides** :

```bash
# Vérifier les variables d'environnement
echo $MISTRAL_API_KEY
```

3. **Fichier non supporté** :

```bash
# Formats valides : .pdf, .docx
# Taille maximale : 10MB
```

4. **Extraction de texte échoue** :

```bash
# Vérifier que le CV contient du texte extractible
# Éviter les CV scannés (images)
```

### Erreurs Courantes

- **400 Bad Request** : Fichier invalide ou manquant
- **422 Unprocessable Entity** : Format non supporté
- **500 Internal Server** : Erreur IA ou traitement

## 🤝 Contribuer

1. Fork le projet
2. Créer une branche feature

```bash
git checkout -b feature/nouvelle-fonctionnalite
```

3. Commit les changements

```bash
git commit -m 'Ajouter nouvelle fonctionnalité'
```

4. Push la branche

```bash
git push origin feature/nouvelle-fonctionnalite
```

5. Ouvrir une Pull Request

## 📝 Notes de Version

### v1.0.0 (Courant)

- Analyse de CV (PDF, DOCX)
- IA avec Mistral
- Dashboard interactif
- Scores détaillés
- Recommandations

### Roadmap

- 📋 Export PDF des rapports
- 🔄 Multi-langues
- 👤 Profils utilisateurs
- 📊 Historique des analyses
- 🎨 Templates de CV

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](./LICENSE) pour les détails.

**Audit CV Flow** - Votre plateforme d'analyse intelligente de CV 📄🤖✨
