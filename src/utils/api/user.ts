import { User } from '@prisma/client'
import { cookies } from 'next/headers'
import prisma from '@/utils/api/db'
import { verifyJwt } from '@/utils/api/jwt'
import { serializeBigInt } from '@/utils/api/serialize'

export async function getUserByToken(): Promise<User | null> {
  const token = cookies().get('token')?.value
  if (!token) throw new Error('Token not found')

  let user: User | null = null

  const result = await verifyJwt(token)
  if (!result) throw new Error('JWT verification failed')

  const userId = Number(result.id)
  if (isNaN(userId)) {
    throw new Error('Invalid user ID')
  }

  user = await prisma.user.findUnique({
    where: { id: userId },
  })
  if (user) {
    user = serializeBigInt(user)
  }

  return user
}
