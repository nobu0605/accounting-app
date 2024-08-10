import dayjs, { type Dayjs } from 'dayjs'
import * as z from 'zod'

const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' })

const commonRegisterSchema = {
  userName: z.string().min(1, { message: 'User name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: passwordSchema,
  companyName: z.string().min(1, { message: 'Company Name is required' }),
  industryClass: z.optional(z.string()),
  numberOfEmployees: z.optional(z.number()),
}

export const registerSchema = z
  .object({
    ...commonRegisterSchema,
    confirmPassword: z.string().min(1, { message: 'Confirm Password is required' }),
    fiscalStartDate: z.instanceof(dayjs as unknown as typeof Dayjs),
    fiscalEndDate: z.instanceof(dayjs as unknown as typeof Dayjs),
    foundedDate: z.instanceof(dayjs as unknown as typeof Dayjs),
  })
  .refine((data) => data.fiscalEndDate.isAfter(data.fiscalStartDate), {
    message: 'Fiscal End Date must be after Fiscal Start Date',
    path: ['fiscalEndDate'],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type RegisterSchemaType = z.infer<typeof registerSchema>

export const registerSchemaForBackEnd = z.object({
  ...commonRegisterSchema,
  fiscalStartDate: z.string(),
  fiscalEndDate: z.string(),
  foundedDate: z.string(),
})
