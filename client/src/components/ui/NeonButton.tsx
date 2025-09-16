import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
}

const NeonButton = ({ 
  children, 
  className, 
  variant = "default", 
  size = "md",
  ...props 
}: NeonButtonProps) => {
  const baseClasses = "relative font-orbitron font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-green/50";
  
  const variantClasses = {
    default: "bg-neon-green text-black hover:bg-neon-green/90 neon-glow",
    outline: "bg-transparent text-neon-green border-2 border-neon-green hover:bg-neon-green hover:text-black neon-glow-outline"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...(props as any)}
    >
      <span className="relative z-10">
        {children}
      </span>
      
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-neon-green opacity-20 blur-sm -z-10" />
    </motion.button>
  );
};

export default NeonButton;
