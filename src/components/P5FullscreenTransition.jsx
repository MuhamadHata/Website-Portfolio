import React, { useEffect, useRef } from 'react';
import { playP5Slash } from '../utils/soundEffects';

/**
 * P5FullscreenTransition
 * Full-screen Persona 5 Slash & Star-Tear Menu Transition Overlay.
 * 
 * - Plays full-screen (w-screen h-screen fixed inset-0 z-[9999999])
 * - Hardware-accelerated with GPU mix-blend-screen for crisp transparent playback
 * - Executes onMidpoint callback at the peak visual coverage (~250-300ms)
 * - Completes smoothly at end of animation (~800ms) with zero clipping or stutter
 */
export default function P5FullscreenTransition({
  onMidpoint,
  onComplete,
  videoSrc = '/animation/transition.mp4',
}) {
  const videoRef = useRef(null);
  const midpointFiredRef = useRef(false);
  const completedRef = useRef(false);

  useEffect(() => {
    midpointFiredRef.current = false;
    completedRef.current = false;

    // Trigger audio slash effect
    playP5Slash();

    // Fallback timer for midpoint execution (at ~280ms when star tear covers screen)
    const midTimer = setTimeout(() => {
      if (!midpointFiredRef.current) {
        midpointFiredRef.current = true;
        if (onMidpoint) onMidpoint();
      }
    }, 280);

    // Fallback timer to guarantee transition completion (at 850ms)
    const endTimer = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        if (onComplete) onComplete();
      }
    }, 850);

    // Try to autoplay video
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((err) => {
        console.warn('Transition video autoplay blocked/interrupted:', err);
      });
    }

    return () => {
      clearTimeout(midTimer);
      clearTimeout(endTimer);
    };
  }, [onMidpoint, onComplete]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    // transition.mp4 is 0.83s, peak coverage is around 0.25s - 0.35s
    if (videoRef.current.currentTime >= 0.25 && !midpointFiredRef.current) {
      midpointFiredRef.current = true;
      if (onMidpoint) onMidpoint();
    }
  };

  const handleVideoEnded = () => {
    if (!completedRef.current) {
      completedRef.current = true;
      if (onComplete) onComplete();
    }
  };

  return (
    <div 
      className="fixed inset-0 w-screen h-screen z-[9999999] pointer-events-none flex items-center justify-center overflow-hidden bg-transparent select-none transition-opacity duration-200"
      style={{ zIndex: 9999999 }}
    >
      {/* Dynamic Comic Slash Light Beam Flash */}
      <div className="p5-slash-flash absolute w-[220vw] h-8 bg-white -rotate-35 shadow-[0_0_40px_#FFFFFF,0_0_80px_#E60012] pointer-events-none z-30"></div>

      {/* Fullscreen Video Transition Layer */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        className="w-full h-full object-cover mix-blend-screen scale-105 pointer-events-none"
      />

      {/* Persona 5 Corner Shards Accent */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[#E60012] rotate-45 -translate-x-16 -translate-y-16 opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#FFE600] rotate-45 translate-x-16 translate-y-16 opacity-30 pointer-events-none"></div>
    </div>
  );
}
