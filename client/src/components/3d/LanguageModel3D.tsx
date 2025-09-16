import { useState } from "react";
import { motion } from "framer-motion";
import { useAudio } from "../../lib/stores/useAudio";

interface LanguageModel3DProps {
  language: {
    name: string;
    color: string;
    icon: string;
    level: number;
  };
  index: number;
}

const LanguageModel3D = ({ language, index }: LanguageModel3DProps) => {
  const { playHover, playHit } = useAudio();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    playHit();
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -90 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
      className="relative group cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={handleClick}
      onMouseEnter={() => {
        setIsHovered(true);
        playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main 3D Container */}
      <motion.div
        animate={{
          rotateY: isHovered ? 15 : 0,
          rotateX: isHovered ? 10 : 0,
          scale: isHovered ? 1.1 : 1,
          z: isHovered ? 50 : 0
        }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
        className="relative transform-gpu"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Face */}
        <div 
          className={`w-24 h-24 relative rounded-lg border-2 transition-all duration-300 ${
            isClicked ? 'scale-95' : ''
          }`}
          style={{ 
            backgroundColor: `${language.color}20`,
            borderColor: language.color,
            boxShadow: `0 0 20px ${language.color}40, inset 0 0 20px ${language.color}10`
          }}
        >
          {/* Language Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span 
              className="text-2xl font-bold font-orbitron"
              style={{ color: language.color }}
            >
              {language.icon}
            </span>
          </div>
          
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="35%"
              fill="none"
              stroke={`${language.color}30`}
              strokeWidth="2"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="35%"
              fill="none"
              stroke={language.color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 35}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 35 }}
              whileInView={{ 
                strokeDashoffset: 2 * Math.PI * 35 * (1 - language.level / 100)
              }}
              transition={{ duration: 2, delay: index * 0.1 }}
              style={{
                filter: `drop-shadow(0 0 4px ${language.color})`
              }}
            />
          </svg>
          
          {/* Holographic Overlay */}
          <div 
            className="absolute inset-0 rounded-lg opacity-30 mix-blend-screen"
            style={{
              background: `linear-gradient(45deg, transparent 30%, ${language.color}50 50%, transparent 70%)`,
              backgroundSize: '200% 200%',
              animation: isHovered ? 'hologram-scan 1s ease-in-out infinite' : 'none'
            }}
          />
        </div>

        {/* Side Faces for 3D Effect */}
        <div 
          className="absolute top-0 left-24 w-6 h-24 transform origin-left"
          style={{ 
            backgroundColor: `${language.color}15`,
            transform: 'rotateY(90deg)',
            transformOrigin: 'left',
            borderRight: `2px solid ${language.color}50`
          }}
        />
        
        <div 
          className="absolute top-24 left-0 w-24 h-6 transform origin-top"
          style={{ 
            backgroundColor: `${language.color}10`,
            transform: 'rotateX(-90deg)',
            transformOrigin: 'top',
            borderBottom: `2px solid ${language.color}30`
          }}
        />

        {/* Floating Particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ 
                  backgroundColor: language.color,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  boxShadow: `0 0 4px ${language.color}`
                }}
                animate={{
                  y: [-20, -40, -20],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Name Label */}
      <motion.div
        animate={{
          y: isHovered ? -10 : 0,
          opacity: isHovered ? 1 : 0.8
        }}
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
      >
        <div 
          className="text-sm font-orbitron font-semibold whitespace-nowrap px-2 py-1 rounded"
          style={{ 
            color: language.color,
            textShadow: `0 0 8px ${language.color}`,
            backgroundColor: `${language.color}10`,
            border: `1px solid ${language.color}30`
          }}
        >
          {language.name}
        </div>
        <div className="text-xs text-white/60 mt-1">
          {language.level}%
        </div>
      </motion.div>

      {/* Interaction Ripple */}
      {isClicked && (
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            border: `2px solid ${language.color}`,
            backgroundColor: `${language.color}10`
          }}
        />
      )}
    </motion.div>
  );
};

export default LanguageModel3D;