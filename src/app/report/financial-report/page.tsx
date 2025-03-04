'use client'
import React from 'react'
import { styled } from 'styled-components'
import { Flex } from '@/components/ui/Flex'
import { Loading } from '@/components/ui/Loading'
import { mobileWidth } from '@/constants/screen'
import { getSelectedFiscalYear } from '@/features/fiscalYear/utils/localStorage'
import { FinancialReportTable } from '@/features/report/financialReport/components/FinancialReportTable'
import { useFinancialReport } from '@/features/report/financialReport/hooks/useFinancialReport'

export default function FinancialReport() {
  const fiscalYear = getSelectedFiscalYear()
  const { financialReports, isLoading } = useFinancialReport(
    fiscalYear?.startDate,
    fiscalYear?.endDate,
  )

  if (isLoading) {
    return (
      <Flex $content='center'>
        <Loading />
      </Flex>
    )
  }

  if (!financialReports) {
    return (
      <Flex $content='center'>
        <span>no data</span>
      </Flex>
    )
  }

  return (
    <StyledWrapperDiv>
      <StyledTitleDiv>
        <h1>Financial Reports</h1>
      </StyledTitleDiv>
      <FinancialReportTable
        accountTypeTotals={financialReports.accountTypeTotals}
        sectionTotals={financialReports.sectionTotals}
      />
    </StyledWrapperDiv>
  )
}

const StyledWrapperDiv = styled('div')`
  margin-left: 40px;
  margin-right: 40px;

  @media (max-width: ${mobileWidth}px) {
    margin-left: 10px;
    margin-right: 10px;
  }
`

const StyledTitleDiv = styled('div')`
  margin-bottom: 20px;
`
