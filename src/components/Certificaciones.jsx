import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import './Certificaciones.css';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/* ── Source of truth: PROFILE.md (Exactly 8 Certifications) ── */
const CERTS = [
  {
    id: 'CERT-STI',
    name: 'Licenciatura en Seguridad en Tecnologías de Información',
    issuer: 'UANL · FCFM',
    desc: 'Programa académico especializado en ciberseguridad, criptografía, auditoría de sistemas, análisis de vulnerabilidades y arquitectura de redes seguras.',
    year: '2022 — Pres.',
    href: 'https://www.credly.com/users/giovanni-reyes-medina/badges/credly',
  },
  {
    id: 'CERT-RHSA1',
    name: 'Red Hat System Administration I (RH124 - RHA) Ver 9.3',
    issuer: 'Red Hat Academy',
    desc: 'Verifica la asistencia al curso de administración de sistemas RHEL. Prepara para el curso avanzado RH134 (Red Hat System Administration II).',
    year: '2024',
    href: 'https://www.credly.com/users/giovanni-reyes-medina/badges/credly',
  },
  {
    id: 'CERT-FCF',
    name: 'Fortinet Certified Fundamentals Cybersecurity',
    issuer: 'Fortinet',
    desc: 'Valida habilidades técnicas y conocimientos fundamentales requeridos para roles de entrada en ciberseguridad dentro del ecosistema Fortinet.',
    year: '2024',
    href: 'https://www.credly.com/users/giovanni-reyes-medina/badges/credly',
  },
  {
    id: 'CERT-NSE1',
    name: 'Fortinet NSE 1 — Certified in Cybersecurity',
    issuer: 'Fortinet · NSE',
    desc: 'Dominio del panorama actual de amenazas cibernéticas y la comprensión de los vectores de ataque modernos.',
    year: '2024',
    href: 'https://www.credly.com/users/giovanni-reyes-medina/badges/credly',
  },
  {
    id: 'CERT-NSE2',
    name: 'Fortinet NSE 2 — Certified in Cybersecurity',
    issuer: 'Fortinet · NSE',
    desc: 'Avala conocimientos para identificar y describir características de Next Generation Firewalls (NGFW) y soluciones de seguridad.',
    year: '2024',
    href: 'https://www.credly.com/users/giovanni-reyes-medina/badges/credly',
  },
  {
    id: 'CERT-GSC',
    name: 'Getting Started in Cybersecurity 3.0',
    issuer: 'Fortinet',
    desc: 'Demuestra conocimiento de terminología esencial de ciberseguridad, conceptos básicos y tecnologías clave del sector.',
    year: '2024',
    href: 'https://www.credly.com/users/giovanni-reyes-medina/badges/credly',
  },
  {
    id: 'CERT-ITL',
    name: 'Introduction to the Threat Landscape 3.0',
    issuer: 'Fortinet',
    desc: 'Comprensión de amenazas modernas a redes, la identificación de actores maliciosos y el análisis de principios de seguridad.',
    year: '2024',
    href: 'https://www.credly.com/users/giovanni-reyes-medina/badges/credly',
  },
  {
    id: 'CERT-TIC',
    name: 'Technical Introduction to Cybersecurity 2.0',
    issuer: 'Fortinet',
    desc: 'Fundamentos técnicos de ciberseguridad aplicados a la protección de redes y endpoints empresariales.',
    year: '2024',
    href: 'https://www.credly.com/users/giovanni-reyes-medina/badges/credly',
  },
];

const TOTAL = CERTS.length; /* 8 */

const STATE_META = [
  { label: 'ORBITAL VIEW',     hint: 'Clic fondo → Inclinación | Clic tarjeta → Ver detalle' },
  { label: 'ISOMETRIC VIEW',   hint: 'Clic fondo → Pausa | Clic tarjeta → Ver detalle'       },
  { label: 'LECTURA ESTÁTICA',  hint: 'Clic fondo → Reanudar | Clic tarjeta → Ver detalle'    },
];

