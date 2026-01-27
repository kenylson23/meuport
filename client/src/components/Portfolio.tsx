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
    <div className="relative min-h-screen bg-black overflow-x-hidden text-white selection:bg-neon-green selection:text-black">
      {/* Background dinâmico e elegante */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-black">
          {/* Gradiente de profundidade sutil */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-black to-black"></div>
          
          {/* Grade Cyberpunk Sutil */}
          <div className="absolute inset-0 opacity-[0.05]" 
               style={{ 
                 backgroundImage: 'linear-gradient(to right, #39ff14 1px, transparent 1px), linear-gradient(to bottom, #39ff14 1px, transparent 1px)', 
                 backgroundSize: '50px 50px' 
               }}>
          </div>
          
          {/* Elementos Dinâmicos de Fundo */}
          <div className="absolute inset-0">
            {/* Brilhos animados */}
            <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-neon-green/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            
            {/* Linhas de Varredura (Scanlines) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20"></div>
            
            {/* Partículas flutuantes sutis */}
            <div className="absolute inset-0">
              {particleData.slice(0, 30).map((particle, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-neon-green/40 rounded-full animate-float"
                  style={{
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                    animationDelay: `${particle.animationDelay}s`,
                    animationDuration: `${10 + Math.random() * 20}s`
                  }}
                />
              ))}
            </div>
            
            {/* Vinheta */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
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