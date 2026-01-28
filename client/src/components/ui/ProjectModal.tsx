import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Code, Eye, Copy, Check } from "lucide-react";
import NeonButton from "./NeonButton";
import GlowCard from "./GlowCard";
import { useAudio } from "../../lib/stores/useAudio";

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  live: string;
  longDescription?: string;
  features?: string[];
  codeSnippet?: string;
  demoImages?: string[];
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const { playSuccess, playButtonClick } = useAudio();
  const [activeTab, setActiveTab] = useState<'overview' | 'gallery'>('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveTab('overview');
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleTabChange = (tab: 'overview' | 'gallery') => {
    setActiveTab(tab);
    playButtonClick();
  };

  if (!project) return null;

  const mockFeatures = project.features || [
    "Design responsivo para todos os dispositivos",
    "Sincronização de dados em tempo real",
    "Sistema de animação avançado",
    "Performance otimizada",
    "Padrões modernos de UI/UX",
    "Segurança e autenticação"
  ];

  const mockDemoImages = project.demoImages || [
    project.image,
    "/textures/sky.png",
    "/textures/wood.jpg",
    "/textures/grass.png"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden z-[9999]"
            onClick={(e) => e.stopPropagation()}
          >
            <GlowCard className="h-full overflow-hidden flex flex-col bg-neutral-950/90 backdrop-blur-xl">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
                <div>
                  <h2 className="text-2xl font-geist font-bold text-white tracking-tighter">
                    {project.title}
                  </h2>
                  <p className="text-neutral-400 text-sm mt-1">Detalhes do Projeto</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    aria-label="Ver demonstração ao vivo"
                    className="p-2 bg-white/5 rounded-full text-neutral-300 hover:text-white ring-1 ring-white/10 backdrop-blur transition"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    aria-label="Fechar modal"
                    className="p-2 bg-white/5 rounded-full text-neutral-300 hover:text-white ring-1 ring-white/10 backdrop-blur transition"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/10 shrink-0 px-6" role="tablist">
                {[
                  { id: 'overview', label: 'Visão Geral', icon: Eye },
                  { id: 'gallery', label: 'Galeria', icon: ExternalLink }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    id={`${id}-tab`}
                    onClick={() => handleTabChange(id as any)}
                    role="tab"
                    aria-selected={activeTab === id}
                    aria-controls={`${id}-panel`}
                    tabIndex={activeTab === id ? 0 : -1}
                    className={`flex items-center space-x-2 px-6 py-4 font-geist text-sm transition-all relative ${
                      activeTab === id
                        ? 'text-white'
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium tracking-tight">{label}</span>
                    {activeTab === id && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="p-8 overflow-y-auto flex-grow h-[400px]">
                {/* Overview Panel */}
                <div
                  id="overview-panel"
                  role="tabpanel"
                  aria-labelledby="overview-tab"
                  hidden={activeTab !== 'overview'}
                  className="space-y-10 max-w-3xl mx-auto"
                >
                  {/* Hero Image */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* Description */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-geist font-bold text-white tracking-tighter">
                      Sobre este Projeto
                    </h3>
                    <p className="text-neutral-300 leading-relaxed text-lg font-geist font-light">
                      {project.longDescription || project.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Tech Stack */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-geist font-bold text-white tracking-tighter">
                        Tecnologias Utilizadas
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, index) => (
                          <span
                            key={index}
                            className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-neutral-300 text-sm font-geist font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-geist font-bold text-white tracking-tighter">
                        Principais Funcionalidades
                      </h3>
                      <ul className="space-y-3">
                        {mockFeatures.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-3 text-neutral-300 text-sm font-geist"
                          >
                            <div className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Gallery Panel */}
                <div
                  id="gallery-panel"
                  role="tabpanel"
                  aria-labelledby="gallery-tab"
                  hidden={activeTab !== 'gallery'}
                  className="space-y-8 max-w-4xl mx-auto"
                >
                  <h3 className="text-xl font-geist font-bold text-white tracking-tighter">
                    Galeria do Projeto
                  </h3>
                  
                  {/* Main Image */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
                    <motion.img
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      src={mockDemoImages[currentImageIndex]}
                      alt={`${project.title} - Imagem ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Thumbnail Grid */}
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {mockDemoImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                          index === currentImageIndex
                            ? 'border-white ring-2 ring-white/20'
                            : 'border-white/10 hover:border-white/40'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between p-8 border-t border-white/10 shrink-0 bg-neutral-900/50">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-8 py-3 text-sm font-bold shadow-xl hover:bg-neutral-200 transition-all font-geist"
                >
                  Acessar Projeto
                  <ExternalLink className="h-4 w-4" />
                </a>
                <button 
                  onClick={onClose}
                  className="px-6 py-3 text-sm font-bold text-neutral-400 hover:text-white transition-colors font-geist"
                >
                  Fechar
                </button>
              </div>
            </GlowCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;