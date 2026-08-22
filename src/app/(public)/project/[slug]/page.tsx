import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProjectContentData, defaultProjectContentData } from "@/types/project";

// Components
import HeroSection from "@/components/project-detail/HeroSection";
import QuickStats from "@/components/project-detail/QuickStats";
import OverviewSection from "@/components/project-detail/OverviewSection";
import ProjectInfo from "@/components/project-detail/ProjectInfo";
import EquipmentUsed from "@/components/project-detail/EquipmentUsed";
import TechnicalSpecs from "@/components/project-detail/TechnicalSpecs";
import ProjectGallery from "@/components/project-detail/ProjectGallery";
import BeforeAfterSection from "@/components/project-detail/BeforeAfterSection";
import TimelineSection from "@/components/project-detail/TimelineSection";
import PerformanceMetrics from "@/components/project-detail/PerformanceMetrics";
import TestimonialMap from "@/components/project-detail/TestimonialMap";
import RelatedProjects from "@/components/project-detail/RelatedProjects";
import CTASection from "@/components/project-detail/CTASection";
import PrintButton from "@/components/project-detail/PrintButton";

import { Download, MessageCircle, FileText } from "lucide-react";

import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
  });

  if (!project) return {};

  return {
    title: `Portofolio Proyek PLTS: ${project.name}`,
    description: (project.description || "").substring(0, 160),
    keywords: [
      project.name, 
      project.location || "Indonesia", 
      "Portofolio PLTS", 
      "Proyek Panel Surya", 
      "Instalasi Solar Panel", 
      "Sun Global Energi Proyek",
      "EPC Solar Panel"
    ],
    openGraph: {
      title: `Proyek PLTS: ${project.name} | Sun Global Energi`,
      description: (project.description || "").substring(0, 160),
      images: [{ url: project.imageUrl, alt: project.name }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `Proyek PLTS: ${project.name}`,
      description: (project.description || "").substring(0, 160),
      images: [project.imageUrl],
    }
  };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug }
  });

  if (!project || !project.isPublished) {
    notFound();
  }

  // Fetch related projects (same category or recent ones)
  const relatedProjects = await prisma.project.findMany({
    where: { 
      isPublished: true,
      NOT: { id: project.id }
    },
    take: 3,
    orderBy: { createdAt: 'desc' }
  });

  // Parse rich data from DB
  let contentData: ProjectContentData = defaultProjectContentData;
  if (project.contentData) {
    try {
      contentData = { ...defaultProjectContentData, ...JSON.parse(project.contentData) };
    } catch (e) {
      console.error("Failed to parse project contentData");
    }
  }
  
  const waText = encodeURIComponent(`Halo Sun Global Energi, saya ingin berdiskusi mengenai portofolio proyek ${project.name}.`);

  return (
    <div id="project-brochure" className="bg-white min-h-screen pb-10">
      <HeroSection project={project as any} />
      
      <QuickStats stats={contentData.quickStats} capacity={project.capacity} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 print:flex print:flex-col print:gap-8">
          
          {/* Main Content Area */}
          <div className="xl:col-span-8 2xl:col-span-9 space-y-4 print:w-full">
            
            <OverviewSection overview={contentData.overview} />
            
            <ProjectInfo info={contentData.projectInfo} />
            
            <EquipmentUsed equipment={contentData.equipment} />
            
            <TechnicalSpecs specs={contentData.technicalSpecs} />
            
            <ProjectGallery images={contentData.gallery || []} />
            
            <BeforeAfterSection beforeAfter={contentData.beforeAfter} />
            
            <TimelineSection timeline={contentData.timeline} />
            
            <PerformanceMetrics performance={contentData.performance} />
            
            <TestimonialMap testimonial={contentData.testimonial} map={contentData.map} />
            
          </div>

          {/* Sticky Sidebar (3 cols on xl) */}
          <div className="xl:col-span-4 2xl:col-span-3 print:hidden">
            <div className="sticky top-32 space-y-6">
              
              {/* Summary Card */}
              <div className="bg-slate-50 border border-gray-100 rounded-3xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-navy mb-6 pb-4 border-b border-gray-200">Project Summary</h3>
                
                <div className="space-y-4 mb-8">
                  {project.capacity && (
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Capacity</p>
                    <p className="font-semibold text-navy">{project.capacity}</p>
                  </div>
                  )}
                  {contentData.quickStats.system && (
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">System</p>
                    <p className="font-semibold text-navy">{contentData.quickStats.system}</p>
                  </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Location</p>
                    <p className="font-semibold text-navy">{project.location}</p>
                  </div>
                  {project.completionDate && (
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Completion</p>
                    <p className="font-semibold text-navy">
                      {new Date(project.completionDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  )}
                </div>

                <div className="space-y-3">
                  <a 
                    href={`https://wa.me/628128641924?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg print:hidden"
                  >
                    <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp
                  </a>
                  {project.brochureUrl && <PrintButton brochureUrl={project.brochureUrl} />}
                </div>
              </div>

              {/* Promo Card */}
              <div className="bg-navy rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <h3 className="text-xl font-heading font-bold text-gold mb-3 relative z-10">
                  Ready for a similar installation?
                </h3>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed relative z-10">
                  Our engineering team is ready to audit your facility and design the optimal solar solution.
                </p>
                <a 
                  href={`https://wa.me/628128641924?text=${encodeURIComponent("Saya ingin audit fasilitas untuk pemasangan solar panel.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-gold text-gold hover:bg-gold hover:text-navy-dark px-5 py-2.5 rounded-lg text-sm font-bold transition-colors relative z-10"
                >
                  Request Audit
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Sections */}
        <div className="mt-12 print:hidden">
          <RelatedProjects projects={relatedProjects as any} />
          <CTASection />
        </div>
      </div>
    </div>
  );
}
