import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import NeonButton from "../ui/NeonButton";

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative">
      <div className="text-center z-20 max-w-5xl mx-auto px-4 relative">
        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-green to-cyan-400 p-1 glow-strong animate-pulse">
              <img 
                src="/images/profile.png" 
                alt="Kenylson Lourenço - Desenvolvedor Full Stack"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            {/* Floating particles around photo */}
            <div className="absolute -inset-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-neon-green rounded-full opacity-60 animate-ping"
                  style={{
                    left: `${20 + (i * 15)}%`,
                    top: `${10 + (i % 3) * 30}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: '2s'
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-orbitron font-black text-white mb-4">
            KENYLSON
            <span className="block text-neon-green glow-text">LOURENÇO</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8"
        >
          <div className="text-xl md:text-2xl text-white/80 font-orbitron mb-4">
            Desenvolvedor Full Stack
          </div>
          <div className="text-neon-green text-lg font-orbitron">
            Criando Experiências Digitais em Espaço 3D
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <NeonButton
            onClick={() => {
              document.getElementById('projects')?.scrollIntoView({
                behavior: 'smooth'
              });
            }}
          >
            Ver Meu Trabalho
          </NeonButton>
          <NeonButton
            variant="outline"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({
                behavior: 'smooth'
              });
            }}
          >
            Entre em Contato
          </NeonButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown 
            className="w-8 h-8 text-neon-green animate-bounce cursor-pointer"
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({
                behavior: 'smooth'
              });
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
