import React from 'react';
import { Play, Plus, Check, Star, Info, Sparkles, Clock, Calendar } from 'lucide-react';
import { formatRating } from '../utils/helpers';

export default function HeroSection({
  movie,
  onSelectMovie,
  inWatchlist,
  onToggleWatchlist,
  onOpenTrailer
}) {
  if (!movie) return null;

  return (
    <section className="relative w-full overflow-hidden border-b border-cinelog-border-subtle bg-cinelog-bg">
      {/* Background Image Container with layered gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src={movie.backdropUrl || '/images/hero-cinematic.jpg'}
          alt={movie.title}
          className="w-full h-full object-cover object-center filter brightness-[0.7] scale-105 transform animate-fade-in"
        />
        {/* Cinematic dark gradients for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinelog-bg via-cinelog-bg/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-cinelog-bg via-cinelog-bg/80 to-transparent max-w-4xl" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-cinelog-bg/30 to-cinelog-bg" />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 flex flex-col justify-end min-h-[520px] sm:min-h-[600px]">
        
        {/* Curated Spotlight badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cinelog-accent/15 border border-cinelog-accent/30 text-cinelog-accent text-xs font-semibold tracking-wider uppercase mb-4 backdrop-blur-md w-fit shadow-glow">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Curated Spotlight • Discover Your Next Obsession</span>
        </div>

        {/* Title & Tagline */}
        <h1 className="font-cinematic text-4xl sm:text-5xl lg:text-6xl font-extrabold text-cinelog-text tracking-tight max-w-3xl leading-[1.1] drop-shadow-md">
          {movie.title}
        </h1>
        {movie.tagline && (
          <p className="text-cinelog-accent/90 italic font-medium text-base sm:text-lg mt-2 max-w-2xl font-serif">
            “{movie.tagline}”
          </p>
        )}

        {/* Metadata badges (year, runtime, rating, type) */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 my-4 text-xs sm:text-sm font-medium text-cinelog-text">
          {/* Community Rating */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cinelog-card/90 border border-cinelog-border backdrop-blur-sm">
            <Star className="w-4 h-4 fill-cinelog-accent text-cinelog-accent" />
            <span className="font-bold text-cinelog-accent">{formatRating(movie.rating)}</span>
            <span className="text-cinelog-muted text-[11px]">/ 10</span>
          </div>

          <div className="flex items-center gap-1.5 text-cinelog-muted">
            <Calendar className="w-3.5 h-3.5 text-cinelog-accent" />
            <span>{movie.releaseYear}</span>
          </div>

          <div className="flex items-center gap-1.5 text-cinelog-muted">
            <Clock className="w-3.5 h-3.5 text-cinelog-accent" />
            <span>{movie.runtime}</span>
          </div>

          <span className="px-2 py-0.5 rounded bg-cinelog-surface text-cinelog-muted text-xs uppercase font-semibold">
            {movie.type === 'tv' ? 'TV Series' : 'Feature Film'}
          </span>

          <span className="px-2 py-0.5 rounded bg-cinelog-surface text-cinelog-muted text-xs font-medium">
            {movie.language}
          </span>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-2 mb-4">
          {movie.genres?.map((g) => (
            <span
              key={g}
              className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-cinelog-surface/80 border border-cinelog-border-subtle text-cinelog-text"
            >
              {g}
            </span>
          ))}
        </div>

        {/* Synopsis snippet */}
        <p className="text-cinelog-text/85 text-sm sm:text-base max-w-2xl line-clamp-3 leading-relaxed mb-8 drop-shadow">
          {movie.synopsis}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <button
            onClick={() => onSelectMovie(movie)}
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm bg-cinelog-accent text-cinelog-bg hover:bg-cinelog-accent-hover shadow-glow transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Info className="w-4 h-4" />
            <span>View Full Details</span>
          </button>

          <button
            onClick={() => onToggleWatchlist(movie.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 border ${
              inWatchlist
                ? 'bg-cinelog-surface text-cinelog-accent border-cinelog-accent shadow-sm'
                : 'bg-cinelog-card/80 text-cinelog-text hover:bg-cinelog-surface border-cinelog-border-subtle hover:border-cinelog-accent/40 backdrop-blur-md'
            }`}
          >
            {inWatchlist ? (
              <>
                <Check className="w-4 h-4 text-cinelog-accent" />
                <span>In Watchlist</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add to Watchlist</span>
              </>
            )}
          </button>

          <button
            onClick={() => onOpenTrailer(movie)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm text-cinelog-muted hover:text-cinelog-text bg-cinelog-card/60 hover:bg-cinelog-surface/80 border border-cinelog-border-subtle transition-all duration-200 backdrop-blur-md"
            title="Preview Teaser"
          >
            <Play className="w-4 h-4 text-cinelog-accent fill-cinelog-accent/30" />
            <span>Teaser Preview</span>
          </button>
        </div>

      </div>
    </section>
  );
}
