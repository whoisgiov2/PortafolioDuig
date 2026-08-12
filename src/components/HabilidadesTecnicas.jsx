import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import './HabilidadesTecnicas.css';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const SKILLS = [
  {
    id: 'SKL-01',
    name: 'Cybersecurity',
    category: 'CIBERSEGURIDAD',
    categoryLabel: 'SEGURIDAD & DEFENSA',
    desc: 'Enfoque en gobernanza de datos (GDPR), sistemas de gestión de seguridad (ISMS) y teoría de autómatas.',
    level: 'Avanzado',
    progress: 85,
  },
  {
    id: 'SKL-02',
    name: 'Cryptography',
    category: 'CRIPTOGRAFÍA',
    categoryLabel: 'SEGURIDAD & MATEMÁTICAS',
    desc: 'Enfoque en gobernanza de datos (GDPR), sistemas de gestión de seguridad (ISMS) y teoría de autómatas.',
    level: 'Avanzado',
    progress: 85,
  },
  {
    id: 'SKL-03',
    name: 'Linux',
    category: 'SISTEMAS OPERATIVOS',
    categoryLabel: 'INFRAESTRUCTURA & NÚCLEO',
    desc: 'Diseño, depuración y arquitectura de scripts de automatización y aplicaciones de red.',
    level: 'Experto',
    progress: 90,
  },
  {
    id: 'SKL-04',
    name: 'RHEL',
    category: 'RED HAT ENTERPRISE',
    categoryLabel: 'SISTEMAS EMPRESARIALES',
    desc: 'Diseño, depuración y arquitectura de scripts de automatización y aplicaciones de red.',
    level: 'Certificado (RH124)',
    progress: 90,
  },
  {
    id: 'SKL-05',
    name: 'Fortinet / NSE',
    category: 'REDES & SEGURIDAD',
    categoryLabel: 'EQUIPAMIENTO PERIMETRAL',
    desc: 'Diseño, depuración y arquitectura de scripts de automatización y aplicaciones de red.',
    level: 'Certificado NSE 1/2',
    progress: 90,
  },
  {
    id: 'SKL-06',
    name: 'Python',
    category: 'SCRIPTING & AUTOMATIZACIÓN',
    categoryLabel: 'DESARROLLO & HERRAMIENTAS',
    desc: 'Diseño, depuración y arquitectura de scripts de automatización y aplicaciones de red.',
    level: 'Experto',
    progress: 90,
  },
  {
    id: 'SKL-07',
    name: 'Bash',
    category: 'SHELL SCRIPTING',
    categoryLabel: 'AUTOMATIZACIÓN UNIX',
    desc: 'Diseño, depuración y arquitectura de scripts de automatización y aplicaciones de red.',
    level: 'Avanzado',
    progress: 90,
  },
  {
    id: 'SKL-08',
    name: 'PowerShell',
    category: 'ADMINISTRACIÓN WINDOWS',
    categoryLabel: 'SCRIPTING DE SISTEMAS',
    desc: 'Diseño, depuración y arquitectura de scripts de automatización y aplicaciones de red.',
    level: 'Avanzado',
    progress: 90,
  },
  {
    id: 'SKL-09',
    name: 'MySQL',
    category: 'BASES DE DATOS RELACIONALES',
    categoryLabel: 'ALMACENAMIENTO DE DATOS',
    desc: 'Diseño, depuración y arquitectura de scripts de automatización y aplicaciones de red.',
    level: 'Avanzado',
    progress: 90,
  },
  {
    id: 'SKL-10',
    name: 'SQL',
    category: 'LENGUAJE DE CONSULTA',
    categoryLabel: 'GESTIÓN DE DATOS',
    desc: 'Diseño, depuración y arquitectura de scripts de automatización y aplicaciones de red.',
    level: 'Avanzado',
    progress: 90,
  },
  {
    id: 'SKL-11',
    name: 'PHP',
    category: 'DESARROLLO BACKEND',
    categoryLabel: 'SERVICIOS WEB',
    desc: 'Diseño, depuración y arquitectura de scripts de automatización y aplicaciones de red.',
    level: 'Intermedio-Avanzado',
    progress: 90,
  },
  {
    id: 'SKL-12',
    name: 'React',
    category: 'DESARROLLO FRONTEND',
    categoryLabel: 'ARQUITECTURA WEB',
    desc: 'Construcción de landing pages responsivas, dashboards interactivos y despliegues optimizados.',
    level: 'Avanzado',
    progress: 80,
  },
  {
    id: 'SKL-13',
    name: 'Node.js',
    category: 'ENTORNO DE EJECUCIÓN',
    categoryLabel: 'SERVICIOS ASÍNCRONOS',
    desc: 'Construcción de landing pages responsivas, dashboards interactivos y despliegues optimizados.',
    level: 'Avanzado',
    progress: 80,
  },
  {
    id: 'SKL-14',
    name: 'Astro',
    category: 'FRAMEWORK WEB',
    categoryLabel: 'RENDIMIENTO EXTREMO',
    desc: 'Construcción de landing pages responsivas, dashboards interactivos y despliegues optimizados.',
    level: 'Intermedio',
    progress: 80,
  },
  {
    id: 'SKL-15',
    name: 'Typst',
    category: 'MAQUETACIÓN TÉCNICA',
    categoryLabel: 'DOCUMENTACIÓN FORMAL',
    desc: 'Composición, formateo y diseño de layouts personalizados para documentos académicos profesionales.',
    level: 'Avanzado',
    progress: 85,
  },
];

