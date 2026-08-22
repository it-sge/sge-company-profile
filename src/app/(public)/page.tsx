import Image from "next/image";
import Link from "next/link";
import WaveDivider from "@/components/ui/WaveDivider";
import CurvyDivider from "@/components/ui/CurvyDivider";
import dynamic from "next/dynamic";

const ProjectCarousel = dynamic(() => import("@/components/ui/ProjectCarousel"), {
  ssr: true,
});
import { ShieldCheck, Wrench, BadgeDollarSign, Headset, PackageCheck, HardHat, HandCoins, Tags } from "lucide-react";
import prisma from "@/lib/prisma";
import { getSiteSettings } from "@/lib/cached-queries";

// Use unstable_cache or just standard fetch if we want to cache, 
// but Prisma with App Router can be cached via React cache or route segment config.
export const revalidate = 60; // ISR revalidate every 60s as a fallback

export default async function Home() {
  // In a real scenario, we fetch these from prisma
  // Since we might not have the DB running yet during build, we can handle errors gracefully
  
  let settingsMap: Record<string, string> = {};
  let values: any[] = [];
  let advantages: any[] = [];
  let projects: any[] = [];

  try {
    settingsMap = await getSiteSettings();
    
    values = await prisma.value.findMany({ orderBy: { order: 'asc' } });
    advantages = await prisma.advantage.findMany({ orderBy: { order: 'asc' } });
    
    const featuredIdsStr = settingsMap['home_featured_projects'];
    if (featuredIdsStr && featuredIdsStr.trim() !== '') {
      const ids = featuredIdsStr.split(',').map(id => parseInt(id, 10)).filter(id => !isNaN(id));
      if (ids.length > 0) {
        projects = await prisma.project.findMany({
          where: { id: { in: ids }, isPublished: true },
        });
        // Sort based on the selected order
        projects.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
      }
    } else {
      projects = await prisma.project.findMany({ 
        where: { isPublished: true }, 
        orderBy: { order: 'asc' },
        take: 3
      });
    }
  } catch (error) {
    console.error("Database not connected yet, using fallbacks.");
  }

  const heroTitle = settingsMap['hero_title'] || 'End-to-End Solar Energy Solution';
  const heroSubtitle = settingsMap['hero_subtitle'] || 'EPC – Operation & Maintenance - Financing';
  const heroParagraph = settingsMap['hero_paragraph'] || 'Sun Global Energi delivers integrated solar energy solutions for commercial and industrial clients. From initial feasibility studies and system design to engineering, procurement, construction, commissioning, and long-term operations, we manage every stage of your solar project. Our tailored solutions are designed to reduce energy costs, improve operational reliability, and support your sustainability goals. Backed by experienced professionals, proven technologies, and a commitment to quality, we provide dependable solar solutions that deliver long-term value.';
  const heroTagline = settingsMap['hero_tagline'] || 'Powering a Sustainable Future, Together.';
  const heroImage = settingsMap['hero_image'] || '/project/beautiful-alternative-energy-plant-with-solar-panels.webp';
  const missionText = settingsMap['mission_text'] || 'At Sun Global Energi, our mission is to...';
  const solarSystemTitle = settingsMap['solar_system_title'] || 'Solar System \n (Solar Cell)';
  const solarSystemImage = settingsMap['solar_system_image'] || '/project/SWRO ITDC Bali.webp';

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="flex flex-col md:grid md:grid-cols-[40%_60%] min-h-screen w-full relative -mt-20 md:-mt-24 z-0">
        
        {/* LEFT COLUMN: Image */}
        <div className="w-full h-[55vh] md:h-full relative overflow-hidden flex-shrink-0">
          <Image 
            src={heroImage} 
            alt="Solar Panels" 
            fill 
            sizes="(max-width: 768px) 100vw, 40vw"
            quality={80}
            className="object-cover object-center" 
            priority
          />
          {/* Logo overlaying the image */}
          <div className="absolute top-[40%] md:top-32 left-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-y-0 p-4 w-[60%] sm:w-[45%] md:w-[60%] lg:w-[50%] max-w-[280px] md:max-w-[320px] lg:max-w-[400px] z-[10] pointer-events-none drop-shadow-2xl flex justify-center items-center">
             <Image 
                src="/logo/logo.png" 
                alt="Sun Global Energi" 
                width={500} 
                height={200} 
                className="w-full h-auto object-contain drop-shadow-xl"
                priority
              />
          </div>
        </div>

        {/* RIGHT COLUMN: Navy Panel with Text Content */}
        <div className="w-full h-full bg-navy flex flex-col justify-center items-center px-6 py-24 md:pt-32 lg:pt-40 md:px-12 lg:px-20 relative text-center">
          
          <h1 className="text-gold font-bold text-3xl md:text-4xl lg:text-5xl mb-2 leading-tight">
            {heroTitle}
          </h1>
          
          <h2 className="text-sky font-medium text-lg md:text-xl mb-6">
            {heroSubtitle}
          </h2>
          
          <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6 max-w-md mx-auto">
            {heroParagraph}
          </p>
          
          <div className="mt-4">
            <span className="font-semibold text-white text-base md:text-lg">
              {heroTagline}
            </span>
          </div>

          <div className="absolute bottom-4 right-6 hidden md:block">
            <span className="text-gold text-xs tracking-widest uppercase">
              INNOVATE A BETTER AVENIR
            </span>
          </div>
          
        </div>
      </section>

      {/* 2. OUR MISSION */}
      <section className="py-24 bg-offwhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-gold font-heading font-bold italic text-4xl md:text-5xl mb-8">Our Mission</h2>
          <p className="text-slate text-lg md:text-xl leading-relaxed">
            {missionText}
          </p>
        </div>
      </section>

      {/* 3. OUR VALUE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-gold font-heading font-bold italic text-4xl md:text-5xl">Our Value</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.length > 0 ? values.map((val) => (
              <div key={val.id} className="bg-offwhite p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-navy font-heading font-bold text-2xl mb-6 text-center">{val.title}</h3>
                <ul className="space-y-4 text-slate">
                  <li className="flex items-start">
                    <span className="text-gold font-bold mr-3">A.</span>
                    <span>{val.pointA}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold font-bold mr-3">B.</span>
                    <span>{val.pointB}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold font-bold mr-3">C.</span>
                    <span>{val.pointC}</span>
                  </li>
                </ul>
              </div>
            )) : (
              <div className="col-span-3 text-center text-slate">No values found. Please run seed.</div>
            )}
          </div>
        </div>
      </section>

      {/* 4. SOLAR SYSTEM & OUR ADVANTAGE TITLE (Navy Section) */}
      <CurvyDivider direction="down" topColor="bg-white" bottomColor="text-navy" />
      <section className="bg-navy relative pt-12 pb-24">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="w-full md:w-1/2 flex justify-center md:justify-start">
              <div className="w-72 h-72 md:w-[450px] md:h-[450px] rounded-full overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border-[8px] border-white/5 relative">
                <Image src={solarSystemImage} alt="Solar Cell" fill sizes="(max-width: 768px) 288px, 450px" className="object-cover" />
                <div className="absolute inset-0 bg-slate -z-10"></div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0">
              <h2 className="text-gold font-bold text-4xl md:text-5xl lg:text-6xl mb-6 whitespace-pre-line">
                {solarSystemTitle}
              </h2>
            </div>
          </div>

          <div className="mt-16 md:mt-24">
            <h2 className="text-gold font-bold text-5xl md:text-6xl text-center md:text-left md:ml-12">
              Our Advantage
            </h2>
          </div>
        </div>
      </section>

      {/* 5. OUR ADVANTAGE CARDS (White Section) */}
      <CurvyDivider direction="down" topColor="bg-navy" bottomColor="text-white" />
      <section className="pt-12 pb-24 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {advantages.length > 0 ? advantages.map((adv) => {
              let Icon = ShieldCheck;
              if (adv.icon === 'Wrench') Icon = Wrench;
              if (adv.icon === 'BadgeDollarSign') Icon = BadgeDollarSign;
              if (adv.icon === 'Headset') Icon = Headset;
              if (adv.icon === 'PackageCheck') Icon = PackageCheck;
              if (adv.icon === 'HardHat') Icon = HardHat;
              if (adv.icon === 'HandCoins') Icon = HandCoins;
              if (adv.icon === 'Tags') Icon = Tags;

              return (
                <div key={adv.id} className="w-56 h-56 md:w-64 md:h-64 rounded-full border-[3px] border-navy flex flex-col items-center justify-center p-6 bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-gold mb-3">
                    <Icon className="w-12 h-12 md:w-14 md:h-14" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-gold font-heading font-bold text-lg md:text-xl leading-tight mb-3 text-center">{adv.title}</h3>
                  <p className="text-navy font-bold text-xs md:text-sm text-center px-2">{adv.description}</p>
                </div>
              );
            }) : (
              <div className="col-span-4 text-center text-gray-400">No advantages found.</div>
            )}
          </div>
        </div>
      </section>

      {/* 6. OUR PROJECT (Navy Section) */}
      <CurvyDivider direction="down" topColor="bg-white" bottomColor="text-navy" />
      <section className="bg-navy relative pt-12 pb-32">

        <div className="max-w-screen-2xl mx-auto relative z-20">
          <div className="mb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-gold font-heading font-bold text-5xl md:text-6xl text-center md:text-left md:ml-12">Our Project</h2>
          </div>
          
          <div className="mb-12 w-full">
            <ProjectCarousel projects={projects} />
          </div>
          
          <div className="text-center">
            <Link href="/project" className="inline-block bg-white hover:bg-offwhite text-navy font-bold px-8 py-3 rounded-full transition-colors shadow-lg">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Transition to Footer's White Contact Section */}
      <CurvyDivider direction="down" topColor="bg-navy" bottomColor="text-white" />
    </div>
  );
}
