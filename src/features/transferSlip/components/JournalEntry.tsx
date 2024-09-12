'use client'
import { TableRow } from '@mui/material'
import { UseFormWatch, UseFormSetValue } from 'react-hook-form'
import { Select } from '@/components/ui/Select'
import { TextField } from '@/components/ui/TextField'
import { TransferSlipTableCell } from '@/features/transferSlip/components/TransferSlipTableCell'
import { JournalEntriesSchemaType } from '@/features/transferSlip/schema'
import { Account } from '@/features/transferSlip/types/account'

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
      <TransferSlipTableCell>
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
      </TransferSlipTableCell>
      <TransferSlipTableCell>
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
      </TransferSlipTableCell>
      <TransferSlipTableCell>
        <TextField
          type='number'
          value={watch(`journalEntries.${lineNumber}.debitAmount`) || null}
          onChange={(e) => {
            setValue(`journalEntries.${lineNumber}.debitAmount`, Number(e.target.value))
            calculateTotal()
          }}
        />
      </TransferSlipTableCell>
      <TransferSlipTableCell>
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
      </TransferSlipTableCell>
      <TransferSlipTableCell>
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
      </TransferSlipTableCell>
      <TransferSlipTableCell>
        <TextField
          type='number'
          value={watch(`journalEntries.${lineNumber}.creditAmount`) || null}
          onChange={(e) => {
            setValue(`journalEntries.${lineNumber}.creditAmount`, Number(e.target.value))
            calculateTotal()
          }}
        />
      </TransferSlipTableCell>
      <TransferSlipTableCell>
        <TextField
          value={watch(`journalEntries.${lineNumber}.description`) || ''}
          onChange={(e) => {
            setValue(`journalEntries.${lineNumber}.description`, e.target.value)
          }}
        />
      </TransferSlipTableCell>
    </TableRow>
  )
}
