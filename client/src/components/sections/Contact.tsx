import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Calendar, Instagram, Linkedin, MessageCircle, Twitter } from "lucide-react";
import { useAudio } from "../../lib/stores/useAudio";

const Contact = () => {
  const { playSuccess } = useAudio();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    budget: "$5k - $10k"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Mensagem de ${formData.name}`;
    const body = `Nome: ${formData.name}\nEmail: ${formData.email}\nOrçamento: ${formData.budget}\n\nMensagem:\n${formData.message}`;
    const mailtoLink = `mailto:kenylsonlourenco0@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;
    playSuccess();
    setFormData({ name: "", email: "", message: "", budget: "$5k - $10k" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section
      className="md:pt-40 bg-center z-[70] bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/77f55872-adf5-4910-9a7c-d21c0041bbe1_3840w.webp)] bg-cover pt-40 pb-40 relative"
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 55%, black 60%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 55%, black 60%, transparent)"
      }}
      id="contact"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-10 h-[70vh] w-[60vh] rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.15), rgba(0,0,0,0))" }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-neutral-100"
          >
            <Mail className="h-4 w-4" />
            Let's Work Together
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-4xl sm:text-6xl tracking-tight font-semibold text-white"
          >
            Ready to <span className="italic font-serif font-medium text-neutral-200">collaborate?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-neutral-400 text-lg max-w-2xl mx-auto"
          >
            Whether you need help with product design, strategy, or education, I'm here to help bring your vision to life.
          </motion.p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="">
                  <label className="block text-sm font-medium text-neutral-300 mb-2">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-neutral-100 placeholder-neutral-400 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20" 
                    placeholder="Your name" 
                  />
                </div>
                <div className="">
                  <label className="block text-sm font-medium text-neutral-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-neutral-100 placeholder-neutral-400 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20" 
                    placeholder="your@email.com" 
                  />
                </div>
              </div>
              <div className="">
                <label className="block text-sm font-medium text-neutral-300 mb-2">Project Budget</label>
                <select 
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-neutral-100 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20"
                >
                  <option>$5k - $10k</option>
                  <option>$10k - $25k</option>
                  <option>$25k - $50k</option>
                  <option>$50k+</option>
                </select>
              </div>
              <div className="">
                <label className="block text-sm font-medium text-neutral-300 mb-2">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4} 
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-neutral-100 placeholder-neutral-400 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20" 
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 border border-white/20 px-6 py-3 text-neutral-100 hover:bg-white/15 transition">
                <span className="font-medium">Send Message</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/10 border-white/10 p-3 shadow-lg">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div className="">
                  <h3 className="text-lg font-semibold text-white">Email</h3>
                  <p className="text-neutral-400">kenylsonlourenco0@gmail.com</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/10 border-white/10 p-3 shadow-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div className="">
                  <h3 className="text-lg font-semibold text-white">Schedule a Call</h3>
                  <p className="text-neutral-400">Book a free consultation</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Follow Me</h3>
              <div className="flex items-center gap-4">
                <a href="#" className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-neutral-400 hover:text-white hover:bg-white/15 transition">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/kenylson_lourenco/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-neutral-400 hover:text-white hover:bg-white/15 transition">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-neutral-400 hover:text-white hover:bg-white/15 transition">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://wa.me/244949639932" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-neutral-400 hover:text-white hover:bg-white/15 transition">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-25 w-[60%] h-8"
          style={{ background: "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 30%, transparent 70%)" }}>
        </div>
        <div className="h-px bg-white/10 w-full"></div>
      </div>
    </section>
  );
};

export default Contact;