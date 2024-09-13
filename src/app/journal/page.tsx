'use client'
import { styled } from 'styled-components'
import { Flex } from '@/components/ui/Flex'
import { Loading } from '@/components/ui/Loading'
import { getFiscalYear } from '@/features/fiscalYear/utils/localStorage'
import { JournalTable } from '@/features/journal/components/JournalTable'
import { useJournal } from '@/features/journal/hooks/useJournal'

export default function Journal() {
  const fiscalYear = getFiscalYear()
  const { journals, isLoading } = useJournal(fiscalYear?.id)

  if (isLoading) {
    return (
      <Flex $content='center'>
        <Loading />
      </Flex>
    )
  }

  if (!journals) {
    return (
      <Flex $content='center'>
        <span>no data</span>
      </Flex>
    )
  }

  return (
    <StyledTableDiv>
      <JournalTable journals={journals} />
    </StyledTableDiv>
  )
}

const StyledTableDiv = styled('div')`
  padding: 20px;
`
