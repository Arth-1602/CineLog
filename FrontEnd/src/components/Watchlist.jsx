import React, { useState } from 'react';
import { Bookmark, Trash2, Clapperboard, Compass, Search, Filter } from 'lucide-react';
import MovieCard from './MovieCard';

export default function Watchlist({
  savedMovies = [],
  onSelectMovie,
  onToggleWatchlist,
  onClearWatchlist,
  onNavigateDiscover
}) {
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMovies = savedMovies.filter((movie) => {
    if (filterType !== 'all' && movie.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        movie.title?.toLowerCase().includes(q) ||
        movie.genres?.some(g => g.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cinelog-border-subtle mb-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cinelog-card border border-cinelog-border text-cinelog-accent shadow-glow">
              <Bookmark className="w-6 h-6 fill-cinelog-accent/20" />
            </div>
            <div>
              <h1 className="font-cinematic text-3xl sm:text-4xl font-bold text-cinelog-text">
                Your Personal Watchlist
              </h1>
              <p className="text-sm text-cinelog-muted mt-0.5">
                Saved titles automatically sync with your browser’s local storage
              </p>
            </div>
          </div>
        </div>

        {savedMovies.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-cinelog-surface text-cinelog-accent border border-cinelog-border-subtle">
              {savedMovies.length} Saved {savedMovies.length === 1 ? 'Title' : 'Titles'}
            </span>

            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your entire watchlist?')) {
                  onClearWatchlist();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-all"
              title="Clear all saved titles"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {/* If Watchlist is totally empty */}
      {savedMovies.length === 0 ? (
        <div className="py-24 text-center rounded-3xl bg-cinelog-card/40 border border-cinelog-border-subtle backdrop-blur-md max-w-2xl mx-auto px-6">
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-cinelog-surface border border-cinelog-border flex items-center justify-center text-cinelog-accent shadow-glow">
            <Bookmark className="w-10 h-10 stroke-[1.5]" />
          </div>
          <h2 className="font-cinematic text-2xl sm:text-3xl font-bold text-cinelog-text mb-3">
            Your Watchlist is Still Empty
          </h2>
          <p className="text-sm sm:text-base text-cinelog-muted leading-relaxed mb-8 max-w-lg mx-auto">
            Find films and series that match your current mood, click the bookmark icon on any title, and they will wait for you here.
          </p>
          <button
            onClick={onNavigateDiscover}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm bg-cinelog-accent text-cinelog-bg hover:bg-cinelog-accent-hover shadow-glow transition-all transform hover:-translate-y-0.5"
          >
            <Compass className="w-4 h-4" />
            <span>Discover Titles Now</span>
          </button>
        </div>
      ) : (
        <>
          {/* Watchlist Controls (Search inside watchlist & filter by type) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            {/* Filter by Type */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-cinelog-card border border-cinelog-border-subtle w-full sm:w-fit">
              {[
                { id: 'all', label: 'All Saved' },
                { id: 'movie', label: 'Movies' },
                { id: 'tv', label: 'TV Series' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setFilterType(t.id)}
                  className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    filterType === t.id
                      ? 'bg-cinelog-accent text-cinelog-bg shadow-sm'
                      : 'text-cinelog-muted hover:text-cinelog-text'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Quick search input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cinelog-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search saved titles..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-cinelog-card border border-cinelog-border-subtle text-xs sm:text-sm text-cinelog-text placeholder-cinelog-muted focus:border-cinelog-accent focus:ring-1 focus:ring-cinelog-accent outline-none"
              />
            </div>
          </div>

          {/* Saved Titles Grid */}
          {filteredMovies.length === 0 ? (
            <div className="py-16 text-center rounded-2xl bg-cinelog-card/40 border border-cinelog-border-subtle">
              <p className="text-cinelog-muted text-sm">
                No saved titles matched "{searchQuery}" in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onSelect={onSelectMovie}
                  inWatchlist={true}
                  onToggleWatchlist={onToggleWatchlist}
                />
              ))}
            </div>
          )}
        </>
      )}

    </div>
  );
}
