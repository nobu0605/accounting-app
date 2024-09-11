'use client'
import React, { useEffect, useState } from 'react'
import { Flex } from '@/components/ui/Flex'
import { Loading } from '@/components/ui/Loading'
import { getFiscalYear } from '@/features/fiscalYear/utils/localStorage'
import { RevenueAndExpenseGraph } from '@/features/home/components/RevenueAndExpenseGraph'
import { RevenueAndExpenseTable } from '@/features/home/components/RevenueAndExpenseTable'
import axios from '@/utils/client/axios'

export default function Home() {
  const [months, setMonths] = useState<number[]>([])
  const [revenues, setRevenues] = useState<number[]>([])
  const [expenses, setExpenses] = useState<number[]>([])
  const fiscalYear = getFiscalYear()

  useEffect(() => {
    async function fetchRevenueAndExpense() {
      const res = await axios.get(
        `/home?startDate=${fiscalYear?.startDate}&endDate=${fiscalYear?.endDate}`,
      )

      setMonths(res.data.months)
      setRevenues(res.data.revenues)
      setExpenses(res.data.expenses)
    }
    fetchRevenueAndExpense()
  }, [])

  if (revenues.length === 0 || expenses.length === 0)
    return (
      <Flex $content='center'>
        <Loading />
      </Flex>
    )

  return (
    <>
      <RevenueAndExpenseGraph months={months} revenues={revenues} expenses={expenses} />
      <RevenueAndExpenseTable months={months} revenues={revenues} expenses={expenses} />
    </>
  )
}
