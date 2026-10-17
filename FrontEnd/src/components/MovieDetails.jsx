import React, { useEffect, useState } from 'react';
import { 
  X, Star, Calendar, Clock, Globe, User, Users, Bookmark, Check, 
  Share2, Play, Sparkles, Film, ArrowLeft 
} from 'lucide-react';
import { getPosterUrl, formatRating, PLACEHOLDER_POSTER } from '../utils/helpers';
import { MOODS } from '../data/movies';

export default function MovieDetails({
  movie,
  onClose,
  inWatchlist = false,
  onToggleWatchlist,
  onOpenTrailer
}) {
  const [imgError, setImgError] = useState(false);
  const [copied, setCopied] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!movie) return null;

  const posterSrc = imgError ? PLACEHOLDER_POSTER : getPosterUrl(movie.posterUrl);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-cinelog-bg/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="movie-modal-title"
    >
      {/* Backdrop click to dismiss */}
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      {/* Modal Dialog Card */}
      <div 
        className="relative z-10 w-full max-w-4xl rounded-3xl bg-cinelog-card border border-cinelog-border shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Backdrop Header Banner */}
        <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-cinelog-surface flex-shrink-0">
          <img
            src={movie.backdropUrl || '/images/hero-cinematic.jpg'}
            alt=""
            className="w-full h-full object-cover object-center filter brightness-[0.6]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cinelog-card via-cinelog-card/60 to-transparent" />
          
          {/* Top action buttons (Close & Share) */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-cinelog-bg/75 hover:bg-cinelog-surface text-cinelog-text hover:text-cinelog-accent border border-cinelog-border-subtle backdrop-blur-md transition-all"
              title="Share Title"
              aria-label="Share Title"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-cinelog-bg/75 hover:bg-cinelog-surface text-cinelog-text hover:text-cinelog-accent border border-cinelog-border-subtle backdrop-blur-md transition-all"
              title="Close modal (Esc)"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body (Scrollable) */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 -mt-20 sm:-mt-24 relative z-10">
            
            {/* Poster Thumbnail */}
            <div className="w-36 sm:w-48 aspect-[2/3] flex-shrink-0 rounded-2xl overflow-hidden border-2 border-cinelog-border shadow-2xl bg-cinelog-surface mx-auto sm:mx-0">
              <img
                src={posterSrc}
                alt={movie.title}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Header Info */}
            <div className="flex-1 flex flex-col justify-end text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cinelog-surface text-cinelog-accent text-xs font-semibold uppercase tracking-wider mb-2 w-fit mx-auto sm:mx-0 border border-cinelog-border-subtle">
                <span>{movie.type === 'tv' ? 'TV Series' : 'Feature Film'}</span>
              </div>

              <h2 id="movie-modal-title" className="font-cinematic text-2xl sm:text-4xl font-bold text-cinelog-text leading-tight">
                {movie.title}
              </h2>

              {movie.tagline && (
                <p className="text-cinelog-accent/90 italic text-sm sm:text-base font-serif mt-1">
                  “{movie.tagline}”
                </p>
              )}

              {/* Quick Metadata Bar */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 mt-3 text-xs sm:text-sm text-cinelog-muted">
                {/* Rating */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cinelog-surface border border-cinelog-border-subtle text-cinelog-accent font-bold">
                  <Star className="w-3.5 h-3.5 fill-cinelog-accent text-cinelog-accent" />
                  <span>{formatRating(movie.rating)} / 10</span>
                </div>

                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cinelog-accent" />
                  <span>{movie.releaseYear}</span>
                </div>

                {movie.runtime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cinelog-accent" />
                    <span>{movie.runtime}</span>
                  </div>
                )}

                <div className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-cinelog-accent" />
                  <span>{movie.language}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-5">
                <button
                  onClick={() => onToggleWatchlist(movie.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                    inWatchlist
                      ? 'bg-cinelog-accent text-cinelog-bg border-cinelog-accent shadow-glow'
                      : 'bg-cinelog-surface hover:bg-cinelog-surface-hover text-cinelog-text border-cinelog-border hover:border-cinelog-accent'
                  }`}
                >
                  {inWatchlist ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Saved in Watchlist</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4" />
                      <span>Add to Watchlist</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onOpenTrailer(movie)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-cinelog-text hover:text-cinelog-accent bg-cinelog-surface hover:bg-cinelog-surface-hover border border-cinelog-border-subtle transition-all"
                >
                  <Play className="w-4 h-4 text-cinelog-accent fill-cinelog-accent/30" />
                  <span>Play Teaser</span>
                </button>
              </div>

            </div>
          </div>

          {/* Synopsis */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cinelog-muted">
              Synopsis
            </h3>
            <p className="text-cinelog-text/90 text-sm sm:text-base leading-relaxed">
              {movie.synopsis}
            </p>
          </div>

          {/* Genres & Moods */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-cinelog-border-subtle">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-cinelog-muted mb-2">
                Genres
              </h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres?.map((g) => (
                  <span
                    key={g}
                    className="px-3 py-1 rounded-xl text-xs font-medium bg-cinelog-surface border border-cinelog-border-subtle text-cinelog-text"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-cinelog-muted mb-2">
                Mood Vibe
              </h3>
              <div className="flex flex-wrap gap-2">
                {movie.moods?.map((m) => {
                  const moodObj = MOODS.find(x => x.id === m);
                  return (
                    <span
                      key={m}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-cinelog-accent/15 text-cinelog-accent border border-cinelog-accent/30"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{moodObj?.label || m}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Cast & Crew Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-cinelog-border-subtle text-sm">
            {movie.director && (
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-cinelog-surface text-cinelog-accent">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-medium text-cinelog-muted uppercase">Director / Creator</span>
                  <span className="font-semibold text-cinelog-text">{movie.director}</span>
                </div>
              </div>
            )}

            {movie.cast && movie.cast.length > 0 && (
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-cinelog-surface text-cinelog-accent">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-medium text-cinelog-muted uppercase">Starring</span>
                  <span className="font-semibold text-cinelog-text">{movie.cast.join(', ')}</span>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
