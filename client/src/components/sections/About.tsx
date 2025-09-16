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
            <h3 className="text-3xl font-orbitron text-neon-green mb-6">
              Desenvolvedor Apaixonado
            </h3>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              Sou Kenylson Lourenço, um desenvolvedor full-stack apaixonado que adora criar 
              experiências digitais imersivas. Com expertise em múltiplas linguagens de programação 
              e frameworks, me especializo em construir aplicações web modernas 
              que combinam funcionalidade com apelo visual impressionante.
            </p>
            <p className="text-white/80 text-lg leading-relaxed">
              Minha jornada na tecnologia vai desde o desenvolvimento web tradicional até 
              experiências 3D interativas de ponta. Acredito em expandir os limites do que é 
              possível na web, criando soluções que não apenas funcionam perfeitamente, mas 
              também inspiram e engajam usuários.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
