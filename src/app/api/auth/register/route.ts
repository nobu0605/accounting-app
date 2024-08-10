import { PrismaClient, Company } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { errorMessages } from '@/constants/error'
import { registerSchemaForBackEnd } from '@/features/register/schema'
import { hashPassword } from '@/utils/api/auth'

const prisma = new PrismaClient()

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

    await prisma.$transaction(async (prisma) => {
      const company: Company = await prisma.company.create({
        data: {
          name: companyName,
          industryClass,
          numberOfEmployees,
          fiscalStartDate,
          fiscalEndDate,
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
  } finally {
    await prisma.$disconnect()
  }

  return NextResponse.json(
    {
      message: 'Resource created successfully',
    },
    { status: 200 },
  )
}
