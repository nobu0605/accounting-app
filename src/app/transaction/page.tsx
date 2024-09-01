'use client'
import { styled } from 'styled-components'
import { TransferSlipTable } from '@/features/transaction/TransferSlipTable'

export default function Transaction() {
  return (
    <StyledTableDiv>
      <TransferSlipTable />
    </StyledTableDiv>
  )
}

const StyledTableDiv = styled('div')`
  padding: 20px;
`
