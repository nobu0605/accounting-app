'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiscalYearSchemaType } from '@/features/fiscalYear/schema'
import { getJournalEntriesSchema, JournalEntriesSchemaType } from '@/features/journalEntry/schema'
import axios from '@/utils/client/axios'

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

export function useJournalEntryForm(fiscalYear: FiscalYearSchemaType | null) {
  const [entryLinesCount, setEntryLinesCount] = useState(defaultEntryLinesCount)
  const [debitTotal, setDebitTotal] = useState<number>(0)
  const [creditTotal, setCreditTotal] = useState<number>(0)
  const isMatchTotal = debitTotal === creditTotal
  const [isMatchTotalError, setIsMatchTotalError] = useState<boolean>(false)
  const [invalidTotalError, setInvalidTotalError] = useState<boolean>(false)
  const invalidTotal = debitTotal === 0 || creditTotal === 0
  const [snackbarType, setSnackbarType] = useState<'error' | 'success' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

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

  const resetForm = () => {
    reset(defaultValues)
    setDebitTotal(0)
    setCreditTotal(0)
    setEntryLinesCount(0)
    setEntryLinesCount(defaultEntryLinesCount)
  }

  const calculateTotal = () => {
    const journalEntries = getValues().journalEntries
    let newDebitTotal = 0
    let newCreditTotal = 0
    journalEntries.forEach((entry) => {
      newDebitTotal += entry.debitAmount
      newCreditTotal += entry.creditAmount
    })

    setDebitTotal(newDebitTotal)
    setCreditTotal(newCreditTotal)
  }

  const addRow = () => {
    setEntryLinesCount(entryLinesCount + 1)
    setValue('journalEntries', [...getValues().journalEntries, defaultJournalEntry])
  }

  const removeRow = () => {
    setEntryLinesCount(entryLinesCount - 1)
    const journalEntries = getValues().journalEntries
    journalEntries.pop()
    setValue('journalEntries', [...journalEntries])
    calculateTotal()
  }

  const onSubmit = async (data: JournalEntriesSchemaType) => {
    setIsSubmitting(true)
    try {
      await axios.post('/journal-entry', {
        fiscalYearId: fiscalYear?.id,
        dealDate: data.dealDate,
        journalEntries: data.journalEntries,
      })
      setSnackbarType('success')
      resetForm()
      router.refresh()
    } catch (error) {
      console.error('error: ', error)
      setSnackbarType('error')
    }
    setIsSubmitting(false)
  }

  return {
    watch,
    handleSubmit,
    errors,
    setValue,
    getValues,
    reset,
    entryLinesCount,
    setEntryLinesCount,
    debitTotal,
    creditTotal,
    isMatchTotal,
    isMatchTotalError,
    invalidTotalError,
    snackbarType,
    setSnackbarType,
    isSubmitting,
    resetForm,
    calculateTotal,
    addRow,
    removeRow,
    onSubmit,
  }
}
