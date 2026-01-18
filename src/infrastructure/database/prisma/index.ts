import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './client';

const connectionString = `${process.env.DATABASE_URL}`;

const prismaClientSingleton = () => {
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

declare global {
  var prisma: PrismaClient | undefined;
}

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
