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
    { id: "js", name: "JavaScript", level: 95, category: "frontend", color: "#f7df1e", x: 25, y: 50, connections: ["ts", "react", "node"], description: "Linguagem principal de programação e base de todo o ecossistema web.", isUnlocked: true },
    { id: "ts", name: "TypeScript", level: 90, category: "frontend", color: "#3178c6", x: 45, y: 35, connections: ["react"], description: "Superset tipado de JavaScript que traz segurança e escalabilidade ao desenvolvimento.", isUnlocked: true },
    
    // Frameworks
    { id: "react", name: "React", level: 95, category: "frontend", color: "#61dafb", x: 65, y: 40, connections: ["next"], description: "Biblioteca líder para construção de interfaces modernas e reativas baseadas em componentes.", isUnlocked: true },
    { id: "next", name: "Next.js", level: 85, category: "frontend", color: "#ffffff", x: 80, y: 30, connections: [], description: "Framework React para produção com SSR, SSG e rotas otimizadas.", isUnlocked: false },
    { id: "vue", name: "Vue.js", level: 85, category: "frontend", color: "#4fc08d", x: 45, y: 65, connections: [], description: "Framework progressivo focado na simplicidade e performance.", isUnlocked: true },
    
    // Backend & Database
    { id: "node", name: "Node.js", level: 90, category: "backend", color: "#339933", x: 25, y: 75, connections: ["postgres", "express"], description: "Runtime JavaScript de alta performance para construção de serviços escaláveis no servidor.", isUnlocked: true },
    { id: "express", name: "Express", level: 85, category: "backend", color: "#68a063", x: 40, y: 85, connections: [], description: "Framework minimalista e flexível para APIs robustas em Node.js.", isUnlocked: true },
    { id: "postgres", name: "PostgreSQL", level: 80, category: "database", color: "#336791", x: 75, y: 75, connections: ["prisma"], description: "O banco de dados relacional mais avançado do mundo para integridade de dados.", isUnlocked: true },
    { id: "prisma", name: "Prisma", level: 75, category: "backend", color: "#2d3748", x: 90, y: 85, connections: [], description: "ORM moderno para produtividade e segurança de tipos em consultas ao banco.", isUnlocked: false },
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
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="bg-black/80 backdrop-blur-md border border-neon-green/20 rounded-lg p-2 sm:p-4 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        >
          <h3 className="text-neon-green font-orbitron font-semibold text-xs sm:text-sm mb-2 border-b border-neon-green/10 pb-1">Categorias</h3>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full border border-white/20 shadow-[0_0_8px_#61dafb]" style={{ backgroundColor: "#61dafb" }}></div>
              <span className="text-white/80">Frontend</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full border border-white/20 shadow-[0_0_8px_#339933]" style={{ backgroundColor: "#339933" }}></div>
              <span className="text-white/80">Backend</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full border border-white/20 shadow-[0_0_8px_#336791]" style={{ backgroundColor: "#336791" }}></div>
              <span className="text-white/80">Database</span>
            </div>
            <div className="flex items-center space-x-2 opacity-50">
              <div className="w-3 h-3 rounded-full border border-white/20 bg-gray-600"></div>
              <span className="text-white/60">Bloqueados</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-black/80 backdrop-blur-md border border-neon-green/20 rounded-lg p-2 sm:p-4 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        >
          <h4 className="text-neon-green font-orbitron font-semibold text-xs sm:text-sm mb-2 border-b border-neon-green/10 pb-1">
            Árvore Interativa
          </h4>
          <ul className="text-white/70 text-[10px] sm:text-xs space-y-1">
            <li className="flex items-center gap-1.5">• <span>Toque nos nós para detalhes</span></li>
            <li className="flex items-center gap-1.5">• <span>Conexões mostram relações</span></li>
            <li className="flex items-center gap-1.5">• <span>Habilidades bloqueadas</span></li>
          </ul>
        </motion.div>
      </div>

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
              <div className="font-sans">
                <h3 className="text-neon-green font-bold mb-1 sm:mb-2 text-sm sm:text-base tracking-tight uppercase">
                  {node.name}
                </h3>
                <p className="text-white/90 text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed">
                  {node.description}
                </p>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white/60 text-[10px] sm:text-xs uppercase font-medium">Proficiência</span>
                  <span className="text-neon-green font-bold text-xs sm:text-sm">{node.level}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5 sm:h-2">
                  <motion.div
                    className="h-1.5 sm:h-2 rounded-full shadow-[0_0_10px_rgba(57,255,20,0.3)]"
                    style={{ backgroundColor: node.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${node.level}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
};

export default SkillTreeVisualization;