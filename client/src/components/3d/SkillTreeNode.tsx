import { useState } from "react";
import { motion } from "framer-motion";
import { useAudio } from "../../lib/stores/useAudio";

interface SkillNode {
  id: string;
  name: string;
  level: number;
  category: string;
  color: string;
  x: number;
  y: number;
  connections: string[];
  description: string;
  isUnlocked: boolean;
}

interface SkillTreeNodeProps {
  node: SkillNode;
  isConnected: boolean;
  onNodeClick: (nodeId: string) => void;
  onNodeHover: (nodeId: string | null) => void;
}

const SkillTreeNode = ({ 
  node, 
  isConnected, 
  onNodeClick, 
  onNodeHover 
}: SkillTreeNodeProps) => {
  const { playHover, playHit } = useAudio();
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    onNodeClick(node.id);
    playHit();
  };

  const handleMouseEnter = () => {
    onNodeHover(node.id);
    playHover();
  };

  const handleMouseLeave = () => {
    onNodeHover(null);
  };

  const nodeSize = node.isUnlocked ? 60 : 40;
  const opacity = node.isUnlocked ? 1 : 0.4;

  return (
    <motion.div
      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        perspective: "1000px"
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity,
        rotateY: isConnected ? 10 : 0,
        z: isConnected ? 20 : 0
      }}
      transition={{ 
        duration: 0.5, 
        type: "spring",
        stiffness: 200,
        delay: Math.random() * 0.5
      }}
      whileHover={{ 
        scale: 1.2,
        rotateY: 15,
        rotateX: 10,
        z: 30
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Node Container */}
      <div
        className="relative rounded-full border-2 flex items-center justify-center transition-all duration-300"
        style={{
          width: nodeSize,
          height: nodeSize,
          backgroundColor: `${node.color}20`,
          borderColor: node.isUnlocked ? node.color : `${node.color}50`,
          boxShadow: node.isUnlocked 
            ? `0 0 20px ${node.color}60, inset 0 0 10px ${node.color}20` 
            : `0 0 5px ${node.color}30`,
          transformStyle: "preserve-3d"
        }}
      >
        {/* Skill Icon/Text */}
        <span 
          className="text-xs font-orbitron font-bold text-center leading-tight"
          style={{ 
            color: node.isUnlocked ? node.color : `${node.color}80`,
            textShadow: node.isUnlocked ? `0 0 8px ${node.color}` : 'none'
          }}
        >
          {node.name.split(' ').map(word => word.charAt(0)).join('').slice(0, 3)}
        </span>

        {/* Progress Ring */}
        {node.isUnlocked && (
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke={`${node.color}30`}
              strokeWidth="2"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke={node.color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * (nodeSize * 0.45)}`}
              initial={{ strokeDashoffset: 2 * Math.PI * (nodeSize * 0.45) }}
              animate={{ 
                strokeDashoffset: 2 * Math.PI * (nodeSize * 0.45) * (1 - node.level / 100)
              }}
              transition={{ duration: 2, delay: 0.5 }}
              style={{
                filter: `drop-shadow(0 0 4px ${node.color})`
              }}
            />
          </svg>
        )}

        {/* Lock Overlay for locked skills */}
        {!node.isUnlocked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-4 h-4 rounded border"
              style={{ 
                borderColor: `${node.color}60`,
                backgroundColor: `${node.color}20`
              }}
            >
              <div className="w-full h-full flex items-center justify-center text-xs">
                🔒
              </div>
            </div>
          </div>
        )}

        {/* 3D Side Faces */}
        <div 
          className="absolute top-0 left-full w-2 h-full transform origin-left rounded-r"
          style={{ 
            backgroundColor: `${node.color}15`,
            transform: 'rotateY(90deg)',
            transformOrigin: 'left'
          }}
        />
        
        <div 
          className="absolute top-full left-0 w-full h-2 transform origin-top rounded-b"
          style={{ 
            backgroundColor: `${node.color}10`,
            transform: 'rotateX(-90deg)',
            transformOrigin: 'top'
          }}
        />
      </div>

      {/* Node Label */}
      <motion.div
        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center min-w-max"
        animate={{ 
          opacity: isConnected ? 1 : 0.7,
          y: isConnected ? -5 : 0
        }}
      >
        <div 
          className="text-xs font-orbitron font-semibold px-2 py-1 rounded whitespace-nowrap"
          style={{ 
            color: node.color,
            backgroundColor: `${node.color}10`,
            border: `1px solid ${node.color}30`,
            textShadow: `0 0 4px ${node.color}`
          }}
        >
          {node.name}
        </div>
        <div className="text-xs text-white/50 mt-1">
          {node.level}%
        </div>
      </motion.div>

      {/* Selection Ring */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{
            border: `2px solid ${node.color}`,
            boxShadow: `0 0 20px ${node.color}`
          }}
        />
      )}
    </motion.div>
  );
};

export default SkillTreeNode;