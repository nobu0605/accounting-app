import { PrismaClient } from '@prisma/client'

const { DATABASE_URL } = process.env

const prisma = new PrismaClient({
  log: ['query'],
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
})

export default prisma
