import React, { useState } from 'react';
import { Film, Bookmark, Sparkles, Tv, Clapperboard, Compass, Menu, X, Search } from 'lucide-react';

export default function Navbar({ activeTab, onTabChange, watchlistCount = 0, onSearchFocus }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'movies', label: 'Movies', icon: Clapperboard },
    { id: 'tv', label: 'TV Shows', icon: Tv },
    { id: 'moods', label: 'Moods', icon: Sparkles },
    { 
      id: 'watchlist', 
      label: 'Watchlist', 
      icon: Bookmark, 
      badge: watchlistCount > 0 ? watchlistCount : null 
    },
  ];

  const handleNavClick = (id) => {
    onTabChange(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cinelog-border-subtle bg-cinelog-bg/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <button 
            onClick={() => handleNavClick('discover')}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cinelog-accent rounded-lg p-1 text-left"
            aria-label="CineLog Home"
          >
            <div className="relative w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-cinelog-accent via-amber-200 to-amber-700 shadow-glow transition-transform duration-300 group-hover:scale-105">
              <img 
                src="/images/cinelog-logo.svg" 
                alt="CineLog Emblem" 
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>
            <div>
              <span className="font-cinematic text-2xl font-bold tracking-wider text-cinelog-text group-hover:text-amber-200 transition-colors">
                Cine<span className="text-cinelog-accent">Log</span>
              </span>
              <span className="hidden sm:block text-[10px] tracking-widest uppercase text-cinelog-muted font-medium">
                Cinema Discovery
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinelog-accent ${
                    isActive
                      ? 'text-cinelog-accent bg-cinelog-card/90 shadow-sm border border-cinelog-border'
                      : 'text-cinelog-muted hover:text-cinelog-text hover:bg-cinelog-surface/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cinelog-accent' : 'text-cinelog-muted'}`} />
                  <span>{item.label}</span>
                  {item.badge !== null && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-xs font-bold bg-cinelog-accent text-cinelog-bg">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Quick Search trigger & Watchlist Quick Jump */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onSearchFocus}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm text-cinelog-muted bg-cinelog-surface/70 hover:bg-cinelog-surface border border-cinelog-border-subtle hover:border-cinelog-accent/40 transition-all focus-visible:ring-2 focus-visible:ring-cinelog-accent"
              title="Quick Search (Press / to focus)"
              aria-label="Search titles"
            >
              <Search className="w-4 h-4 text-cinelog-accent" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-cinelog-card text-cinelog-muted rounded border border-cinelog-border-subtle">
                /
              </kbd>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-cinelog-muted hover:text-cinelog-text hover:bg-cinelog-surface border border-cinelog-border-subtle focus-visible:ring-2 focus-visible:ring-cinelog-accent"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-cinelog-border-subtle bg-cinelog-card/95 backdrop-blur-xl px-4 pt-2 pb-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? 'text-cinelog-accent bg-cinelog-surface border border-cinelog-border'
                    : 'text-cinelog-text hover:bg-cinelog-surface/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-cinelog-accent' : 'text-cinelog-muted'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-cinelog-accent text-cinelog-bg">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
