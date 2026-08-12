import { useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const SOFT_SKILLS = [
  {
    id: 'B2+',
    title: 'Inglés B2+',
    desc: 'Comprensión y producción fluida de documentación técnica, comunicación profesional con equipos internacionales y lectura de estándares de seguridad en inglés.',
  },
  {
    id: 'COM',
    title: 'Comunicación Técnica Asertiva',
    desc: 'Capacidad para articular diagnósticos complejos, hallazgos de seguridad y propuestas técnicas a audiencias multidisciplinarias con precisión y claridad.',
  },
  {
    id: 'ORA',
    title: 'Oratoria',
    desc: 'Habilidad consolidada para presentar ante grupos académicos y técnicos, estructurando narrativas de alto impacto sobre arquitecturas y sistemas.',
  },
  {
    id: 'DOC',
    title: 'Habilidades Didácticas',
    desc: 'Experiencia en la transmisión de conceptos técnicos como maestro, descomponiendo problemas abstractos en estructuras comprensibles y aplicables.',
  },
  {
    id: 'ARC',
    title: 'Explicación de Arquitecturas',
    desc: 'Alta capacidad para modelar y comunicar arquitecturas lógicas complejas, diagramas de red, flujos de seguridad y estructuras de datos a distintos niveles de abstracción.',
  },
];

function SpotlightRow({ skill, rowRef }) {
  const ref = useRef(null);

  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);

    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -4;
    const ry = ((x - cx) / cx) * 4;

    gsap.to(el, {
      rotateX: rx,
      rotateY: ry,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 900,
      force3D: true,
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '50%');

    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
      force3D: true,
      onComplete: () => {
        gsap.set(el, { clearProps: 'willChange' });
      },
    });
  }, []);

  const setRef = (el) => {
    ref.current = el;
    if (rowRef) rowRef(el);
  };

  return (
    <div
      ref={setRef}
      tabIndex={0}
      role="article"
      aria-label={`Habilidad social: ${skill.title}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative flex items-start gap-5 rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-2xl p-6 overflow-hidden
        transition-all duration-300 hover:border-white/35 hover:shadow-[0_0_35px_rgba(255,255,255,0.1)] will-change-transform outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      style={{ '--mx': '50%', '--my': '50%' }}
    >
      {/* Silver/White radial spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
        style={{ background: 'radial-gradient(circle 200px at var(--mx) var(--my), rgba(255,255,255,0.12), transparent 70%)' }}
      />

      {/* Monospace ID pill */}
      <div className="relative shrink-0 pt-0.5">
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-neutral-400
          group-hover:text-white transition-colors duration-300
          border border-white/10 group-hover:border-white/30 rounded-full px-2.5 py-1 inline-block bg-white/[0.02]">
          {skill.id}
        </span>
      </div>

      {/* Content */}
      <div className="relative min-w-0">
        <p className="text-sm font-semibold text-neutral-200 group-hover:text-white transition-colors duration-300 mb-1.5 tracking-wide">
          {skill.title}
        </p>
        <p className="text-xs text-neutral-500 group-hover:text-neutral-300 leading-relaxed transition-colors duration-300">
          {skill.desc}
        </p>
      </div>
    </div>
  );
}

export default function HabilidadesSociales() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const titleRef   = useRef(null);
  const rowEls     = useRef([]);

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
      x: 50,
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
    .from(rowEls.current, {
      autoAlpha: 0,
      x: -40,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.09,
      onComplete: () => {
        gsap.set([headerRef.current, ...rowEls.current], { clearProps: 'willChange' });
      },
    }, '-=0.5');
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="max-w-5xl mx-auto w-full">

      {/* Header — asymmetric right */}
      <div ref={headerRef} className="mb-12 text-right will-change-transform">
        <span className="font-mono text-[11px] tracking-[0.4em] uppercase text-neutral-400 border border-white/15 rounded-full px-4 py-1.5 bg-white/[0.03]">
          02&nbsp;/&nbsp;SOFT SKILLS
        </span>
        <h2 ref={titleRef} className="mt-6 text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
          Habilidades<br />
          <span className="text-neutral-500">Sociales</span>
        </h2>
      </div>

      {/* Rows */}
      <div className="space-y-3">
        {SOFT_SKILLS.map((skill, i) => (
          <SpotlightRow
            key={skill.id}
            skill={skill}
            rowRef={(el) => { rowEls.current[i] = el; }}
          />
        ))}
      </div>

    </div>
  );
}

