"use client";

import { motion } from "framer-motion";
import { Quote, MapPin } from "lucide-react";
import Image from "next/image";

interface TestimonialMapProps {
  testimonial: {
    quote: string;
    name: string;
    title: string;
    company: string;
    avatar: string;
  };
  map: {
    address: string;
    coords: string;
    city: string;
    province: string;
  };
}

export default function TestimonialMap({ testimonial, map }: TestimonialMapProps) {
  const hasTestimonial = testimonial && testimonial.quote && testimonial.quote.trim() !== '';
  const hasMap = map && ((map.address && map.address.trim() !== '') || (map.city && map.city.trim() !== ''));

  // Hide entire section if both are empty
  if (!hasTestimonial && !hasMap) return null;

  return (
    <div className="mb-20">
      <div className={`grid grid-cols-1 ${hasTestimonial && hasMap ? 'lg:grid-cols-2' : ''} gap-8`}>
        {/* Testimonial */}
        {hasTestimonial && (
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
          <Quote className="w-16 h-16 text-gold/20 absolute top-8 left-8" />
          
          <div className="relative z-10 pt-8">
            <h3 className="text-2xl font-bold text-navy mb-8">Client Feedback</h3>
            
            <p className="text-xl text-gray-700 italic leading-relaxed mb-8">
              &quot;{testimonial.quote}&quot;
            </p>
            
            {(testimonial.name || testimonial.title) && (
            <div className="flex items-center">
              {testimonial.avatar && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-gold/30">
                {testimonial.avatar && (testimonial.avatar.startsWith('/') || testimonial.avatar.startsWith('http')) && (
                  <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
                )}
              </div>
              )}
              <div>
                {testimonial.name && <h4 className="font-bold text-navy text-lg">{testimonial.name}</h4>}
                {testimonial.title && <p className="text-gray-500 text-sm">{testimonial.title}{testimonial.company ? <>, <span className="font-semibold">{testimonial.company}</span></> : ''}</p>}
              </div>
            </div>
            )}
          </div>
        </div>
        )}

        {/* Map */}
        {hasMap && (
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
          <h3 className="text-2xl font-bold text-navy mb-6">Location Overview</h3>
          
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h4 className="font-bold text-navy mb-1">{[map.city, map.province].filter(Boolean).join(', ')}</h4>
              {map.address && <p className="text-gray-600 text-sm">{map.address}</p>}
              {map.coords && <p className="text-gray-400 text-xs mt-1">Coordinates: {map.coords}</p>}
            </div>
          </div>
          
          <div className="w-full flex-grow min-h-[300px] bg-slate-100 rounded-2xl overflow-hidden relative">
            <iframe 
              src={`https://maps.google.com/maps?q=${encodeURIComponent(map.address || map.city || "Jakarta")}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
