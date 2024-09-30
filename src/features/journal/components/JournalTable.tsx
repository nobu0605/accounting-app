'use client'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import dayjs from 'dayjs'
import { styled } from 'styled-components'
import { Button } from '@/components/ui/Button'
import { Flex } from '@/components/ui/Flex'
import { Journal } from '@/features/journal/components/Journal'
import { JournalRow } from '@/features/journal/types/journal'
import { handleDownload } from '@/features/journal/utils/csv'
import { JournalEntryTableCell } from '@/features/journalEntry/components/JournalEntryTableCell'
import { useWindowSize } from '@/hooks/useWindowSize'

type Props = {
  journals: JournalRow[]
}

export function JournalTable({ journals }: Props) {
  const { isMobile } = useWindowSize()
  const journalsCSV = [
    [
      'Journal id',
      'Deal date',
      'Debit account',
      'Debit sub account',
      'Debit amount',
      'Credit account',
      'Credit sub account',
      'Credit amount',
      'Description',
    ],
    ...journals.map((item) => [
      item.journalEntryId,
      dayjs(item.dealDate).format('YYYY/MM/DD'),
      item.debitAccount,
      item.debitSubAccount,
      item.debitAmount,
      item.creditAccount,
      item.creditSubAccount,
      item.creditAmount,
      item.description,
    ]),
  ]
    .map((e) => e.join(','))
    .join('\n')

  return (
    <Flex $direction='column' $gap={'15px'}>
      <Flex $content={isMobile ? 'flex-start' : 'flex-end'}>
        <Button color='inherit' onClick={() => handleDownload(journalsCSV)}>
          CSV download
        </Button>
      </Flex>
      <Table>
        <TableHead>
          <StyledTableRow>
            <JournalEntryTableCell>Journal id</JournalEntryTableCell>
            <JournalEntryTableCell>Deal date</JournalEntryTableCell>
            <JournalEntryTableCell>Debit account</JournalEntryTableCell>
            <JournalEntryTableCell>Debit sub account</JournalEntryTableCell>
            <JournalEntryTableCell>Debit amount</JournalEntryTableCell>
            <JournalEntryTableCell>Credit account</JournalEntryTableCell>
            <JournalEntryTableCell>Credit sub account</JournalEntryTableCell>
            <JournalEntryTableCell>Credit amount</JournalEntryTableCell>
            <JournalEntryTableCell>Description</JournalEntryTableCell>
            <JournalEntryTableCell>Delete</JournalEntryTableCell>
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
