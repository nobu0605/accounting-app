'use client'
import React from 'react'
import { UseFormWatch, UseFormSetValue } from 'react-hook-form'
import { Select } from '@/components/ui/Select'
import { TextField } from '@/components/ui/TextField'
import { GroupSelect, GroupAccounts } from '@/features/journalEntry/components/GroupSelect'
import { JournalEntryTableCell } from '@/features/journalEntry/components/JournalEntryTableCell'
import { JournalEntriesSchemaType } from '@/features/journalEntry/schema'

type AccountSelectionProps = {
  type: 'debit' | 'credit'
  lineNumber: number
  watch: UseFormWatch<JournalEntriesSchemaType>
  setValue: UseFormSetValue<JournalEntriesSchemaType>
  groupAccounts: GroupAccounts
  getSubAccounts: (accountId: number) => { id: bigint; name: string; code: number }[]
  calculateTotal: () => void
}

export function AccountSelection({
  type,
  lineNumber,
  watch,
  setValue,
  groupAccounts,
  getSubAccounts,
  calculateTotal,
}: AccountSelectionProps) {
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1)
  
  return (
    <>
      <JournalEntryTableCell>
        <GroupSelect
          label={`${capitalizedType} account`}
          value={String(watch(`journalEntries.${lineNumber}.${type}AccountId`))}
          options={groupAccounts}
          onChange={(e) => {
            setValue(`journalEntries.${lineNumber}.${type}AccountId`, Number(e.target.value))
          }}
        />
      </JournalEntryTableCell>
      <JournalEntryTableCell>
        <Select
          label={`${capitalizedType} sub account`}
          value={String(watch(`journalEntries.${lineNumber}.${type}SubAccountId`))}
          options={getSubAccounts(watch(`journalEntries.${lineNumber}.${type}AccountId`)).map(
            (account) => {
              return {
                value: Number(account.id),
                name: account.name,
              }
            },
          )}
          onChange={(e) => {
            setValue(`journalEntries.${lineNumber}.${type}SubAccountId`, Number(e.target.value))
          }}
        />
      </JournalEntryTableCell>
      <JournalEntryTableCell>
        <TextField
          label={`${capitalizedType} amount`}
          type='text'
          value={watch(`journalEntries.${lineNumber}.${type}Amount`)}
          onChange={(e) => {
            setValue(`journalEntries.${lineNumber}.${type}Amount`, Number(e.target.value))
            calculateTotal()
          }}
        />
      </JournalEntryTableCell>
    </>
  )
}
