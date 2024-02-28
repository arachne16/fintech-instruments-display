import { useEffect, useState } from 'react'
import { ApexOptions } from 'apexcharts'
import { IMarketCapitalizationBucket } from '../../types'
import ReactApexChart from 'react-apexcharts'

const tempProps : ApexOptions = {
  chart: {
    type: 'bar',
    height: 300
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%'
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: [],
  },
  fill: {
    opacity: 1
  },
}

export default function CapitalizationChart({marketCapitalization}: {marketCapitalization: IMarketCapitalizationBucket[]}) {
 
  const [chartOption, setChartOption] = useState<ApexOptions>(tempProps)
  const [series, setSeries] = useState<ApexOptions["series"]>([])

  useEffect(() => {
    setChartOption({...chartOption, 
      xaxis: {...chartOption.xaxis, 
        categories: marketCapitalization.map(el => el.size)
      }
    })
  }, [marketCapitalization])

  useEffect(() => {
    const result = [
      {
        name: "categoryAverage",
        data: marketCapitalization.map(el => el.categoryAverage)
      },
      {
        name: "benchmark",
        data: marketCapitalization.map(el => el.benchmark)
      },
      {
        name: "portfolioPercent",
        data: marketCapitalization.map(el => el.portfolioPercent)
      },
      {
        name: "value",
        data: marketCapitalization.map(el => el.value)
      }
    ]
    setSeries(result)
  }, [chartOption])

  return (
    <ReactApexChart options={chartOption} series={series} type={'bar'} height={300} />
  )
}