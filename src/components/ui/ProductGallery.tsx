"use client";

import { useState } from "react";
import Image from "next/image";
import LightboxImage from "./LightboxImage";

interface ProductGalleryProps {
  mainImage: string;
  galleryImages?: string[];
  productName: string;
}

export default function ProductGallery({ mainImage, galleryImages = [], productName }: ProductGalleryProps) {
  const allImages = [mainImage, ...(galleryImages || [])].filter(img => img && img.trim() !== "");
  const [activeIndex, setActiveIndex] = useState(0);

  if (allImages.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 flex items-center justify-center p-6 sm:p-12 w-full h-[400px] sm:h-[500px] lg:h-[550px]">
        <span className="text-gray-400 font-medium">Gambar tidak tersedia</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Main Large Image */}
      <div className="relative flex items-center justify-center w-full h-[400px] sm:h-[500px] lg:h-[550px]">
        <LightboxImage 
          src={allImages[activeIndex]} 
          alt={`${productName} view ${activeIndex + 1}`} 
          sizes="(max-width: 1024px) 100vw, 800px"
          className="relative w-full h-full transition-opacity duration-300"
        />
        {/* Subtle overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none" />
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 sm:gap-4 px-2">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-square rounded-2xl overflow-hidden bg-white border-2 transition-all duration-300 ${
                activeIndex === idx 
                  ? "border-gold shadow-lg scale-100 opacity-100" 
                  : "border-transparent opacity-50 hover:opacity-100 hover:border-gold/30 hover:scale-95"
              }`}
            >
              <Image 
                src={img} 
                alt={`${productName} thumbnail ${idx + 1}`} 
                fill 
                className="object-contain p-2"
                sizes="(max-width: 768px) 25vw, 15vw"
                unoptimized={typeof img === 'string' && img.startsWith('/uploads')}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
