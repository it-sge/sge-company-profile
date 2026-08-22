import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductEditForm from "./ProductEditForm";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) return notFound();

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return notFound();

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center space-x-4">
        <Link href="/admin/products" className="text-white/30 hover:text-gold transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">Edit Produk</h2>
      </div>

      <ProductEditForm product={product} />
    </div>
  );
}
