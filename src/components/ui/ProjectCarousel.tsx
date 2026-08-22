"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: number;
  slug: string;
  name: string;
  location: string;
  imageUrl: string;
}

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) {
    return <div className="text-center text-white">No projects found.</div>;
  }

  // Duplicate the array to create a seamless infinite loop effect
  const marqueeProjects = [...projects, ...projects, ...projects];

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 md:px-0 overflow-hidden group">
      
      {/* Fade Edges for premium look */}
      <div className="absolute top-0 left-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-navy-dark to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-navy-dark to-transparent z-10 pointer-events-none"></div>

      {/* Marquee Track */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-6 py-8 px-4">
        {marqueeProjects.map((proj, idx) => (
          <div 
            key={`${proj.id}-${idx}`} 
            className="w-[280px] md:w-[350px] shrink-0"
          >
            <Link 
              href={`/project/${proj.slug}`} 
              className="group/card block bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 transform hover:-translate-y-3 h-full flex flex-col"
            >
              <div className="h-64 bg-slate relative overflow-hidden shrink-0">
                {proj.imageUrl ? (
                  <Image 
                    src={proj.imageUrl} 
                    alt={proj.name} 
                    fill 
                    sizes="(max-width: 768px) 280px, 350px"
                    className="object-cover group-hover/card:scale-110 transition-transform duration-700 ease-out" 
                  />
                ) : (
                  <div className="absolute inset-0 bg-navy-light flex items-center justify-center text-white/50">Image: {proj.name}</div>
                )}
                
                {/* Gradient Overlay for luxury feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05192b]/90 via-black/20 to-transparent opacity-80 group-hover/card:opacity-60 transition-opacity" />
                
                {/* View Detail Badge */}
                <div className="absolute top-4 right-4 bg-gold text-navy font-bold text-xs px-4 py-1.5 rounded-full shadow-lg transform translate-x-10 opacity-0 group-hover/card:translate-x-0 group-hover/card:opacity-100 transition-all duration-300">
                  Detail &rarr;
                </div>
              </div>
              <div className="p-6 bg-white text-center border-t-4 border-gold flex-grow flex flex-col justify-center relative">
                <h3 className="text-gold font-heading font-bold text-xl mb-2 line-clamp-1 group-hover/card:text-navy transition-colors">{proj.name}</h3>
                <p className="text-gray-800 text-sm line-clamp-1">{proj.location}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
