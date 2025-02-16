import { NextRequest, NextResponse } from 'next/server'
import { errorMessages } from '@/constants/error'
import { FiscalYear } from '@/features/fiscalYear/types/fiscalYear'
import { getCompanyByToken } from '@/utils/api/company'
import prisma from '@/utils/api/db'
import { serializeBigInt } from '@/utils/api/serialize'

export async function GET(req: NextRequest) {
  let fiscalYears: FiscalYear[] = []

  const company = await getCompanyByToken()
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
    const data = await prisma.fiscalYear.findMany({
      select: {
        id: true,
        startDate: true,
        endDate: true,
      },
      orderBy: {
        id: 'desc',
      },
      where: {
        companyId: company.id,
      },
    })

    if (data.length === 0) {
      return NextResponse.json(
        {
          error: {
            code: 404,
            message: 'FiscalYear not found',
          },
        },
        { status: 404 },
      )
    }

    fiscalYears = serializeBigInt(data)
    return NextResponse.json(fiscalYears)
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
