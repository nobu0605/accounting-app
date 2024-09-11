import { AccountType } from '@prisma/client'

export const revenueAccountTypes: AccountType[] = [
  AccountType.sales,
  AccountType.nonOperatingIncome,
  AccountType.specialIncome,
]

export const expenseAccountTypes: AccountType[] = [
  AccountType.costOfGoodsSold,
  AccountType.sellingGeneralAdminExpenses,
  AccountType.nonOperatingExpenses,
  AccountType.specialExpenses,
]
