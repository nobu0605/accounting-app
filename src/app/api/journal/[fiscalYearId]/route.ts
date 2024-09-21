import { NextRequest, NextResponse } from 'next/server'
import { errorMessages } from '@/constants/error'
import { JournalLine } from '@/features/journal/types/journal'
import prisma from '@/utils/api/db'
import { serializeBigInt } from '@/utils/api/serialize'
import { getUserByToken } from '@/utils/api/user'

export async function GET(req: NextRequest, { params }: { params: { fiscalYearId: string } }) {
  const journalLines: JournalLine[] = []
  const fiscalYearId = parseInt(params.fiscalYearId)
  if (isNaN(fiscalYearId)) {
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

  let fiscalYearWithCompany = await prisma.fiscalYear.findUnique({
    where: { id: fiscalYearId },
    include: {
      company: true,
    },
  })

  if (!fiscalYearWithCompany || !fiscalYearWithCompany.company) {
    return NextResponse.json(
      {
        error: {
          code: 404,
          message: 'Company or FiscalYear not found',
        },
      },
      { status: 404 },
    )
  }
  fiscalYearWithCompany = serializeBigInt(fiscalYearWithCompany)

  const user = await getUserByToken()
  if (user?.companyId !== fiscalYearWithCompany?.company.id) {
    return NextResponse.json(
      {
        error: {
          code: 403,
          message: errorMessages[403],
        },
      },
      { status: 403 },
    )
  }

  try {
    let journalEntries = await prisma.journalEntry.findMany({
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
        id: 'desc',
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
