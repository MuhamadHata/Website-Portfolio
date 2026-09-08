import React, { useEffect, useRef } from 'react';

/**
 * P5ChromaKeyVideo
 * Renders video with real-time Chroma Key removal of green/blue screens
 * and native WebM alpha channel support.
 */
export default function P5ChromaKeyVideo({
  srcWebm,
  srcMp4,
  keyColor = 'green', // 'green' | 'blue'
  className = '',
  autoPlay = true,
  loop = false,
  muted = true,
  onEnded,
  tolerance = 0.35, // Chroma sensitivity
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let animId;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const processFrame = () => {
      if (video.paused || video.ended) {
        if (!loop && video.ended && onEnded) {
          onEnded();
        }
        return;
      }

      if (video.readyState >= 2) {
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth || 1920;
          canvas.height = video.videoHeight || 1080;
        }

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const l = frame.data.length / 4;

        for (let i = 0; i < l; i++) {
          const r = frame.data[i * 4 + 0];
          const g = frame.data[i * 4 + 1];
          const b = frame.data[i * 4 + 2];

          if (keyColor === 'green') {
            // High-precision green chroma key removal with soft edge feathering
            if (g > 65 && g > r * 1.25 && g > b * 1.25) {
              const diff = (g - Math.max(r, b)) / 255;
              if (diff > 0.15) {
                frame.data[i * 4 + 3] = 0; // completely transparent
              } else {
                frame.data[i * 4 + 3] = Math.max(0, 255 * (1 - diff / 0.15));
              }
            }
          } else if (keyColor === 'blue') {
            // Blue chroma key
            if (b > 65 && b > r * 1.25 && b > g * 1.25) {
              const diff = (b - Math.max(r, g)) / 255;
              if (diff > 0.15) {
                frame.data[i * 4 + 3] = 0;
              } else {
                frame.data[i * 4 + 3] = Math.max(0, 255 * (1 - diff / 0.15));
              }
            }
          }
        }
        ctx.putImageData(frame, 0, 0);
      }

      animId = requestAnimationFrame(processFrame);
    };

    const handlePlay = () => {
      animId = requestAnimationFrame(processFrame);
    };

    video.addEventListener('play', handlePlay);
    if (autoPlay) {
      video.play().catch(() => {});
    }

    return () => {
      video.removeEventListener('play', handlePlay);
      cancelAnimationFrame(animId);
    };
  }, [keyColor, loop, onEnded, autoPlay]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Hidden processing video */}
      <video
        ref={videoRef}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        crossOrigin="anonymous"
        className="hidden"
        onEnded={onEnded}
      >
        {srcWebm && <source src={srcWebm} type="video/webm" />}
        {srcMp4 && <source src={srcMp4} type="video/mp4" />}
      </video>

      {/* Real-time Chroma Keyed Transparent Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-none"
      />
    </div>
  );
}
