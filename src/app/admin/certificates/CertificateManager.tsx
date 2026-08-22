"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCertificate, deleteCertificate } from "../actions";
import { toast } from "react-hot-toast";
import { Loader2, Plus, Trash2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import Modal from "@/components/ui/Modal";
import { Certificate } from "@prisma/client";

export default function CertificateManager({ initialCertificates }: { initialCertificates: Certificate[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await createCertificate(formData);
    
    if (result.success) {
      toast.success("Sertifikat berhasil ditambahkan");
      (e.target as HTMLFormElement).reset();
      router.refresh();
    } else {
      toast.error(result.message || "Gagal menambahkan sertifikat");
    }
    setLoading(false);
  };

  const confirmDelete = async () => {
    if (itemToDelete === null) return;
    setLoading(true);
    const result = await deleteCertificate(itemToDelete);
    if (result.success) {
      toast.success("Sertifikat berhasil dihapus");
      setItemToDelete(null);
      router.refresh();
    } else {
      toast.error(result.message || "Gagal menghapus sertifikat");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Upload Form */}
      <div className="bg-navy-light rounded-xl p-6 border border-white/[0.06]">
        <h3 className="text-gold font-semibold mb-4 border-b border-white/[0.06] pb-2">Tambah Sertifikat Baru</h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Nama Sertifikat *</label>
              <input 
                name="name" 
                required
                placeholder="Contoh: SNI Panel Surya"
                className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white placeholder-white/20 text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all h-[42px]"
              />
            </div>
            <div className="flex-[2]">
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">File Sertifikat (PDF/Gambar) *</label>
              <input 
                name="imageFiles" 
                type="file"
                accept=".pdf, image/*"
                multiple
                required
                className="w-full px-4 py-2 bg-navy border border-white/[0.08] rounded-lg text-white/50 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-gold/10 file:text-gold file:font-medium hover:file:bg-gold/20 h-[42px]"
              />
              <p className="text-white/30 text-[11px] mt-2">Bisa 1 PDF atau blok beberapa Gambar sekaligus (jika banyak halaman).</p>
            </div>
          </div>
          <div className="flex justify-end pt-2 border-t border-white/[0.06]">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full md:w-auto h-10 flex items-center justify-center space-x-2 bg-gold hover:bg-gold-light text-navy-dark font-bold px-8 rounded-lg transition-colors disabled:opacity-50 text-sm"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              <span>Upload Sertifikat</span>
            </button>
          </div>
        </form>
      </div>

      {/* Grid of Certificates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {initialCertificates.map((cert) => (
          <div key={cert.id} className="bg-navy-light rounded-xl border border-white/[0.06] overflow-hidden group">
            <div className="relative aspect-[1/1.414] w-full bg-white/5 flex flex-col items-center justify-center">
              {/* @ts-ignore */}
              {cert.fileType === "pdf" || cert.imageUrl.toLowerCase().endsWith(".pdf") ? (
                <div className="text-center p-4">
                  <div className="w-16 h-16 mx-auto bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-2">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  </div>
                  <span className="text-white/60 text-xs font-semibold">Dokumen PDF</span>
                </div>
              ) : (
                <Image 
                  src={cert.imageUrl} 
                  alt={cert.name} 
                  fill 
                  className="object-contain p-4"
                />
              )}
              
              {/* @ts-ignore */}
              {cert.gallery && JSON.parse(cert.gallery).length > 0 && (
                <div className="absolute top-3 left-3 bg-navy-dark border border-white/10 px-2 py-1 rounded text-[10px] text-white font-bold flex items-center shadow-lg">
                  <ImageIcon className="w-3 h-3 mr-1 text-gold" />
                  {/* @ts-ignore */}
                  +{JSON.parse(cert.gallery).length} Halaman
                </div>
              )}

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={() => setItemToDelete(cert.id)}
                  className="bg-red-500/20 text-red-400 p-3 rounded-lg hover:bg-red-500/40 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4 border-t border-white/[0.06]">
              <h4 className="text-white font-medium text-sm text-center truncate" title={cert.name}>{cert.name}</h4>
            </div>
          </div>
        ))}
        {initialCertificates.length === 0 && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-white/30 bg-white/5 rounded-xl border border-white/[0.06] border-dashed">
            <ImageIcon className="w-12 h-12 mb-3 opacity-20" />
            <p className="text-sm">Belum ada sertifikat yang diunggah.</p>
          </div>
        )}
      </div>

      <Modal isOpen={itemToDelete !== null} onClose={() => setItemToDelete(null)} title="Konfirmasi Hapus">
        <p className="text-white/50 mb-6">Apakah Anda yakin ingin menghapus sertifikat ini? Aksi ini tidak dapat dibatalkan.</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setItemToDelete(null)}
            className="px-4 py-2 border border-white/[0.08] text-white/50 rounded-lg hover:bg-white/[0.04] transition-colors"
          >
            Batal
          </button>
          <button
            onClick={confirmDelete}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            <span>Ya, Hapus</span>
          </button>
        </div>
      </Modal>
    </div>
  );
}
