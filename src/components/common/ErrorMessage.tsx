'use client'
import React, { ReactNode } from 'react'
import { styled } from 'styled-components'

type Props = {
  children: ReactNode
}

export function ErrorMessage({ children }: Props) {
  return <StyledErrorMessage>{children}</StyledErrorMessage>
}

// This style is same as mui error message
const StyledErrorMessage = styled('span')`
  color: #d32f2f;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.66;
  letter-spacing: 0.03333em;
  text-align: left;
  margin-top: 3px;
  margin-right: 14px;
  margin-bottom: 0;
  margin-left: 14px;
`
