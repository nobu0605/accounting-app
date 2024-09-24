'use client'
import React from 'react'
import { styled } from 'styled-components'
import { Flex } from '@/components/ui/Flex'
import { Loading } from '@/components/ui/Loading'
import { mobileWidth } from '@/constants/screen'
import { getFiscalYear } from '@/features/fiscalYear/utils/localStorage'
import { ReportGraph } from '@/features/report/components/ReportGraph'
import { useReport } from '@/features/report/hooks/useReport'
import { useWindowSize } from '@/hooks/useWindowSize'

export default function Report() {
  const fiscalYear = getFiscalYear()
  const { reports, isLoading } = useReport(fiscalYear?.startDate, fiscalYear?.endDate)
  const [windowWidth] = useWindowSize()
  const isMobile = windowWidth < mobileWidth

  if (isLoading) {
    return (
      <Flex $content='center'>
        <Loading />
      </Flex>
    )
  }

  if (!reports) {
    return (
      <Flex $content='center'>
        <span>no data</span>
      </Flex>
    )
  }

  return (
    <>
      <h1>Financial Report</h1>
      <StyledTableFlex $direction={isMobile ? 'column' : 'row'} $content='center'>
        {Object.entries(reports).map(([key, report]) => (
          <StyledGraphDiv key={key} isMobile={isMobile}>
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

const StyledGraphDiv = styled('div')<{ isMobile: boolean }>`
  width: ${({ isMobile }) => (isMobile ? '100%' : '30%')};
`
