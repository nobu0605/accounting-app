import useSWR from 'swr'
import { JournalRow } from '@/features/journal/types/journal'
import axios from '@/utils/client/axios'

const fetcher = (url: string) => axios.get<JournalRow[]>(url).then((res) => res.data)

export const useJournal = (fiscalYearId: number | undefined) => {
  const { data, error, isLoading } = useSWR<JournalRow[]>(`/journal/${fiscalYearId}`, fetcher)

  return {
    journals: data,
    isLoading,
    isError: error,
  }
}
