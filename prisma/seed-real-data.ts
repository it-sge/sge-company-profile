import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🔄 Starting real data seed...\n')

  // ============================================
  // 1. Delete all existing Projects & Products
  // ============================================
  console.log('🗑️  Deleting all existing projects...')
  await prisma.project.deleteMany({})
  console.log('🗑️  Deleting all existing products...')
  await prisma.product.deleteMany({})
  console.log('✅ All existing data cleared.\n')

  // ============================================
  // 2. Ensure "Solar Panel" category exists
  // ============================================
  let solarCategory = await prisma.category.findFirst({
    where: { name: { contains: 'Solar' } }
  })
  if (!solarCategory) {
    solarCategory = await prisma.category.create({
      data: {
        name: 'Solar Panel',
        slug: 'solar-panel',
        description: 'High-efficiency solar panel modules for commercial and industrial applications',
        type: 'product'
      }
    })
    console.log('✅ Created "Solar Panel" category.')
  } else {
    console.log(`✅ Found existing category: "${solarCategory.name}"`)
  }

  // ============================================
  // 3. Insert Projects
  // ============================================
  console.log('\n📁 Inserting projects...\n')

  // --- PROJECT 1: ASCOTT JAKARTA ---
  const ascottProject = await prisma.project.create({
    data: {
      slug: 'ascott-jakarta',
      name: 'Ascott Jakarta',
      location: 'Jakarta, Indonesia',
      capacity: '125 kWp',
      description: 'Proyek instalasi panel surya di Ascott Serviced Residences Jakarta, salah satu gedung apartemen berlayanan premium di pusat kota Jakarta. Proyek ini membuktikan kemampuan kami dalam memberikan solusi tenaga surya untuk gedung perhotelan bertingkat tinggi.',
      imageUrl: '/project/ASCOTT JAKARTA 1.webp',
      gallery: null,
      completionDate: new Date('2023-08-15'),
      isPublished: true,
      order: 1,
      brochureUrl: null,
      contentData: JSON.stringify({
        quickStats: { solarPanels: '215 Modul', inverters: '2 Unit', system: 'On-Grid', roi: '3.5 Tahun', co2Reduction: '150 Ton/th' },
        overview: { 
          challenge: 'Tingginya biaya operasional energi dari sistem pendingin gedung (HVAC) dan penerangan 24 jam yang membebani manajemen apartemen.', 
          solution: 'Desain dan instalasi sistem PLTS Atap (On-Grid) berkapasitas 125 kWp menggunakan panel surya berefisiensi tinggi ZXI8.', 
          result: 'Penghematan tagihan listrik hingga 25% setiap bulannya dan peningkatan nilai properti sebagai green building.' 
        },
        projectInfo: {
          client: 'Ascott International Management',
          industry: 'Hospitality',
          projectType: 'Rooftop Solar',
          installation: 'Agustus 2023',
          duration: '60 Hari',
          epcContractor: 'Sun Global Energi',
          warranty: '25 Tahun (Panel), 10 Tahun (Inverter)',
          monitoring: 'Real-time Web App'
        },
        equipment: [
          { name: 'ZXI8-BD120 630-670W', type: 'Solar Panel', quantity: '215 Unit', image: '/project/SOLAR CELL NEW - WEB.webp' },
          { name: 'Sungrow SG125CX-P2', type: 'Inverter', quantity: '2 Unit', image: '/project/SOLAR-CELL 1.webp' }
        ],
        technicalSpecs: [
          { label: 'Kapasitas Sistem', value: '125 kWp' },
          { label: 'Tipe Instalasi', value: 'Rooftop (Atap Gedung)' },
          { label: 'Tipe Sistem', value: 'On-Grid' },
          { label: 'Area Instalasi', value: '850 m²' }
        ],
        beforeAfter: { before: '', after: '' },
        timeline: [
          { step: 'Audit Energi & Desain', icon: 'search' },
          { step: 'Pengadaan Material', icon: 'truck' },
          { step: 'Instalasi Panel & Inverter', icon: 'settings' },
          { step: 'Testing & Commissioning', icon: 'zap' }
        ],
        performance: { annualEnergy: '180.500 kWh', monthlySaving: 'Rp 25 Juta', carbonReduction: '150 Ton', equivalentTrees: '2.500 Pohon' },
        whyItMatters: [
          'Mengurangi ketergantungan pada listrik PLN pada jam sibuk.',
          'Mendukung program green-hospitality dan sertifikasi bangunan hijau.',
          'Mengurangi jejak karbon di pusat kota Jakarta secara signifikan.'
        ],
        testimonial: { 
          quote: 'Instalasi berjalan sangat mulus tanpa mengganggu aktivitas para tamu VIP kami. Penghematan energinya langsung terlihat di bulan pertama.', 
          name: 'Budi Santoso', 
          title: 'Chief Engineer', 
          company: 'Ascott Jakarta', 
          avatar: '' 
        },
        map: { address: 'Ascott Jakarta, Jl. Kebon Sirih, Jakarta Pusat', coords: '-6.1834,106.8235', city: 'Jakarta', province: 'DKI Jakarta' },
        gallery: [
          '/project/ASCOTT JAKARTA 1.webp',
          '/project/ASCOTT JAKARTA 2.webp',
          '/project/ASCOTT JAKARTA 3.webp',
          '/project/ASCOTT JAKARTA 4.webp'
        ]
      })
    }
  })
  console.log(`  ✅ Created project: ${ascottProject.name} (ID: ${ascottProject.id})`)

  // --- PROJECT 2: BKF ---
  const bkfProject = await prisma.project.create({
    data: {
      slug: 'bkf-dki-jakarta',
      name: 'BKF (Badan Kebijakan Fiskal)',
      location: 'DKI Jakarta, Indonesia',
      capacity: '50 kWp',
      description: 'Instalasi panel surya di Badan Kebijakan Fiskal (BKF), sebuah gedung instansi kebijakan fiskal pemerintah di Jakarta. Proyek ini menunjukkan komitmen kami dalam mendukung inisiatif keberlanjutan pemerintah melalui adopsi energi bersih.',
      imageUrl: '/project/BKF 1.webp',
      gallery: null,
      completionDate: new Date('2023-11-20'),
      isPublished: true,
      order: 2,
      brochureUrl: null,
      contentData: JSON.stringify({
        quickStats: { solarPanels: '90 Modul', inverters: '1 Unit', system: 'On-Grid', roi: '4 Tahun', co2Reduction: '60 Ton/th' },
        overview: { 
          challenge: 'Mandat pemerintah untuk mengadopsi efisiensi energi di gedung pemerintahan guna mencapai target Net Zero Emission.', 
          solution: 'Implementasi PLTS On-Grid 50 kWp sebagai pilot project percontohan untuk instansi pemerintah lainnya.', 
          result: 'Sistem menyuplai sekitar 20% kebutuhan listrik gedung pada siang hari.' 
        },
        projectInfo: {
          client: 'Badan Kebijakan Fiskal',
          industry: 'Government',
          projectType: 'Rooftop Solar',
          installation: 'November 2023',
          duration: '45 Hari',
          epcContractor: 'Sun Global Energi',
          warranty: '25 Tahun (Panel), 10 Tahun (Inverter)',
          monitoring: 'SCADA Integration'
        },
        equipment: [
          { name: 'ZXI8-BD132 695-730W', type: 'Solar Panel', quantity: '90 Unit', image: '/project/SOLAR CELL NEW.webp' }
        ],
        technicalSpecs: [
          { label: 'Kapasitas Sistem', value: '50 kWp' },
          { label: 'Tipe Instalasi', value: 'Rooftop (Atap Beton)' },
          { label: 'Tipe Sistem', value: 'On-Grid' },
          { label: 'Area Instalasi', value: '350 m²' }
        ],
        beforeAfter: { before: '', after: '' },
        timeline: [
          { step: 'Perizinan & Regulasi', icon: 'file' },
          { step: 'Persiapan Struktur Atap', icon: 'settings' },
          { step: 'Pemasangan Modul', icon: 'zap' }
        ],
        performance: { annualEnergy: '75.000 kWh', monthlySaving: 'Rp 11 Juta', carbonReduction: '60 Ton', equivalentTrees: '1.000 Pohon' },
        whyItMatters: [
          'Menjadi role model bagi transisi energi di sektor pemerintahan.',
          'Memastikan penghematan anggaran negara (APBN) dari sektor utilitas.'
        ],
        testimonial: { 
          quote: 'Proyek ini menjadi langkah nyata kami dalam mewujudkan komitmen transisi energi bersih di lingkungan Kementerian.', 
          name: 'Perwakilan BKF', 
          title: 'Pejabat Pembuat Komitmen', 
          company: 'BKF Kementerian Keuangan', 
          avatar: '' 
        },
        map: { address: 'Badan Kebijakan Fiskal, Jakarta Pusat', coords: '-6.1700,106.8300', city: 'Jakarta', province: 'DKI Jakarta' },
        gallery: [
          '/project/BKF 1.webp',
          '/project/BKF 2.webp',
          '/project/BKF 3.webp',
          '/project/BKF 4.webp',
          '/project/BKF 5.webp',
          '/project/BKF 6.webp'
        ]
      })
    }
  })
  console.log(`  ✅ Created project: ${bkfProject.name} (ID: ${bkfProject.id})`)

  // --- PROJECT 3: KEMPINSKI BALI ---
  const kempinskiProject = await prisma.project.create({
    data: {
      slug: 'kempinski-bali',
      name: 'Kempinski Bali',
      location: 'Bali, Indonesia',
      capacity: '250 kWp',
      description: 'Instalasi energi surya di Kempinski Hotel Bali, resor mewah tepi pantai bintang 5 di Nusa Dua. Proyek bergengsi ini menonjolkan keahlian kami dalam mengintegrasikan solusi tenaga surya di properti perhotelan kelas dunia dengan tetap menjaga keharmonisan estetika bangunan.',
      imageUrl: '/project/KEPINSKI BALI 1.webp',
      gallery: null,
      completionDate: new Date('2024-02-10'),
      isPublished: true,
      order: 3,
      brochureUrl: null,
      contentData: JSON.stringify({
        quickStats: { solarPanels: '450 Modul', inverters: '5 Unit', system: 'Hybrid', roi: '4.5 Tahun', co2Reduction: '300 Ton/th' },
        overview: { 
          challenge: 'Kebutuhan energi yang masif untuk resor mewah 24/7 dan tuntutan untuk menjaga estetika atap bangunan agar tidak merusak pemandangan resor bintang 5.', 
          solution: 'Desain khusus PLTS Hybrid 250 kWp dengan panel surya yang dipasang menyatu dengan profil atap, dilengkapi sistem penyimpanan baterai untuk backup.', 
          result: 'Resor beroperasi dengan 35% energi terbarukan, mendapatkan penghargaan Eco-Tourism, dan mengamankan suplai listrik saat terjadi gangguan grid.' 
        },
        projectInfo: {
          client: 'Kempinski Hotels',
          industry: 'Hospitality',
          projectType: 'Hybrid Solar & Storage',
          installation: 'Februari 2024',
          duration: '90 Hari',
          epcContractor: 'Sun Global Energi',
          warranty: '25 Tahun (Panel), 10 Tahun (Inverter & Battery)',
          monitoring: 'Advanced EMS Dashboard'
        },
        equipment: [
          { name: 'ZXI8-BD120 630-670W', type: 'Solar Panel', quantity: '450 Unit', image: '/project/SOLAR CELL NEW - WEB.webp' },
          { name: 'SMA Sunny Tripower', type: 'Hybrid Inverter', quantity: '5 Unit', image: '/project/SOLAR-CELL 1.webp' }
        ],
        technicalSpecs: [
          { label: 'Kapasitas Sistem', value: '250 kWp' },
          { label: 'Kapasitas Baterai', value: '500 kWh Lithium-ion' },
          { label: 'Tipe Sistem', value: 'Hybrid' },
          { label: 'Area Instalasi', value: '1.200 m²' }
        ],
        beforeAfter: { before: '', after: '' },
        timeline: [
          { step: 'Desain Arsitektural', icon: 'search' },
          { step: 'Pengiriman Komponen', icon: 'truck' },
          { step: 'Instalasi Baterai & Panel', icon: 'settings' },
          { step: 'Handover Resmi', icon: 'zap' }
        ],
        performance: { annualEnergy: '365.000 kWh', monthlySaving: 'Rp 50 Juta', carbonReduction: '300 Ton', equivalentTrees: '5.000 Pohon' },
        whyItMatters: [
          'Memastikan operasional resor tidak pernah terganggu oleh pemadaman listrik.',
          'Meningkatkan brand image resor di mata wisatawan ramah lingkungan.',
          'Pengembalian investasi (ROI) yang cepat berkat penghematan tagihan listrik premium.'
        ],
        testimonial: { 
          quote: 'Tim Sun Global Energi bekerja dengan sangat hati-hati untuk memastikan tidak ada tamu yang terganggu selama instalasi. Hasilnya luar biasa secara fungsi maupun estetika.', 
          name: 'General Manager', 
          title: 'Kempinski Bali', 
          company: 'Kempinski Hotels', 
          avatar: '' 
        },
        map: { address: 'Kempinski Hotel, Nusa Dua, Bali', coords: '-8.8288,115.2166', city: 'Nusa Dua', province: 'Bali' },
        gallery: [
          '/project/KEPINSKI BALI 1.webp',
          '/project/KEPINSKI BALI 2.webp',
          '/project/KEPINSKI BALI 3.webp',
          '/project/KEPINSKI BALI 5.webp',
          '/project/KEPINSKI BALI.webp'
        ]
      })
    }
  })
  console.log(`  ✅ Created project: ${kempinskiProject.name} (ID: ${kempinskiProject.id})`)

  // --- PROJECT 4: PT MEGA PUTRA GARMENT ---
  const megaPutraProject = await prisma.project.create({
    data: {
      slug: 'mega-putra-garment',
      name: 'PT. Mega Putra Garment',
      location: 'Pemalang, Jawa Tengah',
      capacity: '500 kWp',
      description: 'Instalasi PLTS Atap berskala besar untuk PT Mega Putra Garment di Pemalang. Proyek ini mendukung efisiensi biaya operasional pabrik tekstil berskala ekspor dan mendukung inisiatif fashion berkelanjutan (sustainable fashion).',
      imageUrl: '/project/PT. Mega Putra Garment - Pemalang - Jawa Tengah.webp',
      gallery: null,
      completionDate: new Date('2023-09-10'),
      isPublished: true,
      order: 4,
      brochureUrl: null,
      contentData: JSON.stringify({
        quickStats: { solarPanels: '920 Modul', inverters: '8 Unit', system: 'On-Grid', roi: '3.2 Tahun', co2Reduction: '580 Ton/th' },
        overview: { 
          challenge: 'Beban biaya listrik yang sangat tinggi untuk mengoperasikan mesin jahit industri, sistem pendingin, dan pencahayaan pabrik garment siang hari.', 
          solution: 'Instalasi PLTS Atap (On-Grid) berkapasitas 500 kWp pada atap pabrik seluas 2.500 m² untuk menyuplai beban dasar operasional siang hari.', 
          result: 'Menurunkan tagihan listrik bulanan hingga 35% dan membantu perusahaan memenuhi standar sertifikasi ramah lingkungan bagi *buyer* internasional.' 
        },
        projectInfo: {
          client: 'PT. Mega Putra Garment',
          industry: 'Manufacturing',
          projectType: 'Industrial Rooftop',
          installation: 'September 2023',
          duration: '45 Hari',
          epcContractor: 'Sun Global Energi',
          warranty: '25 Tahun (Panel), 10 Tahun (Inverter)',
          monitoring: 'Industrial SCADA'
        },
        equipment: [
          { name: 'ZXI8-BD132 695-730W', type: 'Solar Panel', quantity: '920 Unit', image: '/project/SOLAR CELL NEW.webp' }
        ],
        technicalSpecs: [
          { label: 'Kapasitas Sistem', value: '500 kWp' },
          { label: 'Tipe Instalasi', value: 'Metal Roof (Kliplok)' },
          { label: 'Tipe Sistem', value: 'On-Grid' },
          { label: 'Area Instalasi', value: '2.500 m²' }
        ],
        beforeAfter: { before: '', after: '' },
        timeline: [
          { step: 'Audit Struktur Atap', icon: 'search' },
          { step: 'Instalasi Rel & Panel', icon: 'settings' },
          { step: 'Sinkronisasi Grid PLN', icon: 'zap' }
        ],
        performance: { annualEnergy: '730.000 kWh', monthlySaving: 'Rp 85 Juta', carbonReduction: '580 Ton', equivalentTrees: '8.500 Pohon' },
        whyItMatters: [],
        testimonial: { quote: 'Langkah strategis kami untuk green manufacturing berhasil diwujudkan berkat instalasi cepat dan aman dari Sun Global.', name: 'Plant Manager', title: 'PT Mega Putra', company: 'Mega Putra Garment', avatar: '' },
        map: { address: 'Kawasan Industri Pemalang, Jawa Tengah', coords: '-6.8887,109.3804', city: 'Pemalang', province: 'Jawa Tengah' },
        gallery: [
          '/project/PT. Mega Putra Garment - Pemalang - Jawa Tengah.webp'
        ]
      })
    }
  })
  console.log(`  ✅ Created project: ${megaPutraProject.name} (ID: ${megaPutraProject.id})`)

  // --- PROJECT 5: ROCK ISLAND BALI ---
  const rockIslandProject = await prisma.project.create({
    data: {
      slug: 'rock-island-bali',
      name: 'Rock Island Resort Bali',
      location: 'Bali, Indonesia',
      capacity: '120 kWp',
      description: 'Sistem PLTS terisolasi (Off-Grid) untuk Rock Island Resort di Bali. Mengingat lokasinya yang terpencil, kami menyediakan sistem mandiri yang ditenagai 100% oleh energi surya dengan sistem baterai penyimpanan canggih.',
      imageUrl: '/project/Rock island Bali.webp',
      gallery: null,
      completionDate: new Date('2022-12-05'),
      isPublished: true,
      order: 5,
      brochureUrl: null,
      contentData: JSON.stringify({
        quickStats: { solarPanels: '210 Modul', inverters: '3 Unit', system: 'Off-Grid', roi: '5 Tahun', co2Reduction: '140 Ton/th' },
        overview: { 
          challenge: 'Lokasi resor eksklusif yang terpencil dan tidak terjangkau jaringan listrik PLN secara stabil, sehingga bergantung pada genset diesel yang mahal dan bising.', 
          solution: 'Sistem tenaga surya *Off-Grid* mandiri dengan sistem penyimpanan baterai berkapasitas besar.', 
          result: 'Resor beroperasi secara sunyi tanpa genset siang dan malam, memberikan pengalaman liburan premium tanpa jejak emisi.' 
        },
        projectInfo: {
          client: 'Rock Island Resort',
          industry: 'Hospitality',
          projectType: 'Off-Grid Microgrid',
          installation: 'Desember 2022',
          duration: '60 Hari',
          epcContractor: 'Sun Global Energi',
          warranty: '25 Tahun (Panel), 10 Tahun (Baterai)',
          monitoring: 'Remote Satellite Monitoring'
        },
        equipment: [
          { name: 'ZXI8-BD120 630-670W', type: 'Solar Panel', quantity: '210 Unit', image: '/project/SOLAR CELL NEW - WEB.webp' }
        ],
        technicalSpecs: [
          { label: 'Kapasitas Sistem', value: '120 kWp' },
          { label: 'Sistem Baterai', value: '250 kWh' },
          { label: 'Tipe Sistem', value: 'Off-Grid' }
        ],
        beforeAfter: { before: '', after: '' },
        timeline: [
          { step: 'Logistik Area Terpencil', icon: 'truck' },
          { step: 'Instalasi Baterai Bank', icon: 'settings' },
          { step: 'Testing & Commissioning', icon: 'zap' }
        ],
        performance: { annualEnergy: '175.000 kWh', monthlySaving: 'Rp 30 Juta (BBM)', carbonReduction: '140 Ton', equivalentTrees: '2.200 Pohon' },
        whyItMatters: [],
        testimonial: { quote: 'Sekarang para tamu resor kami dapat menikmati suara deburan ombak tanpa gangguan bising generator diesel. 100% Eco-Resort!', name: 'Resort Director', title: 'Rock Island', company: 'Rock Island Bali', avatar: '' },
        map: { address: 'Pulau Terpencil, Bali', coords: '-8.5000,115.3000', city: 'Nusa Penida', province: 'Bali' },
        gallery: [
          '/project/Rock island Bali.webp'
        ]
      })
    }
  })
  console.log(`  ✅ Created project: ${rockIslandProject.name} (ID: ${rockIslandProject.id})`)

  // --- PROJECT 6: SWRO ITDC BALI ---
  const swroProject = await prisma.project.create({
    data: {
      slug: 'swro-itdc-bali',
      name: 'SWRO ITDC Bali',
      location: 'Nusa Dua, Bali',
      capacity: '300 kWp',
      description: 'Proyek energi surya terintegrasi dengan fasilitas Sea Water Reverse Osmosis (SWRO) di kawasan elit ITDC Nusa Dua Bali. Sistem ini menurunkan secara drastis biaya produksi air bersih dengan mensuplai daya langsung ke pompa desalinasi bertekanan tinggi.',
      imageUrl: '/project/SWRO ITDC Bali.webp',
      gallery: null,
      completionDate: new Date('2024-05-20'),
      isPublished: true,
      order: 6,
      brochureUrl: null,
      contentData: JSON.stringify({
        quickStats: { solarPanels: '550 Modul', inverters: '6 Unit', system: 'On-Grid', roi: '3.8 Tahun', co2Reduction: '350 Ton/th' },
        overview: { 
          challenge: 'Proses SWRO (desalinasi air laut) membutuhkan konsumsi listrik yang luar biasa besar untuk menggerakkan pompa tekanan tinggi.', 
          solution: 'Integrasi PLTS Atap 300 kWp langsung pada fasilitas SWRO untuk menyediakan daya di waktu operasi puncak siang hari.', 
          result: 'Biaya produksi air bersih (Rupiah per kubik air) turun signifikan, menjadikan fasilitas ini salah satu instalasi pengelolaan air laut paling efisien di Indonesia.' 
        },
        projectInfo: {
          client: 'ITDC (Indonesia Tourism Development Corp)',
          industry: 'Water & Utilities',
          projectType: 'Industrial Solar',
          installation: 'Mei 2024',
          duration: '75 Hari',
          epcContractor: 'Sun Global Energi',
          warranty: '25 Tahun (Panel)',
          monitoring: 'Integrated Plant Controller'
        },
        equipment: [
          { name: 'ZXI8-BD132 695-730W', type: 'Solar Panel', quantity: '550 Unit', image: '/project/SOLAR CELL NEW.webp' }
        ],
        technicalSpecs: [
          { label: 'Kapasitas Sistem', value: '300 kWp' },
          { label: 'Tipe Instalasi', value: 'Rooftop (Metal Roof)' },
          { label: 'Tipe Sistem', value: 'On-Grid terintegrasi SWRO' },
          { label: 'Area Instalasi', value: '1.500 m²' }
        ],
        beforeAfter: { before: '', after: '' },
        timeline: [
          { step: 'Integrasi Sistem Elektrikal Pompa', icon: 'zap' },
          { step: 'Instalasi Panel Surya', icon: 'settings' }
        ],
        performance: { annualEnergy: '438.000 kWh', monthlySaving: 'Rp 55 Juta', carbonReduction: '350 Ton', equivalentTrees: '4.800 Pohon' },
        whyItMatters: [],
        testimonial: { quote: 'Kolaborasi yang brilian. Memanfaatkan atap fasilitas untuk menurunkan biaya utama kami yaitu energi.', name: 'Plant Manager SWRO', title: 'ITDC', company: 'ITDC Nusa Dua', avatar: '' },
        map: { address: 'Kawasan ITDC Nusa Dua, Bali', coords: '-8.8000,115.2200', city: 'Nusa Dua', province: 'Bali' },
        gallery: [
          '/project/SWRO ITDC Bali.webp'
        ]
      })
    }
  })
  console.log(`  ✅ Created project: ${swroProject.name} (ID: ${swroProject.id})`)

  // ============================================
  // 4. Insert Products
  // ============================================
  console.log('\n📦 Inserting products...\n')

  // --- PRODUCT 1: ZXI8-BD120 (630-670W) ---
  const product1 = await prisma.product.create({
    data: {
      slug: 'solar-panel-zxi8-bd120-630-670w',
      name: 'Solar Panel ZXI8-BD120 630-670W',
      categoryId: solarCategory.id,
      description: 'High-efficiency monocrystalline solar panel module with PU Frame construction. The ZXI8-BD120 series delivers exceptional power output of 630-670W, featuring 210mm half-cut cells for superior performance and reliability. Ideal for large-scale commercial and industrial rooftop installations.',
      imageUrl: '/project/SOLAR CELL NEW - WEB.webp',
      gallery: JSON.stringify([
        '/project/SOLAR-CELL 1.webp',
        '/project/SOLAR-CELL 2.webp',
        '/project/beautiful-alternative-energy-plant-with-solar-panels.webp'
      ]),
      specs: JSON.stringify({
        'Solar cells': 'N-type Monocrystalline',
        'Cells orientation': '120 (6×20)',
        'Module dimension': '2172×1303×30 mm (With Frame)',
        'Weight': '33.5±1 kg',
        'Glass': '2.0 mm+2.0mm, High Transmission, AR Coated Heat Strengthened Glass',
        'Junction box': 'IP 68, 3 diodes',
        'Cables': '4 mm², +300mm,-200mm or Customized Length(with connectors)',
        'Connectors': 'MC4 compatible or MC4-EVO2',
        'Fire safety class': 'Class A+A',
        'Datasheet': '/project/ZXI8-BD120.pdf'
      }),
      isPublished: true,
      order: 1,
    }
  })
  console.log(`  ✅ Created product: ${product1.name} (ID: ${product1.id})`)

  // --- PRODUCT 2: ZXI8-BD132 (695-730W) ---
  const product2 = await prisma.product.create({
    data: {
      slug: 'solar-panel-zxi8-bd132-695-730w',
      name: 'Solar Panel ZXI8-BD132 695-730W',
      categoryId: solarCategory.id,
      description: 'Premium high-power monocrystalline solar panel module with PU Composite Frame. The ZXI8-BD132 series offers industry-leading power output of 695-730W with 210mm advanced cell technology. Engineered for maximum energy yield in utility-scale and large commercial projects with a 350mm junction box spacing.',
      imageUrl: '/project/SOLAR CELL NEW.webp',
      gallery: JSON.stringify([
        '/project/solar-cell-farm-power-station-alternative-energy-from-sun.webp'
      ]),
      specs: JSON.stringify({
        'Solar cells': 'N-type Monocrystalline',
        'Cells orientation': '132 (6×22)',
        'Module dimension': '2384×1303×30 mm (With Frame)',
        'Weight': '38.5±1 kg',
        'Glass': '2.0 mm+2.0mm, High Transmission, AR Coated Heat Strengthened Glass',
        'Junction box': 'IP 68, 3 diodes',
        'Cables': '4 mm², +300mm,-200mm or Customized Length(with connectors)',
        'Connectors': 'MC4 compatible or MC4-EVO2',
        'Fire safety class': 'Class A+A',
        'Datasheet': '/project/ZXI8-BD132.pdf'
      }),
      isPublished: true,
      order: 2,
    }
  })
  console.log(`  ✅ Created product: ${product2.name} (ID: ${product2.id})`)

  console.log('\n🎉 Real data seed completed successfully!')
  console.log(`   → ${3} projects created`)
  console.log(`   → ${2} products created`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
