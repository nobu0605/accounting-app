'use client'
import * as Highcharts from 'highcharts'
import { HighchartsReact } from 'highcharts-react-official'
import React, { useRef } from 'react'

type Props = {
  months: number[]
  revenues: number[]
  expenses: number[]
}

export function RevenueAndExpenseGraph({ months, revenues, expenses }: Props) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null)

  const options = {
    title: {
      text: 'Revenue and Expense',
    },
    xAxis: {
      categories: months,
      accessibility: {
        description: 'Months of the year',
      },
    },
    yAxis: {
      title: {
        text: 'Amount',
      },
      labels: {
        formatter: function (): string {
          // @ts-expect-error: this is a Highcharts object
          return `$${this.value.toLocaleString()}`
        },
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'Revenue',
        data: revenues,
        connectNulls: true,
      },
      {
        name: 'Expense',
        data: expenses,
        connectNulls: true,
      },
    ],
  }

  return <HighchartsReact highcharts={Highcharts} options={options} ref={chartComponentRef} />
}
