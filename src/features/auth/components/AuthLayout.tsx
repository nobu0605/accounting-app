'use client'
import React from 'react'
import styled from 'styled-components'
import { Flex } from '@/components/ui/Flex'

type Props = {
  children: React.ReactNode
}

export function AuthLayout({ children }: Props) {
  return <StyledAuthFlex $direction='column'>{children}</StyledAuthFlex>
}

const StyledAuthFlex = styled(Flex)`
  margin: 0 auto;
  margin-bottom: 20px;
  gap: 20px;
  max-width: 650px;
`
