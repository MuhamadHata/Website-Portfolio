import React, { useEffect, useRef, useState } from 'react';

/**
 * P5AllOutAttackFinish — Persona 5 "All-Out Attack" Finish Screen Animation
 * 
 * Pure CSS + Canvas animation with NO external video files.
 * Multi-phase sequence:
 *   Phase 0: White flash impact (0-200ms)
 *   Phase 1: Red radial burst + slash lines (200-700ms) 
 *   Phase 2: Paint splatter + character silhouette (700-1600ms)
 *   Phase 3: Victory banner + stars (1600-2800ms)
 * 
 * @param {Object} props
 * @param {boolean} props.show - Whether to show the animation
 * @param {function} props.onComplete - Called when animation finishes
 * @param {string} props.senderName - Name of the message sender
 */
export default function P5AllOutAttackFinish({ show, onComplete, senderName = '' }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [phase, setPhase] = useState(-1);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (!show) {
      setPhase(-1);
      return;
    }

    setPhase(0);
    startTimeRef.current = performance.now();

    // Phase transitions
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 700);
    const t3 = setTimeout(() => setPhase(3), 1500);
    const t4 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [show, onComplete]);

  // Canvas animation for slash lines and paint splatters
  useEffect(() => {
    if (phase < 1 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    };
    resize();

    const W = window.innerWidth;
    const H = window.innerHeight;

    // Generate slash lines
    const slashes = Array.from({ length: 12 }, (_, i) => ({
      x: W * 0.5 + (Math.random() - 0.5) * W * 0.8,
      y: H * 0.5 + (Math.random() - 0.5) * H * 0.6,
      angle: (Math.random() * 60 - 30) * Math.PI / 180 + (i % 2 === 0 ? Math.PI / 4 : -Math.PI / 4),
      length: 200 + Math.random() * 400,
      width: 3 + Math.random() * 8,
      speed: 0.8 + Math.random() * 0.4,
      progress: 0,
      color: i % 3 === 0 ? '#FFFFFF' : i % 3 === 1 ? '#000000' : '#FFE600',
    }));

    // Generate paint splatters
    const splatters = Array.from({ length: 20 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      radius: 10 + Math.random() * 60,
      progress: 0,
      speed: 0.02 + Math.random() * 0.03,
      delay: Math.random() * 0.5,
      color: Math.random() > 0.5 ? '#000000' : '#1A1A2E',
    }));

    // Floating star particles
    const stars = Array.from({ length: 30 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      size: 4 + Math.random() * 12,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.08,
      opacity: 0,
      fadeSpeed: 0.03 + Math.random() * 0.02,
      color: Math.random() > 0.3 ? '#FFE600' : '#FFFFFF',
    }));

    let elapsed = 0;
    let lastTime = performance.now();

    const animate = (now) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      elapsed += dt;

      ctx.clearRect(0, 0, W, H);

      // Phase 1+: Draw slash lines
      if (phase >= 1) {
        slashes.forEach(s => {
          if (s.progress < 1) {
            s.progress = Math.min(1, s.progress + dt * s.speed * 3);
          }
          const len = s.length * easeOutExpo(s.progress);
          const cos = Math.cos(s.angle);
          const sin = Math.sin(s.angle);

          ctx.save();
          ctx.strokeStyle = s.color;
          ctx.lineWidth = s.width;
          ctx.lineCap = 'round';
          ctx.globalAlpha = 1 - s.progress * 0.3;
          ctx.beginPath();
          ctx.moveTo(s.x - cos * len * 0.5, s.y - sin * len * 0.5);
          ctx.lineTo(s.x + cos * len * 0.5, s.y + sin * len * 0.5);
          ctx.stroke();
          ctx.restore();
        });
      }

      // Phase 2+: Paint splatters
      if (phase >= 2) {
        splatters.forEach(sp => {
          const t = Math.max(0, elapsed - 0.7 - sp.delay);
          if (t <= 0) return;
          sp.progress = Math.min(1, t * sp.speed * 30);

          ctx.save();
          ctx.fillStyle = sp.color;
          ctx.globalAlpha = 0.7 * (1 - sp.progress * 0.2);
          ctx.beginPath();

          // Irregular splatter shape
          const points = 8;
          for (let i = 0; i <= points; i++) {
            const angle = (i / points) * Math.PI * 2;
            const r = sp.radius * easeOutExpo(sp.progress) * (0.6 + 0.4 * Math.sin(angle * 3 + sp.x));
            const px = sp.x + Math.cos(angle) * r;
            const py = sp.y + Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        });
      }

      // Phase 2+: Floating stars
      if (phase >= 2) {
        stars.forEach(st => {
          st.opacity = Math.min(1, st.opacity + st.fadeSpeed);
          st.rotation += st.rotSpeed;

          ctx.save();
          ctx.translate(st.x, st.y);
          ctx.rotate(st.rotation);
          ctx.globalAlpha = st.opacity;
          ctx.fillStyle = st.color;
          drawStar(ctx, 0, 0, st.size, st.size * 0.4, 5);
          ctx.fill();
          ctx.restore();
        });
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [phase]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] pointer-events-none overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Phase 0: White Flash Impact */}
      <div
        className="absolute inset-0 bg-white transition-opacity duration-200"
        style={{
          opacity: phase === 0 ? 1 : 0,
          zIndex: 60,
        }}
      />

      {/* Phase 1+: Red Radial Background */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: phase >= 1 ? 1 : 0,
          zIndex: 10,
          background: `
            radial-gradient(ellipse at center, #E60012 0%, #B2000E 35%, #6B0008 65%, #1A0004 100%)
          `,
        }}
      />

      {/* Radiating speed lines (CSS) */}
      {phase >= 1 && (
        <div className="absolute inset-0 z-20" style={{ opacity: phase >= 2 ? 0.3 : 0.8 }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                width: '3px',
                height: '150vh',
                background: i % 2 === 0
                  ? 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.6), transparent)'
                  : 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4), transparent)',
                transform: `translate(-50%, -50%) rotate(${i * 15}deg)`,
                animation: `p5-speed-line ${0.3 + (i % 3) * 0.1}s ease-out forwards`,
                animationDelay: `${i * 20}ms`,
              }}
            />
          ))}
        </div>
      )}

      {/* Canvas layer for slashes, splatters, stars */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-30"
        style={{ opacity: phase >= 1 ? 1 : 0 }}
      />

      {/* Phase 2: Black diagonal stripe overlays for Persona 5 style */}
      {phase >= 2 && (
        <div className="absolute inset-0 z-35 overflow-hidden" style={{ opacity: 0.6 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: '200%',
                height: '40px',
                background: '#000000',
                top: `${15 + i * 15}%`,
                left: '-50%',
                transform: `rotate(${-12 + (i % 2) * 24}deg) scaleX(0)`,
                transformOrigin: i % 2 === 0 ? 'left center' : 'right center',
                animation: `p5-stripe-sweep 0.4s ${0.1 * i}s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
              }}
            />
          ))}
        </div>
      )}

      {/* Phase 3: Victory Banner Center */}
      {phase >= 3 && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          {/* Main banner container */}
          <div
            className="relative flex flex-col items-center"
            style={{
              animation: 'p5-banner-slam 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            {/* Top decorative bar */}
            <div
              className="w-full h-2 bg-[#FFE600] mb-0"
              style={{
                boxShadow: '0 0 20px rgba(255, 230, 0, 0.5)',
                animation: 'p5-glow-pulse 1s ease-in-out infinite alternate',
              }}
            />

            {/* Main black panel */}
            <div
              className="relative bg-black/95 backdrop-blur-sm px-8 sm:px-16 py-6 sm:py-8 border-y-4 border-[#E60012]"
              style={{
                transform: 'skewX(-6deg)',
                boxShadow: '10px 10px 0px rgba(0,0,0,0.8), 0 0 60px rgba(230, 0, 18, 0.3)',
                minWidth: '500px',
                maxWidth: '90vw',
              }}
            >
              <div style={{ transform: 'skewX(6deg)' }} className="text-center">
                {/* Top label */}
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="h-px w-8 bg-[#FFE600]" />
                  <span
                    className="font-mono text-[10px] sm:text-xs text-[#FFE600] tracking-[0.3em] font-bold"
                    style={{ animation: 'p5-text-flicker 0.8s ease-out forwards' }}
                  >
                    PHANTOM THIEVES // MISSION COMPLETE
                  </span>
                  <div className="h-px w-8 bg-[#FFE600]" />
                </div>

                {/* Main title */}
                <h2
                  className="font-bebas text-4xl sm:text-6xl lg:text-7xl text-white tracking-wider leading-none mb-2"
                  style={{
                    textShadow: '3px 3px 0px #E60012, 6px 6px 0px rgba(0,0,0,0.5)',
                    animation: 'p5-title-reveal 0.6s 0.1s cubic-bezier(0.16, 1, 0.3, 1) both',
                  }}
                >
                  <span className="text-[#FFE600]">★</span> TRANSMISSION{' '}
                  <span className="text-[#E60012]">DELIVERED</span>{' '}
                  <span className="text-[#FFE600]">★</span>
                </h2>

                {/* Subtitle with sender name */}
                <div
                  className="flex items-center justify-center gap-3 mt-3"
                  style={{ animation: 'p5-subtitle-slide 0.5s 0.3s cubic-bezier(0.16, 1, 0.3, 1) both' }}
                >
                  <div className="bg-[#E60012] px-4 py-1.5" style={{ transform: 'skewX(-8deg)' }}>
                    <span
                      className="font-bebas text-lg sm:text-2xl text-white tracking-widest block"
                      style={{ transform: 'skewX(8deg)' }}
                    >
                      TAKE YOUR HEART!
                    </span>
                  </div>
                </div>

                {/* Sender confirmation */}
                {senderName && (
                  <p
                    className="mt-3 font-mono text-xs text-zinc-400"
                    style={{ animation: 'p5-fade-in 0.5s 0.5s both' }}
                  >
                    Calling Card dari <span className="text-[#FFE600] font-bold">{senderName}</span> telah diterima
                  </p>
                )}
              </div>
            </div>

            {/* Bottom decorative bar */}
            <div
              className="w-full h-2 bg-[#FFE600] mt-0"
              style={{
                boxShadow: '0 0 20px rgba(255, 230, 0, 0.5)',
                animation: 'p5-glow-pulse 1s ease-in-out infinite alternate',
              }}
            />

            {/* Corner decorations */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-4 border-l-4 border-[#FFE600]" />
            <div className="absolute -top-4 -right-4 w-8 h-8 border-t-4 border-r-4 border-[#FFE600]" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-4 border-l-4 border-[#FFE600]" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-4 border-r-4 border-[#FFE600]" />
          </div>
        </div>
      )}

      {/* Floating P5-style geometric shapes */}
      {phase >= 2 && (
        <div className="absolute inset-0 z-25 overflow-hidden pointer-events-none">
          {/* Large rotating diamond */}
          <div
            className="absolute top-[10%] right-[10%] w-20 h-20 border-4 border-[#FFE600]"
            style={{
              transform: 'rotate(45deg)',
              animation: 'p5-diamond-spin 3s linear infinite, p5-fade-in 0.5s ease-out both',
              opacity: 0.6,
            }}
          />
          {/* Small rotating diamond */}
          <div
            className="absolute bottom-[15%] left-[8%] w-12 h-12 border-3 border-white"
            style={{
              transform: 'rotate(45deg)',
              animation: 'p5-diamond-spin 2.5s linear infinite reverse, p5-fade-in 0.5s 0.2s ease-out both',
              opacity: 0.4,
            }}
          />
          {/* Red circle accent */}
          <div
            className="absolute top-[60%] right-[5%] w-16 h-16 rounded-full border-4 border-[#E60012]"
            style={{
              animation: 'p5-circle-pulse 2s ease-in-out infinite, p5-fade-in 0.5s 0.3s ease-out both',
              opacity: 0.5,
            }}
          />
        </div>
      )}

      {/* Inline styles for CSS animations */}
      <style>{`
        @keyframes p5-speed-line {
          0% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--r, 0deg)) scaleY(0); }
          50% { opacity: 1; }
          100% { opacity: 0.2; transform: translate(-50%, -50%) rotate(var(--r, 0deg)) scaleY(1); }
        }

        @keyframes p5-stripe-sweep {
          0% { transform: rotate(var(--r, -12deg)) scaleX(0); }
          100% { transform: rotate(var(--r, -12deg)) scaleX(1); }
        }

        @keyframes p5-banner-slam {
          0% { opacity: 0; transform: scale(3) rotate(-5deg); }
          60% { opacity: 1; transform: scale(0.95) rotate(1deg); }
          80% { transform: scale(1.02) rotate(-0.5deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        @keyframes p5-title-reveal {
          0% { opacity: 0; transform: translateY(30px) scaleY(0.3); letter-spacing: 0.5em; }
          100% { opacity: 1; transform: translateY(0) scaleY(1); letter-spacing: inherit; }
        }

        @keyframes p5-subtitle-slide {
          0% { opacity: 0; transform: translateX(-40px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes p5-text-flicker {
          0%, 20% { opacity: 0; }
          30% { opacity: 1; }
          40% { opacity: 0.3; }
          50%, 100% { opacity: 1; }
        }

        @keyframes p5-fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes p5-glow-pulse {
          0% { box-shadow: 0 0 10px rgba(255, 230, 0, 0.3); }
          100% { box-shadow: 0 0 30px rgba(255, 230, 0, 0.7); }
        }

        @keyframes p5-diamond-spin {
          0% { transform: rotate(45deg) scale(1); }
          50% { transform: rotate(225deg) scale(1.1); }
          100% { transform: rotate(405deg) scale(1); }
        }

        @keyframes p5-circle-pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

// Utility functions
function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function drawStar(ctx, cx, cy, outerR, innerR, points) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}
