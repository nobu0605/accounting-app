import { NextResponse } from 'next/server'
import { decode } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { errorMessages } from '@/constants/error'

const secret = process.env.NEXTAUTH_SECRET ?? ''
const env = process.env.NODE_ENV
const allowedOrigins = ['http://localhost:3000', 'https://accounting-app-six.vercel.app']
const urlsWithoutAuth = [
  '/api/register',
  '/api/auth/session',
  '/api/auth/providers',
  '/api/auth/csrf',
  '/api/auth/callback/credentials',
]

export async function middleware(req: NextRequest) {
  const origin = req.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin)
  const response = NextResponse.next()

  if (isAllowedOrigin || env === 'development') {
    response.headers.set('Access-Control-Allow-Origin', origin)
  } else {
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

  if (urlsWithoutAuth.includes(req.nextUrl.pathname)) {
    return response
  }

  const token = req.headers.get('Authorization')?.split(' ')[1]
  const decodedToken = await decode({
    token,
    secret,
  })
  if (!decodedToken) {
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
  matcher: '/api/:path*',
}
