import { PrismaClient, Company, User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'
import { errorMessages } from '@/constants/error'
import { registerSchemaForBackEnd } from '@/features/register/schema'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const request = await req.json()

  let user: User | null = null
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
    const hashedPassword = await bcrypt.hash(password, 10)

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
      user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: userName,
          companyId: company.id,
        },
      })

      return NextResponse.json(user)
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
}
