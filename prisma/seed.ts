import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@banking.com' },
    update: {},
    create: {
      email: 'admin@banking.com',
      password: adminPassword,
      firstName: 'System',
      lastName: 'Admin',
      role: 'ADMIN',
      status: 'ACTIVE',
      balance: 0,
    },
  });

  console.log('Admin user created:', admin.email);

  // Create default settings
  const defaultSettings = [
    { key: 'site_name', value: 'Banking Admin' },
    { key: 'site_description', value: 'Banking Administration System' },
    { key: 'currency', value: 'USD' },
    { key: 'min_deposit', value: '10' },
    { key: 'max_deposit', value: '100000' },
    { key: 'min_withdrawal', value: '10' },
    { key: 'max_withdrawal', value: '50000' },
    { key: 'transfer_fee', value: '0' },
    { key: 'maintenance_mode', value: 'false' },
  ];

  for (const setting of defaultSettings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  // Create sample investment plans
  const plans = [
    {
      name: 'Starter Plan',
      description: 'Perfect for beginners',
      minAmount: 100,
      maxAmount: 1000,
      roi: 5,
      duration: 30,
    },
    {
      name: 'Growth Plan',
      description: 'For growing your wealth',
      minAmount: 1000,
      maxAmount: 10000,
      roi: 10,
      duration: 90,
    },
    {
      name: 'Premium Plan',
      description: 'Maximum returns for serious investors',
      minAmount: 10000,
      maxAmount: 100000,
      roi: 15,
      duration: 180,
    },
  ];

  for (const plan of plans) {
    await prisma.investmentPlan.create({
      data: plan,
    });
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });