"use client";

import { motion } from "framer-motion";

interface TechnicalSpecsProps {
  specs: {
    label: string;
    value: string;
  }[];
}

export default function TechnicalSpecs({ specs }: TechnicalSpecsProps) {
  if (!specs || specs.length === 0) return null;

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-heading font-bold text-navy mb-4">Technical Specifications</h2>
        <div className="w-16 h-1 bg-gold mx-auto rounded-full"></div>
      </div>
      
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-300 shadow-sm">
        <table className="w-full text-left text-sm md:text-base border-collapse">
          <tbody>
            {specs.map((spec, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors border-b border-gray-300 last:border-0">
                <th className="py-4 px-6 md:px-8 font-semibold text-gray-700 w-1/2 md:w-1/3 bg-gray-50/80 border-r border-gray-300">
                  {spec.label}
                </th>
                <td className="py-4 px-6 md:px-8 text-navy font-bold">
                  {spec.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
