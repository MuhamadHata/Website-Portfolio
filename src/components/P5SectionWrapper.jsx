import React from 'react';
import P5SectionDivider from './P5SectionDivider';

export default function P5SectionWrapper({ 
  watermark = '', 
  children, 
  className = '',
  divider = false,
  command = '',
  title = '',
  badgeText = '',
  theme = 'red',
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Persona 5 Giant Watermark Text in Background */}
      {watermark && (
        <div className="absolute top-6 right-4 sm:right-12 pointer-events-none select-none z-0 overflow-hidden">
          <div className="font-bebas text-7xl sm:text-9xl lg:text-[11rem] text-white/[0.025] tracking-widest leading-none skew-x-[-12deg] font-black">
            {watermark}
          </div>
        </div>
      )}

      {/* Persona 5 Animated Section Transition Bar */}
      {divider ? (
        <P5SectionDivider 
          command={command} 
          title={title} 
          badgeText={badgeText} 
          theme={theme} 
        />
      ) : (
        /* Top Slash Accent Bar for Hero / Sections without divider */
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E60012] to-transparent z-20 pointer-events-none" />
      )}

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

