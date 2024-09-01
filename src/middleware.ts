import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { errorMessages } from '@/constants/error'
import { verifyJwt } from '@/utils/api/jwt'

const env = process.env.NODE_ENV
const allowedOrigins = ['http://localhost:3000', 'https://accounting-app-six.vercel.app']
const apiUrlsWithoutAuth = ['/api/auth/register', '/api/auth/login', '/api/auth/me']

export async function middleware(req: NextRequest) {
  const origin = req.headers.get('authority') ?? ''

  console.log('origin: ', origin)
  const isAllowedOrigin = allowedOrigins.includes(origin)
  const response = NextResponse.next()
  const token = cookies().get('token')?.value || ''

  if (!isAllowedOrigin && env === 'production') {
    return NextResponse.json(
      {
        error: {
          code: 403,
          message: errorMessages[403],
        },
      },
      { status: 403 },
    )
  }

  if (apiUrlsWithoutAuth.includes(req.nextUrl.pathname)) {
    return response
  }

  try {
    const result = await verifyJwt(token)
    if (!result) throw new Error('JWT verification failed')
  } catch (error) {
    console.error('JWT verification failed:', error)
    return NextResponse.json(
      {
        error: {
          code: 401,
          message: errorMessages[401],
        },
      },
      { status: 401 },
    )
  }

  return response
}

export const config = {
  matcher: ['/api/:path*'],
}
