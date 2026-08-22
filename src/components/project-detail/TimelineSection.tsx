"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Truck, Wrench, Activity, Settings, CheckCircle2 } from "lucide-react";

interface TimelineProps {
  timeline: {
    step: string;
    icon: string;
  }[];
}

const IconMap: Record<string, any> = {
  Search,
  PenTool,
  Truck,
  Wrench,
  Activity,
  Settings
};

export default function TimelineSection({ timeline }: TimelineProps) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="mb-20 bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 rounded-3xl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-heading font-bold text-navy mb-4">Installation Timeline</h2>
          <div className="w-16 h-1 bg-gold mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our standard operating procedure guarantees zero downtime for your main business operations.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform md:-translate-x-1/2"></div>
          
          <div className="space-y-12">
            {timeline.map((item, idx) => {
              const Icon = IconMap[item.icon] || CheckCircle2;
              const isEven = idx % 2 === 0;

              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 w-16 h-16 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center transform -translate-x-1/2 shadow-lg z-10">
                    <div className="w-10 h-10 bg-gold/20 text-gold rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Content Box */}
                  <div className={`ml-20 md:ml-0 w-full md:w-1/2 ${isEven ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="text-sm font-bold text-gold mb-1">Phase 0{idx + 1}</div>
                      <h4 className="text-xl font-bold text-navy">{item.step}</h4>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
