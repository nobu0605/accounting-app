'use client'
import { styled } from '@mui/material'
import dayjs from 'dayjs'
import Link from 'next/link'
import { ServiceName } from '@/components/common/ServiceName'
import { Flex } from '@/components/ui/Flex'
import { mainColor } from '@/constants/colors'
import { useAuth } from '@/contexts/AuthContext'
import { getFiscalYear } from '@/features/fiscalYear/utils/localStorage'

type Props = {
  isPrivateRoute: boolean
}

export function Header({ isPrivateRoute }: Props) {
  const user = useAuth()
  const fiscalYear = getFiscalYear()

  return (
    <StyledHeaderFlex $direction='column'>
      {isPrivateRoute ? (
        <>
          <Flex $content='space-between'>
            <StyledServiceNameLink href={'/'}>
              <ServiceName />
            </StyledServiceNameLink>
            <StyledHeaderRightFlex $direction='column'>
              {user && fiscalYear && (
                <>
                  <span>
                    Fiscal year : {dayjs(fiscalYear?.startDate).format('YYYY/MM')} ~{' '}
                    {dayjs(fiscalYear?.endDate).format('YYYY/MM')}
                  </span>
                  <Flex $direction='row' $gap={'8px'}>
                    <StyledUserInfoSpan>Email :{user?.email}</StyledUserInfoSpan>
                    <span>User name :{user?.name}</span>
                  </Flex>
                </>
              )}
            </StyledHeaderRightFlex>
          </Flex>
          <StyledMenuDiv>
            <StyledMenuLists>
              <Link href={'/'}>
                <StyledMenuList>Home</StyledMenuList>
              </Link>
              <Link href={'/transfer-slip'}>
                <StyledMenuList>Transfer Slip</StyledMenuList>
              </Link>
              <Link href={'/journal'}>
                <StyledMenuList>Journal</StyledMenuList>
              </Link>
              <Link href={'/report'}>
                <StyledMenuList>Report</StyledMenuList>
              </Link>
              <Link href={'/setting'}>
                <StyledMenuList>Setting</StyledMenuList>
              </Link>
            </StyledMenuLists>
          </StyledMenuDiv>
        </>
      ) : (
        <ServiceName />
      )}
    </StyledHeaderFlex>
  )
}

const StyledHeaderFlex = styled(Flex)`
  padding-top: 10px;
  gap: 10px;
`

const StyledServiceNameLink = styled(Link)`
  width: 200px;
`

const StyledMenuDiv = styled('div')`
  height: 40px;
  background-color: ${mainColor};
  width: 100%;
`

const StyledMenuLists = styled('ul')`
  list-style-type: none;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 0;
  display: flex;
  flex-direction: row;
  gap: 20px;
`

const StyledMenuList = styled('li')`
  color: white;
`

const StyledHeaderRightFlex = styled(Flex)`
  padding-right: 10px;
`

const StyledUserInfoSpan = styled('span')`
  border-right: 1px solid gray;
  padding-right: 8px;
`
