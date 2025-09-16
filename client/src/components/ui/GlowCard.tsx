import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { useAudio } from "../../lib/stores/useAudio";

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: string;
}

const GlowCard = ({ 
  children, 
  className, 
  glowColor = "#00ff00",
  ...props 
}: GlowCardProps) => {
  const { playHover } = useAudio();
  
  return (
    <motion.div
      whileHover={{ 
        boxShadow: `0 0 30px ${glowColor}40, 0 0 60px ${glowColor}20`,
        borderColor: glowColor
      }}
      onMouseEnter={() => playHover()}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative bg-black/20 backdrop-blur-sm border border-neon-green/20 rounded-lg transition-all duration-300",
        className
      )}
      style={{
        boxShadow: `0 0 20px ${glowColor}20`
      }}
      {...(props as any)}
    >
      {children}
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-green/50" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-green/50" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-green/50" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-green/50" />
    </motion.div>
  );
};

export default GlowCard;
