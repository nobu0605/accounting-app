import { NextRequest, NextResponse } from 'next/server'
import { errorMessages } from '@/constants/error'
import { getPrismaClient } from '@/utils/api/db'
import { serializeBigInt } from '@/utils/api/serialize'

export async function GET(req: NextRequest, { params }: { params: { fiscalYearId: string } }) {
  const journalLines: any = []

  const fiscalYearId = parseInt(params.fiscalYearId)
  const fiscalYear = await getPrismaClient().fiscalYear.findUnique({
    where: {
      id: fiscalYearId,
    },
  })
  if (isNaN(fiscalYearId) || !fiscalYear) {
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

  try {
    let journalEntries = await getPrismaClient().journalEntry.findMany({
      select: {
        id: true,
        companyId: true,
        dealDate: true,
        fiscalYearId: true,
        lines: {
          select: {
            id: true,
            journalEntryId: true,
            accountId: true,
            subAccountId: true,
            debit: true,
            credit: true,
            description: true,
            account: {
              select: {
                name: true,
              },
            },
            subAccount: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      where: {
        fiscalYearId,
      },
      orderBy: {
        dealDate: 'desc',
      },
      take: 500,
    })

    if (journalEntries.length === 0) {
      return NextResponse.json(
        {
          error: {
            code: 404,
            message: 'JournalEntries not found',
          },
        },
        { status: 404 },
      )
    }

    journalEntries = serializeBigInt(journalEntries)
    journalEntries.forEach((journalEntry) => {
      for (let index = 0; index < journalEntry.lines.length; index) {
        const journal = [journalEntry.lines[index], journalEntry.lines[index + 1]]

        journalLines.push({
          journalEntryId: journalEntry.id,
          dealDate: journalEntry.dealDate,
          debitAccount: journal.find((line) => line.debit > 0)?.account?.name,
          debitSubAccount: journal.find((line) => line.debit > 0)?.subAccount?.name,
          debitAmount: journal.find((line) => line.debit > 0)?.debit,
          creditAccount: journal.find((line) => line.credit > 0)?.account?.name,
          creditSubAccount: journal.find((line) => line.credit > 0)?.subAccount?.name,
          creditAmount: journal.find((line) => line.credit > 0)?.credit,
          description: journal.find((line) => line.description)?.description,
        })
        index = index + 2
      }
    })

    return NextResponse.json(journalLines)
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
