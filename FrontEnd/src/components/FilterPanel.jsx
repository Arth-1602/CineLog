import React from 'react';
import { Filter, RotateCcw, SlidersHorizontal, Check } from 'lucide-react';
import { GENRES, LANGUAGES, TYPES } from '../data/movies';

export default function FilterPanel({
  type,
  onTypeChange,
  genre,
  onGenreChange,
  language,
  onLanguageChange,
  sortBy,
  onSortChange,
  onResetAll,
  activeFilterCount = 0
}) {
  return (
    <div className="w-full bg-cinelog-card/80 border border-cinelog-border-subtle rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-card">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Type pills: All, Movies, TV */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-cinelog-surface/80 border border-cinelog-border-subtle w-fit">
          {TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => onTypeChange(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinelog-accent ${
                type === t.id
                  ? 'bg-cinelog-accent text-cinelog-bg shadow-sm'
                  : 'text-cinelog-muted hover:text-cinelog-text hover:bg-cinelog-surface'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Dropdowns / Selectors for Genre, Language & Sort */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 flex-1 lg:justify-end">
          
          {/* Genre selector */}
          <div className="relative min-w-[130px] flex-1 sm:flex-initial">
            <label htmlFor="genre-select" className="sr-only">Filter by Genre</label>
            <select
              id="genre-select"
              value={genre}
              onChange={(e) => onGenreChange(e.target.value)}
              className="w-full appearance-none px-3.5 py-2 pr-8 rounded-xl bg-cinelog-surface border border-cinelog-border-subtle text-xs sm:text-sm font-medium text-cinelog-text hover:border-cinelog-accent/40 focus:border-cinelog-accent focus:ring-1 focus:ring-cinelog-accent outline-none cursor-pointer transition-colors"
            >
              {GENRES.map((g) => (
                <option key={g} value={g} className="bg-cinelog-card text-cinelog-text">
                  {g === 'All Genres' ? 'All Genres' : `Genre: ${g}`}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-cinelog-muted text-xs">
              ▾
            </div>
          </div>

          {/* Language selector */}
          <div className="relative min-w-[130px] flex-1 sm:flex-initial">
            <label htmlFor="language-select" className="sr-only">Filter by Language</label>
            <select
              id="language-select"
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="w-full appearance-none px-3.5 py-2 pr-8 rounded-xl bg-cinelog-surface border border-cinelog-border-subtle text-xs sm:text-sm font-medium text-cinelog-text hover:border-cinelog-accent/40 focus:border-cinelog-accent focus:ring-1 focus:ring-cinelog-accent outline-none cursor-pointer transition-colors"
            >
              {LANGUAGES.map((l) => (
                <option key={l} value={l} className="bg-cinelog-card text-cinelog-text">
                  {l === 'All Languages' ? 'All Languages' : `Audio: ${l}`}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-cinelog-muted text-xs">
              ▾
            </div>
          </div>

          {/* Sort selector */}
          <div className="relative min-w-[140px] flex-1 sm:flex-initial">
            <label htmlFor="sort-select" className="sr-only">Sort by</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full appearance-none px-3.5 py-2 pr-8 rounded-xl bg-cinelog-surface border border-cinelog-border-subtle text-xs sm:text-sm font-medium text-cinelog-text hover:border-cinelog-accent/40 focus:border-cinelog-accent focus:ring-1 focus:ring-cinelog-accent outline-none cursor-pointer transition-colors"
            >
              <option value="featured" className="bg-cinelog-card">Sort: Featured</option>
              <option value="rating-desc" className="bg-cinelog-card">Sort: Highest Rated</option>
              <option value="year-desc" className="bg-cinelog-card">Sort: Newest First</option>
              <option value="title-asc" className="bg-cinelog-card">Sort: Title (A-Z)</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-cinelog-muted text-xs">
              ▾
            </div>
          </div>

          {/* Reset Filters button */}
          {activeFilterCount > 0 && (
            <button
              onClick={onResetAll}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-cinelog-accent hover:text-amber-200 bg-cinelog-accent/10 hover:bg-cinelog-accent/20 border border-cinelog-accent/30 transition-all"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset ({activeFilterCount})</span>
            </button>
          )}

        </div>

      </div>
    </div>
  );
}
