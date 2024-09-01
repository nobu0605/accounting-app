import { JournalEntry } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { errorMessages } from '@/constants/error'
import { journalEntriesSchemaForBackEnd } from '@/features/transaction/schema'
import prisma from '@/utils/api/db'

type JournalEntryLine = {
  journalEntryId: bigint
  accountId: number
  subAccountId?: number
  debit: number
  credit: number
  description?: string
}

export async function POST(req: NextRequest) {
  const request = await req.json()
  const validatedData = journalEntriesSchemaForBackEnd.parse(request)
  const companyId = validatedData.companyId

  if (isNaN(companyId)) {
    return NextResponse.json(
      {
        error: {
          code: 400,
          message: 'Invalid company ID',
        },
      },
      { status: 400 },
    )
  }

  try {
    const company = prisma.company.findUnique({
      where: {
        id: companyId,
      },
    })

    if (!company) {
      return NextResponse.json(
        {
          error: {
            code: 404,
            message: 'company not found',
          },
        },
        { status: 404 },
      )
    }

    await prisma.$transaction(async (prisma) => {
      const journalEntry: JournalEntry = await prisma.journalEntry.create({
        data: {
          companyId,
          fiscalYearId: validatedData.fiscalYearId,
          dealDate: validatedData.dealDate,
        },
      })

      const journalEntryLines: JournalEntryLine[] = []

      validatedData.journalEntries.forEach((line) => {
        journalEntryLines.push({
          journalEntryId: journalEntry.id,
          accountId: line.debitAccountId,
          subAccountId: line.debitSubAccountId,
          debit: line.debitAmount,
          credit: 0,
          description: line.description,
        })

        journalEntryLines.push({
          journalEntryId: journalEntry.id,
          accountId: line.creditAccountId,
          subAccountId: line.creditSubAccountId,
          debit: 0,
          credit: line.creditAmount,
          description: line.description,
        })
      })

      await prisma.journalEntryLine.createMany({
        data: journalEntryLines,
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
