'use client'
import React from 'react'
import { MenuCard } from '@/components/common/menu/MenuCard'
import { Flex } from '@/components/ui/Flex'

type MenuContent = {
  icon: JSX.Element
  menuTitle: string
  menus: { name: string; path: string }[]
}

type Props = {
  menuContents: MenuContent[]
}

export function MenuCards({ menuContents }: Props) {
  return (
    <Flex $wrap='wrap' $gap={'15px'}>
      {menuContents.map((content) => {
        return (
          <MenuCard
            key={content.menuTitle}
            icon={content.icon}
            menuTitle={content.menuTitle}
            menus={content.menus}
          />
        )
      })}
    </Flex>
  )
}
