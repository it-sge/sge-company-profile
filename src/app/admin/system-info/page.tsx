"use client";

import { useState, useEffect } from "react";
import { Server, Activity, Database, HardDrive, Cpu, Clock, Layout, Package, Info, CheckCircle2 } from "lucide-react";

interface SystemInfo {
  os: { platform: string; release: string; type: string; arch: string; uptime: number };
  cpu: { model: string; cores: number; usagePercent: number };
  memory: { total: number; free: number; used: number; processUsed: number; processTotal: number };
  app: { nodeVersion: string; nextVersion: string; uptime: number; env: string };
  database: { 
    latencyMs: number; 
    status: string;
    stats: { products: number; projects: number; messages: number; categories: number }
  };
}

export default function SystemInfoPage() {
  const [info, setInfo] = useState<SystemInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch("/api/system-info");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setInfo(data);
        setLastUpdated(new Date());
        setError("");
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
    const interval = setInterval(fetchInfo, 3000); // Poll every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const formatBytes = (bytes: number, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const formatUptime = (seconds: number) => {
    const d = Math.floor(seconds / (3600*24));
    const h = Math.floor(seconds % (3600*24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    
    if (d > 0) return `${d}h ${h}j ${m}m`;
    if (h > 0) return `${h}j ${m}m ${s}d`;
    return `${m}m ${s}d`;
  };

  if (loading && !info) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="animate-[spin_2s_linear_infinite] rounded-full h-10 w-10 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (error && !info) {
    return (
      <div className="p-6">
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
          Gagal memuat info sistem: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-gold" />
            Pemantauan Sistem 
            <span className="inline-flex items-center ml-2 px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 font-medium uppercase tracking-wider border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
              Live
            </span>
          </h2>
          <p className="text-white/40 text-sm mt-1">Status server, penggunaan memori, dan latensi database.</p>
        </div>
        <div className="text-xs text-white/30 bg-white/[0.02] px-3 py-1.5 rounded-lg border border-white/[0.04]">
          Update: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>

      {info && (
        <>
          {/* Main Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* RAM Usage */}
            <div className="bg-navy-light rounded-xl p-5 border border-white/[0.06] hover:border-gold/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center">
                  <HardDrive className="w-5 h-5 text-sky" />
                </div>
                <span className="text-[10px] font-medium text-white/30 bg-white/[0.04] px-2 py-1 rounded uppercase tracking-wider border border-white/[0.02]">RAM Server</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">{formatBytes(info.memory.used, 1)}</h3>
              <div className="w-full bg-white/[0.04] rounded-full h-1.5 mt-4 mb-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    (info.memory.used / info.memory.total) > 0.8 ? 'bg-red-500' : 'bg-sky'
                  }`}
                  style={{ width: `${(info.memory.used / info.memory.total) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[11px] text-white/30 font-medium">
                <span>Terpakai</span>
                <span>Total: {formatBytes(info.memory.total, 1)}</span>
              </div>
            </div>

            {/* CPU Load */}
            <div className="bg-navy-light rounded-xl p-5 border border-white/[0.06] hover:border-gold/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-indigo-400" />
                </div>
                <span className="text-[10px] font-medium text-white/30 bg-white/[0.04] px-2 py-1 rounded uppercase tracking-wider border border-white/[0.02]">CPU Load</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">{info.cpu.usagePercent.toFixed(1)}%</h3>
              <div className="w-full bg-white/[0.04] rounded-full h-1.5 mt-4 mb-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    info.cpu.usagePercent > 80 ? 'bg-red-500' : 'bg-indigo-400'
                  }`}
                  style={{ width: `${info.cpu.usagePercent}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-white/30 font-medium truncate" title={info.cpu.model}>
                {info.cpu.cores} Cores • {info.cpu.model.split(" ")[0]}
              </p>
            </div>

            {/* Database Latency */}
            <div className="bg-navy-light rounded-xl p-5 border border-white/[0.06] hover:border-gold/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center">
                  <Database className="w-5 h-5 text-emerald-400" />
                </div>
                <span className={`text-[10px] font-medium px-2 py-1 rounded uppercase tracking-wider border ${
                  info.database.status === 'Excellent' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                  info.database.status === 'Good' ? 'bg-sky/10 text-sky border-sky/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                }`}>
                  {info.database.status}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                {info.database.latencyMs.toFixed(1)} <span className="text-sm font-normal text-white/30">ms</span>
              </h3>
              <p className="text-[11px] text-white/30 font-medium mt-4">
                Kecepatan respons database MySQL
              </p>
            </div>

            {/* Node Process Memory */}
            <div className="bg-navy-light rounded-xl p-5 border border-white/[0.06] hover:border-gold/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center">
                  <Server className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-[10px] font-medium text-white/30 bg-white/[0.04] px-2 py-1 rounded uppercase tracking-wider border border-white/[0.02]">App Heap</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">{formatBytes(info.memory.processUsed, 1)}</h3>
              <div className="w-full bg-white/[0.04] rounded-full h-1.5 mt-4 mb-2 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000 bg-purple-400"
                  style={{ width: `${(info.memory.processUsed / info.memory.processTotal) * 100}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-white/30 font-medium">
                Memori aplikasi Node.js
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            {/* Tech Stack Info */}
            <div className="bg-navy-light rounded-xl p-5 sm:p-6 border border-white/[0.06]">
              <h3 className="text-sm font-semibold text-white mb-5 flex items-center gap-2">
                <Layout className="w-4 h-4 text-gold" />
                Teknologi yang Digunakan (Tech Stack)
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.02]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-white">Frontend & Backend (Fullstack)</h4>
                    <p className="text-[11px] text-white/40 mt-1 leading-relaxed">
                      Menggunakan <strong className="text-white/70">Next.js 14 App Router</strong> dengan <strong className="text-white/70">React</strong>. 
                      Next.js bertugas menangani Server-Side Rendering (SSR) untuk SEO optimal, dan Server Actions untuk mutasi data internal.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.02]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-white">Desain & UI</h4>
                    <p className="text-[11px] text-white/40 mt-1 leading-relaxed">
                      Didesain menggunakan <strong className="text-white/70">TailwindCSS</strong> untuk styling kustom yang fleksibel. Ikon menggunakan <strong className="text-white/70">Lucide React</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.02]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-white">Database & ORM</h4>
                    <p className="text-[11px] text-white/40 mt-1 leading-relaxed">
                      Penyimpanan data utama menggunakan <strong className="text-white/70">MySQL</strong>. Komunikasi ke database dijembatani oleh <strong className="text-white/70">Prisma ORM</strong> untuk keamanan tingkat tinggi anti SQL-Injection.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.02]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-white">Keamanan & Autentikasi</h4>
                    <p className="text-[11px] text-white/40 mt-1 leading-relaxed">
                      Panel Admin dilindungi dengan <strong className="text-white/70">NextAuth.js</strong>. Password admin dienkripsi (hashing) menggunakan metode <strong className="text-white/70">bcryptjs</strong> (salt round 10).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-5">
              {/* Server Details */}
              <div className="bg-navy-light rounded-xl p-5 sm:p-6 border border-white/[0.06]">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4 text-gold" />
                  Detail Server & Sistem
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white/[0.02] rounded-lg border border-white/[0.02]">
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1 font-medium">Platform OS</p>
                    <p className="text-xs font-semibold text-white capitalize">{info.os.type} {info.os.arch}</p>
                  </div>
                  <div className="p-3 bg-white/[0.02] rounded-lg border border-white/[0.02]">
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1 font-medium">OS Release</p>
                    <p className="text-xs font-semibold text-white truncate" title={info.os.release}>{info.os.release}</p>
                  </div>
                  <div className="p-3 bg-white/[0.02] rounded-lg border border-white/[0.02]">
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1 font-medium">Node.js Version</p>
                    <p className="text-xs font-semibold text-white">{info.app.nodeVersion}</p>
                  </div>
                  <div className="p-3 bg-white/[0.02] rounded-lg border border-white/[0.02]">
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1 font-medium">Next.js Version</p>
                    <p className="text-xs font-semibold text-white">v{info.app.nextVersion}</p>
                  </div>
                  <div className="p-3 bg-white/[0.02] rounded-lg border border-white/[0.02]">
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1 font-medium">Environment</p>
                    <p className="text-xs font-semibold text-white capitalize">{info.app.env || 'Production'}</p>
                  </div>
                  <div className="p-3 bg-white/[0.02] rounded-lg border border-white/[0.02]">
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1 font-medium">Uptime Server</p>
                    <p className="text-xs font-semibold text-white">{formatUptime(info.os.uptime)}</p>
                  </div>
                </div>
              </div>

              {/* Database Overview */}
              <div className="bg-navy-light rounded-xl p-5 sm:p-6 border border-white/[0.06]">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <Package className="w-4 h-4 text-gold" />
                  Ringkasan Database
                </h3>
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  <div className="p-3 bg-white/[0.02] rounded-lg border border-white/[0.02] text-center">
                    <p className="text-lg sm:text-xl font-bold text-white font-heading">{info.database.stats.products}</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mt-1">Produk</p>
                  </div>
                  <div className="p-3 bg-white/[0.02] rounded-lg border border-white/[0.02] text-center">
                    <p className="text-lg sm:text-xl font-bold text-white font-heading">{info.database.stats.projects}</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mt-1">Proyek</p>
                  </div>
                  <div className="p-3 bg-white/[0.02] rounded-lg border border-white/[0.02] text-center">
                    <p className="text-lg sm:text-xl font-bold text-white font-heading">{info.database.stats.categories}</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mt-1">Kategori</p>
                  </div>
                  <div className="p-3 bg-white/[0.02] rounded-lg border border-white/[0.02] text-center">
                    <p className="text-lg sm:text-xl font-bold text-white font-heading">{info.database.stats.messages}</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mt-1">Pesan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
