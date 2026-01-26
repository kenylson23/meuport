import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface About3Props {
  title?: string;
  description?: string;
  mainImage?: {
    src: string;
    alt: string;
  };
  secondaryImage?: {
    src: string;
    alt: string;
  };
  breakout?: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  companiesTitle?: string;
  companies?: Array<{
    src: string;
    alt: string;
  }>;
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{
    label: string;
    value: string;
  }>;
}

const defaultCompanies = [
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-1.svg",
    alt: "Arc",
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-2.svg",
    alt: "Descript",
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-3.svg",
    alt: "Mercury",
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-4.svg",
    alt: "Ramp",
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-5.svg",
    alt: "Retool",
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-6.svg",
    alt: "Watershed",
  },
];

const defaultAchievements = [
  { label: "Projetos Finalizados", value: "50+" },
  { label: "Anos de Experiência", value: "5+" },
  { label: "Clientes Satisfeitos", value: "100%" },
  { label: "Tecnologias Dominadas", value: "15+" },
];

export const About = ({
  title = "Sobre Mim",
  description = "Sou Kenylson Lourenço, um desenvolvedor full-stack apaixonado por criar experiências digitais imersivas. Com expertise em tecnologias modernas, me especializo em construir aplicações web que combinam funcionalidade robusta com um apelo visual impactante.",
  mainImage = {
    src: "/images/profile.png",
    alt: "Kenylson Lourenço - Desenvolvedor Full Stack",
  },
  secondaryImage = {
    src: "https://shadcnblocks.com/images/block/placeholder-2.svg",
    alt: "placeholder",
  },
  breakout = {
    src: "https://shadcnblocks.com/images/block/block-1.svg",
    alt: "logo",
    title: "Desenvolvedor Apaixonado",
    description:
      "Minha jornada vai do desenvolvimento web tradicional até experiências 3D interativas. Acredito em expandir os limites da web.",
    buttonText: "Ver Projetos",
    buttonUrl: "#projects",
  },
  companiesTitle = "Tecnologias e ferramentas que utilizo",
  companies = defaultCompanies,
  achievementsTitle = "Minha Jornada em Números",
  achievementsDescription = "Transformando ideias complexas em soluções digitais elegantes e eficientes.",
  achievements = defaultAchievements,
}: About3Props = {}) => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 z-20 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            Sobre <span className="text-neon-green glow-text">Mim</span>
          </h2>
          <p className="text-slate-200 text-lg leading-relaxed">{description}</p>
        </motion.div>
        
        <div className="grid gap-7 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <img
              src={mainImage.src}
              alt={mainImage.alt}
              className="size-full max-h-[620px] rounded-xl object-cover border border-white/10"
            />
          </motion.div>
          
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col justify-between gap-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-7 md:w-1/2 lg:w-auto"
            >
              <img
                src={breakout.src}
                alt={breakout.alt}
                className="mr-auto h-12 invert opacity-50"
              />
              <div>
                <p className="mb-2 text-lg font-semibold text-neon-green">{breakout.title}</p>
                <p className="text-slate-300">{breakout.description}</p>
              </div>
              <Button variant="outline" className="mr-auto border-neon-green text-neon-green hover:bg-neon-green hover:text-black transition-colors" asChild>
                <a href={breakout.buttonUrl}>
                  {breakout.buttonText}
                </a>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="grow basis-0 md:w-1/2 lg:w-auto"
            >
              <img
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                className="size-full rounded-xl object-cover lg:min-h-0 border border-white/10"
              />
            </motion.div>
          </div>
        </div>

        <div className="py-32">
          <p className="text-center text-slate-400 uppercase tracking-widest text-sm">{companiesTitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-8 opacity-50 hover:opacity-100 transition-opacity duration-500">
            {companies.map((company, idx) => (
              <div className="flex items-center gap-3" key={company.src + idx}>
                <img
                  src={company.src}
                  alt={company.alt}
                  className="h-6 w-auto md:h-8 filter grayscale invert"
                />
              </div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-10 md:p-16"
        >
          <div className="flex flex-col gap-4 text-center md:text-left relative z-20">
            <h2 className="text-4xl font-semibold text-white">{achievementsTitle}</h2>
            <p className="max-w-screen-sm text-slate-300">
              {achievementsDescription}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-between gap-10 text-center relative z-20">
            {achievements.map((item, idx) => (
              <div className="flex flex-col gap-4" key={item.label + idx}>
                <p className="text-slate-400 text-sm uppercase tracking-wider">{item.label}</p>
                <span className="text-4xl font-bold text-neon-green glow-text md:text-5xl">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute -top-1 right-1 z-10 hidden h-full w-full bg-[linear-gradient(to_right,rgba(57,255,20,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(57,255,20,0.1)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:linear-gradient(to_bottom_right,#000,transparent,transparent)] md:block"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
