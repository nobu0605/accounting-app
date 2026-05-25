import { NextRequest, NextResponse } from 'next/server'
import { errorMessages } from '@/constants/error'
import prisma from '@/utils/api/db'

const keepAliveSecret = process.env.KEEP_ALIVE_SECRET

function isAuthorized(request: NextRequest) {
  if (!keepAliveSecret) {
    throw new Error('KEEP_ALIVE_SECRET is not defined')
  }

  const authorizationHeader = request.headers.get('authorization')
  const bearerToken = authorizationHeader?.startsWith('Bearer ')
    ? authorizationHeader.slice('Bearer '.length)
    : null
  const cronSecret = request.headers.get('x-cron-secret')

  return bearerToken === keepAliveSecret || cronSecret === keepAliveSecret
}

export async function GET(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
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

    await prisma.$queryRaw`SELECT 1`

    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('keepalive failed:', error)

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
}
