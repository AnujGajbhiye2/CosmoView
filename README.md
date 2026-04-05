# CosmoView

CosmoView is a NASA data explorer built for a software engineering coding challenge. It combines a React frontend with a Node.js + Express backend to turn NASA's open APIs into a mission-control style experience for imagery, Earth observation, asteroid analytics, and archive search.

## Highlights
- React 19 + Vite 8 frontend with TypeScript, TanStack Router, and TanStack Query
- Node.js + Express backend with TypeScript, Zod validation, caching, error handling, and NASA API normalization
- Mission Control homepage that previews APOD, asteroid telemetry, EPIC Earth imagery, and NASA archive search
- Dedicated APOD, Earth, asteroid analytics, and image-library routes
- Global light/dark mode toggle with persisted user preference
- Lightweight exploration copilot on the image-library route
- Reviewer-friendly `/lab` route for API exploration and architecture notes


## Product Routes
- `/` Mission Control overview
- `/apod` Astronomy Picture of the Day explorer
- `/asteroids` Near-Earth object analytics
- `/earth` EPIC Earth observation explorer
- `/library` NASA image library search
- `/lab` engineering and API explorer

Backend API routes:
- `GET /health`
- `GET /dev/endpoints`
- `GET /api/v1/apod`
- `GET /api/v1/asteroids/feed`
- `GET /api/v1/epic/natural`
- `GET /api/v1/images/search`

## Repository Structure
```text
frontend/   React application
backend/    Express API layer
docs/       planning and implementation notes
README.md   project overview and setup
```

## Tech Stack

### Frontend
- React 19.2
- Vite 8
- TypeScript
- Tailwind CSS v4
- TanStack Router
- TanStack Query
- Axios

### Backend
- Node.js
- Express
- TypeScript
- Axios
- Zod
- Pino

## Local Setup

### Prerequisites
- Node.js 20+
- npm 10+
- A NASA API key from `https://api.nasa.gov/`

### 1. Configure the backend
Create `backend/.env` from [`backend/.env.example`](backend/.env.example).

Minimum values:

```env
PORT=3001
NODE_ENV=development
NASA_API_KEY=your_nasa_api_key
FRONTEND_ORIGIN=http://localhost:5173
NASA_API_TIMEOUT_MS=10000
NASA_CACHE_TTL_APOD_MS=3600000
NASA_CACHE_TTL_ASTEROIDS_MS=900000
NASA_CACHE_TTL_IMAGES_MS=900000
NASA_CACHE_TTL_EPIC_MS=1800000
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=60
```

### 2. Configure the frontend
Create `frontend/.env` from [`frontend/.env.example`](frontend/.env.example).

```env
VITE_API_BASE_URL=http://localhost:3001
```

### 3. Install dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

### 4. Run the app

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

Default local URLs:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`

## Verification Commands

Backend:

```bash
cd backend
npm run check
npm run build
```

Frontend:

```bash
cd frontend
npm run check
npm run build
```

Useful backend checks:
- `http://localhost:3001/health`
- `http://localhost:3001/dev/endpoints`

## Architecture Notes

### Backend
The backend is the only integration point with NASA.

Responsibilities:
- validate incoming requests
- call NASA APIs
- normalize payloads into stable DTOs
- protect the NASA key
- return consistent error and success envelopes
- cache read-heavy responses

Key backend design choices:
- feature-specific NASA services
- Zod validation for env vars, query params, and upstream responses
- in-memory TTL caching for v1
- rate limiting and centralized error handling

### Frontend
The frontend consumes only the Express backend and is organized by feature.

Responsibilities:
- route users through the experience
- manage server state with TanStack Query
- present loading, empty, and error states cleanly
- turn NASA data into a visually strong mission-control UI

Key frontend design choices:
- mission-control style shell and homepage
- feature-based structure under `src/features`
- shared API client and typed DTOs
- Suspense + error boundary route handling
- persisted light/dark mode

## Challenge Mapping

### Frontend design and creativity
- Distinct mission-control concept instead of a generic gallery
- Light/dark mode
- Strong visual grouping and route-specific experiences

### Data visualization
- Mission Control summary panels
- Asteroid analytics with comparative visual surfaces
- EPIC visual exploration

### Backend quality
- Typed Express backend with validation and normalized contracts
- Strong error handling and dev discovery route

### Loading and edge cases
- Suspense fallbacks
- route-level error boundaries
- empty-state handling on search and EPIC
- asteroid range clamping aligned with backend constraints

## Deployment

Planned deployment shape:
- Frontend on Vercel
- Backend on Render

### Frontend on Vercel
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_BASE_URL=<your-render-backend-url>`

A Vercel SPA rewrite config is included at [`frontend/vercel.json`](frontend/vercel.json).

### Backend on Render
- Root directory: `backend`
- Build command: `npm install && npm run build`
- Start command: `npm run start`
- Health check path: `/health`

A Render blueprint file is included at [`render.yaml`](render.yaml).

Required backend env vars in Render:
- `NASA_API_KEY`
- `FRONTEND_ORIGIN`
- `PORT`
- `NODE_ENV`
- optional cache / timeout / rate-limit overrides

## Documentation
Additional implementation notes are in:
- [`docs/backend-implementation.md`](docs/backend-implementation.md)
- [`docs/backend-plan.md`](docs/backend-plan.md)
- [`docs/frontend-plan.md`](docs/frontend-plan.md)

## Known Constraints
- The frontend build was type-checked successfully in this environment, but Vite/Tailwind native build execution was blocked here by sandbox-specific Windows process restrictions. The project is structured to be built locally or in deployment environments.
- The lightweight copilot is intentionally local and heuristic-based. It is a bonus UX feature, not an external AI integration.
