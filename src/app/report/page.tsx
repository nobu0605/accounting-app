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
  const { report, isLoading } = useReport(fiscalYear?.startDate, fiscalYear?.endDate)

  if (isLoading) {
    return (
      <Flex $content='center'>
        <Loading />
      </Flex>
    )
  }

  if (!report) {
    return (
      <Flex $content='center'>
        <span>no data</span>
      </Flex>
    )
  }

  return (
    <StyledTableDiv>
      <ReportGraph graphValues={report} />
    </StyledTableDiv>
  )
}

const StyledTableDiv = styled('div')`
  padding: 20px;
`
