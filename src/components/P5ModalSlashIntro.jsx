import React, { useEffect, useState } from 'react';
import { playP5Slash } from '../utils/soundEffects';

/**
 * P5ModalSlashIntro — Persona 5 Comic Cut-In & Smooth Split Transition
 * 
 * Tuned with:
 * - Comfortable cinematic timing (800ms)
 * - Soft, glare-free crimson & gold lighting (non-blinding)
 * - Smooth gliding anime comic split plates
 */
export default function P5ModalSlashIntro({ onComplete, projectTitle = 'MISSION DOSSIER' }) {
  const [phase, setPhase] = useState('slash'); // 'slash' -> 'split' -> 'done'

  useEffect(() => {
    playP5Slash();

    // Phase 1: Clean slash beam focus (0 - 240ms)
    const t1 = setTimeout(() => {
      setPhase('split');
    }, 240);

    // Phase 2: Smooth comic plates slice apart (240 - 800ms)
    const t2 = setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-[999999] pointer-events-none overflow-hidden select-none">
      
      {/* 1. Top-Left Comic Wedge Plate (Crimson Red + Halftone) */}
      <div 
        className="absolute inset-0 bg-[#E60012] transition-transform duration-600 ease-out"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)',
          transform: phase === 'split' ? 'translate(-115%, -115%) rotate(-6deg)' : 'translate(0%, 0%) rotate(0deg)',
          transitionTimingFunction: 'cubic-bezier(0.2, 0.9, 0.3, 1)',
        }}
      >
        <div className="w-full h-full p5-halftone opacity-35" />
        
        {/* Top-Left Persona 5 Typography */}
        <div className="absolute top-12 left-8 sm:left-12 skew-x-[-12deg] drop-shadow-[5px_5px_0px_#000]">
          <span className="bg-black text-[#FFE600] font-mono text-xs sm:text-sm px-3 py-1 border-2 border-white font-bold block mb-2">
            ★ ALL-OUT ATTACK // MISSION INFILTRATION
          </span>
          <span className="bg-white text-black font-bebas text-3xl sm:text-5xl px-4 py-1 font-black block tracking-wider">
            INFILTRATE TARGET
          </span>
        </div>
      </div>

      {/* 2. Bottom-Right Comic Wedge Plate (Deep Black + Yellow Border) */}
      <div 
        className="absolute inset-0 bg-[#0A0A0C] border-t-6 border-[#FFE600] transition-transform duration-600 ease-out"
        style={{
          clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%)',
          transform: phase === 'split' ? 'translate(115%, 115%) rotate(6deg)' : 'translate(0%, 0%) rotate(0deg)',
          transitionTimingFunction: 'cubic-bezier(0.2, 0.9, 0.3, 1)',
        }}
      >
        <div className="w-full h-full p5-halftone-red opacity-25" />
        
        {/* Bottom-Right Typography */}
        <div className="absolute bottom-12 right-8 sm:right-12 text-right skew-x-[-12deg] drop-shadow-[5px_5px_0px_#000]">
          <span className="bg-[#E60012] text-white font-bebas text-2xl sm:text-4xl px-4 py-1 font-bold block mb-2 tracking-widest">
            {projectTitle}
          </span>
          <span className="bg-white text-black font-mono text-xs sm:text-sm px-3 py-1 border-2 border-black font-bold inline-block">
            SECURITY CLEARANCE: GRANTED ///
          </span>
        </div>
      </div>

      {/* 3. Center Diagonal Slash Blade Line (Soft Crimson & Gold, Eye-Friendly) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-4 bg-[#E60012] border-y border-[#FFE600]"
        style={{
          transform: 'translate(-50%, -50%) rotate(-45deg)',
          boxShadow: '0 0 25px rgba(230, 0, 18, 0.5), 0 0 45px rgba(255, 230, 0, 0.3)',
          opacity: phase === 'slash' ? 1 : 0,
          transition: 'opacity 0.25s ease-out',
        }}
      />

      {/* 4. Subtle Ambient Red Speed Accents (Soft & Non-Glaring) */}
      {phase === 'slash' && (
        <div className="absolute inset-0 flex items-center justify-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-[130vh] bg-[#FFE600] opacity-35"
              style={{
                transform: `rotate(${i * 30 - 45}deg)`,
                animation: 'p5-speed-soft 0.24s ease-out forwards',
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes p5-speed-soft {
          0% { transform: scaleY(0.2) rotate(var(--rot, 0deg)); opacity: 0.4; }
          100% { transform: scaleY(1.2) rotate(var(--rot, 0deg)); opacity: 0; }
        }
      `}</style>

    </div>
  );
}
