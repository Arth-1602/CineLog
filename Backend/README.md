# CineLog REST API Backend 🍿

> Complete, robust Node.js + Express + MongoDB REST API backend for CineLog movie and TV discovery platform.

---

## 📋 Table of Contents
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [Prototype Security & Visitor Scoping](#-prototype-security--visitor-scoping)
- [API Documentation](#-api-documentation)
  - [Health & System](#1-health-check)
  - [Titles](#2-list-titles)
  - [Search](#4-search-titles)
  - [Watchlist](#5-get-watchlist)
- [External Provider (TMDB Integration)](#-external-provider-tmdb-integration)
- [Testing](#-testing)
- [Sample Requests](#-sample-requests)

---

## 🛠️ Tech Stack

- **Runtime**: Node.js (v18+ recommended)
- **Framework**: Express.js (v4)
- **Module System**: JavaScript ES modules (`import`/`export`)
- **Database & ODM**: MongoDB + Mongoose (with automated fallback in-memory store)
- **Security & Utilities**:
  - `helmet`: Secure HTTP response headers
  - `cors`: Configurable Cross-Origin Resource Sharing
  - `express-rate-limit`: IP-based request throttling
  - `dotenv`: Environment variable loader
  - `morgan`: HTTP request logging
- **Testing**: Built-in `node:test` runner + `supertest`

---

## 📁 Project Architecture

```
CineLog/Backend/
├── src/
│   ├── config/
│   │   ├── db.js             # Mongoose connection & in-memory fallback manager
│   │   └── env.js            # Centralized environment variables
│   ├── data/
│   │   └── sampleTitles.js   # Production-ready cinematic title catalog
│   ├── models/
│   │   ├── Title.js          # Mongoose schema for movies and TV series
│   │   └── Watchlist.js      # Compound-indexed visitor-scoped watchlist schema
│   ├── services/
│   │   ├── titleService.js    # Data query, filter, sort, and pagination engine
│   │   ├── watchlistService.js# Visitor watchlist CRUD & duplicate prevention
│   │   └── tmdbService.js    # Optional server-side TMDB API integration
│   ├── controllers/
│   │   ├── healthController.js
│   │   ├── titleController.js
│   │   ├── searchController.js
│   │   └── watchlistController.js
│   ├── middleware/
│   │   ├── visitorAuth.js    # Visitor ID extractor and format validator
│   │   ├── validation.js     # Query and body parameter validators
│   │   ├── rateLimiter.js    # Throttling middleware (200 req / 15 min)
│   │   └── errorHandler.js   # Centralized error and 404 handlers
│   ├── routes/
│   │   ├── healthRoutes.js   # /api/health
│   │   ├── titleRoutes.js    # /api/titles
│   │   ├── searchRoutes.js   # /api/search
│   │   ├── watchlistRoutes.js# /api/watchlist
│   │   └── index.js          # Master API router
│   ├── scripts/
│   │   └── seed.js           # Database seeding script
│   ├── app.js                # Express app configuration & middleware
│   └── server.js             # HTTP server entry point
├── tests/
│   ├── health.test.js        # Health and 404 tests
│   ├── titles.test.js        # Filtering, pagination, and details tests
│   ├── search.test.js        # Full-text and multi-filter search tests
│   └── watchlist.test.js     # Scoping, duplicate prevention, and deletion tests
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd CineLog/Backend
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Start the Server
```bash
# Production mode
npm start

# Development mode (with live watch)
npm run dev
```

The API will listen at:
```
http://localhost:5001
```

> **Note on Database**: If you do not have MongoDB running locally, the server automatically boots into **Resilient In-Memory Mode** using pre-seeded sample data. All endpoints, filters, searches, and watchlist operations work immediately without crashing.

---

## ⚙️ Environment Variables

| Variable | Default | Description |
| :--- | :--- | :--- |
| `PORT` | `5001` | HTTP server listening port |
| `NODE_ENV` | `development` | Runtime environment (`development`, `production`, `test`) |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/cinelog` | MongoDB connection string or Atlas URI |
| `CORS_ORIGIN` | `http://localhost:5173,http://127.0.0.1:5173` | Allowed CORS origins (comma-separated) |
| `RATE_LIMIT_WINDOW_MS`| `900000` (15 minutes) | Rate limit window in milliseconds |
| `RATE_LIMIT_MAX` | `200` | Max requests per IP in the window |
| `TMDB_API_KEY` | *(empty)* | Optional TMDB v3 API Key |
| `TMDB_BASE_URL` | `https://api.themoviedb.org/3` | Base URL for TMDB API |

---

## 🔒 Prototype Security & Visitor Scoping

> ⚠️ **Important Prototype Notice**:
> For initial discovery without requiring accounts/passwords, CineLog uses **Visitor Scoping**:
> - The client generates an anonymous UUID or token (e.g. stored in `localStorage`) and sends it in the `x-visitor-id` request header.
> - Watchlist items are strictly isolated and queried per visitor.
> - Input format is validated using regex `/^[a-zA-Z0-9_-]{4,64}$/`.
> - **This is not production-grade user authentication**. For production, replace this with JWT tokens or session cookies signed by an authentication provider (e.g., OAuth2, Clerk, Auth0, or bcrypt-hashed passwords).

---

## 📖 API Documentation

All responses use a standardized JSON wrapper:
- Success: `{ "success": true, ...data }`
- Error: `{ "success": false, "error": { "code": "...", "message": "..." } }`

---

### 1. Health Check
`GET /api/health`

**Response (`200 OK`)**:
```json
{
  "success": true,
  "status": "healthy",
  "service": "CineLog REST API",
  "timestamp": "2026-10-17T12:00:00.000Z",
  "uptime": 45.2,
  "environment": "development",
  "database": {
    "status": "connected",
    "driver": "MongoDB / Mongoose"
  },
  "tmdbIntegration": {
    "configured": false
  }
}
```

---

### 2. List Titles
`GET /api/titles`

**Query Parameters**:
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `page` | Integer | `1` | Page number |
| `limit` | Integer | `12` | Results per page (max 100) |
| `type` | String | `'all'` | Filter by type: `'movie'`, `'tv'`, `'all'` |
| `genre` | String | `'All Genres'`| Filter by genre (e.g., `'Sci-Fi'`, `'Drama'`, `'Comedy'`) |
| `language` | String | `'All Languages'`| Filter by audio language (e.g., `'English'`, `'Korean'`) |
| `mood` | String | *(none)* | Filter by mood tag: `'feel-good'`, `'thriller'`, `'romance'`, `'mind-bending'`, `'emotional'`, `'comedy'` |
| `sort` | String | `'featured'`| Sort order: `'featured'`, `'rating-desc'`, `'year-desc'`, `'title-asc'` |

**Example Request**:
```bash
curl "http://localhost:5001/api/titles?type=movie&genre=Sci-Fi&mood=mind-bending"
```

**Response (`200 OK`)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "664000000000000000000001",
      "title": "Dune: Part Two",
      "type": "movie",
      "releaseYear": 2024,
      "rating": 8.8,
      "voteCount": 421000,
      "genres": ["Sci-Fi", "Adventure", "Action"],
      "language": "English",
      "moodTags": ["mind-bending", "thriller"],
      "runtime": "2h 46m",
      "director": "Denis Villeneuve",
      "cast": ["Timothée Chalamet", "Zendaya"],
      "synopsis": "Paul Atreides unites with Chani and the Fremen...",
      "posterPath": "https://images.unsplash.com/...",
      "backdropPath": "/images/hero-cinematic.jpg",
      "externalProviderId": "tmdb-693134"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

---

### 3. Fetch Title Details
`GET /api/titles/:id`

**Response (`200 OK`)**:
```json
{
  "success": true,
  "data": {
    "id": "664000000000000000000001",
    "title": "Dune: Part Two",
    "type": "movie",
    "releaseYear": 2024,
    "rating": 8.8,
    "synopsis": "Paul Atreides unites with Chani...",
    "director": "Denis Villeneuve",
    "cast": ["Timothée Chalamet", "Zendaya"]
  }
}
```

**Error Response (`404 Not Found`)**:
```json
{
  "success": false,
  "error": {
    "code": "TITLE_NOT_FOUND",
    "message": "Title with ID 'nonexistent' was not found."
  }
}
```

---

### 4. Search Titles
`GET /api/search?q=...`

Supports searching across title, director, cast, and synopsis, combined with optional type, genre, and mood filters.

**Query Parameters**:
- `q`: Search string (e.g. `q=Dune`, `q=Nolan`, `q=Korean`)
- `type`: `movie` | `tv`
- `genre`: e.g. `Sci-Fi`
- `mood`: e.g. `mind-bending`
- `page`: Page index
- `limit`: Items per page

**Example Request**:
```bash
curl "http://localhost:5001/api/search?q=Christopher%20Nolan"
```

---

### 5. Get Watchlist
`GET /api/watchlist`

**Headers**:
- `x-visitor-id`: Unique visitor identifier (Required, e.g. `client-uuid-9876`)

**Example Request**:
```bash
curl -H "x-visitor-id: client-uuid-9876" "http://localhost:5001/api/watchlist"
```

**Response (`200 OK`)**:
```json
{
  "success": true,
  "visitorId": "client-uuid-9876",
  "count": 1,
  "data": [
    {
      "id": "wl_client-uuid-9876_664000000000000000000001",
      "visitorId": "client-uuid-9876",
      "createdAt": "2026-10-17T12:30:00.000Z",
      "title": {
        "id": "664000000000000000000001",
        "title": "Dune: Part Two",
        "rating": 8.8
      }
    }
  ]
}
```

---

### 6. Add Title to Watchlist
`POST /api/watchlist`

**Headers**:
- `Content-Type: application/json`
- `x-visitor-id: <visitor-id>`

**Body**:
```json
{
  "titleId": "664000000000000000000001"
}
```

**Response (`201 Created`)**:
```json
{
  "success": true,
  "message": "Title successfully added to watchlist.",
  "data": {
    "visitorId": "client-uuid-9876",
    "titleId": "664000000000000000000001"
  }
}
```

**Duplicate Addition Response (`409 Conflict`)**:
```json
{
  "success": false,
  "error": {
    "code": "DUPLICATE_RESOURCE",
    "message": "This title is already in your watchlist."
  }
}
```

---

### 7. Remove Title from Watchlist
`DELETE /api/watchlist/:titleId`

**Headers**:
- `x-visitor-id: <visitor-id>`

**Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Title successfully removed from watchlist.",
  "removedId": "664000000000000000000001"
}
```

---

## 🎬 External Provider (TMDB Integration)

To connect live data from The Movie Database (TMDB):
1. Sign up at [themoviedb.org](https://www.themoviedb.org/) and generate an API key.
2. In `Backend/.env`, set:
   ```env
   TMDB_API_KEY=your_actual_tmdb_api_key_here
   ```
3. Restart the server.
4. Use `provider=tmdb` in the search endpoint to query TMDB directly:
   ```bash
   curl "http://localhost:5001/api/search?q=Inception&provider=tmdb"
   ```

> 🛡️ **Security Rule**: The `TMDB_API_KEY` is strictly confined to server-side services. It is **never** sent to the client browser or exposed in frontend code.

---

## 🧪 Testing

The backend includes a comprehensive test suite covering health checks, titles filtering, search, and watchlist operations using Node's native test runner and Supertest.

Run tests:
```bash
npm test
```

Expected output:
```
✔ Health and System Endpoints
✔ Search API Endpoints
✔ Titles API Endpoints
✔ Watchlist API Endpoints
ℹ tests 25
ℹ pass 25
ℹ fail 0
```

---

## 💡 Example cURL Commands

```bash
# 1. Health Check
curl http://localhost:5001/api/health

# 2. Get All Movies (Page 1, Limit 5)
curl "http://localhost:5001/api/titles?type=movie&page=1&limit=5"

# 3. Filter by Mood & Genre
curl "http://localhost:5001/api/titles?mood=mind-bending&genre=Sci-Fi"

# 4. Search for Christopher Nolan
curl "http://localhost:5001/api/search?q=Nolan"

# 5. Add to Watchlist (Replace with real titleId from step 2)
curl -X POST http://localhost:5001/api/watchlist \
  -H "Content-Type: application/json" \
  -H "x-visitor-id: demo-visitor-001" \
  -d '{"titleId": "664000000000000000000001"}'

# 6. Retrieve Watchlist
curl -H "x-visitor-id: demo-visitor-001" http://localhost:5001/api/watchlist

# 7. Remove from Watchlist
curl -X DELETE http://localhost:5001/api/watchlist/664000000000000000000001 \
  -H "x-visitor-id: demo-visitor-001"
```
