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
import { TransferSlipTableCell } from '@/features/transferSlip/components/TransferSlipTableCell'

type Props = {
  journals: JournalRow[]
}

export function JournalTable({ journals }: Props) {
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
            <TransferSlipTableCell>Debit sub account</TransferSlipTableCell>
            <TransferSlipTableCell>Debit amount</TransferSlipTableCell>
            <TransferSlipTableCell>Credit account</TransferSlipTableCell>
            <TransferSlipTableCell>Credit sub account</TransferSlipTableCell>
            <TransferSlipTableCell>Credit amount</TransferSlipTableCell>
            <TransferSlipTableCell>Description</TransferSlipTableCell>
            <TransferSlipTableCell>Delete</TransferSlipTableCell>
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
