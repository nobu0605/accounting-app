import { Prisma } from '@prisma/client'
import { AccountType } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { liabilityTypes } from '@/constants/account'
import { errorMessages } from '@/constants/error'
import prisma from '@/utils/api/db'
import { getUserByToken } from '@/utils/api/user'

type Amount = {
  total: number
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const startDate = searchParams.get('startDate') || ''
  const endDate = searchParams.get('endDate') || ''
  const user = await getUserByToken()
  const companyId = Number(user?.companyId)

  // Equity Ratio
  const liabilityResult: Amount[] = await getAccountTypeTotal(
    companyId,
    startDate,
    endDate,
    liabilityTypes,
    'credit',
  )

  const equityResult: Amount[] = await getAccountTypeTotal(
    companyId,
    startDate,
    endDate,
    [AccountType.equity],
    'credit',
  )

  const [equityRatio, liabilityRatio] = calculateRatio([
    equityResult[0].total,
    liabilityResult[0].total,
  ])

  // Assets
  const currentAssetsResult: Amount[] = await getAccountTypeTotal(
    companyId,
    startDate,
    endDate,
    [AccountType.currentAssets],
    'debit',
  )

  const nonCurrentAssetsResult: Amount[] = await getAccountTypeTotal(
    companyId,
    startDate,
    endDate,
    [AccountType.nonCurrentAssets],
    'debit',
  )

  const [currentAssetRatio, nonCurrentAssetRatio] = calculateRatio([
    currentAssetsResult[0].total,
    nonCurrentAssetsResult[0].total,
  ])

  // Operating Profit Margin
  const costOfGoodsSoldsResult: Amount[] = await getAccountTypeTotal(
    companyId,
    startDate,
    endDate,
    [AccountType.costOfGoodsSold],
    'debit',
  )

  const sellingGeneralAdminExpensesResult: Amount[] = await getAccountTypeTotal(
    companyId,
    startDate,
    endDate,
    [AccountType.sellingGeneralAdminExpenses],
    'debit',
  )

  const salesResult: Amount[] = await getAccountTypeTotal(
    companyId,
    startDate,
    endDate,
    [AccountType.sales],
    'credit',
  )

  const operatingProfit =
    salesResult[0].total -
    costOfGoodsSoldsResult[0].total -
    sellingGeneralAdminExpensesResult[0].total

  const [costOfGoodsSoldRatio, sellingGeneralAdminExpenseRatio, operatingProfitRatio] =
    calculateRatio([
      costOfGoodsSoldsResult[0].total,
      sellingGeneralAdminExpensesResult[0].total,
      operatingProfit,
    ])

  try {
    return NextResponse.json({
      equityRatio: [
        {
          name: 'Equity',
          ratio: equityRatio,
        },
        {
          name: 'Liability',
          ratio: liabilityRatio,
        },
      ],
      assets: [
        {
          name: 'Current Asset',
          ratio: currentAssetRatio,
        },
        {
          name: 'Non Current Asset',
          ratio: nonCurrentAssetRatio,
        },
      ],
      operatingProfitMargin: [
        {
          name: 'Cost of Goods Sold',
          ratio: costOfGoodsSoldRatio,
        },
        {
          name: 'Selling General Admin Expense',
          ratio: sellingGeneralAdminExpenseRatio,
        },
        {
          name: 'Operating Profit',
          ratio: operatingProfitRatio,
        },
      ],
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

async function getAccountTypeTotal(
  companyId: number,
  startDate: string,
  endDate: string,
  accountType: AccountType[],
  entryType: 'debit' | 'credit',
): Promise<Amount[]> {
  const totalCalculation = Prisma.sql`
    ${
      entryType === 'debit'
        ? Prisma.sql`SUM(jel.debit) - SUM(jel.credit)`
        : Prisma.sql`SUM(jel.credit) - SUM(jel.debit)`
    }
  `
  const res: Amount[] = await prisma.$queryRaw`
    SELECT 
    ${totalCalculation} as "total"
    FROM "JournalEntryLine" jel
    INNER JOIN "Account" acc ON jel."accountId" = acc.id
    INNER JOIN "JournalEntry" je ON jel."journalEntryId" = je.id
    WHERE acc."companyId" = ${companyId}
    AND acc."type" = ANY (${accountType}::"AccountType"[])
    AND je."dealDate" BETWEEN ${new Date(startDate)} AND ${new Date(endDate)};
  `

  return res
}

function calculateRatio(totals: number[]) {
  const totalAmount = totals.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  const ratios = totals.map((total) => {
    let ratio = (total / totalAmount) * 100
    ratio = Math.round(ratio * 10) / 10
    return ratio
  })

  return ratios
}
