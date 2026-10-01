import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { RUNWAY_CHAPTERS } from '../data/products';

export default function RunwayModal() {
  const { isRunwayOpen, setIsRunwayOpen } = useCart();
  const [activeChapter, setActiveChapter] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  if (!isRunwayOpen) return null;

  const current = RUNWAY_CHAPTERS.find(c => c.id === activeChapter) || RUNWAY_CHAPTERS[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-fade-in text-surface">
      <div className="max-w-5xl w-full border border-secondary/40 bg-primary-container relative overflow-hidden shadow-2xl">
        
        {/* Header Bar */}
        <div className="p-4 md:p-6 bg-primary/90 border-b border-outline/20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            <span className="font-label-caps-sm text-[10px] tracking-[0.3em] uppercase text-secondary-fixed">
              Archival Broadcast • Palazzo Senato, Milano
            </span>
          </div>
          <button
            onClick={() => setIsRunwayOpen(false)}
            className="text-surface/70 hover:text-surface p-1 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Video Canvas Stage */}
        <div className="relative aspect-video w-full bg-black overflow-hidden group">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1tGvkjjGuSQ85WUXbwgCaDUzIC_QnvlXVJ-fW7kX6HiikJRm0R9LJTR3wqIvG0L50CUWU5-uOHxXFMriUTjKQNYaTueJTBTVVt42ZSXvgnf7CP3TrOOMu1SjEL1S18ZPp2EvG-uOMdhJ4HZoZh8ZP93HY5xOpdTDX_rS72_asGMI7sGqaJiD2El6qehr8gtOuZKgtqSY2mGIwOOq0FIiLZDhqacp1BvfXl9eOkBSgWU5kWFHJSpeW"
            alt="Milan Runway Défilé Presentation"
            className={`w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'scale-105 filter brightness-90' : 'filter brightness-60'}`}
          />

          {/* Ambient Video Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Center Play Indicator */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(true)}
                className="w-20 h-20 rounded-full border-2 border-secondary-fixed flex items-center justify-center bg-primary/80 text-secondary-fixed backdrop-blur-md cursor-pointer hover:scale-110 transition-transform"
              >
                <span className="material-symbols-outlined text-4xl">play_arrow</span>
              </button>
            </div>
          )}

          {/* Video Floating Subtitle Overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-3 z-10">
            <div className="space-y-1">
              <span className="font-label-caps-sm text-[9px] uppercase tracking-widest text-secondary-fixed">
                Now Playing: {current.timestamp}
              </span>
              <h4 className="font-headline-md text-xl md:text-2xl text-surface">
                {current.title}
              </h4>
              <p className="font-body-sm text-xs text-surface/80 max-w-lg font-light">
                {current.description}
              </p>
            </div>

            {/* Video Controls Cluster */}
            <div className="flex items-center space-x-4 bg-primary/80 backdrop-blur-sm px-4 py-2 border border-secondary/30">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-surface hover:text-secondary-fixed transition-colors"
                title={isPlaying ? "Pause" : "Play"}
              >
                <span className="material-symbols-outlined text-2xl">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-surface hover:text-secondary-fixed transition-colors"
                title={isMuted ? "Unmute Live Orchestra" : "Mute"}
              >
                <span className="material-symbols-outlined text-2xl">
                  {isMuted ? 'volume_off' : 'volume_up'}
                </span>
              </button>

              <span className="font-label-caps-sm text-[10px] tracking-wider text-surface/70">
                18:42 • 4K HDR
              </span>
            </div>
          </div>
        </div>

        {/* Chapter Navigation Track */}
        <div className="p-4 md:p-6 bg-primary border-t border-outline/20">
          <span className="font-label-caps-sm text-[9px] uppercase tracking-[0.25em] text-secondary-fixed block mb-3">
            Défilé Movement Chapters
          </span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {RUNWAY_CHAPTERS.map((chap) => (
              <button
                key={chap.id}
                onClick={() => {
                  setActiveChapter(chap.id);
                  setIsPlaying(true);
                }}
                className={`p-3 text-left border transition-all cursor-pointer ${
                  activeChapter === chap.id
                    ? 'border-secondary-fixed bg-primary-container text-surface'
                    : 'border-outline/20 bg-primary/40 hover:border-outline/50 text-surface/70'
                }`}
              >
                <div className="flex justify-between text-[9px] font-label-caps-sm tracking-wider uppercase text-secondary-fixed mb-1">
                  <span>Act {chap.id}</span>
                  <span>{chap.timestamp}</span>
                </div>
                <div className="font-headline-sm text-xs font-normal text-surface truncate">
                  {chap.title.split('—')[1] || chap.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
