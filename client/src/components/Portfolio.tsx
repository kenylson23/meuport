import { useState, useEffect, useMemo } from "react";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import LanguageShowcase from "./sections/LanguageShowcase";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import AudioControls from "./ui/AudioControls";
import { AnimeNavBar } from "./nav/AnimeNavBar";
import { Home, User, Cpu, Globe, FolderCode, Mail } from "lucide-react";
import { usePortfolio } from "../lib/stores/usePortfolio";
import { useAudio } from "../lib/stores/useAudio";

const Portfolio = () => {
  const { currentSection, setCurrentSection } = usePortfolio();
  const { playHover, playHit } = useAudio();

  const navItems = [
    { name: 'Início', url: 'hero', icon: Home },
    { name: 'Sobre', url: 'about', icon: User },
    { name: 'Habilidades', url: 'skills', icon: Cpu },
    { name: 'Linguagens', url: 'languages', icon: Globe },
    { name: 'Projetos', url: 'projects', icon: FolderCode },
    { name: 'Contato', url: 'contact', icon: Mail }
  ];

  const handleNavClick = (id: string) => {
    playHit();
    const element = document.getElementById(id);
    if (element) {
      const offset = element.offsetTop;
      window.scrollTo({
        top: offset,
        behavior: 'auto'
      });
    }
  };

  // Pre-compute random values for consistent renders
  const matrixData = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      left: i * 5,
      animationDelay: Math.random() * 5,
      animationDuration: 10 + Math.random() * 10,
      characters: Array.from({ length: 20 }, () => 
        String.fromCharCode(0x30A0 + Math.random() * 96)
      )
    })), []
  );

  const particleData = useMemo(() => 
    Array.from({ length: 80 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 15
    })), []
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleScroll = () => {
    const sections = ['hero', 'about', 'skills', 'languages', 'projects', 'contact'];
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    for (let i = 0; i < sections.length; i++) {
      const element = document.getElementById(sections[i]);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setCurrentSection(sections[i]);
          break;
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-neon-green text-xl animate-pulse">Inicializando Portfólio...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Advanced Animated CSS Background */}
      <div className="fixed inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-black via-gray-900 to-black">
          {/* Shader-like Wave Background */}
          <div className="shader-background opacity-30"></div>
          
          {/* CSS Neon Grid Effect */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid-background"></div>
          </div>
          
          {/* Matrix Rain Effect */}
          <div className="matrix-container opacity-20">
            {matrixData.map((column, i) => (
              <div
                key={i}
                className="matrix-column"
                style={{
                  left: `${column.left}%`,
                  animationDelay: `${column.animationDelay}s`,
                  animationDuration: `${column.animationDuration}s`
                }}
              >
                {column.characters.map((char, j) => (
                  <div key={j}>{char}</div>
                ))}
              </div>
            ))}
          </div>
          
          {/* Enhanced Floating Particles */}
          {/* Particles removidos para performance */}
          <div className="particles-container">
          </div>
          
          {/* Morphing Shapes */}
          {/* Morphing shapes removidos para performance */}
          <div className="absolute inset-0">
          </div>
          
          {/* Energy Waves */}
          <div className="absolute inset-0">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="energy-wave"
                style={{
                  top: `${20 * i}%`,
                  animationDelay: `${i * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <AnimeNavBar 
        items={navItems} 
        currentSection={currentSection} 
        onItemClick={handleNavClick} 
      />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <LanguageShowcase />
        <Projects />
        <Contact />
      </main>

      {/* Audio Controls */}
      <AudioControls />
    </div>
  );
};

export default Portfolio;
