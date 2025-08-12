# BreizhReport 🏄‍♂️

Application de report de surf dédiée aux côtes bretonnes. BreizhReport permet aux surfeurs de consulter les conditions de surf en temps réel.

## 🌊 Fonctionnalités

- Consultation des conditions de surf en temps réel
- Visualisation des spots via images satellite (Mapbox)
- Informations détaillées sur les marées
- Interface responsive adaptée aux mobiles

## 🛠️ Architecture

### Frontend
- **Framework** : React
- **Interface** : Application web responsive
- **Authentification** : JWT tokens

### Backend  
- **Framework** : Spring Boot
- **Base de données** : MongoDB
- **Authentification** : JWT
- **APIs externes** :
  - Mapbox API (images satellite statiques)
  - Scraping des données de marées avec Jsoup
  - OpenWeather API Utilisée pour récupérer les données météos du spot.

## 🗃️ Base de données

MongoDB est utilisée pour stocker :
- Informations des utilisateurs
- Reports de surf
- Données des spots
- Sessions JWT

## 🔐 Authentification

Système JWT implémenté avec :
- Inscription/Connexion utilisateur
- Tokens sécurisés
- Middleware de protection des routes

---

