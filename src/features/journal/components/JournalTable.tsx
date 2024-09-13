'use client'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
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
