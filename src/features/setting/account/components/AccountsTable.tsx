'use client'
import { TableRow, TableHead, TableCell, TableBody, Table } from '@mui/material'
import React, { useState } from 'react'
import { styled } from 'styled-components'
import { mutate } from 'swr'
import { Button } from '@/components/ui/Button'
import { Flex } from '@/components/ui/Flex'
import { Snackbar } from '@/components/ui/Snackbar'
import { Account } from '@/features/journalEntry/types/account'
import axios from '@/utils/client/axios'

type Props = {
  accounts: Account[]
}

export function AccountsTable({ accounts }: Props) {
  const [snackbarType, setSnackbarType] = useState<'error' | 'success' | null>(null)

  async function handleDeleteAccount(accountId: bigint) {
    if (!confirm('Are you sure you want to delete this account?')) {
      return
    }

    try {
      await axios.delete(`/accounts/${accountId}`)
      await mutate('/accounts')
      setSnackbarType('success')
    } catch (error) {
      console.error('error: ', error)
      setSnackbarType('error')
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
          message={snackbarType === 'success' ? 'Successfully deleted' : 'Failed to delete'}
          severity={snackbarType}
          variant='filled'
        />
      )}
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
              <StyledTableCell>Delete</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account: Account) => (
              <StyledTableRow key={account.id}>
                <StyledTableCell>{account.id}</StyledTableCell>
                <StyledTableCell>{account.name}</StyledTableCell>
                <StyledTableCell>{account.code}</StyledTableCell>
                <StyledTableCell>{account.type}</StyledTableCell>
                <StyledTableCell>
                  {!account.isDefaultAccount && (
                    <Button color='inherit' onClick={() => handleDeleteAccount(account.id)}>
                      Delete
                    </Button>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledWrapperFlex>
    </>
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
