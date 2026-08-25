"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

export default function LightboxImage({ src, alt, className = "", imageClassName = "object-contain", sizes = "100vw" }: { src: string; alt: string; className?: string, imageClassName?: string, sizes?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // State for desktop zoom effect
  const [isZooming, setIsZooming] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState("center center");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!src) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return; // Only zoom on desktop
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setTransformOrigin(`${x}% ${y}%`);
    if (!isZooming) setIsZooming(true);
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
  };

  const handleClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(true);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" style={{ zIndex: 9999 }}>
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative z-10 w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center animate-in fade-in zoom-in duration-300">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="relative w-full h-full">
          <Image 
            src={src} 
            alt={alt} 
            fill 
            sizes="100vw"
            className="object-contain"
            loading="lazy"
            unoptimized={typeof src === 'string' && src.startsWith('/uploads')}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div 
        className={`${className.includes('absolute') ? '' : 'relative'} group cursor-pointer lg:cursor-crosshair overflow-hidden ${className}`}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Image 
          src={src} 
          alt={alt} 
          fill 
          sizes={sizes}
          className={`${imageClassName} transition-transform ease-out ${isZooming ? 'duration-150 scale-[2.5]' : 'duration-500 scale-100'}`}
          style={{ 
            transformOrigin,
            objectFit: imageClassName.includes('object-cover') ? 'cover' : 'contain'
          }}
          unoptimized={typeof src === 'string' && src.startsWith('/uploads')}
        />
        
        {/* Mobile Lightbox Overlay Icon */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center lg:hidden">
          <ZoomIn className="text-white w-10 h-10 drop-shadow-md" />
        </div>
      </div>

      {mounted && isOpen && typeof document !== 'undefined'
        ? createPortal(modalContent, document.body)
        : null}
    </>
  );
}
