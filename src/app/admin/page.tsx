import prisma from "@/lib/prisma";
import Link from "next/link";
import { Package, FolderGit2, MessageSquare, Settings, ArrowUpRight, Clock, Mail, Activity } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const productsCount = await prisma.product.count();
  const projectsCount = await prisma.project.count();
  const totalMessages = await prisma.message.count();
  const unreadMessagesCount = await prisma.message.count({ where: { isRead: false } });

  const recentMessages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  const recentProjects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    take: 4,
  });

  const stats = [
    { 
      name: "Produk", 
      value: productsCount, 
      icon: Package, 
      href: "/admin/products",
      iconColor: "text-sky",
    },
    { 
      name: "Proyek", 
      value: projectsCount, 
      icon: FolderGit2, 
      href: "/admin/projects",
      iconColor: "text-emerald-400",
    },
    { 
      name: "Pesan", 
      value: totalMessages, 
      icon: Mail, 
      href: "/admin/messages",
      iconColor: "text-gold",
    },
    { 
      name: "Belum Dibaca", 
      value: unreadMessagesCount, 
      icon: MessageSquare, 
      href: "/admin/messages",
      iconColor: "text-orange-400",
    },
  ];

  const quickActions = [
    { name: "Pengaturan Beranda", href: "/admin/home-settings", icon: Settings, desc: "Edit konten halaman beranda" },
    { name: "Info Sistem (Live)", href: "/admin/system-info", icon: Activity, desc: "Pantau kesehatan server & database" },
    { name: "Produk", href: "/admin/products", icon: Package, desc: "Kelola katalog produk" },
    { name: "Proyek", href: "/admin/projects", icon: FolderGit2, desc: "Kelola portofolio proyek" },
    { name: "Pesan", href: "/admin/messages", icon: MessageSquare, desc: "Lihat pesan kontak" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-white flex items-center gap-2">
          Selamat Datang 
          <Settings className="w-5 h-5 text-gold animate-[spin_4s_linear_infinite]" />
        </h2>
        <p className="text-white/40 text-sm mt-1">Berikut adalah ringkasan aktivitas situs Anda hari ini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href} className="group">
            <div className="bg-navy-light rounded-xl border border-white/[0.06] p-4 sm:p-5 hover:border-gold/30 hover:bg-navy-light/80 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center">
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/10 group-hover:text-gold/50 transition-colors" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-white font-heading">{stat.value}</p>
              <p className="text-[11px] sm:text-xs text-white/30 mt-1 font-medium uppercase tracking-wider">{stat.name}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-5">
        
        {/* Recent Messages */}
        <div className="lg:col-span-3 bg-navy-light rounded-xl border border-white/[0.06] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white">Pesan Terbaru</h3>
            <Link href="/admin/messages" className="text-xs text-gold/70 hover:text-gold transition-colors flex items-center gap-1">
              Lihat semua <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          
          {recentMessages.length > 0 ? (
            <div className="divide-y divide-white/[0.04]">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="px-5 py-3.5 hover:bg-white/[0.02] transition-colors flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${msg.isRead ? 'bg-white/10' : 'bg-gold'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-sm truncate ${msg.isRead ? 'text-white/40' : 'text-white font-medium'}`}>
                        {msg.name}
                      </p>
                      <span className="text-[10px] text-white/20 flex-shrink-0 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-xs text-white/25 truncate mt-0.5">
                      {msg.subject || msg.message.substring(0, 80)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-5 py-10 text-center">
              <MessageSquare className="w-8 h-8 text-white/10 mx-auto mb-2" />
              <p className="text-xs text-white/20">Belum ada pesan</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-navy-light rounded-xl border border-white/[0.06] overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white">Aksi Cepat</h3>
          </div>
          <div className="p-3 space-y-1.5">
            {quickActions.map((action) => (
              <Link 
                key={action.name} 
                href={action.href}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/[0.04] transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                  <action.icon className="w-4 h-4 text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/80 font-medium">{action.name}</p>
                  <p className="text-[11px] text-white/25">{action.desc}</p>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/10 group-hover:text-gold/50 transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      {recentProjects.length > 0 && (
        <div className="bg-navy-light rounded-xl border border-white/[0.06] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white">Proyek Terbaru</h3>
            <Link href="/admin/projects" className="text-xs text-gold/70 hover:text-gold transition-colors flex items-center gap-1">
              Lihat semua <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left px-5 py-3 text-[11px] font-semibold text-white/30 uppercase tracking-wider">Proyek</th>
                  <th className="text-left px-5 py-3 text-[11px] font-semibold text-white/30 uppercase tracking-wider">Lokasi</th>
                  <th className="text-left px-5 py-3 text-[11px] font-semibold text-white/30 uppercase tracking-wider">Kapasitas</th>
                  <th className="text-left px-5 py-3 text-[11px] font-semibold text-white/30 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {recentProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-white/80 font-medium">{project.name}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-white/40">{project.location}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-white/40">{project.capacity || '—'}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${
                        project.isPublished 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-white/[0.04] text-white/30 border border-white/[0.06]'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${project.isPublished ? 'bg-emerald-400' : 'bg-white/20'}`} />
                        {project.isPublished ? 'Dipublikasikan' : 'Draf'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
