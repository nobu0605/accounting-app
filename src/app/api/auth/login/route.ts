import { NextResponse } from 'next/server'
import { errorMessages } from '@/constants/error'
import { verifyPassword } from '@/utils/api/auth'
import prisma from '@/utils/api/db'
import { tokenMaxAge, signJwt } from '@/utils/api/jwt'
import { serializeBigInt } from '@/utils/api/serialize'

export async function POST(request: Request) {
  const { email, password } = await request.json()
  let token = ''
  let companyId: bigint | undefined = undefined

  try {
    const user = await prisma.user.findUnique({
      select: {
        id: true,
        password: true,
        companyId: true,
      },
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    const isValid = await verifyPassword(password, user.password)

    if (!isValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    token = await signJwt({ id: serializeBigInt(user.id) })
    companyId = serializeBigInt(user.companyId)
  } catch (error) {
    console.error(error)
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

  const response = NextResponse.json({ message: 'Token set', companyId })
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: tokenMaxAge,
    path: '/',
  })

  return response
}
