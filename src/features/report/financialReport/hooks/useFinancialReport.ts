import useSWR from 'swr'
import { FinancialReports } from '@/features/report/financialReport/types/financialReports'
import axios from '@/utils/client/axios'

const fetcher = (url: string) => axios.get<FinancialReports>(url).then((res) => res.data)

export const useFinancialReport = (startDate: string | undefined, endDate: string | undefined) => {
  const { data, error, isLoading } = useSWR<FinancialReports>(
    `/report/financial-report?startDate=${startDate}&endDate=${endDate}`,
    fetcher,
  )

  return {
    financialReports: data,
    isLoading,
    isError: error,
  }
}
