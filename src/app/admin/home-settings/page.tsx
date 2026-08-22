import prisma from "@/lib/prisma";
import SettingsForm from "./SettingsForm";

export default async function HomeSettingsPage() {
  let settingsMap: Record<string, string> = {};
  let values: any[] = [];
  let advantages: any[] = [];
  let projects: any[] = [];
  
  try {
    const settings = await prisma.siteSetting.findMany();
    settings.forEach(s => settingsMap[s.key] = s.value);

    values = await prisma.value.findMany({ orderBy: { order: 'asc' } });
    advantages = await prisma.advantage.findMany({ orderBy: { order: 'asc' } });
    projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });
  } catch (error) {
    console.error("Database error:", error);
  }

  return (
    <div className="max-w-6xl">
      <div className="bg-navy-light rounded-xl border border-white/[0.06]">
        <SettingsForm 
          initialData={settingsMap} 
          values={values}
          advantages={advantages}
          projects={projects}
        />
      </div>
    </div>
  );
}
