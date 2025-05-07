# 📬 Messagerie React - Dockerized Chat App

Application de messagerie en temps réel avec une interface moderne. Conçue pour les démonstrations, projets personnels ou comme base pour une messagerie personnalisée.

## ✨ Fonctionnalités

- 💬 Envoi et réception de messages en temps réel via WebSocket
- 🖥️ Interface responsive et en dark mode
- 🗃️ Backend Node.js + PostgreSQL
- 📦 Application entièrement dockerisée
- 🛠️ Intégration avec SonarCloud pour l’analyse statique

## 📦 Structure du projet

```
.
├── backend/       # API Node.js + WebSocket + PostgreSQL
├── frontend/      # Interface React (sans Tailwind, pur CSS moderne)
├── docker-compose.yml
├── sonar-project.properties
└── README.md
````

## 🚀 Lancer le projet

### Prérequis
- Docker + Docker Compose
- Node.js 18+ (pour le dev local hors Docker)

### Installation

```bash
docker-compose up --build
````

L'application sera accessible sur `http://localhost:5173`.

## 🧪 Lancer l’analyse SonarCloud

Créer un fichier `.github/workflows/sonarcloud.yml` avec la configuration GitHub Actions adaptée.

Assure-toi d’avoir :

* `SONAR_TOKEN` dans les *GitHub secrets*
* Organisation et project key dans `sonar-project.properties`

## 📂 Variables d’environnement (mode dev)

Créer un fichier `.env` dans `frontend/` :

```env
VITE_API_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001
```

## 🛡️ Technologies

* React
* Node.js + Express + WebSocket
* PostgreSQL
* CSS (custom, avec `Inter` comme font)
* Docker
* SonarCloud
