import React from 'react';

/**
 * P5SectionDivider — Iconic Persona 5 Animated Section Transition Bar
 * Features:
 * - Animated sliding hazard caution tape
 * - Continuous dual-direction kinetic marquee ribbons
 * - Skewed high-contrast comic badges with blinking metaverse indicator
 * - Persona 5 geometric star and shard accents
 */
export default function P5SectionDivider({
  command = '',
  title = 'METAVERSE SECTOR TRANSITION',
  badgeText = 'SYSTEM // INFILTRATION',
  theme = 'red', // 'red' | 'yellow' | 'cyan'
  className = '',
}) {
  const isYellow = theme === 'yellow';
  const isCyan = theme === 'cyan';

  // Primary marquee repeating text
  const primaryMarquee = (
    <div className="flex items-center gap-6 whitespace-nowrap uppercase font-bebas tracking-widest text-sm sm:text-base select-none py-1">
      {Array.from({ length: 4 }).map((_, i) => (
        <React.Fragment key={i}>
          <span className="flex items-center gap-2">
            <span className="text-[#FFE600] text-xs">★</span>
            <span className="text-white font-bold tracking-widest">PHANTOM THIEVES OF HEARTS</span>
          </span>
          <span className="text-black/60 font-mono text-xs">///</span>
          <span className="text-black bg-white px-1.5 py-0.5 font-bold tracking-wider text-xs skew-x-[-8deg]">
            TAKE YOUR HEART
          </span>
          <span className="text-black/60 font-mono text-xs">///</span>
          <span className="text-white font-bold tracking-widest">METAVERSE PROTOCOL: ACTIVE</span>
          <span className="text-black/60 font-mono text-xs">///</span>
          <span className="text-[#FFE600] font-bold tracking-widest">ALL-OUT ATTACK READY</span>
          <span className="text-black/60 font-mono text-xs">///</span>
          <span className="text-white/90">INFILTRATE THE PALACE</span>
          <span className="text-[#FFE600] text-xs">★</span>
        </React.Fragment>
      ))}
    </div>
  );

  // Counter-flow secondary marquee repeating text
  const secondaryMarquee = (
    <div className="flex items-center gap-6 whitespace-nowrap uppercase font-mono tracking-wider text-[10px] sm:text-xs select-none py-0.5">
      {Array.from({ length: 4 }).map((_, i) => (
        <React.Fragment key={i}>
          <span className="text-[#00F0FF] font-bold">
            [ ALERT: COGNITIVE LEVEL HIGH ]
          </span>
          <span className="text-zinc-600">●</span>
          <span className="text-zinc-300">
            SECURITY THREAT: <span className="text-[#FFE600]">RANK S</span>
          </span>
          <span className="text-zinc-600">●</span>
          <span className="text-zinc-400">
            TRANSMISSION FREQUENCY: 404.5 MHz
          </span>
          <span className="text-zinc-600">●</span>
          <span className="text-[#E60012] font-bold">
            STEAL THE TREASURE // MISSION ENGAGED
          </span>
          <span className="text-zinc-600">●</span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className={`relative w-full py-6 sm:py-8 overflow-hidden pointer-events-none select-none z-20 ${className}`}>
      
      {/* Background Dark Cutout with Halftone Dot Overlay */}
      <div className="absolute inset-0 bg-[#0A0A0C]/90 backdrop-blur-xs flex items-center justify-center">
        <div className="w-full h-full p5-halftone opacity-30" />
      </div>

      {/* Top Animated Hazard Caution Tape Bar */}
      <div 
        className="relative w-[110%] -left-[5%] h-2.5 sm:h-3 border-y border-black shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
        style={{
          background: 'repeating-linear-gradient(45deg, #0A0A0C, #0A0A0C 12px, #E60012 12px, #E60012 24px)',
          backgroundSize: '34px 34px',
          animation: 'p5-hazard-scroll 1.2s linear infinite',
        }}
      />

      {/* Center Dynamic Slanted Track */}
      <div className="relative my-1.5 sm:my-2">

        {/* Primary Slanted Ribbon (Red with White/Yellow Text) */}
        <div 
          className="relative w-[110%] -left-[5%] bg-[#E60012] border-y-2 border-black shadow-[4px_4px_0px_#000] overflow-hidden"
          style={{
            transform: 'rotate(-1.2deg)',
            transformOrigin: 'center center',
          }}
        >
          {/* Moving Left Marquee */}
          <div className="flex animate-marquee-p5-left whitespace-nowrap">
            {primaryMarquee}
            {primaryMarquee}
          </div>
        </div>

        {/* Secondary Slanted Ribbon (Black with Cyan/Yellow Text Counter-Flow) */}
        <div 
          className="relative w-[110%] -left-[5%] bg-[#121218] border-b-2 border-black shadow-[4px_4px_0px_#000] overflow-hidden -mt-1"
          style={{
            transform: 'rotate(0.8deg)',
            transformOrigin: 'center center',
          }}
        >
          {/* Moving Right Marquee (Counter-Flow) */}
          <div className="flex animate-marquee-p5-right whitespace-nowrap">
            {secondaryMarquee}
            {secondaryMarquee}
          </div>
        </div>

        {/* Floating Center Metaverse Badge */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto">
          <div className="flex items-center gap-1 sm:gap-2 skew-x-[-12deg] shadow-[6px_6px_0px_#000] drop-shadow-xl">
            
            {/* Command Tag */}
            {command && (
              <div className="bg-black text-[#FFE600] font-mono text-[10px] sm:text-xs px-2 sm:px-3 py-1 border-2 border-white font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600] animate-ping" />
                <span className="skew-x-[12deg]">{command}</span>
              </div>
            )}

            {/* Central Badge Banner */}
            <div className="bg-white text-black font-bebas text-xs sm:text-sm lg:text-base px-3 sm:px-4 py-1 border-2 border-black font-bold flex items-center gap-2">
              <span className="text-[#E60012] text-xs">★</span>
              <span className="skew-x-[12deg] tracking-widest flex items-center gap-1.5">
                <span>{title}</span>
              </span>
              <span className="text-[#00F0FF] text-xs">★</span>
            </div>

            {/* Status Indicator Wedge */}
            <div className="bg-[#E60012] text-white font-mono text-[9px] sm:text-[11px] px-2 py-1 border-2 border-black font-bold hidden md:flex items-center gap-1">
              <span className="skew-x-[12deg] tracking-wider">{badgeText}</span>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Animated Hazard Caution Tape Bar (Reverse Direction) */}
      <div 
        className="relative w-[110%] -left-[5%] h-2 sm:h-2.5 border-y border-black shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
        style={{
          background: 'repeating-linear-gradient(-45deg, #0A0A0C, #0A0A0C 10px, #FFE600 10px, #FFE600 20px)',
          backgroundSize: '28px 28px',
          animation: 'p5-hazard-scroll-reverse 1.4s linear infinite',
        }}
      />

      {/* Embedded CSS Animations for Section Divider */}
      <style>{`
        @keyframes p5-hazard-scroll {
          0% { background-position: 0 0; }
          100% { background-position: 34px 0; }
        }

        @keyframes p5-hazard-scroll-reverse {
          0% { background-position: 0 0; }
          100% { background-position: -28px 0; }
        }

        @keyframes p5-marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        @keyframes p5-marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }

        .animate-marquee-p5-left {
          animation: p5-marquee-left 22s linear infinite;
        }

        .animate-marquee-p5-right {
          animation: p5-marquee-right 26s linear infinite;
        }

        .animate-marquee-p5-left:hover,
        .animate-marquee-p5-right:hover {
          animation-play-state: paused;
        }
      `}</style>

    </div>
  );
}
