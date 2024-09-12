import { Company } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { defaultAccounts } from '@/constants/account'
import { errorMessages } from '@/constants/error'
import { registerSchemaForBackEnd } from '@/features/register/schema'
import { hashPassword } from '@/utils/api/auth'
import prisma from '@/utils/api/db'

export async function POST(req: NextRequest) {
  const request = await req.json()

  try {
    const validatedData = registerSchemaForBackEnd.parse(request)
    const {
      email,
      password,
      userName,
      companyName,
      industryClass,
      numberOfEmployees,
      fiscalStartDate,
      fiscalEndDate,
      foundedDate,
    } = validatedData
    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.findUnique({
      where: { email },
    })
    if (user) {
      return NextResponse.json(
        {
          error: {
            code: 409,
            message: 'The email is already in use',
          },
        },
        { status: 409 },
      )
    }

    await prisma.$transaction(async (prisma) => {
      const company: Company = await prisma.company.create({
        data: {
          name: companyName,
          industryClass,
          numberOfEmployees,
          foundedDate,
        },
      })
      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: userName,
          companyId: company.id,
        },
      })

      await prisma.fiscalYear.create({
        data: {
          companyId: company.id,
          startDate: fiscalStartDate,
          endDate: fiscalEndDate,
        },
      })

      await prisma.account.createMany({
        data: defaultAccounts.map((account) => {
          return {
            companyId: Number(company.id),
            name: account.name,
            code: account.code,
            type: account.type,
            isDefaultAccount: account.isDefaultAccount,
          }
        }),
      })
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
