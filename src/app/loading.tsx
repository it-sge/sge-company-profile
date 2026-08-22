import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 text-gold animate-spin" />
        <p className="text-navy font-bold text-sm uppercase tracking-widest animate-pulse">Memuat...</p>
      </div>
    </div>
  );
}
