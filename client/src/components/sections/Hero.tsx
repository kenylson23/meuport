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

      {/* Hero Heading — huge, right below navbar, fills full width */}
      <div className="overflow-hidden flex-shrink-0 -mt-2 md:-mt-3">
        <FadeIn delay={0.15} y={40}>
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-none w-full whitespace-nowrap"
            style={{ fontSize: "clamp(3rem, 15.5vw, 18rem)", paddingLeft: "2vw" }}
          >
            Olá, sou Keny
          </h1>
        </FadeIn>
      </div>

      {/* Bottom Bar — pinned to bottom */}
      <div className="mt-auto flex-shrink-0 flex justify-between items-end pb-8 md:pb-10 px-6 md:px-10">
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

      {/* Portrait — centered, overlapping heading, anchored at bottom */}
      <div className="absolute inset-0 flex justify-center items-end z-10 pointer-events-none">
        <FadeIn
          delay={0.6}
          y={30}
          className="w-[260px] sm:w-[360px] md:w-[460px] lg:w-[520px] pointer-events-auto"
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
              style={{ maxHeight: "85vh" }}
              draggable={false}
            />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
};

export default Hero;
