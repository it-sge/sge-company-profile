"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, MapPin, Zap, Calendar, CheckCircle2 } from "lucide-react";

interface HeroSectionProps {
  project: {
    name: string;
    location: string;
    capacity: string | null;
    completionDate: Date | null;
    imageUrl: string;
    description?: string;
    category?: { name: string } | null;
  };
}

export default function HeroSection({ project }: HeroSectionProps) {
  return (
    <div className="relative w-full min-h-[70vh] flex items-center justify-center pt-32 pb-24 overflow-hidden">
      {/* Background Image with Parallax effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.imageUrl})` }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/70 to-navy-dark/30" />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        


        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex justify-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-black text-white leading-tight mb-8 text-center text-balance mx-auto max-w-5xl">
            {project.name}
          </h1>
        </motion.div>

        {/* Location & Date */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-6 text-white/90"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gold" />
            <span className="text-lg font-medium">{project.location}</span>
          </div>
          {project.completionDate && (
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gold" />
              <span className="text-lg font-medium">
                {new Date(project.completionDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
