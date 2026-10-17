import React, { useState, useEffect, useMemo, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SearchBar from './components/SearchBar';
import MoodSelector from './components/MoodSelector';
import FilterPanel from './components/FilterPanel';
import MovieCard from './components/MovieCard';
import MovieGrid from './components/MovieGrid';
import MovieDetails from './components/MovieDetails';
import Watchlist from './components/Watchlist';
import TrailerModal from './components/TrailerModal';
import Footer from './components/Footer';

import { movieService } from './services/movieService';
import { storageService } from './services/storageService';
import { filterMovies } from './utils/helpers';
import { Sparkles, Flame, Tv, Film } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('discover'); // 'discover' | 'movies' | 'tv' | 'moods' | 'watchlist'
  
  // Data State
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Watchlist State (persistent via localStorage)
  const [watchlistIds, setWatchlistIds] = useState(() => storageService.getWatchlistIds());
  
  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [selectedLanguage, setSelectedLanguage] = useState('All Languages');
  const [selectedMood, setSelectedMood] = useState(null);
  const [sortBy, setSortBy] = useState('featured');

  // Modal State
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerMovie, setTrailerMovie] = useState(null);

  // Search input ref for quick focus
  const searchInputRef = useRef(null);

  // Load movies on mount
  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await movieService.getAllTitles();
      setAllMovies(data);
    } catch (err) {
      console.error('Failed to load movies:', err);
      setError('Unable to load film archives. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Listen to custom watchlist change events (for cross-tab or service syncing)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.detail) {
        setWatchlistIds(e.detail);
      } else {
        setWatchlistIds(storageService.getWatchlistIds());
      }
    };
    window.addEventListener('cinelog:watchlist_changed', handleStorageChange);
    return () => window.removeEventListener('cinelog:watchlist_changed', handleStorageChange);
  }, []);

  // Handle Watchlist Toggle
  const handleToggleWatchlist = (movieId) => {
    const updated = storageService.toggle(movieId);
    setWatchlistIds(updated);
  };

  // Handle Watchlist Clear
  const handleClearWatchlist = () => {
    const updated = storageService.clear();
    setWatchlistIds(updated);
  };

  // Reset all search and filter options
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedGenre('All Genres');
    setSelectedLanguage('All Languages');
    setSelectedMood(null);
    setSortBy('featured');
  };

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedType !== 'all') count++;
    if (selectedGenre !== 'All Genres') count++;
    if (selectedLanguage !== 'All Languages') count++;
    if (selectedMood !== null) count++;
    return count;
  }, [searchQuery, selectedType, selectedGenre, selectedLanguage, selectedMood]);

  // Tab switching effects
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'movies') {
      setSelectedType('movie');
      window.scrollTo({ top: 500, behavior: 'smooth' });
    } else if (tabId === 'tv') {
      setSelectedType('tv');
      window.scrollTo({ top: 500, behavior: 'smooth' });
    } else if (tabId === 'moods') {
      setSelectedType('all');
      window.scrollTo({ top: 400, behavior: 'smooth' });
    } else if (tabId === 'discover') {
      setSelectedType('all');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tabId === 'watchlist') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFocusSearch = () => {
    searchInputRef.current?.focus();
    searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Filtered and Sorted catalog
  const filteredCatalog = useMemo(() => {
    let list = filterMovies(allMovies, {
      query: searchQuery,
      type: selectedType,
      genre: selectedGenre,
      language: selectedLanguage,
      mood: selectedMood
    });

    // Sorting logic
    if (sortBy === 'rating-desc') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'year-desc') {
      list = [...list].sort((a, b) => b.releaseYear - a.releaseYear);
    } else if (sortBy === 'title-asc') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [allMovies, searchQuery, selectedType, selectedGenre, selectedLanguage, selectedMood, sortBy]);

  // Derived curated sections for Discover view
  const featuredTitle = useMemo(() => movieService.getFeaturedTitle(), []);
  
  const trendingMovies = useMemo(() => {
    return allMovies.filter(m => m.type === 'movie' && m.trending).slice(0, 5);
  }, [allMovies]);

  const popularTVShows = useMemo(() => {
    return allMovies.filter(m => m.type === 'tv' && m.popular).slice(0, 5);
  }, [allMovies]);

  // Watchlist items object list
  const savedMoviesList = useMemo(() => {
    return allMovies.filter(m => watchlistIds.includes(m.id));
  }, [allMovies, watchlistIds]);

  const isFilteringActive = activeFilterCount > 0;

  return (
    <div className="min-h-screen bg-cinelog-bg text-cinelog-text flex flex-col font-sans selection:bg-cinelog-accent selection:text-cinelog-bg">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        watchlistCount={watchlistIds.length}
        onSearchFocus={handleFocusSearch}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: Watchlist View */}
        {activeTab === 'watchlist' ? (
          <Watchlist
            savedMovies={savedMoviesList}
            onSelectMovie={setSelectedMovie}
            onToggleWatchlist={handleToggleWatchlist}
            onClearWatchlist={handleClearWatchlist}
            onNavigateDiscover={() => handleTabChange('discover')}
          />
        ) : (
          /* VIEW 2: Discover & Catalog View */
          <>
            {/* Hero Section (Only in Discover mode when not actively searching/filtering) */}
            {activeTab === 'discover' && !isFilteringActive && (
              <HeroSection
                movie={featuredTitle}
                onSelectMovie={setSelectedMovie}
                inWatchlist={watchlistIds.includes(featuredTitle.id)}
                onToggleWatchlist={handleToggleWatchlist}
                onOpenTrailer={setTrailerMovie}
              />
            )}

            {/* Discover Control Bar Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-12">
              
              {/* Search Bar */}
              <section aria-label="Search Catalog">
                <SearchBar
                  inputRef={searchInputRef}
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onClear={() => setSearchQuery('')}
                  totalResults={filteredCatalog.length}
                  activeFilterCount={activeFilterCount}
                />
              </section>

              {/* Mood Discovery Selector */}
              <section aria-label="Mood Discovery">
                <MoodSelector
                  selectedMood={selectedMood}
                  onSelectMood={setSelectedMood}
                />
              </section>

              {/* Filter & Sorter Toolbar */}
              <section aria-label="Filter Controls">
                <FilterPanel
                  type={selectedType}
                  onTypeChange={setSelectedType}
                  genre={selectedGenre}
                  onGenreChange={setSelectedGenre}
                  language={selectedLanguage}
                  onLanguageChange={setSelectedLanguage}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  onResetAll={handleResetFilters}
                  activeFilterCount={activeFilterCount}
                />
              </section>

              {/* SECTION: If Filtering/Searching is active, show the filtered grid directly */}
              {isFilteringActive ? (
                <section aria-label="Search Results">
                  <MovieGrid
                    title="Search & Filter Results"
                    subtitle={`Showing matches based on your ${activeFilterCount} active filter${activeFilterCount > 1 ? 's' : ''}`}
                    movies={filteredCatalog}
                    loading={loading}
                    error={error}
                    onRetry={fetchMovies}
                    onSelectMovie={setSelectedMovie}
                    watchlistIds={watchlistIds}
                    onToggleWatchlist={handleToggleWatchlist}
                    onResetFilters={handleResetFilters}
                  />
                </section>
              ) : (
                /* SECTION: Curated Rows for default Discover state */
                <>
                  {/* Row 1: Trending Movies */}
                  {trendingMovies.length > 0 && (
                    <section aria-label="Trending Movies">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Flame className="w-5 h-5 text-cinelog-accent" />
                          <h2 className="text-xl sm:text-2xl font-bold font-cinematic text-cinelog-text">
                            Trending This Week
                          </h2>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedType('movie');
                            setSortBy('rating-desc');
                          }}
                          className="text-xs font-semibold text-cinelog-accent hover:underline"
                        >
                          Explore all movies →
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                        {trendingMovies.map((movie) => (
                          <MovieCard
                            key={movie.id}
                            movie={movie}
                            onSelect={setSelectedMovie}
                            inWatchlist={watchlistIds.includes(movie.id)}
                            onToggleWatchlist={handleToggleWatchlist}
                          />
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Row 2: Popular TV Shows */}
                  {popularTVShows.length > 0 && (
                    <section aria-label="Popular TV Shows" className="pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Tv className="w-5 h-5 text-cinelog-accent" />
                          <h2 className="text-xl sm:text-2xl font-bold font-cinematic text-cinelog-text">
                            Acclaimed TV Series
                          </h2>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedType('tv');
                            setSortBy('rating-desc');
                          }}
                          className="text-xs font-semibold text-cinelog-accent hover:underline"
                        >
                          Explore all series →
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                        {popularTVShows.map((show) => (
                          <MovieCard
                            key={show.id}
                            movie={show}
                            onSelect={setSelectedMovie}
                            inWatchlist={watchlistIds.includes(show.id)}
                            onToggleWatchlist={handleToggleWatchlist}
                          />
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Complete Catalog Grid */}
                  <section aria-label="Full Catalog" className="pt-6 border-t border-cinelog-border-subtle">
                    <MovieGrid
                      title="All Cinematic Titles"
                      subtitle="Browse through our library of feature films, series, and indie gems"
                      movies={filteredCatalog}
                      loading={loading}
                      error={error}
                      onRetry={fetchMovies}
                      onSelectMovie={setSelectedMovie}
                      watchlistIds={watchlistIds}
                      onToggleWatchlist={handleToggleWatchlist}
                      onResetFilters={handleResetFilters}
                    />
                  </section>
                </>
              )}

            </div>
          </>
        )}

      </main>

      {/* Modal: Movie Details */}
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          inWatchlist={watchlistIds.includes(selectedMovie.id)}
          onToggleWatchlist={handleToggleWatchlist}
          onOpenTrailer={(m) => {
            setSelectedMovie(null);
            setTrailerMovie(m);
          }}
        />
      )}

      {/* Modal: Teaser / Trailer Preview */}
      {trailerMovie && (
        <TrailerModal
          movie={trailerMovie}
          onClose={() => setTrailerMovie(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
