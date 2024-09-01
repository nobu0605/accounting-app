import { z } from 'zod'

export const fiscalYearSchema = z.object({
  id: z.preprocess((val) => (typeof val === 'string' ? parseInt(val) : val), z.number()),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
})

export type FiscalYearSchemaType = z.infer<typeof fiscalYearSchema>
