import { NextRequest, NextResponse } from 'next/server'
import { errorMessages } from '@/constants/error'
import { Company } from '@/features/setting/types/setting'
import { getCompanyByToken } from '@/utils/api/company'

export async function GET(req: NextRequest) {
  let company: Company | null = null

  try {
    company = await getCompanyByToken()
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

  return NextResponse.json(company)
}
