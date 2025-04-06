'use client'
import { TableRow } from '@mui/material'
import { useMemo, useCallback } from 'react'
import { UseFormWatch, UseFormSetValue } from 'react-hook-form'
import { TextField } from '@/components/ui/TextField'
import { AccountSelection } from '@/features/journalEntry/components/AccountSelection'
import { JournalEntryTableCell } from '@/features/journalEntry/components/JournalEntryTableCell'
import { JournalEntriesSchemaType } from '@/features/journalEntry/schema'
import { Account } from '@/features/journalEntry/types/account'
import { groupAccountsByType, getSubAccountsForAccount } from '@/features/journalEntry/utils/journalEntryUtils'

type JournalEntryProps = {
  lineNumber: number
  watch: UseFormWatch<JournalEntriesSchemaType>
  setValue: UseFormSetValue<JournalEntriesSchemaType>
  accounts: Account[]
  calculateTotal: () => void
}

export function JournalEntry({
  lineNumber,
  watch,
  setValue,
  accounts,
  calculateTotal,
}: JournalEntryProps) {
  const groupAccounts = useMemo(() => groupAccountsByType(accounts), [accounts])

  const getSubAccounts = useCallback(
    (accountId: number) => getSubAccountsForAccount(accounts, accountId),
    [accounts]
  )

  return (
    <TableRow>
      <AccountSelection
        type="debit"
        lineNumber={lineNumber}
        watch={watch}
        setValue={setValue}
        groupAccounts={groupAccounts}
        getSubAccounts={getSubAccounts}
        calculateTotal={calculateTotal}
      />
      <AccountSelection
        type="credit"
        lineNumber={lineNumber}
        watch={watch}
        setValue={setValue}
        groupAccounts={groupAccounts}
        getSubAccounts={getSubAccounts}
        calculateTotal={calculateTotal}
      />
      <JournalEntryTableCell>
        <TextField
          label='Description'
          value={watch(`journalEntries.${lineNumber}.description`) || ''}
          onChange={(e) => {
            setValue(`journalEntries.${lineNumber}.description`, e.target.value)
          }}
        />
      </JournalEntryTableCell>
    </TableRow>
  )
}
