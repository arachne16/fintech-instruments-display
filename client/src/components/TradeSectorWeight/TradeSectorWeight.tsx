import { useState, useEffect } from 'react'
import { ISectorWeight } from '../../types'
import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

const tempProps : ApexOptions = {
  chart: {
    type: 'bar',
    height: 300
  },
  title: {
    text: 'Sector Weight'
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


export default function TradeSectorWeight({sectorWeights}: {sectorWeights: ISectorWeight[]}) {

  const [chartOption, setChartOption] = useState<ApexOptions>(tempProps)
  const [series, setSeries] = useState<ApexOptions["series"]>([])

  useEffect(() => {
    setChartOption({...chartOption, labels: sectorWeights.map(el => el.name)})
    setSeries([
      {
        name: 'equityPercent',
        data: sectorWeights.map(el => el.equityPercent)
      },
      {
        name: 'relativeToCategory',
        data: sectorWeights.map(el => el.relativeToCategory)
      }
   ])
  }, [sectorWeights])

  return (<ReactApexChart options={chartOption} series={series} type="bar" height={300} />)
}