"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface BeforeAfterProps {
  beforeAfter: {
    before: string;
    after: string;
  };
}

export default function BeforeAfterSection({ beforeAfter }: BeforeAfterProps) {
  if (!beforeAfter || !beforeAfter.before || !beforeAfter.after) return null;

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-heading font-bold text-navy mb-4">Transformation</h2>
        <div className="w-16 h-1 bg-gold mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden aspect-video border border-gray-200 shadow-sm group"
        >
          <Image 
            src={beforeAfter.before} 
            alt="Before Installation" 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase shadow-lg">
            Before
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden aspect-video border border-gray-200 shadow-sm group"
        >
          <Image 
            src={beforeAfter.after} 
            alt="After Installation" 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute top-4 left-4 bg-gold text-navy px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase shadow-lg">
            After
          </div>
        </motion.div>
      </div>
    </div>
  );
}
