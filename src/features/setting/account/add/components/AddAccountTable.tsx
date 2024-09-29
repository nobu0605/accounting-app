'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { TableBody, TableCell, TableHead, TableRow, Table } from '@mui/material'
import { AccountType } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { styled } from 'styled-components'
import { Button } from '@/components/ui/Button'
import { Flex } from '@/components/ui/Flex'
import { Select } from '@/components/ui/Select'
import { Snackbar } from '@/components/ui/Snackbar'
import { TextField } from '@/components/ui/TextField'
import { accountSchema, AccountSchemaType } from '@/features/setting/account/add/schema'
import axios from '@/utils/client/axios'
import { camelToLowerWithSpaces } from '@/utils/common/string'

export function AddAccountsTable() {
  const [snackbarType, setSnackbarType] = useState<'error' | 'success' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const {
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: '',
      type: '',
    },
  })

  async function onSubmit(data: AccountSchemaType) {
    setIsSubmitting(true)
    try {
      await axios.post('/accounts/add', data)
      setSnackbarType('success')
      reset()
      router.refresh()
    } catch (error) {
      setSnackbarType('error')
      console.error(error)
    }
    setIsSubmitting(false)
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
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <StyledWrapperFlex $direction='column' $gap='15px'>
          <div>
            <h1>Add new account</h1>
          </div>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Type</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell>
                  <TextField
                    name='name'
                    label='Name'
                    value={watch('name')}
                    onChange={(e) => setValue('name', e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    required
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <Select
                    label='Type'
                    value={watch('type')}
                    options={Object.values(AccountType).map((account) => {
                      return {
                        value: account,
                        name: camelToLowerWithSpaces(account),
                      }
                    })}
                    onChange={(e) => {
                      setValue('type', e.target.value as string)
                    }}
                    required
                    errorMessage={errors.type?.message}
                  />
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
          <Flex $content='end'>
            <Button disabled={isSubmitting} type='submit'>
              Register
            </Button>
          </Flex>
        </StyledWrapperFlex>
      </form>
    </>
  )
}

const StyledWrapperFlex = styled(Flex)`
  margin-left: 40px;
  margin-right: 40px;
  overflow-x: auto;
  min-width: 400px;
`

const StyledTableRow = styled(TableRow)`
  th {
    font-weight: 600;
  }
`

const StyledTableCell = styled(TableCell)`
  border: 1px solid rgba(224, 224, 224, 1);
`
