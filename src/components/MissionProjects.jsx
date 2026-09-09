import React, { useState } from 'react';
import { projectList } from '../data/portfolioData';
import { playP5Click, playP5Hover, playP5Slash } from '../utils/soundEffects';
import ProjectDetailModal from './ProjectDetailModal';
import { ExternalLink, Eye, FolderGit2, Sparkles, Star, Target } from 'lucide-react';
import { GithubIcon } from './BrandIcons';

export default function MissionProjects() {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  const filters = [
    { id: 'ALL', label: 'SEMUA MISI PROYEK' },
    { id: 'Mobile', label: 'MOBILE (3 PROYEK)' },
    { id: 'Web', label: 'WEB (2 PROYEK)' },
    { id: 'IoT', label: 'IOT (1 PROYEK)' },
  ];

  const filteredProjects = selectedFilter === 'ALL'
    ? projectList
    : projectList.filter((p) => p.category === selectedFilter);

  const handleFilterClick = (filterId) => {
    playP5Slash();
    setSelectedFilter(filterId);
  };

  const handleOpenDetail = (project) => {
    playP5Click();
    setActiveProjectModal(project);
  };

  return (
    <section id="projects" className="relative py-16 sm:py-20 bg-transparent overflow-hidden">
      
      {/* Background Halftone & Atmospheric Red Glow matching Home section */}
      <div className="absolute inset-0 p5-halftone opacity-40 pointer-events-none"></div>
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-[#E60012]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-[450px] h-[450px] bg-[#E60012]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12">
          {/* Top Placard ala "MeNu: SySTeM / SeLeCt a CoMMaNd" */}
          <div className="inline-flex items-center gap-2.5 mb-3 skew-x-[-8deg] drop-shadow-[3px_3px_0px_#000]">
            <span className="bg-black text-[#FFE600] font-mono text-xs px-2.5 py-1 border-2 border-white font-bold">
              COMMAND 04
            </span>
            <div className="bg-white text-black font-mono text-xs sm:text-sm px-3 py-1 border-2 border-black tracking-wider flex items-center gap-1.5 font-bold">
              <span className="text-[#E60012]">★</span>
              <span>MeNu: MiSSioNS // GITHUB TARGETS</span>
            </div>
          </div>

          {/* Main Title Row */}
          <div className="flex items-center gap-2.5 my-2">
            {/* Cyan highlight wedge */}
            <div className="w-0 h-0 border-y-[8px] border-y-transparent border-l-[14px] border-l-[#00F0FF] filter drop-shadow-[2px_2px_0px_#000] flex-shrink-0" />
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-p5-title tracking-wider text-white flex flex-wrap items-center gap-3">
              <span>KOLEKSI PROYEK GITHUB</span>
              <span className="text-[#E60012] font-mono font-bold">///</span>
              <span className="text-[#FFE600] text-lg sm:text-2xl font-bold hidden sm:inline font-bebas tracking-widest">TARGET ARCHIVE</span>
            </h2>
          </div>
          <div className="h-1.5 w-32 bg-[#E60012] skew-x-[-15deg] my-2.5 shadow-[2px_2px_0px_#000]"></div>

          {/* Persona 5 Themed High-Contrast Subtitle Container */}
          <div className="relative max-w-3xl my-3.5 bg-[#0C0C12]/95 backdrop-blur-md border-y border-r border-zinc-800/90 border-l-4 border-l-[#FFE600] p-4 skew-x-[-4deg] shadow-[5px_5px_0px_#000]">
            <div className="skew-x-[4deg]">
              <div className="flex items-center gap-2 mb-1 font-mono text-[11px] text-[#FFE600] font-bold uppercase tracking-wider">
                <span className="text-[#E60012]">★</span>
                <span>MISSION ARCHIVE // REPOSITORIES OVERVIEW</span>
              </div>
              <p className="text-zinc-100 text-sm sm:text-base leading-relaxed text-justify sm:text-left [text-align-last:left] font-sans">
                Daftar aplikasi dan sistem riil dari repositori GitHub Muhamad Hata yang mencakup integrasi Artificial Intelligence terapan, mobile multiplatform, platform web, dan Internet of Things.
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {filters.map((f) => {
            const isActive = selectedFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => handleFilterClick(f.id)}
                onMouseEnter={playP5Hover}
                className={`px-3.5 py-2 font-bebas text-base tracking-wider skew-x-[-8deg] transition-all border ${
                  isActive
                    ? 'bg-[#E60012] text-white border-white shadow-[5px_5px_0px_#000]'
                    : 'bg-[#151520] text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-600'
                }`}
              >
                <span className="skew-x-[8deg] flex items-center gap-1.5">
                  <Star size={13} className={isActive ? 'fill-white text-white' : 'text-zinc-600'} />
                  <span>{f.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`group relative bg-[#12121A] border-2 transition-all duration-200 skew-x-0 sm:skew-x-[-4deg] flex flex-col justify-between ${
                project.featured
                  ? 'border-[#E60012] shadow-[6px_6px_0px_#000] sm:shadow-[8px_8px_0px_#000]'
                  : 'border-zinc-800 hover:border-zinc-600 shadow-[4px_4px_0px_#000] sm:shadow-[5px_5px_0px_#000]'
              }`}
            >
              
              {/* Project Screenshot Thumbnail Preview */}
              {project.screenshots && project.screenshots.length > 0 && (
                <div 
                  onClick={() => handleOpenDetail(project)}
                  className="relative w-full h-44 sm:h-48 bg-[#08080C] overflow-hidden border-b-2 border-zinc-800/90 cursor-pointer group/img"
                  title="Klik untuk melihat berkas detail teknis"
                >
                  <img 
                    src={project.screenshots[0].url} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/img:scale-105 opacity-90 group-hover/img:opacity-100" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12121A] via-transparent to-transparent pointer-events-none" />
                  
                  {/* Screenshot Count Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/85 backdrop-blur-sm text-[#FFE600] font-mono text-[10px] px-2 py-0.5 border border-zinc-700 font-bold flex items-center gap-1 shadow-[2px_2px_0px_#000]">
                    <Star size={10} className="fill-[#FFE600]" />
                    <span>{project.screenshots.length} SCREENSHOTS</span>
                  </div>
                </div>
              )}

              {/* Card Header & Content */}
              <div className="p-4 sm:p-5 skew-x-0 sm:skew-x-[4deg] flex-1 flex flex-col justify-between">
                <div>
                  {/* Top Badge Info */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 border ${
                      project.featured
                        ? 'bg-[#E60012] text-white border-white'
                        : 'bg-black text-[#FFE600] border-zinc-700'
                    }`}>
                      {project.rankBadge}
                    </span>

                    <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>

                {/* Title (Crisp, Bold & Highly Readable) */}
                <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide group-hover:text-[#E60012] transition-colors leading-tight mb-1">
                  {project.title}
                </h3>
                
                <p className="text-xs font-semibold text-[#FFE600] mb-3 line-clamp-1 font-sans">
                  {project.subtitle}
                </p>

                {/* Description with Clean Justify */}
                <p className="text-xs sm:text-sm text-zinc-300 font-sans text-justify leading-relaxed line-clamp-3 mb-4 [text-align-last:left]">
                  {project.summary}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {project.techStack.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="bg-black/90 text-zinc-300 border border-zinc-800 text-[11px] font-mono px-2 py-0.5 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-[11px] font-mono text-[#E60012] px-1 font-bold">
                      +{project.techStack.length - 4} more
                    </span>
                  )}
                  </div>
                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="p-3.5 sm:p-4 bg-black/60 border-t border-zinc-800 skew-x-0 sm:skew-x-[4deg] flex items-center justify-between gap-3">
                <button
                  onClick={() => handleOpenDetail(project)}
                  onMouseEnter={playP5Hover}
                  className="p5-btn bg-white text-black hover:bg-[#E60012] hover:text-white text-xs py-1.5 px-3 flex-1 font-bebas text-sm tracking-wider"
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <Eye size={14} />
                    <span>DETAIL TEKNIS</span>
                  </span>
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playP5Click}
                  onMouseEnter={playP5Hover}
                  title="Lihat Repositori di GitHub"
                  className="p-2 bg-[#1C1C24] text-zinc-300 hover:text-white hover:bg-[#E60012] border border-zinc-700 hover:border-black transition-colors shadow-[2px_2px_0px_#000]"
                >
                  <GithubIcon size={18} />
                </a>
              </div>

              {/* Corner Tag Motif */}
              {project.featured && (
                <div className="absolute -top-3 -right-3 bg-[#FFE600] text-black font-bebas text-xs px-2 py-0.5 rotate-12 shadow-[2px_2px_0px_#000] border border-black font-bold">
                  FEATURED
                </div>
              )}

            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal Component */}
      <ProjectDetailModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />

    </section>
  );
}
