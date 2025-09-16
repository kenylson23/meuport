import { motion } from "framer-motion";
import { Code, Database, Globe, Zap } from "lucide-react";
import GlowCard from "../ui/GlowCard";

const About = () => {
  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Frontend Development",
      description: "React, Vue, Angular, Three.js"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Backend Development",
      description: "Node.js, Python, PHP, Databases"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Full Stack Solutions",
      description: "Complete web applications"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "3D & Interactive",
      description: "WebGL, Three.js, Animations"
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
            About <span className="text-neon-green glow-text">Me</span>
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
              Passionate Developer
            </h3>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              I'm Kenylson Lourenço, a passionate full-stack developer who loves creating 
              immersive digital experiences. With expertise across multiple programming 
              languages and frameworks, I specialize in building modern web applications 
              that combine functionality with stunning visual appeal.
            </p>
            <p className="text-white/80 text-lg leading-relaxed">
              My journey in technology spans from traditional web development to cutting-edge 
              3D interactive experiences. I believe in pushing the boundaries of what's 
              possible on the web, creating solutions that not only work flawlessly but 
              also inspire and engage users.
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
