import { Prisma } from '@prisma/client'
import { AccountType } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { errorMessages } from '@/constants/error'
import { AccountTotal } from '@/features/report/financialReport/types/financialReports'
import prisma from '@/utils/api/db'
import { serializeBigInt } from '@/utils/api/serialize'
import { getUserByToken } from '@/utils/api/user'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const startDate = searchParams.get('startDate') || ''
  const endDate = searchParams.get('endDate') || ''
  const user = await getUserByToken()
  const companyId = Number(user?.companyId)

  let accountTypeTotals: {
    [key: string]: AccountTotal[]
  } = {
    currentAssets: [],
    nonCurrentAssets: [],
    currentLiabilities: [],
    nonCurrentLiabilities: [],
    equity: [],
    sales: [],
    costOfGoodsSold: [],
    sellingGeneralAdminExpenses: [],
    nonOperatingIncome: [],
    nonOperatingExpenses: [],
    specialIncome: [],
    specialExpenses: [],
  }

  const debitAccounts = await getAccountTotalsByType(
    companyId,
    startDate,
    endDate,
    [
      'currentAssets',
      'nonCurrentAssets',
      'costOfGoodsSold',
      'sellingGeneralAdminExpenses',
      'nonOperatingExpenses',
      'specialExpenses',
    ],
    'debit',
  )
  debitAccounts.forEach((account) => {
    accountTypeTotals[account.type].push(account)
  })
  const creditAccounts = await getAccountTotalsByType(
    companyId,
    startDate,
    endDate,
    [
      'currentLiabilities',
      'nonCurrentLiabilities',
      'equity',
      'sales',
      'nonOperatingIncome',
      'specialIncome',
    ],
    'credit',
  )
  creditAccounts.forEach((account) => {
    accountTypeTotals[account.type].push(account)
  })
  accountTypeTotals = serializeBigInt(accountTypeTotals)

  const {
    currentAssets,
    nonCurrentAssets,
    currentLiabilities,
    nonCurrentLiabilities,
    equity,
    sales,
    nonOperatingIncome,
    specialIncome,
    costOfGoodsSold,
    sellingGeneralAdminExpenses,
    nonOperatingExpenses,
    specialExpenses,
  } = accountTypeTotals

  const assetTotal = calculateTotal(currentAssets, [nonCurrentAssets])
  const liabilityEquityTotal = calculateTotal(equity, [currentLiabilities, nonCurrentLiabilities])
  const incomeTotal = calculateTotal(sales, [nonOperatingIncome, specialIncome])
  const expenseTotal = calculateTotal(costOfGoodsSold, [
    sellingGeneralAdminExpenses,
    nonOperatingExpenses,
    specialExpenses,
  ])
  const netIncome = incomeTotal - expenseTotal
  const sectionTotals = {
    assetTotal,
    liabilityEquityTotal,
    incomeTotal,
    expenseTotal,
    netIncome,
  }

  try {
    return NextResponse.json({
      accountTypeTotals,
      sectionTotals,
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
}

async function getAccountTotalsByType(
  companyId: number,
  startDate: string,
  endDate: string,
  accountType: AccountType[],
  entryType: 'debit' | 'credit',
): Promise<AccountTotal[]> {
  const totalCalculation = Prisma.sql`
    ${
      entryType === 'debit'
        ? Prisma.sql`SUM(jel.debit) - SUM(jel.credit)`
        : Prisma.sql`SUM(jel.credit) - SUM(jel.debit)`
    }
  `
  const res: AccountTotal[] = await prisma.$queryRaw`
    SELECT 
      ${totalCalculation} as "total",
      acc."id",
      acc."name",
      acc."type",
      acc."code"
    FROM "JournalEntryLine" jel
    INNER JOIN "Account" acc ON jel."accountId" = acc.id
    INNER JOIN "JournalEntry" je ON jel."journalEntryId" = je.id
    WHERE acc."companyId" = ${companyId}
    AND je."dealDate" BETWEEN ${new Date(startDate)} AND ${new Date(endDate)}
    AND acc."type" = ANY (${accountType}::"AccountType"[])
    GROUP BY acc."id"
    ORDER BY acc."code" ASC;
  `

  return res
}

function calculateTotal(
  mainAccountTypeTotalArray: AccountTotal[],
  accountTypeTotalArray?: AccountTotal[][],
): number {
  const accountTypeTotals = accountTypeTotalArray
    ? mainAccountTypeTotalArray.concat(...accountTypeTotalArray)
    : mainAccountTypeTotalArray

  return accountTypeTotals.reduce((acc, accountTotal) => {
    return acc + accountTotal.total
  }, 0)
}
