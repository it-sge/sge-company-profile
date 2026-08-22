"use client";

import { useState } from "react";
import { 
  updateHomeSettings, 
  updateValueItem, 
  updateAdvantageItem 
} from "../actions";
import { toast } from "react-hot-toast";
import { Loader2, Save, Image as ImageIcon, LayoutDashboard, Target, Zap, ShieldCheck, FolderGit2 } from "lucide-react";
import Image from "next/image";

interface SettingsFormProps {
  initialData: Record<string, string>;
  values: any[];
  advantages: any[];
  projects: any[];
}

export default function SettingsForm({ initialData, values, advantages, projects }: SettingsFormProps) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "Hero Section", icon: LayoutDashboard },
    { name: "Our Mission", icon: Target },
    { name: "Our Value", icon: Zap },
    { name: "Solar System", icon: ImageIcon },
    { name: "Our Advantage", icon: ShieldCheck },
    { name: "Our Projects", icon: FolderGit2 },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-[600px] md:h-[calc(100vh-104px)] text-white relative">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-navy border-r border-white/[0.06] p-4 flex-shrink-0 md:rounded-tl-xl md:rounded-bl-xl overflow-y-auto custom-scrollbar">
        <nav className="space-y-1">
          {tabs.map((tab, idx) => {
            const Icon = tab.icon;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                  activeTab === idx 
                    ? "bg-gold text-navy-dark font-semibold shadow-md" 
                    : "text-white/50 hover:bg-white/[0.06] hover:text-white/80"
                }`}
              >
                <Icon className={`w-5 h-5 ${activeTab === idx ? "text-navy-dark" : "opacity-70"}`} />
                <span className="text-sm">{tab.name}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-8 bg-navy-light md:rounded-tr-xl md:rounded-br-xl overflow-y-auto custom-scrollbar">
        {activeTab === 0 && <HeroTab initialData={initialData} />}
        {activeTab === 1 && <MissionTab initialData={initialData} />}
        {activeTab === 2 && <ValueTab values={values} />}
        {activeTab === 3 && <SolarSystemTab initialData={initialData} />}
        {activeTab === 4 && <AdvantageTab advantages={advantages} />}
        {activeTab === 5 && <ProjectsTab initialData={initialData} projects={projects} />}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// TAB 1: HERO SECTION
// ----------------------------------------------------------------------
function HeroTab({ initialData }: { initialData: Record<string, string> }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await updateHomeSettings(new FormData(e.currentTarget));
    if (result.success) toast.success("Bagian Hero berhasil disimpan!");
    else toast.error("Gagal menyimpan bagian Hero.");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
      <div className="mb-6 border-b border-white/[0.06] pb-4">
        <h3 className="text-xl font-bold text-white">Hero Section</h3>
        <p className="text-white/40 text-sm mt-1">Konfigurasikan banner utama halaman beranda Anda.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Judul</label>
          <input name="hero_title" defaultValue={initialData['hero_title']} className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white placeholder-white/20 text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Subjudul</label>
          <input name="hero_subtitle" defaultValue={initialData['hero_subtitle']} className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white placeholder-white/20 text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Paragraf</label>
          <textarea 
            name="hero_paragraph" 
            defaultValue={initialData['hero_paragraph']} 
            rows={8} 
            className="w-full px-4 py-3 bg-navy border border-white/[0.08] rounded-lg text-white placeholder-white/20 text-base focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all resize-y leading-relaxed" 
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Slogan (Kanan Bawah)</label>
          <input name="hero_tagline" defaultValue={initialData['hero_tagline']} className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white placeholder-white/20 text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all" />
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/[0.06]">
        <h4 className="text-sm font-semibold text-white/80 mb-4">Gambar Latar</h4>
        <div className="flex items-center space-x-6">
          {initialData['hero_image'] && (
            <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-white/[0.08] shadow-sm">
              <Image src={initialData['hero_image']} alt="Hero bg" fill className="object-cover" />
            </div>
          )}
          <div className="flex-1">
            <input name="hero_imageFile" type="file" accept="image/*" className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white/50 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-gold/10 file:text-gold" />
            <p className="text-xs text-white/30 mt-2">Unggah gambar baru untuk menggantikan yang sekarang.</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <SaveButton loading={loading} />
      </div>
    </form>
  );
}

// ----------------------------------------------------------------------
// TAB 2: OUR MISSION
// ----------------------------------------------------------------------
function MissionTab({ initialData }: { initialData: Record<string, string> }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await updateHomeSettings(new FormData(e.currentTarget));
    if (result.success) toast.success("Misi berhasil disimpan!");
    else toast.error("Gagal menyimpan misi.");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
      <div className="mb-6 border-b border-white/[0.06] pb-4">
        <h3 className="text-xl font-bold text-white">Our Mission</h3>
        <p className="text-white/40 text-sm mt-1">Edit teks pernyataan misi.</p>
      </div>
      
      <div>
        <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Teks Misi</label>
        <textarea name="mission_text" defaultValue={initialData['mission_text']} rows={6} className="w-full px-4 py-3 bg-navy border border-white/[0.08] rounded-lg text-white placeholder-white/20 text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all leading-relaxed resize-none" />
      </div>

      <div className="flex justify-end pt-6">
        <SaveButton loading={loading} />
      </div>
    </form>
  );
}

// ----------------------------------------------------------------------
// TAB 3: OUR VALUE
// ----------------------------------------------------------------------
function ValueTab({ values }: { values: any[] }) {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="mb-6 border-b border-white/[0.06] pb-4">
        <h3 className="text-xl font-bold text-white">Our Value</h3>
        <p className="text-white/40 text-sm mt-1">Edit tiga pilar nilai inti.</p>
      </div>

      {values.length === 0 ? (
        <p className="text-white/30">Nilai tidak ditemukan. Harap jalankan seed database.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {values.map(val => (
            <ValueEditForm key={val.id} value={val} />
          ))}
        </div>
      )}
    </div>
  );
}

function ValueEditForm({ value }: { value: any }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const result = await updateValueItem(value.id, {
      title: fd.get("title") as string,
      pointA: fd.get("pointA") as string,
      pointB: fd.get("pointB") as string,
      pointC: fd.get("pointC") as string,
    });
    if (result.success) toast.success("Nilai berhasil diperbarui!");
    else toast.error("Gagal memperbarui nilai.");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-navy p-6 rounded-xl border border-white/[0.06] shadow-sm relative">
      <h4 className="font-bold text-white/80 mb-4 border-b border-white/[0.06] pb-2 text-sm">Item Nilai #{value.id}</h4>
      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-semibold text-white/40 mb-1 uppercase tracking-wider">Judul</label>
          <input name="title" defaultValue={value.title} className="w-full px-3 py-2 bg-navy-light border border-white/[0.08] rounded-md text-white text-sm focus:border-gold/40 focus:ring-1 focus:ring-gold/20 outline-none" required />
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-white/40 mb-1 uppercase tracking-wider">Poin A</label>
          <input name="pointA" defaultValue={value.pointA} className="w-full px-3 py-2 bg-navy-light border border-white/[0.08] rounded-md text-white text-sm focus:border-gold/40 focus:ring-1 focus:ring-gold/20 outline-none" required />
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-white/40 mb-1 uppercase tracking-wider">Poin B</label>
          <input name="pointB" defaultValue={value.pointB} className="w-full px-3 py-2 bg-navy-light border border-white/[0.08] rounded-md text-white text-sm focus:border-gold/40 focus:ring-1 focus:ring-gold/20 outline-none" required />
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-white/40 mb-1 uppercase tracking-wider">Poin C</label>
          <input name="pointC" defaultValue={value.pointC} className="w-full px-3 py-2 bg-navy-light border border-white/[0.08] rounded-md text-white text-sm focus:border-gold/40 focus:ring-1 focus:ring-gold/20 outline-none" required />
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-white/10 hover:bg-gold hover:text-navy-dark text-white rounded-md text-xs font-medium transition-colors disabled:opacity-50">
          {loading ? "Menyimpan..." : "Perbarui Item"}
        </button>
      </div>
    </form>
  );
}

// ----------------------------------------------------------------------
// TAB 4: SOLAR SYSTEM
// ----------------------------------------------------------------------
function SolarSystemTab({ initialData }: { initialData: Record<string, string> }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await updateHomeSettings(new FormData(e.currentTarget));
    if (result.success) toast.success("Bagian Tata Surya berhasil disimpan!");
    else toast.error("Gagal menyimpan.");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
      <div className="mb-6 border-b border-white/[0.06] pb-4">
        <h3 className="text-xl font-bold text-white">Solar System (Solar Cell)</h3>
        <p className="text-white/40 text-sm mt-1">Konfigurasikan gambar dan judul untuk bagian Tata Surya.</p>
      </div>
      
      <div>
        <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Judul</label>
        <textarea name="solar_system_title" defaultValue={initialData['solar_system_title'] || "Solar System \n (Solar Cell)"} rows={3} className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white placeholder-white/20 text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all resize-none" />
        <p className="text-[11px] text-white/30 mt-1">Anda dapat menggunakan enter/baris baru untuk memformat judul.</p>
      </div>

      <div className="mt-6 pt-6 border-t border-white/[0.06]">
        <h4 className="text-sm font-semibold text-white/80 mb-4">Gambar Lingkaran</h4>
        <div className="flex items-center space-x-6">
          {initialData['solar_system_image'] && (
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-navy shadow-sm">
              <Image src={initialData['solar_system_image']} alt="Solar bg" fill className="object-cover" />
            </div>
          )}
          <div className="flex-1">
            <input name="solar_system_imageFile" type="file" accept="image/*" className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white/50 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-gold/10 file:text-gold" />
            <p className="text-[11px] text-white/30 mt-2">Unggah gambar persegi atau potret (akan dipotong menjadi lingkaran).</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <SaveButton loading={loading} />
      </div>
    </form>
  );
}

// ----------------------------------------------------------------------
// TAB 5: OUR ADVANTAGE
// ----------------------------------------------------------------------
function AdvantageTab({ advantages }: { advantages: any[] }) {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="mb-6 border-b border-white/[0.06] pb-4">
        <h3 className="text-xl font-bold text-white">Our Advantage</h3>
        <p className="text-white/40 text-sm mt-1">Edit 4 kartu keunggulan.</p>
      </div>

      {advantages.length === 0 ? (
        <p className="text-white/30">Keunggulan tidak ditemukan. Harap jalankan seed database.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {advantages.map(adv => (
            <AdvantageEditForm key={adv.id} advantage={adv} />
          ))}
        </div>
      )}
    </div>
  );
}

function AdvantageEditForm({ advantage }: { advantage: any }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const result = await updateAdvantageItem(advantage.id, {
      title: fd.get("title") as string,
      description: fd.get("description") as string,
      icon: fd.get("icon") as string,
    });
    if (result.success) toast.success("Keunggulan berhasil diperbarui!");
    else toast.error("Gagal memperbarui keunggulan.");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-navy p-5 rounded-xl border border-white/[0.06] shadow-sm">
      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-semibold text-white/40 mb-1 uppercase tracking-wider">Judul</label>
          <input name="title" defaultValue={advantage.title} className="w-full px-3 py-2 bg-navy-light border border-white/[0.08] rounded-md text-white text-sm focus:border-gold/40 focus:ring-1 focus:ring-gold/20 outline-none font-semibold" required />
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-white/40 mb-1 uppercase tracking-wider">Nama Ikon</label>
          <select name="icon" defaultValue={advantage.icon} className="w-full px-3 py-2 bg-navy-light border border-white/[0.08] rounded-md text-white text-sm focus:border-gold/40 focus:ring-1 focus:ring-gold/20 outline-none">
             <option value="PackageCheck">PackageCheck (Box/Quality)</option>
             <option value="HardHat">HardHat (Worker/Service)</option>
             <option value="HandCoins">HandCoins (Price Tag/Best Price)</option>
             <option value="Headset">Headset (Helpdesk)</option>
             <option value="ShieldCheck">ShieldCheck (Alternate Quality)</option>
             <option value="Wrench">Wrench (Alternate Service)</option>
             <option value="BadgeDollarSign">BadgeDollarSign (Alternate Price)</option>
             <option value="Tags">Tags (Alternate Price)</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-white/40 mb-1 uppercase tracking-wider">Deskripsi</label>
          <textarea name="description" defaultValue={advantage.description} rows={3} className="w-full px-3 py-2 bg-navy-light border border-white/[0.08] rounded-md text-white text-sm focus:border-gold/40 focus:ring-1 focus:ring-gold/20 outline-none resize-none" required />
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-white/10 hover:bg-gold hover:text-navy-dark text-white rounded-md text-xs font-medium transition-colors disabled:opacity-50">
          {loading ? "Menyimpan..." : "Perbarui"}
        </button>
      </div>
    </form>
  );
}

// ----------------------------------------------------------------------
// TAB 6: OUR PROJECTS
// ----------------------------------------------------------------------
function ProjectsTab({ initialData, projects }: { initialData: Record<string, string>, projects: any[] }) {
  const [loading, setLoading] = useState(false);
  const selectedIds = initialData['home_featured_projects'] 
    ? initialData['home_featured_projects'].split(',') 
    : [];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await updateHomeSettings(new FormData(e.currentTarget));
    if (result.success) toast.success("Proyek unggulan berhasil diperbarui!");
    else toast.error("Gagal memperbarui proyek unggulan.");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
      {/* Hidden field to enforce clearing if all unchecked */}
      <input type="hidden" name="featured_projects_submitted" value="1" />
      
      <div className="mb-6 border-b border-white/[0.06] pb-4">
        <h3 className="text-xl font-bold text-white">Proyek Unggulan</h3>
        <p className="text-white/40 text-sm mt-1">Pilih proyek yang ingin Anda tampilkan di beranda. Mereka akan muncul sesuai urutan pembuatannya.</p>
      </div>
      
      {projects.length === 0 ? (
        <p className="text-white/30">Tidak ada proyek yang tersedia. Silakan buat beberapa di menu Proyek terlebih dahulu.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[450px] overflow-y-auto p-1 pr-3 custom-scrollbar">
          {projects.map(proj => (
            <label key={proj.id} className="flex items-start space-x-3 p-4 bg-navy border border-white/[0.06] rounded-xl hover:bg-white/[0.04] cursor-pointer transition-colors has-[:checked]:border-gold/50 has-[:checked]:bg-gold/5">
              <input 
                type="checkbox" 
                name="home_featured_projects" 
                value={proj.id.toString()} 
                defaultChecked={selectedIds.includes(proj.id.toString())}
                className="mt-0.5 w-4 h-4 rounded border-white/20 bg-navy text-gold focus:ring-gold/30" 
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white/90 text-sm truncate">{proj.name}</div>
                <div className="text-[11px] text-white/40 mt-0.5 truncate">{proj.location}</div>
              </div>
            </label>
          ))}
        </div>
      )}

      <div className="flex justify-end pt-6 border-t border-white/[0.06]">
        <SaveButton loading={loading} />
      </div>
    </form>
  );
}

// ----------------------------------------------------------------------
// SHARED COMPONENTS
// ----------------------------------------------------------------------
function SaveButton({ loading }: { loading: boolean }) {
  return (
    <button 
      type="submit" 
      disabled={loading}
      className="flex items-center space-x-2 bg-gold hover:bg-gold-light text-navy-dark px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50 shadow-md font-semibold text-sm"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
      <span>Simpan Perubahan</span>
    </button>
  );
}
