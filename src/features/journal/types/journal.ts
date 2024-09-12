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

export type JournalLine = {
  journalEntryId: bigint
  dealDate: Date
  description: string | undefined | null
  debitAccount: string | undefined
  debitSubAccount: string | undefined
  debitAmount: number | undefined
  creditAccount: string | undefined
  creditSubAccount: string | undefined
  creditAmount: number | undefined
}
