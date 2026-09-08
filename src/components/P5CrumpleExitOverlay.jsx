import React, { useEffect, useRef } from 'react';
import { playP5PaperCrumple } from '../utils/soundEffects';

/**
 * P5CrumpleExitOverlay — Authentic Persona 5 Paper Crumple Exit Transition
 * 
 * Plays "Paper Crumple transition.mp4" on top with screen blend mode and audio sync:
 * - The white crumple stroke lines fold, wrinkle, and crunch into a small paper ball at the center
 * - Disappears smoothly at ~0.95s when the crumpled ball vanishes into nothingness
 */
export default function P5CrumpleExitOverlay({ onComplete }) {
  const videoRef = useRef(null);

  useEffect(() => {
    playP5PaperCrumple();

    // The crumple animation completes around 950ms (when paper ball vanishes)
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 950);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((err) => {
        console.warn('Crumple video autoplay failed:', err);
      });
    }

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none select-none z-[9999999] flex items-center justify-center"
      style={{ zIndex: 9999999 }}
    >
      {/* Authentic Paper Crumple Video Animation Layer */}
      <video
        ref={videoRef}
        src="/animation/Paper Crumple transition.mp4"
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover mix-blend-screen pointer-events-none scale-100"
      />
    </div>
  );
}
