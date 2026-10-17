import React from 'react';
import { Sun, Flame, Heart, Sparkles, CloudRain, Smile, Check, X } from 'lucide-react';
import { MOODS } from '../data/movies';

// Icon map for Lucide icons
const iconMap = {
  Sun: Sun,
  Flame: Flame,
  Heart: Heart,
  Sparkles: Sparkles,
  CloudRain: CloudRain,
  Smile: Smile,
};

export default function MoodSelector({ selectedMood, onSelectMood }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-cinematic text-cinelog-text flex items-center gap-2">
            <span>Explore By Mood</span>
            <span className="text-cinelog-accent text-sm font-sans font-normal hidden sm:inline">
              — Match how you feel right now
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-cinelog-muted mt-0.5">
            Select a vibe to filter curated stories without algorithms getting in the way
          </p>
        </div>

        {selectedMood && (
          <button
            onClick={() => onSelectMood(null)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cinelog-accent hover:text-amber-200 bg-cinelog-accent/10 hover:bg-cinelog-accent/20 border border-cinelog-accent/30 rounded-xl transition-all"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Mood</span>
          </button>
        )}
      </div>

      {/* Mood Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {MOODS.map((mood) => {
          const Icon = iconMap[mood.icon] || Sparkles;
          const isSelected = selectedMood === mood.id;

          return (
            <button
              key={mood.id}
              onClick={() => onSelectMood(isSelected ? null : mood.id)}
              className={`group relative text-left p-4 rounded-2xl transition-all duration-300 border flex flex-col justify-between overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinelog-accent ${
                isSelected
                  ? 'bg-cinelog-surface border-cinelog-accent shadow-glow scale-[1.02]'
                  : 'bg-cinelog-card/90 border-cinelog-border-subtle hover:border-cinelog-border hover:bg-cinelog-surface/80 hover:-translate-y-1'
              }`}
              style={{
                borderColor: isSelected ? mood.accentColor : undefined,
              }}
            >
              {/* Subtle accent glow behind the icon */}
              <div 
                className="absolute -right-4 -top-4 w-16 h-16 rounded-full blur-xl opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
                style={{ backgroundColor: mood.accentColor }}
              />

              <div className="flex items-center justify-between w-full mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm"
                  style={{
                    backgroundColor: isSelected ? `${mood.accentColor}25` : '#222833',
                    color: mood.accentColor,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {isSelected ? (
                  <span 
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-cinelog-bg font-bold shadow-sm"
                    style={{ backgroundColor: mood.accentColor }}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                ) : (
                  <span className="text-[10px] uppercase font-bold text-cinelog-subtle tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    Pick
                  </span>
                )}
              </div>

              <div>
                <h3 className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-cinelog-text group-hover:text-amber-200'} transition-colors`}>
                  {mood.label}
                </h3>
                <p className="text-[11px] text-cinelog-muted line-clamp-2 mt-1 leading-snug">
                  {mood.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
