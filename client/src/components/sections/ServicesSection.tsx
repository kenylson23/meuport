import FadeIn from "../ui/FadeIn";

const services = [
  {
    number: "01",
    name: "Presença Online Profissional",
    description:
      "O teu negócio na internet de forma que inspira confiança imediata. Quando alguém te pesquisa, encontra algo que impressiona — e não um site amador que afasta clientes.",
  },
  {
    number: "02",
    name: "Site que Atrai e Converte",
    description:
      "Não basta ter um site bonito. Criamos páginas pensadas para transformar visitantes em contactos reais e vendas concretas para o teu negócio.",
  },
  {
    number: "03",
    name: "Do Zero ao Online Sem Dores de Cabeça",
    description:
      "Trato de tudo — do design ao lançamento. Tu ficas completamente livre para gerir o teu negócio enquanto eu entrego o resultado no prazo combinado.",
  },
  {
    number: "04",
    name: "Design que Encanta à Primeira Vista",
    description:
      "A primeira impressão é decisiva. Criamos uma identidade visual que faz os teus clientes sentir que estão a lidar com uma marca séria e de confiança.",
  },
  {
    number: "05",
    name: "Posicionamento que Te Destaca",
    description:
      "O teu concorrente já está online. Vamos garantir que quando o teu cliente ideal procura o que tu ofereces, és tu que apareces — e és tu que convence.",
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
