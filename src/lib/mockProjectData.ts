export const mockProjectDetails: Record<string, any> = {
  default: {
    quickStats: {
      solarPanels: "2182 Units",
      inverters: "Huawei 100KTL",
      system: "On Grid",
      roi: "4.5 Years",
      co2Reduction: "1420 Ton / Year",
    },
    overview: {
      challenge: "Klien menghadapi lonjakan biaya energi yang signifikan dan memiliki komitmen keberlanjutan global untuk mengurangi emisi karbon dalam operasional manufaktur mereka, tanpa mengganggu produksi harian.",
      solution: "Sistem PV On-Grid kapasitas besar dengan struktur mounting atap khusus yang terintegrasi dengan sistem manajemen energi cerdas untuk pemantauan real-time.",
      result: "Penurunan biaya operasional listrik hingga 40% di bulan pertama, berkontribusi langsung pada target ESG perusahaan, dengan pengembalian investasi diproyeksikan dalam 4,5 tahun."
    },
    projectInfo: {
      client: "Confidential Enterprise",
      industry: "Manufacturing / Industrial",
      projectType: "Rooftop Solar PV",
      installation: "Corrugated Metal Roof",
      duration: "3 Months",
      epcContractor: "Sun Global Energi",
      warranty: "25 Years Linear Power",
      monitoring: "Huawei FusionSolar"
    },
    equipment: [
      {
        name: "SUNPRO Mono-Facial 550W",
        type: "Solar Panel",
        quantity: "2182 Units",
        image: "https://images.unsplash.com/photo-1509391366360-12009a308569?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "Huawei Smart String Inverter 100KTL",
        type: "Inverter",
        quantity: "12 Units",
        image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "Corrugated Roof Mounting",
        type: "Mounting System",
        quantity: "Complete Set",
        image: "https://images.unsplash.com/photo-1588508960100-3490714771dc?q=80&w=600&auto=format&fit=crop"
      }
    ],
    technicalSpecs: [
      { label: "Installed Capacity", value: "1.2 MWp" },
      { label: "Grid Voltage", value: "380V / 3 Phase" },
      { label: "Frequency", value: "50 Hz" },
      { label: "Module Efficiency", value: "21.3%" },
      { label: "Inverter Max Efficiency", value: "98.8%" },
      { label: "Annual Generation", value: "1.72 GWh" },
      { label: "Expected Lifetime", value: "25+ Years" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1509391366360-12009a308569?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588508960100-3490714771dc?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop"
    ],
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1509391366360-12009a308569?q=80&w=800&auto=format&fit=crop"
    },
    timeline: [
      { step: "Site Survey & Audit", icon: "Search" },
      { step: "Engineering Design", icon: "PenTool" },
      { step: "Procurement", icon: "Truck" },
      { step: "Installation", icon: "Wrench" },
      { step: "Testing & Commissioning", icon: "Activity" },
      { step: "Operation & Maintenance", icon: "Settings" }
    ],
    performance: {
      annualEnergy: "1.72 GWh",
      monthlySaving: "Rp 480 Million",
      carbonReduction: "1420 Ton",
      equivalentTrees: "62,000 Trees"
    },
    whyItMatters: [
      "Mengurangi emisi karbon secara signifikan",
      "Meningkatkan profil ESG dan reputasi keberlanjutan perusahaan",
      "Memangkas tagihan listrik PLN hingga 40%",
      "Melindungi bisnis dari kenaikan tarif listrik di masa depan"
    ],
    testimonial: {
      quote: "Sun Global Energi merevolusi cara pabrik kami mengkonsumsi energi. Instalasi dilakukan tanpa mengganggu produksi, dan hasilnya langsung terlihat pada efisiensi biaya bulan pertama.",
      name: "Budi Santoso",
      title: "Plant Manager",
      company: "PT Maju Manufaktur",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
    },
    map: {
      address: "Kawasan Industri MM2100, Cikarang Barat, Bekasi",
      coords: "-6.2907, 107.0863",
      city: "Bekasi",
      province: "Jawa Barat"
    }
  }
};

export function getMockProjectData(slug: string) {
  // Return mock data for all slugs for now
  return mockProjectDetails.default;
}
