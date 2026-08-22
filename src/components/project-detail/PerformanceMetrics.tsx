"use client";

import { motion, Variants } from "framer-motion";
import { Zap, DollarSign, CloudRain, TreePine } from "lucide-react";

interface PerformanceProps {
  performance: {
    annualEnergy: string;
    monthlySaving: string;
    carbonReduction: string;
    equivalentTrees: string;
  };
}

export default function PerformanceMetrics({ performance }: PerformanceProps) {
  // Hide entire section if all performance values are empty
  if (!performance.annualEnergy && !performance.monthlySaving && !performance.carbonReduction && !performance.equivalentTrees) return null;

  const cards = [
    { label: "Annual Energy", value: performance.annualEnergy, icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Monthly Saving", value: performance.monthlySaving, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Carbon Reduction", value: performance.carbonReduction, icon: CloudRain, color: "text-sky-500", bg: "bg-sky-500/10" },
    { label: "Equivalent Trees", value: performance.equivalentTrees, icon: TreePine, color: "text-green-600", bg: "bg-green-600/10" }
  ];

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const item: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, type: "spring" } }
  };

  const getFontSizeClass = (text: string) => {
    if (!text) return "text-xl md:text-2xl";
    if (text.length > 15) return "text-lg md:text-base lg:text-lg";
    if (text.length > 10) return "text-xl md:text-lg lg:text-xl";
    return "text-2xl md:text-xl lg:text-2xl";
  };

  const formatNumberHelper = (text: string) => {
    if (!text) return "";
    
    // Format numbers like 150.000.000 into 150 Jt, or 1.500.000.000 to 1,5 M
    return text.replace(/\b(\d{1,3}(?:\.\d{3})+|\d{7,})\b/g, (match) => {
      const num = parseInt(match.replace(/\./g, ''), 10);
      
      if (num >= 1_000_000_000_000) {
        const formatted = Number.isInteger(num / 1_000_000_000_000) ? (num / 1_000_000_000_000) : (num / 1_000_000_000_000).toFixed(1);
        return formatted.toString().replace('.', ',') + ' T';
      }
      if (num >= 1_000_000_000) {
        const formatted = Number.isInteger(num / 1_000_000_000) ? (num / 1_000_000_000) : (num / 1_000_000_000).toFixed(1);
        return formatted.toString().replace('.', ',') + ' M';
      }
      if (num >= 1_000_000) {
        const formatted = Number.isInteger(num / 1_000_000) ? (num / 1_000_000) : (num / 1_000_000).toFixed(1);
        return formatted.toString().replace('.', ',') + ' Jt';
      }
      return match;
    });
  };

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-heading font-bold text-navy mb-4">Project Performance</h2>
        <div className="w-16 h-1 bg-gold mx-auto rounded-full mb-4"></div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {cards.map((card, idx) => (
          <motion.div key={idx} variants={item} className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center group hover:-translate-y-1 transition-transform flex flex-col justify-center items-center">
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${card.bg} ${card.color} flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <card.icon className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
            </div>
            <h4 className={`${getFontSizeClass(formatNumberHelper(card.value))} font-black text-navy mb-1.5 md:mb-2 tracking-tight break-words w-full`}>{formatNumberHelper(card.value)}</h4>
            <p className="text-gray-500 font-medium uppercase text-[10px] md:text-xs tracking-widest leading-tight">{card.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
