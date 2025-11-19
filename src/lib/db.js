import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prismaClientSingleton = () => {
  // Verifica se está usando Prisma Accelerate
  const isAccelerate = process.env.DATABASE_URL?.includes('prisma+');
  
  const config = {
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  };
  
  // Se estiver usando Accelerate, precisa passar a URL explicitamente
  if (isAccelerate) {
    config.accelerateUrl = process.env.DATABASE_URL;
  }
  
  const client = new PrismaClient(config);
  
  // Adiciona a extensão Accelerate se necessário
  if (isAccelerate) {
    return client.$extends(withAccelerate());
  }
  
  return client;
};

const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
