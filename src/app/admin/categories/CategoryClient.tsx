"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Tag, Loader2 } from "lucide-react";
import { deleteCategory } from "../actions";
import { toast } from "react-hot-toast";
import CategoryFormModal from "./CategoryFormModal";
import Modal from "@/components/ui/Modal";
import { Category } from "@prisma/client";

type CategoryWithCount = Category & { _count: { products: number, projects: number } };

export default function CategoryClient({ initialCategories }: { initialCategories: CategoryWithCount[] }) {
  const [activeTab, setActiveTab] = useState<"product" | "project">("product");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryWithCount | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("adminCategoryTab");
    if (saved === "product" || saved === "project") {
      setActiveTab(saved);
    }
  }, []);

  const handleTabChange = (tab: "product" | "project") => {
    setActiveTab(tab);
    localStorage.setItem("adminCategoryTab", tab);
  };

  const filteredCategories = initialCategories.filter(c => c.type === activeTab);

  const confirmDelete = async () => {
    if (categoryToDelete === null) return;
    setIsDeleting(categoryToDelete);
    const res = await deleteCategory(categoryToDelete);
    if (res.success) {
      toast.success("Kategori berhasil dihapus");
      setCategoryToDelete(null);
    } else {
      toast.error(res.message || "Gagal menghapus kategori");
    }
    setIsDeleting(null);
  };

  const handleEdit = (category: CategoryWithCount) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-navy-light rounded-xl border border-white/[0.06] overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => handleTabChange("product")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "product"
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:bg-white/5 hover:text-white/80"
              }`}
            >
              Kategori Produk
            </button>
            <button
              onClick={() => handleTabChange("project")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "project"
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:bg-white/5 hover:text-white/80"
              }`}
            >
              Kategori Proyek
            </button>
          </div>
          <button 
            onClick={handleAddNew}
            className="flex items-center space-x-2 bg-gold/10 hover:bg-gold/20 text-gold font-medium px-4 py-2 rounded-lg transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Tambah Kategori</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/[0.06] text-white/40 text-xs uppercase tracking-wider">
                <th className="px-5 py-4 font-semibold">Nama Kategori</th>
                <th className="px-5 py-4 font-semibold hidden sm:table-cell">Slug</th>
                <th className="px-5 py-4 font-semibold hidden md:table-cell">Deskripsi</th>
                <th className="px-5 py-4 font-semibold text-center">
                  {activeTab === "product" ? "Jumlah Produk" : "Jumlah Proyek"}
                </th>
                <th className="px-5 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-white/30 text-sm">
                    Belum ada kategori yang ditambahkan di tab ini.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-medium text-white text-sm">{category.name}</p>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <p className="text-white/50 text-sm">{category.slug}</p>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell max-w-xs">
                      <p className="text-white/50 text-sm truncate">{category.description || "-"}</p>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/[0.05] text-white/70">
                        {activeTab === "product" ? category._count.products : category._count.projects}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setCategoryToDelete(category.id)}
                          disabled={isDeleting === category.id}
                          className="p-2 text-white/40 hover:text-red-400 bg-white/5 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50"
                          title="Hapus"
                        >
                          {isDeleting === category.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CategoryFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        category={selectedCategory} 
        type={activeTab}
      />

      <Modal isOpen={categoryToDelete !== null} onClose={() => !isDeleting && setCategoryToDelete(null)} title="Hapus Kategori">
        <p className="text-white/50 mb-6">Apakah Anda yakin ingin menghapus kategori ini? Tindakan ini tidak dapat dibatalkan.</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setCategoryToDelete(null)}
            disabled={isDeleting !== null}
            className="px-4 py-2 border border-white/[0.08] text-white/50 rounded-lg hover:bg-white/[0.04] transition-colors"
          >
            Batal
          </button>
          <button
            onClick={confirmDelete}
            disabled={isDeleting !== null}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50"
          >
            {isDeleting !== null && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>Ya, Hapus</span>
          </button>
        </div>
      </Modal>
    </>
  );
}
