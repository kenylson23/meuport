import { Suspense, lazy } from "react";
import Hero from "./sections/Hero";
import MarqueeSection from "./sections/MarqueeSection";
import ServicesSection from "./sections/ServicesSection";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import TetrisLoading from "./ui/TetrisLoading";
import { useState, useEffect } from "react";

const About = lazy(() => import("./sections/About"));

const Portfolio = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <TetrisLoading size="md" speed="normal" loadingText="Carregando Portfólio..." />
      </div>
    );
  }

  return (
    <div
      className="relative overflow-x-clip"
      style={{ background: "#0C0C0C" }}
    >
      <main>
        <Hero />
        <MarqueeSection />
        <Suspense fallback={null}>
          <About />
        </Suspense>
        <ServicesSection />
        <Projects />
        <Contact />
      </main>

    </div>
  );
};

export default Portfolio;
