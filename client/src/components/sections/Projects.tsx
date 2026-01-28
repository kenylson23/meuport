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
    <section
      className="relative shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden border-white/10 border rounded-3xl backdrop-blur-lg h-full"
    >
      <div className="p-3 sm:p-4 h-full flex flex-col">
        <div className="relative rounded-2xl overflow-hidden bg-neutral-900 ring-1 ring-white/10 shrink-0">
          <img 
            src={project.image} 
            alt={project.title} 
            className="h-48 sm:h-56 w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div
            className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/60 px-2.5 py-1.5 ring-1 ring-white/10 backdrop-blur">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-[12px] text-neutral-200 font-geist">Available for work</span>
          </div>
          
          {/* External Links Overlay */}
          <div className="absolute top-3 right-3 flex gap-2">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black/60 rounded-full text-neutral-300 hover:text-white ring-1 ring-white/10 backdrop-blur transition"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        <div className="px-2 sm:px-1 flex flex-col flex-grow">
          <h2 className="mt-4 text-xl text-neutral-100 font-geist tracking-tighter line-clamp-1">
            {project.title}
          </h2>
          <p className="mt-1 text-sm text-neutral-400 font-geist line-clamp-2 flex-grow">
            {project.description}
          </p>
          
          {/* Tech Stack */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-neutral-300 text-[10px] font-geist"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="my-5 h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent"></div>
          
          <div className="mb-2 flex items-center gap-2">
            <button
              onClick={onViewDetails}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-4 py-2 text-sm font-medium shadow hover:shadow-lg transition font-geist"
            >
              Ver Detalhes
              <Eye className="h-4 w-4" />
            </button>
            <a 
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition"
            >
              <ExternalLink className="h-4 w-4 text-neutral-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
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
