import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface FloatingNavProps {
  items: NavItem[];
  className?: string;
  currentSection?: string;
  onItemClick?: (id: string) => void;
}

export const AnimeNavBar = ({
  items,
  className,
  currentSection,
  onItemClick,
}: FloatingNavProps) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - (scrollYProgress.getPrevious() ?? 0);

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-neon-green/20 rounded-full bg-black/50 backdrop-blur-lg shadow-[0_0_20px_rgba(57,255,20,0.1)] z-[5000] px-6 py-3 items-center justify-center space-x-4",
          className
        )}
      >
        {items.map((item: NavItem, idx: number) => {
          const Icon = item.icon;
          const isActive = currentSection === item.url;
          return (
            <button
              key={`link-${idx}`}
              onClick={(e) => {
                e.preventDefault();
                onItemClick?.(item.url);
              }}
              className={cn(
                "relative text-white/60 items-center flex space-x-1 hover:text-neon-green transition-colors text-xs sm:text-sm font-bold",
                isActive && "text-neon-green"
              )}
            >
              <span className="block md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              <span className="hidden md:block">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="active-nav-pill"
                  className="absolute inset-0 bg-neon-green/10 rounded-full -z-10 blur-sm"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
            </button>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};
