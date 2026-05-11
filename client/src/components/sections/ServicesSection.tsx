import FadeIn from "../ui/FadeIn";

const services = [
  {
    number: "01",
    name: "Desenvolvimento Frontend",
    description:
      "Criação de interfaces modernas, responsivas e de alto desempenho com React, TypeScript e Tailwind CSS, focadas em conversão.",
  },
  {
    number: "02",
    name: "Desenvolvimento Backend",
    description:
      "APIs robustas e escaláveis com Node.js e PostgreSQL para suportar qualquer volume de negócios com segurança e performance.",
  },
  {
    number: "03",
    name: "Aplicações Full Stack",
    description:
      "Do conceito ao deploy, entrego aplicações web completas com foco em performance, segurança e resultados mensuráveis.",
  },
  {
    number: "04",
    name: "UI/UX Design",
    description:
      "Interfaces intuitivas e visualmente impactantes que transformam visitantes em clientes e melhoram a experiência do utilizador.",
  },
  {
    number: "05",
    name: "Estratégia Digital",
    description:
      "Análise, consultoria e planeamento digital para posicionar o seu negócio de forma competitiva e maximizar resultados online.",
  },
];

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn y={40}>
        <h2
          className="font-black uppercase text-center tracking-tight leading-none mb-16 sm:mb-20 md:mb-28"
          style={{
            color: "#0C0C0C",
            fontSize: "clamp(3rem, 12vw, 160px)",
          }}
        >
          Serviços
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {services.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div
              className="flex items-start gap-6 md:gap-10 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: i === 0 ? "1px solid rgba(12,12,12,0.15)" : undefined,
                borderBottom: "1px solid rgba(12,12,12,0.15)",
              }}
            >
              <span
                className="font-black leading-none flex-shrink-0 select-none"
                style={{
                  color: "#0C0C0C",
                  fontSize: "clamp(3rem, 10vw, 140px)",
                  lineHeight: 1,
                }}
              >
                {service.number}
              </span>
              <div className="flex flex-col justify-center pt-2 md:pt-4">
                <h3
                  className="font-medium uppercase mb-2"
                  style={{
                    color: "#0C0C0C",
                    fontSize: "clamp(1rem, 2.2vw, 2.1rem)",
                  }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl"
                  style={{
                    color: "#0C0C0C",
                    opacity: 0.6,
                    fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)",
                  }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
