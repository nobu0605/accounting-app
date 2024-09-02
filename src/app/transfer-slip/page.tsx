'use client'
import { styled } from 'styled-components'
import { TransferSlipTable } from '@/features/transferSlip/components/TransferSlipTable'

export default function TransferSlip() {
  return (
    <StyledTableDiv>
      <TransferSlipTable />
    </StyledTableDiv>
  )
}

const StyledTableDiv = styled('div')`
  padding: 20px;
`
