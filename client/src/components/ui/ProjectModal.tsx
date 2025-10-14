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
  const [activeTab, setActiveTab] = useState<'overview' | 'code' | 'gallery'>('overview');
  const [copiedCode, setCopiedCode] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
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

  const handleCopyCode = async () => {
    if (project?.codeSnippet) {
      try {
        await navigator.clipboard.writeText(project.codeSnippet);
        setCopiedCode(true);
        playSuccess();
        setTimeout(() => setCopiedCode(false), 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    }
  };

  const handleTabChange = (tab: 'overview' | 'code' | 'gallery') => {
    setActiveTab(tab);
    playButtonClick();
  };

  if (!project) return null;

  const mockCodeSnippet = `// ${project.title} - Core Implementation
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ${project.title.replace(/[^a-zA-Z0-9]/g, '')} = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Initialize component
    setIsLoaded(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="component-container"
    >
      <h1>{isLoaded ? '${project.title}' : 'Loading...'}</h1>
      {/* Component implementation */}
    </motion.div>
  );
};

export default ${project.title.replace(/[^a-zA-Z0-9]/g, '')};`;

  const mockFeatures = project.features || [
    "Responsive design for all devices",
    "Real-time data synchronization",
    "Advanced animation system",
    "Optimized performance",
    "Modern UI/UX patterns",
    "Secure authentication"
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
            className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <GlowCard className="h-full overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-neon-green/20">
                <div>
                  <h2 className="text-2xl font-orbitron font-bold text-white">
                    {project.title}
                  </h2>
                  <p className="text-neon-green text-sm mt-1">Interactive Project Details</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    aria-label="Ver código-fonte no GitHub"
                    className="p-2 text-neon-green hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
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
                  { id: 'overview', label: 'Overview', icon: Eye },
                  { id: 'code', label: 'Code', icon: Code },
                  { id: 'gallery', label: 'Gallery', icon: ExternalLink }
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
              <div className="p-6 h-96 overflow-y-auto">
                {/* Overview Panel */}
                <div
                  id="overview-panel"
                  role="tabpanel"
                  aria-labelledby="overview-tab"
                  hidden={activeTab !== 'overview'}
                  className="space-y-6"
                >
                  {/* Hero Image */}
                  <div className="relative h-48 rounded-lg overflow-hidden">
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
                      About This Project
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {project.longDescription || project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h3 className="text-lg font-orbitron font-semibold text-neon-green mb-3">
                      Technologies Used
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
                      Key Features
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

                {/* Code Panel */}
                <div
                  id="code-panel"
                  role="tabpanel"
                  aria-labelledby="code-tab"
                  hidden={activeTab !== 'code'}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-orbitron font-semibold text-neon-green">
                      Code Preview
                    </h3>
                    <NeonButton
                      size="sm"
                      variant="outline"
                      onClick={handleCopyCode}
                      className="flex items-center space-x-2"
                    >
                      {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
                    </NeonButton>
                  </div>
                  
                  <div className="relative">
                    <pre className="bg-black/50 border border-neon-green/20 rounded-lg p-4 overflow-x-auto text-sm">
                      <code className="text-white/90 font-mono">
                        {project.codeSnippet || mockCodeSnippet}
                      </code>
                    </pre>
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
                    Project Gallery
                  </h3>
                  
                  {/* Main Image */}
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <img
                      src={mockDemoImages[currentImageIndex]}
                      alt={`${project.title} - Image ${currentImageIndex + 1}`}
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
                        className={`relative h-16 rounded overflow-hidden border-2 transition-colors hover:scale-105 ${
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
                    onClick={() => window.open(project.github, '_blank')}
                    variant="outline"
                    size="sm"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Source
                  </NeonButton>
                  <NeonButton
                    onClick={() => window.open(project.live, '_blank')}
                    size="sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </NeonButton>
                </div>
                <NeonButton variant="outline" onClick={onClose}>
                  Close
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