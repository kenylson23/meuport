import React from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { cn } from "../../lib/utils";

export const SkillsNav = ({
  items,
  activeItem,
  onItemClick,
  className,
}: {
  items: {
    id: string;
    name: string;
    icon?: React.ReactNode;
  }[];
  activeItem: string;
  onItemClick: (id: string) => void;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex max-w-fit mx-auto border border-neon-green/20 rounded-full bg-black/50 backdrop-blur-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[50] pr-2 pl-2 sm:pl-8 py-2 items-center justify-center space-x-2 sm:space-x-4 mb-8",
        className
      )}
    >
      {items.map((item, idx) => (
        <button
          key={item.id}
          onClick={() => onItemClick(item.id)}
          className={cn(
            "relative items-center flex space-x-1 transition-colors duration-200 px-3 py-1.5 rounded-full text-xs sm:text-sm font-sans",
            activeItem === item.id 
              ? "text-white bg-neon-green/90 font-bold shadow-[0_0_15px_rgba(57,255,20,0.5)]" 
              : "text-white/70 hover:text-white hover:bg-white/10"
          )}
        >
          <span className="block sm:hidden">{item.icon}</span>
          <span className="hidden sm:block drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{item.name}</span>
          {activeItem === item.id && (
            <motion.span
              layoutId="activeTab"
              className="absolute inset-0 bg-neon-green rounded-full -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};
