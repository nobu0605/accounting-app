'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import { styled } from 'styled-components'
import { Header } from '@/components/common/Header'
import { publicRoutes } from '@/features/auth/constant'

type Props = {
  children: React.ReactNode
}

export function Layout({ children }: Props) {
  const pathName = usePathname()
  const isPrivateRoute = !publicRoutes.includes(pathName)

  return (
    <>
      <Header isPrivateRoute={isPrivateRoute} />
      <StyledBodyDiv>{children}</StyledBodyDiv>
    </>
  )
}

const StyledBodyDiv = styled('div')`
  overflow-x: auto;
  margin: 10px;
`
