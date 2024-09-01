import { NextRequest, NextResponse } from 'next/server'
import { errorMessages } from '@/constants/error'
import { Account } from '@/features/transaction/types/account'
import prisma from '@/utils/api/db'
import { serializeBigInt } from '@/utils/api/serialize'

export async function GET(req: NextRequest, { params }: { params: { companyId: string } }) {
  let accounts: {
    accounts: Account[]
  }[] = [
    {
      accounts: [],
    },
  ]

  const companyId = parseInt(params.companyId)
  if (isNaN(companyId)) {
    return NextResponse.json(
      {
        error: {
          code: 400,
          message: 'Invalid company ID',
        },
      },
      { status: 400 },
    )
  }

  try {
    accounts = await prisma.company.findMany({
      select: {
        accounts: {
          select: {
            id: true,
            companyId: true,
            name: true,
            code: true,
            type: true,
            isDefaultAccount: true,
            subAccounts: {
              select: {
                id: true,
                name: true,
                code: true,
              },
            },
          },
        },
      },
      where: {
        id: companyId,
      },
    })

    if (accounts[0].accounts.length === 0) {
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
    return NextResponse.json(accounts[0].accounts)
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
