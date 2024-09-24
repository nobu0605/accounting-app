import useSWR from 'swr'
import { Account } from '@/features/journalEntry/types/account'
import axios from '@/utils/client/axios'

const fetcher = (url: string) => axios.get<Account[]>(url).then((res) => res.data)

export const useAccount = () => {
  const { data, error, isLoading } = useSWR<Account[]>(`/accounts`, fetcher)

  return {
    accounts: data,
    isLoading,
    isError: error,
  }
}
