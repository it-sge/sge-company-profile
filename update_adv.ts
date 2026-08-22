import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.advantage.deleteMany({});
  
  await prisma.advantage.create({
    data: {
      icon: 'PackageCheck',
      title: 'Product Quality',
      description: 'Supplying top tier com-ponents only',
      order: 1,
    }
  });

  await prisma.advantage.create({
    data: {
      icon: 'HardHat',
      title: 'Profesional Service',
      description: 'Experienced and certi-fied teams',
      order: 2,
    }
  });

  await prisma.advantage.create({
    data: {
      icon: 'HandCoins',
      title: 'Best Price',
      description: 'Guaranteed competitive solutions',
      order: 3,
    }
  });

  await prisma.advantage.create({
    data: {
      icon: 'Headset',
      title: 'Helpdesk',
      description: 'Our customer care is ready to respond timely',
      order: 4,
    }
  });

  console.log('Advantages updated successfully');
}

main().finally(() => prisma.$disconnect());