export default function Certificaciones() {
  const [viewState, setViewState]   = useState(0);
  const [activeCard, setActiveCard] = useState(null);

  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const titleRef   = useRef(null);
  const wrapperRef = useRef(null);

  /* ── Cycle states on scene click (or close modal if open) ── */
  const handleSceneClick = () => {
    if (activeCard !== null) {
      setActiveCard(null);
    } else {
      setViewState((prev) => (prev + 1) % 3);
    }
  };

  /* ── Open active card in 2D modal ── */
  const handleCardClick = (i, e) => {
    e.stopPropagation();
    setActiveCard(i);
  };

  /* ── ScrollTrigger reveal with useGSAP ── */
  useGSAP(() => {
    const split = SplitText.create(titleRef.current, { type: 'words, chars' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });

    tl.from(headerRef.current, {
      autoAlpha: 0,
      x: 45,
      duration: 0.8,
      ease: 'power3.out',
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
    .from(wrapperRef.current, {
      autoAlpha: 0,
      scale: 0.7,
      rotationX: 20,
      duration: 1.5,
      ease: 'power3.out',
      onComplete: () => {
        gsap.set([headerRef.current, wrapperRef.current], { clearProps: 'willChange' });
      },
    }, '-=0.6');
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="max-w-5xl mx-auto w-full overflow-x-hidden">

      {/* ── Section header ── */}
      <div ref={headerRef} data-speed="1.1" className="mb-10 text-right will-change-transform">
        <span className="font-mono text-[11px] tracking-[0.4em] uppercase text-neutral-400 border border-white/15 rounded-full px-4 py-1.5 bg-white/[0.03]">
          04&nbsp;/&nbsp;CERTIFICACIONES
        </span>
        <h2 ref={titleRef} className="mt-6 text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
          Credenciales<br />
          <span className="text-neutral-500">y Logros</span>
        </h2>
        <p className="mt-4 font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-500 max-w-xs ml-auto">
          {TOTAL} credenciales verificadas · Credly
        </p>
      </div>

      {/* ── Carousel wrapper ── */}
      <div ref={wrapperRef} className="will-change-transform">

        {/* HUD: state dots + label */}
        <div className="flex items-center justify-between mb-5 px-1">
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((s) => (
              <div key={s} className={`cert-hud-dot ${viewState === s && activeCard === null ? 'active' : ''}`} />
            ))}
          </div>
          <div className="text-right space-x-3">
            <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-white font-semibold">
              {activeCard !== null
                ? `DETALLE // [${CERTS[activeCard].id}]`
                : STATE_META[viewState].label}
            </span>
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-neutral-500">
              {activeCard !== null ? 'Modo enfoque 2D' : STATE_META[viewState].hint}
            </span>
          </div>
        </div>

        {/* ── 3D scene (dimmed & blurred when modal activeCard !== null) ── */}
        <div
          className={`cert-scene state-${viewState} ${activeCard !== null ? 'has-active-card' : ''}`}
          onClick={handleSceneClick}
          aria-label="Carrusel interactivo 3D de certificaciones. Haz clic para cambiar la inclinación de la vista orbital."
        >
          <div
            className="cert-ring"
            style={{ '--n': TOTAL }}
          >
            {CERTS.map((cert, i) => (
              <div
                key={cert.id}
                tabIndex={0}
                role="button"
                aria-label={`Ver detalle de certificación: ${cert.name}`}
                onClick={(e) => handleCardClick(i, e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(i, e);
                  }
                }}
                className="cert-card-3d outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-black rounded-2xl"
                style={{ '--i': i, '--n': TOTAL }}
              >
                <div className="cert-card-inner">

                  {/* Monospace ID badge */}
                  <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-neutral-400">
                    {cert.id}
                  </span>

                  {/* Cert name */}
                  <h3 className="text-[11px] font-bold tracking-tight text-neutral-200 leading-snug mt-1">
                    {cert.name}
                  </h3>

                  {/* Description — visible in static reading state 2 */}
                  {viewState === 2 && (
                    <p className="text-[10px] text-neutral-400 leading-relaxed mt-1 line-clamp-3">
                      {cert.desc}
                    </p>
                  )}

                  {/* Footer: issuer + year */}
                  <div className="mt-auto pt-3 flex flex-col gap-1">
                    <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-neutral-500">
                      {cert.issuer}
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[8px] text-neutral-400">{cert.year}</span>
                      <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-neutral-400 group-hover:text-white transition-colors duration-300">
                        Detalle ↗
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Global Credly CTA — always visible ── */}
        <div className="mt-6 flex justify-center">
          <a
            href="https://www.credly.com/users/giovanni-reyes-medina/badges/credly"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver todas las credenciales oficiales en Credly"
            className="cert-credly-link outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-md px-2 py-1"
            onClick={(e) => e.stopPropagation()}
          >
            <span>Ver todas las credenciales en Credly</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>

      </div>

      {/* ── 2D MODAL OVERLAY (100% 2D Frontal, Monochromatic Chrome) ── */}
      {activeCard !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Detalle de credencial: ${CERTS[activeCard].name}`}
          className="cert-modal-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 cursor-pointer"
          onClick={() => setActiveCard(null)}
        >
          <div
            className="cert-modal-card relative max-w-lg w-full rounded-2xl border border-white/20 bg-neutral-950/95 backdrop-blur-2xl p-8 shadow-[0_0_60px_rgba(255,255,255,0.15)] cursor-default transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveCard(null)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white font-mono text-xs tracking-widest transition-colors duration-200 border border-white/15 rounded-full w-8 h-8 flex items-center justify-center bg-white/[0.04] outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              aria-label="Cerrar modal de detalle"
            >
              ✕
            </button>

            {/* Monospace ID Badge */}
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white border border-white/30 rounded-full px-3 py-1 bg-white/10 font-semibold">
                {CERTS[activeCard].id}
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                CREDENTIAL VERIFIED
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-black tracking-tight text-white leading-snug">
              {CERTS[activeCard].name}
            </h3>

            {/* Issuer & Year */}
            <div className="mt-2.5 flex items-center gap-3">
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-neutral-300">
                {CERTS[activeCard].issuer}
              </span>
              <span className="text-neutral-600">•</span>
              <span className="font-mono text-xs tracking-[0.2em] text-neutral-400">
                {CERTS[activeCard].year}
              </span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/10 my-5" />

            {/* Detailed Description */}
            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              {CERTS[activeCard].desc}
            </p>

            {/* Credly Action */}
            <div className="mt-8 flex items-center justify-between pt-2">
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-neutral-500">
                VALIDACIÓN OFICIAL
              </span>

              {CERTS[activeCard].href && (
                <a
                  href={CERTS[activeCard].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Verificar credencial ${CERTS[activeCard].name} en Credly`}
                  className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] uppercase px-5 py-2.5 rounded-xl border border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                >
                  <span>Verificar Credencial</span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>

            {/* Hint */}
            <p className="mt-6 text-center font-mono text-[9px] tracking-[0.3em] uppercase text-neutral-500">
              [ Clic fuera para cerrar y reanudar la órbita ]
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
