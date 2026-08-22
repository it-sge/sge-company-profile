"use client";

import { motion, Variants } from "framer-motion";
import { Target, Lightbulb, TrendingUp } from "lucide-react";

interface OverviewSectionProps {
  overview: {
    challenge: string;
    solution: string;
    result: string;
  };
}

export default function OverviewSection({ overview }: OverviewSectionProps) {
  // Hide entire section if all fields are empty
  if (!overview.challenge && !overview.solution && !overview.result) return null;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const cards = [
    {
      title: "The Challenge",
      content: overview.challenge,
      icon: Target,
      color: "text-red-500",
      bg: "bg-gradient-to-br from-red-500/20 to-red-500/5",
      border: "border-red-500/20"
    },
    {
      title: "Our Solution",
      content: overview.solution,
      icon: Lightbulb,
      color: "text-blue-500",
      bg: "bg-gradient-to-br from-blue-500/20 to-blue-500/5",
      border: "border-blue-500/20"
    },
    {
      title: "The Result",
      content: overview.result,
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-gradient-to-br from-emerald-500/20 to-emerald-500/5",
      border: "border-emerald-500/20"
    }
  ];

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-heading font-bold text-navy mb-4">Project Overview</h2>
        <div className="w-16 h-1 bg-gold mx-auto rounded-full"></div>
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {cards.map((card, idx) => (
          <motion.div 
            key={idx}
            variants={cardVariants}
            className={`rounded-2xl p-8 border ${card.border} bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-shadow flex flex-col items-center`}
          >
            <div className={`w-14 h-14 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center mb-6 shadow-sm`}>
              <card.icon className="w-7 h-7" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-navy mb-4 text-center">{card.title}</h3>
            <p className="text-gray-600 leading-relaxed text-justify w-full">{card.content}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
