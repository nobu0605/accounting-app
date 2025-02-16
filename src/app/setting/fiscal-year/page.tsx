'use client'
import React from 'react'
import { styled } from 'styled-components'
import { useFiscalYears } from './hooks/useFiscalYears'
import { Flex } from '@/components/ui/Flex'
import { Loading } from '@/components/ui/Loading'
import { mobileWidth } from '@/constants/screen'
import { FiscalYearTable } from '@/features/setting/fiscalYear/components/FiscalYearTable'

export default function Setting() {
  const { fiscalYears, isLoading } = useFiscalYears()

  if (isLoading) {
    return (
      <Flex $content='center'>
        <Loading />
      </Flex>
    )
  }

  if (!fiscalYears) {
    return (
      <Flex $content='center'>
        <span>no data</span>
      </Flex>
    )
  }

  return (
    <Flex $content='center'>
      <StyledWrapperFlex $direction='column'>
        <h1>Fiscal Year</h1>
        <FiscalYearTable fiscalYears={fiscalYears} />
      </StyledWrapperFlex>
    </Flex>
  )
}

const StyledWrapperFlex = styled(Flex)`
  min-width: 500px;

  @media screen and (max-width: ${mobileWidth}px) {
    min-width: 100%;
  }
`
