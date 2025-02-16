import useSWR from 'swr'
import { FiscalYear } from '@/features/fiscalYear/types/fiscalYear'
import axios from '@/utils/client/axios'

const fetcher = (url: string) => axios.get<FiscalYear[]>(url).then((res) => res.data)

export const useFiscalYears = () => {
  const { data, error, isLoading } = useSWR<FiscalYear[]>(`/fiscal-years`, fetcher)

  return {
    fiscalYears: data,
    isLoading,
    isError: error,
  }
}
