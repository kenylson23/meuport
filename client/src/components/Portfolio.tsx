import { useState, useEffect, useMemo, Suspense, lazy } from "react";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import AudioControls from "./ui/AudioControls";
import { AnimeNavBar } from "./nav/AnimeNavBar";
import { Home, User, Cpu, Globe, FolderCode, Mail } from "lucide-react";
import { usePortfolio } from "../lib/stores/usePortfolio";
import { useAudio } from "../lib/stores/useAudio";

// Lazy loading de seções menos críticas e componentes 3D pesados
const About = lazy(() => import("./sections/About"));
const Skills = lazy(() => import("./sections/Skills"));
const LanguageShowcase = lazy(() => import("./sections/LanguageShowcase"));
const DottedSurface = lazy(() => import("./3d/DottedSurface").then(m => ({ default: m.DottedSurface })));

const Portfolio = () => {
  const { currentSection, setCurrentSection } = usePortfolio();
  const { playHover, playHit } = useAudio();

  const navItems = useMemo(() => [
    { name: 'Início', url: 'hero', icon: Home },
    { name: 'Sobre', url: 'about', icon: User },
    { name: 'Habilidades', url: 'skills', icon: Cpu },
    { name: 'Linguagens', url: 'languages', icon: Globe },
    { name: 'Projetos', url: 'projects', icon: FolderCode },
    { name: 'Contato', url: 'contact', icon: Mail }
  ], []);

  const handleNavClick = (id: string) => {
    playHit();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const particleData = useMemo(() => 
    Array.from({ length: 40 }, () => ({ // Reduzido de 80 para 40
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 15
    })), []
  );
  
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'about', 'skills', 'languages', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      // Lógica de esconder/mostrar nav
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsScrollingUp(false);
      } else {
        setIsScrollingUp(true);
      }
      setLastScrollY(window.scrollY);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setCurrentSection, lastScrollY]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-neon-green text-xl animate-pulse font-orbitron">CARREGANDO...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden text-white selection:bg-neon-green selection:text-black">
      <Suspense fallback={null}>
        <DottedSurface className="opacity-60" />
      </Suspense>
      
      {/* Background simplificado para performance */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-black/40">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/10 via-black/30 to-black/60"></div>
          
          <div className="absolute inset-0 opacity-[0.02]" 
               style={{ 
                 backgroundImage: 'linear-gradient(to right, #39ff14 1px, transparent 1px), linear-gradient(to bottom, #39ff14 1px, transparent 1px)', 
                 backgroundSize: '80px 80px' 
               }}>
          </div>
          
          <div className="absolute inset-0">
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-neon-green/5 rounded-full blur-[100px]"></div>
            
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_8px] pointer-events-none opacity-5"></div>
            
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-green/10 to-transparent animate-scan"></div>
            </div>

            <div className="absolute inset-0">
              {particleData.map((particle, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-neon-green/10 rounded-full animate-float"
                  style={{
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                    animationDelay: `${particle.animationDelay}s`,
                    animationDuration: `${15 + Math.random() * 10}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`fixed top-0 left-0 right-0 z-[100] transition-transform duration-300 ${isScrollingUp ? 'translate-y-0' : '-translate-y-full'}`}>
        <AnimeNavBar 
          items={navItems} 
          currentSection={currentSection} 
          onItemClick={handleNavClick} 
        />
      </div>

      <main className="relative z-10">
        <Hero />
        <Projects />
        <Suspense fallback={<div className="h-96 flex items-center justify-center font-orbitron text-white/20">CARREGANDO...</div>}>
          <About />
          <Skills />
          <LanguageShowcase />
        </Suspense>
        <Contact />
      </main>

      <AudioControls />
    </div>
  );
};

export default Portfolio;
