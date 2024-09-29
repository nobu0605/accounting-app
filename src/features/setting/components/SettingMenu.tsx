'use client'
import BusinessIcon from '@mui/icons-material/Business'
import CalculateIcon from '@mui/icons-material/Calculate'
import React from 'react'
import { Flex } from '@/components/ui/Flex'
import { MenuCard } from '@/features/setting/components/MenuCard'

const accountsMenus = [
  {
    name: 'Accounts list',
    path: '/setting/account',
  },
  {
    name: 'Add new account',
    path: '/setting/account/add',
  },
]

const companyMenus = [
  {
    name: 'Company',
    path: '/setting/company',
  },
]

export function SettingMenu() {
  return (
    <Flex $wrap='wrap' $gap={'15px'}>
      <MenuCard icon={<BusinessIcon />} menuTitle={'Organization'} menus={companyMenus} />
      <MenuCard icon={<CalculateIcon />} menuTitle={'Account'} menus={accountsMenus} />
    </Flex>
  )
}
