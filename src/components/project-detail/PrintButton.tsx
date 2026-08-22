"use client";

import { FileText } from "lucide-react";

export default function PrintButton({ brochureUrl }: { brochureUrl: string }) {
  if (!brochureUrl) return null;

  return (
    <a 
      href={brochureUrl}
      download
      target="_blank"
      rel="noopener noreferrer"
      className="w-full flex items-center justify-center bg-white hover:bg-gray-50 border border-gray-200 text-navy-dark px-4 py-3.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-md print:hidden"
    >
      <FileText className="w-5 h-5 mr-2" />
      Download Brochure
    </a>
  );
}
