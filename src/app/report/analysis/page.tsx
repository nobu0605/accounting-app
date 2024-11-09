'use client'
import React from 'react'
import { styled } from 'styled-components'
import { Flex } from '@/components/ui/Flex'
import { Loading } from '@/components/ui/Loading'
import { getFiscalYear } from '@/features/fiscalYear/utils/localStorage'
import { ReportGraph } from '@/features/report/analysis/components/ReportGraph'
import { useAnalysis } from '@/features/report/analysis/hooks/useAnalysis'
import { useWindowSize } from '@/hooks/useWindowSize'

export default function Analysis() {
  const fiscalYear = getFiscalYear()
  const { analysis, isLoading } = useAnalysis(fiscalYear?.startDate, fiscalYear?.endDate)
  const { isMobile } = useWindowSize()

  if (isLoading) {
    return (
      <Flex $content='center'>
        <Loading />
      </Flex>
    )
  }

  if (!analysis) {
    return (
      <Flex $content='center'>
        <span>no data</span>
      </Flex>
    )
  }

  return (
    <>
      <h1>Financial Analysis</h1>
      <StyledTableFlex $direction={isMobile ? 'column' : 'row'} $content='center'>
        {Object.entries(analysis).map(([key, report]) => (
          <StyledGraphDiv key={key} width={isMobile ? '100%' : '30%'}>
            <ReportGraph graphValues={report} />
          </StyledGraphDiv>
        ))}
      </StyledTableFlex>
    </>
  )
}

const StyledTableFlex = styled(Flex)`
  padding: 20px;
`

const StyledGraphDiv = styled('div')<{ width: string }>`
  width: ${({ width }) => width};
`
