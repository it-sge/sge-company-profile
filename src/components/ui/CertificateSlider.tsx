"use client";

import React, { useState } from "react";
import Image from "next/image";
import LightboxImage from "@/components/ui/LightboxImage";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface CertificateItem {
  id: number;
  name: string;
  imageUrl: string;
  gallery?: string | null;
  fileType: string;
}

export default function CertificateSlider({ certificates }: { certificates: CertificateItem[] }) {
  if (!certificates || certificates.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-7xl mx-auto">
      {certificates.map((cert) => (
        <div key={cert.id} className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[340px] flex-shrink-0">
          <CertificateCard cert={cert} />
        </div>
      ))}
    </div>
  );
}

function CertificateCard({ cert }: { cert: CertificateItem }) {
  const isPdf = cert.fileType === "pdf" || cert.imageUrl.toLowerCase().endsWith(".pdf");
  
  // Parse gallery if exists
  let images = [cert.imageUrl];
  if (!isPdf && cert.gallery) {
    try {
      const parsed = JSON.parse(cert.gallery);
      if (Array.isArray(parsed)) {
        images = [...images, ...parsed];
      }
    } catch (e) {
      console.error("Failed to parse gallery", e);
    }
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="group relative bg-white p-3 rounded-2xl shadow-2xl hover:shadow-gold/20 transition-all duration-300 ring-1 ring-white/10 flex flex-col">
      <div className="relative aspect-[1/1.414] w-full overflow-hidden rounded-xl bg-gray-50 border border-gray-200">
        
        {isPdf ? (
          <div className="w-full h-full relative flex flex-col items-center justify-center bg-gray-50">
            {/* Iframe only visible on md+ screens to avoid mobile browser blocking */}
            <iframe 
              src={`${cert.imageUrl}#toolbar=0&navpanes=0&scrollbar=1`} 
              className="absolute inset-0 w-full h-full border-0 hidden md:block"
              title={cert.name}
            />
            
            {/* Mobile placeholder */}
            <div className="flex md:hidden flex-col items-center justify-center text-gray-400 p-6 text-center absolute inset-0">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>
              <p className="text-sm font-medium text-navy/70">Dokumen PDF Tersedia</p>
              <p className="text-xs mt-2 max-w-[200px]">Pratinjau langsung diblokir oleh peramban HP Anda. Silakan klik tombol di bawah untuk membuka.</p>
            </div>

            {/* Fallback button overlay for all devices */}
            <div className="absolute bottom-4 right-4 md:bottom-4 md:right-4 z-10 w-[calc(100%-2rem)] md:w-auto flex justify-center md:justify-end">
              <a 
                href={cert.imageUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-navy hover:bg-navy-dark text-white px-5 py-3 md:py-2 w-full md:w-auto justify-center rounded-lg text-sm font-bold flex items-center shadow-xl md:shadow-lg transition-colors border border-white/10"
                title="Buka PDF Penuh"
              >
                <Maximize2 className="w-4 h-4 mr-2" />
                Buka PDF Lengkap
              </a>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            {images.map((img, idx) => (
              <div 
                key={idx}
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                  idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <LightboxImage 
                  src={img} 
                  alt={`${cert.name} - Halaman ${idx + 1}`} 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
            ))}

            {images.length > 1 && (
              <>
                <button 
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center text-navy hover:text-gold hover:bg-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center text-navy hover:text-gold hover:bg-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                
                {/* Dots indicator */}
                <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5">
                  {images.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentIndex ? 'bg-gold w-4' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

      </div>
      
      <div className="mt-4 text-center pb-2 px-2">
        <h3 className="font-semibold text-navy text-sm md:text-base">{cert.name}</h3>
      </div>
    </div>
  );
}
