import { GroupAccounts } from '@/features/journalEntry/components/GroupSelect'
import { Account } from '@/features/journalEntry/types/account'

/**
 * Groups accounts by their type for use in GroupSelect component
 */
export function groupAccountsByType(accounts: Account[]): GroupAccounts {
  return accounts.reduce((accountObject, account) => {
    if (!accountObject[account.type]) {
      accountObject[account.type] = []
    }

    accountObject[account.type].push({
      value: Number(account.id),
      name: account.name,
    })

    return accountObject
  }, {} as GroupAccounts)
}

/**
 * Gets sub-accounts for a given account ID
 */
export function getSubAccountsForAccount(accounts: Account[], accountId: number) {
  const account = accounts.find((account) => Number(account.id) === accountId)
  return account?.subAccounts || []
}

/**
 * Formats a number with locale-specific formatting
 */
export function formatAmount(amount: number): string {
  return amount.toLocaleString()
}
