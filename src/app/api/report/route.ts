import { AccountType } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { liabilityTypes } from '@/constants/account'
import { errorMessages } from '@/constants/error'
import prisma from '@/utils/api/db'
import { getUserByToken } from '@/utils/api/user'

type Amount = {
  month: string
  total: number
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const startDate = searchParams.get('startDate') || ''
  const endDate = searchParams.get('endDate') || ''
  const user = await getUserByToken()
  const companyId = user?.companyId

  const liabilityResult: Amount[] = await prisma.$queryRaw`
    SELECT 
    (SUM(jel.credit) - SUM(jel.debit)) as "total"
    FROM "JournalEntryLine" jel
    INNER JOIN "Account" acc ON jel."accountId" = acc.id
    INNER JOIN "JournalEntry" je ON jel."journalEntryId" = je.id
    WHERE acc."companyId" = ${companyId}
    AND acc."type" = ANY (${liabilityTypes}::"AccountType"[])
    AND je."dealDate" BETWEEN ${new Date(startDate)} AND ${new Date(endDate)};
  `

  const equityResult: Amount[] = await prisma.$queryRaw`
    SELECT 
    (SUM(jel.credit) - SUM(jel.debit)) as "total"
    FROM "JournalEntryLine" jel
    INNER JOIN "Account" acc ON jel."accountId" = acc.id
    INNER JOIN "JournalEntry" je ON jel."journalEntryId" = je.id
    WHERE acc."companyId" = ${companyId}
    AND acc."type" = ${AccountType.equity}::"AccountType"
    AND je."dealDate" BETWEEN ${new Date(startDate)} AND ${new Date(endDate)};
  `
  const totalAmount = equityResult[0].total + liabilityResult[0].total
  let equityRate = (equityResult[0].total / totalAmount) * 100
  let liabilityRate = (liabilityResult[0].total / totalAmount) * 100
  equityRate = Math.round(equityRate * 10) / 10
  liabilityRate = Math.round(liabilityRate * 10) / 10

  try {
    return NextResponse.json([
      {
        name: 'Equity',
        rate: equityRate,
      },
      {
        name: 'Liability',
        rate: liabilityRate,
      },
    ])
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
