"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateProduct, getCategories } from "../../../actions";
import { toast } from "react-hot-toast";
import { Loader2, Plus, Trash2, X, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@prisma/client";
import Modal from "@/components/ui/Modal";

export default function ProductEditForm({ product }: { product: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [itemToDelete, setItemToDelete] = useState<{ type: string, index?: number } | null>(null);

  useEffect(() => {
    getCategories("product").then(setCategories);
  }, []);
  
  // Specs State
  const initialSpecs = (() => {
    try {
      if (product.specs) {
        const obj = JSON.parse(product.specs);
        const arr = Object.entries(obj).map(([key, value]) => ({ key, value: String(value) }));
        return arr.length > 0 ? arr : [{key: "", value: ""}];
      }
    } catch(e) {}
    return [{key: "", value: ""}];
  })();
  
  const [specs, setSpecs] = useState<{key: string, value: string}[]>(initialSpecs);

  // Image State
  const [mainImage, setMainImage] = useState<string>(product.imageUrl || "");
  const [gallery, setGallery] = useState<string[]>(() => {
    try {
      return product.gallery ? JSON.parse(product.gallery) : [];
    } catch(e) {
      return [];
    }
  });

  // Datasheet State
  const [datasheet, setDatasheet] = useState<string>(product.datasheetUrl || "");
  const [clearDatasheet, setClearDatasheet] = useState(false);

  const addSpec = () => setSpecs([...specs, {key: "", value: ""}]);

  const confirmDeleteInner = () => {
    if (!itemToDelete) return;
    const { type, index } = itemToDelete;
    if (type === 'spec' && index !== undefined) {
      setSpecs(specs.filter((_, i) => i !== index));
    } else if (type === 'mainImage') {
      setMainImage("");
    } else if (type === 'galleryImage' && index !== undefined) {
      setGallery(gallery.filter((_, i) => i !== index));
    } else if (type === 'datasheet') {
      setDatasheet("");
      setClearDatasheet(true);
    }
    setItemToDelete(null);
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
    
    // If no main image exists (deleted) and no new file is uploaded
    const newMainFile = formData.get("imageFile") as File;
    if (!mainImage && (!newMainFile || newMainFile.size === 0)) {
      toast.error("Gambar utama wajib diisi!");
      setLoading(false);
      return;
    }
    
    // Add states to formData
    formData.set("existingImageUrl", mainImage);
    formData.set("existingGallery", JSON.stringify(gallery));
    formData.set("existingDatasheetUrl", datasheet);
    formData.set("clearDatasheet", clearDatasheet.toString());
    
    // Clean up empty specs
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
    
    const result = await updateProduct(product.id, formData);
    
    if (result.success) {
      toast.success("Produk berhasil diperbarui");
      router.refresh();
    } else {
      toast.error(result.message || "Gagal memperbarui produk");
    }
    setLoading(false);
  };

  return (
    <div className="bg-navy-light rounded-xl p-6 sm:p-8 border border-white/[0.06]">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="space-y-5">
          <h3 className="text-gold font-semibold border-b border-white/[0.06] pb-2">Informasi Dasar</h3>
          <div>
            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Nama Produk *</label>
            <input 
              name="name" 
              required
              defaultValue={product.name}
              className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white placeholder-white/20 text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Kategori *</label>
            <select 
              name="categoryId" 
              required
              defaultValue={product.categoryId}
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
              defaultValue={product.description}
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
                    onClick={() => setItemToDelete({ type: 'spec', index })}
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

        <div className="space-y-6 pt-4">
          <h3 className="text-gold font-semibold border-b border-white/[0.06] pb-2">Manajemen Gambar</h3>
          
          <div>
            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Gambar Utama</label>
            {mainImage ? (
              <div className="relative w-40 h-40 rounded-xl overflow-hidden border-2 border-white/10 group mb-3 bg-white/5">
                <Image src={mainImage} alt="Main" fill className="object-contain p-2" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    type="button"
                    onClick={() => setItemToDelete({ type: 'mainImage' })}
                    className="bg-red-500/20 text-red-400 p-2 rounded-lg hover:bg-red-500/40 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-40 h-40 rounded-xl border-2 border-dashed border-white/20 mb-3 flex flex-col items-center justify-center text-white/30 bg-white/5">
                <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                <span className="text-xs font-medium">Kosong</span>
              </div>
            )}
            
            <input 
              name="imageFile" 
              type="file"
              accept="image/*"
              className="w-full max-w-sm px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white/50 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-gold/10 file:text-gold file:font-medium hover:file:bg-gold/20"
            />
            <p className="text-white/30 text-[11px] mt-2 max-w-md leading-relaxed">
              Jika Anda mengunggah gambar baru di sini, gambar utama yang ada saat ini (jika ada) otomatis akan diganti.
            </p>
          </div>

          <div className="pt-4 border-t border-white/[0.06]">
            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Galeri Tambahan (Multiple)</label>
            
            {gallery.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-4">
                  {gallery.map((imgUrl, idx) => (
                    <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border border-white/10 group bg-white/5">
                      <Image src={imgUrl} alt={`Gallery ${idx}`} fill className="object-contain p-1" />
                      <button 
                        type="button"
                        onClick={() => setItemToDelete({ type: 'galleryImage', index: idx })}
                        className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all"
                        title="Hapus gambar ini"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <input 
              name="galleryFiles" 
              type="file"
              accept="image/*"
              multiple
              className="w-full max-w-sm px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white/50 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-gold/10 file:text-gold file:font-medium hover:file:bg-gold/20"
            />
            <p className="text-white/30 text-[11px] mt-2 max-w-md leading-relaxed">
              Pilih satu atau lebih file tambahan. File yang diunggah akan digabungkan dengan galeri yang sudah ada. Hapus gambar lama dengan klik ikon (X) pada gambar.
            </p>
          </div>

          <div className="pt-4 border-t border-white/[0.06]">
            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Datasheet / Brosur (Opsional)</label>
            {datasheet ? (
              <div className="flex items-center gap-4 mb-3">
                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70">
                  <a href={datasheet} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                    Lihat File Terlampir
                  </a>
                </div>
                <button 
                  type="button"
                  onClick={() => setItemToDelete({ type: 'datasheet' })}
                  className="bg-red-500/20 text-red-400 p-2 rounded-lg hover:bg-red-500/40 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : null}
            <input 
              name="datasheetFile" 
              type="file"
              accept="application/pdf,image/*"
              className="w-full max-w-sm px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white/50 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-gold/10 file:text-gold file:font-medium hover:file:bg-gold/20"
            />
            <p className="text-white/30 text-[11px] mt-2 max-w-md leading-relaxed">
              Upload file PDF atau gambar (brosur) untuk produk ini.
            </p>
          </div>
        </div>
        
        <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              name="isPublished"
              id="isPublished"
              defaultChecked={product.isPublished}
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
              <span>Perbarui Produk</span>
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
  );
}
