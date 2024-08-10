import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { errorMessages } from '@/constants/error'
import { verifyJwt } from '@/utils/api/jwt'

const env = process.env.NODE_ENV
const allowedOrigins = ['http://localhost:3000', 'https://accounting-app-six.vercel.app']
const apiUrlsWithoutAuth = ['/api/auth/register', '/api/auth/login']
const clientUrlsWithoutAuth = ['/register', '/login']

export async function middleware(req: NextRequest) {
  const origin = req.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin)
  const response = NextResponse.next()
  const token = cookies().get('token')?.value || ''

  // for api routes
  if (req.nextUrl.pathname.startsWith('/api/')) {
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

  console.log('req.nextUrl.pathname: ', req.nextUrl.pathname)
  console.log(
    'clientUrlsWithoutAuth.includes(req.nextUrl.pathname): ',
    clientUrlsWithoutAuth.includes(req.nextUrl.pathname),
  )
  // for client routes
  if (clientUrlsWithoutAuth.includes(req.nextUrl.pathname)) {
    return
  }

  try {
    const result = await verifyJwt(token)
    if (!result) throw new Error('JWT verification failed')
  } catch (error) {
    console.error('JWT verification failed:', error)
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return response
}

export const config = {
  // remove unrelated files
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
