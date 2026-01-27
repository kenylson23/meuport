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
    <div
      className="h-full"
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
            <a
              href={project.github}
              className="p-2 bg-black/50 rounded-lg text-neon-green hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={project.live}
              className="p-2 bg-black/50 rounded-lg text-neon-green hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-green transition-colors duration-300">
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
                className="px-2 py-1 bg-neon-green/10 border border-neon-green/30 rounded text-neon-green text-xs font-mono font-bold"
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
    </div>
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
      description: "Aumento de 40% na visibilidade da marca online com design focado em conversão.",
      longDescription: "Projeto estratégico focado no lançamento da marca, integrando storytelling com fluxos de venda otimizados.",
      tech: ["React", "Conversion Focus"],
      image: "/textures/kenito-beer.png",
      github: "#",
      live: "https://kenybeerr.netlify.app/",
      features: [
        "Design de alta conversão",
        "Integração com pontos de venda",
        "Otimização para dispositivos móveis"
      ]
    },
    {
      title: "Escola de Condução Maria Olga",
      description: "Redução de 60% no tempo de atendimento via site através de ferramentas interativas.",
      longDescription: "Plataforma digital completa que automatiza dúvidas frequentes e facilita a matrícula de novos alunos.",
      tech: ["React", "Automation"],
      image: "/textures/escola-conducao.png",
      github: "#",
      live: "https://escoladeconducaomariaolga.netlify.app/",
      features: [
        "Calculadora de Mensalidades (Lead Gen)",
        "Quiz Interativo de Retenção",
        "Funil de Matrícula Otimizado"
      ]
    },
    {
      title: "Site para Cuca",
      description: "Estratégia digital que resultou em 25% mais engajamento com a marca.",
      longDescription: "Revitalização da presença digital para uma das maiores marcas de cerveja, focando em experiência do usuário e conversão.",
      tech: ["React", "Brand Strategy"],
      image: "/textures/cuca-beer.png",
      github: "#",
      live: "https://textcuca.netlify.app/",
      features: [
        "Vitrine de Produtos Otimizada",
        "Geolocalização de Pontos de Venda",
        "Social Proof Integration"
      ]
    },
    {
      title: "Colégio Narfive",
      description: "Aumento de 50% nas solicitações de matrícula através do novo tour virtual.",
      longDescription: "Transformação da jornada do pai/aluno no site, facilitando o acesso a informações críticas e conversão.",
      tech: ["React", "UX Design"],
      image: "/textures/colegio-narfive.png",
      github: "#",
      live: "https://narff.netlify.app/",
      features: [
        "Tour Virtual Interativo",
        "Calculadora de Mensalidades",
        "Sistema de Agendamento"
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

  // Duplicate projects for seamless loop
  const duplicatedProjects = [...projects, ...projects];

  return (
    <section id="projects" className="min-h-screen py-24 relative flex flex-col items-center justify-center overflow-hidden">
      <style>{`
        @keyframes scroll-projects {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .projects-infinite-scroll {
          animation: scroll-projects 40s linear infinite;
        }
        .projects-infinite-scroll:hover {
          animation-play-state: paused;
        }
        .projects-mask {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 z-20 relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Soluções que <span className="text-neon-green/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Geram Valor</span>
          </h2>
          <div className="w-16 h-1 bg-neon-green mx-auto mb-6 glow-box"></div>
          <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto px-4 font-sans">
            Confira como ajudei empresas a alcançarem resultados reais através de tecnologia e design estratégico.
          </p>
        </motion.div>

        <div className="relative w-full py-10 projects-mask">
          <div className="projects-infinite-scroll flex gap-8 w-max">
            {duplicatedProjects.map((project, index) => (
              <div
                key={`${project.title}-${index}`}
                className="w-[300px] sm:w-[350px] md:w-[400px] flex-shrink-0"
              >
                <ProjectCard 
                  project={project} 
                  index={index} 
                  onViewDetails={() => handleViewDetails(project)}
                />
              </div>
            ))}
          </div>
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
