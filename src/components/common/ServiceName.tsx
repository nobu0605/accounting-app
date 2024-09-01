'use client'
import PieChartIcon from '@mui/icons-material/PieChart'
import { styled } from '@mui/material'
import { Flex } from '@/components/ui/Flex'
import { mainColor } from '@/constants/colors'

export function ServiceName() {
  return (
    <StyledServiceNameFlex $direction='row' $items='center'>
      <PieChartIcon htmlColor={mainColor} />
      <StyledServiceNameSpan>Accounting</StyledServiceNameSpan>
    </StyledServiceNameFlex>
  )
}

const StyledServiceNameFlex = styled(Flex)`
  padding-left: 10px;
  gap: 10px;
`

const StyledServiceNameSpan = styled('span')`
  font-size: 30px;
  font-family: 'Dancing Script', cursive;
  font-weight: 700;
  color: ${mainColor};
`
