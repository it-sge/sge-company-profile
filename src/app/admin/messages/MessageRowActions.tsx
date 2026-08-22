"use client";

import { useState } from "react";
import { Check, Eye, X } from "lucide-react";
import { markMessageRead } from "../actions";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";

export default function MessageRowActions({ message }: { message: any }) {
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const handleMarkRead = async () => {
    setLoading(true);
    const result = await markMessageRead(message.id);
    if (result.success) {
      toast.success("Pesan ditandai sudah dibaca");
    } else {
      toast.error("Gagal menandai pesan");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-end space-x-4">
      <button
        onClick={() => setShowDetail(true)}
        className="inline-flex items-center space-x-1 text-sm text-white/60 hover:text-white transition-colors"
      >
        <Eye className="w-4 h-4" />
        <span>Detail</span>
      </button>

      {!message.isRead && (
        <button
          onClick={handleMarkRead}
          disabled={loading}
          className="inline-flex items-center space-x-1 text-sm text-gold/70 hover:text-gold disabled:opacity-50 transition-colors"
        >
          <Check className="w-4 h-4" />
          <span>Tandai Dibaca</span>
        </button>
      )}

      {/* Detail Modal */}
      <Modal isOpen={showDetail} onClose={() => setShowDetail(false)} title="Detail Pesan">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-white/40 font-semibold uppercase tracking-wider">Pengirim</label>
            <div className="text-white text-lg font-medium">{message.name}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/40 font-semibold uppercase tracking-wider">Email</label>
              <div className="text-white/80">{message.email}</div>
            </div>
            <div>
              <label className="text-xs text-white/40 font-semibold uppercase tracking-wider">Telepon</label>
              <div className="text-white/80">{message.phone}</div>
            </div>
          </div>
          
          <div>
            <label className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-2 block">Isi Pesan</label>
            <div className="bg-navy-dark p-4 rounded-lg border border-white/10 text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
              {message.message}
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-white/10">
            <button
              onClick={() => setShowDetail(false)}
              className="px-4 py-2 border border-white/[0.08] text-white/70 hover:text-white rounded-lg hover:bg-white/[0.04] transition-colors"
            >
              Tutup
            </button>
            {!message.isRead && (
              <button
                onClick={() => {
                  handleMarkRead();
                  setShowDetail(false);
                }}
                disabled={loading}
                className="ml-3 flex items-center space-x-2 bg-gold hover:bg-gold-light text-navy-dark font-bold px-4 py-2 rounded-lg transition-colors disabled:opacity-50 text-sm"
              >
                <Check className="w-4 h-4" />
                <span>Tandai Dibaca</span>
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
