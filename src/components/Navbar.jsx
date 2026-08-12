import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(useGSAP, ScrollToPlugin);

const SECTIONS = [
  { id: 'inicio',          label: 'Inicio',      mono: '00' },
  { id: 'stack',           label: 'Stack',        mono: '01' },
  { id: 'soft-skills',     label: 'Soft Skills',  mono: '02' },
  { id: 'proyectos',       label: 'Proyectos',    mono: '03' },
  { id: 'certificaciones', label: 'Certs',        mono: '04' },
  { id: 'contacto-seguro', label: 'Contacto',     mono: '05' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [scrolled, setScrolled]           = useState(false);
  const pillRefs                           = useRef([]);
  const brandRef                           = useRef(null);

  /* ── Programmatic Magnetic Scroll Handler ── */
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: targetId, offsetY: 80 },
      ease: 'power3.inOut',
    });
  };

  /* ── Glassmorphic trigger on scroll ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active section via IntersectionObserver ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-20% 0px -50% 0px', threshold: 0.1 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* ── Advanced Magnetic Physics using gsap.utils ── */
  const handleMagneticMove = useCallback((e, targetEl) => {
    if (!targetEl) return;
    const rect = targetEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
    const maxDist = Math.max(rect.width, rect.height) * 1.5;

    const pullFactor = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0, maxDist, 1, 0, dist));
    const targetX = gsap.utils.interpolate(0, (e.clientX - cx) * 0.35, pullFactor);
    const targetY = gsap.utils.interpolate(0, (e.clientY - cy) * 0.35, pullFactor);

    gsap.to(targetEl, {
      x: targetX,
      y: targetY,
      duration: 0.3,
      ease: 'power3.out',
      force3D: true,
    });
  }, []);

  const handleMagneticLeave = useCallback((targetEl) => {
    if (!targetEl) return;
    gsap.to(targetEl, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.3)',
      force3D: true,
      onComplete: () => {
        gsap.set(targetEl, { clearProps: 'willChange' });
      },
    });
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
        ${scrolled
          ? 'bg-neutral-950/80 backdrop-blur-2xl border-b border-white/10 py-3'
          : 'bg-transparent py-5'}`}
    >
      <nav aria-label="Navegación principal" className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* Brand — Monochromatic Silver Terminal */}
        <button
          ref={brandRef}
          type="button"
          onClick={(e) => handleScroll(e, '#inicio')}
          onMouseMove={(e) => handleMagneticMove(e, brandRef.current)}
          onMouseLeave={() => handleMagneticLeave(brandRef.current)}
          aria-label="Ir al inicio - CGRM Cyber Vault"
          className="will-change-transform flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-md py-0.5 px-1 cursor-pointer bg-transparent border-0"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="font-mono text-xs tracking-[0.35em] uppercase text-neutral-300">
            CGRM
            <span className="text-neutral-600 mx-1.5">//</span>
            <span className="text-neutral-500">CYBER_VAULT</span>
          </span>
        </button>

        {/* Pill nav — desktop */}
        <div className="hidden md:flex items-center gap-1.5" role="menubar">
          {SECTIONS.map(({ id, label, mono }, i) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                type="button"
                ref={(el) => (pillRefs.current[i] = el)}
                onClick={(e) => handleScroll(e, `#${id}`)}
                onMouseMove={(e) => handleMagneticMove(e, pillRefs.current[i])}
                onMouseLeave={() => handleMagneticLeave(pillRefs.current[i])}
                role="menuitem"
                aria-label={`Ir a la sección ${label}`}
                aria-current={isActive ? 'page' : undefined}
                className={`will-change-transform inline-block font-mono text-[10px] tracking-[0.25em] uppercase rounded-full px-4 py-2 border transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer
                  ${isActive
                    ? 'border-white/40 text-white bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.15)] font-bold'
                    : 'border-white/10 text-neutral-400 bg-white/[0.03] hover:border-white/30 hover:text-white hover:bg-white/[0.08]'
                  }`}
              >
                <span className="text-neutral-500 mr-1.5">{mono}</span>
                {label}
              </button>
            );
          })}
        </div>

        {/* Mobile: horizontal scrollable pills */}
        <div className="flex md:hidden items-center gap-1.5 overflow-x-auto no-scrollbar max-w-[65vw] py-1" role="menubar">
          {SECTIONS.map(({ id, label, mono }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                type="button"
                onClick={(e) => handleScroll(e, `#${id}`)}
                role="menuitem"
                aria-label={`Ir a la sección ${label}`}
                aria-current={isActive ? 'page' : undefined}
                className={`shrink-0 font-mono text-[9px] tracking-[0.2em] uppercase rounded-full px-3 py-1.5 border transition-all duration-300 outline-none cursor-pointer
                  ${isActive
                    ? 'border-white/40 text-white bg-white/10 font-bold shadow-[0_0_12px_rgba(255,255,255,0.15)]'
                    : 'border-white/10 text-neutral-400 bg-white/[0.03]'
                  }`}
              >
                <span className="text-neutral-500 mr-1">{mono}</span>
                {label}
              </button>
            );
          })}
        </div>

      </nav>
    </header>
  );
}


