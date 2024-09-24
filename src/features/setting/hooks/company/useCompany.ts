import useSWR from 'swr'
import { Company } from '@/features/setting/types/setting'
import axios from '@/utils/client/axios'

const fetcher = (url: string) => axios.get<Company>(url).then((res) => res.data)

export const useCompany = () => {
  const { data, error, isLoading } = useSWR<Company>(`/company`, fetcher)

  return {
    company: data,
    isLoading,
    isError: error,
  }
}
