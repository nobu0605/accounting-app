-- DropForeignKey
ALTER TABLE "JournalEntryLine" DROP CONSTRAINT "JournalEntryLine_journalEntryId_fkey";

-- AddForeignKey
ALTER TABLE "JournalEntryLine" ADD CONSTRAINT "JournalEntryLine_journalEntryId_fkey" FOREIGN KEY ("journalEntryId") REFERENCES "JournalEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
