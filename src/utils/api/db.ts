import { PrismaClient } from '@prisma/client'

// const globalForPrisma = global as unknown as { prisma: PrismaClient }

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ['query'],
//     datasources: {
//       db: {
//         url: databaseURL,
//       },
//     },
//   })

const { DATABASE_URL } = process.env

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
  interface BigInt {
    toJSON(): string
  }
}


const databaseURL = DATABASE_URL
// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient({
//     datasources: {
//       db: {
//         url: databaseURL,
//       },
//     },
//   })
// } else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      datasources: {
        db: {
          url: databaseURL,
        },
      },
    })
  }
  const prisma = global.prisma
// }

export default prisma

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
