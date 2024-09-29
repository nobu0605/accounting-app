import { cookies } from 'next/headers'
import { Company } from '@/features/setting/types/setting'
import prisma from '@/utils/api/db'
import { verifyJwt } from '@/utils/api/jwt'
import { serializeBigInt } from '@/utils/api/serialize'

export async function getCompanyByToken(): Promise<Company | null> {
  const token = cookies().get('token')?.value
  if (!token) throw new Error('Token not found')

  let company: Company | null = null

  const result = await verifyJwt(token)
  if (!result) throw new Error('JWT verification failed')

  const userId = Number(result.id)
  if (isNaN(userId)) {
    throw new Error('Invalid user ID')
  }

  const data = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      company: {
        select: {
          id: true,
          name: true,
          industryClass: true,
          numberOfEmployees: true,
          foundedDate: true,
          accountingTerm: true,
        },
      },
    },
  })
  if (data) {
    company = serializeBigInt(data.company)
  }

  return company
}
