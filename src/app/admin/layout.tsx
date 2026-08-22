"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { 
  LayoutDashboard, Settings, Package, FolderGit2, MessageSquare, 
  LogOut, Loader2, Menu, X, ExternalLink, ChevronRight, PanelLeftClose, PanelLeftOpen, Tags, Globe, Award
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
          <span className="text-white/40 text-sm">Memuat...</span>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" && pathname !== "/admin/login") {
    router.push("/admin/login");
    return null;
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const menu = [
    { name: "Dasbor", href: "/admin", icon: LayoutDashboard },
    { name: "Pengaturan Beranda", href: "/admin/home-settings", icon: Settings },
    { name: "Pengaturan Situs", href: "/admin/site-settings", icon: Globe },
    { name: "Kategori", href: "/admin/categories", icon: Tags },
    { name: "Produk", href: "/admin/products", icon: Package },
    { name: "Sertifikat", href: "/admin/certificates", icon: Award },
    { name: "Proyek", href: "/admin/projects", icon: FolderGit2 },
    { name: "Pesan", href: "/admin/messages", icon: MessageSquare },
  ];

  const currentPage = menu.find(m => m.href === pathname)?.name || "Dasbor";

  return (
    <div className="h-screen flex bg-navy font-sans overflow-hidden">
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen
        bg-navy-dark shadow-xl border-r border-white/[0.06]
        flex flex-col
        transition-all duration-300 ease-in-out
        ${collapsed ? 'lg:w-[72px]' : 'lg:w-[260px]'}
        w-[260px]
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Area */}
        <div className={`pt-5 pb-3 flex flex-col items-center ${collapsed ? 'px-2' : 'px-5'}`}>
          <div className="flex items-center justify-between w-full lg:hidden mb-3">
            <span />
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="text-white/40 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {collapsed ? (
            <Image 
              src="/logo/logo.png" 
              alt="Sun Global Energi" 
              width={40} 
              height={40} 
              className="w-10 h-auto object-contain"
              priority
            />
          ) : (
            <Image 
              src="/logo/logo.png" 
              alt="Sun Global Energi" 
              width={160} 
              height={60} 
              className="w-32 h-auto object-contain"
              priority
            />
          )}
        </div>

        {/* User info */}
        {!collapsed && (
          <div className="px-5 pb-4">
            <div className="bg-white/[0.05] rounded-lg px-3 py-2.5">
              <p className="text-white/80 text-xs font-medium truncate">{session?.user?.name || 'Admin'}</p>
              <p className="text-white/30 text-[11px] truncate mt-0.5">{session?.user?.email}</p>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className={`${collapsed ? 'mx-2' : 'mx-5'} h-px bg-white/[0.06]`} />
        
        {/* Navigation */}
        <nav className={`flex-1 ${collapsed ? 'px-2' : 'px-3'} py-4 space-y-1 overflow-y-auto`}>
          {!collapsed && (
            <p className="px-3 text-[10px] font-semibold text-white/20 uppercase tracking-widest mb-2">Menu</p>
          )}
          {menu.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                title={collapsed ? item.name : undefined}
                className={`flex items-center ${collapsed ? 'justify-center' : ''} gap-3 ${collapsed ? 'px-0 py-2.5' : 'px-3 py-2.5'} rounded-lg text-[13px] font-medium transition-all duration-200 group ${
                  isActive 
                    ? "bg-gold text-navy-dark font-semibold" 
                    : "text-white/50 hover:bg-white/[0.06] hover:text-white/80"
                }`}
              >
                <item.icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? 'text-navy-dark' : 'text-white/30 group-hover:text-white/50'}`} />
                {!collapsed && <span className="flex-1">{item.name}</span>}
                {!collapsed && isActive && <ChevronRight className="w-3.5 h-3.5 text-navy-dark/50" />}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <div className={`hidden lg:block ${collapsed ? 'px-2' : 'px-3'} py-2 border-t border-white/[0.06]`}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`flex items-center ${collapsed ? 'justify-center' : ''} gap-3 ${collapsed ? 'px-0' : 'px-3'} py-2.5 w-full rounded-lg text-[13px] font-medium text-white/30 hover:bg-white/[0.06] hover:text-white/50 transition-all duration-200`}
            title={collapsed ? "Buka menu" : "Tutup menu"}
          >
            {collapsed ? (
              <PanelLeftOpen className="w-[18px] h-[18px]" />
            ) : (
              <>
                <PanelLeftClose className="w-[18px] h-[18px]" />
                <span>Tutup Menu</span>
              </>
            )}
          </button>
        </div>

        {/* Sign Out */}
        <div className={`${collapsed ? 'px-2' : 'px-3'} py-3 border-t border-white/[0.06]`}>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            title={collapsed ? "Keluar" : undefined}
            className={`flex items-center ${collapsed ? 'justify-center' : ''} gap-3 ${collapsed ? 'px-0' : 'px-3'} py-2.5 w-full rounded-lg text-[13px] font-medium text-red-400/70 hover:bg-red-500/[0.08] hover:text-red-400 transition-all duration-200`}
          >
            <LogOut className="w-[18px] h-[18px]" />
            {!collapsed && <span>Keluar</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        {/* Top Header */}
        <header className="flex-shrink-0 z-30 bg-navy-light/80 backdrop-blur-xl border-b border-white/[0.06]">
          <div className="flex items-center justify-between px-4 sm:px-6 h-14">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSidebarOpen(true)} 
                className="lg:hidden text-white/50 hover:text-white transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-base sm:text-lg font-semibold font-heading text-white">
                {currentPage}
              </h1>
            </div>
            <Link 
              href="/" 
              target="_blank" 
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-gold transition-colors"
            >
              <span className="hidden sm:inline">Lihat Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
