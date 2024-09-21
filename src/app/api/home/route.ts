import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { NextRequest, NextResponse } from 'next/server'
import { expenseAccountTypes, revenueAccountTypes } from '@/constants/account'
import { errorMessages } from '@/constants/error'
import prisma from '@/utils/api/db'
import { getUserByToken } from '@/utils/api/user'
dayjs.extend(utc)

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

  const expenseResult: Amount[] = await prisma.$queryRaw`
    SELECT 
    DATE_TRUNC('month', je."dealDate") as "month",
    (SUM(jel.debit) - SUM(jel.credit)) as "total"
    FROM "JournalEntryLine" jel
    INNER JOIN "Account" acc ON jel."accountId" = acc.id
    INNER JOIN "JournalEntry" je ON jel."journalEntryId" = je.id
    WHERE acc."companyId" = ${companyId}
    AND acc."type" = ANY (${expenseAccountTypes}::"AccountType"[])
    AND je."dealDate" BETWEEN ${new Date(startDate)} AND ${new Date(endDate)}
    GROUP BY "month"
    ORDER BY "month";
  `

  const revenueResult: Amount[] = await prisma.$queryRaw`
    SELECT 
    DATE_TRUNC('month', je."dealDate") as "month",
    (SUM(jel.credit) - SUM(jel.debit)) as "total"
    FROM "JournalEntryLine" jel
    INNER JOIN "Account" acc ON jel."accountId" = acc.id
    INNER JOIN "JournalEntry" je ON jel."journalEntryId" = je.id
    WHERE acc."companyId" = ${companyId}
    AND acc."type" = ANY (${revenueAccountTypes}::"AccountType"[])
    AND je."dealDate" BETWEEN ${new Date(startDate)} AND ${new Date(endDate)}
    GROUP BY "month"
    ORDER BY "month";
  `
  const months = generateMonthArray(startDate, endDate)
  const expenseTotalArray = generateMonthTotalArray(months, expenseResult)
  const revenueTotalArray = generateMonthTotalArray(months, revenueResult)

  try {
    return NextResponse.json({ months, expenses: expenseTotalArray, revenues: revenueTotalArray })
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

function generateMonthArray(startDate: string, endDate: string): string[] {
  const start = dayjs(startDate)
  const end = dayjs(endDate)
  const result: string[] = []
  let current = start

  while (current.isBefore(end) || current.isSame(end, 'month')) {
    result.push(current.format('YYYY/MM'))
    current = current.add(1, 'month')
  }

  return result
}

function generateMonthTotalArray(months: string[], totalArray: Amount[]) {
  const monthTotalArray: Array<number | null> = months.map((month) => {
    const found = totalArray.find((total) => {
      return dayjs(month).utc().isSame(total.month, 'month')
    })
    return found?.total || null
  })

  return monthTotalArray
}
