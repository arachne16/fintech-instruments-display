import { useState, useEffect } from 'react'
import { IPerformance } from '../../types'
import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

const tempProps: ApexOptions = {
  chart: {
    height: 300,
    type: 'radialBar',
  },
  title: {
    text: 'Performance'
  },
  plotOptions: {
    radialBar: {
      offsetY: 0,
      startAngle: 0,
      endAngle: 360,
      hollow: {
        margin: 5,
        size: '30%',
        background: 'transparent',
        image: undefined,
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          show: true,
        }
      }
    }
  },
  colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5', '#00e6e6', '#00ff99', '#33cc33', '#77b300', '#cccc00'],
  labels: [],
  legend: {
    show: true,
    floating: true,
    fontSize: '12px',
    position: 'left',
    offsetX: 0,
    offsetY: 0,
    labels: {
      useSeriesColors: true,
    },
    formatter: function(seriesName, opts) {
      return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
    },
    itemMargin: {
      vertical: 0
    }
  },
  responsive: [{
    breakpoint: 350,
    options: {
      legend: {
          show: false
      }
    }
  }]
}

export default function TradeFundPerformance({performanceData}: {performanceData: IPerformance}) {

  const [chartOption, setChartOption] = useState<ApexOptions>(tempProps)
  const [series, setSeries] = useState<ApexOptions["series"]>([])

  useEffect(() => {
    setChartOption({...chartOption, labels: Object.keys(performanceData)})
    setSeries(Object.values(performanceData))
  }, [performanceData])

  return (<ReactApexChart options={chartOption} series={series} type="radialBar" height={300} />)
}