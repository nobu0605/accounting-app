'use client'
import { TableRow } from '@mui/material'
import { UseFormWatch, UseFormSetValue } from 'react-hook-form'
import { Select } from '@/components/ui/Select'
import { TextField } from '@/components/ui/TextField'
import { JournalEntryTableCell } from '@/features/journalEntry/components/JournalEntryTableCell'
import { JournalEntriesSchemaType } from '@/features/journalEntry/schema'
import { Account } from '@/features/journalEntry/types/account'

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
  function getSubAccounts(accountId: number) {
    const account = accounts.find((account) => Number(account.id) === accountId)
    return account?.subAccounts || []
  }

  return (
    <TableRow>
      <JournalEntryTableCell>
        <Select
          label='Debit account'
          value={String(watch(`journalEntries.${lineNumber}.debitAccountId`))}
          options={accounts.map((account) => {
            return {
              id: Number(account.id),
              name: account.name,
            }
          })}
          onChange={(e) => {
            setValue(`journalEntries.${lineNumber}.debitAccountId`, Number(e.target.value))
          }}
        />
      </JournalEntryTableCell>
      <JournalEntryTableCell>
        <Select
          label='Debit sub account'
          value={String(watch(`journalEntries.${lineNumber}.debitSubAccountId`))}
          options={getSubAccounts(watch(`journalEntries.${lineNumber}.debitAccountId`)).map(
            (account) => {
              return {
                id: Number(account.id),
                name: account.name,
              }
            },
          )}
          onChange={(e) => {
            setValue(`journalEntries.${lineNumber}.debitSubAccountId`, Number(e.target.value))
          }}
        />
      </JournalEntryTableCell>
      <JournalEntryTableCell>
        <TextField
          type='text'
          value={watch(`journalEntries.${lineNumber}.debitAmount`)}
          onChange={(e) => {
            setValue(`journalEntries.${lineNumber}.debitAmount`, Number(e.target.value))
            calculateTotal()
          }}
        />
      </JournalEntryTableCell>
      <JournalEntryTableCell>
        <Select
          value={String(watch(`journalEntries.${lineNumber}.creditAccountId`))}
          label='Credit account'
          options={accounts.map((account) => {
            return {
              id: Number(account.id),
              name: account.name,
            }
          })}
          onChange={(e) => {
            setValue(`journalEntries.${lineNumber}.creditAccountId`, Number(e.target.value))
          }}
        />
      </JournalEntryTableCell>
      <JournalEntryTableCell>
        <Select
          value={String(watch(`journalEntries.${lineNumber}.creditSubAccountId`))}
          label='Credit sub account'
          options={getSubAccounts(watch(`journalEntries.${lineNumber}.creditAccountId`)).map(
            (account) => {
              return {
                id: Number(account.id),
                name: account.name,
              }
            },
          )}
          onChange={(e) => {
            setValue(`journalEntries.${lineNumber}.creditSubAccountId`, Number(e.target.value))
          }}
        />
      </JournalEntryTableCell>
      <JournalEntryTableCell>
        <TextField
          type='text'
          value={watch(`journalEntries.${lineNumber}.creditAmount`)}
          onChange={(e) => {
            setValue(`journalEntries.${lineNumber}.creditAmount`, Number(e.target.value))
            calculateTotal()
          }}
        />
      </JournalEntryTableCell>
      <JournalEntryTableCell>
        <TextField
          value={watch(`journalEntries.${lineNumber}.description`) || ''}
          onChange={(e) => {
            setValue(`journalEntries.${lineNumber}.description`, e.target.value)
          }}
        />
      </JournalEntryTableCell>
    </TableRow>
  )
}
