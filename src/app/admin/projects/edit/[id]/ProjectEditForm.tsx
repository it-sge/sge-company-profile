"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProject } from "../../../actions";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function ProjectEditForm({ project }: { project: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await updateProject(project.id, formData);
    
    if (result.success) {
      toast.success("Proyek berhasil diperbarui");
      router.push("/admin/projects");
    } else {
      toast.error(result.message || "Gagal memperbarui proyek");
    }
    setLoading(false);
  };

  const dateStr = project.completionDate 
    ? new Date(project.completionDate).toISOString().split('T')[0] 
    : "";

  return (
    <div className="bg-navy-light rounded-xl p-6 border border-white/[0.06]">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Nama Proyek *</label>
          <input 
            name="name" 
            required
            defaultValue={project.name}
            className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white placeholder-white/20 text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Lokasi *</label>
            <input 
              name="location" 
              required
              defaultValue={project.location}
              className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white placeholder-white/20 text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Kapasitas *</label>
            <input 
              name="capacity" 
              required
              defaultValue={project.capacity}
              className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white placeholder-white/20 text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
            />
          </div> 
        </div>

        <div>
          <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Deskripsi *</label>
          <textarea 
            name="description" 
            required
            rows={4}
            defaultValue={project.description}
            className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white placeholder-white/20 text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all resize-none"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Tanggal Selesai</label>
            <input 
              name="completionDate" 
              type="date"
              defaultValue={dateStr}
              className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">URL Gambar</label>
            <input 
              name="imageUrl" 
              type="url"
              defaultValue={project.imageUrl || ""}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white placeholder-white/20 text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Unggah Gambar Lokal</label>
          <input 
            name="imageFile" 
            type="file"
            accept="image/*"
            className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white/50 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-gold/10 file:text-gold"
          />
          <p className="text-xs text-white/20 mt-1">Jika diisi, ini akan mengabaikan URL Gambar di atas.</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            name="isPublished"
            id="isPublished"
            defaultChecked={project.isPublished}
            className="w-4 h-4 rounded border-white/20 bg-navy text-gold focus:ring-gold/30"
          />
          <label htmlFor="isPublished" className="text-sm text-white/60">
            Langsung publikasikan
          </label>
        </div>
        
        <div className="pt-4 border-t border-white/[0.06] flex justify-end space-x-3">
          <Link 
            href="/admin/projects"
            className="px-5 py-2.5 border border-white/[0.08] text-white/50 rounded-lg hover:bg-white/[0.04] transition-colors text-sm"
          >
            Batal
          </Link>
          <button 
            type="submit" 
            disabled={loading}
            className="flex items-center space-x-2 bg-gold hover:bg-gold-light text-navy-dark font-semibold px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50 text-sm"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>Perbarui Proyek</span>
          </button>
        </div>
      </form>
    </div>
  );
}
