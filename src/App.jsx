import { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';

import BootAnimation from './components/BootAnimation';
import BackgroundCanvas from './components/BackgroundCanvas';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import HabilidadesTecnicas from './components/HabilidadesTecnicas';
import HabilidadesSociales from './components/HabilidadesSociales';
import Proyectos from './components/Proyectos';
import Certificaciones from './components/Certificaciones';
import ContactoSeguro from './components/ContactoSeguro';
import Footer from './components/Footer';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function App() {
  const [isBooting, setIsBooting] = useState(true);

  useGSAP(() => {
    const isMobile =
      typeof window !== 'undefined' &&
      (window.matchMedia('(max-width: 768px)').matches ||
       window.matchMedia('(pointer: coarse)').matches ||
       window.matchMedia('(hover: none)').matches);

    ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: isMobile ? 0.6 : 1.5,
      effects: !isMobile,
      normalizeScroll: !isMobile,
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col w-full bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Custom Hardware Accelerated Cursor */}
      <CustomCursor />

      {/* Boot animation overlay — sits on top until complete */}
      {isBooting && (
        <BootAnimation onComplete={() => setIsBooting(false)} />
      )}

      {/* Fixed Navbar sits outside smooth-wrapper so it stays pinned at top */}
      <Navbar />

      {/* GSAP ScrollSmoother strict DOM hierarchy */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          {/* Dynamic interactive background canvas with parallax depth */}
          <div data-speed="0.8" className="pointer-events-none">
            <BackgroundCanvas />
          </div>

          <main className="relative z-10 flex-1 w-full">
            <section
              id="inicio"
              className="min-h-screen flex flex-col justify-center p-8 pt-24"
            >
              <Inicio />
            </section>

            <section
              id="habilidades-tecnicas"
              className="min-h-screen flex flex-col justify-center p-8 pt-24 overflow-hidden"
            >
              <HabilidadesTecnicas />
            </section>

            <section
              id="habilidades-sociales"
              className="min-h-screen flex flex-col justify-center p-8 pt-24"
            >
              <HabilidadesSociales />
            </section>

            <section
              id="proyectos"
              className="min-h-screen flex flex-col justify-center p-8 pt-24"
            >
              <Proyectos />
            </section>

            <section
              id="certificaciones"
              className="min-h-screen flex flex-col justify-center p-8 pt-24"
            >
              <Certificaciones />
            </section>

            <section
              id="contacto-seguro"
              className="min-h-screen flex flex-col justify-center p-8 pt-24"
            >
              <ContactoSeguro />
            </section>
          </main>

          {/* Minimalist Industrial Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

