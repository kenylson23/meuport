import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import GlowCard from "../ui/GlowCard";
import NeonButton from "../ui/NeonButton";

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  live: string;
}

interface ProjectCard3DProps {
  project: Project;
  index: number;
}

const ProjectCard3D = ({ project, index }: ProjectCard3DProps) => {
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
          <div className="flex space-x-3">
            <NeonButton
              variant="outline"
              size="sm"
              onClick={() => window.open(project.github, '_blank')}
              className="flex-1"
            >
              <Github className="w-4 h-4 mr-1" />
              Code
            </NeonButton>
            <NeonButton
              size="sm"
              onClick={() => window.open(project.live, '_blank')}
              className="flex-1"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Live
            </NeonButton>
          </div>
        </div>

        {/* 3D border effect */}
        <div className="absolute inset-0 border border-neon-green/20 group-hover:border-neon-green/50 transition-colors duration-300 pointer-events-none" />
      </GlowCard>
    </motion.div>
  );
};

export default ProjectCard3D;
