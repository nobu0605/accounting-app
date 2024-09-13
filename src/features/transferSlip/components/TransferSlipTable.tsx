'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { styled } from 'styled-components'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { Button } from '@/components/ui/Button'
import { DatePicker } from '@/components/ui/DatePicker'
import { Flex } from '@/components/ui/Flex'
import { Snackbar } from '@/components/ui/Snackbar'
import { useAuth } from '@/contexts/AuthContext'
import { getFiscalYear } from '@/features/fiscalYear/utils/localStorage'
import { JournalEntry } from '@/features/transferSlip/components/JournalEntry'
import { TransferSlipTableCell } from '@/features/transferSlip/components/TransferSlipTableCell'
import { getJournalEntriesSchema, JournalEntriesSchemaType } from '@/features/transferSlip/schema'
import { Account } from '@/features/transferSlip/types/account'
import axios from '@/utils/client/axios'

type EntryMessage = {
  message: string
}

type EntryError = {
  debitAccountId: EntryMessage
  debitAmount: EntryMessage
  creditAccountId: EntryMessage
  creditAmount: EntryMessage
}

const defaultJournalEntry = {
  debitAccountId: 0,
  debitAmount: 0,
  creditAccountId: 0,
  creditAmount: 0,
}

const defaultValues = {
  dealDate: dayjs(),
  journalEntries: [defaultJournalEntry],
}

const defaultEntryLinesCount = 1

type Props = {
  accounts: Account[]
}

export function TransferSlipTable({ accounts }: Props) {
  const [entryLinesCount, setEntryLinesCount] = useState(defaultEntryLinesCount)
  const [debitTotal, setDebitTotal] = useState<number>(0)
  const [creditTotal, setCreditTotal] = useState<number>(0)
  const isMatchTotal = debitTotal === creditTotal
  const [isMatchTotalError, setIsMatchTotalError] = useState<boolean>(false)
  const [invalidTotalError, setInvalidTotalError] = useState<boolean>(false)
  const invalidTotal = debitTotal === 0 || creditTotal === 0
  const [snackbarType, setSnackbarType] = useState<'error' | 'success' | null>(null)
  const user = useAuth()
  const fiscalYear = getFiscalYear()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(
      getJournalEntriesSchema(
        isMatchTotal,
        setIsMatchTotalError,
        fiscalYear,
        invalidTotal,
        setInvalidTotalError,
      ),
    ),
    defaultValues,
  })

  function resetForm() {
    reset(defaultValues)
    setDebitTotal(0)
    setCreditTotal(0)
    setEntryLinesCount(0)
    setEntryLinesCount(defaultEntryLinesCount)
  }

  async function onSubmit(data: JournalEntriesSchemaType) {
    setIsSubmitting(true)
    try {
      await axios.post('/journal-entry', {
        companyId: user?.companyId,
        fiscalYearId: fiscalYear?.id,
        dealDate: data.dealDate,
        journalEntries: data.journalEntries,
      })
      setSnackbarType('success')
      resetForm()
    } catch (error) {
      console.error('error: ', error)
      setSnackbarType('error')
    }
    setIsSubmitting(false)
  }

  function addRow() {
    setEntryLinesCount(entryLinesCount + 1)
    setValue('journalEntries', [...getValues().journalEntries, defaultJournalEntry])
  }

  function removeRow() {
    setEntryLinesCount(entryLinesCount - 1)
    const journalEntries = getValues().journalEntries
    journalEntries.pop()
    setValue('journalEntries', [...journalEntries])
    calculateTotal()
  }

  function calculateTotal() {
    const journalEntries = getValues().journalEntries
    let debitTotal = 0
    let creditTotal = 0
    journalEntries.forEach((entry) => {
      debitTotal += entry.debitAmount
      creditTotal += entry.creditAmount
    })

    setDebitTotal(debitTotal)
    setCreditTotal(creditTotal)
  }

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
                <TransferSlipTableCell> </TransferSlipTableCell>
                <TransferSlipTableCell> </TransferSlipTableCell>
                <TransferSlipTableCell>
                  <b>total {debitTotal.toLocaleString()}</b>
                </TransferSlipTableCell>
                <TransferSlipTableCell> </TransferSlipTableCell>
                <TransferSlipTableCell> </TransferSlipTableCell>
                <TransferSlipTableCell>
                  <b>total {creditTotal.toLocaleString()}</b>
                </TransferSlipTableCell>
                <TransferSlipTableCell> </TransferSlipTableCell>
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
            <Flex $direction='row' $content='flex-end' $gap={'15px'}>
              {entryLinesCount > 1 && (
                <Button color='inherit' onClick={() => removeRow()}>
                  Remove a row
                </Button>
              )}
              <Button color='inherit' onClick={() => addRow()}>
                Add a row
              </Button>
            </Flex>
            <Flex $content='flex-end'>
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
`
