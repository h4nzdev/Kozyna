import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Disable completely on touch devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovered = false;
    let isVisible = false;
    let isRunning = false;
    let animId = null;

    const renderLoop = () => {
      // Damped trailing movement
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      ringX += dx * 0.22;
      ringY += dy * 0.22;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(${
          isHovered ? 0 : 1
        })`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${
          isHovered ? 1.4 : 1
        })`;
        ringRef.current.style.borderColor = isHovered ? '#C59B63' : 'rgba(197, 155, 99, 0.6)';
        ringRef.current.style.backgroundColor = isHovered
          ? 'rgba(197, 155, 99, 0.15)'
          : 'transparent';
      }

      // If ring has settled and mouse is still, pause RAF to save CPU
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        animId = requestAnimationFrame(renderLoop);
      } else {
        isRunning = false;
      }
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }

      const target = e.target;
      isHovered = !!(
        target &&
        (target.closest('button, a, [role="button"], input, select, textarea') ||
          document.body.style.cursor === 'pointer')
      );

      // Start loop only if not currently running
      if (!isRunning) {
        isRunning = true;
        animId = requestAnimationFrame(renderLoop);
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-gold rounded-full pointer-events-none z-[999] opacity-0 transition-opacity duration-300 will-change-transform shadow-sm"
      />
      {/* Smooth Trailing Follower Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 border border-gold/60 rounded-full pointer-events-none z-[998] opacity-0 transition-[border-color,background-color,opacity] duration-300 will-change-transform"
      />
    </>
  );
}
