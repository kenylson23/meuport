import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Music, Pause, Play } from "lucide-react";
import { useAudio } from "../../lib/stores/useAudio";
import { cn } from "../../lib/utils";

const AudioControls = () => {
  const { 
    isMuted, 
    isBackgroundPlaying, 
    volume, 
    initializeAudio, 
    toggleMute, 
    setVolume, 
    startBackgroundMusic, 
    stopBackgroundMusic 
  } = useAudio();
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize audio on first user interaction
    const handleFirstInteraction = () => {
      if (!isInitialized) {
        initializeAudio();
        setIsInitialized(true);
      }
    };

    // Listen for any click to initialize audio context
    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [initializeAudio, isInitialized]);

  const handleToggleMusic = () => {
    if (!isInitialized) {
      initializeAudio();
      setIsInitialized(true);
      return;
    }

    if (isBackgroundPlaying) {
      stopBackgroundMusic();
    } else {
      startBackgroundMusic();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2 }}
    >
      <div className="flex flex-col items-end space-y-2">
        {/* Expanded Controls */}
        <motion.div
          initial={false}
          animate={{ 
            opacity: isExpanded ? 1 : 0,
            y: isExpanded ? 0 : 20,
            scale: isExpanded ? 1 : 0.8
          }}
          transition={{ duration: 0.2 }}
          className={cn(
            "bg-black/80 backdrop-blur-md border border-neon-green/30 rounded-lg p-4 space-y-3",
            !isExpanded && "pointer-events-none"
          )}
        >
          {/* Background Music Control */}
          <div className="flex items-center space-x-3">
            <Music className="w-4 h-4 text-neon-green" />
            <span className="text-white text-sm font-orbitron">Ambient</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleMusic}
              className={cn(
                "p-1 rounded text-xs",
                isBackgroundPlaying 
                  ? "text-neon-green bg-neon-green/20" 
                  : "text-white/60 bg-white/10"
              )}
            >
              {isBackgroundPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </motion.button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-3">
            <Volume2 className="w-4 h-4 text-neon-green" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, var(--neon-green) 0%, var(--neon-green) ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
              }}
            />
            <span className="text-white/60 text-xs font-mono min-w-[2rem]">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </motion.div>

        {/* Main Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsExpanded(!isExpanded)}
          onMouseEnter={() => setIsExpanded(true)}
          className="bg-black/80 backdrop-blur-md border border-neon-green/30 rounded-full p-3 text-neon-green hover:border-neon-green transition-colors duration-300"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </motion.button>

        {/* Mute Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMute}
          className={cn(
            "px-3 py-1 rounded text-xs font-orbitron border transition-colors duration-300",
            isMuted 
              ? "text-red-400 border-red-400/30 bg-red-400/10" 
              : "text-neon-green border-neon-green/30 bg-neon-green/10"
          )}
        >
          {isMuted ? "MUTED" : "AUDIO ON"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AudioControls;