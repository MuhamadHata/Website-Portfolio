import React from 'react';
import { playP5Click, playP5Hover } from '../utils/soundEffects';
import { ArrowUp, Heart, Shield, Star } from 'lucide-react';

export default function FooterPersona({ onNavigate }) {
  const scrollToTop = () => {
    playP5Click();
    if (onNavigate) {
      onNavigate('hero');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#0A0A0C]/90 backdrop-blur-md border-t-2 border-zinc-800 text-zinc-400 py-12 overflow-hidden">
      
      {/* Background Halftone screentone */}
      <div className="absolute inset-0 p5-halftone opacity-30 pointer-events-none"></div>

      {/* Red Warning Accent Strip */}
      <div className="h-1.5 w-full p5-caution-strip mb-8 relative z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-800/80">

          {/* Left Brand info */}
          <div className="text-center md:text-left">
            <div className="font-bebas text-3xl text-white tracking-widest flex items-center justify-center md:justify-start gap-2">
              <span>MUHAMAD HATA</span>
              <span className="text-[#E60012]">///</span>
              <span className="text-sm font-mono text-zinc-400 font-bold">PORTFOLIO</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-md leading-relaxed text-center md:text-left font-sans">
              Fullstack Mobile Developer, Website Developer & AI Engineer. Mahasiswa Teknik Komputer UPI & Peneliti Magang Aktif di BRIN PR KAKS.
            </p>
          </div>

          {/* Center Badges with Persona 5 "Take Your Time" Motif */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
            <div className="bg-black text-white border border-[#E60012] px-3 py-1 skew-x-[-6deg] flex items-center gap-2 shadow-[2px_2px_0px_#000]">
              <svg viewBox="0 0 36 28" className="w-5 h-4 flex-shrink-0" fill="none">
                {/* Crown */}
                <path d="M10 22 L12 6 C12 4, 24 4, 24 6 L26 22 Z" fill="#FFFFFF" />
                {/* Red Band */}
                <path d="M10.5 17 L11 22 L25 22 L25.5 17 Z" fill="#E60012" />
                {/* Brim */}
                <path d="M3 22 C10 26, 26 26, 33 22 C35 21, 35 24, 32 25 C25 28, 11 28, 4 25 C1 24, 1 21, 3 22 Z" fill="#E60012" />
              </svg>
              <span className="font-bebas text-base tracking-wider text-[#FFE600]">TAKE YOUR TIME</span>
            </div>
            <span className="bg-[#14141C] text-zinc-300 border border-zinc-700 px-3 py-1 skew-x-[-6deg]">
              ★ UPI TEKNIK KOMPUTER
            </span>
            <span className="bg-[#14141C] text-[#FFE600] border border-zinc-700 px-3 py-1 skew-x-[-6deg]">
              ★ BRIN PR KAKS
            </span>
          </div>

          {/* Back to Top */}
          <div>
            <button
              onClick={scrollToTop}
              onMouseEnter={playP5Hover}
              className="p5-btn bg-zinc-900 text-zinc-300 hover:bg-[#E60012] hover:text-white text-xs py-2 px-4 inline-flex items-center gap-2 border border-zinc-700 font-bebas text-sm tracking-wider"
            >
              <span className="flex items-center gap-1.5">
                <ArrowUp size={15} />
                <span>KEMBALI KE ATAS</span>
              </span>
            </button>
          </div>

        </div>

        {/* Copyright notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-3 text-center sm:text-left font-sans">
          <div>
            © {new Date().getFullYear()} Muhamad Hata. Seluruh hak cipta dilindungi undang-undang.
          </div>
        </div>

      </div>
    </footer>
  );
}
