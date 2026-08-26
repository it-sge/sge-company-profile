import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // 1. Create Default Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sunglobal.co.id' },
    update: {},
    create: {
      email: 'admin@sunglobal.co.id',
      name: 'Admin Sun Global',
      password: hashedPassword,
      role: 'admin',
    },
  })
  console.log('Admin user created:', admin.email)

  // 2. Site Settings
  const settings = [
    { key: 'hero_title', value: 'End-to-End Solar Energy Solutions' },
    { key: 'hero_subtitle', value: 'EPC – Operation & Maintenance - Financing' },
    { key: 'hero_paragraph', value: 'Sun Global Energi delivers integrated solar energy solutions for commercial and industrial clients. From initial feasibility studies and system design to engineering, procurement, construction, commissioning, and long-term operations, we manage every stage of your solar project. Our tailored solutions are designed to reduce energy costs, improve operational reliability, and support your sustainability goals. Backed by experienced professionals, proven technologies, and a commitment to quality, we provide dependable solar solutions that deliver long-term value.' },
    { key: 'hero_tagline', value: 'Powering a Sustainable Future, Together.' },
    { key: 'mission_text', value: 'At Sun Global Energi, our mission is to accelerate the transition to clean and sustainable energy by delivering reliable, high-quality solar solutions that create long-term value for our clients. We believe renewable energy should be practical, accessible, and economically beneficial. Through innovative engineering, trusted partnerships, and end-to-end project delivery, we help businesses reduce energy costs, lower carbon emissions, and achieve their sustainability goals. Every solar installation—regardless of its size—contributes to a cleaner future. We are committed to making that transition simple, efficient, and successful for every client.' },
    { key: 'hq_address', value: 'Gd. Wisma 81, Jln Cideng Barat No. 81, Jakarta Pusat 10150 Indonesia' },
    { key: 'hq_phone1', value: '+62 21 386 2351' },
    { key: 'hq_phone2', value: '+62 21 386 2350' },
    { key: 'warehouse_address', value: 'Kawasan Pergudangan Modern Cikande Blok BG/5 Bandung, Kab. Serang, Banten, Indonesia 42179' },
    { key: 'contact_whatsapp', value: '0812-8641-924' },
    { key: 'contact_email', value: 'rizki.arrisyantoro@bachgroup.co.id' }
  ]

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: {},
      create: { key: s.key, value: s.value },
    })
  }
  console.log('Site settings seeded.')

  // 3. Values
  const values = [
    {
      title: 'Reliability',
      pointA: 'Deliver on every commitment.',
      pointB: 'Provide dependable and practical solutions.',
      pointC: 'Build long-term relationships based on trust and integrity.',
      order: 1,
    },
    {
      title: 'Excellence',
      pointA: 'Deliver results that create lasting value.',
      pointB: 'Continuously improve quality, efficiency, and performance.',
      pointC: 'Optimize every project through smart engineering and innovation.',
      order: 2,
    },
    {
      title: 'Innovation',
      pointA: 'Stay at the forefront of solar technologies.',
      pointB: 'Embrace continuous learning and improvement.',
      pointC: 'Develop smarter, more sustainable energy solutions.',
      order: 3,
    }
  ]

  for (const v of values) {
    const exists = await prisma.value.findFirst({ where: { title: v.title }})
    if (!exists) {
      await prisma.value.create({ data: v })
    }
  }
  console.log('Values seeded.')

  // 4. Advantages
  const advantages = [
    {
      icon: 'ShieldCheck', // Map to lucide-react icon
      title: 'Product Quality',
      description: 'Supplying top tier components only',
      order: 1,
    },
    {
      icon: 'Wrench',
      title: 'Professional Service',
      description: 'Experienced and certified teams',
      order: 2,
    },
    {
      icon: 'BadgeDollarSign',
      title: 'Best Price',
      description: 'Guaranteed competitive solutions',
      order: 3,
    },
    {
      icon: 'Headset',
      title: 'Helpdesk',
      description: 'Our customer care is ready to respond timely',
      order: 4,
    }
  ]

  for (const a of advantages) {
    const exists = await prisma.advantage.findFirst({ where: { title: a.title }})
    if (!exists) {
      await prisma.advantage.create({ data: a })
    }
  }
  console.log('Advantages seeded.')

  // 5. Projects
  const projects = [
    {
      slug: 'swro-itdc-bali',
      name: 'SWRO ITDC',
      location: 'Bali',
      description: 'Solar RO project in ITDC Bali.',
      imageUrl: '/images/projects/swro-itdc.jpg',
      order: 1,
    },
    {
      slug: 'mega-putra-garment',
      name: 'MEGA PUTRA GARMENT',
      location: 'Jawa Tengah',
      description: 'Rooftop solar installation for Mega Putra Garment.',
      imageUrl: '/images/projects/mega-putra.jpg',
      order: 2,
    },
    {
      slug: 'bkf-dki-jakarta',
      name: 'BKF',
      location: 'DKI Jakarta',
      description: 'Solar panel system for BKF in Jakarta.',
      imageUrl: '/images/projects/bkf.jpg',
      order: 3,
    }
  ]

  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    })
  }
  console.log('Projects seeded.')

  // Note: We leave Products empty for the admin to fill later, or we can add a dummy product.
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
