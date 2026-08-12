import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(useGSAP, ScrambleTextPlugin);

const LOG_MESSAGES = [
  '> INICIANDO PROTOCOLOS LSTI...',
  '> CONECTANDO NODO UANL [SECURE_CHANNEL]...',
  '> IDENTIDAD: CARLOS GIOVANNI REYES MEDINA',
  '> ACCESO CONCEDIDO.',
];

export default function BootAnimation({ onComplete }) {
  const containerRef = useRef(null);
  const ringOuterRef = useRef(null);
  const ringMidRef = useRef(null);
  const ringInnerRef = useRef(null);
  const coreDotRef = useRef(null);
  const flareCoreRef = useRef(null);
  const flareBeamRef = useRef(null);
  const logContainerRef = useRef(null);
  const lineRefs = useRef([]);

  useGSAP(
    () => {
      const rings = [ringOuterRef.current, ringMidRef.current, ringInnerRef.current];
      const flareElements = [flareCoreRef.current, flareBeamRef.current];

      // Hardware GPU acceleration hints & initial optical hidden state
      gsap.set(rings, { force3D: true, transformStyle: 'preserve-3d' });
      gsap.set(flareElements, { autoAlpha: 0, scale: 0, force3D: true });

      // 1. Independent infinite asymmetric ring rotations (GSAP Core)
      gsap.to(ringOuterRef.current, {
        rotation: 360,
        repeat: -1,
        ease: 'none',
        duration: 8,
      });

      gsap.to(ringMidRef.current, {
        rotation: -360,
        repeat: -1,
        ease: 'none',
        duration: 6,
      });

      gsap.to(ringInnerRef.current, {
        rotation: 360,
        repeat: -1,
        ease: 'none',
        duration: 4,
      });

      // Master Timeline
      const masterTl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // 2. Sequential ScrambleText decryption sequence
      lineRefs.current.forEach((el, index) => {
        if (!el) return;

        masterTl.to(
          el,
          {
            autoAlpha: 1,
            duration: 1.2,
            scrambleText: {
              text: LOG_MESSAGES[index],
              chars: '0123456789!@#$%^&*()_+=',
              speed: 0.4,
            },
          },
          index === 0 ? 0.2 : '+=0.2'
        );
      });

      // Brief pause after "ACCESO CONCEDIDO."
      masterTl.to({}, { duration: 0.3 });

      // 3. Quantum Lock Release (Cinemática de Ruptura)
      masterTl.add(() => {
        // Kill infinite rotation tweens
        gsap.killTweensOf(rings);
      });

      // Force rings alignment to rotation: 0 with ease: "power4.out", duration: 1, and borderColor: "#ffffff"
      masterTl.to(rings, {
        rotation: 0,
        borderColor: '#ffffff',
        duration: 1,
        ease: 'power4.out',
        overwrite: 'auto',
      });

      // Massive scale blast towards camera: scale: 30, autoAlpha: 0, ease: "expo.inOut", duration: 1.5, stagger: 0.1
      masterTl.to(
        rings,
        {
          scale: 30,
          autoAlpha: 0,
          duration: 1.5,
          ease: 'expo.inOut',
          stagger: 0.1,
          force3D: true,
        },
        '+=0.05'
      );

      // Optical Impact: Synchronized Monochromatic Lens Flare Burst
      masterTl.to(
        flareCoreRef.current,
        {
          autoAlpha: 1,
          scale: 2.5,
          duration: 0.25,
          ease: 'power2.out',
        },
        '<'
      );

      masterTl.to(
        flareBeamRef.current,
        {
          autoAlpha: 1,
          scaleX: 1.5,
          scaleY: 8,
          duration: 0.25,
          ease: 'power2.out',
        },
        '<'
      );

      // Dissolve Lens Flare smoothly with backdrop release
      masterTl.to(
        flareElements,
        {
          autoAlpha: 0,
          scale: 4,
          duration: 0.8,
          ease: 'power2.out',
        },
        '>-0.1'
      );

      // Core HUD node expansion
      if (coreDotRef.current) {
        masterTl.to(
          coreDotRef.current,
          {
            scale: 20,
            autoAlpha: 0,
            duration: 1.2,
            ease: 'expo.inOut',
          },
          '<'
        );
      }

      // Log block fade out
      masterTl.to(
        logContainerRef.current,
        {
          autoAlpha: 0,
          duration: 0.5,
          ease: 'power2.in',
        },
        '<-0.3'
      );

      // Main black backdrop fade out to reveal portfolio
      masterTl.to(
        containerRef.current,
        {
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '-=0.6'
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-[9999] flex items-center justify-center overflow-hidden select-none"
    >
      {/* HUD Biometric Lock Concentric Rings */}
      <div className="relative flex items-center justify-center w-80 h-80 pointer-events-none">
        {/* Outer Ring */}
        <div
          ref={ringOuterRef}
          className="absolute w-64 h-64 md:w-72 md:h-72 rounded-full border border-neutral-800 border-t-white will-change-transform"
        />

        {/* Middle Ring */}
        <div
          ref={ringMidRef}
          className="absolute w-48 h-48 md:w-52 md:h-52 rounded-full border border-neutral-800 border-r-white border-dashed will-change-transform"
        />

        {/* Inner Ring */}
        <div
          ref={ringInnerRef}
          className="absolute w-32 h-32 md:w-36 md:h-36 rounded-full border border-neutral-800 border-b-white will-change-transform"
        />

        {/* Core Node */}
        <div
          ref={coreDotRef}
          className="absolute w-2 h-2 rounded-full bg-white will-change-transform shadow-[0_0_12px_#ffffff]"
        />
      </div>

      {/* Lens Flare Monochromatic Optical Refraction Layer */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[100]">
        {/* Core Radial Flare Spot */}
        <div
          ref={flareCoreRef}
          className="w-64 h-64 rounded-full mix-blend-screen will-change-[transform,opacity,filter]"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)',
          }}
        />

        {/* Anamorphic Horizontal Flare Beam */}
        <div
          ref={flareBeamRef}
          className="absolute w-[200vw] h-[2px] bg-white opacity-80 blur-sm mix-blend-screen will-change-[transform,opacity,filter]"
        />
      </div>

      {/* Access Log Terminal */}
      <div
        ref={logContainerRef}
        className="font-mono text-xs text-neutral-500 absolute bottom-6 left-6 md:bottom-8 md:left-8 space-y-1.5 text-left max-w-sm pointer-events-none z-10"
      >
        {LOG_MESSAGES.map((_, index) => (
          <div
            key={index}
            ref={(el) => (lineRefs.current[index] = el)}
            className="opacity-0 will-change-transform"
          >
            &nbsp;
          </div>
        ))}
      </div>
    </div>
  );
}




