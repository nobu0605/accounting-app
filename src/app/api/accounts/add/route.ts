import { NextRequest, NextResponse } from 'next/server'
import { errorMessages } from '@/constants/error'
import { accountSchemaForBackEnd } from '@/features/setting/account/add/schema'
import { getCompanyByToken } from '@/utils/api/company'
import prisma from '@/utils/api/db'

export async function POST(req: NextRequest) {
  const request = await req.json()
  const validatedData = accountSchemaForBackEnd.parse(request)
  const codeRange = getCodeRangeByType(validatedData.type)

  if (!codeRange) {
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

  try {
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

    const lastAccount = await prisma.account.findFirst({
      where: { type: validatedData.type, companyId: company.id },
      orderBy: { code: 'desc' },
    })

    if (!lastAccount) {
      return NextResponse.json(
        {
          error: {
            code: 404,
            message: 'Last account not found',
          },
        },
        { status: 404 },
      )
    }
    const code = lastAccount.code + 10

    await prisma.account.create({
      data: {
        name: validatedData.name,
        type: validatedData.type,
        isDefaultAccount: false,
        companyId: company.id,
        code: code,
      },
    })
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

  return NextResponse.json(
    {
      message: 'Resource created successfully',
    },
    { status: 200 },
  )
}

function getCodeRangeByType(type: string) {
  switch (type) {
    case 'currentAssets':
      return { start: 1000, end: 1999 }
    case 'nonCurrentAssets':
      return { start: 2000, end: 2999 }
    case 'currentLiabilities':
      return { start: 3000, end: 3999 }
    case 'sales':
      return { start: 4000, end: 4999 }
    case 'costOfGoodsSold':
      return { start: 5000, end: 5999 }
    case 'sellingGeneralAdminExpenses':
      return { start: 6000, end: 6999 }
    case 'nonOperatingIncome':
      return { start: 7000, end: 7999 }
    case 'nonOperatingExpenses':
      return { start: 8000, end: 8999 }
    case 'specialIncome':
      return { start: 9000, end: 9999 }
    case 'specialExpenses':
      return { start: 9000, end: 9999 }
    default:
      return null
  }
}
