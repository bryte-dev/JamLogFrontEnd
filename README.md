# JamLog Frontend

Application frontend de **JamLog**, une application destinée aux musiciens pour organiser leurs projets, morceaux, événements et ressources associées.

Ce dépôt contient l'application mobile et web basée sur Expo, React Native et TypeScript. Il est prévu pour communiquer avec le backend disponible dans le dépôt [`JamLog`](https://github.com/bryte-dev/JamLog).

> **État du projet : prototype en cours de développement**
>
> Le frontend contient actuellement la structure de navigation, les écrans d'inscription et de connexion ainsi qu'une première gestion du token d'authentification. L'interface principale de gestion musicale reste encore à développer.

---

## Objectif du projet

JamLog a pour objectif d'aider les musiciens à organiser leur travail au même endroit.

L'application est prévue pour gérer progressivement :

- les utilisateurs ;
- les projets musicaux ;
- les groupes et membres ;
- les morceaux ;
- la progression des morceaux ;
- les répétitions ;
- les concerts ;
- les sessions d'enregistrement ;
- les fichiers liés aux projets ;
- les ressources partagées entre membres.

---

## Stack technique

- **React Native**
- **Expo**
- **TypeScript**
- **Expo Router**
- **React Navigation**
- **Axios**
- **Expo Secure Store**
- **React Native Web**

Le projet utilise Expo Router pour organiser les écrans à partir de la structure de dossiers du répertoire `app`.

---

## Structure du projet

```text
JamLogFrontEnd/
├── JamLog-frontend/
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   │
│   │   ├── auth/
│   │   │   ├── authindex.tsx
│   │   │   ├── login.tsx
│   │   │   └── register.tsx
│   │   │
│   │   └── (app)/
│   │       └── appindex.tsx
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── api.ts
│   │   │
│   │   ├── context/
│   │   │   └── authContext.tsx
│   │   │
│   │   └── services/
│   │       ├── authService.ts
│   │       └── tokenService.ts
│   │
│   ├── assets/
│   │   └── images/
│   │
│   ├── app.json
│   ├── package.json
│   ├── tsconfig.json
│   ├── eslint.config.js
│   └── README.md
│
├── .env
├── project_structure.md
└── LICENSE
```

---

## Architecture de navigation

L'application utilise Expo Router.

Le dossier `app` représente la structure de navigation.

### Écran racine

Le fichier `app/index.tsx` vérifie si un token existe.

- sans token : redirection vers l'espace d'authentification ;
- avec token : redirection vers l'espace de l'application.

### Layout principal

Le fichier `app/_layout.tsx` fournit le contexte d'authentification à toute l'application.

Il affiche :

- la partie `auth` si l'utilisateur n'est pas connecté ;
- la partie `(app)` si l'utilisateur possède un token ;
- un indicateur de chargement pendant la lecture du token enregistré.

### Espace d'authentification

```text
app/auth/
├── authindex.tsx
├── login.tsx
└── register.tsx
```

Cet espace contient :

- l'écran de choix entre connexion et inscription ;
- l'écran de connexion ;
- l'écran d'inscription.

### Espace application

```text
app/(app)/
└── appindex.tsx
```

Cet espace correspond à la partie accessible après connexion.

L'écran actuel affiche simplement :

```text
Bienvenue dans JamLog 🎸
```

---

## Communication avec le backend

Le frontend est prévu pour communiquer avec le backend du dépôt `JamLog`.

Le client HTTP est configuré dans :

```text
src/api/api.ts
```

La bibliothèque Axios est utilisée pour effectuer les appels HTTP.

### Adresse actuellement configurée

L'adresse actuellement présente dans la configuration Axios est :

```text
http://192.168.100.145:3000
```

Cette adresse correspond à une configuration réseau locale et dépend de la machine qui héberge le backend.

Elle peut devoir être adaptée selon :

- l'adresse IP locale de l'ordinateur ;
- l'utilisation d'un téléphone physique ;
- l'utilisation d'un émulateur ;
- l'utilisation du web ;
- le réseau Wi-Fi utilisé.

