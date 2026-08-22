import prisma from "@/lib/prisma";
import CategoryClient from "./CategoryClient";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { products: true, projects: true }
      }
    }
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">Kelola Kategori</h2>
          <p className="text-white/40 text-sm mt-1">Kelola daftar kategori untuk produk Anda.</p>
        </div>
      </div>

      <CategoryClient initialCategories={categories} />
    </div>
  );
}
