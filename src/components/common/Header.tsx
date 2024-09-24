'use client'
import { styled } from '@mui/material'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ServiceName } from '@/components/common/ServiceName'
import { Flex } from '@/components/ui/Flex'
import { Menu } from '@/components/ui/Menu'
import { mainColor } from '@/constants/colors'
import { mobileWidth } from '@/constants/screen'
import { useAuth } from '@/contexts/AuthContext'
import { getFiscalYear } from '@/features/fiscalYear/utils/localStorage'
import axios from '@/utils/client/axios'

type Props = {
  isPrivateRoute: boolean
}

export function Header({ isPrivateRoute }: Props) {
  const user = useAuth()
  const fiscalYear = getFiscalYear()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const router = useRouter()

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  async function logout() {
    await axios.delete('/auth/logout')
    localStorage.removeItem('fiscalYear')
    router.push('/login')
  }

  const menuItems = [
    {
      onClick: () => logout(),
      name: 'Logout',
    },
  ]

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
                    <StyledUserNameSpan onClick={(e) => handleOpenNavMenu(e)}>
                      <StyledtriangleSpan>▾</StyledtriangleSpan>User name :{user?.name}
                    </StyledUserNameSpan>
                  </Flex>
                  <Menu anchorEl={anchorEl} setAnchorEl={setAnchorEl} menuItems={menuItems} />
                </>
              )}
            </StyledHeaderRightFlex>
          </Flex>
          <StyledMenuDiv>
            <StyledMenuLists>
              <Link href={'/'}>
                <StyledMenuList>Home</StyledMenuList>
              </Link>
              <Link href={'/journal-entry'}>
                <StyledMenuList>Journal Entry</StyledMenuList>
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

  @media (max-width: ${mobileWidth}px) {
    padding-left: 15px;
  }
`

const StyledMenuList = styled('li')`
  color: white;
`

const StyledHeaderRightFlex = styled(Flex)`
  padding-right: 10px;

  @media (max-width: ${mobileWidth}px) {
    font-size: 12px;
  }
`

const StyledUserInfoSpan = styled('span')`
  border-right: 1px solid gray;
  padding-right: 8px;
`

const StyledUserNameSpan = styled('span')`
  cursor: pointer;
`

const StyledtriangleSpan = styled('span')`
  font-size: 12px;
  margin-right: 3px;
`
