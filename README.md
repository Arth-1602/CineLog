# CineLog 🎬
> **“Discover your next obsession.”**

CineLog is an elegant, responsive cinematic discovery website built with React, Vite, and Tailwind CSS. Explore films and TV series by mood, genre, type, and language, and curate a personalized watchlist persisted via browser `localStorage`.

---

## ✨ Features

- **Discover Experience**:
  - **Hero Spotlight**: Featuring *Dune: Part Two* against a cinematic landscape backdrop with quick synopsis, tags, rating, and actions.
  - **Live Search**: Instant keyword search matching titles, directors, cast members, and synopses with keyboard shortcut (`/` to focus, `Esc` to clear).
  - **Mood Discovery**: 6 curated mood categories (*Feel-Good*, *Thriller*, *Romance*, *Mind-Bending*, *Emotional*, and *Comedy*) powered by deterministic mood tags.
  - **Multi-Filter Engine**: Combine Type (Movies / TV Series), Genre, Audio Language, and Mood simultaneously, along with sorting by rating, year, or title.
  - **Curated Rows & Full Catalog**: Trending highlights, acclaimed television series, and complete catalog views.

- **Film & Series Details**:
  - Full modal overlay with high-resolution poster and backdrop imagery.
  - Community rating (`X.X / 10`), release year, runtime, original language, director/creator, starring cast, and synopsis.
  - Interactive teaser preview room with 4K letterboxing interface.
  - One-click watchlist toggle and quick link sharing.

- **Persistent Watchlist**:
  - Add or remove titles from cards, spotlight hero, or details view.
  - Automatic browser `localStorage` persistence that survives refreshes.
  - Filter saved titles by type and search within your saved collection.
  - One-click clear watchlist action with confirmation.

- **Design & Aesthetics**:
  - Cinematic dark palette:
    - Background: `#080B0F`
    - Cards: `#151A22`
    - Secondary surfaces: `#222833`
    - Accent: `#D6A65D` (Golden reel glow)
    - Text: `#F5F6F8`
  - Subtle micro-animations, glassmorphism panels, and smooth hover elevation.
  - Responsive layout for desktop, tablet, and mobile devices with a slide-out drawer menu.
  - Full keyboard accessibility with visible focus rings (`:focus-visible`).

- **Asset & Data Quality**:
  - Custom SVG logo: `public/images/cinelog-logo.svg`
  - High-res hero background: `public/images/hero-cinematic.jpg`
  - Elegant missing poster fallback: `public/images/poster-placeholder.jpg`
  - Extensible image architecture ready for live TMDB API ingestion (`/image_path.jpg`).
  - No misleading fake verification badges; transparent rating presentation.

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) with custom cinematic color tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Plus Jakarta Sans & Cinzel (Google Fonts)
- **State & Storage**: React Hooks (`useState`, `useMemo`, `useEffect`) + `localStorage`

---

## 📁 Project Structure

```
CineLog/
├── FrontEnd/
│   ├── public/
│   │   └── images/
│   │       ├── cinelog-logo.svg        # CineLog brand emblem
│   │       ├── hero-cinematic.jpg      # Cinematic landscape backdrop
│   │       └── poster-placeholder.jpg  # Missing poster fallback asset
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx              # Header, navigation & mobile drawer
│   │   │   ├── HeroSection.jsx         # Spotlight featured title banner
│   │   │   ├── SearchBar.jsx           # Search input with quick suggestion chips
│   │   │   ├── MoodSelector.jsx        # 6-grid mood discovery cards
│   │   │   ├── FilterPanel.jsx         # Multi-filter dropdowns and reset action
│   │   │   ├── MovieCard.jsx           # Poster card with hover & quick save
│   │   │   ├── MovieGrid.jsx           # Responsive grid, skeleton & empty states
│   │   │   ├── MovieDetails.jsx        # Rich details modal view
│   │   │   ├── Watchlist.jsx           # Saved titles view with search & clear
│   │   │   ├── TrailerModal.jsx        # Cinema teaser preview player
│   │   │   └── Footer.jsx              # Footer with brand & palette specs
│   │   ├── data/
│   │   │   └── movies.js               # Mock catalog of movies, series, moods
│   │   ├── services/
│   │   │   ├── movieService.js         # Query & retrieval service
│   │   │   └── storageService.js       # Watchlist localStorage manager
│   │   ├── utils/
│   │   │   └── helpers.js              # Multi-filter logic & poster fallbacks
│   │   ├── App.jsx                     # Application coordinator
│   │   ├── index.css                   # Custom scrollbars, glass & shimmer
│   │   └── main.jsx                    # React DOM entry
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 1. Install Dependencies
```bash
cd CineLog/FrontEnd
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The application will launch at:
```
http://127.0.0.1:5173/
```

### 3. Production Build
```bash
npm run build
```
To preview the production bundle:
```bash
npm run preview
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `/` | Focus search input from anywhere |
| `Esc` | Clear search / Close details modal / Close teaser |
| `Tab` / `Shift+Tab` | Navigate through interactive elements with gold focus ring |
| `Enter` / `Space` | Select title, open modal, or toggle mood |

---

## 🎬 License
MIT License. Created for cinematic discovery.