"use client";

import { useState } from "react";
import Link from "next/link";
import LightboxImage from "@/components/ui/LightboxImage";

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper to get specs safely
  let specsObj: Record<string, string> = {};
  if (product.specs) {
    try {
      specsObj = JSON.parse(product.specs);
    } catch (e) {}
  }

  const specEntries = Object.entries(specsObj).slice(0, 3);
  
  // Truncate logic
  const maxLength = 120;
  const shouldTruncate = product.description && product.description.length > maxLength;
  const displayDesc = isExpanded ? product.description : (shouldTruncate ? product.description.substring(0, maxLength) + "..." : product.description);

  return (
    <div className="bg-offwhite rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group flex flex-col h-full">
      <div className="h-64 bg-slate relative overflow-hidden flex-shrink-0">
        {product.imageUrl ? (
          <LightboxImage 
            src={product.imageUrl} 
            alt={product.name} 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <div className="absolute inset-0 bg-navy-light flex flex-col items-center justify-center text-white/50">
            <span className="text-sm font-bold uppercase tracking-wider">{product.category?.name || 'Uncategorized'}</span>
            <span className="mt-2 text-lg text-gold font-bold">{product.name}</span>
          </div>
        )}
        <div className="absolute top-4 left-4 bg-gold text-navy-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide pointer-events-none z-10 shadow-md">
          {product.category?.name || 'Uncategorized'}
        </div>
      </div>
      
      <div className="p-6 md:p-8 flex-grow flex flex-col">
        <h3 className="text-navy font-heading font-bold text-2xl mb-3 text-center text-balance">{product.name}</h3>
        
        <div className="mb-6 flex-grow flex flex-col">
          <p className="text-slate text-justify leading-relaxed">
            {displayDesc}
          </p>
          {shouldTruncate && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gold font-semibold text-sm mt-2 hover:text-navy transition-colors self-start inline-block"
            >
              {isExpanded ? "Sembunyikan" : "Lihat Selengkapnya"}
            </button>
          )}
        </div>
        
        <div className="space-y-2 pt-5 border-t border-gray-200 mb-6">
          {specEntries.map(([key, val]) => (
            <div key={key} className="flex items-start justify-between text-sm gap-4">
              <span className="text-gray-500 font-medium whitespace-nowrap">{key}</span>
              <span className="text-navy font-semibold text-right leading-tight line-clamp-2" title={val}>{val}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-3">
          <Link 
            href={`/product/${product.slug}`}
            className="flex-1 text-center bg-navy text-white px-4 py-2.5 rounded-lg font-medium hover:bg-navy-light transition-colors"
          >
            Cek Detail
          </Link>
          <a 
            href={`https://wa.me/628128641924?text=${encodeURIComponent(`Halo Sun Global Energi, saya ingin konsultasi mengenai produk ${product.name}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-green-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
          >
            Konsultasi WA
          </a>
        </div>
      </div>
    </div>
  );
}
