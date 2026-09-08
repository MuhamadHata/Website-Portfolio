import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playP5PaperTear } from '../utils/soundEffects';

/**
 * P5CustomPaperTear — Pure Code Organic Center Paper Tear Reveal
 * 
 * 100% custom-crafted animation (no video overlay):
 * - Rips open from the EXACT dead center (50%, 50%)
 * - 8 interlocking jagged paper fragments peel outward in 360° with 3D perspective
 * - The modal content is centered and revealed directly through the expanding center tear
 * - White torn paper fiber highlights, halftone textures, and flying paper dust particles
 */
export default function P5CustomPaperTear({ onComplete }) {
  const [phase, setPhase] = useState('sealed'); // 'sealed' -> 'tearing' -> 'done'

  useEffect(() => {
    playP5PaperTear();

    // Trigger tear start
    const t1 = setTimeout(() => {
      setPhase('tearing');
    }, 60);

    // Complete transition and unmount
    const t2 = setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 750);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  // 8 Interlocking Paper Shards meeting precisely at the center (50%, 50%)
  const shards = [
    {
      id: 'top-left-upper',
      clip: 'polygon(0% 0%, 50% 0%, 48% 18%, 53% 32%, 50% 50%, 32% 44%, 22% 35%, 0% 30%)',
      exit: { x: '-120%', y: '-110%', rotateX: 45, rotateY: -40, rotateZ: -22, scale: 0.6, opacity: 0 },
      delay: 0,
      edgeD: 'M 50 0 L 48 18 L 53 32 L 50 50 L 32 44 L 22 35 L 0 30',
      bg: '#0A0A0E',
    },
    {
      id: 'top-right-upper',
      clip: 'polygon(50% 0%, 100% 0%, 100% 28%, 78% 34%, 66% 42%, 50% 50%, 53% 32%, 48% 18%)',
      exit: { x: '120%', y: '-110%', rotateX: 45, rotateY: 40, rotateZ: 22, scale: 0.6, opacity: 0 },
      delay: 0.02,
      edgeD: 'M 50 0 L 48 18 L 53 32 L 50 50 L 66 42 L 78 34 L 100 28',
      bg: '#0C0C12',
    },
    {
      id: 'mid-left',
      clip: 'polygon(0% 30%, 22% 35%, 32% 44%, 50% 50%, 35% 58%, 20% 64%, 0% 68%)',
      exit: { x: '-135%', y: '0%', rotateX: 15, rotateY: -55, rotateZ: -12, scale: 0.55, opacity: 0 },
      delay: 0.04,
      edgeD: 'M 0 30 L 22 35 L 32 44 L 50 50 L 35 58 L 20 64 L 0 68',
      bg: '#121218',
    },
    {
      id: 'mid-right',
      clip: 'polygon(100% 28%, 78% 34%, 66% 42%, 50% 50%, 64% 56%, 82% 62%, 100% 65%)',
      exit: { x: '135%', y: '0%', rotateX: 15, rotateY: 55, rotateZ: 12, scale: 0.55, opacity: 0 },
      delay: 0.03,
      edgeD: 'M 100 28 L 78 34 L 66 42 L 50 50 L 64 56 L 82 62 L 100 65',
      bg: '#121218',
    },
    {
      id: 'bottom-left-lower',
      clip: 'polygon(0% 68%, 20% 64%, 35% 58%, 50% 50%, 46% 68%, 52% 82%, 50% 100%, 0% 100%)',
      exit: { x: '-110%', y: '110%', rotateX: -45, rotateY: -35, rotateZ: 18, scale: 0.6, opacity: 0 },
      delay: 0.05,
      edgeD: 'M 0 68 L 20 64 L 35 58 L 50 50 L 46 68 L 52 82 L 50 100',
      bg: '#0A0A0E',
    },
    {
      id: 'bottom-right-lower',
      clip: 'polygon(100% 65%, 82% 62%, 64% 56%, 50% 50%, 46% 68%, 52% 82%, 50% 100%, 100% 100%)',
      exit: { x: '110%', y: '110%', rotateX: -45, rotateY: 35, rotateZ: -18, scale: 0.6, opacity: 0 },
      delay: 0.04,
      edgeD: 'M 100 65 L 82 62 L 64 56 L 50 50 L 46 68 L 52 82 L 50 100',
      bg: '#0C0C12',
    },
  ];

  // Paper dust sparks radiating from dead center (50%, 50%)
  const particles = Array.from({ length: 16 }).map((_, i) => {
    const angle = (i / 16) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
    const distance = 140 + Math.random() * 240;
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: 4 + Math.random() * 6,
      color: i % 3 === 0 ? '#FFE600' : i % 3 === 1 ? '#FFFFFF' : '#E60012',
      rotation: Math.random() * 720 - 360,
      delay: 0.02 + Math.random() * 0.08,
    };
  });

  return (
    <div 
      className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none select-none"
      style={{ zIndex: 9999999, perspective: '1400px' }}
    >
      {/* 1. Dynamic Comic Slash Flash Beam at Center (0-200ms) */}
      <AnimatePresence>
        {phase !== 'done' && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0, scaleX: 0.3 }}
            animate={{ opacity: [0, 1, 0.8, 0], scaleY: [0, 1.2, 1, 0], scaleX: [0.3, 1.2, 1.4, 1.8] }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: '240vw',
              height: '8px',
              background: 'linear-gradient(90deg, transparent 5%, #FFFFFF 30%, #FFE600 50%, #FFFFFF 70%, transparent 95%)',
              transform: 'translate(-50%, -50%) rotate(-28deg)',
              boxShadow: '0 0 35px #FFFFFF, 0 0 70px #E60012, 0 0 120px #E60012',
            }}
          />
        )}
      </AnimatePresence>

      {/* 2. Pure Code 3D Peeling Paper Shards from Center */}
      {shards.map((shard) => {
        const isTearing = phase === 'tearing' || phase === 'done';
        return (
          <motion.div
            key={shard.id}
            initial={{ x: 0, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1, opacity: 1 }}
            animate={
              isTearing
                ? shard.exit
                : { x: 0, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1, opacity: 1 }
            }
            transition={{
              duration: 0.68,
              ease: [0.16, 1, 0.3, 1], // Persona 5 dynamic snap ease
              delay: shard.delay,
            }}
            className="absolute inset-0 w-full h-full"
            style={{
              clipPath: shard.clip,
              transformOrigin: '50% 50%',
              transformStyle: 'preserve-3d',
              willChange: 'transform, opacity',
            }}
          >
            {/* Paper Sheet Texture */}
            <div 
              className="absolute inset-0 shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
              style={{ background: shard.bg }}
            >
              {/* Halftone Pattern */}
              <div className="absolute inset-0 p5-halftone opacity-25 pointer-events-none" />

              {/* Paper Grain Lines */}
              <div 
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 3px,
                    rgba(255, 255, 255, 0.04) 3px,
                    rgba(255, 255, 255, 0.04) 6px
                  )`,
                }}
              />

              {/* Curl Underside Shading */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-60"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(230,0,18,0.25) 0%, transparent 65%)',
                }}
              />
            </div>

            {/* White Torn Paper Fiber Seam */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d={shard.edgeD}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
                className="filter drop-shadow-[0_0_5px_rgba(255,255,255,0.95)]"
              />
            </svg>
          </motion.div>
        );
      })}

      {/* 3. Flying Paper Sparks & Dust from Center */}
      {phase === 'tearing' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {particles.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
              animate={{
                x: p.x,
                y: p.y,
                scale: [0, 1.5, 0.2],
                opacity: [1, 0.9, 0],
                rotate: p.rotation,
              }}
              transition={{
                duration: 0.55,
                ease: 'easeOut',
                delay: p.delay,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                clipPath: idx % 2 === 0 ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' : 'none',
                borderRadius: idx % 2 === 0 ? '0px' : '1px',
                boxShadow: `0 0 10px ${p.color}`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
