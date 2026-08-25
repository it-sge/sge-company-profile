"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2, Save, Image as ImageIcon, Upload } from "lucide-react";
import { updateSiteSettings } from "../actions";
import Image from "next/image";

interface SiteSettingsFormProps {
  settings: Record<string, string>;
}

export default function SiteSettingsForm({ settings }: SiteSettingsFormProps) {
  const [loading, setLoading] = useState(false);
  const [previewNavImage, setPreviewNavImage] = useState<string>(settings.mobile_nav_image || "https://images.unsplash.com/photo-1508514177221-188b1c77eca2?q=80&w=800");

  const handleNavImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewNavImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await updateSiteSettings(formData);
    
    if (result.success) {
      toast.success("Site settings updated successfully!");
    } else {
      toast.error(result.message || "Failed to update site settings");
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-heading font-bold text-gold mb-6">Contact & Location Information</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Head Quarter Address</label>
            <textarea 
              name="hq_address"
              defaultValue={settings.hq_address || ""}
              rows={3}
              className="w-full bg-navy border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-colors resize-none"
              placeholder="e.g. Gd. Wisma 81, Jln Cideng Barat No. 81, Jakarta Pusat..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Warehouse Address</label>
            <textarea 
              name="warehouse_address"
              defaultValue={settings.warehouse_address || ""}
              rows={3}
              className="w-full bg-navy border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-colors resize-none"
              placeholder="e.g. Kawasan Pergudangan Modern Cikande..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Phone Number 1</label>
              <input 
                type="text"
                name="hq_phone1"
                defaultValue={settings.hq_phone1 || ""}
                className="w-full bg-navy border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-colors"
                placeholder="+62 21 386 2351"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Phone Number 2</label>
              <input 
                type="text"
                name="hq_phone2"
                defaultValue={settings.hq_phone2 || ""}
                className="w-full bg-navy border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-colors"
                placeholder="+62 21 386 2350"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
              <input 
                type="email"
                name="contact_email"
                defaultValue={settings.contact_email || ""}
                className="w-full bg-navy border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-colors"
                placeholder="contact@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">WhatsApp Number</label>
              <input 
                type="text"
                name="contact_whatsapp"
                defaultValue={settings.contact_whatsapp || ""}
                className="w-full bg-navy border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-colors"
                placeholder="0812-3456-7890"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-heading font-bold text-gold mb-6">Mobile Navigation Settings</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Navigation Banner Image</label>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-64 h-40 bg-navy border border-white/10 rounded-xl overflow-hidden relative flex-shrink-0">
                <Image src={previewNavImage} alt="Nav Preview" fill className="object-cover" unoptimized={typeof previewNavImage === 'string' && previewNavImage.startsWith('/uploads')} />
              </div>
              <div className="flex-grow space-y-4 w-full">
                <div>
                  <label className="block text-xs text-white/50 mb-1">Image URL</label>
                  <div className="flex relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ImageIcon className="h-4 w-4 text-white/40" />
                    </div>
                    <input 
                      type="text"
                      name="navImageUrl"
                      defaultValue={settings.mobile_nav_image || ""}
                      onChange={(e) => setPreviewNavImage(e.target.value)}
                      className="w-full bg-navy border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-colors text-sm"
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1">Or Upload File</label>
                  <label className="flex items-center justify-center w-full bg-navy border border-white/10 hover:border-gold/30 hover:bg-white/[0.02] border-dashed rounded-xl px-4 py-3 text-white cursor-pointer transition-colors">
                    <Upload className="w-4 h-4 mr-2 text-white/60" />
                    <span className="text-sm text-white/60">Choose file...</span>
                    <input 
                      type="file" 
                      name="navImageFile" 
                      accept="image/*" 
                      onChange={handleNavImageChange}
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>
            </div>
            <p className="text-xs text-white/40 mt-3">This image appears at the bottom of the mobile navigation sidebar. Recommended size: 800x400 (Landscape).</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          type="submit" 
          disabled={loading}
          className="flex items-center space-x-2 bg-gold hover:bg-gold-light text-navy-dark font-bold px-8 py-4 rounded-xl transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          <span>Save Site Settings</span>
        </button>
      </div>
    </form>
  );
}
