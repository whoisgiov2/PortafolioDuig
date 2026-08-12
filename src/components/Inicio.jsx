import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function Inicio() {
  const sectionRef = useRef(null);
  const badgeRef   = useRef(null);
  const lineRef    = useRef(null);
  const h1aRef     = useRef(null);
  const h1bRef     = useRef(null);
  const roleRef    = useRef(null);
  const bodyRef    = useRef(null);
  const ctaRef     = useRef(null);

  useGSAP(() => {
    const splitA = SplitText.create(h1aRef.current, { type: 'words, chars' });
    const splitB = SplitText.create(h1bRef.current, { type: 'words, chars' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 82%',
      },
    });

    tl.from(badgeRef.current, {
      autoAlpha: 0,
      y: 16,
      duration: 0.7,
      ease: 'power3.out',
    })
    .from(lineRef.current, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.3')
    .from(splitA.chars, {
      autoAlpha: 0,
      y: 50,
      rotationX: -90,
      transformOrigin: 'center bottom',
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.02,
    }, '-=0.4')
    .from(splitB.chars, {
      autoAlpha: 0,
      y: 50,
      rotationX: -90,
      transformOrigin: 'center bottom',
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.02,
    }, '-=0.6')
    .from(roleRef.current, {
      autoAlpha: 0,
      y: 30,
      duration: 0.7,
      ease: 'power3.out',
    }, '-=0.4')
    .from(bodyRef.current, {
      autoAlpha: 0,
      y: 20,
      duration: 0.75,
      ease: 'power3.out',
    }, '-=0.5')
    .from(ctaRef.current, {
      autoAlpha: 0,
      y: 16,
      duration: 0.6,
      ease: 'power3.out',
      onComplete: () => {
        gsap.set([badgeRef.current, lineRef.current, roleRef.current, bodyRef.current, ctaRef.current], { clearProps: 'willChange' });
      },
    }, '-=0.45');
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="max-w-5xl mx-auto w-full">

      {/* Badge */}
      <div ref={badgeRef} className="mb-8 will-change-transform">
        <span className="font-mono text-[11px] tracking-[0.4em] uppercase text-neutral-400 border border-white/10 rounded-full px-4 py-1.5 bg-white/[0.025]">
          {'>'}_&nbsp;Portafolio Interactivo — CGRM
        </span>
      </div>

      {/* Accent line */}
      <div ref={lineRef} className="w-20 h-px bg-gradient-to-r from-white/40 to-transparent mb-10 will-change-transform" />

      {/* Headline */}
      <h1 data-speed="1.1" className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[0.95] sm:leading-[0.92] mb-2 overflow-hidden">
        <span ref={h1aRef} className="block text-white will-change-transform">Carlos Giovanni</span>
        <span ref={h1bRef} className="block text-neutral-500 will-change-transform">Reyes Medina</span>
      </h1>

      {/* Role */}
      <p
        ref={roleRef}
        className="mt-7 text-sm sm:text-base md:text-lg text-neutral-400 font-medium tracking-widest uppercase max-w-xl will-change-transform"
      >
        Seguridad en Tecnologías de Información
      </p>

      {/* Body */}
      <div ref={bodyRef} className="mt-5 space-y-2 max-w-lg">
        <p className="text-sm text-neutral-400 leading-relaxed">
          Universidad Autónoma de Nuevo León (UANL)<br />
          Facultad de Ciencias Físico Matemáticas · FCFM
        </p>
        <p className="text-sm text-neutral-500 leading-relaxed">
          Especialización en Ciberseguridad, Ingeniería de Software y Desarrollo Web Full-Stack.
        </p>
      </div>

      {/* CTA scroll hint */}
      <div ref={ctaRef} className="mt-12 flex items-center gap-3" aria-hidden="true">
        <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-neutral-500">SCROLL PARA EXPLORAR</span>
        <span className="text-neutral-500 animate-bounce text-lg leading-none">↓</span>
      </div>

    </div>
  );
}

