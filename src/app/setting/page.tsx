'use client'
import BusinessIcon from '@mui/icons-material/Business'
import CalculateIcon from '@mui/icons-material/Calculate'
import React from 'react'
import { styled } from 'styled-components'
import { MenuCards } from '@/components/common/menu/MenuCards'

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

const menuContents = [
  {
    icon: <BusinessIcon />,
    menuTitle: 'Organization',
    menus: companyMenus,
  },
  {
    icon: <CalculateIcon />,
    menuTitle: 'Account',
    menus: accountsMenus,
  },
]

export default function Setting() {
  return (
    <StyledWrapperDiv>
      <StyledTitleDiv>
        <h1>All Settings</h1>
      </StyledTitleDiv>
      <MenuCards menuContents={menuContents} />
    </StyledWrapperDiv>
  )
}

const StyledWrapperDiv = styled('div')`
  margin-left: 40px;
  margin-right: 40px;
`

const StyledTitleDiv = styled('div')`
  margin-bottom: 20px;
`
