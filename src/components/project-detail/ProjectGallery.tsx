"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-heading font-bold text-navy mb-4">Project Gallery</h2>
        <div className="w-16 h-1 bg-gold mx-auto rounded-full mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">Visual documentation of our precision engineering and installation process.</p>
      </div>

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className="relative rounded-xl overflow-hidden cursor-pointer group break-inside-avoid"
            onClick={() => openLightbox(idx)}
          >
            {/* We use next/img with auto height/width in standard HTML to allow masonry effect */}
            <img 
              src={img} 
              alt={`Gallery image ${idx + 1}`} 
              className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          <button 
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-8 h-8" />
          </button>
          
          <button 
            className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-colors p-2"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          
          <div className="relative w-full max-w-5xl h-[80vh]">
            <Image 
              src={images[currentIndex]}
              alt={`Lightbox image ${currentIndex + 1}`}
              fill
              className="object-contain"
            />
            <div className="absolute bottom-[-40px] left-0 right-0 text-center text-white/50 text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
          
          <button 
            className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-colors p-2"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}
    </div>
  );
}
