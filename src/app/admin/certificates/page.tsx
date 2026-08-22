import { getCertificates } from "../actions";
import CertificateManager from "./CertificateManager";

export default async function AdminCertificatesPage() {
  const certificates = await getCertificates();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-white mb-2">Kelola Sertifikat</h2>
        <p className="text-white/50 text-sm">Upload sertifikat (seperti SNI, ISO) yang akan ditampilkan di halaman katalog produk publik.</p>
      </div>
      
      <CertificateManager initialCertificates={certificates} />
    </div>
  );
}
