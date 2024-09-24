'use client'
import React from 'react'
import { styled } from 'styled-components'
import { Flex } from '@/components/ui/Flex'
import { mobileWidth } from '@/constants/screen'
import { CompanyDetail } from '@/features/setting/components/company/CompanyDetail'

export default function Setting() {
  return (
    <Flex $content='center'>
      <StyledWrapperFlex $direction='column'>
        <h1>Company</h1>
        <CompanyDetail />
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
