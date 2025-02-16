import { fiscalYearLocalStorageKey } from '@/constants/localStorageKeys'
import { fiscalYearSchema, FiscalYearSchemaType } from '@/features/fiscalYear/schema'

const localStorageData =
  (typeof window !== 'undefined' && localStorage?.getItem(fiscalYearLocalStorageKey)) || '{}'

export const parsedData = JSON.parse(localStorageData)

export function getSelectedFiscalYear(): FiscalYearSchemaType | null {
  const result = fiscalYearSchema.safeParse(parsedData)

  if (result.success) {
    return result.data
  } else {
    console.error('Validation failed:', result.error)
    return null
  }
}
