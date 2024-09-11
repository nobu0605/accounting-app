'use client'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React from 'react'
import { styled } from 'styled-components'

type Props = {
  months: number[]
  revenues: number[]
  expenses: number[]
}

export function RevenueAndExpenseTable({ months, revenues, expenses }: Props) {
  return (
    <StyledTable>
      <TableHead>
        <StyledTableRow>
          {months.map((month) => (
            <StyledTableCell key={month}>{month}</StyledTableCell>
          ))}
        </StyledTableRow>
      </TableHead>
      <TableBody>
        <StyledTableRow>
          {revenues.map((revenue) => (
            <StyledTableCell key={revenue}>{revenue?.toLocaleString()}</StyledTableCell>
          ))}
        </StyledTableRow>
        <StyledTableRow>
          {expenses.map((expense) => (
            <StyledTableCell key={expense}>{expense?.toLocaleString()}</StyledTableCell>
          ))}
        </StyledTableRow>
      </TableBody>
    </StyledTable>
  )
}

const StyledTable = styled(Table)`
  margin-top: 40px;
`

const StyledTableRow = styled(TableRow)`
  th {
    font-weight: 600;
  }
`

const StyledTableCell = styled(TableCell)`
  border-right: 1px solid rgba(224, 224, 224, 1);
  border-top: 1px solid rgba(224, 224, 224, 1);
`
