import prisma from "@/lib/prisma";
import SiteSettingsForm from "./SiteSettingsForm";

export default async function SiteSettingsPage() {
  const settingsRecords = await prisma.siteSetting.findMany();
  
  const settings: Record<string, string> = {};
  settingsRecords.forEach(record => {
    settings[record.key] = record.value;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-white mb-2">Pengaturan Situs</h1>
        <p className="text-white/60">Kelola informasi kontak dan pengaturan umum situs Anda.</p>
      </div>

      <SiteSettingsForm settings={settings} />
    </div>
  );
}
