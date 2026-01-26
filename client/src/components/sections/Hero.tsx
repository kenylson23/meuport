import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import Typewriter from "typewriter-effect";

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 500], [0, 45]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8 overflow-hidden py-32">
      {/* Decorative 3D-like elements */}
      <motion.div 
        style={{ y: y1, rotate }}
        className="absolute top-20 left-[10%] w-64 h-64 bg-neon-green/5 rounded-full blur-3xl -z-10"
      />
      <motion.div 
        style={{ y: y2, rotate: -rotate }}
        className="absolute bottom-20 right-[10%] w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10"
      />

      <div className="z-20 max-w-6xl mx-auto relative grid md:grid-cols-2 gap-6 sm:gap-10 md:gap-16 items-center">
        {/* Informações - Coluna Esquerda */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="order-2 md:order-1 text-center md:text-left space-y-8"
        >
          {/* Nome Principal */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-neon-green font-orbitron text-sm sm:text-base tracking-[0.4em] uppercase font-bold"
            >
              Full Stack Developer
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-orbitron font-black leading-[0.9] tracking-tighter">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="block text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              >
                KENYLSON
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="block text-neon-green filter brightness-125 mt-2 drop-shadow-[0_0_20px_rgba(57,255,20,0.5)]"
              >
                LOURENÇO
              </motion.span>
            </h1>

            <div className="h-8 text-xl md:text-2xl font-orbitron text-cyan-400 font-bold">
              <Typewriter
                options={{
                  strings: [
                    'Transformando ideias em código.',
                    'Criando experiências 3D.',
                    'Desenvolvendo o futuro da web.',
                    'Especialista em React & Node.'
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                  delay: 80
                }}
              />
            </div>
          </div>
          
          {/* Descrição Simplificada */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-lg sm:text-xl text-slate-200 font-medium max-w-lg mx-auto md:mx-0 leading-relaxed drop-shadow-sm"
          >
            Especialista em <span className="text-white border-b border-neon-green/30">React</span>, <span className="text-white border-b border-neon-green/30">TypeScript</span> e experiências <span className="text-white border-b border-neon-green/30">3D interativas</span> com mais de 3 anos de estrada.
          </motion.p>
          
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
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ 
            duration: 1.5, 
            delay: 0.2,
            type: "spring",
            stiffness: 100
          }}
          className="order-1 md:order-2 flex justify-center md:justify-end"
        >
          <div className="relative group cursor-none">
            {/* Interactive Glow following mouse */}
            <motion.div 
              className="absolute -inset-10 bg-neon-green/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 transform transition-transform duration-700 group-hover:scale-105 group-hover:rotate-3">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-green via-cyan-400 to-purple-500 p-1.5 glow-strong animate-pulse shadow-[0_0_50px_rgba(57,255,20,0.3)]">
                <img 
                  src="/images/profile.png" 
                  alt="Kenylson Lourenço - Desenvolvedor Full Stack"
                  className="w-full h-full rounded-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              
              {/* Floating tech rings */}
              <div className="absolute -inset-4 border border-neon-green/20 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute -inset-8 border border-cyan-400/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              
              {/* Floating particles around photo */}
              <div className="absolute -inset-4">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                    className="absolute w-2 h-2 bg-neon-green rounded-full shadow-[0_0_10px_#39ff14]"
                    style={{
                      left: `${Math.sin(i) * 50 + 50}%`,
                      top: `${Math.cos(i) * 50 + 50}%`,
                    }}
                  />
                ))}
              </div>
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
