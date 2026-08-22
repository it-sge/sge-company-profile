import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import Image from "next/image";
import DeleteProductButton from "./DeleteProductButton";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { order: 'asc' },
    include: { category: true }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">Kelola Produk</h2>
        <Link 
          href="/admin/products/new" 
          className="bg-gold hover:bg-gold-light text-navy-dark font-bold py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Produk</span>
        </Link>
      </div>
      
      <div className="bg-navy-light rounded-xl overflow-hidden border border-white/[0.06]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/[0.06]">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th scope="col" className="px-5 py-3 text-left text-[11px] font-semibold text-white/30 uppercase tracking-wider">Gambar</th>
                <th scope="col" className="px-5 py-3 text-left text-[11px] font-semibold text-white/30 uppercase tracking-wider">Nama</th>
                <th scope="col" className="px-5 py-3 text-left text-[11px] font-semibold text-white/30 uppercase tracking-wider">Kategori</th>
                <th scope="col" className="px-5 py-3 text-left text-[11px] font-semibold text-white/30 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-5 py-3 text-right text-[11px] font-semibold text-white/30 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="h-10 w-10 rounded-lg overflow-hidden bg-white/[0.06] relative border border-white/[0.06] shrink-0">
                        {product.imageUrl ? (
                          <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                        ) : (
                          <div className="flex items-center justify-center h-full text-xs text-white/20">—</div>
                        )}
                      </div>
                      
                      {/* Show gallery indicator if it exists */}
                      {product.gallery && JSON.parse(product.gallery).length > 0 && (
                        <div className="flex -space-x-2 overflow-hidden">
                          {JSON.parse(product.gallery).slice(0, 3).map((imgUrl: string, idx: number) => (
                            <div key={idx} className="inline-block h-6 w-6 rounded-md ring-2 ring-navy-light overflow-hidden relative">
                              <img src={imgUrl} alt="Gallery thumb" className="w-full h-full object-cover" />
                            </div>
                          ))}
                          {JSON.parse(product.gallery).length > 3 && (
                            <div className="inline-flex items-center justify-center h-6 w-6 rounded-md ring-2 ring-navy-light bg-navy text-[9px] font-bold text-gold shrink-0 relative z-10">
                              +{JSON.parse(product.gallery).length - 3}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="text-sm font-medium text-white/80">{product.name}</div>
                    <div className="text-xs text-white/25 truncate max-w-xs">{product.description}</div>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="px-2.5 py-1 inline-flex text-[11px] font-medium rounded-full bg-sky/10 text-sky border border-sky/20">
                      {product.category?.name || '-'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${
                      product.isPublished 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-white/[0.04] text-white/30 border border-white/[0.06]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${product.isPublished ? 'bg-emerald-400' : 'bg-white/20'}`} />
                      {product.isPublished ? 'Dipublikasikan' : 'Draf'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end space-x-3">
                      <Link href={`/admin/products/edit/${product.id}`} className="text-white/30 hover:text-gold transition-colors">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <DeleteProductButton id={product.id} />
                    </div>
                  </td>
                </tr>
              ))}
              
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-sm text-white/20">
                    Belum ada produk. Tambahkan produk pertama Anda!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
