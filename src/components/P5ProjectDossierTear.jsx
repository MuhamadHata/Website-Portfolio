import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { playP5PaperTear } from '../utils/soundEffects';
import { Star } from 'lucide-react';

/**
 * P5ProjectDossierTear — Persona 5 Project Dossier Auto-Unseal Transition
 * 
 * Purely automatic transition when opening a project dossier:
 * - Electric slash cut immediately on mount (zero user clicks required)
 * - Smooth peeling animation (left black, right red)
 * - Auto unmounts in ~0.95s to reveal the full modal
 */
export default function P5ProjectDossierTear({ project, onComplete }) {
  // 'slashing' -> 'tearing' -> 'done'
  const [stage, setStage] = useState('slashing');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Play sound immediately on mount
    playP5PaperTear();

    // Start peeling transition
    const tearTimer = setTimeout(() => {
      setStage('tearing');
    }, 280);

    // Finish and reveal modal content
    const completeTimer = setTimeout(() => {
      setStage('done');
      setVisible(false);
      if (onComplete) onComplete();
    }, 950);

    return () => {
      clearTimeout(tearTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!visible) return null;

  // Vertical Jagged Lightning Seam Path (Top to Bottom)
  const seamPathD = "M 62 0 L 54 15 L 60 25 L 46 38 L 52 45 L 38 52 L 48 60 L 34 70 L 40 78 L 24 88 L 30 94 L 16 100";

  const isTorn = stage === 'tearing' || stage === 'done';

  return (
    <div className="fixed inset-0 z-[999999] overflow-hidden select-none pointer-events-none">
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
          duration: 0.65,
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
          <div className="absolute top-12 left-0 right-0 h-6 p5-caution-strip rotate-[-2deg] opacity-80 shadow-lg" />
        </div>

        {/* Left Project Header Dossier Content */}
        <div className="absolute top-6 left-4 sm:top-14 sm:left-14 z-10 max-w-[52%] sm:max-w-[38%] lg:max-w-[36%]">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#E60012] text-white font-p5-menu text-[10px] sm:text-sm px-2.5 sm:px-3.5 py-1 sm:py-1.5 skew-x-[-10deg] shadow-[3px_3px_0px_#000] mb-2 sm:mb-3 font-bold">
            <Star size={12} className="fill-[#FFE600] text-[#FFE600] sm:w-3.5 sm:h-3.5" />
            <span>CONFIDENTIAL // METAVERSE MISSION DOSSIER</span>
          </div>

          <h1 className="font-p5-title text-2xl sm:text-5xl lg:text-6xl text-white tracking-wide leading-tight drop-shadow-[4px_4px_0px_#000] sm:drop-shadow-[5px_5px_0px_#000] mb-1 sm:mb-2">
            {project?.title || 'TARGET MISSION'}
          </h1>

          <p className="text-xs sm:text-sm lg:text-base font-semibold text-[#FFE600] mb-3 max-w-md sm:max-w-lg line-clamp-2 font-sans">
            {project?.subtitle}
          </p>

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
          duration: 0.65,
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
          <div className="absolute bottom-12 left-0 right-0 h-6 p5-caution-strip-yellow rotate-[-2deg] opacity-75 shadow-lg" />
        </div>

        {/* Right Typography & Calling Card Badge */}
        <div className="absolute bottom-6 right-4 sm:bottom-14 sm:right-12 text-right z-10 max-w-[65%] sm:max-w-[45%] lg:max-w-[40%]">
          <div className="inline-block bg-black text-white font-p5 text-xl sm:text-5xl px-3 sm:px-5 py-1 sm:py-2 skew-x-[-8deg] sm:skew-x-[-10deg] shadow-[5px_5px_0px_#000] sm:shadow-[8px_8px_0px_#000] border-2 border-white mb-1.5 sm:mb-2 font-bold">
            TAKE YOUR HEART!
          </div>

          <div className="text-[10px] sm:text-sm font-mono text-white tracking-wider sm:tracking-widest font-bold uppercase drop-shadow-[2px_2px_0px_#000] flex items-center justify-end gap-1.5 sm:gap-2">
            <span className="text-[#FFE600]">★</span>
            <span>ARSITEKTUR SISTEM • FITUR</span>
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

    </div>
  );
}
