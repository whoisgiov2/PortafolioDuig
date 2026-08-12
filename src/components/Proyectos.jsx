import { useRef, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const PROJECTS = [
  {
    id: 'PRJ-001',
    name: 'Resplandor',
    tagline: 'Sistema de Monitoreo Cibernético',
    desc: 'Plataforma de alto rendimiento para monitoreo y análisis cibernético en tiempo real, con capacidad de detección de anomalías e integración de múltiples fuentes de datos de seguridad.',
    tags: ['Python', 'Linux', 'Seguridad'],
    href: 'https://github.com/whoisgiov2/Resplandor',
    year: '2025',
    architecture: 'Motor Asíncrono · Análisis en Vivo',
  },
  {
    id: 'PRJ-002',
    name: 'FoxSic',
    tagline: 'Plataforma de Inteligencia de Amenazas',
    desc: 'Plataforma táctica de ciberseguridad enfocada en la investigación de infraestructuras, reconocimiento de activos y análisis de superficie de ataque en entornos de red complejos.',
    tags: ['OSINT', 'Bash', 'MySQL'],
    href: 'https://github.com/whoisgiov2/FoxSic',
    year: '2025',
    architecture: 'Táctica Red · Reconocimiento OSINT',
  },
];

export default function Proyectos() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const titleRef   = useRef(null);
  const cardEls    = useRef([]);
  const tooltipRef = useRef(null);

  const [activeProject, setActiveProject] = useState(null);

  const xToRef = useRef(null);
  const yToRef = useRef(null);

  /* Initialize gsap.quickTo for smooth 60fps tooltip tracking */
  useEffect(() => {
    if (tooltipRef.current) {
      xToRef.current = gsap.quickTo(tooltipRef.current, 'x', { duration: 0.15, ease: 'power2.out' });
      yToRef.current = gsap.quickTo(tooltipRef.current, 'y', { duration: 0.15, ease: 'power2.out' });
    }
  }, [activeProject]);

  const handleMouseMove = useCallback((e, project) => {
    setActiveProject(project);
    if (xToRef.current && yToRef.current) {
      xToRef.current(e.clientX + 20);
      yToRef.current(e.clientY + 20);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveProject(null);
  }, []);

  useGSAP(() => {
    const split = SplitText.create(titleRef.current, { type: 'words, chars' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 78%',
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
    .from(cardEls.current, {
      autoAlpha: 0,
      y: 65,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.14,
      onComplete: () => {
        gsap.set([headerRef.current, ...cardEls.current], { clearProps: 'willChange' });
      },
    }, '-=0.5');
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="max-w-5xl mx-auto w-full relative">

      {/* ── Magnetic Floating Glass Tooltip ── */}
      <div
        ref={tooltipRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-50 transition-opacity duration-300 ${
          activeProject ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {activeProject && (
          <div className="bg-neutral-950/95 border border-white/20 rounded-2xl p-4 shadow-[0_0_40px_rgba(255,255,255,0.18)] backdrop-blur-2xl max-w-xs space-y-1.5">
            <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-white font-semibold block">
              {activeProject.id} // PREVIEW
            </span>
            <p className="text-xs font-bold text-white tracking-wide">
              {activeProject.name}
            </p>
            <p className="font-mono text-[9px] text-neutral-400">
              {activeProject.architecture}
            </p>
          </div>
        )}
      </div>

      {/* Header */}
      <div ref={headerRef} className="mb-12 will-change-transform">
        <span className="font-mono text-[11px] tracking-[0.4em] uppercase text-neutral-400 border border-white/15 rounded-full px-4 py-1.5 bg-white/[0.03]">
          03&nbsp;/&nbsp;PROYECTOS
        </span>
        <h2 ref={titleRef} className="mt-6 text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
          Proyectos<br />
          <span className="text-neutral-500">Destacados</span>
        </h2>
      </div>

      {/* Project Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((project, i) => (
          <article
            key={project.id}
            ref={(el) => { cardEls.current[i] = el; }}
            onMouseMove={(e) => handleMouseMove(e, project)}
            onMouseLeave={handleMouseLeave}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-2xl p-8
              transition-all duration-400 hover:border-white/40 hover:shadow-[0_0_50px_rgba(255,255,255,0.12)] flex flex-col justify-between will-change-transform"
          >
            {/* Silver laser top edge line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div>
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-neutral-400 group-hover:text-white transition-colors duration-300">
                    {project.id}
                  </span>
                  <h3 className="mt-1.5 text-3xl font-black tracking-tighter text-white leading-none">
                    {project.name}
                  </h3>
                  <p className="mt-1.5 font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-500">
                    {project.tagline}
                  </p>
                </div>
                {/* Year pill */}
                <span className="font-mono text-[9px] tracking-[0.2em] text-neutral-400 border border-white/15 rounded-full px-2.5 py-1 shrink-0 ml-3 mt-1 bg-white/[0.03]">
                  {project.year}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-400 leading-relaxed mb-6 group-hover:text-neutral-200 transition-colors duration-400">
                {project.desc}
              </p>

              {/* Tech pill badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span key={tag}
                    className="font-mono text-[9px] tracking-[0.3em] uppercase text-neutral-400 border border-white/10 rounded-full px-3 py-1 bg-white/[0.02]
                      group-hover:border-white/25 group-hover:text-white transition-colors duration-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Directional Sweep CTA Button */}
            <div className="pt-2">
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver repositorio del proyecto ${project.name} en GitHub`}
                className="group/btn relative inline-flex items-center justify-between w-full overflow-hidden rounded-xl border border-white/20 bg-white/[0.04] px-6 py-3.5 text-white transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {/* Solid white background sweep from bottom */}
                <span className="absolute inset-0 bg-white translate-y-full transition-transform duration-300 ease-out group-hover/btn:translate-y-0" />

                {/* Button label */}
                <span className="relative z-10 font-mono text-xs tracking-[0.25em] uppercase font-semibold group-hover/btn:text-black transition-colors duration-300">
                  Ver Repositorio
                </span>
                <span aria-hidden="true" className="relative z-10 text-sm leading-none group-hover/btn:text-black transition-colors duration-300 transition-transform duration-300 group-hover/btn:translate-x-1">
                  ↗
                </span>
              </a>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}

