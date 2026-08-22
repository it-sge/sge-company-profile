"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createProduct, getCategories } from "../../actions";
import { toast } from "react-hot-toast";
import { ArrowLeft, Loader2, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Category } from "@prisma/client";
import Modal from "@/components/ui/Modal";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [specs, setSpecs] = useState<{key: string, value: string}[]>([{key: "", value: ""}]);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  useEffect(() => {
    getCategories("product").then(setCategories);
  }, []);

  const addSpec = () => setSpecs([...specs, {key: "", value: ""}]);
  
  const confirmDeleteInner = () => {
    if (itemToDelete !== null) {
      setSpecs(specs.filter((_, i) => i !== itemToDelete));
      setItemToDelete(null);
    }
  };

  const updateSpec = (index: number, field: 'key'|'value', val: string) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = val;
    setSpecs(newSpecs);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
    // Clean up empty specs before stringifying
    const validSpecs = specs.filter(s => s.key.trim() !== "" && s.value.trim() !== "");
    if (validSpecs.length > 0) {
      const specsObj = validSpecs.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
      }, {} as Record<string, string>);
      formData.set("specs", JSON.stringify(specsObj));
    } else {
      formData.set("specs", "");
    }
    
    const result = await createProduct(formData);
    
    if (result.success) {
      toast.success("Produk berhasil ditambahkan");
      if (result.id) {
        router.push(`/admin/products/edit/${result.id}`);
      } else {
        router.push("/admin/products");
      }
    } else {
      toast.error(result.message || "Gagal menambahkan produk");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex items-center space-x-4">
        <Link href="/admin/products" className="text-white/30 hover:text-gold transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">Tambah Produk Baru</h2>
      </div>

      <div className="bg-navy-light rounded-xl p-6 sm:p-8 border border-white/[0.06]">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="space-y-5">
            <h3 className="text-gold font-semibold border-b border-white/[0.06] pb-2">Informasi Dasar</h3>
            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Nama Produk *</label>
              <input 
                name="name" 
                required
                className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white placeholder-white/20 text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Kategori *</label>
              <select 
                name="categoryId" 
                required
                className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
              >
                <option value="">Pilih Kategori</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Deskripsi Singkat *</label>
              <textarea 
                name="description" 
                required
                rows={4}
                className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white placeholder-white/20 text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all resize-none"
              />
            </div>
          </div>
          
          <div className="space-y-5 pt-4">
            <h3 className="text-gold font-semibold border-b border-white/[0.06] pb-2">Spesifikasi Teknis</h3>
            <div className="space-y-3">
              {specs.map((spec, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-1/3">
                    <input 
                      placeholder="Label (Contoh: Daya)"
                      value={spec.key}
                      onChange={(e) => updateSpec(index, 'key', e.target.value)}
                      className="w-full px-4 py-2 bg-navy border border-white/[0.08] rounded-lg text-white placeholder-white/20 text-sm focus:outline-none focus:border-gold/40"
                    />
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    <input 
                      placeholder="Nilai (Contoh: 550W)"
                      value={spec.value}
                      onChange={(e) => updateSpec(index, 'value', e.target.value)}
                      className="w-full px-4 py-2 bg-navy border border-white/[0.08] rounded-lg text-white placeholder-white/20 text-sm focus:outline-none focus:border-gold/40"
                    />
                    <button 
                      type="button" 
                      onClick={() => setItemToDelete(index)}
                      className="p-2 text-white/30 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button 
              type="button" 
              onClick={addSpec}
              className="text-xs font-medium text-gold hover:text-gold-light bg-gold/10 hover:bg-gold/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah Baris Spesifikasi
            </button>
          </div>
          
          <div className="space-y-5 pt-4">
            <h3 className="text-gold font-semibold border-b border-white/[0.06] pb-2">Media Gambar</h3>
            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Gambar Utama *</label>
              <input 
                name="imageFile" 
                type="file"
                required
                accept="image/*"
                className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white/50 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-gold/10 file:text-gold file:font-medium hover:file:bg-gold/20"
              />
              <p className="text-white/30 text-[11px] mt-1.5">Gambar ini akan menjadi wajah utama produk di halaman produk.</p>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Galeri Tambahan (Multiple)</label>
              <input 
                name="galleryFiles" 
                type="file"
                accept="image/*"
                multiple
                className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white/50 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-gold/10 file:text-gold file:font-medium hover:file:bg-gold/20"
              />
              <p className="text-white/30 text-[11px] mt-1.5">Anda bisa memblok beberapa gambar sekaligus untuk galeri.</p>
            </div>
            
            <div className="pt-4 border-t border-white/[0.06]">
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Datasheet / Brosur (Opsional)</label>
              <input 
                name="datasheetFile" 
                type="file"
                accept="application/pdf,image/*"
                className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white/50 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-gold/10 file:text-gold file:font-medium hover:file:bg-gold/20"
              />
              <p className="text-white/30 text-[11px] mt-1.5">Upload file PDF atau gambar (brosur) untuk produk ini.</p>
            </div>
          </div>
          
          <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                name="isPublished"
                id="isPublished"
                defaultChecked
                className="w-4 h-4 rounded border-white/20 bg-navy text-gold focus:ring-gold/30"
              />
              <label htmlFor="isPublished" className="text-sm font-medium text-white/60">
                Langsung publikasikan
              </label>
            </div>
            
            <div className="flex space-x-3">
              <Link 
                href="/admin/products"
                className="px-5 py-2.5 border border-white/[0.08] text-white/50 rounded-lg hover:bg-white/[0.04] transition-colors text-sm font-medium"
              >
                Batal
              </Link>
              <button 
                type="submit" 
                disabled={loading}
                className="flex items-center space-x-2 bg-gold hover:bg-gold-light text-navy-dark font-bold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50 text-sm"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Simpan Produk</span>
              </button>
            </div>
          </div>
        </form>

      <Modal isOpen={itemToDelete !== null} onClose={() => setItemToDelete(null)} title="Konfirmasi Hapus">
        <p className="text-white/50 mb-6">Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan setelah form disimpan.</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setItemToDelete(null)}
            className="px-4 py-2 border border-white/[0.08] text-white/50 rounded-lg hover:bg-white/[0.04] transition-colors"
          >
            Batal
          </button>
          <button
            onClick={confirmDeleteInner}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            <span>Ya, Hapus</span>
          </button>
        </div>
      </Modal>
      </div>
    </div>
  );
}
