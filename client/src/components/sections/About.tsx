import FadeIn from "../ui/FadeIn";
import AnimatedText from "../ui/AnimatedText";
import ContactButton from "../ui/ContactButton";

const About = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
      style={{ background: "#0C0C0C" }}
    >
      {/* Decorative 3D images in corners — hidden on small screens */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="hidden sm:block absolute top-[4%] left-[2%] md:left-[4%] pointer-events-none">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt=""
          className="w-[120px] sm:w-[150px] md:w-[210px]"
        />
      </FadeIn>

      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="hidden sm:block absolute bottom-[8%] left-[4%] md:left-[10%] pointer-events-none">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt=""
          className="w-[90px] sm:w-[120px] md:w-[180px]"
        />
      </FadeIn>

      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="hidden sm:block absolute top-[4%] right-[2%] md:right-[4%] pointer-events-none">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt=""
          className="w-[120px] sm:w-[150px] md:w-[210px]"
        />
      </FadeIn>

      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="hidden sm:block absolute bottom-[8%] right-[4%] md:right-[10%] pointer-events-none">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt=""
          className="w-[110px] sm:w-[150px] md:w-[220px]"
        />
      </FadeIn>

      {/* Center content */}
      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 relative z-10 max-w-3xl text-center">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            Sobre mim
          </h2>
        </FadeIn>

        <div
          style={{
            color: "#D7E2EA",
            fontSize: "clamp(1rem, 2vw, 1.35rem)",
          }}
        >
          <AnimatedText
            text="Talvez o teu negócio ainda não tenha presença online — ou tens um site que não traz resultados. Eu sei exactamente como te ajudar. Trabalho com donos de negócios que querem ser encontrados, ser levados a sério e atrair os clientes certos. Sem complicações, sem tecnicismos — só resultados."
            className="font-medium text-center leading-relaxed max-w-[560px] mx-auto"
          />
        </div>

        <div className="mt-4 sm:mt-6 md:mt-8">
          <ContactButton />
        </div>
      </div>
    </section>
  );
};

export default About;
