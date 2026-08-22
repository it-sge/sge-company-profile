import Link from 'next/link';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import CurvyDivider from '@/components/ui/CurvyDivider';
import { getSiteSettings } from '@/lib/cached-queries';

export default async function Footer() {
  const settings = await getSiteSettings();

  const hqAddress = settings['hq_address'] || 'Gd. Wisma 81, Jln Cideng Barat No. 81, Jakarta Pusat 10150 Indonesia';
  const warehouseAddress = settings['warehouse_address'] || 'Kawasan Pergudangan Modern Cikande Blok BG/5 Bandung, Kab. Serang, Banten, Indonesia 42179';
  const hqPhone1 = settings['hq_phone1'] || '+62 21 386 2351';
  const hqPhone2 = settings['hq_phone2'] || '+62 21 386 2350';
  const contactEmail = settings['contact_email'] || 'rizki.arrisyantoro@bachgroup.co.id';
  const contactWhatsapp = settings['contact_whatsapp'] || '0812-8641-924';

  return (
    <>
      <section className="bg-white relative pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-gold font-heading font-bold text-5xl md:text-7xl lg:text-8xl md:ml-12 leading-none">Contact</h2>
        </div>
      </section>

      <CurvyDivider direction="down" topColor="bg-white" bottomColor="text-navy-dark" />

      <footer className="bg-navy-dark text-white pt-16 pb-8 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div>
            <h3 className="font-heading text-xl font-bold text-gold mb-6">PT Sun Global Energi (Head Quarter)</h3>
            <div className="flex items-start mb-4 space-x-3 text-gray-300">
              <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
              <p className="whitespace-pre-line">{hqAddress}</p>
            </div>
            <div className="flex items-center mb-2 space-x-3 text-gray-300">
              <Phone className="w-5 h-5 text-gold flex-shrink-0" />
              <p>{hqPhone1}</p>
            </div>
            <div className="flex items-center mb-8 space-x-3 text-gray-300">
              <Phone className="w-5 h-5 text-gold flex-shrink-0" />
              <p>{hqPhone2}</p>
            </div>

            <h3 className="font-heading text-xl font-bold text-gold mb-6">Warehouse</h3>
            <div className="flex items-start space-x-3 text-gray-300">
              <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
              <p className="whitespace-pre-line">{warehouseAddress}</p>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold text-gold mb-6">For More Info</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Contact us now to get offers and information according to your needs!
            </p>
            <div className="space-y-4">
              <a href={`https://wa.me/${contactWhatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" 
                 className="flex items-center space-x-3 text-gray-300 hover:text-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-gold flex-shrink-0" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                <span>WhatsApp: {contactWhatsapp}</span>
              </a>
              <a href={`mailto:${contactEmail}`} 
                 className="flex items-center space-x-3 text-gray-300 hover:text-gold transition-colors">
                <Mail className="w-5 h-5 text-gold" />
                <span>Email: {contactEmail}</span>
              </a>
            </div>
            
            <div className="mt-8 flex space-x-4">
              {/* Optional space for future social media links or other footer navigation */}
            </div>
          </div>

        </div>
        
        <div className="mt-16 pt-8 border-t border-navy-light text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} PT Sun Global Energi. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </>
  );
}
