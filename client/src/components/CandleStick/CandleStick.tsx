import { useEffect, useState } from 'react'
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from 'apexcharts'
import { ICandleSticks } from '../../types';

const option: ApexOptions = {
  chart: {
    type: "candlestick",
    height: 350
  },
  title: {
    text: 'CandleStick Chart',
    align: 'left'
  },
  xaxis: {
    type: 'datetime'
  },
  yaxis: {
    tooltip: {
      enabled: true
    }
  }
}


export default function CandleStick({financial}: {financial: string}) {

  const [candleSeries, setCandleSeries] = useState<ApexOptions['series']>([])
  const [tempData, setTempData] = useState<ICandleSticks[]>([]);

  useEffect(() => {
    if(financial !== ''){
      const eventSource = new EventSource(`http://localhost:3000/stream/candlesticks?symbol=${financial}`);
      eventSource.onmessage = (event) => {
        const newData = JSON.parse(event.data);
        console.log(newData)
        setTempData(data => [...data, {x: new Date(newData.date_time), y: [newData.start_price, newData.highest_price, newData.lowest_price, newData.end_price]}]);
      };
      eventSource.onerror = (error) => {
        console.error('EventSource error:', error);
      };
      return () => {
        eventSource.close();
      };
    }
  }, [financial]);

  useEffect(() => {
    setCandleSeries([{data: tempData}])
  }, [tempData])


  return <ReactApexChart width={'100%'} options={option} series={candleSeries} type="candlestick" />
}