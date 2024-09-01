import { NextRequest, NextResponse } from 'next/server'
import { errorMessages } from '@/constants/error'
import { FiscalYear } from '@/features/fiscalYear/types/fiscalYear'
import prisma from '@/utils/api/db'
import { serializeBigInt } from '@/utils/api/serialize'

export async function GET(req: NextRequest, { params }: { params: { companyId: string } }) {
  let fiscalYear: FiscalYear | null = null

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
    fiscalYear = await prisma.fiscalYear.findFirst({
      select: {
        id: true,
        startDate: true,
        endDate: true,
      },
      orderBy: {
        id: 'desc',
      },
      where: {
        companyId,
      },
    })

    if (!fiscalYear) {
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

    fiscalYear = serializeBigInt(fiscalYear)
    return NextResponse.json(fiscalYear)
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
