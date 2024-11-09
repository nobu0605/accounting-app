import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'
import { GraphValue } from '@/features/report/analysis/types/report'

type Props = {
  graphValues: GraphValue[]
}

export function ReportGraph({ graphValues }: Props) {
  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        colors: ['#F08080', 'rgb(44, 175, 254)', '#FF4500'],
        borderRadius: 5,
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
          distance: -50,
          filter: {
            property: 'percentage',
            operator: '>',
            value: 4,
          },
        },
      },
    },
    series: [
      {
        name: 'Share',
        data: graphValues,
      },
    ],
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />
}
