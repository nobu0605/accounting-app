'use client'
import { TableRow } from '@mui/material'
import dayjs from 'dayjs'
import { useState } from 'react'
import { mutate } from 'swr'
import { Button } from '@/components/ui/Button'
import { Snackbar } from '@/components/ui/Snackbar'
import { getFiscalYear } from '@/features/fiscalYear/utils/localStorage'
import { JournalRow } from '@/features/journal/types/journal'
import { JournalEntryTableCell } from '@/features/journalEntry/components/JournalEntryTableCell'
import axios from '@/utils/client/axios'

type Props = {
  journal: JournalRow
}

export function Journal({ journal }: Props) {
  const fiscalYear = getFiscalYear()
  const [snackbarType, setSnackbarType] = useState<'error' | 'success' | null>(null)

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete this journal id ${journal.journalEntryId}?`)) {
      return
    }

    try {
      await axios.delete(`/journal-entry/${journal.journalEntryId}`)
      mutate(`/journal/${fiscalYear?.id}`)
      setSnackbarType('success')
    } catch (error) {
      console.error('Error deleting journal entry: ', error)
      setSnackbarType('error')
    }
  }

  return (
    <>
      {snackbarType && (
        <Snackbar
          vertical='top'
          horizontal='center'
          isOpen={!!snackbarType}
          onClose={() => setSnackbarType(null)}
          autoHideDuration={4000}
          key={'top' + 'center'}
          message={snackbarType === 'success' ? 'Successfully deleted' : 'Failed to delete'}
          severity={snackbarType}
          variant='filled'
        />
      )}
      <TableRow>
        <JournalEntryTableCell>{journal.journalEntryId}</JournalEntryTableCell>
        <JournalEntryTableCell>
          {dayjs(journal.dealDate).format('YYYY/MM/DD')}
        </JournalEntryTableCell>
        <JournalEntryTableCell>{journal.debitAccount}</JournalEntryTableCell>
        <JournalEntryTableCell>{journal.debitSubAccount}</JournalEntryTableCell>
        <JournalEntryTableCell>{journal.debitAmount.toLocaleString()}</JournalEntryTableCell>
        <JournalEntryTableCell>{journal.creditAccount}</JournalEntryTableCell>
        <JournalEntryTableCell>{journal.creditSubAccount}</JournalEntryTableCell>
        <JournalEntryTableCell>{journal.creditAmount.toLocaleString()}</JournalEntryTableCell>
        <JournalEntryTableCell>{journal.description}</JournalEntryTableCell>
        <JournalEntryTableCell>
          <Button onClick={() => handleDelete()} color='inherit'>
            Delete
          </Button>
        </JournalEntryTableCell>
      </TableRow>
    </>
  )
}
