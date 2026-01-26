import { motion } from "framer-motion";
import { Code, Database, Globe, Zap } from "lucide-react";
import GlowCard from "../ui/GlowCard";

const About = () => {
  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Desenvolvimento Frontend",
      description: "React, Vue, Angular, Three.js"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Desenvolvimento Backend",
      description: "Node.js, Python, PHP, Bancos de Dados"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Soluções Full Stack",
      description: "Aplicações web completas"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "3D e Interativo",
      description: "WebGL, Three.js, Animações"
    }
  ];

  return (
    <section id="about" className="min-h-screen py-20 relative">
      <div className="max-w-6xl mx-auto px-4 z-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-white mb-6">
            Sobre <span className="text-neon-green glow-text">Mim</span>
          </h2>
          <div className="w-24 h-1 bg-neon-green mx-auto mb-8 glow-box"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Profile Photo for About Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="mb-8 md:hidden"
            >
              <div className="relative w-40 h-40 mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-green/50 to-cyan-400/50 p-1">
                  <img 
                    src="/images/profile.png" 
                    alt="Kenylson Lourenço"
                    className="w-full h-full rounded-full object-cover border-2 border-neon-green/30"
                  />
                </div>
              </div>
            </motion.div>

            <h3 className="text-3xl font-orbitron text-neon-green mb-6">
              Desenvolvedor Apaixonado
            </h3>
            <div className="space-y-6 text-white/80 text-lg leading-relaxed">
              <p>
                Sou <span className="text-neon-green font-semibold">Kenylson Lourenço</span>, um desenvolvedor full-stack apaixonado por criar 
                experiências digitais <span className="text-white font-semibold italic">immersivas</span>. Com expertise em tecnologias modernas, 
                me especializo em construir aplicações web que combinam <span className="text-cyan-400 font-semibold">funcionalidade robusta</span> com um apelo visual impactante.
              </p>
              <p>
                Minha jornada vai do desenvolvimento web tradicional até experiências <span className="text-purple-400 font-semibold">3D interativas</span>. 
                Acredito em expandir os limites da web, criando soluções que não apenas funcionam perfeitamente, mas também <span className="text-neon-green font-semibold">inspiram e engajam</span> usuários em cada interação.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Profile Photo for Desktop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="hidden md:block"
            >
              <div className="relative w-64 h-64 mx-auto">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-green/30 via-cyan-400/20 to-purple-500/20 p-2 backdrop-blur-sm border border-neon-green/30">
                  <img 
                    src="/images/profile.png" 
                    alt="Kenylson Lourenço - Desenvolvedor Full Stack"
                    className="w-full h-full rounded-2xl object-cover"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-neon-green rounded-full animate-pulse" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-cyan-400 rounded-full animate-ping" />
              </div>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <GlowCard key={index} className="p-6 text-center">
                <div className="text-neon-green mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h4 className="text-white font-orbitron text-sm font-semibold mb-2">
                  {feature.title}
                </h4>
                <p className="text-white/60 text-xs">
                  {feature.description}
                </p>
              </GlowCard>
            ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
