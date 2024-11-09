'use client'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Link from 'next/link'
import React from 'react'
import { styled } from 'styled-components'
import { Flex } from '@/components/ui/Flex'
import { Menu } from '@/features/setting/types/setting'

type Prpos = {
  menus: Menu[]
  menuTitle: string
  icon: React.ReactNode
}

export function MenuCard({ menus, menuTitle, icon }: Prpos) {
  return (
    <StyledWrapperFlex $direction='column' $gap={'15px'}>
      <Card>
        <CardContent>
          <Flex $direction='column' $gap={'15px'}>
            <Flex $items='center' $gap={'5px'}>
              {icon}
              <StyledMenuTitleSpan>{menuTitle}</StyledMenuTitleSpan>
            </Flex>
            {menus.map((menu: Menu) => (
              <StyledMenuFlex key={menu.name} $direction='column' $gap={'10px'}>
                <StyledMenuLink href={menu.path}>
                  <span>{menu.name}</span>
                </StyledMenuLink>
              </StyledMenuFlex>
            ))}
          </Flex>
        </CardContent>
      </Card>
    </StyledWrapperFlex>
  )
}

const StyledMenuTitleSpan = styled('span')`
  font-size: 20px;
`

const StyledWrapperFlex = styled(Flex)`
  min-width: 275px;
  padding-bottom: 10px;
`

const StyledMenuFlex = styled(Flex)`
  :hover {
    background-color: #f6f6fa;
  }
`

const StyledMenuLink = styled(Link)`
  padding: 5px;
`
