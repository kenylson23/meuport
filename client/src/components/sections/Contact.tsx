import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, MessageCircle } from "lucide-react";
import NeonButton from "../ui/NeonButton";
import GlowCard from "../ui/GlowCard";
import { useAudio } from "../../lib/stores/useAudio";

const Contact = () => {
  const { playSuccess } = useAudio();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    // Play success sound
    playSuccess();
    // Clear form
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "E-mail",
      value: "kenylsonlourenco0@gmail.com",
      link: "mailto:kenylsonlourenco0@gmail.com",
      isWhatsApp: false
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "WhatsApp",
      value: "+244 949 639 932",
      link: "https://wa.me/244949639932?text=Ol%C3%A1%20Kenylson%2C%20vim%20do%20seu%20portf%C3%B3lio!",
      isWhatsApp: true
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Localização",
      value: "Disponível Mundialmente",
      link: "#",
      isWhatsApp: false
    }
  ];

  return (
    <section id="contact" className="min-h-screen py-20 relative">
      <div className="max-w-6xl mx-auto px-4 z-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-white mb-6">
            Entre em <span className="text-neon-green glow-text">Contato</span>
          </h2>
          <div className="w-24 h-1 bg-neon-green mx-auto mb-8 glow-box"></div>
          <p className="text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
            Pronto para dar vida às suas ideias? Vamos criar algo incrível juntos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <GlowCard className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-neon-green font-orbitron text-sm font-semibold mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-neon-green/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-neon-green focus:glow-input transition-all duration-300"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-neon-green font-orbitron text-sm font-semibold mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-neon-green/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-neon-green focus:glow-input transition-all duration-300"
                    placeholder="seu.email@exemplo.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-neon-green font-orbitron text-sm font-semibold mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-neon-green/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-neon-green focus:glow-input transition-all duration-300 resize-none"
                    placeholder="Conte-me sobre seu projeto..."
                  />
                </div>

                <NeonButton type="submit" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Mensagem
                </NeonButton>
              </form>
            </GlowCard>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h3 className="text-3xl font-orbitron text-white mb-4">
                Vamos Criar Algo <span className="text-neon-green">Incrível</span>
              </h3>
              <p className="text-white/70 text-lg leading-relaxed">
                Estou sempre animado para trabalhar em novos projetos e colaborar com mentes criativas. 
                Seja para uma ideia específica ou consultoria, estou aqui para ajudar a tornar 
                sua visão realidade.
              </p>
            </div>

            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.link}
                target={info.isWhatsApp ? '_blank' : undefined}
                rel={info.isWhatsApp ? 'noopener noreferrer' : undefined}
                aria-label={info.isWhatsApp ? 'Abrir conversa no WhatsApp' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="block"
              >
                <GlowCard className="p-6 hover:border-neon-green transition-colors duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="text-neon-green">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-orbitron font-semibold">
                        {info.title}
                      </h4>
                      <p className="text-white/70">
                        {info.value}
                      </p>
                    </div>
                  </div>
                </GlowCard>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-8 border-t border-neon-green/20"
        >
          <p className="text-white/60 font-orbitron">
            © 2025 Kenylson Lourenço. Construído com paixão e código.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
