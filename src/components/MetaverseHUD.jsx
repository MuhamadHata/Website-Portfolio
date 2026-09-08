import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Shield, Terminal, Zap, Star } from 'lucide-react';
import { playP5Click, playP5Hover, toggleSound, getSoundStatus } from '../utils/soundEffects';
import P5BgmPlayer from './P5BgmPlayer';

export default function MetaverseHUD({ activeSection, onNavigate }) {
  const [soundOn, setSoundOn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState({ dateStr: '', timeStr: '', dayStr: '' });

  useEffect(() => {
    setSoundOn(getSoundStatus());

    const updateDateTime = () => {
      const now = new Date();
      const days = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB'];
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGU', 'SEP', 'OKT', 'NOV', 'DES'];

      const dayStr = days[now.getDay()];
      const monthStr = months[now.getMonth()];
      const dateNum = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      setCurrentTime({
        dateStr: `${monthStr} ${dateNum}`,
        dayStr: dayStr,
        timeStr: `${hours}:${minutes}:${seconds}`
      });
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const [hoveredSection, setHoveredSection] = useState(null);

  const navItems = [
    { id: 'hero', label: 'Home', num: '01', sub: 'STATUS', desc: 'SYSTEM STATUS & PROFILE OVERVIEW' },
    { id: 'confidant', label: 'About', num: '02', sub: 'CONFIDANT', desc: 'ACADEMIC & BRIN RESEARCH DOSSIER' },
    { id: 'skills', label: 'Stack', num: '03', sub: 'EQUIPMENT', desc: 'BATTLE EQUIPMENT & VERIFIED TECH STACK' },
    { id: 'projects', label: 'Project', num: '04', sub: 'MISSIONS', desc: 'INFILTRATION TARGETS & GITHUB REPOSITORIES' },
    { id: 'contact', label: 'Contact', num: '05', sub: 'CALLING CARD', desc: 'SEND PHANTOM TRANSMISSION TO COLLABORATE' },
  ];

  const currentDesc = navItems.find((item) => item.id === (hoveredSection || activeSection))?.desc || 'METAVERSE PROTOCOL READY';

  const handleNavClick = (id) => {
    playP5Click();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0C]/95 backdrop-blur-md border-b-2 border-[#E60012] shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
      {/* Top Warning Strip Accent */}
      <div className="h-1.5 w-full p5-caution-strip"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand / Metaverse HUD Date */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('hero')}
              onMouseEnter={playP5Hover}
              className="flex items-center gap-2 group text-left"
            >
              {/* Persona 5 Date Box */}
              <div className="bg-[#E60012] text-white px-2.5 py-1 text-center skew-x-[-10deg] shadow-[3px_3px_0px_#000] group-hover:bg-white group-hover:text-[#E60012] transition-colors">
                <div className="text-[11px] tracking-wider leading-none font-bebas">{currentTime.dayStr}</div>
                <div className="text-lg leading-none font-p5-num font-bold mt-0.5">{currentTime.dateStr || 'SEP 07'}</div>
              </div>

              {/* Time & Title */}
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5 text-xs text-[#FFE600] font-mono tracking-wider font-bold">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#FFE600] animate-ping"></span>
                  <span>{currentTime.timeStr}</span>
                  <span className="text-zinc-500 font-mono">|</span>
                  <span className="text-zinc-300 font-mono text-[11px]">METAVERSE ACTIVE</span>
                </div>
                <div className="font-bebas text-2xl text-white tracking-wider group-hover:text-[#E60012] transition-colors">
                  MUHAMAD HATA <span className="text-[#E60012]">///</span>
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation with P5 Camp Menu Command styling */}
          <div className="hidden md:flex flex-col items-center">
            <nav className="flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                const isHovered = hoveredSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={() => {
                      playP5Hover();
                      setHoveredSection(item.id);
                    }}
                    onMouseLeave={() => setHoveredSection(null)}
                    className={`relative px-3.5 py-1.5 font-bebas text-lg tracking-wider transition-all skew-x-[-8deg] ${isActive
                        ? 'bg-[#E60012] text-white shadow-[4px_4px_0px_#000]'
                        : isHovered
                        ? 'bg-white text-black shadow-[3px_3px_0px_#E60012]'
                        : 'text-zinc-300 hover:text-white hover:bg-zinc-800/80'
                      }`}
                  >
                    <span className="block skew-x-[8deg] flex items-center gap-1">
                      <span className="text-xs font-mono opacity-80">{item.num}.</span>
                      <span>{item.label}</span>
                    </span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FFE600] rotate-45"></span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Persona 5 Camp Menu Live Description Subtitle (from Video 2) */}
            <div className="text-[11px] font-mono tracking-wider text-[#FFE600] font-bold flex items-center gap-1.5 mt-0.5 select-none transition-all">
              <span className="text-[#E60012] font-bebas text-xs tracking-wider">COMMAND &gt;</span>
              <span>{currentDesc}</span>
            </div>
          </div>

          {/* Right Action: BGM Soundtrack Player & Sound FX Toggle & Mobile Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Persona 5 BGM Soundtrack Controller */}
            <P5BgmPlayer />

            {/* Audio Toggle Button */}
            <button
              onClick={handleSoundToggle}
              onMouseEnter={playP5Hover}
              title={soundOn ? 'Matikan Efek Suara P5' : 'Aktifkan Efek Suara P5'}
              className={`p-2 font-bebas text-xs flex items-center gap-1.5 transition-all skew-x-[-6deg] border ${soundOn
                  ? 'bg-[#1A1A22] text-[#FFE600] border-[#FFE600] shadow-[3px_3px_0px_#000]'
                  : 'bg-zinc-900 text-zinc-500 border-zinc-700'
                }`}
            >
              <span className="skew-x-[6deg] flex items-center gap-1.5">
                {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
                <span className="hidden sm:inline font-mono uppercase tracking-wider">
                  {soundOn ? 'SFX: ON' : 'SFX: OFF'}
                </span>
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                playP5Click();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 bg-[#E60012] text-white skew-x-[-8deg] shadow-[3px_3px_0px_#000]"
              aria-label="Toggle menu"
            >
              <span className="block skew-x-[8deg]">
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu with Authentic P5 Camp Menu styling */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D0D12] border-b-4 border-[#E60012] p-4 shadow-[0_12px_35px_rgba(0,0,0,0.98)]">
          {/* Camp Menu Mobile Top Bar */}
          <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-2 mb-3">
            <div className="font-bebas text-2xl text-white tracking-widest flex items-center gap-2">
              <span className="text-[#E60012]">★</span>
              <span className="p5-camp-command text-xl">COMMAND MENU</span>
            </div>
            <span className="bg-black text-[#FFE600] font-mono text-xs px-2.5 py-0.5 border border-zinc-700 font-bold">
              LVL. 99 • CONFIDANT
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left p-2.5 font-bebas text-lg tracking-wider flex items-center justify-between skew-x-[-6deg] transition-all ${activeSection === item.id
                    ? 'bg-[#E60012] text-white shadow-[4px_4px_0px_#000]'
                    : 'bg-[#181820] text-zinc-200 hover:bg-zinc-800'
                  }`}
              >
                <span className="skew-x-[6deg] flex items-center gap-2">
                  <span className="font-mono text-xs opacity-75">{item.num}</span>
                  <Star size={14} className={activeSection === item.id ? 'fill-white text-white' : 'text-[#E60012]'} />
                  <span>{item.label}</span>
                </span>
                <span className="skew-x-[6deg] text-[11px] font-sans text-zinc-400 font-bold uppercase tracking-wider">
                  {item.sub}
                </span>
              </button>
            ))}
          </div>

          {/* Active Menu Description Banner */}
          <div className="mt-3 pt-2 border-t border-zinc-800">
            <div className="text-[10px] font-mono text-[#FFE600] tracking-wider font-bold uppercase">
              &gt; {currentDesc}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
