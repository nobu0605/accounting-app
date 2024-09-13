'use client'
import { styled } from 'styled-components'
import { Flex } from '@/components/ui/Flex'
import { Loading } from '@/components/ui/Loading'
import { TransferSlipTable } from '@/features/transferSlip/components/TransferSlipTable'
import { useAccount } from '@/features/transferSlip/hooks/useAccount'

export default function TransferSlip() {
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
    <StyledTableDiv>
      <TransferSlipTable accounts={accounts} />
    </StyledTableDiv>
  )
}

const StyledTableDiv = styled('div')`
  padding: 20px;
`
