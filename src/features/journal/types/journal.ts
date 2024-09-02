export type JournalRow = {
  journalEntryId: number
  dealDate: string
  description: string
  debitAccount: number
  debitSubAccount: number | null
  debitAmount: number
  creditAccount: number
  creditSubAccount: number | null
  creditAmount: number
}
