'use client'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React from 'react'
import { styled } from 'styled-components'
import { Flex } from '@/components/ui/Flex'
import { Account } from '@/features/journalEntry/types/account'

type Props = {
  accounts: Account[]
}

export function AccountsTable({ accounts }: Props) {
  return (
    <StyledWrapperFlex $direction='column' $gap='15px'>
      <div>
        <StyledTitleSpan>Accounts setting</StyledTitleSpan>
      </div>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Code</StyledTableCell>
            <StyledTableCell>Type</StyledTableCell>
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
    </StyledWrapperFlex>
  )
}

const StyledWrapperFlex = styled(Flex)`
  margin-left: 40px;
  margin-right: 40px;
`

const StyledTitleSpan = styled('span')`
  font-size: 20px;
`

const StyledTableRow = styled(TableRow)`
  th {
    font-weight: 600;
  }
`

const StyledTableCell = styled(TableCell)`
  border: 1px solid rgba(224, 224, 224, 1);
`
