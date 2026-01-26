import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8">
      <div className="z-20 max-w-6xl mx-auto relative grid md:grid-cols-2 gap-6 sm:gap-10 md:gap-16 items-center">
        {/* Informações - Coluna Esquerda */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="order-2 md:order-1 text-center md:text-left space-y-8"
        >
          {/* Nome Principal */}
          <div className="space-y-2">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-neon-green font-orbitron text-sm tracking-[0.3em] uppercase"
            >
              Full Stack Developer
            </motion.span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-orbitron font-black text-white leading-tight">
              KENYLSON
              <span className="block text-neon-green glow-text">LOURENÇO</span>
            </h1>
          </div>
          
          {/* Descrição Simplificada */}
          <p className="text-lg sm:text-xl text-white/70 font-orbitron max-w-lg mx-auto md:mx-0 leading-relaxed">
            Especialista em <span className="text-white">React</span>, <span className="text-white">TypeScript</span> e experiências <span className="text-white">3D interativas</span> com mais de 3 anos de estrada.
          </p>
          
          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-neon-green text-black font-orbitron font-bold rounded-lg hover:bg-neon-green/90 transition-all hover:scale-105 active:scale-95 glow-box w-full sm:w-auto"
            >
              Ver Projetos
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border border-neon-green/30 text-neon-green font-orbitron font-bold rounded-lg hover:bg-neon-green/10 transition-all w-full sm:w-auto"
            >
              Contactar
            </button>
          </div>

          {/* Status Discreto */}
          <div className="flex items-center justify-center md:justify-start gap-3 text-sm text-white/50 font-orbitron">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs uppercase tracking-wider">Disponível</span>
            </div>
            <span>•</span>
            <span>Luanda, Angola</span>
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

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          onClick={() => {
            document.getElementById('about')?.scrollIntoView({
              behavior: 'smooth'
            });
          }}
          aria-label="Rolar para a seção Sobre"
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-transparent border-none cursor-pointer"
        >
          <ChevronDown 
            className="w-8 h-8 text-neon-green animate-bounce"
          />
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
