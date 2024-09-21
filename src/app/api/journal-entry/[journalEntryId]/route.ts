import { NextRequest, NextResponse } from 'next/server'
import { errorMessages } from '@/constants/error'
import prisma from '@/utils/api/db'
import { serializeBigInt } from '@/utils/api/serialize'
import { getUserByToken } from '@/utils/api/user'

export async function DELETE(req: NextRequest, { params }: { params: { journalEntryId: string } }) {
  const journalEntryId = parseInt(params.journalEntryId)
  if (isNaN(journalEntryId)) {
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

  let journalEntryWithCompany = await prisma.journalEntry.findUnique({
    where: { id: journalEntryId },
    include: {
      company: true,
    },
  })

  if (!journalEntryWithCompany || !journalEntryWithCompany.company) {
    return NextResponse.json(
      {
        error: {
          code: 404,
          message: 'Company not found',
        },
      },
      { status: 404 },
    )
  }
  journalEntryWithCompany = serializeBigInt(journalEntryWithCompany)

  const user = await getUserByToken()
  if (user?.companyId !== journalEntryWithCompany?.company.id) {
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
    await prisma.journalEntry.delete({
      where: { id: journalEntryId },
    })
    return NextResponse.json({ message: 'Journal entry deleted successfully' })
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
