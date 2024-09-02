'use client'
import { TableRow } from '@mui/material'
import dayjs from 'dayjs'
import { JournalRow } from '@/features/journal/types/journal'
import { TransferSlipTableCell } from '@/features/transferSlip/components/TransferSlipTableCell'

type Props = {
  journal: JournalRow
}

export function Journal({ journal }: Props) {
  return (
    <TableRow>
      <TransferSlipTableCell>{journal.journalEntryId}</TransferSlipTableCell>
      <TransferSlipTableCell>{dayjs(journal.dealDate).format('YYYY/MM/DD')}</TransferSlipTableCell>
      <TransferSlipTableCell>{journal.debitAccount}</TransferSlipTableCell>
      <TransferSlipTableCell>{journal.debitSubAccount}</TransferSlipTableCell>
      <TransferSlipTableCell>{journal.debitAmount}</TransferSlipTableCell>
      <TransferSlipTableCell>{journal.creditAccount}</TransferSlipTableCell>
      <TransferSlipTableCell>{journal.creditSubAccount}</TransferSlipTableCell>
      <TransferSlipTableCell>{journal.creditAmount}</TransferSlipTableCell>
      <TransferSlipTableCell>{journal.description}</TransferSlipTableCell>
    </TableRow>
  )
}
