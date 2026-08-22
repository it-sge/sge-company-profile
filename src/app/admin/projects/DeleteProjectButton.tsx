"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { deleteProject } from "../actions";
import Modal from "@/components/ui/Modal";

export default function DeleteProjectButton({ id }: { id: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const result = await deleteProject(id);
    if (result.success) {
      toast.success("Proyek berhasil dihapus");
      setIsOpen(false);
    } else {
      toast.error(result.message || "Gagal menghapus proyek");
    }
    setLoading(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-red-400/50 hover:text-red-400 transition-colors">
        <Trash2 className="w-4 h-4" />
      </button>

      <Modal isOpen={isOpen} onClose={() => !loading && setIsOpen(false)} title="Hapus Proyek">
        <p className="text-white/50 mb-6">Apakah Anda yakin ingin menghapus proyek ini? Tindakan ini tidak dapat dibatalkan.</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setIsOpen(false)}
            disabled={loading}
            className="px-4 py-2 border border-white/[0.08] text-white/50 rounded-lg hover:bg-white/[0.04] transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>Ya, Hapus</span>
          </button>
        </div>
      </Modal>
    </>
  );
}
