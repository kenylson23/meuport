import { motion } from "framer-motion";
import GlowCard from "../ui/GlowCard";

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCard3DProps {
  skill: Skill;
  index: number;
}

const SkillCard3D = ({ skill, index }: SkillCard3DProps) => {
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

export default SkillCard3D;
