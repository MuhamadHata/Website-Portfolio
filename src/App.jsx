import React, { useState, useEffect } from 'react';
import MetaverseHUD from './components/MetaverseHUD';
import P5HalftoneBackground from './components/P5HalftoneBackground';
import HeroPersona from './components/HeroPersona';
import StatsConfidant from './components/StatsConfidant';
import SkillEquipment from './components/SkillEquipment';
import MissionProjects from './components/MissionProjects';
import CallingCardContact from './components/CallingCardContact';
import FooterPersona from './components/FooterPersona';
import P5TornPaperIntro from './components/P5TornPaperIntro';
import P5SectionWrapper from './components/P5SectionWrapper';
import { bgmManager } from './utils/bgmManager';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [showIntro, setShowIntro] = useState(true);

  // Direct smooth navigation to requested section
  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);

    if (sectionId === 'hero') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 70;
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, elementTop - navOffset),
        behavior: 'smooth',
      });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const sections = ['hero', 'confidant', 'skills', 'projects', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-start BGM on first user interaction with gentle volume fade-in
  useEffect(() => {
    const handleFirstInteraction = () => {
      bgmManager.startOnUserGesture();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0A0A0C] text-white selection:bg-[#E60012] selection:text-white scroll-smooth">
      {/* Persona 5 Iconic Torn Paper Slash Opening Animation */}
      {showIntro && (
        <P5TornPaperIntro onComplete={() => setShowIntro(false)} />
      )}

      {/* Dynamic Animated Halftone Screentone & Star Backdrop */}
      <P5HalftoneBackground />

      {/* Top Metaverse HUD Header */}
      <MetaverseHUD 
        activeSection={activeSection} 
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <P5SectionWrapper watermark="JOKER">
          <HeroPersona onNavigate={handleNavigate} />
        </P5SectionWrapper>

        <P5SectionWrapper 
          watermark="CONFIDANT"
          divider={true}
          command="COMMAND 02"
          title="CONFIDANT DOSSIER // ACADEMIC & RESEARCH"
          badgeText="STATUS // SYNCHRONIZED"
        >
          <StatsConfidant />
        </P5SectionWrapper>

        <P5SectionWrapper 
          watermark="SKILLS"
          divider={true}
          command="COMMAND 03"
          title="EQUIPMENT ARSENAL // TECH STACK"
          badgeText="SECURITY // VERIFIED"
        >
          <SkillEquipment />
        </P5SectionWrapper>

        <P5SectionWrapper 
          watermark="MISSIONS"
          divider={true}
          command="COMMAND 04"
          title="MISSION TARGETS // INFILTRATION REPOSITORIES"
          badgeText="PRIORITY // HIGH"
        >
          <MissionProjects />
        </P5SectionWrapper>

        <P5SectionWrapper 
          watermark="CALLING"
          divider={true}
          command="COMMAND 05"
          title="CALLING CARD // DIRECT TRANSMISSION"
          badgeText="READY // TAKE YOUR HEART"
        >
          <CallingCardContact />
        </P5SectionWrapper>
      </main>

      {/* Footer */}
      <FooterPersona onNavigate={handleNavigate} />
    </div>
  );
}
