'use client'
import { styled } from 'styled-components'
import { JournalTable } from '@/features/journal/components/JournalTable'

export default function Journal() {
  return (
    <StyledTableDiv>
      <JournalTable />
    </StyledTableDiv>
  )
}

const StyledTableDiv = styled('div')`
  padding: 20px;
`
