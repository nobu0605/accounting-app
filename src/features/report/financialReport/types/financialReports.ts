import { AccountType } from '@prisma/client'

export type AccountTotal = {
  total: number
  code: number
  id: number
  name: string
  type: AccountType
}

export type AccountTypeTotals = {
  currentAssets: AccountTotal[]
  nonCurrentAssets: AccountTotal[]
  currentLiabilities: AccountTotal[]
  nonCurrentLiabilities: AccountTotal[]
  equity: AccountTotal[]
  sales: AccountTotal[]
  costOfGoodsSold: AccountTotal[]
  sellingGeneralAdminExpenses: AccountTotal[]
  nonOperatingIncome: AccountTotal[]
  nonOperatingExpenses: AccountTotal[]
  specialIncome: AccountTotal[]
  specialExpenses: AccountTotal[]
}

export type SectionTotals = {
  assetTotal: number
  liabilityEquityTotal: number
  incomeTotal: number
  expenseTotal: number
  netIncome: number
}

export type FinancialReports = {
  accountTypeTotals: AccountTypeTotals
  sectionTotals: SectionTotals
}
