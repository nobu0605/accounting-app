import { TableCell, TableRow } from '@mui/material'
import styled from 'styled-components'
import { AccountTotal } from '@/features/report/financialReport/types/financialReports'

type Props = {
  accountTypeTitle: string
  accountTotals: AccountTotal[]
}

export function AccountTypeTableRows({ accountTypeTitle, accountTotals }: Props) {
  return (
    <>
      <StyledAccountTypeTableRow>
        <StyledTableCell colSpan={2}>{accountTypeTitle}</StyledTableCell>
      </StyledAccountTypeTableRow>
      {accountTotals.map((accountTotal: AccountTotal) => {
        return (
          <TableRow key={accountTotal.id}>
            <StyledTableCell>{accountTotal.name}</StyledTableCell>
            <StyledTableCell>{accountTotal.total.toLocaleString()}</StyledTableCell>
          </TableRow>
        )
      })}
    </>
  )
}

const StyledAccountTypeTableRow = styled(TableRow)`
  background-color: #f5f5f5;
`

const StyledTableCell = styled(TableCell)`
  border: 1px solid #dcdcdc;
`
