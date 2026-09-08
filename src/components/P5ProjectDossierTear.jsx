import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playP5PaperTear, playP5Click } from '../utils/soundEffects';
import { Star, MousePointerClick } from 'lucide-react';

/**
 * P5ProjectDossierTear — Persona 5 Calling Card & Project Dossier Unseal Transition
 * 
 * Perfected Layout:
 * - Vertical jagged seam dividing left (Black) and right (Red) with zero title clipping
 * - 1.4s showcase pause so user can read project dossier content clearly
 * - Interactive click/keyboard support for instant opening
 * - Smooth 1.15s organic peeling transition with 3D depth
 */
export default function P5ProjectDossierTear({ project, onComplete }) {
  const [stage, setStage] = useState('sealed'); // 'sealed' -> 'slashing' -> 'tearing' -> 'done'
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Keyboard listener: space, enter, or esc triggers unseal
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        triggerUnseal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Showcase Pause: Hold for 1.4s so user can read the dossier before tearing open
    const autoTimer = setTimeout(() => {
      triggerUnseal();
    }, 1400);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(autoTimer);
    };
  }, []);

  const triggerUnseal = () => {
    if (stage !== 'sealed') return;

    setStage('slashing');
    playP5PaperTear();

    // Peeling begins after the electric cut
    setTimeout(() => {
      setStage('tearing');
    }, 380);

    // Unmount once both halves have gracefully peeled away (1.4s after slash)
    setTimeout(() => {
      setStage('done');
      setVisible(false);
      if (onComplete) onComplete();
    }, 1400);
  };

  if (!visible) return null;

  // Vertical Jagged Lightning Seam Path (Top to Bottom)
  const seamPathD = "M 62 0 L 54 15 L 60 25 L 46 38 L 52 45 L 38 52 L 48 60 L 34 70 L 40 78 L 24 88 L 30 94 L 16 100";

  const isTorn = stage === 'tearing' || stage === 'done';

  return (
    <div 
      onClick={triggerUnseal}
      className={`fixed inset-0 z-[999999] overflow-hidden select-none transition-opacity duration-300 ${
        isTorn ? 'pointer-events-none opacity-100' : 'cursor-pointer bg-black/95 opacity-100'
      }`}
      title="Klik di mana saja untuk membuka langsung"
    >
      {/* SVG Filters for Lightning Glow */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="p5-dossier-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* ============================================================
          LEFT TORN PAPER HALF (DEEP VELVET BLACK - PEELS TO THE LEFT)
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
        {/* Black Polygon Layer (Background only — no content inside to avoid clipping) */}
        <div
          className="absolute inset-0 bg-[#0A0A0C]"
          style={{
            clipPath: `polygon(
              0% 0%, 
              62% 0%, 
              54% 15%, 
              60% 25%, 
              46% 38%, 
              52% 45%, 
              38% 52%, 
              48% 60%, 
              34% 70%, 
              40% 78%, 
              24% 88%, 
              30% 94%, 
              16% 100%, 
              0% 100%
            )`,
            boxShadow: '15px 15px 40px rgba(0,0,0,0.95)'
          }}
        >
          <div className="absolute inset-0 p5-halftone opacity-35" />
          
          {/* Top Slanted Caution Ribbon */}
          <div className="absolute top-12 left-0 right-0 h-6 p5-caution-strip rotate-[-2deg] opacity-80 shadow-lg" />
        </div>

        {/* Left Project Header Dossier Content — OUTSIDE clip-path so title is never cut off */}
        <div className="absolute top-8 left-6 sm:top-14 sm:left-14 z-10 max-w-[40%] sm:max-w-[38%] lg:max-w-[36%]">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 bg-[#E60012] text-white font-p5-menu text-xs sm:text-sm px-3.5 py-1.5 skew-x-[-10deg] shadow-[3px_3px_0px_#000] mb-3 font-bold">
            <Star size={14} className="fill-[#FFE600] text-[#FFE600]" />
            <span>CONFIDENTIAL // METAVERSE MISSION DOSSIER</span>
          </div>

          {/* Project Title (Clean, Crisp, Never Overlapped) */}
          <h1 className="font-p5-title text-3xl sm:text-5xl lg:text-6xl text-white tracking-wide leading-tight drop-shadow-[5px_5px_0px_#000] mb-2">
            {project?.title || 'TARGET MISSION'}
          </h1>

          {/* Project Subtitle */}
          <p className="text-xs sm:text-sm lg:text-base font-semibold text-[#FFE600] mb-3 max-w-md sm:max-w-lg line-clamp-2 font-sans">
            {project?.subtitle}
          </p>

          {/* Tech Stack Preview Badges */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <span className="bg-white text-black font-mono text-[11px] sm:text-xs px-2.5 py-0.5 font-bold skew-x-[-6deg] shadow-[2px_2px_0px_#000]">
              {project?.category?.toUpperCase() || 'PROYEK'}
            </span>
            {project?.techStack?.slice(0, 3).map((tech, i) => (
              <span 
                key={i} 
                className="bg-[#181820] text-zinc-200 border border-zinc-700 font-mono text-[11px] sm:text-xs px-2 py-0.5 skew-x-[-6deg]"
              >
                {tech}
              </span>
            ))}
          </div>

        </div>

        {/* White Jagged Seam Edge Line */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
        >
          <path
            d={seamPathD}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="4"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="square"
            strokeLinejoin="miter"
            className="filter drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
          />
        </svg>
      </motion.div>

      {/* ============================================================
          RIGHT TORN PAPER HALF (PHANTOM CRIMSON - PEELS TO THE RIGHT)
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
              62% 0%, 
              100% 0%, 
              100% 100%, 
              16% 100%, 
              30% 94%, 
              24% 88%, 
              40% 78%, 
              34% 70%, 
              48% 60%, 
              38% 52%, 
              52% 45%, 
              46% 38%, 
              60% 25%, 
              54% 15%
            )`,
            boxShadow: '-15px -15px 40px rgba(0,0,0,0.95)'
          }}
        >
          <div className="absolute inset-0 p5-halftone-dense opacity-35" />

          {/* Bottom Slanted Caution Ribbon */}
          <div className="absolute bottom-12 left-0 right-0 h-6 p5-caution-strip-yellow rotate-[-2deg] opacity-75 shadow-lg" />

          {/* Right Typography & Calling Card Badge */}
          <div className="absolute bottom-8 right-6 sm:bottom-14 sm:right-12 text-right z-10">
            <div className="inline-block bg-black text-white font-p5 text-3xl sm:text-5xl px-5 py-2 skew-x-[-10deg] shadow-[8px_8px_0px_#000] border-2 border-white mb-2 font-bold">
              TAKE YOUR HEART!
            </div>

            <div className="text-xs sm:text-sm font-mono text-white tracking-widest font-bold uppercase drop-shadow-[2px_2px_0px_#000] flex items-center justify-end gap-2">
              <span className="text-[#FFE600]">★</span>
              <span>ARSITEKTUR SISTEM • FITUR • REPOSITORI</span>
            </div>
          </div>
        </div>

        {/* White Jagged Seam Edge Line */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
        >
          <path
            d={seamPathD}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="4"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="square"
            strokeLinejoin="miter"
            className="filter drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
          />
        </svg>
      </motion.div>

      {/* ============================================================
          DYNAMIC LIGHTNING SEAM SLASH ANIMATION (Crimson & Gold Aura)
          ============================================================ */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        {stage === 'slashing' && (
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full animate-pulse"
          >
            {/* Outer Gold Electric Aura */}
            <path
              d={seamPathD}
              fill="none"
              stroke="#FFE600"
              strokeWidth="16"
              vectorEffect="non-scaling-stroke"
              className="opacity-70"
              filter="url(#p5-dossier-glow)"
            />
            {/* Mid Electric Crimson Slash */}
            <path
              d={seamPathD}
              fill="none"
              stroke="#E60012"
              strokeWidth="8"
              vectorEffect="non-scaling-stroke"
              className="opacity-90"
            />
            {/* Soft White Core */}
            <path
              d={seamPathD}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              vectorEffect="non-scaling-stroke"
              className="opacity-95"
            />

            {/* Spark Nodes along the vertical zigzag teeth */}
            <circle cx="54" cy="15" r="3" fill="#FFE600" filter="url(#p5-dossier-glow)" />
            <circle cx="46" cy="38" r="3.5" fill="#FFFFFF" filter="url(#p5-dossier-glow)" />
            <circle cx="38" cy="52" r="4" fill="#FFE600" filter="url(#p5-dossier-glow)" />
            <circle cx="34" cy="70" r="3.5" fill="#FFFFFF" filter="url(#p5-dossier-glow)" />
            <circle cx="24" cy="88" r="3" fill="#FFE600" filter="url(#p5-dossier-glow)" />
          </svg>
        )}

        {/* Floating Stars on Unseal */}
        {stage === 'slashing' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute top-[20%] left-[55%] text-[#FFE600] text-3xl font-p5 animate-ping">★</div>
            <div className="absolute top-[50%] left-[45%] text-white text-5xl font-p5 animate-bounce">★</div>
            <div className="absolute top-[80%] left-[30%] text-[#E60012] text-4xl font-p5 animate-ping">★</div>
          </div>
        )}
      </div>

      {/* ============================================================
          CENTER WAX SEAL / INTERACTIVE CALLING CARD BANNER
          ============================================================ */}
      <AnimatePresence>
        {!isTorn && (
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, transition: { duration: 0.3 } }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center z-40"
          >
            <div className="relative flex flex-col items-center group pointer-events-auto">
              <div className="bg-black border-4 border-white p-4 sm:p-6 skew-x-[-12deg] shadow-[14px_14px_0px_#E60012] rotate-[-4deg] transition-all duration-200 group-hover:border-[#FFE600] group-hover:scale-105">
                <div className="skew-x-[12deg] flex items-center gap-3.5">
                  <span className="w-11 h-11 sm:w-14 sm:h-14 bg-[#E60012] text-white flex items-center justify-center font-p5 text-2xl sm:text-4xl shadow-[4px_4px_0px_#000] animate-bounce flex-shrink-0">
                    ★
                  </span>
                  <div>
                    <div className="text-white font-p5-expose text-xl sm:text-3xl tracking-widest leading-none flex items-center gap-2">
                      <span>MEMBUKA BERKAS MISI</span>
                    </div>
                    <div className="text-[#FFE600] font-mono text-xs sm:text-sm tracking-wider font-bold mt-1.5 flex items-center gap-1.5">
                      <MousePointerClick size={15} className="text-[#FFE600]" />
                      <span>KLIK DI MANA SAJA UNTUK MEMBUKA LANGSUNG</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
