import { PrismaClient, User } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { errorMessages } from '@/constants/error'
import { serializeBigInt } from '@/utils/api/serialize'

const prisma = new PrismaClient()

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  let user: User | null = null

  const userId = parseInt(params.userId)
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
    user = await prisma.user.findUnique({
      where: { id: userId },
    })

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

    user = serializeBigInt(user)
    return NextResponse.json(user)
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
  } finally {
    await prisma.$disconnect()
  }
}
