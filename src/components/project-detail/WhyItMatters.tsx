"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface WhyItMattersProps {
  reasons: string[];
}

export default function WhyItMatters({ reasons }: WhyItMattersProps) {
  if (!reasons || reasons.length === 0) return null;

  return (
    <div className="mb-20">
      <div className="bg-navy rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-10 md:p-16 flex flex-col justify-center">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Why This Project Matters</h2>
            <div className="w-16 h-1 bg-gold rounded-full mb-8"></div>
            
            <p className="text-gray-300 mb-8 leading-relaxed">
              Transisi ke energi surya bukan hanya sekadar investasi teknologi, tetapi merupakan langkah strategis untuk keberlanjutan bisnis dan lingkungan.
            </p>

            <ul className="space-y-4">
              {reasons.map((reason, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex items-start"
                >
                  <CheckCircle2 className="w-6 h-6 text-gold mr-4 flex-shrink-0" />
                  <span className="text-white/90 font-medium">{reason}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div className="relative h-64 lg:h-auto min-h-[400px]">
            <Image 
              src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop"
              alt="Sustainability impact"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
