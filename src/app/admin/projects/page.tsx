import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import Image from "next/image";
import DeleteProjectButton from "./DeleteProjectButton";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">Kelola Proyek</h2>
        <Link 
          href="/admin/projects/new" 
          className="bg-gold hover:bg-gold-light text-navy-dark font-bold py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Proyek</span>
        </Link>
      </div>
      
      <div className="bg-navy-light rounded-xl overflow-hidden border border-white/[0.06]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/[0.06]">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th scope="col" className="px-5 py-3 text-left text-[11px] font-semibold text-white/30 uppercase tracking-wider">Gambar</th>
                <th scope="col" className="px-5 py-3 text-left text-[11px] font-semibold text-white/30 uppercase tracking-wider">Nama</th>
                <th scope="col" className="px-5 py-3 text-left text-[11px] font-semibold text-white/30 uppercase tracking-wider">Lokasi/Kapasitas</th>
                <th scope="col" className="px-5 py-3 text-left text-[11px] font-semibold text-white/30 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-5 py-3 text-right text-[11px] font-semibold text-white/30 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <div className="h-10 w-16 rounded-lg overflow-hidden bg-white/[0.06] relative border border-white/[0.06]">
                      {project.imageUrl ? (
                        <Image src={project.imageUrl} alt={project.name} fill className="object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-xs text-white/20">—</div>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="text-sm font-medium text-white/80">{project.name}</div>
                    <div className="text-xs text-white/25 truncate max-w-xs">{project.description}</div>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <div className="text-sm text-white/60">{project.location}</div>
                    <div className="text-xs text-white/30">{project.capacity}</div>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${
                      project.isPublished 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-white/[0.04] text-white/30 border border-white/[0.06]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${project.isPublished ? 'bg-emerald-400' : 'bg-white/20'}`} />
                      {project.isPublished ? 'Dipublikasikan' : 'Draf'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end space-x-3">
                      <Link href={`/admin/projects/edit/${project.id}`} className="text-white/30 hover:text-gold transition-colors">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <DeleteProjectButton id={project.id} />
                    </div>
                  </td>
                </tr>
              ))}
              
              {projects.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-sm text-white/20">
                    Belum ada proyek. Tambahkan proyek pertama Anda!
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
