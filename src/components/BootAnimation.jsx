import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const WELCOME_TEXT = 'Bienvenido/a a mi portafolio';
const CIPHER_CHARS = ['0', '1', '#', '%', 'X', '@', '!', '*', '&', '>', '<', '~', '^'];

function randomCipherChar() {
  return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
}

export default function BootAnimation({ onComplete }) {
  const containerRef = useRef(null);
  const letterRefs = useRef([]);
  const originalChars = useRef([]);

  const chars = WELCOME_TEXT.split('');

  useEffect(() => {
    originalChars.current = chars;

    const validRefs = letterRefs.current.filter(Boolean);
    if (validRefs.length === 0) return;

    const tl = gsap.timeline();

    // ── Phase 1: Emerge from void with motion blur, scale depth & direction vectors ──
    tl.fromTo(
      validRefs,
      {
        x: () => gsap.utils.random(-window.innerWidth * 0.7, window.innerWidth * 0.7),
        y: () => gsap.utils.random(-window.innerHeight * 0.7, window.innerHeight * 0.7),
        scale: () => gsap.utils.random(1.8, 2.5),
        rotationZ: () => gsap.utils.random(-90, 90),
        filter: 'blur(16px)',
        opacity: 0,
        force3D: true,
      },
      {
        x: 0,
        y: 0,
        scale: 1,
        rotationZ: 0,
        filter: 'blur(0px)',
        opacity: 1,
        ease: 'expo.out',
        duration: 1.6,
        stagger: 0.02,
        force3D: true,
      }
    );

    // ── Phase 2: Security Cipher Scramble — The Monospace Scope Rule in Silver ──
    tl.call(() => {
      if (containerRef.current) {
        const textEl = containerRef.current.querySelector('p');
        if (textEl) {
          textEl.classList.remove('font-extrabold', 'tracking-tighter', 'text-white');
          textEl.classList.add('font-mono', 'text-neutral-400');
          validRefs.forEach((ref) => {
            if (ref) {
              ref.style.textShadow = '0 0 20px rgba(255,255,255,0.4)';
            }
          });
        }
      }

      const startTime = Date.now();
      const duration = 1000;
      const intervalMs = 40;

      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;

        validRefs.forEach((ref, i) => {
          if (!ref) return;
          const originalChar = originalChars.current[i];
          if (originalChar === ' ') return;

          if (progress < 0.9) {
            ref.textContent = randomCipherChar();
          } else {
            ref.textContent = originalChar;
          }
        });

        if (elapsed >= duration) {
          clearInterval(interval);
          validRefs.forEach((ref, i) => {
            if (ref) ref.textContent = originalChars.current[i];
          });
        }
      }, intervalMs);
    });

    // Hold cipher phase
    tl.to({}, { duration: 1.1 });

    // ── Phase 3: Asymmetric Magnetic Blur Scatter Exit ──
    tl.to(validRefs, {
      x: () => gsap.utils.random(-window.innerWidth * 1.2, window.innerWidth * 1.2),
      y: () => gsap.utils.random(-window.innerHeight * 1.2, window.innerHeight * 1.2),
      rotationZ: () => gsap.utils.random(-120, 120),
      scale: 0.3,
      filter: 'blur(16px)',
      opacity: 0,
      ease: 'expo.in',
      duration: 1.2,
      stagger: 0.015,
      force3D: true,
    });

    // ── Phase 4: Backdrop dissolve & clean unmount ──
    tl.to(containerRef.current, {
      opacity: 0,
      pointerEvents: 'none',
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
    >
      <p className="font-extrabold tracking-tighter text-white text-5xl md:text-7xl lg:text-9xl flex flex-wrap justify-center items-center leading-none select-none text-center w-[75vw] max-w-[75%] mx-auto">
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => (letterRefs.current[i] = el)}
            style={{
              display: 'inline-block',
              minWidth: char === ' ' ? '0.3em' : undefined,
              textShadow: char !== ' '
                ? '0 0 40px rgba(255,255,255,0.25), 0 0 80px rgba(255,255,255,0.1)'
                : 'none',
              willChange: 'transform, opacity, filter',
            }}
          >
            {char}
          </span>
        ))}
      </p>
    </div>
  );
}
