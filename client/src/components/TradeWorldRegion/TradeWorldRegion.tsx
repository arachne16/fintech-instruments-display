import { useState, useEffect } from 'react'
import { IWorldRegion } from '../../types'
import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

const tempProps : ApexOptions = {
  chart: {
    height: 300,
    type: 'radar',
    dropShadow: {
      enabled: true,
      blur: 1,
      left: 1,
      top: 1
    }
  },
  title: {
    text: 'World Region'
  },
  stroke: {
    width: 2
  },
  fill: {
    opacity: 0.1
  },
  markers: {
    size: 0
  },
  xaxis: {
    categories: []
  }
}

export default function TradeWorldRegion({worldRegion}: {worldRegion: IWorldRegion[]}) {

  const [chartOption, setChartOption] = useState<ApexOptions>(tempProps)
  const [series, setSeries] = useState<ApexOptions["series"]>([])

  useEffect(() => {
    setChartOption({...chartOption, xaxis:{...chartOption.xaxis, categories: worldRegion.map(el => el.name)}})
    setSeries([
      {
        name: 'equityPercent',
        data: worldRegion.map(el => el.equityPercent)
      },
      {
        name: 'relativeToCategory',
        data: worldRegion.map(el => el.relativeToCategory)
      }
   ])
  }, [worldRegion])

  return (<ReactApexChart options={chartOption} series={series} type="radar" height={300} />)
}