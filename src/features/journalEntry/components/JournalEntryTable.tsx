'use client'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import dayjs from 'dayjs'
import { styled } from 'styled-components'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { Button } from '@/components/ui/Button'
import { DatePicker } from '@/components/ui/DatePicker'
import { Flex } from '@/components/ui/Flex'
import { Snackbar } from '@/components/ui/Snackbar'
import { getSelectedFiscalYear } from '@/features/fiscalYear/utils/localStorage'
import { JournalEntry } from '@/features/journalEntry/components/JournalEntry'
import { JournalEntryTableCell } from '@/features/journalEntry/components/JournalEntryTableCell'
import { useJournalEntryForm } from '@/features/journalEntry/hooks/useJournalEntryForm'
import { Account } from '@/features/journalEntry/types/account'
import { useWindowSize } from '@/hooks/useWindowSize'

type EntryMessage = {
  message: string
}

type EntryError = {
  debitAccountId: EntryMessage
  debitAmount: EntryMessage
  creditAccountId: EntryMessage
  creditAmount: EntryMessage
}

type Props = {
  accounts: Account[]
}

export function JournalEntryTable({ accounts }: Props) {
  const fiscalYear = getSelectedFiscalYear()
  const { isMobile } = useWindowSize()
  
  const {
    watch,
    handleSubmit,
    errors,
    setValue,
    entryLinesCount,
    debitTotal,
    creditTotal,
    isMatchTotalError,
    invalidTotalError,
    snackbarType,
    setSnackbarType,
    isSubmitting,
    calculateTotal,
    addRow,
    removeRow,
    onSubmit,
  } = useJournalEntryForm(fiscalYear)

  function renderErrors() {
    if (!errors || !errors.journalEntries) return
    if (!Array.isArray(errors.journalEntries)) return

    return errors.journalEntries.map((entryError: EntryError, index) => (
      <div key={index}>
        <ErrorMessage>Line {index + 1}</ErrorMessage>
        {entryError?.debitAccountId && (
          <ErrorMessage>debit account: {entryError?.debitAccountId.message}</ErrorMessage>
        )}
        {entryError?.debitAmount && (
          <ErrorMessage>debit amount: {entryError?.debitAmount.message}</ErrorMessage>
        )}
        {entryError?.creditAccountId && (
          <ErrorMessage>credit account: {entryError?.creditAccountId.message}</ErrorMessage>
        )}
        {entryError?.creditAmount && (
          <ErrorMessage>credit amount: {entryError?.creditAmount.message}</ErrorMessage>
        )}
      </div>
    ))
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
          message={snackbarType === 'success' ? 'Successfully registered' : 'Failed to register'}
          severity={snackbarType}
          variant='filled'
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex $direction='column' $gap={'15px'}>
          <StyledDatePickerDiv>
            <DatePicker
              label={'Deal Date'}
              value={watch(`dealDate`)}
              onChange={(newValue) => {
                setValue(`dealDate`, newValue ?? dayjs())
              }}
              errorMessage={errors.dealDate?.message}
              isError={!!errors.dealDate}
            />
          </StyledDatePickerDiv>
          <Table>
            <TableHead>
              <StyledTableRow>
                <JournalEntryTableCell>Debit account</JournalEntryTableCell>
                <JournalEntryTableCell>Sub account</JournalEntryTableCell>
                <JournalEntryTableCell>Debit amount</JournalEntryTableCell>
                <JournalEntryTableCell>Credit account</JournalEntryTableCell>
                <JournalEntryTableCell>Sub account</JournalEntryTableCell>
                <JournalEntryTableCell>Credit amount</JournalEntryTableCell>
                <JournalEntryTableCell>Description</JournalEntryTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: entryLinesCount }).map((_, index) => (
                <JournalEntry
                  key={index}
                  lineNumber={index}
                  watch={watch}
                  setValue={setValue}
                  accounts={accounts}
                  calculateTotal={calculateTotal}
                />
              ))}
              <StyledTableRow>
                <JournalEntryTableCell> </JournalEntryTableCell>
                <JournalEntryTableCell> </JournalEntryTableCell>
                <JournalEntryTableCell>
                  <b>total {debitTotal.toLocaleString()}</b>
                </JournalEntryTableCell>
                <JournalEntryTableCell> </JournalEntryTableCell>
                <JournalEntryTableCell> </JournalEntryTableCell>
                <JournalEntryTableCell>
                  <b>total {creditTotal.toLocaleString()}</b>
                </JournalEntryTableCell>
                <JournalEntryTableCell> </JournalEntryTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
          <Flex $direction='column' $content='flex-end' $gap={'15px'}>
            {renderErrors()}
            {isMatchTotalError && (
              <ErrorMessage>Total debit and credit amount does not match</ErrorMessage>
            )}
            {invalidTotalError && (
              <ErrorMessage>Total debit and credit total amount must be grater than 0</ErrorMessage>
            )}
            <Flex $direction='row' $content={isMobile ? 'flex-start' : 'flex-end'} $gap={'15px'}>
              {entryLinesCount > 1 && (
                <Button color='inherit' onClick={() => removeRow()}>
                  Remove a row
                </Button>
              )}
              <Button color='inherit' onClick={() => addRow()}>
                Add a row
              </Button>
            </Flex>
            <Flex $content={isMobile ? 'flex-start' : 'flex-end'}>
              <Button disabled={isSubmitting} type='submit'>
                Register
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </form>
    </>
  )
}

const StyledTableRow = styled(TableRow)`
  th {
    font-weight: 600;
  }
`

const StyledDatePickerDiv = styled.div`
  width: 20%;
  min-width: 200px;
`
