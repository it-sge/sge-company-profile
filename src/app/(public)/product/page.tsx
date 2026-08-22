import prisma from "@/lib/prisma";
import LightboxImage from "@/components/ui/LightboxImage";
import Link from "next/link";
import ProductFilter from "./ProductFilter";
import { Prisma } from "@prisma/client";
import { Suspense } from "react";
import ProductCard from "./ProductCard";
import CertificateSlider from "@/components/ui/CertificateSlider";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Katalog Produk Panel Surya & Komponen PLTS",
  description: "Jelajahi berbagai produk panel surya kualitas terbaik, inverter, dan komponen PLTS dari Sun Global Energi. Temukan solusi energi surya dengan teknologi terkini.",
  keywords: ["Katalog Panel Surya", "Daftar Harga Panel Surya", "Inverter PLTS", "Komponen Tenaga Surya", "ZNSHINE Solar", "Sun Global Energi Produk"],
};

export const revalidate = 60;

export default async function ProductPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string };
}) {
  const q = searchParams.q || "";
  const category = searchParams.category || "";

  let products: any[] = [];
  let categories: any[] = [];
  let certificates: any[] = [];

  try {
    // Build the query
    const whereClause: Prisma.ProductWhereInput = { isPublished: true };
    
    if (q) {
      whereClause.OR = [
        { name: { contains: q } },
        { description: { contains: q } }
      ];
    }
    
    if (category) {
      whereClause.categoryId = parseInt(category);
    }

    [products, categories, certificates] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        orderBy: { order: 'asc' },
        include: { category: true }
      }),
      prisma.category.findMany({
        orderBy: { name: 'asc' }
      }),
      prisma.certificate.findMany({
        orderBy: { order: 'asc' }
      })
    ]);
  } catch (error) {
    console.error(error);
  }

  return (
    <main>
      <div className="bg-white min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-gold font-heading font-bold italic text-4xl md:text-5xl mb-4">Our Products</h1>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
          <p className="text-slate text-lg mt-6 max-w-2xl mx-auto">
            Explore our comprehensive range of high-efficiency solar panels and complete systems designed for maximum energy output and reliability.
          </p>
        </div>
        <Suspense fallback={<div className="h-16 w-full animate-pulse bg-gray-100 rounded-xl mb-8"></div>}>
          <ProductFilter categories={categories} />
        </Suspense>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length > 0 ? products.map((product) => (
            <ProductCard key={product.id} product={product} />
          )) : (
            <div className="col-span-full text-center py-20 text-slate">
              <p className="text-xl">No products are currently available.</p>
              <p className="mt-2">Please check back later or contact us for more information.</p>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Certificate Section - Dark Background for Contrast */}
    {certificates.length > 0 && (
      <div className="bg-navy py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-white font-heading font-bold text-3xl md:text-4xl mb-4">Sertifikasi & Standar Mutu</h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full"></div>
            <p className="text-white/70 mt-6 max-w-2xl mx-auto">
              Seluruh produk panel surya kami telah lulus uji ketat dan mengantongi sertifikasi Standar Nasional Indonesia (SNI), menjamin performa, kualitas, dan keamanan terbaik untuk proyek investasi jangka panjang Anda.
            </p>
          </div>
          
          <CertificateSlider certificates={certificates} />
        </div>
      </div>
    )}
    </main>
  );
}
