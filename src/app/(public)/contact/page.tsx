import { getSiteSettings } from "@/lib/cached-queries";
import ContactForm from "./ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hubungi Kami | Konsultasi Proyek PLTS",
  description: "Hubungi Sun Global Energi untuk konsultasi gratis mengenai instalasi panel surya, layanan EPC, O&M, dan pembiayaan PLTS untuk bisnis dan industri Anda.",
  keywords: ["Hubungi Sun Global Energi", "Kontak EPC Solar", "Konsultasi Panel Surya", "Alamat Sun Global Energi", "Customer Service PLTS"],
};

export const revalidate = 60;

export default async function ContactPage() {
  let settingsMap: Record<string, string> = {};
  try {
    settingsMap = await getSiteSettings();
  } catch (error) {
    console.error(error);
  }

  const hqAddress = settingsMap['hq_address'] || 'Gd. Wisma 81, Jln Cideng Barat No. 81, Jakarta Pusat 10150 Indonesia';
  const warehouseAddress = settingsMap['warehouse_address'] || 'Kawasan Pergudangan Modern Cikande Blok BG/5 Bandung, Kab. Serang, Banten, Indonesia 42179';
  const phone1 = settingsMap['hq_phone1'] || '+62 21 386 2351';
  const phone2 = settingsMap['hq_phone2'] || '+62 21 386 2350';
  const email = settingsMap['contact_email'] || 'rizki.arrisyantoro@bachgroup.co.id';
  const whatsapp = settingsMap['contact_whatsapp'] || '0812-8641-924';

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-navy font-heading font-black text-4xl md:text-6xl mb-6 tracking-tight">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-600">Touch</span>
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-gold to-yellow-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Ready to transition to solar energy? Get in touch with our experts for a comprehensive consultation tailored to your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Contact Info & Map */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Headquarters Card */}
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col">
                <div className="w-12 h-12 bg-navy/5 rounded-2xl flex items-center justify-center mb-5">
                  <MapPin className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-heading font-bold text-xl text-navy mb-3">Headquarters</h3>
                <p className="text-slate/80 text-sm leading-relaxed flex-grow">{hqAddress}</p>
              </div>

              {/* Warehouse Card */}
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col">
                <div className="w-12 h-12 bg-navy/5 rounded-2xl flex items-center justify-center mb-5">
                  <MapPin className="w-6 h-6 text-navy" />
                </div>
                <h3 className="font-heading font-bold text-xl text-navy mb-3">Warehouse</h3>
                <p className="text-slate/80 text-sm leading-relaxed flex-grow">{warehouseAddress}</p>
              </div>

              {/* Contact Details Card */}
              <div className="bg-navy p-6 md:p-8 rounded-3xl shadow-xl flex flex-col sm:col-span-2 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                
                <h3 className="font-heading font-bold text-2xl text-gold mb-6 relative z-10">Direct Contact</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">Phone</p>
                      <p className="font-medium text-sm">{phone1} <br/> {phone2}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">Email</p>
                      <p className="font-medium text-sm">{email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 md:col-span-2">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">Business Hours</p>
                      <p className="font-medium text-sm">Monday - Friday, 09:00 AM - 17:00 PM</p>
                    </div>
                  </div>
                </div>

                <a 
                  href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-8 w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 relative z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Google Map */}
            <div className="w-full h-80 sm:h-96 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.648073805275!2d106.80952707462713!3d-6.177841993809597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f680b48bfc9f%3A0x3f5bb1f7a099db81!2sWisma%2081!5e0!3m2!1sid!2sid!4v1784845752450!5m2!1sid!2sid" 
                className="w-full h-full border-0" 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 sticky top-32">
              <div className="mb-8">
                <h2 className="text-3xl font-heading font-bold text-navy mb-2">Send Message</h2>
                <p className="text-slate/80 text-sm">We'd love to hear from you. Fill out the form below and we'll get back to you shortly.</p>
              </div>
              <ContactForm />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
