"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import { Search } from "lucide-react";

import { Category } from "@prisma/client";

export default function ProductFilter({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(search, category);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, category]);

  const handleSearch = (q: string, cat: string) => {
    const params = new URLSearchParams(searchParams);
    if (q) {
      params.set("q", q);
    } else {
      params.delete("q");
    }

    if (cat) {
      params.set("category", cat);
    } else {
      params.delete("category");
    }

    startTransition(() => {
      router.push(`/product?${params.toString()}`);
    });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-gold focus:border-gold sm:text-sm"
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="md:w-64 relative">
        <button
          type="button"
          className="flex items-center justify-between w-full pl-3 pr-3 py-2 text-base border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold sm:text-sm rounded-lg text-navy bg-white"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
        >
          <span className="block truncate text-left flex-grow">
            {category === "" 
              ? "Semua Kategori" 
              : categories.find(c => c.id.toString() === category)?.name || "Semua Kategori"}
          </span>
          <span className="pointer-events-none flex items-center">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            <div
              className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gold/10 ${category === "" ? "text-gold bg-gold/5 font-medium" : "text-gray-900"}`}
              onClick={() => {
                setCategory("");
                setIsDropdownOpen(false);
              }}
            >
              Semua Kategori
            </div>
            {categories.map((cat) => (
              <div
                key={cat.id}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gold/10 ${category === cat.id.toString() ? "text-gold bg-gold/5 font-medium" : "text-gray-900"}`}
                onClick={() => {
                  setCategory(cat.id.toString());
                  setIsDropdownOpen(false);
                }}
              >
                {cat.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
