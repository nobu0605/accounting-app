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

export const assetTypes = [AccountType.currentAssets, AccountType.nonCurrentAssets]

export const liabilityTypes = [AccountType.currentLiabilities, AccountType.nonCurrentLiabilities]

export const defaultAccounts = [
  // Revenue
  { name: 'Sales', code: 4000, type: AccountType.sales, isDefaultAccount: true },

  // Cost of Goods Sold
  { name: 'Purchases', code: 5000, type: AccountType.costOfGoodsSold, isDefaultAccount: true },

  // Selling, General and Administrative Expenses
  {
    name: 'Salaries Expense',
    code: 6000,
    type: AccountType.sellingGeneralAdminExpenses,
    isDefaultAccount: true,
  },
  {
    name: 'Bonuses',
    code: 6010,
    type: AccountType.sellingGeneralAdminExpenses,
    isDefaultAccount: true,
  },
  {
    name: 'Advertising Expense',
    code: 6020,
    type: AccountType.sellingGeneralAdminExpenses,
    isDefaultAccount: true,
  },
  {
    name: 'Traveling Expense',
    code: 6030,
    type: AccountType.sellingGeneralAdminExpenses,
    isDefaultAccount: true,
  },
  {
    name: 'Entertainment Expense',
    code: 6040,
    type: AccountType.sellingGeneralAdminExpenses,
    isDefaultAccount: true,
  },
  {
    name: 'Depreciation Expense',
    code: 6050,
    type: AccountType.sellingGeneralAdminExpenses,
    isDefaultAccount: true,
  },

  // Non-Operating Income
  {
    name: 'Interest Income',
    code: 7000,
    type: AccountType.nonOperatingIncome,
    isDefaultAccount: true,
  },
  {
    name: 'Dividend Income',
    code: 7010,
    type: AccountType.nonOperatingIncome,
    isDefaultAccount: true,
  },
  {
    name: 'Gain on Sale of Securities',
    code: 7020,
    type: AccountType.nonOperatingIncome,
    isDefaultAccount: true,
  },
  {
    name: 'Miscellaneous Income',
    code: 7030,
    type: AccountType.nonOperatingIncome,
    isDefaultAccount: true,
  },

  // Non-Operating Expenses
  {
    name: 'Interest Expense',
    code: 8000,
    type: AccountType.nonOperatingExpenses,
    isDefaultAccount: true,
  },
  {
    name: 'Loss on Sale of Securities',
    code: 8010,
    type: AccountType.nonOperatingExpenses,
    isDefaultAccount: true,
  },
  {
    name: 'Miscellaneous Loss',
    code: 8020,
    type: AccountType.nonOperatingExpenses,
    isDefaultAccount: true,
  },

  // Special Income/Expenses
  {
    name: 'Gain on Sale of Fixed Assets',
    code: 9000,
    type: AccountType.specialIncome,
    isDefaultAccount: true,
  },
  {
    name: 'Gain on Sale of Investment Securities',
    code: 9010,
    type: AccountType.specialIncome,
    isDefaultAccount: true,
  },
  {
    name: 'Loss on Disposal of Fixed Assets',
    code: 9100,
    type: AccountType.specialExpenses,
    isDefaultAccount: true,
  },
  {
    name: 'Loss on Sale of Fixed Assets',
    code: 9110,
    type: AccountType.specialExpenses,
    isDefaultAccount: true,
  },
  {
    name: 'Loss on Impairment',
    code: 9120,
    type: AccountType.specialExpenses,
    isDefaultAccount: true,
  },
  {
    name: 'Loss on Devaluation of Investment Securities',
    code: 9130,
    type: AccountType.specialExpenses,
    isDefaultAccount: true,
  },
  {
    name: 'Loss on Sale of Investment Securities',
    code: 9140,
    type: AccountType.specialExpenses,
    isDefaultAccount: true,
  },

  // Current Assets
  { name: 'Cash', code: 1000, type: AccountType.currentAssets, isDefaultAccount: true },
  {
    name: 'Checking Accounts',
    code: 1010,
    type: AccountType.currentAssets,
    isDefaultAccount: true,
  },
  {
    name: 'Savings Accounts',
    code: 1020,
    type: AccountType.currentAssets,
    isDefaultAccount: true,
  },
  {
    name: 'Notes Receivable',
    code: 1030,
    type: AccountType.currentAssets,
    isDefaultAccount: true,
  },
  {
    name: 'Accounts Receivable',
    code: 1040,
    type: AccountType.currentAssets,
    isDefaultAccount: true,
  },
  { name: 'Merchandise', code: 1050, type: AccountType.currentAssets, isDefaultAccount: true },
  {
    name: 'Work in Process',
    code: 1060,
    type: AccountType.currentAssets,
    isDefaultAccount: true,
  },
  {
    name: 'Loans Receivable',
    code: 1070,
    type: AccountType.currentAssets,
    isDefaultAccount: true,
  },
  {
    name: 'Interest Receivable',
    code: 1080,
    type: AccountType.currentAssets,
    isDefaultAccount: true,
  },
  {
    name: 'Prepaid Expenses',
    code: 1090,
    type: AccountType.currentAssets,
    isDefaultAccount: true,
  },

  // Non-Current Assets
  { name: 'Buildings', code: 2000, type: AccountType.nonCurrentAssets, isDefaultAccount: true },
  { name: 'Structures', code: 2010, type: AccountType.nonCurrentAssets, isDefaultAccount: true },
  { name: 'Vehicles', code: 2020, type: AccountType.nonCurrentAssets, isDefaultAccount: true },
  { name: 'Land', code: 2030, type: AccountType.nonCurrentAssets, isDefaultAccount: true },
  { name: 'Goodwill', code: 2040, type: AccountType.nonCurrentAssets, isDefaultAccount: true },
  { name: 'Patents', code: 2050, type: AccountType.nonCurrentAssets, isDefaultAccount: true },
  { name: 'Copyrights', code: 2060, type: AccountType.nonCurrentAssets, isDefaultAccount: true },
  {
    name: 'Investment Securities',
    code: 2070,
    type: AccountType.nonCurrentAssets,
    isDefaultAccount: true,
  },
  {
    name: 'Organization Costs',
    code: 2080,
    type: AccountType.nonCurrentAssets,
    isDefaultAccount: true,
  },

  // Current Liabilities
  {
    name: 'Notes Payable',
    code: 3000,
    type: AccountType.currentLiabilities,
    isDefaultAccount: true,
  },
  {
    name: 'Accounts Payable',
    code: 3010,
    type: AccountType.currentLiabilities,
    isDefaultAccount: true,
  },
  {
    name: 'Short Term Loans Payable',
    code: 3020,
    type: AccountType.currentLiabilities,
    isDefaultAccount: true,
  },
  {
    name: 'Income Taxes Payable',
    code: 3030,
    type: AccountType.currentLiabilities,
    isDefaultAccount: true,
  },
  {
    name: 'Accrued Expenses',
    code: 3040,
    type: AccountType.currentLiabilities,
    isDefaultAccount: true,
  },
  {
    name: 'Advances from Customers',
    code: 3050,
    type: AccountType.currentLiabilities,
    isDefaultAccount: true,
  },
  {
    name: 'Deferred Revenues',
    code: 3060,
    type: AccountType.currentLiabilities,
    isDefaultAccount: true,
  },

  // Non-Current Liabilities
  {
    name: 'Bonds Payable',
    code: 3100,
    type: AccountType.nonCurrentLiabilities,
    isDefaultAccount: true,
  },
  {
    name: 'Long Term Loans Payable',
    code: 3110,
    type: AccountType.nonCurrentLiabilities,
    isDefaultAccount: true,
  },
  {
    name: 'Deposits Received',
    code: 3120,
    type: AccountType.nonCurrentLiabilities,
    isDefaultAccount: true,
  },

  // Equity
  { name: 'Common Stock', code: 3200, type: AccountType.equity, isDefaultAccount: true },
  { name: 'Retained Earnings', code: 3210, type: AccountType.equity, isDefaultAccount: true },
]
