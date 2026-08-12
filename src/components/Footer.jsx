import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 30, force3D: true },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          force3D: true,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
            fastScrollEnd: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative z-10 w-full bg-black border-t border-neutral-900 py-12 px-6 opacity-0 will-change-transform"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 font-mono">
        {/* System Signature (Left) */}
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-xs sm:text-sm tracking-widest text-neutral-500 uppercase">
            SYSTEM: SECURE // GIOVANNI REYES © 2026
          </span>
        </div>

        {/* Professional Networks & Links (Right) */}
        <div className="flex items-center gap-8">
          <a
            href="https://github.com/whoisgiov2"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Perfil oficial de GitHub de Giovanni Reyes"
            className="group relative text-xs tracking-[0.2em] text-white uppercase transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded py-0.5"
          >
            <span>GitHub ↗</span>
            <span className="absolute bottom-0 left-0 right-0 h-px bg-white/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>

          <a
            href="https://www.credly.com/users/giovanni-reyes-medina/badges/credly"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Perfil oficial de credenciales en Credly"
            className="group relative text-xs tracking-[0.2em] text-white uppercase transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded py-0.5"
          >
            <span>Credly ↗</span>
            <span className="absolute bottom-0 left-0 right-0 h-px bg-white/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>
        </div>
      </div>
    </footer>
  );
}
