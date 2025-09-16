import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import NeonButton from "../ui/NeonButton";

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative">
      <div className="text-center z-20 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
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
