"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";

export default function CTASection() {
  const waText = encodeURIComponent("Halo Sun Global Energi, saya tertarik untuk membangun proyek solar panel serupa.");
  
  return (
    <div className="relative rounded-3xl overflow-hidden mt-10 mb-10 shadow-2xl">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-12009a308569?q=80&w=2000&auto=format&fit=crop')" }}
      ></div>
      <div className="absolute inset-0 bg-navy-dark/80 backdrop-blur-[2px]"></div>

      {/* Content */}
      <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-6">
            Ready to Build Your Solar Project?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Bergabunglah dengan puluhan perusahaan lainnya yang telah mempercayakan transisi energi mereka kepada tim engineering bersertifikat kami.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a 
              href="/contact"
              className="w-full sm:w-auto flex items-center justify-center bg-gold hover:bg-white text-navy-dark px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl group"
            >
              Request Consultation
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <a 
                href={`https://wa.me/628128641924?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-4 rounded-xl font-medium transition-colors backdrop-blur-sm"
              >
                <Phone className="w-5 h-5 mr-2" />
                WhatsApp
              </a>
              <a 
                href="mailto:info@sunglobal.id"
                className="flex-1 sm:flex-none flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-4 rounded-xl font-medium transition-colors backdrop-blur-sm"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
