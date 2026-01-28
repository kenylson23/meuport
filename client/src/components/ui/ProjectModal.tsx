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
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <GlowCard className="h-full overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-neon-green/20">
                <div>
                  <h2 className="text-2xl font-orbitron font-bold text-white">
                    {project.title}
                  </h2>
                  <p className="text-neon-green text-sm mt-1">Detalhes do Projeto</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    aria-label="Ver demonstração ao vivo"
                    className="p-2 text-neon-green hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    aria-label="Fechar modal"
                    className="p-2 text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-neon-green/20" role="tablist">
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
                    className={`flex items-center space-x-2 px-6 py-3 font-orbitron text-sm transition-colors ${
                      activeTab === id
                        ? 'text-neon-green border-b-2 border-neon-green'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {/* Overview Panel */}
                <div
                  id="overview-panel"
                  role="tabpanel"
                  aria-labelledby="overview-tab"
                  hidden={activeTab !== 'overview'}
                  className="space-y-6"
                >
                  {/* Hero Image */}
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-orbitron font-semibold text-neon-green mb-3">
                      Sobre este Projeto
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {project.longDescription || project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h3 className="text-lg font-orbitron font-semibold text-neon-green mb-3">
                      Tecnologias Utilizadas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-neon-green/10 border border-neon-green/30 rounded text-neon-green text-sm font-orbitron"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-orbitron font-semibold text-neon-green mb-3">
                      Principais Funcionalidades
                    </h3>
                    <ul className="space-y-2">
                      {mockFeatures.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center space-x-2 text-white/80"
                        >
                          <div className="w-1 h-1 bg-neon-green rounded-full" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Gallery Panel */}
                <div
                  id="gallery-panel"
                  role="tabpanel"
                  aria-labelledby="gallery-tab"
                  hidden={activeTab !== 'gallery'}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-orbitron font-semibold text-neon-green">
                    Galeria do Projeto
                  </h3>
                  
                  {/* Main Image */}
                  <div className="relative h-80 rounded-lg overflow-hidden">
                    <img
                      src={mockDemoImages[currentImageIndex]}
                      alt={`${project.title} - Imagem ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Thumbnail Grid */}
                  <div className="grid grid-cols-4 gap-2">
                    {mockDemoImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`Ver imagem ${index + 1}`}
                        aria-current={index === currentImageIndex}
                        className={`relative h-20 rounded overflow-hidden border-2 transition-colors hover:scale-105 ${
                          index === currentImageIndex
                            ? 'border-neon-green'
                            : 'border-transparent hover:border-neon-green/50'
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
              <div className="flex items-center justify-between p-6 border-t border-neon-green/20">
                <div className="flex space-x-3">
                  <NeonButton
                    onClick={() => window.open(project.live, '_blank')}
                    size="sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Acessar Projeto
                  </NeonButton>
                </div>
                <NeonButton variant="outline" onClick={onClose}>
                  Fechar
                </NeonButton>
              </div>
            </GlowCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;