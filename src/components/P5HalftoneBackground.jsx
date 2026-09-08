import React, { useEffect, useRef } from 'react';

export default function P5HalftoneBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle Stars
    const particleCount = Math.min(window.innerWidth > 768 ? 35 : 15, 40);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 2,
      speedY: -(Math.random() * 0.4 + 0.15),
      speedX: (Math.random() - 0.5) * 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.5 + 0.3,
      color: Math.random() > 0.3 ? '#E60012' : '#FFFFFF'
    }));

    // Draw 4-point star
    const drawStar = (cx, cy, spikes, outerRadius, innerRadius, fillStyle, rotation) => {
      let rot = (Math.PI / 2) * 3 + rotation;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fillStyle = fillStyle;
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;

        ctx.globalAlpha = p.opacity;
        drawStar(p.x, p.y, 4, p.size * 2, p.size * 0.7, p.color, p.rotation);
      });
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0A0A0C]">
      {/* Persona 5 Red Star Animated Background Video Layer (Subtle & Non-Distracting) */}
      <video
        src="/animation/Red Star Looping Background.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-12 pointer-events-none"
      />

      {/* Base Halftone Texture */}
      <div className="absolute inset-0 p5-halftone opacity-30 pointer-events-none"></div>

      {/* Soft Ambient Ray Shards */}
      <div 
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#E60012]/10 blur-[150px] rounded-full pointer-events-none"
      />
      <div 
        className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-[#E60012]/10 blur-[150px] rounded-full pointer-events-none"
      />
      <div 
        className="absolute -bottom-40 left-10 w-[500px] h-[500px] bg-[#E60012]/10 blur-[140px] rounded-full pointer-events-none"
      />

      {/* Floating Canvas Stars */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
}
