'use client'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React from 'react'
import { styled } from 'styled-components'
import { Account } from '@/features/journalEntry/types/account'

type Props = {
  accounts: Account[]
}

export function AccountsTable({ accounts }: Props) {
  return (
    <StyledWrapperDiv>
      <StyledTitleDiv>
        <StyledTitleSpan>Accounts setting</StyledTitleSpan>
      </StyledTitleDiv>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>id</StyledTableCell>
            <StyledTableCell>name</StyledTableCell>
            <StyledTableCell>code</StyledTableCell>
            <StyledTableCell>type</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {accounts.map((account: Account) => (
            <StyledTableRow key={account.id}>
              <StyledTableCell>{account.id}</StyledTableCell>
              <StyledTableCell>{account.name}</StyledTableCell>
              <StyledTableCell>{account.code}</StyledTableCell>
              <StyledTableCell>{account.type}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledWrapperDiv>
  )
}

const StyledWrapperDiv = styled('div')`
  margin-left: 40px;
  margin-right: 40px;
`

const StyledTitleSpan = styled('span')`
  font-size: 20px;
`

const StyledTitleDiv = styled('div')`
  margin-bottom: 20px;
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
