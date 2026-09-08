import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playP5PaperTear } from '../utils/soundEffects';
import { bgmManager } from '../utils/bgmManager';
import { Star, MousePointerClick } from 'lucide-react';

export default function P5TornPaperIntro({ onComplete }) {
  // Stages: 'sealed' -> 'slashing' -> 'tearing' -> 'done'
  const [stage, setStage] = useState('sealed');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Ensure viewport starts at top
    window.scrollTo({ top: 0, behavior: 'instant' });

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        triggerSlashAndTear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerSlashAndTear = () => {
    if (stage !== 'sealed') return;

    window.scrollTo({ top: 0, behavior: 'instant' });
    setStage('slashing');
    playP5PaperTear();
    bgmManager.startOnUserGesture();

    // Peeling begins after lightning cut
    setTimeout(() => {
      setStage('tearing');
    }, 380);

    // Unmount once both halves have peeled away
    setTimeout(() => {
      setStage('done');
      setVisible(false);
      if (onComplete) onComplete();
    }, 1450);
  };

  if (!visible) return null;

  // Perfectly Centered Jagged Lightning Seam Path
  const lightningPathD = "M 72 0 L 64 15 L 70 25 L 54 38 L 60 45 L 45 52 L 55 60 L 38 70 L 44 78 L 26 88 L 32 94 L 18 100";

  const isTorn = stage === 'tearing' || stage === 'done';

  return (
    <div
      onClick={triggerSlashAndTear}
      className={`fixed inset-0 z-[999999] overflow-hidden select-none transition-opacity duration-300 ${
        isTorn
          ? 'pointer-events-none opacity-100'
          : 'cursor-pointer bg-black/90 opacity-100'
      }`}
      title="Klik di mana saja untuk membuka beranda web"
    >
      {/* SVG Filters for High-Voltage Lightning Glow */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="p5-lightning-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* ============================================================
          LEFT TORN PAPER HALF (DEEP VELVET BLACK - OPENS TO THE LEFT)
          ============================================================ */}
      <motion.div
        initial={{ x: 0, rotate: 0, opacity: 1 }}
        animate={
          isTorn
            ? { x: '-125%', rotate: -3.5, opacity: 0 }
            : { x: 0, rotate: 0, opacity: 1 }
        }
        transition={{
          duration: 1.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute inset-0"
      >
        {/* Black Polygon Layer */}
        <div
          className="absolute inset-0 bg-[#0A0A0C]"
          style={{
            clipPath: `polygon(
              0% 0%, 
              72% 0%, 
              64% 15%, 
              70% 25%, 
              54% 38%, 
              60% 45%, 
              45% 52%, 
              55% 60%, 
              38% 70%, 
              44% 78%, 
              26% 88%, 
              32% 94%, 
              18% 100%, 
              0% 100%
            )`,
            boxShadow: '15px 15px 40px rgba(0,0,0,0.95)'
          }}
        >
          <div className="absolute inset-0 p5-halftone opacity-35"></div>
          <div className="absolute top-14 left-0 right-0 h-7 p5-caution-strip rotate-[-3deg] opacity-75 shadow-lg"></div>

          <div className="absolute top-10 left-8 sm:top-16 sm:left-14 z-10">
            <div className="inline-flex items-center gap-2 bg-[#E60012] text-white font-p5-menu text-sm sm:text-base px-3.5 py-1.5 skew-x-[-10deg] shadow-[4px_4px_0px_#000] mb-2.5">
              <Star size={15} className="fill-[#FFE600] text-[#FFE600]" />
              <span>INFILTRATION TARGET ACQUIRED</span>
            </div>

            <div className="font-p5-title text-4xl sm:text-7xl lg:text-8xl text-white tracking-widest leading-none drop-shadow-[5px_5px_0px_#000]">
              MUHAMAD <span className="text-[#E60012]">HATA</span>
            </div>

            <div className="text-xs sm:text-sm font-p5-menu text-[#FFE600] mt-2 tracking-widest font-black uppercase flex items-center gap-2">
              <span>FULLSTACK MOBILE</span>
              <span className="text-zinc-500">•</span>
              <span>WEB</span>
              <span className="text-zinc-500">•</span>
              <span>AI ENGINEER</span>
            </div>
          </div>
        </div>

        {/* White Lightning Jagged Border attached to Left Black piece */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
        >
          <path
            d={lightningPathD}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="5"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="square"
            strokeLinejoin="miter"
            className="filter drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]"
          />
        </svg>
      </motion.div>

      {/* ============================================================
          RIGHT TORN PAPER HALF (PHANTOM CRIMSON RED - OPENS TO THE RIGHT)
          ============================================================ */}
      <motion.div
        initial={{ x: 0, rotate: 0, opacity: 1 }}
        animate={
          isTorn
            ? { x: '125%', rotate: 3.5, opacity: 0 }
            : { x: 0, rotate: 0, opacity: 1 }
        }
        transition={{
          duration: 1.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute inset-0"
      >
        {/* Red Polygon Layer */}
        <div
          className="absolute inset-0 bg-[#E60012]"
          style={{
            clipPath: `polygon(
              72% 0%, 
              100% 0%, 
              100% 100%, 
              18% 100%, 
              32% 94%, 
              26% 88%, 
              44% 78%, 
              38% 70%, 
              55% 60%, 
              45% 52%, 
              60% 45%, 
              54% 38%, 
              70% 25%, 
              64% 15%
            )`,
            boxShadow: '-15px -15px 40px rgba(0,0,0,0.95)'
          }}
        >
          <div className="absolute inset-0 p5-halftone-dense opacity-35"></div>

          <div className="absolute bottom-10 right-8 sm:bottom-16 sm:right-14 text-right z-10">
            <div className="inline-block bg-black text-white font-p5 text-3xl sm:text-6xl px-5 py-2 skew-x-[-10deg] shadow-[8px_8px_0px_#000] border-2 border-white mb-2.5">
              TAKE YOUR HEART!
            </div>

            <div className="text-xs sm:text-base font-p5-menu text-white tracking-widest font-black uppercase drop-shadow-[2px_2px_0px_#000]">
              UPI TEKNIK KOMPUTER • BRIN PR KAKS
            </div>
          </div>

          <div className="absolute bottom-16 left-0 right-0 h-7 p5-caution-strip-yellow rotate-[-2deg] opacity-70"></div>
        </div>

        {/* White Lightning Jagged Border attached to Right Red piece */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
        >
          <path
            d={lightningPathD}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="5"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="square"
            strokeLinejoin="miter"
            className="filter drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]"
          />
        </svg>
      </motion.div>

      {/* ============================================================
          DYNAMIC CENTER LIGHTNING SEAM SLASH & CRACKLE ANIMATION
          ============================================================ */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        {stage === 'slashing' && (
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full animate-pulse"
          >
            {/* Outer Red/Yellow Electric Aura */}
            <path
              d={lightningPathD}
              fill="none"
              stroke="#FFE600"
              strokeWidth="24"
              vectorEffect="non-scaling-stroke"
              className="opacity-70"
              filter="url(#p5-lightning-glow)"
            />
            {/* Mid Electric Crimson Slash */}
            <path
              d={lightningPathD}
              fill="none"
              stroke="#E60012"
              strokeWidth="14"
              vectorEffect="non-scaling-stroke"
              className="opacity-90"
            />
            {/* Blinding White Core Lightning Beam */}
            <path
              d={lightningPathD}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="8"
              vectorEffect="non-scaling-stroke"
              className="opacity-100"
            />

            {/* Lightning Spark Nodes along the centered zigzag teeth */}
            <circle cx="64" cy="15" r="3" fill="#FFFFFF" filter="url(#p5-lightning-glow)" />
            <circle cx="70" cy="25" r="3" fill="#FFE600" filter="url(#p5-lightning-glow)" />
            <circle cx="54" cy="38" r="3.5" fill="#FFFFFF" filter="url(#p5-lightning-glow)" />
            <circle cx="45" cy="52" r="4.5" fill="#FFFFFF" filter="url(#p5-lightning-glow)" />
            <circle cx="55" cy="60" r="4" fill="#FFE600" filter="url(#p5-lightning-glow)" />
            <circle cx="38" cy="70" r="3.5" fill="#FFFFFF" filter="url(#p5-lightning-glow)" />
            <circle cx="26" cy="88" r="3" fill="#FFE600" filter="url(#p5-lightning-glow)" />
          </svg>
        )}

        {/* Dynamic Flying Persona 5 Stars during Slash */}
        {stage === 'slashing' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute top-[20%] left-[65%] text-white text-3xl font-p5 animate-ping">★</div>
            <div className="absolute top-[38%] left-[52%] text-[#FFE600] text-4xl font-p5 animate-ping">★</div>
            <div className="absolute top-[50%] left-[48%] text-white text-6xl font-p5 animate-bounce">★</div>
            <div className="absolute top-[65%] left-[42%] text-[#E60012] text-4xl font-p5 animate-ping">★</div>
            <div className="absolute top-[82%] left-[30%] text-[#FFE600] text-3xl font-p5 animate-bounce">★</div>
          </div>
        )}
      </div>

      {/* ============================================================
          CENTER SEAM: INTERACTIVE CALLOUT BANNER BOX
          ============================================================ */}
      <AnimatePresence>
        {!isTorn && (
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.25, transition: { duration: 0.4 } }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center z-40"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative flex flex-col items-center group pointer-events-auto"
            >
              <div className="bg-black border-4 border-white p-5 sm:p-7 skew-x-[-12deg] shadow-[16px_16px_0px_#E60012] rotate-[-5deg] transition-all duration-300 group-hover:border-[#FFE600]">
                <div className="skew-x-[12deg] flex items-center gap-4">
                  <span className="w-12 h-12 sm:w-14 sm:h-14 bg-[#E60012] text-white flex items-center justify-center font-p5 text-3xl sm:text-4xl shadow-[4px_4px_0px_#000] animate-bounce flex-shrink-0">
                    ★
                  </span>
                  <div>
                    <div className="text-white font-p5-expose text-2xl sm:text-5xl tracking-widest leading-none flex items-center gap-2">
                      <span>PORTFOLIO WEBSITE</span>
                    </div>
                    <div className="text-[#FFE600] font-p5-menu text-xs sm:text-base tracking-wider font-black mt-2 flex items-center gap-2 animate-pulse">
                      <MousePointerClick size={18} className="text-[#FFE600]" />
                      <span>KLIK UNTUK MASUK KE BERANDA</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
