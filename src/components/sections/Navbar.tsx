"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  navImage?: string;
}

export default function Navbar({ navImage }: NavbarProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll detection
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
    <nav className={`w-full z-50 sticky top-0 transition-all duration-300 print:hidden ${
      scrolled 
        ? 'bg-navy/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] rounded-b-3xl md:rounded-b-[2.5rem] border-b border-white/10' 
        : (isHome ? 'bg-transparent rounded-none' : 'bg-navy rounded-none')
    } text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center relative h-20 md:h-24">
          <div className="flex items-center z-10">
            <div className={`transition-all duration-500 ease-in-out ${isHome && !scrolled ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
              <Link href="/" className="flex items-center">
                <Image 
                  src="/logo/logo.png" 
                  alt="Sun Global Energi" 
                  width={250} 
                  height={80} 
                  className="w-auto object-contain drop-shadow-md h-12 md:h-16 ml-2 md:ml-4 py-1"
                  priority
                />
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-10 items-center z-10">
            <Link href="/" className="hover:text-gold transition-colors font-bold text-lg text-white">Home</Link>
            <Link href="/product" className="hover:text-gold transition-colors font-bold text-lg text-white">Product</Link>
            <Link href="/project" className="hover:text-gold transition-colors font-bold text-lg text-white">Project</Link>
            <Link href="/contact" className="hover:text-gold transition-colors font-bold text-lg text-white">Contact</Link>
          </div>

          <div className="flex items-center z-10">
             <button 
               className={`md:hidden flex items-center justify-center p-2.5 rounded-xl transition-all ${isHome && !scrolled ? 'bg-navy/80 text-white backdrop-blur-md shadow-sm border border-white/10' : 'text-white hover:text-gold'}`} 
               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
             >
               <Menu className="w-6 h-6" />
             </button>
          </div>
        </div>
      </div>
      
    </nav>

    {/* ========================================= */}
    {/* ========================================= */}
    {/* FULLSCREEN OVERLAY MENU (AS PER USER MOCKUP) */}
    {/* ========================================= */}
    
    <div 
      className={`md:hidden fixed inset-0 z-[100] transition-all duration-700 ease-in-out ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      {/* Background padding representing the edge frame */}
      <div className="absolute inset-0 bg-[#051525] transition-transform duration-700 ease-in-out" style={{ transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(100%)' }} />
      
      {/* The Main Overlay Card */}
      <div 
        className={`absolute inset-2 sm:inset-4 bg-navy rounded-[2rem] overflow-hidden flex flex-col shadow-2xl border border-white/10 transition-transform duration-700 delay-100 ease-out ${mobileMenuOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-24 scale-95 opacity-0'}`}
      >
        {/* Top Header: CLOSE X */}
        <div className="p-6 sm:p-8 pb-2">
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-1 text-white hover:text-gold transition-colors font-bold tracking-widest text-sm uppercase"
          >
            <span>Close</span>
            <X className="w-5 h-5 ml-1" />
          </button>
        </div>
        
        {/* Nav Links */}
        <div className="px-6 sm:px-8 py-4 flex flex-col space-y-5 sm:space-y-6">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="group block">
            <span className="text-4xl sm:text-5xl font-heading font-black text-white group-hover:text-gold transition-colors uppercase tracking-tight">Home</span>
          </Link>
          <Link href="/product" onClick={() => setMobileMenuOpen(false)} className="group block">
            <span className="text-4xl sm:text-5xl font-heading font-black text-white group-hover:text-gold transition-colors uppercase tracking-tight">Product</span>
          </Link>
          <Link href="/project" onClick={() => setMobileMenuOpen(false)} className="group block">
            <span className="text-4xl sm:text-5xl font-heading font-black text-white group-hover:text-gold transition-colors uppercase tracking-tight">Project</span>
          </Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="group block">
            <span className="text-4xl sm:text-5xl font-heading font-black text-white group-hover:text-gold transition-colors uppercase tracking-tight">Contact</span>
          </Link>
        </div>

        {/* Bottom Banner Image & Text */}
        <div className="mt-auto flex flex-col">
          <div className="relative w-full overflow-hidden group flex items-end justify-center">
            <Image 
              src={navImage || "https://images.unsplash.com/photo-1508514177221-188b1c77eca2?q=80&w=800"} 
              alt="Sun Global Energi Highlight" 
              width={800}
              height={533}
              sizes="100vw"
              loading="lazy"
              className="w-full h-auto object-contain object-bottom group-hover:scale-105 transition-transform duration-1000" 
            />
          </div>
          <div className="px-6 py-5 sm:px-8 bg-black/10">
            <p className="text-white/70 font-mono text-xs sm:text-sm tracking-widest font-semibold uppercase">
              PT Sun Global Energi.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
