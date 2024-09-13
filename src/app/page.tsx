'use client'
import React from 'react'
import { Flex } from '@/components/ui/Flex'
import { Loading } from '@/components/ui/Loading'
import { getFiscalYear } from '@/features/fiscalYear/utils/localStorage'
import { RevenueAndExpenseGraph } from '@/features/home/components/RevenueAndExpenseGraph'
import { RevenueAndExpenseTable } from '@/features/home/components/RevenueAndExpenseTable'
import { useRevenueAndExpense } from '@/features/home/hooks/useRevenueAndExpense'

export default function Home() {
  const fiscalYear = getFiscalYear()
  const { revenueAndExpense, isLoading } = useRevenueAndExpense(
    fiscalYear?.startDate,
    fiscalYear?.endDate,
  )

  if (isLoading)
    return (
      <Flex $content='center'>
        <Loading />
      </Flex>
    )

  if (!revenueAndExpense) {
    return (
      <Flex $content='center'>
        <span>no data</span>
      </Flex>
    )
  }

  const { months, revenues, expenses } = revenueAndExpense

  return (
    <>
      <RevenueAndExpenseGraph months={months} revenues={revenues} expenses={expenses} />
      <RevenueAndExpenseTable months={months} revenues={revenues} expenses={expenses} />
    </>
  )
}
