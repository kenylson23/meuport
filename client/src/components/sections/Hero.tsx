import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Sparkles, Star, Rocket, ShieldCheck, Play, ArrowRight } from "lucide-react";
import Typewriter from "typewriter-effect";

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 500], [0, 45]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8 overflow-hidden pt-24 pb-12 lg:pt-32 lg:pb-20">
      {/* Decorative 3D-like elements */}
      <motion.div 
        style={{ y: y1, rotate }}
        className="absolute top-20 left-[10%] w-64 h-64 bg-neon-green/5 rounded-full blur-3xl -z-10"
      />
      <motion.div 
        style={{ y: y2, rotate: -rotate }}
        className="absolute bottom-20 right-[10%] w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10"
      />

      <div className="max-w-6xl mx-auto relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center min-h-[500px]">
          
          {/* Content Card - Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1 h-full flex flex-col justify-center"
          >
            <div className="p-5 sm:p-6 lg:p-8 shadow-2xl border border-white/10 rounded-3xl bg-black/40 backdrop-blur-[40px] relative overflow-hidden group h-fit max-w-xl mx-auto lg:mx-0">
              {/* Subtle background glow */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-neon-green/20 rounded-full blur-3xl group-hover:bg-neon-green/30 transition-colors duration-700" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-medium text-white/70 font-orbitron uppercase tracking-wider">Desenvolvedor Full Stack Sênior</span>
              </div>

              <div className="space-y-3 mb-6">
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-neon-green font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-bold"
                >
                  Kenylson Lourenço
                </motion.div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="block drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                  >
                    VIVA O
                  </motion.span>
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="block text-neon-green filter brightness-125 drop-shadow-[0_0_25px_rgba(57,255,20,0.6)]"
                  >
                    FUTURO
                  </motion.span>
                </h1>

                <div className="h-6 text-base md:text-lg font-mono text-cyan-400 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
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

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-base text-slate-200 leading-relaxed mb-8 font-sans max-w-md drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
              >
                Especialista em construir aplicações web modernas, seguras e altamente interativas. Foco em <span className="text-white font-bold">performance</span> e <span className="text-white font-bold">experiência do usuário</span>.
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-3 mb-12">
                <button 
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-neon-green/20 text-white text-xs font-bold border border-neon-green/40 transition-all duration-300 hover:bg-neon-green/30 hover:border-neon-green/60 hover:scale-105 shadow-[0_0_15px_rgba(57,255,20,0.2)]"
                >
                  <span>Ver Projetos</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </button>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/[0.05] text-white/90 text-xs font-bold border border-white/20 transition-all duration-300 hover:bg-white/10 hover:border-white/30"
                >
                  <Play className="w-3.5 h-3.5 mr-2 fill-current" />
                  <span>Contato</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div className="text-center group/item">
                  <div className="w-10 h-10 flex border-white/30 border rounded-xl mx-auto mb-2 items-center justify-center bg-white/[0.08] group-hover/item:border-neon-green/60 transition-colors shadow-lg">
                    <Rocket className="w-4 h-4 text-white group-hover/item:text-neon-green transition-colors" />
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-widest drop-shadow-md">Entrega Rápida</div>
                </div>
                <div className="text-center group/item">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 border border-white/30 bg-white/[0.08] group-hover/item:border-cyan-400/60 transition-colors shadow-lg">
                    <Star className="w-4 h-4 text-white group-hover/item:text-cyan-400 transition-colors" />
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-widest drop-shadow-md">Alta Qualidade</div>
                </div>
                <div className="text-center group/item">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 border border-white/30 bg-white/[0.08] group-hover/item:border-purple-400/60 transition-colors shadow-lg">
                    <ShieldCheck className="w-4 h-4 text-white group-hover/item:text-purple-400 transition-colors" />
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-widest drop-shadow-md">Código Seguro</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visual Side - Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative order-1 lg:order-2 max-w-md mx-auto"
          >
            <div className="overflow-hidden border border-white/10 rounded-3xl shadow-2xl bg-white/[0.03] relative group">
              <div className="absolute top-6 left-6 flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-medium border border-neon-green/20 z-10 bg-neon-green/10 backdrop-blur-[40px]">
                <div className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse shadow-[0_0_8px_#39ff14]"></div>
                <span className="text-white font-orbitron tracking-wider">STATUS: DISPONÍVEL</span>
              </div>
              
              <div className="relative aspect-[4/5] lg:aspect-[3/4] lg:h-[500px]">
                <img 
                  src="/images/profile.png" 
                  alt="Kenylson Lourenço" 
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              </div>

              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-4">
                <div className="border-white/10 border rounded-2xl p-4 bg-white/[0.15] backdrop-blur-[40px] hover:border-neon-green/30 transition-colors group/stat">
                  <div className="text-xl text-white font-orbitron font-bold group-hover/stat:text-neon-green transition-colors">3+ Anos</div>
                  <div className="text-[9px] text-white/60 mt-1 font-orbitron uppercase tracking-widest">Experiência</div>
                </div>
                <div className="rounded-2xl p-4 border border-white/10 bg-white/[0.15] backdrop-blur-[40px] hover:border-cyan-400/30 transition-colors group/stat">
                  <div className="text-xl text-white font-orbitron font-bold group-hover/stat:text-cyan-400 transition-colors">100%</div>
                  <div className="text-[9px] text-white/60 mt-1 font-orbitron uppercase tracking-widest">Comprometimento</div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements behind image */}
            <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -z-10 -top-10 -left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-700" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
