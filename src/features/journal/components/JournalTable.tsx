'use client'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { Button } from '@/components/ui/Button'
import { Flex } from '@/components/ui/Flex'
import { Loading } from '@/components/ui/Loading'
import { useAuth } from '@/contexts/AuthContext'
import { getFiscalYear } from '@/features/fiscalYear/utils/localStorage'
import { Journal } from '@/features/journal/components/Journal'
import { JournalRow } from '@/features/journal/types/journal'
import { handleDownload } from '@/features/journal/utils/csv'
import { TransferSlipTableCell } from '@/features/transferSlip/components/TransferSlipTableCell'
import axios from '@/utils/client/axios'

export function JournalTable() {
  const [journals, setJournals] = useState<JournalRow[]>([])
  const user = useAuth()
  const fiscalYear = getFiscalYear()
  const journalsCSV = [
    [
      'Journal id',
      'Deal date',
      'Debit account',
      'Sub account',
      'Debit amount',
      'Credit account',
      'Sub account',
      'Credit amount',
      'Description',
    ],
    ...journals.map((item) => [
      item.creditAccount,
      item.creditAmount,
      item.creditSubAccount,
      item.dealDate,
      item.debitAccount,
      item.debitAmount,
      item.debitSubAccount,
      item.description,
      item.journalEntryId,
    ]),
  ]
    .map((e) => e.join(','))
    .join('\n')

  console.log('journalsCSV: ', journalsCSV)
  useEffect(() => {
    async function getJournal() {
      if (!fiscalYear) return

      try {
        const res = await axios.get(`/journal/${fiscalYear?.id}`)
        setJournals(res.data)
      } catch (error) {
        console.error('error: ', error)
      }
    }

    getJournal()
  }, [user])

  if (journals.length === 0) {
    return (
      <Flex $content='center'>
        <Loading />
      </Flex>
    )
  }

  return (
    <Flex $direction='column' $gap={'15px'}>
      <Flex $content='flex-end'>
        <Button color='inherit' onClick={() => handleDownload(journalsCSV)}>
          CSV download
        </Button>
      </Flex>
      <Table>
        <TableHead>
          <StyledTableRow>
            <TransferSlipTableCell>Journal id</TransferSlipTableCell>
            <TransferSlipTableCell>Deal date</TransferSlipTableCell>
            <TransferSlipTableCell>Debit account</TransferSlipTableCell>
            <TransferSlipTableCell>Sub account</TransferSlipTableCell>
            <TransferSlipTableCell>Debit amount</TransferSlipTableCell>
            <TransferSlipTableCell>Credit account</TransferSlipTableCell>
            <TransferSlipTableCell>Sub account</TransferSlipTableCell>
            <TransferSlipTableCell>Credit amount</TransferSlipTableCell>
            <TransferSlipTableCell>Description</TransferSlipTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {journals.map((journal: JournalRow) => (
            <Journal key={journal.journalEntryId} journal={journal} />
          ))}
        </TableBody>
      </Table>
    </Flex>
  )
}

const StyledTableRow = styled(TableRow)`
  th {
    font-weight: 600;
  }
`