export default function HabilidadesTecnicas() {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const sectionRef       = useRef(null);
  const headerRef        = useRef(null);
  const titleRef         = useRef(null);
  const gridRef          = useRef(null);
  const modalBackdropRef = useRef(null);
  const modalCardRef     = useRef(null);
  const progressBarRef   = useRef(null);

  /* ── Body Scroll Lock when Modal is Active ── */
  useEffect(() => {
    if (selectedSkill) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedSkill]);

  /* ── Header and Title Reveal Animation ── */
  useGSAP(() => {
    const split = SplitText.create(titleRef.current, { type: 'words, chars' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        invalidateOnRefresh: true,
      },
    });

    tl.from(headerRef.current, {
      autoAlpha: 0,
      x: -50,
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
    .from('.box', {
      autoAlpha: 0,
      y: 80,
      scale: 0.9,
      duration: 1.2,
      ease: 'power2.out',
      stagger: 0.1,
      onComplete: () => {
        gsap.set(headerRef.current, { clearProps: 'willChange' });
      },
    }, '-=0.5');
  }, { scope: sectionRef });

  /* ── GSAP Holographic Modal Expansion & Progress Bar Kinematics ── */
  useGSAP(() => {
    if (selectedSkill && modalBackdropRef.current && modalCardRef.current) {
      gsap.fromTo(
        modalBackdropRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.35, ease: 'power2.out' }
      );
      gsap.fromTo(
        modalCardRef.current,
        { autoAlpha: 0, scale: 0.8, y: 50 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, ease: 'expo.out', force3D: true }
      );

      if (progressBarRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { width: '0%' },
          {
            width: `${selectedSkill.progress}%`,
            duration: 1.2,
            delay: 0.2,
            ease: 'power3.out',
          }
        );
      }
    }
  }, { dependencies: [selectedSkill] });

  /* ── Smooth Modal Close Handler ── */
  const handleCloseModal = () => {
    if (modalBackdropRef.current && modalCardRef.current) {
      gsap.to(modalCardRef.current, {
        autoAlpha: 0,
        scale: 0.85,
        y: 20,
        duration: 0.25,
        ease: 'power2.in',
      });
      gsap.to(modalBackdropRef.current, {
        autoAlpha: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          setSelectedSkill(null);
        },
      });
    } else {
      setSelectedSkill(null);
    }
  };

  return (
    <div ref={sectionRef} className="max-w-7xl mx-auto w-full py-10 md:py-16 overflow-x-hidden overflow-y-visible">

      {/* Header */}
      <div ref={headerRef} data-speed="1.1" className="mb-14 px-6 will-change-transform">
        <span className="font-mono text-[11px] tracking-[0.4em] uppercase text-neutral-400 border border-white/15 rounded-full px-4 py-1.5 bg-white/[0.03]">
          01&nbsp;/&nbsp;STACK TÉCNICO
        </span>
        <h2 ref={titleRef} className="mt-6 text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
          Habilidades<br />
          <span className="text-neutral-500">Técnicas</span>
        </h2>
        <p className="mt-4 font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-500">
          [ Haz clic en cualquier tarjeta para desplegar el panel holográfico ]
        </p>
      </div>

      {/* 3D Skewed Glassmorphic Cards Grid */}
      <div
        ref={gridRef}
        className="skills-grid px-6 overflow-x-hidden overflow-y-visible"
        aria-label="Cuadrícula interactiva 3D de habilidades técnicas"
      >
        {SKILLS.map((skill) => (
          <div
            key={skill.name}
            tabIndex={0}
            role="button"
            aria-label={`Ver detalles de la habilidad técnica: ${skill.name}`}
            onClick={() => setSelectedSkill(skill)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedSkill(skill);
              }
            }}
            className="box cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
          >
            <span />
            <div className="content">
              <h2>{skill.name}</h2>
              <p>{skill.category}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Holographic Expansion Modal Rendered via React Portal ── */}
      {selectedSkill && createPortal(
        <div
          ref={modalBackdropRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Detalles de tecnología: ${selectedSkill.name}`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 cursor-pointer"
          onClick={handleCloseModal}
        >
          <div
            ref={modalCardRef}
            className="relative max-w-lg w-full rounded-2xl border border-white/20 bg-neutral-950/95 backdrop-blur-2xl p-8 shadow-[0_0_60px_rgba(255,255,255,0.15)] cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white font-mono text-xs tracking-widest transition-colors duration-200 border border-white/15 rounded-full w-8 h-8 flex items-center justify-center bg-white/[0.04] outline-none focus-visible:ring-2 focus-visible:ring-white/80 cursor-pointer"
              aria-label="Cerrar ventana de detalles"
            >
              ✕
            </button>

            {/* Monospace Scope Rule Category Badge */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
              <span className="font-mono text-xs sm:text-[10px] tracking-[0.2em] sm:tracking-[0.4em] uppercase text-white border border-white/30 rounded-full px-2 py-1 sm:px-3.5 sm:py-1 bg-white/10 font-semibold break-words">
                {selectedSkill.id} // [ CAT: {selectedSkill.category} ]
              </span>
            </div>

            {/* Title */}
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-snug">
              {selectedSkill.name}
            </h3>

            {/* Category / Level Subtitle */}
            <p className="mt-2 font-mono text-xs tracking-[0.25em] uppercase text-neutral-400">
              {selectedSkill.categoryLabel} · <span className="text-neutral-500">{selectedSkill.level}</span>
            </p>

            {/* Silver Divider Line */}
            <div className="w-full h-px bg-white/10 my-5" />

            {/* Description Text Block */}
            <p className="text-sm text-neutral-400 leading-relaxed font-sans mb-6">
              {selectedSkill.desc}
            </p>

            {/* Progress Bar Container */}
            <div className="space-y-2">
              <div className="flex justify-between items-center font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                <span>[ DOMINIO TÉCNICO ]</span>
                <span className="text-white font-bold">{selectedSkill.progress}%</span>
              </div>

              {/* Progress bar track (2px height, dark neutral background) */}
              <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden relative">
                {/* Progress bar fill (pure white with subtle glow) */}
                <div
                  ref={progressBarRef}
                  className="h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)] rounded-full w-0"
                />
              </div>
            </div>

            {/* Footer Hint */}
            <div className="mt-8 pt-4 border-t border-white/5 text-center">
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-neutral-500">
                [ Clic fuera para cerrar y volver ]
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}






