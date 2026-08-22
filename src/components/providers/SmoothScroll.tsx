"use client";

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isRunningRef = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check for user's accessibility preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      return; // Do not initialize Lenis if user prefers reduced motion
    }

    // Initialize Lenis with premium settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium custom easing
      wheelMultiplier: 1,
      syncTouch: false,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    // @ts-ignore
    window.lenis = lenis;

    // Idle-aware animation loop
    function raf(time: number) {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }

    function startLoop() {
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        rafIdRef.current = requestAnimationFrame(raf);
      }
      // Reset idle timer — stop loop after 150ms of no scroll activity
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(stopLoop, 150);
    }

    function stopLoop() {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      isRunningRef.current = false;
    }

    // Start loop on user interaction
    const onActivity = () => startLoop();
    window.addEventListener('wheel', onActivity, { passive: true });
    window.addEventListener('touchmove', onActivity, { passive: true });
    window.addEventListener('keydown', onActivity, { passive: true });
    
    // Also wake up on clicks (for buttons that might trigger programmatic scroll)
    window.addEventListener('mousedown', onActivity, { passive: true });
    
    // @ts-ignore
    window.wakeLenis = startLoop;

    // Start initially (for page load scroll position restore, etc.)
    startLoop();

    // Cleanup on unmount to avoid memory leaks
    return () => {
      stopLoop();
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener('wheel', onActivity);
      window.removeEventListener('touchmove', onActivity);
      window.removeEventListener('keydown', onActivity);
      window.removeEventListener('mousedown', onActivity);
      lenis.destroy();
      lenisRef.current = null;
      // @ts-ignore
      window.lenis = null;
      // @ts-ignore
      window.wakeLenis = null;
    };
  }, []);

  // Reset scroll on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return <>{children}</>;
}
