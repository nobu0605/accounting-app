import dayjs, { type Dayjs } from 'dayjs'
import * as z from 'zod'
import { FiscalYearSchemaType } from '@/features/fiscalYear/schema'

const journalEntry = {
  debitAccountId: z.number().min(1, 'required field'),
  debitSubAccountId: z.optional(z.number().min(1)),
  debitAmount: z.number(),
  creditAccountId: z.number().min(1, 'required field'),
  creditSubAccountId: z.optional(z.number().min(1)),
  creditAmount: z.number(),
  description: z.optional(z.string()),
}

export const journalEntrySchema = z.object(journalEntry)

export type JournalEntrySchemaType = z.infer<typeof journalEntrySchema>

export const journalEntriesSchema = z.object({
  dealDate: z.instanceof(dayjs as unknown as typeof Dayjs),
  journalEntries: z.array(z.object(journalEntry)),
})

export function getJournalEntriesSchema(
  isMatchTotal: boolean,
  setMatchTotalError: (v: boolean) => void,
  fiscalYear: FiscalYearSchemaType | null,
  invalidTotal: boolean,
  setInvalidTotalError: (v: boolean) => void,
) {
  return journalEntriesSchema
    .superRefine((data, ctx) => {
      setMatchTotalError(false)
      setInvalidTotalError(false)

      if (invalidTotal) {
        setInvalidTotalError(true)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid total error',
        })
      }

      if (!isMatchTotal) {
        setMatchTotalError(true)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Total mismatch error',
          path: ['journalEntries'],
        })
      }
    })
    .refine((data) => data.dealDate.isAfter(fiscalYear?.startDate), {
      message: 'Deal Date must be after Fiscal Start Date',
      path: ['dealDate'],
    })
    .refine((data) => data.dealDate.isBefore(fiscalYear?.endDate), {
      message: 'Deal Date must be before Fiscal End Date',
      path: ['dealDate'],
    })
}

export type JournalEntriesSchemaType = z.infer<typeof journalEntriesSchema>

export const journalEntriesSchemaForBackEnd = z.object({
  fiscalYearId: z.number().min(1, 'fiscal year id is required'),
  dealDate: z.string(),
  journalEntries: z.array(z.object(journalEntry)),
})
