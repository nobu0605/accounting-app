'use client'
import dayjs from 'dayjs'
import React from 'react'
import { styled } from 'styled-components'
import { Flex } from '@/components/ui/Flex'
import { Loading } from '@/components/ui/Loading'
import { useCompany } from '@/features/setting/hooks/company/useCompany'

export function CompanyDetail() {
  const { company, isLoading } = useCompany()

  if (isLoading)
    return (
      <Flex $content='center'>
        <Loading />
      </Flex>
    )

  if (!company) {
    return (
      <Flex $content='center'>
        <span>no data</span>
      </Flex>
    )
  }

  return (
    <Flex>
      <StyledWrapperFlex $direction='column' $gap={'15px'}>
        <StyledCompanySpan>Name : {company.name}</StyledCompanySpan>
        <StyledCompanySpan>Industry Class : {company.industryClass}</StyledCompanySpan>
        <StyledCompanySpan>Number of Employees : {company.numberOfEmployees}</StyledCompanySpan>
        <StyledCompanySpan>
          Founded Date : {dayjs(company.foundedDate).format('YYYY/MM/DD')}
        </StyledCompanySpan>
        <StyledCompanySpan>Accounting Term : {company.accountingTerm} year</StyledCompanySpan>
      </StyledWrapperFlex>
    </Flex>
  )
}

const StyledWrapperFlex = styled(Flex)`
  background-color: #f6f6fa;
  width: 100%;
  padding: 20px;
`

const StyledCompanySpan = styled('span')`
  font-size: 20px;
`
