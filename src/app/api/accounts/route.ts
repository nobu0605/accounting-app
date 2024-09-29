import { NextRequest, NextResponse } from 'next/server'
import { errorMessages } from '@/constants/error'
import { Account } from '@/features/journalEntry/types/account'
import prisma from '@/utils/api/db'
import { serializeBigInt } from '@/utils/api/serialize'
import { getUserByToken } from '@/utils/api/user'

export async function GET(req: NextRequest) {
  let accounts: Account[] = []
  const user = await getUserByToken()

  const companyId = user?.companyId
  const company = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
  })
  if (!company) {
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

  try {
    accounts = await prisma.account.findMany({
      select: {
        id: true,
        companyId: true,
        name: true,
        code: true,
        type: true,
        subAccounts: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
      where: {
        companyId,
      },
      orderBy: {
        code: 'asc',
      },
    })

    if (accounts.length === 0) {
      return NextResponse.json(
        {
          error: {
            code: 404,
            message: 'Accounts not found',
          },
        },
        { status: 404 },
      )
    }

    accounts = serializeBigInt(accounts)
    return NextResponse.json(accounts)
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
