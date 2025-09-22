import { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import SkillTreeNode from "./SkillTreeNode";

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

const SkillTreeVisualization = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());
  const [containerDimensions, setContainerDimensions] = useState({ width: 1200, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Update container dimensions when component mounts and on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerDimensions({ 
          width: rect.width, 
          height: rect.height 
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Skill tree data with interconnected nodes
  const skillNodes: SkillNode[] = useMemo(() => [
    // Frontend Foundation
    { id: "html", name: "HTML", level: 95, category: "frontend", color: "#e34f26", x: 20, y: 60, connections: ["css", "js"], description: "Semantic markup and accessibility", isUnlocked: true },
    { id: "css", name: "CSS", level: 90, category: "frontend", color: "#1572b6", x: 35, y: 45, connections: ["sass", "tailwind"], description: "Styling and responsive design", isUnlocked: true },
    { id: "js", name: "JavaScript", level: 95, category: "frontend", color: "#f7df1e", x: 35, y: 75, connections: ["ts", "react", "vue"], description: "Core programming language", isUnlocked: true },
    
    // Advanced Frontend
    { id: "ts", name: "TypeScript", level: 90, category: "frontend", color: "#3178c6", x: 50, y: 65, connections: ["react", "angular"], description: "Type-safe JavaScript", isUnlocked: true },
    { id: "react", name: "React", level: 95, category: "frontend", color: "#61dafb", x: 65, y: 55, connections: ["next", "redux"], description: "Component-based UI library", isUnlocked: true },
    { id: "vue", name: "Vue.js", level: 85, category: "frontend", color: "#4fc08d", x: 65, y: 85, connections: ["nuxt"], description: "Progressive framework", isUnlocked: true },
    { id: "angular", name: "Angular", level: 80, category: "frontend", color: "#dd0031", x: 50, y: 35, connections: ["rxjs"], description: "Full-featured framework", isUnlocked: true },
    
    // Styling & Preprocessing
    { id: "sass", name: "Sass", level: 85, category: "styling", color: "#cc6699", x: 20, y: 30, connections: ["css"], description: "CSS preprocessor", isUnlocked: true },
    { id: "tailwind", name: "Tailwind", level: 90, category: "styling", color: "#06b6d4", x: 20, y: 45, connections: ["css"], description: "Utility-first CSS", isUnlocked: true },
    
    // Backend Foundation
    { id: "node", name: "Node.js", level: 90, category: "backend", color: "#339933", x: 50, y: 85, connections: ["express", "nest"], description: "Server-side JavaScript", isUnlocked: true },
    { id: "python", name: "Python", level: 85, category: "backend", color: "#3776ab", x: 80, y: 70, connections: ["django", "flask"], description: "Versatile programming language", isUnlocked: true },
    
    // Backend Frameworks
    { id: "express", name: "Express", level: 85, category: "backend", color: "#68a063", x: 35, y: 90, connections: ["node"], description: "Minimal web framework", isUnlocked: true },
    { id: "nest", name: "NestJS", level: 75, category: "backend", color: "#e0234e", x: 65, y: 95, connections: ["node", "ts"], description: "Enterprise Node.js framework", isUnlocked: false },
    { id: "django", name: "Django", level: 70, category: "backend", color: "#092e20", x: 90, y: 75, connections: ["python"], description: "High-level Python framework", isUnlocked: false },
    { id: "flask", name: "Flask", level: 75, category: "backend", color: "#000000", x: 90, y: 65, connections: ["python"], description: "Micro web framework", isUnlocked: true },
    
    // Database
    { id: "mysql", name: "MySQL", level: 80, category: "database", color: "#4479a1", x: 80, y: 30, connections: [], description: "Relational database", isUnlocked: true },
    { id: "postgres", name: "PostgreSQL", level: 80, category: "database", color: "#336791", x: 50, y: 20, connections: [], description: "Advanced relational DB", isUnlocked: true },
    
    // Advanced Frameworks
    { id: "next", name: "Next.js", level: 85, category: "fullstack", color: "#000000", x: 80, y: 40, connections: ["react"], description: "React production framework", isUnlocked: true },
    { id: "nuxt", name: "Nuxt.js", level: 75, category: "fullstack", color: "#00dc82", x: 80, y: 90, connections: ["vue"], description: "Vue.js framework", isUnlocked: false },
    
    // Tools & Libraries
    { id: "redux", name: "Redux", level: 75, category: "state", color: "#764abc", x: 35, y: 55, connections: ["react"], description: "State management", isUnlocked: true },
    { id: "rxjs", name: "RxJS", level: 65, category: "reactive", color: "#b7178c", x: 35, y: 25, connections: ["angular"], description: "Reactive programming", isUnlocked: false },
    
    // Mobile & Desktop
    { id: "reactnative", name: "React Native", level: 70, category: "mobile", color: "#61dafb", x: 95, y: 55, connections: ["react"], description: "Cross-platform mobile", isUnlocked: false },
    { id: "electron", name: "Electron", level: 65, category: "desktop", color: "#47848f", x: 95, y: 35, connections: ["js"], description: "Desktop applications", isUnlocked: false },
  ], []);

  const connections = useMemo(() => {
    const lines: Array<{ from: SkillNode; to: SkillNode }> = [];
    
    skillNodes.forEach(node => {
      node.connections.forEach(connectionId => {
        const connectedNode = skillNodes.find(n => n.id === connectionId);
        if (connectedNode) {
          lines.push({ from: node, to: connectedNode });
        }
      });
    });
    
    return lines;
  }, [skillNodes]);

  const handleNodeClick = (nodeId: string) => {
    setSelectedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const handleNodeHover = (nodeId: string | null) => {
    setHoveredNode(nodeId);
  };

  const getConnectedNodes = (nodeId: string): Set<string> => {
    const connected = new Set<string>();
    const node = skillNodes.find(n => n.id === nodeId);
    
    if (node) {
      connected.add(nodeId);
      node.connections.forEach(id => connected.add(id));
      
      // Find nodes that connect to this node
      skillNodes.forEach(n => {
        if (n.connections.includes(nodeId)) {
          connected.add(n.id);
        }
      });
    }
    
    return connected;
  };

  const connectedNodes = hoveredNode ? getConnectedNodes(hoveredNode) : new Set();

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {/* SVG for connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--neon-green)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="var(--neon-green)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--neon-green)" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        
        {connections.map((connection, index) => {
          const isHighlighted = connectedNodes.has(connection.from.id) || connectedNodes.has(connection.to.id);
          
          // Use actual container dimensions
          const fromX = (connection.from.x / 100) * containerDimensions.width;
          const fromY = (connection.from.y / 100) * containerDimensions.height;
          const toX = (connection.to.x / 100) * containerDimensions.width;
          const toY = (connection.to.y / 100) * containerDimensions.height;
          
          return (
            <motion.line
              key={`${connection.from.id}-${connection.to.id}-${index}`}
              x1={fromX}
              y1={fromY}
              x2={toX}
              y2={toY}
              stroke={isHighlighted ? "url(#connectionGradient)" : "var(--neon-green)"}
              strokeWidth={isHighlighted ? "2" : "1"}
              strokeOpacity={isHighlighted ? "0.8" : "0.3"}
              strokeDasharray={isHighlighted ? "0" : "4 4"}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: connection.from.isUnlocked && connection.to.isUnlocked ? 1 : 0.2,
                strokeWidth: isHighlighted ? 3 : 1
              }}
              transition={{ 
                duration: 2, 
                delay: index * 0.1,
                strokeWidth: { duration: 0.3 }
              }}
              style={{
                filter: isHighlighted ? `drop-shadow(0 0 4px var(--neon-green))` : 'none'
              }}
            />
          );
        })}
      </svg>

      {/* Skill Nodes */}
      {skillNodes.map(node => (
        <SkillTreeNode
          key={node.id}
          node={node}
          isConnected={connectedNodes.has(node.id)}
          onNodeClick={handleNodeClick}
          onNodeHover={handleNodeHover}
        />
      ))}

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        className="absolute top-2 sm:top-4 left-2 sm:left-4 space-y-1 sm:space-y-2 bg-black/80 backdrop-blur-md border border-neon-green/20 rounded-lg p-2 sm:p-4"
      >
        <h3 className="text-neon-green font-orbitron font-semibold text-xs sm:text-sm">Categorias</h3>
        <div className="space-y-0.5 sm:space-y-1 text-xs">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: "#61dafb" }}></div>
            <span className="text-white/70 text-xs">Frontend</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: "#339933" }}></div>
            <span className="text-white/70 text-xs">Backend</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: "#47a248" }}></div>
            <span className="text-white/70 text-xs">Database</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full opacity-50"></div>
            <span className="text-white/50 text-xs">Bloqueados</span>
          </div>
        </div>
      </motion.div>

      {/* Node Info Panel */}
      {hoveredNode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black/90 backdrop-blur-md border border-neon-green/30 rounded-lg p-2 sm:p-4 max-w-xs sm:max-w-sm"
        >
          {(() => {
            const node = skillNodes.find(n => n.id === hoveredNode);
            if (!node) return null;
            
            return (
              <>
                <h3 className="text-neon-green font-orbitron font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                  {node.name}
                </h3>
                <p className="text-white/80 text-xs sm:text-sm mb-2 sm:mb-3">
                  {node.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-xs">Proficiência</span>
                  <span className="text-neon-green font-bold text-xs sm:text-sm">{node.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2 mt-1 sm:mt-2">
                  <motion.div
                    className="h-1.5 sm:h-2 rounded-full"
                    style={{ backgroundColor: node.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${node.level}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
};

export default SkillTreeVisualization;