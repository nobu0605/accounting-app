import { PrismaClient } from '@prisma/client'

const { DATABASE_URL } = process.env

export function getPrismaClient() {
  return new PrismaClient({
    log: ['query'],
    datasources: {
      db: {
        url: DATABASE_URL,
      },
    },
  })
}
