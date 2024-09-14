'use client'
import React from 'react'
import { styled } from 'styled-components'
import { Flex } from '@/components/ui/Flex'
import { Loading } from '@/components/ui/Loading'
import { getFiscalYear } from '@/features/fiscalYear/utils/localStorage'
import { ReportGraph } from '@/features/report/components/ReportGraph'
import { useReport } from '@/features/report/hooks/useReport'

export default function Report() {
  const fiscalYear = getFiscalYear()
  const { reports, isLoading } = useReport(fiscalYear?.startDate, fiscalYear?.endDate)

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
      <StyledGraphTitleSpan>Financial Report</StyledGraphTitleSpan>
      <StyledTableFlex $direction='row' $content='center'>
        {Object.entries(reports).map(([key, report]) => (
          <StyledGraphDiv key={key}>
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

const StyledGraphDiv = styled('div')`
  width: 30%;
`

const StyledGraphTitleSpan = styled('span')`
  font-size: 20px;
  font-weight: bold;
`
