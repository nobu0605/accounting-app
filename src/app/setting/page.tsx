'use client'
import React from 'react'
import { styled } from 'styled-components'
import { SettingMenu } from '@/features/setting/components/SettingMenu'

export default function Setting() {
  return (
    <StyledWrapperDiv>
      <StyledTitleDiv>
        <StyledTitleSpan>All Settings</StyledTitleSpan>
      </StyledTitleDiv>
      <SettingMenu />
    </StyledWrapperDiv>
  )
}

const StyledWrapperDiv = styled('div')`
  margin-left: 40px;
  margin-right: 40px;
`

const StyledTitleSpan = styled('span')`
  font-size: 25px;
`

const StyledTitleDiv = styled('div')`
  margin-bottom: 20px;
`