---

## Authentification

La gestion de l'authentification repose sur un contexte React.

Le fichier principal est :

```text
src/context/authContext.tsx
```

Le contexte gère :

- le token courant ;
- l'état de chargement ;
- la connexion ;
- la déconnexion ;
- la récupération du token au démarrage.

### Connexion

Le formulaire de connexion se trouve dans :

```text
app/auth/login.tsx
```

Il envoie une requête au backend :

```http
POST /auth/login
```

Corps envoyé :

```json
{
  "email": "musicien@example.com",
  "password": "mot-de-passe"
}
```

Lorsque le backend renvoie un token :

1. le token est sauvegardé ;
2. le contexte d'authentification est mis à jour ;
3. l'utilisateur est redirigé vers l'espace connecté.

### Inscription

Le formulaire d'inscription se trouve dans :

```text
app/auth/register.tsx
```

Il envoie :

```http
POST /auth/register
```

Corps envoyé :

```json
{
  "email": "musicien@example.com",
  "username": "musicien",
  "password": "mot-de-passe"
}
```

Après une inscription réussie, l'utilisateur est redirigé vers l'écran de connexion.

---

## Stockage du token

Le service :

```text
src/services/tokenService.ts
```

utilise deux mécanismes selon la plateforme.

### Web

Le token est stocké dans :

```text
localStorage
```

### Android et iOS

Le token est stocké avec :

```text
expo-secure-store
```

Cette séparation permet d'utiliser un stockage adapté à chaque environnement.

La clé utilisée est :

```text
jamlog_token
```

---

## Services disponibles

### `authService.ts`

Ce service contient des fonctions prévues pour :

- se connecter ;
- s'inscrire.

Fonctions principales :

```ts
login(email, password)
register(email, username, password)
```

### `tokenService.ts`

Ce service contient les fonctions :

```ts
saveToken(token)
getToken()
removeToken()
```

### `authContext.tsx`

Ce contexte rend disponibles :

```ts
token
login
logout
loading
```

---

## Installation

Cloner le dépôt puis accéder au dossier de l'application :

```bash
git clone https://github.com/bryte-dev/JamLogFrontEnd.git
cd JamLogFrontEnd/JamLog-frontend
npm install
```

---

## Lancement

### Démarrer Expo

```bash
npm start
```

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

### Web

```bash
npm run web
```

### Vérification du code

```bash
npm run lint
```

---

## Configuration avec le backend

Pour utiliser le frontend avec le backend JamLog :

1. démarrer le backend ;
2. vérifier que PostgreSQL est disponible ;
3. vérifier l'adresse IP utilisée par le backend ;
4. vérifier que le frontend utilise cette même adresse ;
5. vérifier la configuration CORS du backend ;
6. lancer Expo sur le web, un émulateur ou un appareil physique.

Le frontend appelle actuellement les endpoints suivants :

```text
POST /auth/register
POST /auth/login
```

Ces endpoints correspondent aux routes d'authentification présentes dans le backend.

---

## Flux actuel de l'application

Le flux principal est le suivant :

```text
Lancement de l'application
    ↓
Lecture du token enregistré
    ↓
Token absent ?
    ├── Oui → écran d'authentification
    │            ├── Connexion
    │            └── Inscription
    │
    └── Non → espace de l'application
```

### Flux d'inscription

```text
Écran Register
    ↓
POST /auth/register
    ↓
Utilisateur créé dans le backend
    ↓
Redirection vers Login
```

### Flux de connexion

```text
Écran Login
    ↓
POST /auth/login
    ↓
Réception du JWT
    ↓
Stockage du token
    ↓
Mise à jour du AuthContext
    ↓
Redirection vers l'espace connecté
```

---

## État actuel du projet

### Fonctionnalités présentes

- projet Expo initialisé ;
- application React Native ;
- configuration TypeScript ;
- navigation avec Expo Router ;
- écran de choix Login/Register ;
- formulaire d'inscription ;
- formulaire de connexion ;
- communication Axios avec le backend ;
- stockage du token ;
- contexte global d'authentification ;
- redirection selon l'état de connexion ;
- écran d'accueil après connexion ;
- compatibilité prévue avec le web, Android et iOS.

