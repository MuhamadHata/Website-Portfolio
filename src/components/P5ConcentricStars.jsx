import React from 'react';

/**
 * Persona 5 Authentic Concentric Star SVG Component
 * Generates nested alternating black/white 5-point stars inspired by Video 1 & Video 2
 */
export function P5SingleStar({ size = 100, className = "", style = {} }) {
  // Generate points for a 5-point star
  const getStarPath = (outerR, innerR) => {
    const points = [];
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI) / 5 - Math.PI / 2;
      const r = i % 2 === 0 ? outerR : innerR;
      const x = r * Math.cos(angle);
      const y = r * Math.sin(angle);
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return `M ${points.join(' L ')} Z`;
  };

  const layers = [
    { outerR: 48, innerR: 19, fill: '#000000', stroke: '#FFFFFF', strokeWidth: 3 },
    { outerR: 38, innerR: 15, fill: '#FFFFFF', stroke: '#000000', strokeWidth: 2.5 },
    { outerR: 28, innerR: 11, fill: '#000000', stroke: '#FFFFFF', strokeWidth: 2 },
    { outerR: 18, innerR: 7,  fill: '#FFFFFF', stroke: '#000000', strokeWidth: 1.5 },
    { outerR: 9,  innerR: 3.5, fill: '#000000', stroke: '#FFFFFF', strokeWidth: 1 },
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="-52 -52 104 104"
      className={`overflow-visible drop-shadow-[4px_4px_0px_rgba(0,0,0,0.8)] ${className}`}
      style={style}
    >
      {layers.map((layer, idx) => (
        <path
          key={idx}
          d={getStarPath(layer.outerR, layer.innerR)}
          fill={layer.fill}
          stroke={layer.stroke}
          strokeWidth={layer.strokeWidth}
          strokeLinejoin="miter"
        />
      ))}
    </svg>
  );
}

/**
 * P5 Starburst Cluster
 * Multiple overlapping concentric stars with varied sizes and rotations
 * as seen on the Camp Menu diagonal split in Video 2
 */
export default function P5ConcentricStarsCluster({ className = "", opacity = "opacity-90" }) {
  return (
    <div className={`relative pointer-events-none select-none ${opacity} ${className}`}>
      {/* Large Star */}
      <div className="absolute -top-6 -left-6 transform -rotate-12 hover:rotate-0 transition-transform duration-300">
        <P5SingleStar size={110} />
      </div>

      {/* Medium Star Overlay */}
      <div className="absolute top-10 left-12 transform rotate-18">
        <P5SingleStar size={75} />
      </div>

      {/* Small Star Accent */}
      <div className="absolute -top-4 left-16 transform -rotate-45">
        <P5SingleStar size={50} />
      </div>

      {/* Tiny Star Tip */}
      <div className="absolute top-20 -left-2 transform rotate-30">
        <P5SingleStar size={38} />
      </div>
    </div>
  );
}
