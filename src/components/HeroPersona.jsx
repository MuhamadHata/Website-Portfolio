import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { playP5Click, playP5Hover, playP5Slash } from '../utils/soundEffects';
import { ArrowDownRight, Award, ChevronRight, Download, FileText, Send, Sparkles, Star } from 'lucide-react';
import P5ConcentricStarsCluster, { P5SingleStar } from './P5ConcentricStars';

export default function HeroPersona({ onNavigate }) {
  const letters = "MUHAMAD HATA".split("");

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center pt-20 sm:pt-24 pb-20 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-8 lg:pb-0">

          {/* Left Column: Hero Content & Typography */}
          <div className="lg:col-span-8 flex flex-col justify-center">

            {/* Top Badge Banner */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="bg-[#E60012] text-white font-bebas tracking-widest text-sm px-3 py-1 skew-x-[-10deg] shadow-[3px_3px_0px_#000] flex items-center gap-1.5">
                <Star size={13} className="fill-white" />
                <span>CODENAME: THE ARCHITECT</span>
              </span>
              <span className="bg-white text-black font-bebas tracking-wider text-sm px-2.5 py-1 skew-x-[-10deg] shadow-[3px_3px_0px_#000] hidden sm:inline-block font-bold">
                SYSTEM ONLINE
              </span>
            </div>

            {/* Ransom Note Style Name Header */}
            <div className="mb-4">
              <div className="p5-block-title flex-wrap">
                {letters.map((char, index) => {
                  if (char === " ") {
                    return <span key={index} className="w-4"></span>;
                  }
                  return (
                    <span
                      key={index}
                      onMouseEnter={playP5Hover}
                      className="p5-block-letter text-3xl sm:text-5xl lg:text-6xl cursor-default"
                      style={{
                        '--rot': `${((index % 5) - 2) * 2}deg`
                      }}
                    >
                      {char}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Roles Banner (Persona 5 Slanted Ribbon) */}
            <div className="relative my-3">
              <div className="bg-[#E60012] text-white font-bebas text-xl sm:text-2xl lg:text-3xl px-4 py-2 skew-x-[-8deg] shadow-[6px_6px_0px_#000] inline-block border-2 border-white">
                <span className="block skew-x-[8deg] tracking-wide">
                  FULLSTACK MOBILE DEVELOPER <span className="text-[#FFE600] font-mono">/</span> WEB DEVELOPER <span className="text-[#FFE600] font-mono">/</span> AI ENGINEER
                </span>
              </div>
            </div>

            {/* Academic & Research Credentials Tags */}
            <div className="flex flex-wrap gap-2.5 my-4">
              <div className="bg-[#14141A] border-l-4 border-[#00F0FF] px-3.5 py-2 skew-x-[-6deg] shadow-[4px_4px_0px_#000]">
                <div className="skew-x-[6deg] text-xs font-mono text-[#00F0FF] uppercase tracking-wider font-bold">
                  Akademik S1
                </div>
                <div className="skew-x-[6deg] text-sm font-semibold text-white">
                  Teknik Komputer — UPI Kampus Cibiru
                </div>
              </div>

              <div className="bg-[#14141A] border-l-4 border-[#FFE600] px-3.5 py-2 skew-x-[-6deg] shadow-[4px_4px_0px_#000]">
                <div className="skew-x-[6deg] text-xs font-mono text-[#FFE600] uppercase tracking-wider font-bold">
                  Peneliti Magang Aktif
                </div>
                <div className="skew-x-[6deg] text-sm font-semibold text-white">
                  BRIN — PR Kecerdasan Artifisial & Keamanan Siber
                </div>
              </div>
            </div>

            {/* Professional Summary (Bahasa Baku & Formal with Clean Justify) */}
            <p className="text-zinc-200 text-sm sm:text-base text-justify leading-relaxed tracking-normal my-3 bg-[#0F0F14]/90 p-4 sm:p-5 border border-zinc-800 shadow-[4px_4px_0px_#000] relative [text-align-last:left]">
              <span className="absolute -top-2 -left-2 w-3 h-3 bg-[#E60012]"></span>
              {personalInfo.bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3.5 mt-4">
              <button
                onClick={() => {
                  playP5Slash();
                  onNavigate('projects');
                }}
                onMouseEnter={playP5Hover}
                className="p5-btn bg-[#E60012] text-white hover:bg-white hover:text-[#E60012] w-full sm:w-auto text-center justify-center font-bebas text-lg tracking-wider"
              >
                <span className="flex items-center justify-center gap-2">
                  <Sparkles size={18} />
                  <span>JELAJAHI MISI PROYEK</span>
                </span>
              </button>

              <button
                onClick={() => {
                  playP5Click();
                  onNavigate('contact');
                }}
                onMouseEnter={playP5Hover}
                className="p5-btn p5-btn-secondary flex-1 sm:flex-initial text-center justify-center font-bebas text-lg tracking-wider"
              >
                <span className="flex items-center justify-center gap-2">
                  <Send size={16} className="text-[#E60012]" />
                  <span>HUBUNGI SAYA</span>
                </span>
              </button>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playP5Click}
                onMouseEnter={playP5Hover}
                className="px-4 py-2.5 bg-[#0F0F14] text-zinc-300 hover:text-white border border-zinc-700 font-bebas text-lg tracking-wider skew-x-[-8deg] shadow-[3px_3px_0px_#000] hover:border-[#E60012] transition-colors inline-flex items-center justify-center gap-2 flex-1 sm:flex-initial text-center"
              >
                <span className="skew-x-[8deg] flex items-center justify-center gap-1.5">
                  <FileText size={16} className="text-[#FFE600]" />
                  <span>GITHUB PROFILE</span>
                </span>
              </a>
            </div>

          </div>

          {/* Right Column: Persona 5 Themed Portrait Card (Compact & Balanced) */}
          <div className="lg:col-span-4 flex justify-center items-center">
            <div className="relative w-full max-w-[260px] sm:max-w-[280px]">

              {/* Decorative Background Polygon Frame */}
              <div className="absolute inset-0 bg-[#E60012] skew-x-[-6deg] rotate-2 shadow-[8px_8px_0px_#000] border-2 border-black"></div>
              <div className="absolute -inset-1.5 bg-black skew-x-[-4deg] -rotate-1 border border-zinc-700 opacity-60"></div>

              {/* Halftone Screentone Backing */}
              <div className="absolute inset-0 p5-halftone-red opacity-80 skew-x-[-6deg] rotate-2"></div>

              {/* Main Photo Card Container */}
              <div className="relative bg-[#111116] border-[3px] border-white p-2.5 skew-x-[-6deg] shadow-[6px_6px_0px_#000] overflow-hidden">

                {/* Top Caution Tag */}
                <div className="flex items-center justify-between bg-black text-white font-p5-menu px-2.5 py-0.5 text-xs border-b-2 border-[#E60012] mb-2">
                  <span className="flex items-center gap-1 text-[#FFE600]">
                    <Star size={12} className="fill-[#FFE600]" />
                    <span>CONFIDANT STATUS</span>
                  </span>
                  <span className="text-zinc-400 font-p5-num text-[11px]">LVL. 99</span>
                </div>

                {/* The Real User Photo - Compact & Stylized */}
                <div className="relative overflow-hidden h-60 sm:h-64 w-full bg-black border border-black group">
                  <img
                    src={personalInfo.photo}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-top filter contrast-110 saturate-105 group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "/Foto PAS Hata.jpeg";
                    }}
                  />

                  {/* Persona 5 Comic Overlay Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>

                  {/* Red Corner Badge */}
                  <div className="absolute bottom-1.5 right-1.5 bg-[#E60012] text-white font-p5-title px-2.5 py-0.5 text-xs skew-x-[-8deg] shadow-[2px_2px_0px_#000] border border-white">
                    <span className="block skew-x-[8deg] tracking-wider">
                      MUHAMAD HATA
                    </span>
                  </div>
                </div>

                {/* Card Footer Bar */}
                <div className="mt-2 text-center font-mono text-xs">
                  <div className="bg-[#1C1C24] py-1.5 px-2 border border-zinc-700">
                    <div className="text-zinc-400 text-[9px] font-sans font-bold uppercase">BIDANG KEAHLIAN</div>
                    <div className="text-white text-xs tracking-wider font-semibold">WEB, MOBILE & AI ENGINEERING</div>
                  </div>
                </div>

              </div>

              {/* Concentric Starburst Cluster Behind Card (from Video 1 & 2) */}
              <div className="absolute -bottom-10 -left-12 z-0 hidden sm:block">
                <P5ConcentricStarsCluster opacity="opacity-90" />
              </div>

              {/* Top Right Concentric Star Accent */}
              <div className="absolute -top-6 -right-6 z-20">
                <P5SingleStar size={54} />
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Morgana Bus Mementos Patrol Badge */}
      <div className="hidden md:flex items-center gap-2.5 absolute bottom-11 right-6 z-20 bg-black/95 border-2 border-white px-3 py-1 skew-x-[-8deg] shadow-[4px_4px_0px_#E60012]">
        <div className="w-10 h-6 overflow-hidden rounded-sm relative flex items-center justify-center bg-black border border-zinc-800">
          <video
            src="/animation/Persona 5 - Looping morgana bus.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-125"
          />
        </div>
        <span className="font-mono text-[11px] text-[#FFE600] font-bold tracking-wider skew-x-[8deg]">
          MEMENTOS PATROL // BUS ACTIVE
        </span>
      </div>

      {/* Marquee Bottom Accent Banner (Seamless Infinite Loop with Zero Stutter) */}
      <div className="absolute bottom-0 left-0 right-0 h-9 bg-black border-y-2 border-[#E60012] overflow-hidden flex items-center select-none z-20">
        <div className="flex shrink-0 items-center animate-marquee whitespace-nowrap font-bebas text-base sm:text-lg tracking-widest text-zinc-200">
          <span className="mx-5 text-[#E60012] font-bold">★</span>
          <span>FULLSTACK MOBILE DEVELOPER</span>
          <span className="mx-5 text-[#FFE600] font-mono font-bold">///</span>
          <span>AI & COMPUTER VISION RESEARCHER</span>
          <span className="mx-5 text-[#E60012] font-bold">★</span>
          <span className="text-white font-semibold">WEBSITE ARCHITECT</span>
          <span className="mx-5 text-[#FFE600] font-mono font-bold">///</span>
          <span>UPI COMPUTER ENGINEERING</span>
          <span className="mx-5 text-[#E60012] font-bold">★</span>
          <span>BRIN RESEARCH INTERNSHIP</span>
          <span className="mx-5 text-[#FFE600] font-mono font-bold">///</span>
          <span>FLUTTER • NEXT.JS • YOLOV8 • SUPABASE</span>
        </div>

        <div className="flex shrink-0 items-center animate-marquee whitespace-nowrap font-bebas text-base sm:text-lg tracking-widest text-zinc-200" aria-hidden="true">
          <span className="mx-5 text-[#E60012] font-bold">★</span>
          <span>FULLSTACK MOBILE DEVELOPER</span>
          <span className="mx-5 text-[#FFE600] font-mono font-bold">///</span>
          <span>AI & COMPUTER VISION RESEARCHER</span>
          <span className="mx-5 text-[#E60012] font-bold">★</span>
          <span className="text-white font-semibold">WEBSITE ARCHITECT</span>
          <span className="mx-5 text-[#FFE600] font-mono font-bold">///</span>
          <span>UPI COMPUTER ENGINEERING</span>
          <span className="mx-5 text-[#E60012] font-bold">★</span>
          <span>BRIN RESEARCH INTERNSHIP</span>
          <span className="mx-5 text-[#FFE600] font-mono font-bold">///</span>
          <span>FLUTTER • NEXT.JS • YOLOV8 • SUPABASE</span>
        </div>
      </div>
    </section>
  );
}
