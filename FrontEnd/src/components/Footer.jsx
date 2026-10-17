import React from 'react';
import { Sparkles, Heart, Film, ArrowUp } from 'lucide-react';

export default function Footer({ onScrollToTop }) {
  return (
    <footer className="w-full border-t border-cinelog-border-subtle bg-cinelog-card/60 backdrop-blur-md mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-cinelog-border-subtle">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full p-0.5 bg-gradient-to-tr from-cinelog-accent to-amber-700 shadow-glow">
                <img 
                  src="/images/cinelog-logo.svg" 
                  alt="CineLog" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-cinematic text-2xl font-bold tracking-wider text-cinelog-text">
                Cine<span className="text-cinelog-accent">Log</span>
              </span>
            </div>

            <p className="text-cinelog-muted text-sm max-w-sm leading-relaxed">
              “Discover your next obsession.” An elegant cinematic platform crafted for film lovers to explore stories by mood, genre, and vision.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cinelog-surface text-[11px] text-cinelog-muted border border-cinelog-border-subtle">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LocalStorage Watchlist Persistent • Zero Ads</span>
            </div>
          </div>

          {/* Technology & Design Stack */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-cinelog-accent mb-3">
              Platform Architecture
            </h4>
            <ul className="space-y-2 text-xs text-cinelog-muted">
              <li>React 18 + Vite</li>
              <li>Tailwind CSS Dark Theme</li>
              <li>Lucide Iconography</li>
              <li>TMDB Ready Image Schema</li>
              <li>Full Keyboard Navigation</li>
            </ul>
          </div>

          {/* Palette Tokens */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-cinelog-accent mb-3">
              Cinematic Palette
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-cinelog-muted">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-[#080B0F] border border-white/20" />
                <span>#080B0F Bg</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-[#151A22] border border-white/20" />
                <span>#151A22 Card</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-[#222833] border border-white/20" />
                <span>#222833 Surface</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-[#D6A65D]" />
                <span>#D6A65D Gold</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cinelog-muted">
          <p>© {new Date().getFullYear()} CineLog. Handcrafted with precision for cinema connoisseurs.</p>
          
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cinelog-surface hover:bg-cinelog-surface-hover text-cinelog-text hover:text-cinelog-accent border border-cinelog-border-subtle transition-all"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
