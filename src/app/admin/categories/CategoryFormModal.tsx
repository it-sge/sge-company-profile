"use client";

import { useState } from "react";
import { createCategory, updateCategory } from "../actions";
import { toast } from "react-hot-toast";
import { Loader2, X } from "lucide-react";
import { Category } from "@prisma/client";

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category | null;
  type: "product" | "project";
}

export default function CategoryFormModal({ isOpen, onClose, category, type }: CategoryFormModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      type: type,
    };

    let result;
    if (category) {
      result = await updateCategory(category.id, data);
    } else {
      result = await createCategory(data);
    }

    if (result.success) {
      toast.success(`Kategori berhasil ${category ? 'diperbarui' : 'ditambahkan'}`);
      onClose();
    } else {
      toast.error(result.message || "Gagal menyimpan kategori");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-navy-light w-full max-w-md rounded-xl border border-white/[0.08] shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <h3 className="text-lg font-semibold text-white font-heading">
            {category ? 'Edit Kategori ' : 'Tambah Kategori '} 
            {type === "product" ? "Produk" : "Proyek"}
          </h3>
          <button 
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Nama Kategori *</label>
            <input 
              name="name" 
              required
              defaultValue={category?.name || ""}
              className="w-full px-4 py-2 bg-navy border border-white/[0.08] rounded-lg text-white placeholder-white/20 text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Deskripsi</label>
            <textarea 
              name="description" 
              rows={3}
              defaultValue={category?.description || ""}
              className="w-full px-4 py-2 bg-navy border border-white/[0.08] rounded-lg text-white placeholder-white/20 text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all resize-none"
            />
          </div>
          
          <div className="pt-4 flex justify-end space-x-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white/50 hover:bg-white/5 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex items-center space-x-2 bg-gold hover:bg-gold-light text-navy-dark font-bold px-5 py-2 rounded-lg transition-colors disabled:opacity-50 text-sm"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>Simpan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
