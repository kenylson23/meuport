import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Eye } from "lucide-react";
import GlowCard from "../ui/GlowCard";
import NeonButton from "../ui/NeonButton";
import ProjectModal from "../ui/ProjectModal";

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

interface ProjectCardProps {
  project: Project;
  index: number;
  onViewDetails: () => void;
}

const ProjectCard = ({ project, index, onViewDetails }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        rotateY: 5,
        rotateX: 2
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      viewport={{ once: true }}
      style={{ perspective: "1000px" }}
    >
      <GlowCard className="h-full overflow-hidden group">
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
            style={{ 
              backgroundImage: `url(${project.image})`,
              filter: "brightness(0.7)"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          
          {/* Overlay content */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <motion.a
              href={project.github}
              whileHover={{ scale: 1.1 }}
              className="p-2 bg-black/50 rounded-lg text-neon-green hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </motion.a>
            <motion.a
              href={project.live}
              whileHover={{ scale: 1.1 }}
              className="p-2 bg-black/50 rounded-lg text-neon-green hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-orbitron font-bold text-white mb-3 group-hover:text-neon-green transition-colors duration-300">
            {project.title}
          </h3>
          
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-1 bg-neon-green/10 border border-neon-green/30 rounded text-neon-green text-xs font-orbitron"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <NeonButton
              variant="outline"
              size="sm"
              onClick={() => window.open(project.github, '_blank')}
            >
              <Github className="w-4 h-4 mr-1" />
              Código
            </NeonButton>
            <NeonButton
              size="sm"
              onClick={() => window.open(project.live, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Acessar
            </NeonButton>
            <NeonButton
              variant="outline"
              size="sm"
              onClick={onViewDetails}
            >
              <Eye className="w-4 h-4 mr-1" />
              Detalhes
            </NeonButton>
          </div>
        </div>

        {/* 3D border effect */}
        <div className="absolute inset-0 border border-neon-green/20 group-hover:border-neon-green/50 transition-colors duration-300 pointer-events-none" />
      </GlowCard>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const projects: Project[] = [
    {
      title: "Site para Marca de Cerveja Kenito",
      description: "Site moderno para minha marca de cerveja",
      longDescription: "Site criado para minha marca de cerveja baseada na minha marca pessoal com design moderno e paleta de cores a risca.",
      tech: ["React", "TypeScript"],
      image: "/textures/kenito-beer.png",
      github: "#",
      live: "https://kenybeerr.netlify.app/",
      features: [
        "Sobre o produto",
        "Pontos de Venda"
      ]
    },
    {
      title: "Site para Escola de Condução",
      description: "Site moderno e inovador para escola de condução",
      longDescription: "novo conceito de site para escolas de condução",
      tech: ["React", "TypeScript"],
      image: "/textures/escola-conducao.png",
      github: "#",
      live: "https://escoladeconducaomariaolga.netlify.app/",
      features: [
        "Calculadora de Mensalidades",
        "Quiz do Código da Estrada",
        "Dicas de Condução Defensiva",
        "Conselhos para o Exame Prático"
      ]
    },
    {
      title: "Site para Cuca",
      description: "Site feito para a Marca de cerveja Cuca",
      longDescription: "Inspirado na marca de cerveja Cuca",
      tech: ["React", "TypeScript"],
      image: "/textures/cuca-beer.png",
      github: "#",
      live: "https://textcuca.netlify.app/",
      features: [
        "Nossa História",
        "Pontos de Venda",
        "Galeria dos Fãs"
      ]
    },
    {
      title: "Site para o colégio Narfive",
      description: "Site moderno e inovador para colégio",
      longDescription: "Baseado em uma melhor experiência para os clientes do colégio",
      tech: ["React", "TypeScript"],
      image: "/textures/colegio-narfive.png",
      github: "#",
      live: "https://narff.netlify.app/",
      features: [
        "Nossos Programas",
        "Galeria Fotográfica",
        "Calculadora de Mensalidades",
        "Tour Virtual"
      ]
    },
    {
      title: "App Web Mobile-First",
      description: "Progressive Web App com capacidades offline, notificações push e design responsivo.",
      tech: ["Vue.js", "PWA", "Service Workers", "Firebase"],
      image: "/textures/sand.jpg",
      github: "#",
      live: "#"
    },
    {
      title: "Ferramenta Alimentada por IA",
      description: "Aplicação web de aprendizado de máquina para reconhecimento e classificação de imagens com processamento em tempo real.",
      tech: ["Python", "TensorFlow", "Flask", "React"],
      image: "/textures/sky.png",
      github: "#",
      live: "#"
    }
  ];

  return (
    <section id="projects" className="min-h-screen py-32 relative flex items-center">
      <div className="max-w-7xl mx-auto px-4 z-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-white mb-6">
            Projetos em <span className="text-neon-green glow-text">Destaque</span>
          </h2>
          <div className="w-24 h-1 bg-neon-green mx-auto mb-8 glow-box"></div>
          <p className="text-white/70 text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4">
            Uma vitrine do meu trabalho recente em diferentes tecnologias e domínios
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard 
                project={project} 
                index={index} 
                onViewDetails={() => handleViewDetails(project)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Projects;
