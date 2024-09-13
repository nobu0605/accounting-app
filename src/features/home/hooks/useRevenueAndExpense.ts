import useSWR from 'swr'
import axios from '@/utils/client/axios'

type RevenueAndExpense = {
  months: number[]
  revenues: number[]
  expenses: number[]
}

const fetcher = (url: string) => axios.get<RevenueAndExpense>(url).then((res) => res.data)

export const useRevenueAndExpense = (
  startDate: string | undefined,
  endDate: string | undefined,
) => {
  const { data, error, isLoading } = useSWR<RevenueAndExpense>(
    `/home?startDate=${startDate}&endDate=${endDate}`,
    fetcher,
  )

  return {
    revenueAndExpense: data,
    isLoading,
    isError: error,
  }
}
