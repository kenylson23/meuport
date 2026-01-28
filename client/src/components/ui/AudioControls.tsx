import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, CloudRain, Pause, Play, X } from "lucide-react";
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
    const handleFirstInteraction = () => {
      if (!isInitialized) {
        initializeAudio();
        setIsInitialized(true);
      }
    };

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
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-14 right-0 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-neon-green/20 rounded-2xl p-5 shadow-2xl shadow-neon-green/10 min-w-[220px]"
          >
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-neon-green/10 border border-neon-green/30 flex items-center justify-center">
                <CloudRain className="w-5 h-5 text-neon-green" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Som Ambiente</h3>
                <p className="text-white/50 text-xs">Chuva relaxante</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-white/70 text-xs uppercase tracking-wider">Reproduzir</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggleMusic}
                aria-label={isBackgroundPlaying ? "Pausar som" : "Reproduzir som"}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                  isBackgroundPlaying 
                    ? "bg-neon-green text-black shadow-lg shadow-neon-green/40" 
                    : "bg-white/10 text-white/60 hover:bg-white/20"
                )}
              >
                {isBackgroundPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </motion.button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-xs uppercase tracking-wider">Volume</span>
                <span className="text-neon-green text-xs font-mono font-bold">
                  {Math.round(volume * 100)}%
                </span>
              </div>
              <div className="flex items-center gap-3">
                <VolumeX className="w-3.5 h-3.5 text-white/40" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  aria-label="Volume"
                  className="flex-1 h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-neon-green"
                  style={{
                    background: `linear-gradient(to right, rgb(57, 255, 20) 0%, rgb(57, 255, 20) ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%, rgba(255,255,255,0.1) 100%)`
                  }}
                />
                <Volume2 className="w-3.5 h-3.5 text-white/40" />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5">
              <button
                onClick={toggleMute}
                className={cn(
                  "w-full py-2 rounded-lg text-xs font-medium transition-all duration-300",
                  isMuted 
                    ? "bg-red-500/20 text-red-400 border border-red-500/30" 
                    : "bg-neon-green/10 text-neon-green border border-neon-green/30"
                )}
              >
                {isMuted ? "Som Desativado" : "Som Ativado"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label="Controles de áudio"
        aria-expanded={isExpanded}
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
          isExpanded 
            ? "bg-neon-green text-black shadow-neon-green/40" 
            : "bg-gray-900/90 backdrop-blur-md border border-neon-green/30 text-neon-green hover:border-neon-green"
        )}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </motion.button>
    </div>
  );
};

export default AudioControls;