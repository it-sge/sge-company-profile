"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject, updateProject } from "../actions";
import { toast } from "react-hot-toast";
import { ArrowLeft, Plus, Trash2, Upload, Loader2 } from "lucide-react";
import Link from "next/link";
import { ProjectContentData, defaultProjectContentData } from "@/types/project";
import Image from "next/image";
import Modal from "@/components/ui/Modal";

interface ProjectFormProps {
  initialData?: any;
  categories: any[];
}

export default function ProjectForm({ initialData, categories }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [itemToDelete, setItemToDelete] = useState<{ type: string, index?: number, field?: string } | null>(null);

  // Basic Fields
  const [name, setName] = useState(initialData?.name || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [capacity, setCapacity] = useState(initialData?.capacity || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || "");
  const [completionDate, setCompletionDate] = useState(
    initialData?.completionDate ? new Date(initialData.completionDate).toISOString().split('T')[0] : ""
  );
  const [isPublished, setIsPublished] = useState(initialData?.isPublished ?? true);
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [brochureUrl, setBrochureUrl] = useState(initialData?.brochureUrl || "");
  const [brochureFile, setBrochureFile] = useState<File | null>(null);

  // Content Data (JSON)
  let parsedContent = defaultProjectContentData;
  if (initialData?.contentData) {
    try {
      parsedContent = JSON.parse(initialData.contentData);
      // Ensure all arrays exist
      if (!parsedContent.equipment) parsedContent.equipment = [];
      if (!parsedContent.timeline) parsedContent.timeline = [];
      if (!parsedContent.technicalSpecs) parsedContent.technicalSpecs = [];
      if (!parsedContent.whyItMatters) parsedContent.whyItMatters = [];
      if (!parsedContent.gallery) parsedContent.gallery = [];
    } catch (e) {}
  }
  const [contentData, setContentData] = useState<ProjectContentData>(parsedContent);

  // Helper to handle nested state updates
  const updateContent = (section: keyof ProjectContentData, field: string, value: any) => {
    setContentData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value
      }
    }));
  };

  const confirmDeleteInner = () => {
    if (!itemToDelete) return;
    const { type, index, field } = itemToDelete;
    if (type === 'technicalSpecs' && index !== undefined) {
      const newSpecs = contentData.technicalSpecs.filter((_, i) => i !== index);
      setContentData({ ...contentData, technicalSpecs: newSpecs });
    } else if (type === 'equipment' && index !== undefined) {
      const newEq = contentData.equipment.filter((_, i) => i !== index);
      setContentData({ ...contentData, equipment: newEq });
    } else if (type === 'timeline' && index !== undefined) {
      const newT = contentData.timeline.filter((_, i) => i !== index);
      setContentData({ ...contentData, timeline: newT });
    } else if (type === 'beforeAfter' && field) {
      updateContent('beforeAfter', field, '');
    } else if (type === 'gallery' && index !== undefined) {
      const newG = (contentData.gallery || []).filter((_, i) => i !== index);
      setContentData({ ...contentData, gallery: newG });
    }
    setItemToDelete(null);
  };

  const handleFileUpload = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) return data.url;
      return null;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    if (!e.target.files?.[0]) return;
    toast.loading("Mengunggah gambar...", { id: "upload" });
    const url = await handleFileUpload(e.target.files[0]);
    if (url) {
      callback(url);
      toast.success("Gambar berhasil diunggah", { id: "upload" });
    } else {
      toast.error("Gagal mengunggah gambar", { id: "upload" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("capacity", capacity);
    formData.append("description", description);
    formData.append("categoryId", categoryId.toString());
    formData.append("completionDate", completionDate);
    formData.append("imageUrl", imageUrl);
    if (brochureUrl) formData.append("brochureUrl", brochureUrl);
    if (brochureFile) formData.append("brochureFile", brochureFile);
    if (isPublished) formData.append("isPublished", "on");
    
    // Add contentData as JSON string
    formData.append("contentData", JSON.stringify(contentData));

    let result;
    if (initialData) {
      result = await updateProject(initialData.id, formData);
    } else {
      result = await createProject(formData);
    }

    if (result.success) {
      toast.success(initialData ? "Proyek berhasil diperbarui" : "Proyek berhasil ditambahkan");
      
      if (!initialData && 'id' in result && result.id) {
        // Redirect to edit page for the newly created project so they can continue editing
        router.push(`/admin/projects/edit/${result.id}`);
      } else {
        // Just refresh the current data if they are already on the edit page
        router.refresh();
      }
    } else {
      toast.error(result.message || "Gagal menyimpan proyek");
    }
    setLoading(false);
  };

  const tabs = [
    { id: "basic", label: "Info Dasar" },
    { id: "overview", label: "Overview & Info" },
    { id: "media", label: "Equipment & Timeline" },
    { id: "feedback", label: "Testimonial & Maps" },
    { id: "gallery", label: "Before/After & Gallery" },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-6 flex items-center space-x-4">
        <Link href="/admin/projects" className="text-white/30 hover:text-gold transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
          {initialData ? "Edit Proyek" : "Tambah Proyek Baru"}
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 mb-6 hide-scrollbar pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab.id ? "bg-gold text-navy-dark" : "bg-navy-light text-white/60 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-navy-light rounded-xl p-6 border border-white/[0.06]">
        
        {/* TAB 1: BASIC INFO */}
        {activeTab === "basic" && (
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase mb-1.5">Nama Proyek *</label>
                <input required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase mb-1.5">Kategori</label>
                <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white">
                  <option value="">Pilih Kategori...</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase mb-1.5">Lokasi</label>
                <input value={location} onChange={e => setLocation(e.target.value)} className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase mb-1.5">Kapasitas</label>
                <input value={capacity} onChange={e => setCapacity(e.target.value)} className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase mb-1.5">Deskripsi Singkat</label>
              <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white resize-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase mb-1.5">Tanggal Selesai</label>
                <input type="date" value={completionDate} onChange={e => setCompletionDate(e.target.value)} className="w-full px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white [color-scheme:dark]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase mb-1.5">Gambar Cover (Hero)</label>
                <div className="flex gap-2">
                  <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="URL atau upload ->" className="flex-1 px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white" />
                  <label className="bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-lg cursor-pointer flex items-center justify-center transition-colors">
                    <Upload className="w-4 h-4 text-white" />
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, setImageUrl)} />
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase mb-1.5">File Brosur (PDF)</label>
                <div className="flex gap-2">
                  <input value={brochureFile ? brochureFile.name : brochureUrl} onChange={e => setBrochureUrl(e.target.value)} placeholder="Tidak ada brosur terpilih" readOnly className="flex-1 px-4 py-2.5 bg-navy border border-white/[0.08] rounded-lg text-white/50 cursor-not-allowed" />
                  <label className="bg-white/10 hover:bg-white/20 px-6 py-2.5 rounded-lg cursor-pointer flex items-center justify-center transition-colors text-white font-medium text-sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload PDF
                    <input type="file" accept=".pdf" className="hidden" onChange={e => {
                      if (e.target.files && e.target.files[0]) {
                        setBrochureFile(e.target.files[0]);
                      }
                    }} />
                  </label>
                  {brochureUrl && (
                    <a href={brochureUrl} target="_blank" rel="noreferrer" className="bg-gold/10 hover:bg-gold/20 text-gold px-4 py-2.5 rounded-lg flex items-center justify-center transition-colors">
                      Lihat File
                    </a>
                  )}
                </div>
                <p className="text-white/40 text-[10px] mt-1.5">Upload file brosur resmi yang sudah didesain (Misal: dari Canva/Illustrator). Akan muncul di tombol Download Brochure.</p>
              </div>
            </div>

            <label className="flex items-center space-x-3 cursor-pointer mt-4">
              <input type="checkbox" checked={isPublished} onChange={e => setIsPublished(e.target.checked)} className="w-5 h-5 rounded border-white/20 bg-navy text-gold focus:ring-gold/30" />
              <span className="text-white/80 font-medium">Publikasikan Proyek</span>
            </label>
          </div>
        )}

        {/* TAB 2: OVERVIEW & SPECS */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-navy p-5 rounded-lg border border-white/[0.05]">
              <h3 className="text-gold font-bold mb-4 border-b border-white/[0.05] pb-2">Quick Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['solarPanels', 'inverters', 'system', 'roi', 'co2Reduction'].map((key) => (
                  <div key={key}>
                    <label className="block text-xs text-white/40 uppercase mb-1">{key}</label>
                    <input 
                      value={contentData.quickStats[key as keyof typeof contentData.quickStats]} 
                      onChange={e => updateContent("quickStats", key, e.target.value)}
                      className="w-full px-3 py-2 bg-navy-light border border-white/[0.08] rounded text-white text-sm" 
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy p-5 rounded-lg border border-white/[0.05]">
              <h3 className="text-gold font-bold mb-4 border-b border-white/[0.05] pb-2">Project Overview</h3>
              <div className="space-y-4">
                {['challenge', 'solution', 'result'].map((key) => (
                  <div key={key}>
                    <label className="block text-xs text-white/40 uppercase mb-1">{key}</label>
                    <textarea 
                      rows={2}
                      value={contentData.overview[key as keyof typeof contentData.overview]} 
                      onChange={e => updateContent("overview", key, e.target.value)}
                      className="w-full px-3 py-2 bg-navy-light border border-white/[0.08] rounded text-white text-sm" 
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy p-5 rounded-lg border border-white/[0.05]">
              <h3 className="text-gold font-bold mb-4 border-b border-white/[0.05] pb-2">Project Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['client', 'industry', 'projectType', 'installation', 'duration', 'epcContractor', 'warranty', 'monitoring'].map((key) => (
                  <div key={key}>
                    <label className="block text-xs text-white/40 uppercase mb-1">{key}</label>
                    <input 
                      value={contentData.projectInfo[key as keyof typeof contentData.projectInfo]} 
                      onChange={e => updateContent("projectInfo", key, e.target.value)}
                      className="w-full px-3 py-2 bg-navy-light border border-white/[0.08] rounded text-white text-sm" 
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-navy p-5 rounded-lg border border-white/[0.05]">
              <div className="flex justify-between items-center border-b border-white/[0.05] pb-2 mb-4">
                <h3 className="text-gold font-bold">Technical Specifications</h3>
                <button type="button" onClick={() => setContentData(p => ({...p, technicalSpecs: [...p.technicalSpecs, {label: '', value: ''}]}))} className="text-xs bg-gold text-navy px-2 py-1 rounded">Tambah Spec</button>
              </div>
              <div className="space-y-2">
                {contentData.technicalSpecs.map((spec, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input placeholder="Label (ex: Grid Voltage)" value={spec.label} onChange={e => {
                      const newSpecs = [...contentData.technicalSpecs];
                      newSpecs[idx].label = e.target.value;
                      setContentData({...contentData, technicalSpecs: newSpecs});
                    }} className="flex-1 px-3 py-2 bg-navy-light border border-white/[0.08] rounded text-white text-sm" />
                    <input placeholder="Value" value={spec.value} onChange={e => {
                      const newSpecs = [...contentData.technicalSpecs];
                      newSpecs[idx].value = e.target.value;
                      setContentData({...contentData, technicalSpecs: newSpecs});
                    }} className="flex-1 px-3 py-2 bg-navy-light border border-white/[0.08] rounded text-white text-sm" />
                    <button type="button" onClick={() => setItemToDelete({ type: 'technicalSpecs', index: idx })} className="bg-red-500/20 text-red-400 p-2 rounded"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MEDIA (Equipment & Timeline) */}
        {activeTab === "media" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Equipment */}
            <div className="bg-navy p-5 rounded-lg border border-white/[0.05]">
              <div className="flex justify-between items-center border-b border-white/[0.05] pb-2 mb-4">
                <h3 className="text-gold font-bold">Equipment Used</h3>
                <button type="button" onClick={() => setContentData(p => ({...p, equipment: [...p.equipment, {name: '', type: '', quantity: '', image: ''}]}))} className="text-xs bg-gold text-navy px-2 py-1 rounded">Tambah Alat</button>
              </div>
              <div className="space-y-4">
                {contentData.equipment.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start bg-navy-light p-4 rounded border border-white/[0.05]">
                    {item.image ? (
                      <div className="w-20 h-20 rounded bg-black/20 overflow-hidden relative flex-shrink-0">
                         <img src={item.image} className="object-cover w-full h-full" alt="eq" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded bg-black/20 flex items-center justify-center flex-shrink-0 border border-dashed border-white/20">
                         <label className="cursor-pointer text-xs text-white/40 text-center px-2 hover:text-white transition-colors">
                            Upload
                            <input type="file" className="hidden" onChange={e => {
                              handleImageUpload(e, (url) => {
                                const newEq = [...contentData.equipment];
                                newEq[idx].image = url;
                                setContentData({...contentData, equipment: newEq});
                              })
                            }} />
                         </label>
                      </div>
                    )}
                    
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <input placeholder="Nama Produk" value={item.name} onChange={e => {
                        const newEq = [...contentData.equipment];
                        newEq[idx].name = e.target.value;
                        setContentData({...contentData, equipment: newEq});
                      }} className="w-full px-3 py-2 bg-navy border border-white/[0.08] rounded text-white text-sm" />
                      <input placeholder="Tipe (ex: Solar Panel)" value={item.type} onChange={e => {
                        const newEq = [...contentData.equipment];
                        newEq[idx].type = e.target.value;
                        setContentData({...contentData, equipment: newEq});
                      }} className="w-full px-3 py-2 bg-navy border border-white/[0.08] rounded text-white text-sm" />
                      <input placeholder="Kuantitas (ex: 12 Units)" value={item.quantity} onChange={e => {
                        const newEq = [...contentData.equipment];
                        newEq[idx].quantity = e.target.value;
                        setContentData({...contentData, equipment: newEq});
                      }} className="w-full px-3 py-2 bg-navy border border-white/[0.08] rounded text-white text-sm" />
                      <input placeholder="Image URL (atau klik kotak upload di kiri)" value={item.image} onChange={e => {
                        const newEq = [...contentData.equipment];
                        newEq[idx].image = e.target.value;
                        setContentData({...contentData, equipment: newEq});
                      }} className="w-full px-3 py-2 bg-navy border border-white/[0.08] rounded text-white text-sm" />
                    </div>
                    <button type="button" onClick={() => setItemToDelete({ type: 'equipment', index: idx })} className="bg-red-500/20 text-red-400 p-2 rounded self-center"><Trash2 className="w-5 h-5" /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-navy p-5 rounded-lg border border-white/[0.05]">
              <div className="flex justify-between items-center border-b border-white/[0.05] pb-2 mb-4">
                <h3 className="text-gold font-bold">Installation Timeline</h3>
                <button type="button" onClick={() => setContentData(p => ({...p, timeline: [...p.timeline, {step: '', icon: 'CheckCircle2'}]}))} className="text-xs bg-gold text-navy px-2 py-1 rounded">Tambah Step</button>
              </div>
              <div className="space-y-2">
                {contentData.timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input placeholder="Nama Langkah (ex: Site Survey)" value={item.step} onChange={e => {
                      const newT = [...contentData.timeline];
                      newT[idx].step = e.target.value;
                      setContentData({...contentData, timeline: newT});
                    }} className="flex-1 px-3 py-2 bg-navy-light border border-white/[0.08] rounded text-white text-sm" />
                    <input placeholder="Lucide Icon (ex: Search, Wrench)" value={item.icon} onChange={e => {
                      const newT = [...contentData.timeline];
                      newT[idx].icon = e.target.value;
                      setContentData({...contentData, timeline: newT});
                    }} className="w-1/3 px-3 py-2 bg-navy-light border border-white/[0.08] rounded text-white text-sm" />
                    <button type="button" onClick={() => setItemToDelete({ type: 'timeline', index: idx })} className="bg-red-500/20 text-red-400 p-2 rounded"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PERFORMANCE & FEEDBACK */}
        {activeTab === "feedback" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-navy p-5 rounded-lg border border-white/[0.05]">
              <h3 className="text-gold font-bold mb-4 border-b border-white/[0.05] pb-2">Performance Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['annualEnergy', 'monthlySaving', 'carbonReduction', 'equivalentTrees'].map((key) => (
                  <div key={key}>
                    <label className="block text-xs text-white/40 uppercase mb-1">{key}</label>
                    <input 
                      value={contentData.performance[key as keyof typeof contentData.performance]} 
                      onChange={e => updateContent("performance", key, e.target.value)}
                      className="w-full px-3 py-2 bg-navy-light border border-white/[0.08] rounded text-white text-sm" 
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy p-5 rounded-lg border border-white/[0.05]">
              <h3 className="text-gold font-bold mb-4 border-b border-white/[0.05] pb-2">Testimonial Client</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-white/40 uppercase mb-1">Quote</label>
                  <textarea rows={2} value={contentData.testimonial.quote} onChange={e => updateContent("testimonial", "quote", e.target.value)} className="w-full px-3 py-2 bg-navy-light border border-white/[0.08] rounded text-white text-sm" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-white/40 uppercase mb-1">Nama</label>
                    <input value={contentData.testimonial.name} onChange={e => updateContent("testimonial", "name", e.target.value)} className="w-full px-3 py-2 bg-navy-light border border-white/[0.08] rounded text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 uppercase mb-1">Jabatan & Perusahaan</label>
                    <input placeholder="CTO, PT Maju" value={contentData.testimonial.title} onChange={e => updateContent("testimonial", "title", e.target.value)} className="w-full px-3 py-2 bg-navy-light border border-white/[0.08] rounded text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 uppercase mb-1">URL Avatar (atau Upload)</label>
                    <div className="flex gap-2">
                      <input value={contentData.testimonial.avatar} onChange={e => updateContent("testimonial", "avatar", e.target.value)} className="flex-1 px-3 py-2 bg-navy-light border border-white/[0.08] rounded text-white text-sm" />
                      <label className="bg-white/10 hover:bg-white/20 p-2 rounded cursor-pointer transition-colors">
                        <Upload className="w-4 h-4" />
                        <input type="file" className="hidden" onChange={e => handleImageUpload(e, (url) => updateContent("testimonial", "avatar", url))} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-navy p-5 rounded-lg border border-white/[0.05]">
              <h3 className="text-gold font-bold mb-4 border-b border-white/[0.05] pb-2">Map Info</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['address', 'coords', 'city', 'province'].map((key) => (
                  <div key={key}>
                    <label className="block text-xs text-white/40 uppercase mb-1">{key}</label>
                    <input 
                      value={contentData.map[key as keyof typeof contentData.map]} 
                      onChange={e => updateContent("map", key, e.target.value)}
                      className="w-full px-3 py-2 bg-navy-light border border-white/[0.08] rounded text-white text-sm" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: GALLERY */}
        {activeTab === "gallery" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-navy p-5 rounded-lg border border-white/[0.05]">
              <h3 className="text-gold font-bold mb-4 border-b border-white/[0.05] pb-2">Before & After Installation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-white/40 uppercase mb-2">Before Image</label>
                  {contentData.beforeAfter.before ? (
                    <div className="relative h-40 rounded bg-black/30 overflow-hidden mb-2">
                       <img src={contentData.beforeAfter.before} className="object-cover w-full h-full" />
                       <button type="button" onClick={() => setItemToDelete({ type: 'beforeAfter', field: 'before' })} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"><Trash2 className="w-4 h-4"/></button>
                    </div>
                  ) : (
                    <div className="h-40 rounded border border-dashed border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors mb-2 cursor-pointer">
                       <label className="cursor-pointer text-center w-full h-full flex items-center justify-center">
                          <span className="text-sm text-white/50">Upload Before Image</span>
                          <input type="file" className="hidden" onChange={e => handleImageUpload(e, (url) => updateContent("beforeAfter", "before", url))} />
                       </label>
                    </div>
                  )}
                  <input placeholder="Atau paste URL disini" value={contentData.beforeAfter.before} onChange={e => updateContent("beforeAfter", "before", e.target.value)} className="w-full px-3 py-2 bg-navy-light border border-white/[0.08] rounded text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-white/40 uppercase mb-2">After Image</label>
                  {contentData.beforeAfter.after ? (
                    <div className="relative h-40 rounded bg-black/30 overflow-hidden mb-2">
                       <img src={contentData.beforeAfter.after} className="object-cover w-full h-full" />
                       <button type="button" onClick={() => setItemToDelete({ type: 'beforeAfter', field: 'after' })} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"><Trash2 className="w-4 h-4"/></button>
                    </div>
                  ) : (
                    <div className="h-40 rounded border border-dashed border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors mb-2 cursor-pointer">
                       <label className="cursor-pointer text-center w-full h-full flex items-center justify-center">
                          <span className="text-sm text-white/50">Upload After Image</span>
                          <input type="file" className="hidden" onChange={e => handleImageUpload(e, (url) => updateContent("beforeAfter", "after", url))} />
                       </label>
                    </div>
                  )}
                  <input placeholder="Atau paste URL disini" value={contentData.beforeAfter.after} onChange={e => updateContent("beforeAfter", "after", e.target.value)} className="w-full px-3 py-2 bg-navy-light border border-white/[0.08] rounded text-white text-sm" />
                </div>
              </div>
            </div>

            <div className="bg-navy p-5 rounded-lg border border-white/[0.05]">
              <div className="flex justify-between items-center border-b border-white/[0.05] pb-2 mb-4">
                <h3 className="text-gold font-bold">Project Gallery</h3>
                <button type="button" onClick={() => setContentData(p => ({...p, gallery: [...(p.gallery || []), '']}))} className="text-xs bg-gold text-navy px-2 py-1 rounded">Tambah Gambar</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(contentData.gallery || []).map((imgUrl, idx) => (
                  <div key={idx} className="relative group">
                    <label className="block text-xs text-white/40 uppercase mb-2">Gambar {idx + 1}</label>
                    {imgUrl ? (
                      <div className="relative h-32 rounded bg-black/30 overflow-hidden mb-2 border border-white/10">
                         <img src={imgUrl} className="object-cover w-full h-full" alt="gallery" />
                         <button type="button" onClick={() => setItemToDelete({ type: 'gallery', index: idx })} className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4"/></button>
                      </div>
                    ) : (
                      <div className="h-32 rounded border border-dashed border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors mb-2 cursor-pointer">
                         <label className="cursor-pointer text-center w-full h-full flex flex-col items-center justify-center">
                            <Upload className="w-5 h-5 text-white/40 mb-1" />
                            <span className="text-xs text-white/50">Upload</span>
                            <input type="file" className="hidden" onChange={e => handleImageUpload(e, (url) => {
                              const newG = [...(contentData.gallery || [])];
                              newG[idx] = url;
                              setContentData({...contentData, gallery: newG});
                            })} />
                         </label>
                      </div>
                    )}
                    <input placeholder="URL gambar..." value={imgUrl} onChange={e => {
                      const newG = [...(contentData.gallery || [])];
                      newG[idx] = e.target.value;
                      setContentData({...contentData, gallery: newG});
                    }} className="w-full px-2 py-1.5 bg-navy-light border border-white/[0.08] rounded text-white text-xs" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <button 
            type="submit" 
            disabled={loading}
            className="flex items-center space-x-2 bg-gold hover:bg-gold/90 text-navy-dark px-8 py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-gold/20"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
            <span>{initialData ? "Simpan Perubahan" : "Simpan Proyek"}</span>
          </button>
        </div>
      </form>

      <Modal isOpen={itemToDelete !== null} onClose={() => setItemToDelete(null)} title="Konfirmasi Hapus">
        <p className="text-white/50 mb-6">Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan setelah form disimpan.</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setItemToDelete(null)}
            className="px-4 py-2 border border-white/[0.08] text-white/50 rounded-lg hover:bg-white/[0.04] transition-colors"
          >
            Batal
          </button>
          <button
            onClick={confirmDeleteInner}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            <span>Ya, Hapus</span>
          </button>
        </div>
      </Modal>
    </div>
  );
}
