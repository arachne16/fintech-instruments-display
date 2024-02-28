import { useState, useEffect } from 'react'
import { IAssetsAllocation } from '../../types'
import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

const tempProps : ApexOptions = {
  chart: {
    type: 'bar',
    height: 300
  },
  title: {
    text: 'Assets Allocation'
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


export default function TradeFundAssets({assetsAllocation}: {assetsAllocation: IAssetsAllocation[]}) {

  const [chartOption, setChartOption] = useState<ApexOptions>(tempProps)
  const [series, setSeries] = useState<ApexOptions["series"]>([])

  useEffect(() => {
    setChartOption({...chartOption, labels: assetsAllocation.map(el => (el?.name ?? ""))})
    setSeries([
      {
        name: 'longPercent',
        data: assetsAllocation.map(el => el.longPercent)
      },
      {
        name: 'shortPercent',
        data: assetsAllocation.map(el => el.shortPercent)
      },
      {
        name: 'netAssetPercent',
        data: assetsAllocation.map(el => el?.netAssetsPercent ?? 0)
      }
    ])
  }, [assetsAllocation])

  return (<ReactApexChart options={chartOption} series={series} type="bar" height={300} />)
}