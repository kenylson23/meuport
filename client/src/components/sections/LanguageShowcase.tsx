import { motion } from "framer-motion";
import LanguageModel3D from "../3d/LanguageModel3D";

const LanguageShowcase = () => {
  const languages = [
    { name: "JavaScript", level: 95, color: "#f7df1e", icon: "JS" },
    { name: "TypeScript", level: 90, color: "#3178c6", icon: "TS" },
    { name: "React", level: 95, color: "#61dafb", icon: "⚛" },
    { name: "Vue.js", level: 85, color: "#4fc08d", icon: "V" },
    { name: "Node.js", level: 90, color: "#339933", icon: "N" },
    { name: "Python", level: 85, color: "#3776ab", icon: "🐍" },
    { name: "Angular", level: 80, color: "#dd0031", icon: "A" },
    { name: "Svelte", level: 75, color: "#ff3e00", icon: "S" },
    { name: "Go", level: 75, color: "#00add8", icon: "G" },
    { name: "Rust", level: 70, color: "#000000", icon: "R" },
    { name: "Java", level: 80, color: "#ed8b00", icon: "J" },
    { name: "C++", level: 75, color: "#00599c", icon: "C" }
  ];

  return (
    <section id="languages" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 z-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-6">
            Modelos 3D de <span className="text-neon-green glow-text">Linguagens</span>
          </h2>
          <div className="w-24 h-1 bg-neon-green mx-auto mb-8 glow-box"></div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Explore minha expertise em programação através de representações 3D interativas de linguagens. 
            Passe o mouse e clique para ver as tecnologias que domino.
          </p>
        </motion.div>

        {/* 3D Language Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 place-items-center">
          {languages.map((language, index) => (
            <LanguageModel3D
              key={language.name}
              language={language}
              index={index}
            />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 grid md:grid-cols-3 gap-8 text-center"
        >
          <div className="space-y-2">
            <div className="text-3xl font-orbitron font-bold text-neon-green">
              {languages.length}+
            </div>
            <div className="text-white/70">Linguagens de Programação</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-orbitron font-bold text-neon-green">
              {Math.round(languages.reduce((sum, lang) => sum + lang.level, 0) / languages.length)}%
            </div>
            <div className="text-white/70">Proficiência Média</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-orbitron font-bold text-neon-green">
              3+
            </div>
            <div className="text-white/70">Anos de Experiência</div>
          </div>
        </motion.div>

        {/* Interactive Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-neon-green/60 text-sm font-orbitron animate-pulse">
            ← Passe o mouse e clique nos modelos 3D para interagir →
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LanguageShowcase;