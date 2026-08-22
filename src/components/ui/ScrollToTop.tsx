"use client";

import { useState, useEffect, useCallback } from "react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const [launch, setLaunch] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!launch) {
            setShow(window.scrollY > 300);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [launch]);

  const scrollToTop = useCallback(() => {
    if (launch) return;
    setLaunch(true);

    // Keep Lenis animation loop alive for the entire duration of the scroll
    // @ts-ignore
    if (window.lenis) {
      // @ts-ignore - Wake up the Lenis loop first
      if (window.wakeLenis) window.wakeLenis();

      // @ts-ignore
      const lenis: any = window.lenis;
      
      // Keep poking Lenis alive every 100ms so the idle timer never kills the loop mid-scroll
      const keepAlive = setInterval(() => {
        // @ts-ignore
        if (window.wakeLenis) window.wakeLenis();
      }, 100);

      // Use Lenis scrollTo with a completion callback
      lenis.scrollTo(0, { 
        duration: 1.2,
        onComplete: () => {
          clearInterval(keepAlive);
        }
      });

      // Safety: clear keepAlive after max duration in case onComplete doesn't fire
      setTimeout(() => {
        clearInterval(keepAlive);
      }, 2000);
    } else {
      // Fallback: manual smooth scroll using requestAnimationFrame
      const start = window.pageYOffset || document.documentElement.scrollTop;
      const duration = 1000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuart for a smooth deceleration feel
        const ease = 1 - Math.pow(1 - progress, 4);
        window.scrollTo(0, start * (1 - ease));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }

    // Reset rocket animation after it flies away
    setTimeout(() => {
      setLaunch(false);
      setShow(false);
    }, 1400);
  }, [launch]);

  return (
    <div
      className={`ignielRocket ${show ? "show" : ""} ${launch ? "launch" : ""}`}
      onClick={scrollToTop}
    >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.81,14.12L5.64,11.29L8.17,10.79C11.39,6.41 17.55,4.22 19.78,4.22C19.78,6.45 17.59,12.61 13.21,15.83L12.71,18.36L9.88,21.19L9.17,17.66C7.76,17.66 7.76,17.66 7.05,16.95C6.34,16.24 6.34,16.24 6.34,14.83L2.81,14.12M5.64,16.95L7.05,18.36L4.39,21.03H2.97V19.61L5.64,16.95M4.22,15.54L5.46,15.71L3,18.16V16.74L4.22,15.54M8.29,18.54L8.46,19.78L7.26,21H5.84L8.29,18.54M13,9.5A1.5,1.5 0 0,0 11.5,11A1.5,1.5 0 0,0 13,12.5A1.5,1.5 0 0,0 14.5,11A1.5,1.5 0 0,0 13,9.5Z" />
      </svg>
    </div>
  );
}