### Fonctionnalités encore incomplètes

- tableau de bord réel ;
- affichage du profil utilisateur ;
- création et gestion de projets ;
- ajout et gestion de membres ;
- création d'événements ;
- gestion des morceaux ;
- suivi de la progression des morceaux ;
- ajout et consultation de fichiers ;
- partage de ressources ;
- appels aux routes métier du backend ;
- gestion complète de la déconnexion dans l'interface ;
- affichage des erreurs à l'utilisateur ;
- validation avancée des formulaires ;
- gestion des états de chargement des requêtes ;
- design final de l'application ;
- tests automatisés ;
- configuration de production.

---

## Limitations connues

Le frontend doit être considéré comme une première base d'application.

### Adresse réseau codée en dur

L'adresse du backend est actuellement définie directement dans le client Axios :

```text
http://192.168.100.145:3000
```

Cette configuration fonctionne uniquement si cette adresse correspond réellement à la machine hébergeant le backend et si celle-ci est accessible depuis l'environnement Expo.

### Variable `.env`

Un fichier `.env` contient une variable :

```dotenv
API_URL=http://localhost:3000
```

Cependant, la configuration Axios utilise actuellement une adresse écrite directement dans le code. La variable `API_URL` n'est donc pas utilisée par le client HTTP dans l'état actuel du projet.

### Gestion des erreurs

Les erreurs de connexion et d'inscription sont actuellement envoyées dans la console avec `console.error`.

Elles ne sont pas encore affichées clairement dans l'interface utilisateur.

### Protection des écrans

La navigation dépend de la présence d'un token stocké localement.

Le frontend ne vérifie pas encore automatiquement si le token est expiré ou invalide auprès du backend.

### Interface principale

L'espace connecté est encore minimal. Il s'agit actuellement d'une page de bienvenue et non d'une interface complète de gestion musicale.

---

## Relation avec le backend

Le frontend et le backend sont conçus pour fonctionner ensemble.

### Dépôt backend

```text
bryte-dev/JamLog
```

### Dépôt frontend

```text
bryte-dev/JamLogFrontEnd
```

### Compatibilité actuelle

Les routes d'authentification sont alignées :

| Fonction | Frontend | Backend |
|---|---|---|
| Inscription | `POST /auth/register` | `POST /auth/register` |
| Connexion | `POST /auth/login` | `POST /auth/login` |

Les données envoyées correspondent également :

- email ;
- username pour l'inscription ;
- password.

La connexion complète dépend toutefois de la configuration réseau locale et de la disponibilité du backend.

---

## Organisation prévue à terme

L'application pourrait progressivement évoluer vers une organisation de ce type :

```text
Authentification
    ├── Inscription
    ├── Connexion
    └── Profil

Projets
    ├── Liste des projets
    ├── Détail d'un projet
    ├── Membres
    └── Paramètres

Morceaux
    ├── Liste des morceaux
    ├── Progression
    ├── Détails
    └── Fichiers associés

Événements
    ├── Calendrier
    ├── Répétitions
    ├── Concerts
    └── Sessions d'enregistrement

Fichiers
    ├── Documents
    ├── Audios
    ├── Images
    └── Ressources partagées
```

Cette organisation représente la direction fonctionnelle du projet et non l'ensemble des fonctionnalités actuellement disponibles.

---

## Résumé

JamLog Frontend est une application Expo / React Native / TypeScript servant d'interface utilisateur au projet JamLog.

Le frontend dispose déjà d'un premier flux utilisable :

```text
Inscription
    ↓
Connexion
    ↓
Réception du token JWT
    ↓
Stockage local sécurisé
    ↓
Accès à l'espace connecté
```

Le projet constitue actuellement une base de navigation et d'authentification. Les fonctionnalités principales liées à l'organisation musicale restent à développer autour du backend et de son modèle de données.
