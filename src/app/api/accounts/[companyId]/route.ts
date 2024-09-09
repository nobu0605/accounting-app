import { NextRequest, NextResponse } from 'next/server'
import { errorMessages } from '@/constants/error'
import { Account } from '@/features/transferSlip/types/account'
import { getPrismaClient } from '@/utils/api/db'
import { serializeBigInt } from '@/utils/api/serialize'

export async function GET(req: NextRequest, { params }: { params: { companyId: string } }) {
  let accounts: Account[] = []

  const companyId = parseInt(params.companyId)
  const company = await getPrismaClient().company.findUnique({
    where: {
      id: companyId,
    },
  })
  if (isNaN(companyId) || !company) {
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
    accounts = await getPrismaClient().account.findMany({
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
