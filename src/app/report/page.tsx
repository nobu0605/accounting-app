'use client'
import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { Flex } from '@/components/ui/Flex'
import { Loading } from '@/components/ui/Loading'
import { getFiscalYear } from '@/features/fiscalYear/utils/localStorage'
import { ReportGraph } from '@/features/report/components/ReportGraph'
import axios from '@/utils/client/axios'

export default function Report() {
  const fiscalYear = getFiscalYear()
  const [graphValues, setGraphValues] = useState([])

  useEffect(() => {
    async function fetchReport() {
      const res = await axios.get(
        `/report?startDate=${fiscalYear?.startDate}&endDate=${fiscalYear?.endDate}`,
      )

      setGraphValues(
        res.data.map((graphValue: any) => ({ name: graphValue.name, y: graphValue.rate })),
      )
    }

    fetchReport()
  }, [])

  if (graphValues.length === 0 || !graphValues) {
    return (
      <Flex $content='center'>
        <Loading />
      </Flex>
    )
  }

  return (
    <StyledTableDiv>
      <ReportGraph graphValues={graphValues} />
    </StyledTableDiv>
  )
}

const StyledTableDiv = styled('div')`
  padding: 20px;
`
