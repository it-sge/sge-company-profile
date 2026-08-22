import prisma from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import { CheckCircle, Clock } from "lucide-react";
import MessageRowActions from "./MessageRowActions";

export default async function AdminMessagesPage() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold font-heading text-white mb-6">Pesan Kontak</h2>
      
      <div className="bg-navy-light rounded-xl overflow-hidden border border-white/[0.06]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/[0.06]">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th scope="col" className="px-5 py-3 text-left text-[11px] font-semibold text-white/50 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-5 py-3 text-left text-[11px] font-semibold text-white/50 uppercase tracking-wider">Tanggal</th>
                <th scope="col" className="px-5 py-3 text-left text-[11px] font-semibold text-white/50 uppercase tracking-wider">Info Kontak</th>
                <th scope="col" className="px-5 py-3 text-left text-[11px] font-semibold text-white/50 uppercase tracking-wider">Pesan</th>
                <th scope="col" className="px-5 py-3 text-right text-[11px] font-semibold text-white/50 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {messages.map((msg) => (
                <tr key={msg.id} className={`transition-colors ${msg.isRead ? 'opacity-70 bg-black/10' : 'bg-white/[0.02]'} hover:bg-white/[0.05]`}>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    {msg.isRead ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle className="w-3 h-3" /> Dibaca
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-gold/10 text-gold border border-gold/20">
                        <Clock className="w-3 h-3" /> Baru
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap text-sm text-white/60">
                    {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="text-sm font-semibold text-white/90">{msg.name}</div>
                    <div className="text-xs text-white/60 mt-0.5">{msg.email}</div>
                    <div className="text-xs text-white/60">{msg.phone}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="text-sm text-white/80 max-w-md line-clamp-2 leading-relaxed">{msg.message}</div>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap text-right text-sm">
                    <MessageRowActions message={msg} />
                  </td>
                </tr>
              ))}
              
              {messages.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-sm text-white/20">
                    Belum ada pesan yang diterima.
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
