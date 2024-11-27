import { PrismaClient } from '@prisma/client';
import { PasswordHashService } from '../src/utils/password-hash/password-hash.service';
const prisma = new PrismaClient();

async function main() {
  const passwordHashService = new PasswordHashService();
  const adminRole = await prisma.role.create({
    data: {
      name: 'admin',
    },
  });

  const userRole = await prisma.role.create({
    data: {
      name: 'user',
    },
  });

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      userName: 'adminUser',
      status: 'active',
      password: await passwordHashService.hashPassword('secureAdminPassword'),
      roleId: adminRole.id,
    },
  });

  await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      userName: 'regularUser',
      status: 'active',
      password: await passwordHashService.hashPassword('secureUserPassword'),
      roleId: userRole.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
