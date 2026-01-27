import { motion } from "framer-motion";
import LanguageModel3D from "../3d/LanguageModel3D";

const LanguageShowcase = () => {
  const languages = [
    { name: "JavaScript", level: 95, color: "#f7df1e", icon: "JS" },
    { name: "TypeScript", level: 90, color: "#3178c6", icon: "TS" },
    { name: "React", level: 95, color: "#61dafb", icon: "⚛" },
    { name: "Vue.js", level: 85, color: "#4fc08d", icon: "V" },
    { name: "Node.js", level: 90, color: "#339933", icon: "N" }
  ];

  return (
    <section id="languages" className="min-h-screen py-32 relative flex items-center">
      <div className="max-w-7xl mx-auto px-4 z-20 relative">
        <div
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-white mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Modelos 3D de <span className="text-neon-green/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Linguagens</span>
          </h2>
          <div className="w-24 h-1 bg-neon-green mx-auto mb-8 glow-box"></div>
          <p className="text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
            Explore minha expertise em programação através de representações 3D interativas de linguagens. 
            Passe o mouse e clique para ver as tecnologias que domino.
          </p>
        </div>

        {/* 3D Language Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 place-items-center">
          {languages.map((language, index) => (
            <LanguageModel3D
              key={language.name}
              language={language}
              index={index}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div
          className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center"
        >
          <div className="space-y-2">
            <div className="text-2xl sm:text-3xl font-orbitron font-bold text-neon-green">
              {languages.length}+
            </div>
            <div className="text-sm sm:text-base text-white/70">Linguagens de Programação</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl sm:text-3xl font-orbitron font-bold text-neon-green">
              {Math.round(languages.reduce((sum, lang) => sum + lang.level, 0) / languages.length)}%
            </div>
            <div className="text-sm sm:text-base text-white/70">Proficiência Média</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl sm:text-3xl font-orbitron font-bold text-neon-green">
              3+
            </div>
            <div className="text-sm sm:text-base text-white/70">Anos de Experiência</div>
          </div>
        </div>

        {/* Interactive Hint */}
        <div
          className="text-center mt-12"
        >
          <p className="text-neon-green/60 text-sm font-orbitron animate-pulse">
            ← Passe o mouse e clique nos modelos 3D para interagir →
          </p>
        </div>
      </div>
    </section>
  );
};

export default LanguageShowcase;