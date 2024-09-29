import { AccountType } from '@prisma/client'
import * as z from 'zod'

const AccountTypeValues = Object.values(AccountType)

export const accountSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    type: z.string().min(1, { message: 'Type is required' }),
  })
  .refine((data) => AccountTypeValues.some((accountType) => data.type === accountType), {
    message: 'Invalid account type',
    path: ['type'],
  })

export type AccountSchemaType = z.infer<typeof accountSchema>

export const accountSchemaForBackEnd = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  type: z.nativeEnum(AccountType),
})
