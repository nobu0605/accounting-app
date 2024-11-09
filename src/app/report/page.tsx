'use client'
import BackupTableIcon from '@mui/icons-material/BackupTable'
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline'
import React from 'react'
import { styled } from 'styled-components'
import { MenuCards } from '@/components/common/menu/MenuCards'

const financialReportsMenus = [
  {
    name: 'Financial Report',
    path: '/report/financial-report',
  },
]

const analysisMenus = [
  {
    name: 'Financial Analysis',
    path: '/report/analysis',
  },
]

const menuContents = [
  {
    icon: <PieChartOutlineIcon />,
    menuTitle: 'Analysis',
    menus: analysisMenus,
  },
  {
    icon: <BackupTableIcon />,
    menuTitle: 'Financial Report',
    menus: financialReportsMenus,
  },
]

export default function Report() {
  return (
    <StyledWrapperDiv>
      <StyledTitleDiv>
        <h1>All Reports</h1>
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
