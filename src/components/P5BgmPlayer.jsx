import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music, Disc3, ChevronDown } from 'lucide-react';
import { bgmManager, P5_TRACKS } from '../utils/bgmManager';
import { playP5Click, playP5Hover } from '../utils/soundEffects';

export default function P5BgmPlayer({ compact = false }) {
  const [bgmState, setBgmState] = useState(bgmManager.getState());
  const [showDropdown, setShowDropdown] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const unsubscribe = bgmManager.subscribe((state) => {
      setBgmState({ ...state });
    });

    // Close popups on click outside
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
        setShowVolumeSlider(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      unsubscribe();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTogglePlay = (e) => {
    e.stopPropagation();
    playP5Click();
    bgmManager.togglePlay();
  };

  const handleNext = (e) => {
    e.stopPropagation();
    playP5Click();
    bgmManager.nextTrack();
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    playP5Click();
    bgmManager.prevTrack();
  };

  const handleSelectTrack = (index) => {
    playP5Click();
    bgmManager.setTrack(index);
    setShowDropdown(false);
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    bgmManager.setVolume(newVol);
  };

  const isPlaying = bgmState.isPlaying && !bgmState.isMuted;

  return (
    <div ref={containerRef} className="relative inline-flex items-center">
      
      {/* Main Persona 5 Music HUD Pill */}
      <div 
        className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 bg-[#121218] border transition-all skew-x-[-6deg] shadow-[2px_2px_0px_#000] ${
          isPlaying 
            ? 'border-[#FFE600] text-white shadow-[0_0_12px_rgba(255,230,0,0.25)]' 
            : 'border-zinc-700 text-zinc-400'
        }`}
      >
        <div className="skew-x-[6deg] flex items-center gap-1.5 sm:gap-2">
          
          {/* Animated Music Equalizer Bars */}
          <button
            onClick={handleTogglePlay}
            onMouseEnter={playP5Hover}
            title={isPlaying ? 'Pause BGM' : 'Play BGM (Persona 5 OST)'}
            className="flex items-center gap-1 text-[#FFE600] hover:text-white transition-colors cursor-pointer"
          >
            {isPlaying ? (
              <div className="flex items-end gap-[2px] h-3.5 w-3.5 pb-0.5">
                <span className="w-[2.5px] bg-[#FFE600] rounded-xs animate-p5-bar-1" />
                <span className="w-[2.5px] bg-[#E60012] rounded-xs animate-p5-bar-2" />
                <span className="w-[2.5px] bg-white rounded-xs animate-p5-bar-3" />
              </div>
            ) : (
              <Music size={14} className="text-zinc-500" />
            )}
          </button>

          {/* Track Info Display / Dropdown Trigger */}
          <button
            onClick={() => {
              playP5Click();
              setShowDropdown(!showDropdown);
              setShowVolumeSlider(false);
            }}
            onMouseEnter={playP5Hover}
            className="flex items-center gap-1 text-left max-w-[110px] sm:max-w-[160px] cursor-pointer group"
          >
            <span className="text-[11px] font-mono uppercase tracking-wider truncate font-bold text-zinc-200 group-hover:text-[#FFE600] transition-colors">
              {bgmState.currentTrack.title}
            </span>
            <ChevronDown size={12} className="text-zinc-500 group-hover:text-[#FFE600] flex-shrink-0" />
          </button>

          {/* Quick Play/Pause Button */}
          <button
            onClick={handleTogglePlay}
            onMouseEnter={playP5Hover}
            title={isPlaying ? 'Pause' : 'Play'}
            className="p-1 text-zinc-300 hover:text-[#FFE600] hover:scale-110 transition-all"
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} className="fill-current" />}
          </button>

          {/* Quick Next Track Button */}
          <button
            onClick={handleNext}
            onMouseEnter={playP5Hover}
            title="Lagu Berikutnya"
            className="p-1 text-zinc-400 hover:text-[#FFE600] hover:scale-110 transition-all hidden sm:block"
          >
            <SkipForward size={13} />
          </button>

          {/* Volume Control Toggle Button */}
          <button
            onClick={() => {
              playP5Click();
              setShowVolumeSlider(!showVolumeSlider);
              setShowDropdown(false);
            }}
            onMouseEnter={playP5Hover}
            title={`Volume: ${Math.round(bgmState.volume * 100)}%`}
            className="p-1 text-zinc-400 hover:text-[#FFE600] transition-colors"
          >
            {bgmState.isMuted || bgmState.volume === 0 ? (
              <VolumeX size={13} className="text-red-500" />
            ) : (
              <Volume2 size={13} />
            )}
          </button>

        </div>
      </div>

      {/* Playlist Track Selection Popup Dropdown */}
      {showDropdown && (
        <div 
          className="absolute right-0 top-full mt-2 w-64 bg-[#0D0D14] border-2 border-[#FFE600] shadow-[8px_8px_0px_#000] p-2 z-50 skew-x-[-4deg]"
          style={{ animation: 'p5MenuCutIn 0.25s ease-out forwards' }}
        >
          <div className="skew-x-[4deg]">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 mb-2">
              <span className="font-bebas text-xs text-[#FFE600] tracking-widest flex items-center gap-1.5">
                <Disc3 size={13} className={isPlaying ? 'animate-spin' : ''} />
                <span>SOUNDTRACK PLAYLIST</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                P5 OST
              </span>
            </div>

            {/* Track List */}
            <div className="space-y-1">
              {P5_TRACKS.map((track, idx) => {
                const isCurrent = bgmState.currentTrackIndex === idx;
                return (
                  <button
                    key={track.id}
                    onClick={() => handleSelectTrack(idx)}
                    onMouseEnter={playP5Hover}
                    className={`w-full text-left p-2 flex items-center justify-between transition-colors text-xs skew-x-[-4deg] ${
                      isCurrent
                        ? 'bg-[#E60012] text-white font-bold shadow-[2px_2px_0px_#000]'
                        : 'bg-[#181820] text-zinc-300 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <div className="skew-x-[4deg] flex items-center gap-2 truncate">
                      <span className="font-mono text-[10px] opacity-75">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <div className="truncate">
                        <div className="truncate font-sans font-semibold">{track.title}</div>
                        <div className="text-[9px] opacity-75 truncate">{track.subtitle}</div>
                      </div>
                    </div>
                    {isCurrent && isPlaying && (
                      <div className="skew-x-[4deg] flex items-end gap-[2px] h-3 flex-shrink-0">
                        <span className="w-[2px] bg-white rounded-xs animate-p5-bar-1" />
                        <span className="w-[2px] bg-[#FFE600] rounded-xs animate-p5-bar-2" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Hint Notice */}
            <div className="mt-2 pt-1.5 border-t border-zinc-800/80 text-[10px] font-mono text-zinc-400 text-center">
              Volume awal diatur lembut (15%) agar nyaman di telinga
            </div>

          </div>
        </div>
      )}

      {/* Volume Slider Popup */}
      {showVolumeSlider && (
        <div 
          className="absolute right-0 top-full mt-2 w-48 bg-[#0D0D14] border-2 border-[#E60012] shadow-[6px_6px_0px_#000] p-3 z-50 skew-x-[-4deg]"
          style={{ animation: 'p5MenuCutIn 0.2s ease-out forwards' }}
        >
          <div className="skew-x-[4deg]">
            <div className="flex items-center justify-between text-xs font-mono mb-2 text-zinc-300 font-bold">
              <span>BGM VOLUME</span>
              <span className="text-[#FFE600]">{Math.round(bgmState.volume * 100)}%</span>
            </div>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={bgmState.isMuted ? 0 : bgmState.volume}
              onChange={handleVolumeChange}
              className="w-full accent-[#E60012] cursor-pointer bg-zinc-800"
            />

            {/* Quick volume presets */}
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800 text-[10px] font-mono">
              <button
                onClick={() => bgmManager.setVolume(0.15)}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-[#E60012] text-zinc-300 hover:text-white rounded-xs"
              >
                15% (Def)
              </button>
              <button
                onClick={() => bgmManager.setVolume(0.35)}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-[#E60012] text-zinc-300 hover:text-white rounded-xs"
              >
                35%
              </button>
              <button
                onClick={() => bgmManager.setVolume(0.60)}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-[#E60012] text-zinc-300 hover:text-white rounded-xs"
              >
                60%
              </button>
              <button
                onClick={() => bgmManager.toggleMute()}
                className={`px-1.5 py-0.5 rounded-xs ${
                  bgmState.isMuted ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {bgmState.isMuted ? 'UNMUTE' : 'MUTE'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Equalizer CSS Keyframes */}
      <style>{`
        @keyframes p5Bar1 {
          0%, 100% { height: 3px; }
          50% { height: 12px; }
        }
        @keyframes p5Bar2 {
          0%, 100% { height: 12px; }
          50% { height: 4px; }
        }
        @keyframes p5Bar3 {
          0%, 100% { height: 6px; }
          50% { height: 13px; }
        }
        .animate-p5-bar-1 {
          animation: p5Bar1 0.7s ease-in-out infinite;
        }
        .animate-p5-bar-2 {
          animation: p5Bar2 0.6s ease-in-out infinite 0.15s;
        }
        .animate-p5-bar-3 {
          animation: p5Bar3 0.8s ease-in-out infinite 0.3s;
        }
      `}</style>

    </div>
  );
}
