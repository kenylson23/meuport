import { useState } from "react";
import Magnet from "../ui/Magnet";
import ContactButton from "../ui/ContactButton";
import FadeIn from "../ui/FadeIn";

const NAV_ITEMS = [
  { label: "Sobre", id: "about" },
  { label: "Serviços", id: "services" },
  { label: "Projetos", id: "projects" },
  { label: "Contato", id: "contact" },
];

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section
      id="hero"
      className="h-screen flex flex-col overflow-x-clip relative"
      style={{ background: "#0C0C0C" }}
    >
      {/* ── Navbar ── */}
      <FadeIn delay={0} y={-20} className="flex-shrink-0 px-5 sm:px-8 md:px-10 pt-5 sm:pt-6 md:pt-8 z-30 relative">
        <nav className="w-full flex items-center justify-between">
          {/* Desktop nav items */}
          <div className="hidden md:flex w-full justify-between">
            {NAV_ITEMS.map(({ label, id }) => (
              <button
                key={label}
                onClick={() => scrollTo(id)}
                className="text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider transition-opacity duration-200 hover:opacity-70"
                style={{ color: "#D7E2EA" }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Mobile: logo/name left + hamburger right */}
          <span
            className="md:hidden text-sm font-bold uppercase tracking-widest"
            style={{ color: "#D7E2EA" }}
          >
            KL
          </span>
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <span className="block w-6 h-[2px] rounded-full" style={{ background: "#D7E2EA" }} />
            <span className="block w-6 h-[2px] rounded-full" style={{ background: "#D7E2EA" }} />
            <span className="block w-4 h-[2px] rounded-full" style={{ background: "#D7E2EA" }} />
          </button>
        </nav>
      </FadeIn>

      {/* ── Mobile full-screen menu overlay ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-center items-center gap-10"
          style={{ background: "#0C0C0C" }}
        >
          {/* Close button */}
          <button
            className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center"
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
          >
            <span className="block w-6 h-[2px] rotate-45 absolute rounded-full" style={{ background: "#D7E2EA" }} />
            <span className="block w-6 h-[2px] -rotate-45 absolute rounded-full" style={{ background: "#D7E2EA" }} />
          </button>

          {NAV_ITEMS.map(({ label, id }) => (
            <button
              key={label}
              onClick={() => {
                setMenuOpen(false);
                setTimeout(() => scrollTo(id), 300);
              }}
              className="text-3xl font-black uppercase tracking-widest transition-opacity hover:opacity-60"
              style={{ color: "#D7E2EA" }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* ── Hero Heading ── */}
      <div className="overflow-hidden flex-shrink-0 -mt-1 sm:-mt-2 md:-mt-3">
        <FadeIn delay={0.15} y={40}>
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-none w-full whitespace-nowrap"
            style={{ fontSize: "clamp(2.6rem, 15.5vw, 18rem)", paddingLeft: "2vw" }}
          >
            Olá, sou Keny
          </h1>
        </FadeIn>
      </div>

      {/* ── MOBILE portrait (inline, fills remaining space) ── */}
      <div className="md:hidden flex-1 relative overflow-hidden">
        <img
          src="/images/hero_portrait.png"
          alt="Kenylson Lourenço"
          className="absolute bottom-[88px] left-1/2 -translate-x-1/2 w-auto object-contain select-none"
          style={{ maxHeight: "calc(100% - 88px)" }}
          draggable={false}
        />
      </div>

      {/* ── DESKTOP portrait (absolute overlay) ── */}
      <div className="hidden md:flex absolute inset-0 justify-center items-end z-10 pointer-events-none">
        <FadeIn delay={0.6} y={30} className="w-[460px] lg:w-[520px] pointer-events-auto">
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

      {/* ── Bottom bar (texto + botão) ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-between items-end pb-6 sm:pb-8 md:pb-10 px-5 sm:px-8 md:px-10 gap-3">
        <FadeIn delay={0.35} y={20}>
          <p
            className="font-light uppercase tracking-wide leading-snug max-w-[150px] sm:max-w-[220px] md:max-w-[280px]"
            style={{ color: "#D7E2EA", fontSize: "clamp(0.65rem, 2.2vw, 1.5rem)" }}
          >
            o teu negócio merece um site que impressiona, convence e traz clientes
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20} className="flex-shrink-0">
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};

export default Hero;
