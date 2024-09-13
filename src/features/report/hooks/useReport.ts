import useSWR from 'swr'
import { ReportType } from '@/features/report/types/report'
import axios from '@/utils/client/axios'

const fetcher = (url: string) => axios.get<ReportType[]>(url).then((res) => res.data)

export const useReport = (startDate: string | undefined, endDate: string | undefined) => {
  const { data, error, isLoading } = useSWR<ReportType[]>(
    `/report?startDate=${startDate}&endDate=${endDate}`,
    fetcher,
  )

  return {
    report: data
      ? data.map((graphValue: ReportType) => ({ name: graphValue.name, y: graphValue.rate }))
      : undefined,
    isLoading,
    isError: error,
  }
}
