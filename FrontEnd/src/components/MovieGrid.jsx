import React from 'react';
import { Film, AlertCircle, RotateCcw, Clapperboard } from 'lucide-react';
import MovieCard from './MovieCard';

export default function MovieGrid({
  movies = [],
  loading = false,
  error = null,
  onRetry,
  onSelectMovie,
  watchlistIds = [],
  onToggleWatchlist,
  title = 'Catalog',
  subtitle = null,
  onResetFilters
}) {
  // 1. Loading Skeleton State
  if (loading) {
    return (
      <div className="w-full">
        {title && (
          <div className="mb-6 flex items-center justify-between">
            <div className="h-7 w-48 rounded-lg bg-cinelog-surface animate-shimmer" />
            <div className="h-5 w-24 rounded-lg bg-cinelog-surface animate-shimmer" />
          </div>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex flex-col rounded-2xl bg-cinelog-card border border-cinelog-border-subtle overflow-hidden">
              <div className="aspect-[2/3] w-full animate-shimmer" />
              <div className="p-4 space-y-2.5">
                <div className="h-3.5 w-1/2 rounded bg-cinelog-surface animate-shimmer" />
                <div className="h-5 w-4/5 rounded bg-cinelog-surface animate-shimmer" />
                <div className="h-3 w-1/3 rounded bg-cinelog-surface animate-shimmer pt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="w-full py-16 px-4 text-center rounded-3xl bg-cinelog-card/60 border border-red-500/20 backdrop-blur-md">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-cinelog-text mb-1">
          Unable to Load Cinematic Collection
        </h3>
        <p className="text-sm text-cinelog-muted max-w-md mx-auto mb-6">
          {error || 'Something went wrong while retrieving titles. Please check your network and try again.'}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-cinelog-accent text-cinelog-bg hover:bg-cinelog-accent-hover transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    );
  }

  // 3. Empty Results State
  if (!movies || movies.length === 0) {
    return (
      <div className="w-full py-20 px-4 text-center rounded-3xl bg-cinelog-card/40 border border-cinelog-border-subtle backdrop-blur-md">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cinelog-surface/80 border border-cinelog-border flex items-center justify-center text-cinelog-accent shadow-glow">
          <Clapperboard className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold font-cinematic text-cinelog-text mb-2">
          No Titles Matched Your Criteria
        </h3>
        <p className="text-sm text-cinelog-muted max-w-md mx-auto mb-6 leading-relaxed">
          We couldn't find any movie or TV series matching all your active filters and search terms. Try loosening your criteria or resetting filters.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-cinelog-surface hover:bg-cinelog-surface-hover text-cinelog-accent border border-cinelog-accent/40 hover:border-cinelog-accent transition-all shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    );
  }

  // 4. Populated Grid
  return (
    <div className="w-full">
      {title && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-cinematic text-cinelog-text tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-cinelog-muted mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          <span className="text-xs font-semibold text-cinelog-accent px-3 py-1 rounded-full bg-cinelog-card border border-cinelog-border-subtle w-fit">
            {movies.length} {movies.length === 1 ? 'title' : 'titles'}
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onSelect={onSelectMovie}
            inWatchlist={watchlistIds.includes(movie.id)}
            onToggleWatchlist={onToggleWatchlist}
          />
        ))}
      </div>
    </div>
  );
}
