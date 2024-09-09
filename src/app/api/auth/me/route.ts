import { User } from '@prisma/client'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { errorMessages } from '@/constants/error'
import { getPrismaClient } from '@/utils/api/db'
import { verifyJwt } from '@/utils/api/jwt'
import { serializeBigInt } from '@/utils/api/serialize'

export async function POST(request: NextRequest) {
  const token = cookies().get('token')?.value || ''
  let user: User | null = null
  let userId: number | null = null

  try {
    const result = await verifyJwt(token)
    if (!result) throw new Error('JWT verification failed')
    userId = Number(result.id)
  } catch (error) {
    console.error('JWT verification failed:', error)
    return NextResponse.json(null)
  }

  if (isNaN(userId)) {
    return NextResponse.json(
      {
        error: {
          code: 400,
          message: 'Invalid user ID',
        },
      },
      { status: 400 },
    )
  }

  try {
    user = await getPrismaClient().user.findUnique({
      where: { id: userId },
    })

    user = serializeBigInt(user)
  } catch (error) {
    console.error('error: ', error)
    return NextResponse.json(
      {
        error: {
          code: 500,
          message: errorMessages[500],
        },
      },
      { status: 500 },
    )
  }

  if (!user) {
    return NextResponse.json(
      {
        error: {
          code: 404,
          message: 'User not found',
        },
      },
      { status: 404 },
    )
  }

  return NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    companyId: user.companyId,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  })
}
