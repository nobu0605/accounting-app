'use client'
import PieChartIcon from '@mui/icons-material/PieChart'
import { styled } from '@mui/material'
import Link from 'next/link'
import { Flex } from '@/components/ui/Flex'
import { mainColor } from '@/constants/colors'

export function Header() {
  return (
    <StyledHeaderFlex $direction='column'>
      <Link href={'/'}>
        <StyledTitleFlex $direction='row' $items='center'>
          <PieChartIcon htmlColor={mainColor} />
          <StyledHomeTitle>Accounting</StyledHomeTitle>
        </StyledTitleFlex>
      </Link>
      <StyledMenuDiv></StyledMenuDiv>
    </StyledHeaderFlex>
  )
}

const StyledHeaderFlex = styled(Flex)`
  padding-top: 10px;
  gap: 10px;
`

const StyledTitleFlex = styled(Flex)`
  padding-left: 10px;
  gap: 10px;
`

const StyledHomeTitle = styled('span')`
  font-size: 30px;
  font-family: 'Dancing Script', cursive;
  font-weight: 700;
  color: ${mainColor};
`

const StyledMenuDiv = styled('div')`
  height: 40px;
  background-color: ${mainColor};
  width: 100%;
`
