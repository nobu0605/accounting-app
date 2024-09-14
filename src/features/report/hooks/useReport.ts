import useSWR from 'swr'
import { ReportType } from '@/features/report/types/report'
import axios from '@/utils/client/axios'

const fetcher = (url: string) => axios.get<ReportType>(url).then((res) => res.data)

export const useReport = (startDate: string | undefined, endDate: string | undefined) => {
  const { data, error, isLoading } = useSWR<ReportType>(
    `/report?startDate=${startDate}&endDate=${endDate}`,
    fetcher,
  )

  return {
    reports: data
      ? {
          equityRatio: data.equityRatio.map((item) => ({
            name: item.name,
            y: item.ratio,
          })),
          assets: data.assets.map((item) => ({
            name: item.name,
            y: item.ratio,
          })),
          operatingProfitMargin: data.operatingProfitMargin.map((item) => ({
            name: item.name,
            y: item.ratio,
          })),
        }
      : undefined,
    isLoading,
    isError: error,
  }
}
