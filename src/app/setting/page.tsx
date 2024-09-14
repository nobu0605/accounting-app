'use client'
import React from 'react'
import { Flex } from '@/components/ui/Flex'
import { Loading } from '@/components/ui/Loading'
import { useAccount } from '@/features/account/hooks/useAccount'
import { AccountsTable } from '@/features/setting/components/AccountsTable'

export default function Setting() {
  const { accounts, isLoading } = useAccount()

  if (isLoading)
    return (
      <Flex $content='center'>
        <Loading />
      </Flex>
    )

  if (!accounts) {
    return (
      <Flex $content='center'>
        <span>no data</span>
      </Flex>
    )
  }

  return (
    <>
      <AccountsTable accounts={accounts} />
    </>
  )
}
