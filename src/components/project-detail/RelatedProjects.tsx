"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Zap } from "lucide-react";

interface RelatedProjectsProps {
  projects: any[];
}

export default function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="mb-20">
      <div className="flex flex-col sm:flex-row justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-heading font-bold text-navy mb-4">Related Projects</h2>
          <div className="w-16 h-1 bg-gold rounded-full"></div>
        </div>
        <Link href="/project" className="text-gold font-bold hover:text-gold-dark flex items-center mt-4 sm:mt-0 transition-colors">
          View All Projects <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <Link href={`/project/${project.slug}`} key={idx}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 group h-full flex flex-col"
            >
              <div className="h-48 relative overflow-hidden bg-slate-100">
                {project.imageUrl && (
                  <Image 
                    src={project.imageUrl} 
                    alt={project.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                {project.category && (
                  <div className="absolute top-4 left-4 bg-navy/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {typeof project.category === 'object' ? project.category.name : project.category}
                  </div>
                )}
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h4 className="text-lg font-bold text-navy mb-4 group-hover:text-gold transition-colors line-clamp-2">
                  {project.name}
                </h4>
                
                <div className="mt-auto space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="truncate">{project.location}</span>
                  </div>
                  {project.capacity && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Zap className="w-4 h-4 mr-2 text-gold" />
                      <span className="font-semibold text-navy">{project.capacity}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
