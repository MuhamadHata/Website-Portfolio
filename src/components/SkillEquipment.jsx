import React, { useState } from 'react';
import { techStackList } from '../data/portfolioData';
import { playP5Click, playP5Hover, playP5Slash } from '../utils/soundEffects';
import { Cpu, Layers, Shield, Sparkles, Star, Wrench, Zap } from 'lucide-react';

export default function SkillEquipment() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = [
    { id: 'ALL', label: 'SEMUA TEKNOLOGI' },
    { id: 'Mobile', label: 'MOBILE (FLUTTER, DART, KOTLIN)' },
    { id: 'Web', label: 'WEB (NEXT.JS, REACT, TAILWIND)' },
    { id: 'AI', label: 'ARTIFICIAL INTELLIGENCE' },
    { id: 'Backend', label: 'BACKEND (SUPABASE & FIREBASE)' },
    { id: 'IoT', label: 'IOT & C++' },
    { id: 'Tools', label: 'ALAT & WORKFLOW (FIGMA & GIT)' },
  ];

  const filteredStack = selectedCategory === 'ALL'
    ? techStackList
    : techStackList.filter((item) => item.category === selectedCategory);

  const handleCategoryChange = (catId) => {
    playP5Slash();
    setSelectedCategory(catId);
  };

  return (
    <section id="skills" className="relative py-16 sm:py-20 bg-transparent overflow-hidden">

      {/* Background Screentone & Atmospheric Glow matching Home */}
      <div className="absolute inset-0 p5-halftone opacity-40 pointer-events-none"></div>
      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-[#E60012]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-[450px] h-[450px] bg-[#00F0FF]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="mb-10">
          {/* Top Placard ala "MeNu: SySTeM / SeLeCt a CoMMaNd" */}
          <div className="inline-flex items-center gap-2.5 mb-3 skew-x-[-8deg] drop-shadow-[3px_3px_0px_#000]">
            <span className="bg-black text-[#00F0FF] font-mono text-xs px-2.5 py-1 border-2 border-white font-bold">
              COMMAND 03
            </span>
            <div className="bg-white text-black font-mono text-xs sm:text-sm px-3 py-1 border-2 border-black tracking-wider flex items-center gap-1.5 font-bold">
              <span className="text-[#00F0FF]">★</span>
              <span>MeNu: EQuiPMeNT // BATTLE ARSENAL</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 my-2">
            {/* Cyan highlight wedge */}
            <div className="w-0 h-0 border-y-[8px] border-y-transparent border-l-[14px] border-l-[#00F0FF] filter drop-shadow-[2px_2px_0px_#000] flex-shrink-0" />
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-p5-title tracking-wider text-white flex flex-wrap items-center gap-3">
              <span>KEAHLIAN TEKNIS DAN TECH STACK</span>
              <span className="text-[#E60012] font-mono font-bold">///</span>
              <span className="text-[#FFE600] text-lg sm:text-2xl font-bold hidden sm:inline font-bebas tracking-widest">VERIFIED LOGOS</span>
            </h2>
          </div>
          <div className="h-1.5 w-32 bg-[#E60012] skew-x-[-15deg] my-2.5 shadow-[2px_2px_0px_#000]"></div>

          {/* Persona 5 Themed High-Contrast Subtitle Container */}
          <div className="relative max-w-3xl my-3.5 bg-[#0C0C12]/95 backdrop-blur-md border-y border-r border-zinc-800/90 border-l-4 border-l-[#00F0FF] p-4 skew-x-[-4deg] shadow-[5px_5px_0px_#000]">
            <div className="skew-x-[4deg]">
              <div className="flex items-center gap-2 mb-1 font-mono text-[11px] text-[#00F0FF] font-bold uppercase tracking-wider">
                <span className="text-[#FFE600]">★</span>
                <span>EQUIPMENT BRIEFING // VERIFIED ARSENAL</span>
              </div>
              <p className="text-zinc-100 text-sm sm:text-base leading-relaxed text-justify sm:text-left [text-align-last:left] font-sans">
                Teknologi dan kerangka kerja yang terbukti digunakan secara aktif dalam proyek rekayasa perangkat lunak, sistem cerdas, dan aplikasi multiplatform.
              </p>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                onMouseEnter={playP5Hover}
                className={`px-3.5 py-2 font-bebas text-base tracking-wider skew-x-[-8deg] transition-all border ${isActive
                    ? 'bg-[#E60012] text-white border-white shadow-[5px_5px_0px_#000]'
                    : 'bg-[#14141C] text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-600'
                  }`}
              >
                <span className="skew-x-[8deg] flex items-center gap-1.5">
                  {cat.id === 'ALL' && <Layers size={14} />}
                  {cat.id === 'Mobile' && <Sparkles size={14} className="text-[#00F0FF]" />}
                  {cat.id === 'Web' && <Cpu size={14} className="text-[#FFE600]" />}
                  {cat.id === 'AI' && <Star size={14} className="text-[#E60012]" />}
                  <span>{cat.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredStack.map((tech, idx) => (
            <div
              key={idx}
              onMouseEnter={playP5Hover}
              className="group relative bg-[#12121A] border-2 border-zinc-800 hover:border-[#E60012] p-5 skew-x-[-6deg] transition-all duration-150 hover:-translate-y-1 hover:shadow-[7px_7px_0px_#000] overflow-hidden"
            >
              {/* Corner Tag */}
              <div className="absolute top-0 right-0 bg-black text-[#FFE600] font-mono text-[10px] px-2 py-0.5 border-l border-b border-zinc-700 font-bold">
                {tech.level}
              </div>

              <div className="skew-x-[6deg]">

                {/* Tech Logo & Name Header */}
                <div className="flex items-center gap-3.5 mb-3">
                  {/* Persona 5 High-Contrast Comic Placard Badge */}
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 bg-white border-2 border-black shadow-[4px_4px_0px_#E60012] group-hover:shadow-[4px_4px_0px_#FFE600] group-hover:scale-105 transition-all duration-150 flex items-center justify-center p-2 rounded-sm">
                      {tech.icon ? (
                        <img
                          src={tech.icon}
                          alt={tech.name}
                          className="w-10 h-10 object-contain filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.12)]"
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="w-10 h-10 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]"
                          style={{ color: tech.color || '#000000' }}
                          dangerouslySetInnerHTML={{ __html: tech.svg }}
                        />
                      )}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bebas text-2xl text-white tracking-wide group-hover:text-[#E60012] transition-colors leading-none truncate">
                      {tech.name}
                    </h3>
                    <span className="inline-block mt-0.5 text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                      {tech.category}
                    </span>
                  </div>
                </div>

                {/* Description with Clean Justify */}
                <p className="text-xs text-zinc-300 font-sans text-justify leading-relaxed line-clamp-3 [text-align-last:left]">
                  {tech.description}
                </p>

                {/* Bottom Skill Power Bar */}
                <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase font-bold">
                    POWER RATING
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const filled = tech.level === 'Expert' ? star <= 5 : tech.level === 'Advanced' ? star <= 4 : star <= 3;
                      return (
                        <div
                          key={star}
                          className={`w-2.5 h-2.5 rotate-45 border ${filled ? 'bg-[#E60012] border-[#E60012]' : 'bg-zinc-800 border-zinc-700'
                            }`}
                        />
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Red Hover Slash Accent */}
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-[#E60012] rotate-45 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
