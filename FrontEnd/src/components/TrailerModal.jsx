import React, { useEffect, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles } from 'lucide-react';

export default function TrailerModal({ movie, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Simulate playback timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + 1));
    }, 400);
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!movie) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cinelog-bg/90 backdrop-blur-xl animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        className="relative z-10 w-full max-w-4xl rounded-3xl bg-black border border-cinelog-border shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-cinelog-card/90 border-b border-cinelog-border-subtle">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cinelog-accent animate-pulse" />
            <span className="text-xs uppercase font-bold tracking-wider text-cinelog-accent">
              CineLog Cinema Teaser Room
            </span>
            <span className="text-cinelog-muted text-xs">• {movie.title}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-cinelog-muted hover:text-cinelog-text hover:bg-cinelog-surface transition-colors"
            aria-label="Close Teaser"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Simulation */}
        <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center group">
          <img
            src={movie.backdropUrl || '/images/hero-cinematic.jpg'}
            alt=""
            className={`w-full h-full object-cover filter brightness-[0.7] transition-all duration-700 ${
              isPlaying ? 'scale-105' : 'scale-100 grayscale-[20%]'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

          {/* Cinematic Letterbox effect */}
          <div className="absolute top-0 inset-x-0 h-6 bg-black pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-6 bg-black pointer-events-none" />

          {/* Central Play/Pause Watermark when paused */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
              <div className="w-20 h-20 rounded-full bg-cinelog-accent/90 flex items-center justify-center shadow-glow text-cinelog-bg">
                <Play className="w-8 h-8 ml-1" />
              </div>
            </div>
          )}

          {/* Overlay Tagline */}
          <div className="absolute bottom-16 inset-x-6 text-center pointer-events-none">
            <h3 className="font-cinematic text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
              {movie.title}
            </h3>
            {movie.tagline && (
              <p className="text-amber-200/90 text-sm font-serif italic mt-1 drop-shadow">
                "{movie.tagline}"
              </p>
            )}
          </div>

          {/* Video Player Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col gap-2">
            {/* Progress line */}
            <div 
              className="w-full h-1.5 bg-cinelog-surface rounded-full cursor-pointer relative overflow-hidden"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                setProgress((clickX / rect.width) * 100);
              }}
            >
              <div 
                className="h-full bg-cinelog-accent rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-cinelog-muted">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-cinelog-text hover:text-cinelog-accent transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-cinelog-text hover:text-cinelog-accent transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span>0:{Math.floor(progress * 1.5).toString().padStart(2, '0')} / 2:30</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-1.5 py-0.5 rounded bg-cinelog-surface text-[10px] font-bold text-cinelog-accent border border-cinelog-border-subtle">
                  4K ULTRA HD
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
