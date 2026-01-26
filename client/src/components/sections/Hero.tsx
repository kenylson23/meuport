import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Sparkles, Star, Rocket, ShieldCheck, Play, ArrowRight } from "lucide-react";
import Typewriter from "typewriter-effect";

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 500], [0, 45]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8 overflow-hidden py-20 lg:py-32">
      {/* Decorative 3D-like elements */}
      <motion.div 
        style={{ y: y1, rotate }}
        className="absolute top-20 left-[10%] w-64 h-64 bg-neon-green/5 rounded-full blur-3xl -z-10"
      />
      <motion.div 
        style={{ y: y2, rotate: -rotate }}
        className="absolute bottom-20 right-[10%] w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10"
      />

      <div className="max-w-7xl mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content Card - Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <div className="p-8 lg:p-12 shadow-2xl border border-white/10 rounded-3xl bg-white/[0.03] backdrop-blur-[40px] relative overflow-hidden group">
              {/* Subtle background glow */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-neon-green/10 rounded-full blur-3xl group-hover:bg-neon-green/20 transition-colors duration-700" />
              
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-medium text-white/50 font-orbitron">5.0 • Desenvolvedor Full Stack Sênior</span>
              </div>

              <div className="space-y-4 mb-8">
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-neon-green font-orbitron text-sm sm:text-base tracking-[0.4em] uppercase font-bold"
                >
                  Kenylson Lourenço
                </motion.div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-orbitron font-black leading-[1.1] tracking-tight text-white">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="block"
                  >
                    EXPERIENCE THE
                  </motion.span>
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="block text-neon-green filter brightness-125 drop-shadow-[0_0_20px_rgba(57,255,20,0.4)]"
                  >
                    FUTURE
                  </motion.span>
                </h1>

                <div className="h-8 text-lg md:text-xl font-orbitron text-cyan-400 font-bold">
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
                className="text-lg text-slate-300 leading-relaxed mb-12 font-sans max-w-lg"
              >
                Especialista em construir aplicações web modernas, seguras e altamente interativas. Foco em <span className="text-white font-bold">performance</span> e <span className="text-white font-bold">experiência do usuário</span>.
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <button 
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-neon-green/10 text-white text-sm font-bold font-orbitron border border-neon-green/20 transition-all duration-300 hover:bg-neon-green/20 hover:border-neon-green/40 hover:scale-105"
                >
                  <span>Ver Projetos</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/[0.03] text-white/80 text-sm font-bold font-orbitron border border-white/10 transition-all duration-300 hover:bg-white/5 hover:border-white/20"
                >
                  <Play className="w-4 h-4 mr-2 fill-current" />
                  <span>Contato</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:gap-8">
                <div className="text-center group/item">
                  <div className="w-10 h-10 flex border-white/10 border rounded-xl mx-auto mb-3 items-center justify-center bg-white/[0.03] group-hover/item:border-neon-green/40 transition-colors">
                    <Rocket className="w-4 h-4 text-white group-hover/item:text-neon-green transition-colors" />
                  </div>
                  <div className="text-[10px] sm:text-xs font-medium text-white/70 font-orbitron uppercase tracking-tighter">Fast Delivery</div>
                </div>
                <div className="text-center group/item">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 border border-white/10 bg-white/[0.03] group-hover/item:border-cyan-400/40 transition-colors">
                    <Star className="w-4 h-4 text-white group-hover/item:text-cyan-400 transition-colors" />
                  </div>
                  <div className="text-[10px] sm:text-xs font-medium text-white/70 font-orbitron uppercase tracking-tighter">High Quality</div>
                </div>
                <div className="text-center group/item">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 border border-white/10 bg-white/[0.03] group-hover/item:border-purple-400/40 transition-colors">
                    <ShieldCheck className="w-4 h-4 text-white group-hover/item:text-purple-400 transition-colors" />
                  </div>
                  <div className="text-[10px] sm:text-xs font-medium text-white/70 font-orbitron uppercase tracking-tighter">Secure Code</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visual Side - Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative order-1 lg:order-2"
          >
            <div className="overflow-hidden border border-white/10 rounded-3xl shadow-2xl bg-white/[0.03] relative group">
              <div className="absolute top-8 left-8 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium border border-neon-green/20 z-10 bg-neon-green/10 backdrop-blur-[40px]">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse shadow-[0_0_8px_#39ff14]"></div>
                <span className="text-white font-orbitron text-xs tracking-wider">STATUS: DISPONÍVEL</span>
              </div>
              
              <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[700px]">
                <img 
                  src="/images/profile.png" 
                  alt="Kenylson Lourenço" 
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              </div>

              <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-6">
                <div className="border-white/10 border rounded-2xl p-6 bg-white/[0.15] backdrop-blur-[40px] hover:border-neon-green/30 transition-colors group/stat">
                  <div className="text-2xl text-white font-orbitron font-bold group-hover/stat:text-neon-green transition-colors">3+ Anos</div>
                  <div className="text-xs text-white/60 mt-1 font-orbitron uppercase tracking-widest">Experiência</div>
                </div>
                <div className="rounded-2xl p-6 border border-white/10 bg-white/[0.15] backdrop-blur-[40px] hover:border-cyan-400/30 transition-colors group/stat">
                  <div className="text-2xl text-white font-orbitron font-bold group-hover/stat:text-cyan-400 transition-colors">100%</div>
                  <div className="text-xs text-white/60 mt-1 font-orbitron uppercase tracking-widest">Comprometimento</div>
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
