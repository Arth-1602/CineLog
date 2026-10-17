import React, { useRef, useEffect } from 'react';
import { Search, X, Sparkles } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  onClear,
  inputRef,
  placeholder = "Search movies, series, directors, or actors...",
  totalResults = null,
  activeFilterCount = 0
}) {
  const localRef = useRef(null);
  const ref = inputRef || localRef;

  // Global keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== ref.current) {
        e.preventDefault();
        ref.current?.focus();
      } else if (e.key === 'Escape' && document.activeElement === ref.current) {
        ref.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [ref]);

  const quickPicks = ['Dune', 'Sci-Fi', 'Christopher Nolan', 'Korean', 'Hayao Miyazaki'];

  return (
    <div className="w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-cinelog-accent pointer-events-none transition-colors" />
        
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3.5 sm:py-4 rounded-2xl bg-cinelog-card text-cinelog-text placeholder-cinelog-muted/70 text-sm sm:text-base border border-cinelog-border-subtle focus:border-cinelog-accent focus:ring-2 focus:ring-cinelog-accent/30 shadow-card transition-all duration-200 outline-none"
          aria-label="Search CineLog"
        />

        {value && (
          <button
            onClick={onClear}
            className="absolute right-4 p-1 rounded-lg text-cinelog-muted hover:text-cinelog-text hover:bg-cinelog-surface transition-colors"
            title="Clear search"
            aria-label="Clear search input"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggestion Chips & Meta status */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-3 px-1 text-xs text-cinelog-muted">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="flex items-center gap-1 text-cinelog-subtle">
            <Sparkles className="w-3 h-3 text-cinelog-accent/70" />
            <span>Try searching:</span>
          </span>
          {quickPicks.map((pick) => (
            <button
              key={pick}
              onClick={() => onChange(pick)}
              className="px-2 py-0.5 rounded-md bg-cinelog-surface/60 hover:bg-cinelog-surface text-cinelog-muted hover:text-cinelog-text border border-cinelog-border-subtle hover:border-cinelog-accent/30 transition-colors"
            >
              {pick}
            </button>
          ))}
        </div>

        {value && totalResults !== null && (
          <span className="text-cinelog-accent font-medium">
            Found {totalResults} {totalResults === 1 ? 'title' : 'titles'}
          </span>
        )}
      </div>
    </div>
  );
}
