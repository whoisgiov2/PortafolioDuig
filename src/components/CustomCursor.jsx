import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isTouchDevice] = useState(
    () =>
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window)
  );
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;

      // Instant dot positioning
      gsap.set(dot, { x, y, force3D: true });

      // Smooth trailing ring
      gsap.to(ring, {
        x,
        y,
        duration: 0.18,
        ease: 'power2.out',
        force3D: true,
      });
    };

    // Attach listeners for interactive hover elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.interactive-hover') ||
        target.closest('input') ||
        target.closest('textarea')
      ) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.interactive-hover') ||
        target.closest('input') ||
        target.closest('textarea')
      ) {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Center solid white dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-white rounded-full pointer-events-none z-[9999] transition-transform duration-200 ${
          isHovered ? 'scale-0' : 'scale-100'
        }`}
        style={{ mixBlendMode: 'difference' }}
      />

      {/* Trailing silver ring / expanding blend circle on hover */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] transition-all duration-300 ${
          isHovered
            ? 'w-12 h-12 -ml-6 -mt-6 bg-white border-none scale-100 shadow-[0_0_20px_rgba(255,255,255,0.8)]'
            : 'w-8 h-8 -ml-4 -mt-4 border border-white/40 bg-white/[0.03] scale-100'
        }`}
        style={{ mixBlendMode: 'difference' }}
      />
    </>
  );
}
