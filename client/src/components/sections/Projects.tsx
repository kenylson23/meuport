import { useRef, CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LiveProjectButton from "../ui/LiveProjectButton";
import FadeIn from "../ui/FadeIn";

interface ProjectData {
  number: string;
  category: string;
  name: string;
  href: string;
  col1img1: string;
  col1img2: string;
  col2img: string;
}

const projects: ProjectData[] = [
  {
    number: "01",
    category: "Cliente",
    name: "Escola de Condução KL",
    href: "https://escoladeconducaokl.netlify.app/",
    col1img1: "/images/escola_kl.png",
    col1img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
    col2img: "/images/escola_kl.png",
  },
  {
    number: "02",
    category: "Cliente",
    name: "Site para o Colégio Angola",
    href: "https://colegioangola.netlify.app/",
    col1img1: "/images/colegio_angola.png",
    col1img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
    col2img: "/images/colegio_angola.png",
  },
  {
    number: "03",
    category: "Pessoal",
    name: "Portfólio Interativo 3D",
    href: "#hero",
    col1img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
    col1img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
    col2img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
  },
];

const totalCards = projects.length;

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const stickyStyle: CSSProperties = {
    position: "sticky",
    top: `${96 + index * 28}px`,
    background: "#0C0C0C",
    borderRadius: "clamp(24px, 4vw, 60px)",
    border: "2px solid #D7E2EA",
    padding: "clamp(1rem, 2vw, 2rem)",
    display: "flex",
    flexDirection: "column",
    gap: "clamp(1rem, 2vw, 1.5rem)",
  };

  return (
    <div
      ref={containerRef}
      style={{ height: "85vh", display: "flex", alignItems: "flex-start", paddingTop: `${index * 28}px` }}
    >
      <motion.div style={{ ...stickyStyle, scale, width: "100%" }}>
        {/* Top row */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4 md:gap-8">
            <span
              className="font-black leading-none select-none"
              style={{
                color: "#D7E2EA",
                fontSize: "clamp(2.5rem, 7vw, 100px)",
                lineHeight: 1,
              }}
            >
              {project.number}
            </span>
            <div className="flex flex-col">
              <span
                className="text-xs uppercase tracking-widest font-medium opacity-60"
                style={{ color: "#D7E2EA" }}
              >
                {project.category}
              </span>
              <span
                className="font-medium uppercase"
                style={{
                  color: "#D7E2EA",
                  fontSize: "clamp(0.9rem, 2.2vw, 1.8rem)",
                }}
              >
                {project.name}
              </span>
            </div>
          </div>
          <LiveProjectButton href={project.href} label="Ver Projeto" />
        </div>

        {/* Bottom row - image grid */}
        <div className="flex gap-3 md:gap-4">
          {/* Left column - 40% - 2 stacked images */}
          <div className="flex flex-col gap-3 md:gap-4" style={{ flex: "0 0 40%" }}>
            <img
              src={project.col1img1}
              alt={project.name}
              className="w-full object-cover"
              style={{
                height: "clamp(100px, 14vw, 200px)",
                borderRadius: "clamp(16px, 3vw, 40px)",
              }}
            />
            <img
              src={project.col1img2}
              alt={project.name}
              className="w-full object-cover"
              style={{
                height: "clamp(130px, 18vw, 300px)",
                borderRadius: "clamp(16px, 3vw, 40px)",
              }}
            />
          </div>

          {/* Right column - 60% - 1 tall image */}
          <div style={{ flex: "1" }}>
            <img
              src={project.col2img}
              alt={project.name}
              className="w-full object-cover"
              style={{
                height: "clamp(230px, 32vw, 500px)",
                borderRadius: "clamp(16px, 3vw, 40px)",
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  return (
    <section
      id="projects"
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative px-4 sm:px-6 md:px-10 pt-16 sm:pt-20 md:pt-28 pb-24"
      style={{ background: "#0C0C0C", zIndex: 10 }}
    >
      <FadeIn y={40} className="text-center mb-12 md:mb-16">
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Projetos
        </h2>
      </FadeIn>

      <div className="flex flex-col">
        {projects.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
