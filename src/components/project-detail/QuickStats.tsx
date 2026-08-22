"use client";

import { motion, Variants } from "framer-motion";
import { Zap, Server, ShieldCheck, Activity, LineChart, Leaf } from "lucide-react";

interface QuickStatsProps {
  stats: {
    solarPanels: string;
    inverters: string;
    system: string;
    roi: string;
    co2Reduction: string;
  };
  capacity: string | null;
}

export default function QuickStats({ stats, capacity }: QuickStatsProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const allStatCards = [
    { label: "Capacity", value: capacity || "", icon: Zap },
    { label: "Solar Panel", value: stats.solarPanels, icon: Server },
    { label: "Inverter", value: stats.inverters, icon: Activity },
    { label: "System", value: stats.system, icon: ShieldCheck },
    { label: "ROI", value: stats.roi, icon: LineChart },
    { label: "CO₂ Reduction", value: stats.co2Reduction, icon: Leaf },
  ];

  // Filter out cards with no value
  const statCards = allStatCards.filter(s => s.value && s.value.trim() !== '');

  // Hide entire section if no stats have values
  if (statCards.length === 0) return null;

  return (
    <div className="relative -mt-16 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="bg-navy rounded-2xl shadow-[0_20px_50px_rgb(0,0,0,0.3)] border border-white/[0.05] p-6 sm:p-8"
      >
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${Math.min(statCards.length, 6)} gap-6 lg:gap-8 divide-x-0 lg:divide-x divide-white/[0.05]`}>
          {statCards.map((stat, idx) => (
            <motion.div key={idx} variants={itemVariants} className="flex flex-col items-center text-center px-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center mb-4 text-gold mx-auto shadow-sm">
                <stat.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <p className="text-white/50 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-1.5 break-words w-full">{stat.label}</p>
              <p className="text-white font-bold text-sm md:text-base leading-tight break-words w-full">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
