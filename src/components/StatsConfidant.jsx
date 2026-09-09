import React, { useState } from 'react';
import { educationAndExperience } from '../data/portfolioData';
import { playP5Click, playP5Hover } from '../utils/soundEffects';
import { Award, BookOpen, Building2, CheckCircle2, ChevronRight, GraduationCap, MapPin, ShieldCheck, Sparkles, Star } from 'lucide-react';

export default function StatsConfidant() {
  const [selectedId, setSelectedId] = useState(educationAndExperience[0].id);

  const selectedItem = educationAndExperience.find((item) => item.id === selectedId) || educationAndExperience[0];

  return (
    <section id="confidant" className="relative py-16 sm:py-20 bg-transparent overflow-hidden">

      {/* Background Halftone & Atmospheric Glow matching Home section */}
      <div className="absolute inset-0 p5-halftone opacity-40 pointer-events-none"></div>
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-[#E60012]/15 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-40 w-[450px] h-[450px] bg-[#E60012]/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="mb-12">
          {/* Top Placard ala "MeNu: SySTeM / SeLeCt a CoMMaNd" */}
          <div className="inline-flex items-center gap-2.5 mb-3 skew-x-[-8deg] drop-shadow-[3px_3px_0px_#000]">
            <span className="bg-black text-[#FFE600] font-mono text-xs px-2.5 py-1 border-2 border-white font-bold">
              COMMAND 02
            </span>
            <div className="bg-white text-black font-mono text-xs sm:text-sm px-3 py-1 border-2 border-black tracking-wider flex items-center gap-1.5 font-bold">
              <span className="text-[#E60012]">★</span>
              <span>MeNu: CoNFiDaNT // ACADEMIC DOSSIER</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 my-2">
            {/* Cyan highlight wedge */}
            <div className="w-0 h-0 border-y-[8px] border-y-transparent border-l-[14px] border-l-[#00F0FF] filter drop-shadow-[2px_2px_0px_#000] flex-shrink-0" />
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-p5-title tracking-wider text-white flex flex-wrap items-center gap-3">
              <span>RIWAYAT RISET DAN PENDIDIKAN</span>
              <span className="text-[#E60012] font-mono font-bold">///</span>
              <span className="text-[#FFE600] text-lg sm:text-2xl font-bold hidden sm:inline font-bebas tracking-widest">STATUS OVERVIEW</span>
            </h2>
          </div>
          <div className="h-1.5 w-32 bg-[#E60012] skew-x-[-15deg] my-2.5 shadow-[2px_2px_0px_#000]"></div>

          {/* Persona 5 Themed High-Contrast Subtitle Container */}
          <div className="relative max-w-3xl my-3.5 bg-[#0C0C12]/95 backdrop-blur-md border-y border-r border-zinc-800/90 border-l-4 border-l-[#E60012] p-4 skew-x-[-4deg] shadow-[5px_5px_0px_#000]">
            <div className="skew-x-[4deg]">
              <div className="flex items-center gap-2 mb-1 font-mono text-[11px] text-[#FFE600] font-bold uppercase tracking-wider">
                <span className="text-[#E60012]">★</span>
                <span>DOSSIER BRIEFING // ACADEMIC & RESEARCH</span>
              </div>
              <p className="text-zinc-100 text-sm sm:text-base leading-relaxed text-justify sm:text-left [text-align-last:left] font-sans">
                Kombinasi fondasi akademik teknik komputer dari Universitas Pendidikan Indonesia dan riset penelitian di Badan Riset dan Inovasi Nasional (BRIN).
              </p>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* Left Column: Confidant Cards List */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {educationAndExperience.map((item) => {
              const isSelected = selectedId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    playP5Click();
                    setSelectedId(item.id);
                  }}
                  onMouseEnter={playP5Hover}
                  className={`cursor-pointer p-4 sm:p-5 transition-all skew-x-0 sm:skew-x-[-6deg] border-2 relative ${isSelected
                      ? 'bg-[#E60012] text-white border-white shadow-[6px_6px_0px_#000] sm:shadow-[8px_8px_0px_#000]'
                      : 'bg-[#14141C]/90 backdrop-blur-sm text-zinc-300 border-zinc-800 hover:border-zinc-600 shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000]'
                    }`}
                >
                  <div className="skew-x-0 sm:skew-x-[6deg]">

                    {/* Top Row Header */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 border ${isSelected
                          ? 'bg-black text-[#FFE600] border-black'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                        }`}>
                        {item.badge}
                      </span>
                      <span className={`text-xs font-mono font-bold ${isSelected ? 'text-zinc-200' : 'text-zinc-500'}`}>
                        {item.period}
                      </span>
                    </div>

                    {/* Role / Institution */}
                    <h3 className={`text-2xl font-bebas tracking-wide leading-tight ${isSelected ? 'text-white' : 'text-zinc-100'}`}>
                      {item.institution}
                    </h3>
                    <div className={`text-sm font-semibold flex items-center gap-1.5 mt-0.5 font-sans ${isSelected ? 'text-[#FFE600]' : 'text-[#E60012]'}`}>
                      {item.type === 'experience' ? <Building2 size={15} /> : <GraduationCap size={15} />}
                      <span>{item.role}</span>
                    </div>
                    <div className={`text-xs mt-1 font-sans ${isSelected ? 'text-zinc-200' : 'text-zinc-400'}`}>
                      {item.unit}
                    </div>

                  </div>

                  {/* Selected Indicator Arrow */}
                  {isSelected && (
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-[#E60012] hidden lg:block"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Dossier Panel */}
          <div className="lg:col-span-7">
            <div className="bg-[#15151E]/95 backdrop-blur-md border-4 border-black p-4 sm:p-8 skew-x-0 sm:skew-x-[-4deg] shadow-[6px_6px_0px_#000] sm:shadow-[10px_10px_0px_#000] relative">
              <div className="skew-x-0 sm:skew-x-[4deg]">

                {/* Dossier Header Banner (Mobile Adaptive Stacking) */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b-2 border-zinc-800 pb-4 mb-5">
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-mono text-[#E60012] uppercase tracking-wider font-bold">
                      {selectedItem.category}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bebas text-white tracking-wide mt-1 leading-tight">
                      {selectedItem.institution}
                    </h3>
                    <div className="mt-1 font-sans">
                      <div className="text-sm sm:text-base font-semibold text-[#FFE600] flex items-center gap-1.5">
                        {selectedItem.type === 'experience' ? (
                          <Building2 size={15} className="flex-shrink-0" />
                        ) : (
                          <GraduationCap size={15} className="flex-shrink-0" />
                        )}
                        <span>{selectedItem.role}</span>
                      </div>
                      <div className="text-xs sm:text-sm text-zinc-300 font-normal mt-0.5 leading-relaxed">
                        {selectedItem.unit}
                      </div>
                    </div>
                  </div>

                  <div className="self-start sm:self-auto bg-black text-[#FFE600] font-mono text-xs px-3 py-1.5 border border-zinc-800 flex items-center gap-1.5 font-bold flex-shrink-0">
                    <MapPin size={13} className="text-[#E60012]" />
                    <span>{selectedItem.location}</span>
                  </div>
                </div>

                {/* Narrative Summary */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono text-zinc-400 tracking-wider mb-2 uppercase font-bold">
                    RINGKASAN TUGAS & KOMPETENSI
                  </h4>
                  <p className="text-zinc-200 text-sm sm:text-base text-justify leading-relaxed bg-black/50 p-4 sm:p-5 border-l-4 border-[#E60012] [text-align-last:left] font-sans">
                    {selectedItem.description}
                  </p>
                </div>

                {/* Key Deliverables / Achievements */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono text-zinc-400 tracking-wider mb-3 uppercase flex items-center gap-1.5 font-bold">
                    <Award size={14} className="text-[#FFE600]" />
                    <span>PENCAPAIAN UTAMA & IMPLEMENTASI</span>
                  </h4>
                  <div className="space-y-2.5">
                    {selectedItem.achievements.map((ach, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-[#1A1A26] p-3 border border-zinc-800">
                        <CheckCircle2 size={18} className="text-[#E60012] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-zinc-200 text-justify leading-relaxed [text-align-last:left] font-sans">
                          {ach}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Focus Skill Badges */}
                <div>
                  <h4 className="text-xs font-mono text-zinc-400 tracking-wider mb-2.5 uppercase font-bold">
                    FOKUS BIDANG TEKNOLOGI
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.techTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-black text-zinc-300 border border-zinc-700 font-mono text-xs px-3 py-1 font-semibold"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
