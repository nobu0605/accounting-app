import { AccountType } from '@prisma/client'

export type Account = {
  id: bigint
  companyId: bigint
  name: string
  code: string
  type: AccountType
  isDefaultAccount: boolean
  subAccounts?: SubAccount[]
}

export type SubAccount = {
  id: bigint
  name: string
  code: string
}
