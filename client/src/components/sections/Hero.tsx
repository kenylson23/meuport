import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8">
      <div className="z-20 max-w-6xl mx-auto relative grid md:grid-cols-2 gap-6 sm:gap-10 md:gap-16 items-center">
        {/* Informações - Coluna Esquerda */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="order-2 md:order-1 text-center md:text-left space-y-6"
        >
          {/* Nome Principal */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-black text-white">
            KENYLSON
            <span className="block text-neon-green glow-text">LOURENÇO</span>
          </h1>
          
          {/* Título e Experiência */}
          <div className="space-y-2">
            <div className="text-lg sm:text-xl md:text-2xl text-white/90 font-orbitron">
              Desenvolvedor Full Stack • <span className="text-neon-green">3+ Anos</span>
            </div>
            
            {/* Localização e Status */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-2 text-sm sm:text-base text-white/70 font-orbitron">
              <span>Luanda, Angola</span>
              <span className="hidden md:block">|</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400">Disponível para Projetos</span>
              </div>
            </div>
          </div>
          
          {/* Descrição */}
          <div className="space-y-2">
            <div className="text-base sm:text-lg md:text-xl text-white/80 font-orbitron">
              Especialista em React, TypeScript e Experiências 3D
            </div>
            <div className="text-neon-green text-sm sm:text-base md:text-lg font-orbitron">
              Transformando ideias complexas em soluções digitais elegantes
            </div>
          </div>
          
          {/* Tecnologias Principais */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL'].map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1 bg-black/30 border border-neon-green/30 rounded-full text-neon-green text-sm font-orbitron glow-text-subtle"
              >
                {tech}
              </motion.span>
            ))}
          </div>
          
          {/* Mini Contadores */}
          <div className="flex justify-center md:justify-start gap-4 sm:gap-6 text-sm">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-orbitron font-bold text-neon-green">30+</div>
              <div className="text-xs sm:text-sm text-white/60 font-orbitron">Projetos</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-orbitron font-bold text-neon-green">10+</div>
              <div className="text-xs sm:text-sm text-white/60 font-orbitron">Clientes</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-orbitron font-bold text-neon-green">3+</div>
              <div className="text-xs sm:text-sm text-white/60 font-orbitron">Anos</div>
            </div>
          </div>
        </motion.div>

        {/* Fotografia - Coluna Direita */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="order-1 md:order-2 flex justify-center md:justify-end"
        >
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-64 lg:h-64">
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
