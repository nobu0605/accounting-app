import { PrismaClient } from '@prisma/client'
import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import CredentialsProvider from 'next-auth/providers/credentials'
import { Session, JWT } from '@/types/next-auth'

const prisma = new PrismaClient()

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'Please enter the email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Please enter the password',
        },
      },
      async authorize(credentials, _) {
        if (!credentials) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        })
        const isMatchPassword = user && (await bcrypt.compare(credentials.password, user.password))
        if (isMatchPassword) {
          return {
            id: String(user.id),
            email: user.email,
            name: user.name,
          }
        } else {
          return null
        }
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 7 * 24 * 60 * 60, // 1 week
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt(token: JWT, user?: User): Promise<JWT> {
      if (user) {
        token.id = String(user.id)
      }
      return token
    },
    async session(session: Session, token: JWT): Promise<Session> {
      if (session && session.user && session.user.id) {
        session.user.id = token.id
      }
      return session
    },
  },
}
