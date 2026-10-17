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

import { api, getVisitorId } from './services/api';
import { Sparkles, Flame, Tv, Film, CheckCircle2, AlertCircle, Info, RefreshCw } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('discover'); // 'discover' | 'movies' | 'tv' | 'moods' | 'watchlist'
  
  // Real Backend Data State
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Watchlist State (synchronized with backend via x-visitor-id)
  const [watchlistIds, setWatchlistIds] = useState([]);
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [visitorId, setVisitorId] = useState(() => getVisitorId());

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

  // Toast feedback state
  const [toast, setToast] = useState(null); // { message, type: 'success' | 'error' | 'info' }

  // Search input ref for quick focus
  const searchInputRef = useRef(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(current => (current?.message === message ? null : current));
    }, 3500);
  };

  // 1. Fetch Titles from Backend with active search and filters
  const fetchTitlesFromBackend = async () => {
    setLoading(true);
    setError(null);
    try {
      let res;
      if (searchQuery.trim()) {
        res = await api.searchTitles({
          query: searchQuery,
          type: selectedType,
          genre: selectedGenre,
          language: selectedLanguage,
          mood: selectedMood,
          limit: 40
        });
      } else {
        res = await api.getTitles({
          type: selectedType,
          genre: selectedGenre,
          language: selectedLanguage,
          mood: selectedMood,
          sort: sortBy,
          limit: 40
        });
      }
      setCatalog(res.data || []);
    } catch (err) {
      console.error('Failed to load titles from CineLog backend:', err);
      // Strictly present error - do NOT silently substitute fake sample data
      setError(err.message || 'Unable to connect to CineLog Backend REST API. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Fetch Watchlist from Backend using Visitor ID
  const fetchWatchlistFromBackend = async () => {
    try {
      const res = await api.getWatchlist();
      const items = res.data || [];
      setWatchlistItems(items);
      setWatchlistIds(items.map(item => item.title?.id || item.titleId));
    } catch (err) {
      console.warn('Watchlist fetch warning:', err.message);
      // Only display toast if not a generic background initial fetch
      if (activeTab === 'watchlist') {
        showToast('Failed to sync watchlist with backend: ' + err.message, 'error');
      }
    }
  };

  // Initial load
  useEffect(() => {
    fetchWatchlistFromBackend();
  }, [visitorId]);

  // Debounced fetch when search or filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTitlesFromBackend();
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedType, selectedGenre, selectedLanguage, selectedMood, sortBy]);

  // Handle Watchlist Toggle via Backend API
  const handleToggleWatchlist = async (movieId) => {
    const isSaved = watchlistIds.includes(movieId);
    try {
      if (isSaved) {
        await api.removeFromWatchlist(movieId);
        setWatchlistIds(prev => prev.filter(id => id !== movieId));
        setWatchlistItems(prev => prev.filter(item => (item.title?.id || item.titleId) !== movieId));
        showToast('Removed title from your watchlist', 'info');
      } else {
        const res = await api.addToWatchlist(movieId);
        setWatchlistIds(prev => [...prev, movieId]);
        if (res.data) {
          setWatchlistItems(prev => [res.data, ...prev]);
        }
        showToast('Added title to your watchlist', 'success');
      }
    } catch (err) {
      console.error('Watchlist API operation failed:', err);
      showToast(err.message || 'Failed to update watchlist on backend', 'error');
    }
  };

  // Handle Watchlist Clear
  const handleClearWatchlist = async () => {
    try {
      for (const id of watchlistIds) {
        await api.removeFromWatchlist(id).catch(() => {});
      }
      setWatchlistIds([]);
      setWatchlistItems([]);
      showToast('All items cleared from your watchlist', 'info');
    } catch (err) {
      showToast('Error clearing watchlist: ' + err.message, 'error');
    }
  };

  // Switch or generate a new visitor ID to demonstrate visitor-scoping
  const handleGenerateNewVisitor = () => {
    const newId = `v_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('cinelog_visitor_id', newId);
    setVisitorId(newId);
    setWatchlistIds([]);
    setWatchlistItems([]);
    showToast(`Switched to new anonymous visitor profile (${newId})`, 'info');
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
      fetchWatchlistFromBackend();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFocusSearch = () => {
    searchInputRef.current?.focus();
    searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Spotlight featured title (from backend data)
  const featuredTitle = useMemo(() => {
    return catalog.find(m => m.featured) || catalog[0] || null;
  }, [catalog]);
  
  // Trending movies from backend data
  const trendingMovies = useMemo(() => {
    return catalog.filter(m => m.type === 'movie' && m.trending).slice(0, 5);
  }, [catalog]);

  // Popular TV shows from backend data
  const popularTVShows = useMemo(() => {
    return catalog.filter(m => m.type === 'tv' && m.popular).slice(0, 5);
  }, [catalog]);

  // Saved titles list for Watchlist view
  const savedMoviesList = useMemo(() => {
    return watchlistItems.map(item => item.title).filter(Boolean);
  }, [watchlistItems]);

  const isFilteringActive = activeFilterCount > 0;

  return (
    <div className="min-h-screen bg-cinelog-bg text-cinelog-text flex flex-col font-sans selection:bg-cinelog-accent selection:text-cinelog-bg">
      {/* Toast Notification Banner */}
      {toast && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-cinelog-card/95 border border-cinelog-border shadow-2xl backdrop-blur-xl animate-fade-in text-sm max-w-md"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-cinelog-accent flex-shrink-0" />}
          <span className="text-cinelog-text font-medium">{toast.message}</span>
        </aside>
      )}

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
          <div className="space-y-4">
            <Watchlist
              savedMovies={savedMoviesList}
              onSelectMovie={setSelectedMovie}
              onToggleWatchlist={handleToggleWatchlist}
              onClearWatchlist={handleClearWatchlist}
              onNavigateDiscover={() => handleTabChange('discover')}
            />
            
            {/* Visitor Scoping Debug Info */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
              <div className="p-4 rounded-2xl bg-cinelog-card/60 border border-cinelog-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cinelog-muted">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cinelog-accent animate-pulse" />
                  <span>Visitor Profile:</span>
                  <code className="px-2 py-0.5 rounded bg-cinelog-surface text-cinelog-accent font-mono">
                    {visitorId}
                  </code>
                  <span className="hidden md:inline">(Scoping all watchlist queries)</span>
                </div>
                <button
                  onClick={handleGenerateNewVisitor}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cinelog-surface hover:bg-cinelog-surface-hover text-cinelog-text hover:text-cinelog-accent border border-cinelog-border-subtle transition-all"
                  title="Generate a new visitor ID to verify watchlist isolation"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Switch Visitor Profile</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* VIEW 2: Discover & Catalog View */
          <>
            {/* Hero Section (Only in Discover mode when not actively searching/filtering) */}
            {activeTab === 'discover' && !isFilteringActive && featuredTitle && (
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
                  totalResults={catalog.length}
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
                    subtitle={`Showing matches from CineLog Backend for your active filters`}
                    movies={catalog}
                    loading={loading}
                    error={error}
                    onRetry={fetchTitlesFromBackend}
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
                      subtitle="Browse through real titles retrieved from CineLog REST API"
                      movies={catalog}
                      loading={loading}
                      error={error}
                      onRetry={fetchTitlesFromBackend}
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
