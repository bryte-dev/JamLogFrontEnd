# JamLog Frontend

JamLog Frontend is the client application for the JamLog project, built for musicians who want to organize their projects, songs, rehearsals, concerts, and related resources in one place.

This repository contains the mobile and web frontend built with Expo, React Native, and TypeScript. It is designed to connect to the backend API in the [`JamLog`](https://github.com/bryte-dev/JamLog) repository.

> Project status: early prototype / active development
>
> The frontend currently includes the app navigation structure, authentication screens, and a first implementation of token-based auth flow. The main user dashboard and core music-management features are still under development.

---

## Project goal

JamLog exists to help musicians keep everything related to their work in one place.

The app is expected to eventually manage:

- users;
- music projects;
- groups and members;
- songs;
- song progress tracking;
- rehearsals;
- concerts;
- recording sessions;
- project-related files;
- shared resources between collaborators.

---

## Tech stack

- **React Native**
- **Expo**
- **TypeScript**
- **Expo Router**
- **React Navigation**
- **Axios**
- **Expo Secure Store**
- **React Native Web**

The project uses Expo Router to structure screens using the `app` folder.

---

## Project structure

```text
JamLogFrontEnd/
├── JamLog-frontend/
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── auth/
│   │   │   ├── authindex.tsx
│   │   │   ├── login.tsx
│   │   │   └── register.tsx
│   │   └── (app)/
│   │       └── appindex.tsx
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── api.ts
│   │   ├── context/
│   │   │   └── authContext.tsx
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   └── tokenService.ts
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
├── LICENSE
└── README.md
```

---

## Navigation architecture

The app uses Expo Router.

The `app` directory represents the app's navigation structure.

### Root screen

The file `app/index.tsx` checks whether a token is present.

- if no token is present: redirect to the auth area;
- if a token is present: redirect to the main app area.

### Main layout

The file `app/_layout.tsx` provides the authentication context to the whole app.

It displays:

- the `auth` section if the user is not logged in;
- the `(app)` section if the user has a token;
- a loading indicator while the saved token is being read.

### Authentication area

```text
app/auth/
├── authindex.tsx
├── login.tsx
└── register.tsx
```

This area contains:

- login/register choice screen;
- login screen;
- register screen.

### App area

```text
app/(app)/
└── appindex.tsx
```

This area is the part visible after login.

The current screen mainly shows:

```text
Welcome to JamLog 🎸
```

---

## Backend communication

The frontend is designed to work with the backend in the `JamLog` repository.

The HTTP client is configured in:

```text
src/api/api.ts
```

The project uses Axios for API requests.

### Current configured address

The currently configured Axios base URL is:

```text
http://192.168.100.145:3000
```

This is a local network configuration and depends on the machine hosting the backend.

It may need updating depending on:

- the local IP address of the computer;
- physical device usage;
- emulator usage;
- web usage;
- current Wi-Fi network.

---

## Authentication flow

Auth logic is managed through a React context.

The main file is:

```text
src/context/authContext.tsx
```

The context manages:

- current token;
- loading state;
- login;
- logout;
- token recovery on app startup.

### Login

The login form is in:

```text
app/auth/login.tsx
```

It sends a request to the backend:

```http
POST /auth/login
```

Request body example:

```json
{
  "email": "musician@example.com",
  "password": "password"
}
```

When the backend returns a token:

1. the token is stored;
2. the auth context is updated;
3. the user is redirected to the authenticated area.

### Register

The register form is in:

```text
app/auth/register.tsx
```

It sends:

```http
POST /auth/register
```

Request body example:

```json
{
  "email": "musician@example.com",
  "username": "musician",
  "password": "password"
}
```

After a successful registration, the user is redirected to the login screen.

---

## Token storage

The service:

```text
src/services/tokenService.ts
```

uses two storage strategies depending on the platform.

### Web

Tokens are stored in:

```text
localStorage
```

### Android and iOS

Tokens are stored using:

```text
expo-secure-store
```

This allows storage behavior to adapt to each environment.

The key used is:

```text
jamlog_token
```

---

## Available services

### `authService.ts`

This service contains functions intended for:

- logging in;
- registering.

Main functions:

```ts
login(email, password)
register(email, username, password)
```

### `tokenService.ts`

This service contains functions such as:

```ts
saveToken(token)
getToken()
removeToken()
```

### `authContext.tsx`

This context exposes:

```ts
token
login
logout
loading
```

---

## Installation

Clone the repository and enter the frontend folder:

```bash
git clone https://github.com/bryte-dev/JamLogFrontEnd.git
cd JamLogFrontEnd/JamLog-frontend
npm install
```

---

## Running the app

### Start Expo

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

### Lint check

```bash
npm run lint
```

---

## Backend configuration

To use the frontend with the JamLog backend:

1. start the backend;
2. verify that PostgreSQL is available;
3. check the backend IP address;
4. ensure the frontend uses the same address;
5. check the backend CORS configuration;
6. launch Expo on web, emulator, or physical device.

The frontend currently calls these endpoints:

```text
POST /auth/register
POST /auth/login
```

These endpoints match the backend routes.

---

## Current app flow

The main flow is:

```text
App launch
    ↓
Read stored token
    ↓
Token missing?
    ├── Yes → authentication screen
    │            ├── Login
    │            └── Register
    │
    └── No → app area
```

### Register flow

```text
Register screen
    ↓
POST /auth/register
    ↓
User created in backend
    ↓
Redirect to login
```

### Login flow

```text
Login screen
    ↓
POST /auth/login
    ↓
JWT token received
    ↓
Token stored locally
    ↓
AuthContext updated
    ↓
Redirect to authenticated area
```

---

## Current status

### Features already present

- Expo project initialized
- React Native app
- TypeScript configuration
- navigation with Expo Router
- login/register selection screen
- registration form
- login form
- Axios communication with backend
- token storage
- global auth context
- redirection based on connection state
- welcome screen after login
- web, Android, and iOS compatibility planned

### Features still incomplete

- real dashboard
- user profile display
- project creation and management
- member management
- event creation
- song management
- track progress tracking
- file management
- resource sharing
- business-route integration
- complete logout handling in UI
- clearer user error messages
- advanced form validation
- request loading state management
- final visual design
- automated tests
- production configuration

---

## Known limitations

The frontend should currently be considered a first application foundation.

### Hardcoded backend address

The backend address is currently defined directly in the Axios client:

```text
http://192.168.100.145:3000
```

This only works if that address matches the actual machine running the backend and is reachable from the Expo environment.

### `.env` file

There is a `.env` file containing:

```dotenv
API_URL=http://localhost:3000
```

However, the Axios client currently uses a hardcoded address instead of the environment variable.

### Error handling

Authentication errors are currently logged to the console with `console.error`.

They are not yet displayed clearly in the user interface.

### Screen protection

Navigation depends on the presence of a local token.

The frontend does not yet automatically verify whether the token is expired or invalid on the backend.

### Main app area

The authenticated area is still minimal. It is currently only a welcome page rather than a full music management interface.

---

## Relationship with the backend

The frontend and backend are designed to work together.

### Backend repo

```text
bryte-dev/JamLog
```

### Frontend repo

```text
bryte-dev/JamLogFrontEnd
```

### Current compatibility

Authentication routes are aligned:

| Function | Frontend | Backend |
|---|---|---|
| Register | `POST /auth/register` | `POST /auth/register` |
| Login | `POST /auth/login` | `POST /auth/login` |

The payloads also match:

- email;
- username for registration;
- password.

However, the full connection still depends on the local network configuration and backend availability.

---

## Planned future structure

The app could eventually evolve toward a structure like this:

```text
Authentication
    ├── Register
    ├── Login
    └── Profile

Projects
    ├── Project list
    ├── Project details
    ├── Members
    └── Settings

Songs
    ├── Song list
    ├── Progress tracking
    ├── Details
    └── Related files

Events
    ├── Calendar
    ├── Rehearsals
    ├── Concerts
    └── Recording sessions

Files
    ├── Documents
    ├── Audios
    ├── Images
    └── Shared resources
```

This represents the intended functional direction, not the full set of features currently available.

---

## Summary

JamLog Frontend is an Expo / React Native / TypeScript app that serves as the user interface for the JamLog project.

It already has a usable first flow:

```text
Register
    ↓
Login
    ↓
JWT token received
    ↓
Local secure token storage
    ↓
Access to the authenticated area
```

The project is currently a navigation and authentication foundation. The core music organization features still need to be developed around the backend and product logic.
