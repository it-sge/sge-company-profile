import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Zap, ShieldCheck, Weight, Activity, ArrowRight, Gauge, BarChart3 } from "lucide-react";
import ProductGallery from "@/components/ui/ProductGallery";

import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true }
  });

  if (!product) return {};

  return {
    title: `${product.name} | Spesifikasi & Data Teknis Panel Surya`,
    description: (product.description || "").substring(0, 160),
    keywords: [
      product.name, 
      product.category?.name || "Panel Surya", 
      "Spesifikasi Panel Surya", 
      "Harga Panel Surya", 
      "Distributor Solar Panel",
      "Sun Global Energi"
    ],
    openGraph: {
      title: `${product.name} | Sun Global Energi`,
      description: (product.description || "").substring(0, 160),
      images: [{ url: product.imageUrl, alt: product.name }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: (product.description || "").substring(0, 160),
      images: [product.imageUrl],
    }
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true }
  });

  if (!product || !product.isPublished) {
    notFound();
  }

  let specsObj: Record<string, string> = {};
  try {
    if (product.specs) specsObj = JSON.parse(product.specs as string);
  } catch (e) {}

  let galleryImages: string[] = [];
  try {
    if (product.gallery) galleryImages = JSON.parse(product.gallery);
  } catch(e) {}

  const waText = encodeURIComponent(`Halo Sun Global Energi, saya ingin konsultasi mengenai produk ${product.name}.`);

  // Detect key specs for the "Hero Cards"
  const heroSpecs = [];
  const remainingSpecs = { ...specsObj };

  for (const [key, val] of Object.entries(specsObj)) {
    const k = key.toLowerCase();
    if (heroSpecs.length >= 3) break; // max 3 hero specs

    if (k.includes("daya") || k.includes("power") || k.includes("watt") || k.includes("output")) {
      heroSpecs.push({ label: key, value: val, icon: <Zap className="w-5 h-5 text-gold" /> });
      delete remainingSpecs[key];
    } else if (k.includes("eropa") || k.includes("europe") || k.includes("euro")) {
      heroSpecs.push({ label: key, value: val, icon: <BarChart3 className="w-5 h-5 text-gold" /> });
      delete remainingSpecs[key];
    } else if (k.includes("efisiensi") || k.includes("efficiency")) {
      heroSpecs.push({ label: key, value: val, icon: <Gauge className="w-5 h-5 text-gold" /> });
      delete remainingSpecs[key];
    } else if (k.includes("garansi") || k.includes("warranty")) {
      heroSpecs.push({ label: key, value: val, icon: <ShieldCheck className="w-5 h-5 text-gold" /> });
      delete remainingSpecs[key];
    } else if (k.includes("berat") || k.includes("weight")) {
      heroSpecs.push({ label: key, value: val, icon: <Weight className="w-5 h-5 text-gold" /> });
      delete remainingSpecs[key];
    }
  }

  return (
    <div className="bg-white min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <Link href="/product" className="inline-flex items-center text-navy/60 hover:text-gold font-medium mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Kembali ke Daftar Produk
        </Link>

        {/* Main Content Split */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 relative">
          
          {/* Left Column: Wrapper (Stretches to full height) */}
          <div className="w-full lg:w-1/2 relative">
            {/* Sticky Element */}
            <div className="lg:sticky lg:top-32 z-10 w-full">
              <ProductGallery 
                mainImage={product.imageUrl} 
                galleryImages={galleryImages} 
                productName={product.name} 
              />
            </div>
          </div>

          {/* Right Column: Details & Specs */}
          <div className="lg:w-1/2 flex flex-col">
            
            {/* Header section */}
            <div className="mb-8">
              <span className="inline-block bg-gold/10 text-gold-dark font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-4">
                {product.category?.name || 'Uncategorized'}
              </span>
              <h1 className="text-navy font-heading font-black text-4xl lg:text-5xl mb-6 leading-tight">
                {product.name}
              </h1>
              
              <div className="prose prose-lg prose-slate max-w-none">
                <p className="text-gray-600 leading-relaxed font-light text-justify">{product.description}</p>
              </div>
            </div>

            {/* Hero Spec Cards */}
            {heroSpecs.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-10">
                {heroSpecs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-gold/10">
                      {spec.icon}
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">{spec.label}</p>
                      <p className="text-navy font-bold text-lg leading-tight">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Remaining Technical Specs Table */}
            {Object.keys(remainingSpecs).length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-bold text-navy mb-6 flex items-center">
                  <span className="bg-navy w-8 h-1 mr-4"></span>
                  Mechanical Data
                </h3>
                <div className="bg-white rounded-2xl border border-gray-200 p-1 shadow-sm overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <tbody className="divide-y divide-gray-200">
                      {Object.entries(remainingSpecs).map(([key, val], idx) => {
                        const isPdfLink = typeof val === 'string' && (val.endsWith('.pdf') || key.toLowerCase() === 'datasheet');
                        return (
                        <tr key={key} className="hover:bg-gray-50 transition-colors">
                          <th className="py-4 px-4 sm:px-6 font-medium text-gray-600 w-2/5 border-r border-gray-200 bg-gray-50/50">{key}</th>
                          <td className="py-4 px-4 sm:px-6 font-semibold text-navy">
                            {isPdfLink ? (
                              <a href={val} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gold hover:text-gold-dark transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                Download Datasheet (PDF)
                              </a>
                            ) : val}
                          </td>
                        </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Dedicated Datasheet Download Button */}
            {product.datasheetUrl && (
              <div className="mb-12">
                <a 
                  href={product.datasheetUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-gray-50 border border-gray-200 hover:border-gold/50 p-4 rounded-xl group transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gold/10 text-gold rounded-lg flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy text-sm">Download Datasheet / Brosur</h4>
                      <p className="text-gray-500 text-xs mt-0.5">Lihat spesifikasi lengkap produk ini (PDF/Gambar)</p>
                    </div>
                  </div>
                  <div className="text-gray-400 group-hover:text-gold transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </a>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-auto bg-navy text-white rounded-3xl p-8 relative overflow-hidden shadow-2xl">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              
              <div className="relative z-10">
                <div className="flex items-center text-gold mb-4 font-semibold text-sm uppercase tracking-wider">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Tersedia untuk Proyek EPC
                </div>
                <h4 className="text-2xl font-bold font-heading mb-6">Tertarik dengan produk ini?</h4>
                <p className="text-gray-300 mb-8 text-sm leading-relaxed">
                  Dapatkan penawaran harga terbaik dan konsultasi teknis gratis dengan tim engineer kami.
                </p>
                <a 
                  href={`https://wa.me/628128641924?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full flex items-center justify-between bg-gold text-navy px-8 py-4 rounded-xl font-bold text-lg hover:bg-white transition-all duration-300"
                >
                  <span>Minta Penawaran</span>
                  <div className="w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
