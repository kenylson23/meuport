import { motion } from "framer-motion";
import GlowCard from "../ui/GlowCard";

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
            <span>Beginner</span>
            <span>Expert</span>
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
  const skills = [
    { name: "JavaScript", level: 95, color: "#f7df1e" },
    { name: "TypeScript", level: 90, color: "#3178c6" },
    { name: "React", level: 95, color: "#61dafb" },
    { name: "Vue.js", level: 85, color: "#4fc08d" },
    { name: "Node.js", level: 90, color: "#339933" },
    { name: "Python", level: 85, color: "#3776ab" },
    { name: "PHP", level: 80, color: "#777bb4" },
    { name: "Angular", level: 80, color: "#dd0031" },
    { name: "Svelte", level: 75, color: "#ff3e00" },
    { name: "MongoDB", level: 85, color: "#47a248" },
    { name: "PostgreSQL", level: 80, color: "#336791" },
    { name: "Docker", level: 75, color: "#2496ed" },
    { name: "Rust", level: 70, color: "#000000" },
    { name: "Go", level: 75, color: "#00add8" },
    { name: "Java", level: 80, color: "#ed8b00" },
    { name: "C++", level: 75, color: "#00599c" },
    { name: "Swift", level: 70, color: "#fa7343" },
    { name: "Kotlin", level: 75, color: "#7f52ff" }
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
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-white mb-6">
            Technical <span className="text-neon-green glow-text">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-neon-green mx-auto mb-8 glow-box"></div>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            A comprehensive toolkit for building modern web applications
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-white/60 text-lg font-orbitron">
            Always learning, always evolving
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
