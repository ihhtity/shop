import { useState, useEffect } from 'react'
import { Card, Row, Col, Select } from 'antd'
import * as echarts from 'echarts'
import { getSalesStat } from '@/api'
import type { SalesData } from '@/types'

const SalesStat = () => {
  const [data, setData] = useState<SalesData[]>([])
  const [days, setDays] = useState(7)

  useEffect(() => {
    fetchData()
  }, [days])

  useEffect(() => {
    if (data.length > 0) {
      const chart = echarts.init(document.getElementById('sales-chart'))
      chart.setOption({
        xAxis: { type: 'category', data: data.map((d) => d.date) },
        yAxis: { type: 'value' },
        series: [{ data: data.map((d) => d.amount), type: 'line' }],
      })
    }
  }, [data])

  const fetchData = async () => {
    const result = await getSalesStat({ days })
    if (result.code === 0) {
      setData(result.data)
    }
  }

  return (
    <div>
      <h2>销售统计</h2>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
          <Select
            value={days}
            onChange={setDays}
            options={[
              { value: 7, label: '近7天' },
              { value: 30, label: '近30天' },
              { value: 90, label: '近90天' },
            ]}
          />
        </div>
        <div id="sales-chart" style={{ height: 400 }} />
      </Card>
    </div>
  )
}

export default SalesStat