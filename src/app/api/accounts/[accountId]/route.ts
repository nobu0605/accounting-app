import { NextRequest, NextResponse } from 'next/server'
import { errorMessages } from '@/constants/error'
import prisma from '@/utils/api/db'
import { serializeBigInt } from '@/utils/api/serialize'
import { getUserByToken } from '@/utils/api/user'

export async function DELETE(req: NextRequest, { params }: { params: { accountId: string } }) {
  const accountId = parseInt(params.accountId)
  if (isNaN(accountId)) {
    return NextResponse.json(
      {
        error: {
          code: 400,
          message: errorMessages[400],
        },
      },
      { status: 400 },
    )
  }

  let accountWithCompany = await prisma.account.findUnique({
    where: { id: accountId },
    include: {
      company: true,
    },
  })

  if (!accountWithCompany || !accountWithCompany.company) {
    return NextResponse.json(
      {
        error: {
          code: 404,
          message: 'Company not found',
        },
      },
      { status: 404 },
    )
  }
  accountWithCompany = serializeBigInt(accountWithCompany)

  const user = await getUserByToken()
  if (user?.companyId !== accountWithCompany?.company.id) {
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

  try {
    await prisma.account.delete({
      where: { id: accountId },
    })
    return NextResponse.json({ message: 'Account deleted successfully' })
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
}
