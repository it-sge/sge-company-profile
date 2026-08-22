"use client";

import { useState, useMemo } from "react";
import LightboxImage from "@/components/ui/LightboxImage";
import Link from "next/link";
import { MapPin, ArrowRight, Search, Filter, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: number;
  name: string;
  slug: string;
  description: string;
  location: string;
  capacity: string;
  imageUrl: string;
  completionDate: string | null;
  categoryId: number | null;
}

interface Category {
  id: number;
  name: string;
}

interface ProjectListClientProps {
  projects: Project[];
  categories: Category[];
}

export default function ProjectListClient({ projects, categories }: ProjectListClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | "ALL">("ALL");
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (project.location && project.location.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = activeCategory === "ALL" || project.categoryId === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, activeCategory]);

  return (
    <div className="w-full">
      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-12 flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-gold focus:border-gold sm:text-sm text-navy"
            placeholder="Cari nama atau lokasi proyek..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="md:w-64 relative">
          <button
            type="button"
            className="flex items-center justify-between w-full pl-3 pr-3 py-2 text-base border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold sm:text-sm rounded-lg text-navy bg-white"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            onBlur={() => {
              // Add a slight delay to allow click on options to register
              setTimeout(() => {
                setIsDropdownOpen(false);
              }, 200);
            }}
          >
            <span className="block truncate text-left flex-grow">
              {activeCategory === "ALL" 
                ? "Semua Kategori" 
                : categories.find(c => c.id === activeCategory)?.name || "Semua Kategori"}
            </span>
            <span className="pointer-events-none flex items-center">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              <div
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gold/10 ${activeCategory === "ALL" ? "text-gold bg-gold/5 font-medium" : "text-gray-900"}`}
                onClick={() => {
                  setActiveCategory("ALL");
                  setIsDropdownOpen(false);
                }}
              >
                Semua Kategori
              </div>
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gold/10 ${activeCategory === cat.id ? "text-gold bg-gold/5 font-medium" : "text-gray-900"}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setIsDropdownOpen(false);
                  }}
                >
                  {cat.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-200 transition-all duration-500 hover:-translate-y-1 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-50">
                  {project.imageUrl ? (
                    <LightboxImage 
                      src={project.imageUrl} 
                      alt={project.name} 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
                      imageClassName="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-gray-100">
                      <span className="font-semibold text-sm">No Image</span>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>

                {/* Content Container */}
                <div className="flex flex-col flex-grow p-5 md:p-6">
                  <div className="min-h-[64px] flex items-center justify-center mb-3">
                    <h3 className="text-navy font-heading font-bold text-xl md:text-2xl group-hover:text-gold transition-colors duration-300 text-center text-balance line-clamp-2">
                      {project.name}
                    </h3>
                  </div>
                  
                  <div className="flex-grow mb-6">
                    <p className={`text-slate/80 text-sm leading-relaxed text-justify transition-all duration-300 ${expandedIds.includes(project.id) ? '' : 'line-clamp-4'}`}>
                      {project.description}
                    </p>
                    {project.description && project.description.length > 150 && (
                      <button 
                        onClick={(e) => { 
                          e.preventDefault(); 
                          setExpandedIds(prev => prev.includes(project.id) 
                            ? prev.filter(id => id !== project.id) 
                            : [...prev, project.id]
                          ); 
                        }}
                        className="text-gold hover:text-gold-dark text-xs font-semibold mt-2 focus:outline-none transition-colors"
                      >
                        {expandedIds.includes(project.id) ? "Tutup" : "Baca Selengkapnya"}
                      </button>
                    )}
                  </div>
                  
                  {/* Meta Info */}
                  <div className="flex flex-col gap-2 mb-6 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-gray-500">Lokasi</span> 
                      <span className="font-semibold text-navy-dark text-right">{project.location}</span>
                    </div>

                    {project.capacity && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-gray-500">Kapasitas</span> 
                        <span className="font-semibold text-navy-dark text-right">{project.capacity}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-gray-500">Status</span> 
                      {project.completionDate ? (
                        <span className="font-semibold text-green-600 text-right">Selesai ({new Date(project.completionDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })})</span>
                      ) : (
                        <span className="font-semibold text-gold text-right">Dalam Proses</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Link */}
                  <div className="mt-auto pt-2 flex gap-3">
                    <Link 
                      href={`/project/${project.slug}`}
                      className="flex-1 flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Detail
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-slate">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Zap className="w-10 h-10 text-gray-300" />
          </div>
          <p className="text-2xl font-heading font-semibold text-navy mb-2">Proyek Tidak Ditemukan</p>
          <p className="text-gray-500 max-w-md text-center">Tidak ada proyek yang sesuai dengan kata kunci atau kategori yang Anda pilih.</p>
        </div>
      )}
    </div>
  );
}
