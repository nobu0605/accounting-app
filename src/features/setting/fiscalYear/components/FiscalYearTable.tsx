import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import dayjs from 'dayjs'
import { useState } from 'react'
import { styled } from 'styled-components'
import { mutate } from 'swr'
import { Button } from '@/components/ui/Button'
import { Flex } from '@/components/ui/Flex'
import { Snackbar } from '@/components/ui/Snackbar'
import { fiscalYearLocalStorageKey } from '@/constants/localStorageKeys'
import { FiscalYear } from '@/features/fiscalYear/types/fiscalYear'
import { getSelectedFiscalYear } from '@/features/fiscalYear/utils/localStorage'
import axios from '@/utils/client/axios'

type Props = {
  fiscalYears: FiscalYear[]
}

export const FiscalYearTable = ({ fiscalYears }: Props) => {
  const selectedFiscalYear = getSelectedFiscalYear()
  const [snackbarType, setSnackbarType] = useState<'error' | 'success' | null>(null)

  async function addFiscalYear() {
    try {
      await axios.post('/fiscal-year/add')
      setSnackbarType('success')
      mutate('/fiscal-years')
    } catch (error) {
      setSnackbarType('error')
      console.error(error)
    }
  }

  function selectFiscalYear(fiscalYear: FiscalYear) {
    try {
      localStorage.setItem(fiscalYearLocalStorageKey, JSON.stringify(fiscalYear))
      location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {snackbarType && (
        <Snackbar
          vertical='top'
          horizontal='center'
          isOpen={!!snackbarType}
          onClose={() => setSnackbarType(null)}
          autoHideDuration={4000}
          key={'top' + 'center'}
          message={snackbarType === 'success' ? 'Successfully registered' : 'Failed to register'}
          severity={snackbarType}
          variant='filled'
        />
      )}
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Selected</StyledTableCell>
            <StyledTableCell>Start Date</StyledTableCell>
            <StyledTableCell>End Date</StyledTableCell>
            <StyledTableCell>Select fiscal year</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {fiscalYears.map((fiscalYear) => {
            return (
              <StyledTableRow key={fiscalYear.id}>
                <StyledTableCell>
                  {selectedFiscalYear?.id === fiscalYear.id ? 'Selected' : ''}
                </StyledTableCell>
                <StyledTableCell>
                  {dayjs(fiscalYear?.startDate).format('YYYY/MM/DD')}
                </StyledTableCell>
                <StyledTableCell>{dayjs(fiscalYear?.endDate).format('YYYY/MM/DD')}</StyledTableCell>
                <StyledTableCell>
                  <Flex $content='center'>
                    {selectedFiscalYear?.id !== fiscalYear.id && (
                      <Button color='inherit' onClick={() => selectFiscalYear(fiscalYear)}>
                        Select
                      </Button>
                    )}
                  </Flex>
                </StyledTableCell>
              </StyledTableRow>
            )
          })}
        </TableBody>
      </Table>
      <StyledAddButtonFlex $content='end'>
        <Button onClick={addFiscalYear}>Add a new fiscal year</Button>
      </StyledAddButtonFlex>
    </>
  )
}

const StyledAddButtonFlex = styled(Flex)`
  margin-top: 15px;
`

const StyledTableRow = styled(TableRow)`
  th {
    font-weight: 600;
  }
`

const StyledTableCell = styled(TableCell)`
  border: 1px solid rgba(224, 224, 224, 1);
`
