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

    function raf(time: number) {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }

    rafIdRef.current = requestAnimationFrame(raf);

    // Cleanup on unmount to avoid memory leaks
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      lenis.destroy();
      lenisRef.current = null;
      // @ts-ignore
      window.lenis = null;
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
