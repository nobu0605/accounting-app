'use client'
import TableCell from '@mui/material/TableCell'
import { styled } from 'styled-components'

type Props = {
  children: React.ReactNode
  backgroundColor?: string
}

export function JournalEntryTableCell({ children, backgroundColor }: Props) {
  return <StyledTableCell backgroundColor={backgroundColor}>{children}</StyledTableCell>
}

const StyledTableCell = styled(TableCell)<{ backgroundColor?: string }>`
  border: 1px solid #dcdcdc;
  background-color: ${({ backgroundColor }) => backgroundColor};
`
