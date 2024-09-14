import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest) {
  const cookieStore = cookies()

  cookieStore.set('token', '', {
    expires: new Date(0),
    path: '/',
  })

  return NextResponse.json({ message: 'Cookie deleted' }, { status: 200 })
}
