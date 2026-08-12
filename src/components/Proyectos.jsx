import { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import './Proyectos.css';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const PROJECTS = [
  {
    id: 'PRJ-01',
    number: '01',
    name: 'Red Corporativa Full-Mesh',
    category: 'NETWORKING & SEGURIDAD',
    desc: 'Simulación en Cisco Packet Tracer con enrutamiento OSPF y túneles VPN IPsec entre nodos.',
    tags: ['PACKET TRACER', 'OSPF', 'IPSEC VPN', 'CISCO'],
    year: '2024',
    href: 'https://github.com/whoisgiov2',
  },
  {
    id: 'PRJ-02',
    number: '02',
    name: 'Script de Preprocesamiento',
    category: 'CIENCIA DE DATOS & ALGORITMOS',
    desc: 'Módulos de análisis estadístico y filtros de limpieza de datos en Python para Teoría de la Información.',
    tags: ['PYTHON', 'ESTADÍSTICA', 'FILTROS DE DATOS', 'INFO THEORY'],
    year: '2024',
    href: 'https://github.com/whoisgiov2',
  },
  {
    id: 'PRJ-03',
    number: '03',
    name: 'Bóveda Cibernética',
    category: 'ARQUITECTURA WEB & FRONTEND',
    desc: 'Portafolio interactivo monocromático con físicas avanzadas en React y GSAP (este mismo proyecto).',
    tags: ['REACT 19', 'GSAP 3', 'TAILWIND CSS', 'SMOOTH SCROLL'],
    year: '2026',
    href: 'https://github.com/whoisgiov2/PortafolioDuig',
  },
];

export default function Proyectos() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const listItemsRef = useRef([]);
  const panelRef = useRef(null);

  const [activeProject, setActiveProject] = useState(null);
  const [isTouch, setIsTouch] = useState(false);
  const [expandedMobileId, setExpandedMobileId] = useState(null);

  const xToRef = useRef(null);
  const yToRef = useRef(null);

  /* Detect touch / coarse pointer environment */
  useEffect(() => {
    const touchCheck =
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(pointer: coarse)').matches;
    setIsTouch(touchCheck);
  }, []);

  /* Initialize GSAP quickTo setters for desktop 60fps GPU mouse tracking */
  useGSAP(() => {
    if (!isTouch && panelRef.current) {
      xToRef.current = gsap.quickTo(panelRef.current, 'x', { duration: 0.25, ease: 'power3.out' });
      yToRef.current = gsap.quickTo(panelRef.current, 'y', { duration: 0.25, ease: 'power3.out' });
      gsap.set(panelRef.current, { autoAlpha: 0, scale: 0.8 });
    }
  }, { scope: sectionRef, dependencies: [isTouch] });

  /* Update coordinates cleanly on mousemove (desktop only) */
  const handleMouseMove = useCallback((e) => {
    if (isTouch || !xToRef.current || !yToRef.current || !panelRef.current) return;
    const panelWidth = panelRef.current.offsetWidth || 380;
    const panelHeight = panelRef.current.offsetHeight || 220;

    let targetX = e.clientX + 24;
    let targetY = e.clientY + 24;

    if (targetX + panelWidth > window.innerWidth - 20) {
      targetX = e.clientX - panelWidth - 16;
    }
    if (targetY + panelHeight > window.innerHeight - 20) {
      targetY = e.clientY - panelHeight - 16;
    }

    xToRef.current(targetX);
    yToRef.current(targetY);
  }, [isTouch]);

  /* Show panel and update active project on enter (desktop only) */
  const handleMouseEnter = useCallback((project, e) => {
    if (isTouch) return;
    setActiveProject(project);
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.35,
        ease: 'power3.out',
        force3D: true,
      });
    }
    handleMouseMove(e);
  }, [isTouch, handleMouseMove]);

  /* Hide magnetic panel on leave (desktop only) */
  const handleMouseLeave = useCallback(() => {
    if (isTouch) return;
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        autoAlpha: 0,
        scale: 0.8,
        duration: 0.25,
        ease: 'power2.in',
        force3D: true,
      });
    }
  }, [isTouch]);

  /* Toggle mobile accordion tap handler */
  const handleMobileTap = (id) => {
    if (!isTouch) return;
    setExpandedMobileId((prev) => (prev === id ? null : id));
  };

  /* ScrollTrigger Reveal Sequence */
  useGSAP(() => {
    const split = SplitText.create(titleRef.current, { type: 'words, chars' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 78%',
        invalidateOnRefresh: true,
      },
    });

    tl.from(headerRef.current, {
      autoAlpha: 0,
      y: -35,
      duration: 0.8,
      ease: 'power2.out',
    })
    .from(split.chars, {
      autoAlpha: 0,
      y: 50,
      rotationX: -90,
      transformOrigin: 'center bottom',
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.02,
    }, '-=0.4')
    .from(listItemsRef.current, {
      autoAlpha: 0,
      y: 60,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.15,
      onComplete: () => {
        gsap.set([headerRef.current, ...listItemsRef.current], { clearProps: 'willChange' });
      },
    }, '-=0.5');
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="max-w-6xl mx-auto w-full relative overflow-x-hidden">

      {/* Header */}
      <div ref={headerRef} data-speed="1.1" className="mb-12 px-4 sm:px-0 will-change-transform">
        <span className="font-mono text-[11px] tracking-[0.4em] uppercase text-neutral-400 border border-white/15 rounded-full px-4 py-1.5 bg-white/[0.03]">
          03&nbsp;/&nbsp;PROYECTOS DESTACADOS
        </span>
        <h2 ref={titleRef} className="mt-6 text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
          Proyectos<br />
          <span className="text-neutral-500">Seleccionados</span>
        </h2>
        <p className="mt-4 font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-500">
          {isTouch
            ? '[ Toca cualquier proyecto para desplegar los detalles técnicos ]'
            : '[ Desplaza sobre cualquier título para proyectar el panel magnético ]'}
        </p>
      </div>

      {/* Vertical List of Projects */}
      <div className="flex flex-col border-t border-neutral-900 border-b border-neutral-900 divide-y divide-neutral-900/80">
        {PROJECTS.map((project, i) => {
          const isExpanded = expandedMobileId === project.id;
          return (
            <article
              key={project.id}
              ref={(el) => { listItemsRef.current[i] = el; }}
              onMouseEnter={(e) => handleMouseEnter(project, e)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleMobileTap(project.id)}
              className="project-item group py-8 sm:py-12 md:py-16 px-4 sm:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 cursor-pointer bg-black/40 hover:bg-neutral-950/80 transition-colors duration-400 select-none"
            >
              {/* Left Column: ID Badge & Massive Title */}
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-neutral-400 group-hover:text-white border border-white/15 rounded-full px-3 py-0.5 bg-white/[0.03] transition-colors duration-300 font-semibold">
                    {project.id}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500">
                    // {project.category}
                  </span>
                </div>

                {/* Massive Responsive Title */}
                <h3 className="project-title-massive text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none">
                  {project.name}
                </h3>

                {/* Mobile / Touch Interactive Accordion Drawer */}
                {isTouch && (
                  <div className={`pt-2 transition-all duration-300 ${isExpanded ? 'block' : 'hidden md:hidden'}`}>
                    <p className="font-mono text-xs text-neutral-300 leading-relaxed bg-white/[0.03] border border-white/15 rounded-xl p-4 mt-2">
                      {project.desc}
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column: Tags, Year & CTA Link */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 shrink-0">
                <div className="flex flex-wrap items-center gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] tracking-[0.25em] uppercase text-neutral-400 border border-white/10 rounded-full px-3 py-1 bg-white/[0.02] group-hover:border-white/25 group-hover:text-white transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs tracking-[0.2em] text-neutral-500">
                    [{project.year}]
                  </span>

                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver repositorio del proyecto ${project.name} en GitHub`}
                    className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] uppercase px-5 py-2.5 rounded-xl border border-white/20 bg-white/[0.04] text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Ver Repositorio</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* ── Magnetic Floating Preview Panel (Desktop Only via React Portal) ── */}
      {!isTouch && createPortal(
        <div
          ref={panelRef}
          aria-hidden="true"
          className="magnetic-preview-panel hidden md:block max-w-md w-full rounded-2xl border border-white/20 bg-neutral-950/95 backdrop-blur-2xl p-6 shadow-[0_0_50px_rgba(255,255,255,0.15)]"
        >
          {activeProject && (
            <div className="space-y-4">
              {/* Header HUD Badge */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white hud-pulse-dot" />
                  <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-white font-semibold">
                    {activeProject.id} // PREVISUALIZACIÓN TÉCNICA
                  </span>
                </div>
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-neutral-500">
                  [{activeProject.year}]
                </span>
              </div>

              {/* Title */}
              <div>
                <h4 className="text-xl font-black tracking-tight text-white leading-snug">
                  {activeProject.name}
                </h4>
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-400 mt-0.5">
                  {activeProject.category}
                </p>
              </div>

              {/* Technical Description (The Monospace Scope Rule) */}
              <p className="font-mono text-xs text-neutral-300 leading-relaxed bg-white/[0.03] border border-white/10 rounded-xl p-3.5">
                {activeProject.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[8px] tracking-[0.25em] uppercase text-neutral-300 border border-white/20 rounded-full px-2.5 py-0.5 bg-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>,
        document.body
      )}

    </div>
  );
}
