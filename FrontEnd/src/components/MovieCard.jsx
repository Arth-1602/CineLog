import React, { useState } from 'react';
import { Star, Plus, Check, Bookmark, Calendar, Clock } from 'lucide-react';
import { getPosterUrl, formatRating, PLACEHOLDER_POSTER } from '../utils/helpers';

export default function MovieCard({
  movie,
  onSelect,
  inWatchlist = false,
  onToggleWatchlist
}) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const posterSrc = imgError ? PLACEHOLDER_POSTER : getPosterUrl(movie.posterUrl);

  const handleWatchlistClick = (e) => {
    e.stopPropagation();
    onToggleWatchlist(movie.id);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(movie);
    }
  };

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={`View details for ${movie.title}`}
      onClick={() => onSelect(movie)}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col rounded-2xl bg-cinelog-card border border-cinelog-border-subtle hover:border-cinelog-border overflow-hidden transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-glow cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinelog-accent"
    >
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-cinelog-surface">
        <img
          src={posterSrc}
          alt={movie.title}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay for poster readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinelog-card via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Top Badges (Type & Quick Watchlist button) */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-cinelog-bg/85 backdrop-blur-md text-cinelog-accent border border-cinelog-border-subtle">
            {movie.type === 'tv' ? 'TV Series' : 'Movie'}
          </span>

          <button
            onClick={handleWatchlistClick}
            aria-label={inWatchlist ? `Remove ${movie.title} from Watchlist` : `Add ${movie.title} to Watchlist`}
            className={`p-2 rounded-xl backdrop-blur-md transition-all duration-200 border ${
              inWatchlist
                ? 'bg-cinelog-accent text-cinelog-bg border-cinelog-accent shadow-glow'
                : 'bg-cinelog-bg/75 text-cinelog-text hover:text-cinelog-accent hover:bg-cinelog-surface border-cinelog-border-subtle'
            }`}
            title={inWatchlist ? 'Saved in Watchlist' : 'Add to Watchlist'}
          >
            {inWatchlist ? (
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            ) : (
              <Bookmark className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Bottom Floating Rating inside poster */}
        <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-cinelog-bg/85 backdrop-blur-md border border-cinelog-border-subtle text-xs font-bold text-cinelog-accent">
          <Star className="w-3 h-3 fill-cinelog-accent text-cinelog-accent" />
          <span>{formatRating(movie.rating)}</span>
        </div>

        {/* Language Pill */}
        {movie.language && (
          <div className="absolute bottom-2.5 right-2.5 z-10 px-2 py-0.5 rounded-lg bg-cinelog-bg/85 backdrop-blur-md border border-cinelog-border-subtle text-[10px] font-medium text-cinelog-muted">
            {movie.language}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between bg-cinelog-card">
        <div>
          {/* Release Year & Primary Genre */}
          <div className="flex items-center gap-2 text-xs text-cinelog-muted mb-1 font-medium">
            <span>{movie.releaseYear}</span>
            <span>•</span>
            <span className="truncate">{movie.genres?.[0] || 'Feature'}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-sm sm:text-base text-cinelog-text group-hover:text-amber-200 transition-colors line-clamp-1">
            {movie.title}
          </h3>
        </div>

        {/* Mood Tags */}
        {movie.moods && movie.moods.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2.5 pt-2 border-t border-cinelog-border-subtle">
            {movie.moods.slice(0, 2).map((m) => (
              <span
                key={m}
                className="px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider bg-cinelog-surface text-cinelog-muted border border-cinelog-border-subtle"
              >
                #{m}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
