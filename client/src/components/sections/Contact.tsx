import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import NeonButton from "../ui/NeonButton";
import GlowCard from "../ui/GlowCard";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
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
      title: "Email",
      value: "kenylson@example.com",
      link: "mailto:kenylson@example.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: "+123 456 7890",
      link: "tel:+1234567890"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: "Available Worldwide",
      link: "#"
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
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-white mb-6">
            Get In <span className="text-neon-green glow-text">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-neon-green mx-auto mb-8 glow-box"></div>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
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
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-neon-green/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-neon-green focus:glow-input transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-neon-green font-orbitron text-sm font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-neon-green/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-neon-green focus:glow-input transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-neon-green font-orbitron text-sm font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-neon-green/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-neon-green focus:glow-input transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <NeonButton type="submit" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
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
                Let's Create Something <span className="text-neon-green">Amazing</span>
              </h3>
              <p className="text-white/70 text-lg leading-relaxed">
                I'm always excited to work on new projects and collaborate with creative minds. 
                Whether you have a specific idea or need consultation, I'm here to help bring 
                your vision to reality.
              </p>
            </div>

            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.link}
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
            © 2025 Kenylson Lourenço. Built with passion and code.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
