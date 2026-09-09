import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { playP5Click, playP5Hover, playP5Slash } from '../utils/soundEffects';
import { 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  FileCode, 
  Image as ImageIcon, 
  Layers, 
  Sparkles, 
  Star, 
  Terminal, 
  X 
} from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { P5SingleStar } from './P5ConcentricStars';
import P5ProjectDossierTear from './P5ProjectDossierTear';

export default function ProjectDetailModal({ project, onClose }) {
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('showcase'); // 'showcase' | 'architecture'
  const [showDossierTear, setShowDossierTear] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  // Lock body scroll, hide top navbar, and handle keyboard navigation
  useEffect(() => {
    if (project) {
      setActiveScreenshotIdx(0);
      setActiveTab('showcase');
      setShowDossierTear(true);
      setIsClosing(false);
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
      if (project?.screenshots?.length > 1) {
        if (e.key === 'ArrowLeft') {
          playP5Click();
          setActiveScreenshotIdx((prev) => (prev === 0 ? project.screenshots.length - 1 : prev - 1));
        } else if (e.key === 'ArrowRight') {
          playP5Click();
          setActiveScreenshotIdx((prev) => (prev === project.screenshots.length - 1 ? 0 : prev + 1));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [project]);

  if (!project) return null;

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    playP5Slash();

    // Smooth, cinematic Persona 5 comic exit (500ms)
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const screenshots = project.screenshots || [];
  const hasScreenshots = screenshots.length > 0;
  const currentScreenshot = hasScreenshots ? screenshots[activeScreenshotIdx] : null;

  const handlePrevScreenshot = () => {
    playP5Click();
    setActiveScreenshotIdx((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  const handleNextScreenshot = () => {
    playP5Click();
    setActiveScreenshotIdx((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  const modalContent = (
    <div className="fixed inset-0 w-screen h-screen z-[999999] pointer-events-auto select-none" style={{ zIndex: 999999, perspective: '1400px' }}>
      
      {/* 1. Modal Main Dossier Window (Smooth Persona 5 Comic Reveal & Exit) */}
      <motion.div 
        initial={{ scale: 0.95, rotateZ: -1, opacity: 0 }}
        animate={
          isClosing
            ? {
                scale: [1, 1.02, 0.92],
                rotateZ: [0, 1.5, 3],
                x: [0, 25, 70],
                opacity: [1, 0.75, 0],
              }
            : { scale: 1, rotateZ: 0, opacity: 1, x: 0 }
        }
        transition={{
          duration: isClosing ? 0.5 : 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`fixed inset-0 w-screen h-screen z-[999990] bg-[#0A0A0E] text-white flex flex-col justify-between overflow-hidden border-4 border-[#E60012] ${
          isClosing ? 'pointer-events-none' : 'pointer-events-auto'
        }`}
        style={{
          zIndex: 999990,
          transformOrigin: '50% 50%',
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity',
        }}
      >
        {/* Subtle Ambient Red Glow on Opening */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E60012] to-transparent pointer-events-none z-30" />

        {/* Soft Ambient Fade on Exit */}
        {isClosing && (
          <div className="absolute inset-0 bg-[#E60012]/15 pointer-events-none z-50 transition-opacity duration-500" />
        )}

        {/* Background Halftone & Corner Accents */}
        <div className="absolute inset-0 p5-halftone opacity-20 pointer-events-none"></div>
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#E60012] rotate-45 opacity-20 pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-white rotate-45 opacity-10 pointer-events-none"></div>

        {/* Concentric Star Accent Top Left */}
        <div className="absolute top-2 left-2 z-20 hidden sm:block pointer-events-none">
          <P5SingleStar size={36} />
        </div>

      {/* ============================================================
          1. FIXED TOP HEADER BAR (FULLSCREEN WIDTH)
          ============================================================ */}
      <div className="flex-shrink-0 px-3 sm:px-8 py-2.5 sm:py-4 border-b-2 border-zinc-800 bg-[#121218] relative z-10 shadow-md">
        
        {/* Top Row: Badges & Close Button */}
        <div className="flex items-center justify-between gap-2 sm:gap-3 mb-2">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 min-w-0">
            <div className="hidden sm:inline-flex items-center gap-1.5 bg-black text-[#FFE600] font-mono text-xs px-2.5 py-0.5 border border-zinc-700 shadow-[2px_2px_0px_#000] font-bold tracking-wider">
              <span className="text-[#E60012]">★</span>
              <span>ALL-OUT ATTACK // MISSION DOSSIER</span>
            </div>
            <span className="bg-[#E60012] text-white font-mono text-[10px] sm:text-xs px-2 py-0.5 shadow-[2px_2px_0px_#000] font-bold">
              {project.rankBadge || 'PHANTOM MISSION'}
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-[#00F0FF] uppercase tracking-wider font-bold bg-[#14141C] px-2 py-0.5 border border-zinc-800">
              {project.category}
            </span>
          </div>

          {/* Persona 5 Iconic Close Button (TUTUP) */}
          <button
            onClick={handleClose}
            onMouseEnter={playP5Hover}
            className="group relative flex items-center bg-black text-white hover:bg-[#FFE600] hover:text-black border-2 border-white hover:border-black transition-all duration-150 shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#E60012] skew-x-[-10deg] p-0.5 cursor-pointer overflow-hidden flex-shrink-0"
            aria-label="Tutup Detail Proyek"
          >
            {/* Red Accent Flank Tag with ESC Hint */}
            <div className="bg-[#E60012] text-white px-1.5 sm:px-2 py-0.5 sm:py-1 font-mono text-[10px] sm:text-xs font-bold skew-x-[10deg] flex items-center gap-1 group-hover:bg-black group-hover:text-[#FFE600] transition-colors">
              <span className="text-[#FFE600] group-hover:text-white">★</span>
              <span>ESC</span>
            </div>

            {/* Main Close Text with Icon */}
            <div className="px-2 sm:px-2.5 py-0.5 sm:py-1 font-bebas text-xs sm:text-base tracking-widest skew-x-[10deg] flex items-center gap-1 sm:gap-1.5 font-bold">
              <X size={15} className="group-hover:rotate-90 group-hover:scale-125 transition-transform duration-200" />
              <span>TUTUP</span>
              <span className="text-[#E60012] group-hover:text-black font-mono text-xs">///</span>
            </div>
          </button>
        </div>

        {/* Project Title & Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bebas text-white tracking-wide leading-tight flex items-center gap-2">
            <span>{project.title}</span>
            <span className="text-[#E60012] font-mono text-lg sm:text-xl">///</span>
            <span className="text-zinc-400 font-mono text-xs sm:text-sm font-normal">
              {project.repoName}
            </span>
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-[#FFE600] truncate max-w-2xl font-sans">
            {project.subtitle}
          </p>
        </div>

        {/* Persona 5 Dossier Sub-Tabs */}
        <div className="flex items-center gap-2.5 mt-3 pt-2.5 border-t border-zinc-800/80">
          <button
            onClick={() => {
              playP5Click();
              setActiveTab('showcase');
            }}
            onMouseEnter={playP5Hover}
            className={`px-3.5 py-1 text-xs sm:text-sm font-bebas tracking-wider skew-x-[-8deg] transition-all flex items-center gap-1.5 ${
              activeTab === 'showcase'
                ? 'bg-[#E60012] text-white shadow-[3px_3px_0px_#000] border border-white'
                : 'bg-black text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <span className="skew-x-[8deg] flex items-center gap-1.5">
              <ImageIcon size={14} />
              <span>01. TAMPILAN & FITUR UTAMA</span>
            </span>
          </button>

          <button
            onClick={() => {
              playP5Click();
              setActiveTab('architecture');
            }}
            onMouseEnter={playP5Hover}
            className={`px-3.5 py-1 text-xs sm:text-sm font-bebas tracking-wider skew-x-[-8deg] transition-all flex items-center gap-1.5 ${
              activeTab === 'architecture'
                ? 'bg-[#E60012] text-white shadow-[3px_3px_0px_#000] border border-white'
                : 'bg-black text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <span className="skew-x-[8deg] flex items-center gap-1.5">
              <Layers size={14} />
              <span>02. ARSITEKTUR & REPOSITORI</span>
            </span>
          </button>
        </div>

      </div>

      {/* ============================================================
          2. SCROLLABLE MIDDLE CONTENT AREA (FULLSCREEN RESPONSIVE)
          ============================================================ */}
      <div className="flex-1 min-h-0 overflow-y-auto lg:overflow-hidden p-4 sm:p-6 lg:p-8 bg-[#0C0C12]">
        
        {/* TAB 1: SHOWCASE & FITUR UTAMA */}
        {activeTab === 'showcase' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-stretch">
            
            {/* Left Column: Brief Overview & Fitur Lengkap (7 cols) */}
            <div className="lg:col-span-7 flex flex-col h-full min-h-0">
              
              {/* Solusi Ringkas */}
              <div className="bg-black/60 p-3.5 sm:p-4 border-l-4 border-[#E60012] mb-3.5 flex-shrink-0 shadow-md">
                <div className="text-xs font-mono text-[#FFE600] uppercase font-bold mb-1 flex items-center gap-1.5">
                  <FileCode size={14} />
                  <span>RINGKASAN SOLUSI APLIKASI</span>
                </div>
                <p className="text-zinc-200 text-xs sm:text-sm text-justify leading-relaxed [text-align-last:left] font-sans">
                  {project.summary || project.detailedOverview}
                </p>
              </div>

              {/* Features Scrollable Box */}
              <div className="flex-1 min-h-0 flex flex-col">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800 flex-shrink-0">
                  <span className="text-sm font-bebas text-white tracking-wider flex items-center gap-1.5">
                    <Sparkles size={14} className="text-[#FFE600]" />
                    <span>FITUR UTAMA & IMPLEMENTASI ({project.highlights?.length || 0})</span>
                  </span>
                  <span className="text-xs font-mono text-zinc-400">DOKUMENTASI GITHUB</span>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                  {project.highlights && project.highlights.map((h, i) => (
                    <div 
                      key={i} 
                      className="flex items-start gap-2.5 bg-[#161622] hover:bg-[#1C1C2C] p-2.5 sm:p-3 border-l-2 border-l-[#FFE600] border border-zinc-800/80 transition-colors shadow-sm"
                    >
                      <CheckCircle2 size={16} className="text-[#E60012] flex-shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm text-zinc-300 leading-snug font-sans">
                        {h}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Badges Row */}
              <div className="flex-shrink-0 pt-3 mt-2 border-t border-zinc-800/80 flex flex-wrap items-center gap-1.5">
                <span className="font-mono text-[10px] sm:text-xs text-zinc-400 font-bold mr-1 uppercase">STACK:</span>
                {project.technologies && project.technologies.map((t, idx) => (
                  <span key={idx} className="bg-black text-[#FFE600] font-mono text-[10px] sm:text-xs px-2 py-0.5 border border-zinc-700">
                    #{t}
                  </span>
                ))}
              </div>

            </div>

            {/* Right Column: Screenshot Gallery & Interactive Viewer (5 cols) */}
            <div className="lg:col-span-5 flex flex-col h-full min-h-0 bg-black/60 border-2 border-zinc-800 p-3 sm:p-4 shadow-md">
              
              {/* Header Box */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800 flex-shrink-0">
                <span className="text-xs font-mono text-[#FFE600] font-bold flex items-center gap-1.5 uppercase">
                  <ImageIcon size={13} />
                  <span>TAMPILAN APLIKASI (GITHUB)</span>
                </span>
                {hasScreenshots && (
                  <span className="text-[11px] font-mono text-zinc-400 font-bold bg-black px-2 py-0.5 border border-zinc-800">
                    {activeScreenshotIdx + 1} / {screenshots.length}
                  </span>
                )}
              </div>

              {/* Main Active Image Display */}
              <div className="flex-1 min-h-[220px] sm:min-h-0 flex flex-col items-center justify-center relative overflow-hidden bg-[#0A0A0C] border border-zinc-800/80 p-2 group">
                
                {currentScreenshot ? (
                  <>
                    <img 
                      src={currentScreenshot.url} 
                      alt={currentScreenshot.caption || `${project.title} screenshot`}
                      className="max-h-full max-w-full object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.9)] transition-transform duration-200 group-hover:scale-[1.02]"
                    />

                    {/* Left / Right Nav Overlay Buttons */}
                    {screenshots.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevScreenshot}
                          className="absolute left-1.5 top-1/2 -translate-y-1/2 p-2 bg-black/80 hover:bg-[#E60012] text-white border border-zinc-700 transition-colors shadow-[2px_2px_0px_#000]"
                          aria-label="Screenshot Sebelumnya"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={handleNextScreenshot}
                          className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-black/80 hover:bg-[#E60012] text-white border border-zinc-700 transition-colors shadow-[2px_2px_0px_#000]"
                          aria-label="Screenshot Selanjutnya"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="text-zinc-400 text-xs font-mono text-center p-4">
                    Dokumentasi tangkapan layar tersedia di repositori GitHub.
                  </div>
                )}

              </div>

              {/* Active Caption */}
              {currentScreenshot && (
                <div className="flex-shrink-0 bg-[#161622] p-2 mt-2 border border-zinc-800 flex items-center justify-between gap-2">
                  <div className="text-xs font-sans text-zinc-300 truncate">
                    <span className="text-white font-bold block">{currentScreenshot.caption || 'Preview Screenshot'}</span>
                    <span className="text-[11px] text-zinc-400">{currentScreenshot.description || 'Dokumentasi arsitektur dan antarmuka'}</span>
                  </div>
                  {currentScreenshot.tag && (
                    <span className="bg-[#E60012] text-white font-mono text-[10px] px-1.5 py-0.5 flex-shrink-0 font-bold">
                      {currentScreenshot.tag}
                    </span>
                  )}
                </div>
              )}

              {/* Thumbnail Strip */}
              {screenshots.length > 1 && (
                <div className="flex-shrink-0 flex items-center gap-2 overflow-x-auto pt-2 mt-1 custom-scrollbar">
                  {screenshots.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        playP5Click();
                        setActiveScreenshotIdx(idx);
                      }}
                      className={`relative flex-shrink-0 w-12 h-14 border transition-all overflow-hidden ${
                        activeScreenshotIdx === idx
                          ? 'border-[#E60012] shadow-[0_0_6px_#E60012] scale-105'
                          : 'border-zinc-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={s.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

            </div>

          </div>
        )}

        {/* TAB 2: ARSITEKTUR & REPOSITORI */}
        {activeTab === 'architecture' && (
          <div className="h-full overflow-y-auto space-y-4 p-2 custom-scrollbar">
            
            {/* Overview Detail */}
            <div className="bg-black/60 p-4 border-l-4 border-[#E60012]">
              <h3 className="text-sm font-mono text-[#FFE600] uppercase font-bold mb-1.5 flex items-center gap-2">
                <FileCode size={15} />
                <span>OVERVIEW TEKNIS DAN ARSITEKTUR PROYEK</span>
              </h3>
              <p className="text-zinc-200 text-xs sm:text-sm text-justify leading-relaxed [text-align-last:left] font-sans">
                {project.detailedOverview}
              </p>
            </div>

            {/* Arsitektur Stack */}
            {project.architecture && (
              <div className="bg-black/60 p-4 border border-zinc-800">
                <h3 className="text-sm font-mono text-white uppercase font-bold mb-2 flex items-center gap-2">
                  <Layers size={15} className="text-[#00F0FF]" />
                  <span>ARSITEKTUR & POLA DESAIN</span>
                </h3>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans">
                  {project.architecture}
                </p>
              </div>
            )}

            {/* Peran & Kontribusi */}
            {project.role && (
              <div className="bg-black/60 p-4 border border-zinc-800">
                <h3 className="text-sm font-mono text-white uppercase font-bold mb-2 flex items-center gap-2">
                  <Star size={15} className="text-[#FFE600]" />
                  <span>PERAN UTAMA & LINGKUP PEKERJAAN</span>
                </h3>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans">
                  {project.role}
                </p>
              </div>
            )}

            {/* Git Clone Command Block */}
            <div>
              <h3 className="text-xs font-bebas text-zinc-400 tracking-wider mb-2 uppercase flex items-center gap-1.5">
                <Terminal size={14} className="text-[#FFE600]" />
                <span>PERINTAH CLONE REPOSITORI</span>
              </h3>
              <div className="bg-black text-[#FFE600] font-mono text-xs sm:text-sm p-3.5 border border-zinc-700 flex items-center justify-between">
                <code>git clone {project.githubUrl}.git</code>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* ============================================================
          3. FIXED BOTTOM ACTION BAR (FULLSCREEN WIDTH)
          ============================================================ */}
      <div className="flex-shrink-0 px-3 sm:px-8 py-2.5 sm:py-4 border-t-2 border-zinc-800 bg-[#121218] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 relative z-10 shadow-lg">
        
        <div className="text-xs sm:text-sm font-mono text-zinc-400 flex items-center gap-1.5 sm:gap-2">
          <span className="text-[#FFE600]">★</span>
          <span>GITHUB:</span>
          <a 
            href={project.githubUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-[#00F0FF] underline font-bold truncate max-w-[200px] sm:max-w-md"
          >
            {project.githubUrl.replace('https://github.com/', '')}
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <a
            href={project.githubUrl}
            target="_blank" 
            rel="noopener noreferrer"
            onClick={playP5Click}
            onMouseEnter={playP5Hover}
            className="p5-btn bg-[#E60012] text-white hover:bg-white hover:text-[#E60012] text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4 inline-flex items-center justify-center gap-1.5 flex-1 sm:flex-initial text-center"
          >
            <GithubIcon size={15} />
            <span>BUKA REPOSITORI GITHUB</span>
            <ExternalLink size={13} />
          </a>

          <button
            onClick={handleClose}
            onMouseEnter={playP5Hover}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-black text-[#FFE600] hover:bg-[#E60012] hover:text-white font-bebas text-xs sm:text-sm tracking-widest skew-x-[-8deg] border-2 border-zinc-600 hover:border-white shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#FFE600] transition-all flex items-center justify-center gap-1.5 cursor-pointer font-bold flex-1 sm:flex-initial"
          >
            <span className="skew-x-[8deg] flex items-center gap-1.5">
              <span>★</span>
              <span>KEMBALI KE MISI</span>
              <span className="font-mono text-[10px] text-zinc-400 bg-zinc-900 px-1 py-0.5 border border-zinc-700">ESC</span>
            </span>
          </button>
        </div>

      </div>
      </motion.div>

      {/* 2. Fullscreen Persona 5 Calling Card Dossier Unseal Transition */}
      {showDossierTear && (
        <P5ProjectDossierTear 
          project={project}
          onComplete={() => setShowDossierTear(false)} 
        />
      )}

    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
