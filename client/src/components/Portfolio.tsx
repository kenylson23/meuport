import { useState, useEffect, useMemo } from "react";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import LanguageShowcase from "./sections/LanguageShowcase";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import AudioControls from "./ui/AudioControls";
import { usePortfolio } from "../lib/stores/usePortfolio";
import { useAudio } from "../lib/stores/useAudio";

const Portfolio = () => {
  const { currentSection, setCurrentSection } = usePortfolio();
  const { playHover } = useAudio();

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
          <div className="shader-background"></div>
          
          {/* CSS Neon Grid Effect */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid-background"></div>
          </div>
          
          {/* Matrix Rain Effect */}
          <div className="matrix-container">
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
          <div className="particles-container">
            {particleData.map((particle, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animationDelay: `${particle.animationDelay}s`,
                }}
              />
            ))}
          </div>
          
          {/* Morphing Shapes */}
          <div className="absolute inset-0">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="morphing-shape"
                style={{
                  position: 'absolute',
                  left: `${10 + (i * 12)}%`,
                  top: `${20 + (i % 3) * 30}%`,
                  animationDelay: `${i * 1.5}s`,
                }}
              />
            ))}
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
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/10 backdrop-blur-md border-b border-neon-green/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-green to-cyan-400 p-0.5">
                  <img 
                    src="/images/profile.png" 
                    alt="KL"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="text-neon-green font-orbitron text-xl font-bold" translate="no">
                KL
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              {[
                { label: 'Início', id: 'hero' },
                { label: 'Sobre', id: 'about' },
                { label: 'Habilidades', id: 'skills' },
                { label: 'Linguagens', id: 'languages' },
                { label: 'Projetos', id: 'projects' },
                { label: 'Contato', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    document.getElementById(item.id)?.scrollIntoView({
                      behavior: 'smooth'
                    });
                  }}
                  onMouseEnter={() => playHover()}
                  className={`nav-link font-orbitron ${
                    currentSection === item.id 
                      ? 'text-neon-green' 
                      : 'text-white/70 hover:text-neon-green'
                  } transition-colors duration-300`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

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
