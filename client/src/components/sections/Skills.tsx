import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, Network, HelpCircle } from "lucide-react";
import GlowCard from "../ui/GlowCard";
import SkillTreeVisualization from "../3d/SkillTreeVisualization";
import Quiz from "./Quiz";
import { useAudio } from "../../lib/stores/useAudio";
import { SkillsNav } from "../ui/SkillsNav";

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
    <div>
      <GlowCard className="p-6 h-32 relative overflow-hidden">
        {/* Background glow effect */}
        <div 
          className="absolute inset-0 opacity-20 blur-xl"
          style={{ backgroundColor: skill.color }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white text-lg font-bold tracking-tight font-orbitron">
              {skill.name}
            </h3>
            <span className="text-neon-green text-sm font-black font-mono">
              {skill.level}%
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-black/60 rounded-full h-2.5 mb-2 border border-white/5">
            <div
              className="h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]"
              style={{ backgroundColor: skill.color, width: `${skill.level}%` }}
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
    </div>
  );
};

const Skills = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'tree' | 'quiz'>('grid');
  const { playHover, playHit } = useAudio();
  
  const skillsByCategory = {
    "Frontend": [
      { name: "React", level: 95, color: "#61dafb" },
      { name: "TypeScript", level: 90, color: "#3178c6" },
      { name: "JavaScript", level: 95, color: "#f7df1e" },
      { name: "Vue.js", level: 85, color: "#4fc08d" }
    ],
    "Backend & Data": [
      { name: "Node.js", level: 90, color: "#339933" },
      { name: "PostgreSQL", level: 80, color: "#336791" }
    ],
    "DevOps & Tools": [
      { name: "GitHub", level: 90, color: "#ffffff" },
      { name: "Docker", level: 75, color: "#2496ed" }
    ]
  };

  const navItems = [
    { id: 'grid', name: 'Visão em Grade', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'tree', name: 'Árvore de Habilidades', icon: <Network className="w-4 h-4" /> },
    { id: 'quiz', name: 'Quiz Básico', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  return (
    <section id="skills" className="min-h-screen py-24 relative flex items-center">
      <div className="max-w-6xl mx-auto px-4 z-20 relative">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Arsenal <span className="text-neon-green/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-orbitron">Tecnológico</span>
          </h2>
          <div className="w-16 h-1 bg-neon-green mx-auto mb-6 glow-box"></div>
          <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto px-4 font-sans">
            Utilizo as tecnologias mais modernas do mercado para garantir que seu projeto seja rápido, seguro e escalável.
          </p>
          
          {/* View Mode Toggle */}
          <div className="flex justify-center mt-8">
            <SkillsNav 
              items={navItems}
              activeItem={viewMode}
              onItemClick={(id) => {
                setViewMode(id as 'grid' | 'tree' | 'quiz');
                playHit();
              }}
            />
          </div>
        </div>

        {/* Dynamic Content Based on View Mode */}
        {viewMode === 'grid' ? (
          <div className="space-y-12">
            {Object.entries(skillsByCategory).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-xl font-orbitron text-neon-green mb-6 border-l-4 border-neon-green pl-4">
                  {category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {items.map((skill, index) => (
                    <SkillCard key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : viewMode === 'tree' ? (
          <motion.div
            key="tree-view"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] relative bg-black/20 backdrop-blur-sm border border-neon-green/20 rounded-lg overflow-hidden"
          >
            <SkillTreeVisualization />
            
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/80 backdrop-blur-md border border-neon-green/30 rounded-lg p-2 sm:p-3 max-w-xs sm:max-w-sm hidden sm:block">
              <h4 className="text-neon-green font-orbitron font-semibold text-xs sm:text-sm mb-1 sm:mb-2">
                Árvore Interativa
              </h4>
              <ul className="text-white/70 text-xs space-y-0.5 sm:space-y-1">
                <li>• Toque nos nós para detalhes</li>
                <li>• Conexões mostram relações</li>
                <li>• Habilidades bloqueadas</li>
              </ul>
            </div>
            
            <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-md border border-neon-green/30 rounded-lg p-2 sm:hidden">
              <p className="text-neon-green font-orbitron font-semibold text-xs text-center">
                Toque nos nós para ver detalhes das habilidades
              </p>
            </div>
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

        <div className="text-center mt-16">
          <p className="text-white/60 text-lg font-orbitron">
            Sempre aprendendo, sempre evoluindo
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;