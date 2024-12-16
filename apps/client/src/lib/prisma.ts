import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? 
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  })

// Test database connection
prisma.$connect()
  .then(() => {
    console.log('Successfully connected to database')
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error)
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
