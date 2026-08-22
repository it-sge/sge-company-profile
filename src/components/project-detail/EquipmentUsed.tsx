"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface EquipmentProps {
  equipment: {
    name: string;
    type: string;
    quantity: string;
    image: string;
  }[];
}

export default function EquipmentUsed({ equipment }: EquipmentProps) {
  if (!equipment || equipment.length === 0) return null;

  return (
    <div className="mb-20 bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 rounded-3xl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-navy mb-4">Equipment Used</h2>
          <div className="w-16 h-1 bg-gold mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We use only Tier-1 solar components to ensure maximum reliability, efficiency, and longevity for your solar asset.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipment.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow group flex flex-col"
            >
              <div className="h-48 relative overflow-hidden bg-gray-100">
                <Image 
                  src={item.image} 
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <span className="text-xs font-bold text-gold uppercase tracking-wider mb-2">{item.type}</span>
                <h4 className="text-xl font-bold text-navy mb-4 flex-grow">{item.name}</h4>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                  <div className="text-sm font-medium text-gray-500">
                    Qty: <span className="text-navy font-bold">{item.quantity}</span>
                  </div>
                  <Link href="/product" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-gold group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
