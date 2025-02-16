import dayjs from 'dayjs'
import { NextRequest, NextResponse } from 'next/server'
import { errorMessages } from '@/constants/error'
import prisma from '@/utils/api/db'
import { getUserByToken } from '@/utils/api/user'

export async function POST(req: NextRequest) {
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
    const latestFiscalYear = await prisma.fiscalYear.findFirst({
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

    if (!latestFiscalYear) {
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

    await prisma.fiscalYear.create({
      data: {
        startDate: dayjs(latestFiscalYear.startDate).add(1, 'year').toDate(),
        endDate: dayjs(latestFiscalYear.endDate).add(1, 'year').toDate(),
        companyId: company.id,
      },
    })

    return NextResponse.json(
      {
        message: 'Resource created successfully',
      },
      { status: 200 },
    )
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
