import { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { IFixedIncome } from '../../types'

const tempProps: ApexOptions = {
  chart: {
    type: 'bar',
    height: 300
  },
  title: {
    text: 'Fixed Income'
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

export default function TradeFundFixedIncome({fixedIncomes}: {fixedIncomes: IFixedIncome[]}) {
  
  const [chartOption, setChartOption] = useState<ApexOptions>(tempProps)
  const [series, setSeries] = useState<ApexOptions["series"]>([])

  useEffect(() => {
    setChartOption({...chartOption, xaxis: {...chartOption.xaxis, categories: fixedIncomes.map(el => el.name)}})
    setSeries([
      {
        name: 'fundPercent',
        data: fixedIncomes.map(el => el.fundPercent)
      },
      {
        name: 'relativeToCategory',
        data: fixedIncomes.map(el => el.relativeToCategory)
      }
    ])
  }, [fixedIncomes])

  return (<ReactApexChart options={chartOption} series={series} type='bar' height={300} />)
}