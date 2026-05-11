import Magnet from "../ui/Magnet";
import ContactButton from "../ui/ContactButton";
import FadeIn from "../ui/FadeIn";

const Hero = () => {
  return (
    <section
      id="hero"
      className="h-screen flex flex-col overflow-x-clip relative"
      style={{ background: "#0C0C0C" }}
    >
      {/* Navbar */}
      <FadeIn delay={0} y={-20} className="flex-shrink-0 px-6 md:px-10 pt-6 md:pt-8">
        <nav className="w-full flex justify-between">
          {["Sobre", "Serviços", "Projetos", "Contato"].map((item) => (
            <button
              key={item}
              onClick={() => {
                const map: Record<string, string> = {
                  Sobre: "about",
                  Serviços: "services",
                  Projetos: "projects",
                  Contato: "contact",
                };
                document.getElementById(map[item])?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider transition-opacity duration-200 hover:opacity-70"
              style={{ color: "#D7E2EA" }}
            >
              {item}
            </button>
          ))}
        </nav>
      </FadeIn>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Hero Heading */}
      <div className="overflow-hidden flex-shrink-0">
        <FadeIn delay={0.15} y={40}>
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-none w-full px-4 md:px-8"
            style={{ fontSize: "clamp(2.5rem, 9.5vw, 10rem)", whiteSpace: "nowrap" }}
          >
            Olá, sou Keny
          </h1>
        </FadeIn>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Bar */}
      <div className="flex-shrink-0 flex justify-between items-end pb-8 md:pb-10 px-6 md:px-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{
              color: "#D7E2EA",
              fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)",
            }}
          >
            um dev full stack focado em criar experiências digitais marcantes e inesquecíveis
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      {/* Portrait - centered absolutely */}
      <div className="absolute inset-0 flex justify-center items-end z-10 pointer-events-none">
        <FadeIn
          delay={0.6}
          y={30}
          className="w-[240px] sm:w-[330px] md:w-[420px] lg:w-[500px] pointer-events-auto"
        >
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img
              src="/images/hero_portrait.png"
              alt="Kenylson Lourenço"
              className="w-full h-auto object-contain select-none"
              style={{ maxHeight: "82vh" }}
              draggable={false}
            />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
};

export default Hero;
