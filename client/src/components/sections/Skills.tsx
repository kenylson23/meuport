import { useState } from "react";
import { motion } from "framer-motion";
import GlowCard from "../ui/GlowCard";
import SkillTreeVisualization from "../3d/SkillTreeVisualization";
import Quiz from "./Quiz";
import { useAudio } from "../../lib/stores/useAudio";

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const SkillCard = ({ skill, index }: SkillCardProps) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        rotateY: 10,
        rotateX: 5
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: "1000px" }}
    >
      <GlowCard className="p-6 h-32 relative overflow-hidden">
        {/* Background glow effect */}
        <div 
          className="absolute inset-0 opacity-20 blur-xl"
          style={{ backgroundColor: skill.color }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-orbitron text-lg font-semibold">
              {skill.name}
            </h3>
            <span className="text-neon-green text-sm font-bold">
              {skill.level}%
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-black/50 rounded-full h-2 mb-2">
            <motion.div
              className="h-2 rounded-full"
              style={{ backgroundColor: skill.color }}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
              viewport={{ once: true }}
            />
          </div>
          
          {/* Skill level indicator */}
          <div className="flex justify-between text-xs text-white/60">
            <span>Iniciante</span>
            <span>Especialista</span>
          </div>
        </div>
        
        {/* 3D border effect */}
        <div 
          className="absolute top-0 left-0 w-full h-1"
          style={{ backgroundColor: skill.color, boxShadow: `0 0 10px ${skill.color}` }}
        />
      </GlowCard>
    </motion.div>
  );
};

const Skills = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'tree' | 'quiz'>('grid');
  const { playHover, playHit } = useAudio();
  
  const skills = [
    { name: "JavaScript", level: 95, color: "#f7df1e" },
    { name: "TypeScript", level: 90, color: "#3178c6" },
    { name: "React", level: 95, color: "#61dafb" },
    { name: "Vue.js", level: 85, color: "#4fc08d" },
    { name: "Node.js", level: 90, color: "#339933" },
    { name: "Python", level: 85, color: "#3776ab" },
    { name: "Angular", level: 80, color: "#dd0031" },
    { name: "Svelte", level: 75, color: "#ff3e00" },
    { name: "PostgreSQL", level: 80, color: "#336791" },
    { name: "Rust", level: 70, color: "#000000" },
    { name: "Go", level: 75, color: "#00add8" },
    { name: "Java", level: 80, color: "#ed8b00" },
    { name: "C++", level: 75, color: "#00599c" }
  ];

  return (
    <section id="skills" className="min-h-screen py-20 relative">
      <div className="max-w-7xl mx-auto px-4 z-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-white mb-6">
            Habilidades <span className="text-neon-green glow-text">Técnicas</span>
          </h2>
          <div className="w-24 h-1 bg-neon-green mx-auto mb-8 glow-box"></div>
          <p className="text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
            Um conjunto abrangente de ferramentas para construir aplicações web modernas
          </p>
          
          {/* View Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-8"
          >
            <div className="flex bg-black/50 backdrop-blur-md border border-neon-green/20 rounded-lg p-1">
              <button
                onClick={() => {
                  setViewMode('grid');
                  playHit();
                }}
                onMouseEnter={() => playHover()}
                className={`px-4 py-2 rounded-md transition-all duration-300 font-orbitron text-sm ${
                  viewMode === 'grid'
                    ? 'bg-neon-green text-black font-bold'
                    : 'text-white/70 hover:text-neon-green'
                }`}
              >
                Visão em Grade
              </button>
              <button
                onClick={() => {
                  setViewMode('tree');
                  playHit();
                }}
                onMouseEnter={() => playHover()}
                className={`px-4 py-2 rounded-md transition-all duration-300 font-orbitron text-sm ${
                  viewMode === 'tree'
                    ? 'bg-neon-green text-black font-bold'
                    : 'text-white/70 hover:text-neon-green'
                }`}
              >
                Árvore de Habilidades
              </button>
              <button
                onClick={() => {
                  setViewMode('quiz');
                  playHit();
                }}
                onMouseEnter={() => playHover()}
                className={`px-3 py-2 rounded-md transition-all duration-300 font-orbitron text-sm ${
                  viewMode === 'quiz'
                    ? 'bg-neon-green text-black font-bold'
                    : 'text-white/70 hover:text-neon-green'
                }`}
              >
                Quiz Básico
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Dynamic Content Based on View Mode */}
        {viewMode === 'grid' ? (
          <motion.div
            key="grid-view"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <SkillCard skill={skill} index={index} />
              </motion.div>
            ))}
          </motion.div>
        ) : viewMode === 'tree' ? (
          <motion.div
            key="tree-view"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="h-[600px] sm:h-[700px] md:h-[800px] relative bg-black/20 backdrop-blur-sm border border-neon-green/20 rounded-lg overflow-hidden"
          >
            <SkillTreeVisualization />
            
            {/* Instructions Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-neon-green/30 rounded-lg p-3 max-w-xs"
            >
              <h4 className="text-neon-green font-orbitron font-semibold text-sm mb-2">
                Árvore de Habilidades Interativa
              </h4>
              <ul className="text-white/70 text-xs space-y-1">
                <li>• Passe o mouse sobre os nós para ver conexões</li>
                <li>• Clique para selecionar múltiplos nós</li>
                <li>• Linhas mostram relações entre habilidades</li>
                <li>• Habilidades bloqueadas exigem pré-requisitos</li>
              </ul>
            </motion.div>
          </motion.div>
        ) : viewMode === 'quiz' ? (
          <motion.div
            key="quiz-view"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="min-h-[600px] relative bg-black/20 backdrop-blur-sm border border-neon-green/20 rounded-lg p-6"
          >
            <Quiz />
          </motion.div>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-white/60 text-lg font-orbitron">
            Sempre aprendendo, sempre evoluindo
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
