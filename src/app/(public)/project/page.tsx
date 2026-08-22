import prisma from "@/lib/prisma";
import ProjectListClient from "@/components/project-list/ProjectListClient";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portofolio & Proyek PLTS Terbaik di Indonesia",
  description: "Lihat portofolio sukses proyek instalasi panel surya (PLTS) komersial dan industri dari Sun Global Energi di berbagai wilayah di Indonesia.",
  keywords: ["Portofolio PLTS", "Proyek Panel Surya", "Instalasi Tenaga Surya Indonesia", "Sun Global Energi Proyek", "Solar EPC Indonesia"],
};

export const revalidate = 60;

export default async function ProjectPage() {
  let projects: any[] = [];
  let categories: any[] = [];
  try {
    projects = await prisma.project.findMany({
      where: { isPublished: true },
      orderBy: { order: 'asc' },
    });
    categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-navy font-heading font-black text-4xl md:text-6xl mb-6 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-600">Projects</span>
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-gold to-yellow-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Discover our portfolio of successful solar energy implementations across commercial and industrial sectors.
          </p>
        </div>

        <ProjectListClient projects={projects} categories={categories} />
      </div>
    </div>
  );
}
