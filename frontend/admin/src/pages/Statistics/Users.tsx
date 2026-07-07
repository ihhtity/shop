import { useState, useEffect } from 'react'
import { Card, Select } from 'antd'
import * as echarts from 'echarts'
import { getUserStat } from '@/api'

const UserStat = () => {
  const [data, setData] = useState<any[]>([])
  const [days, setDays] = useState(7)

  useEffect(() => {
    fetchData()
  }, [days])

  useEffect(() => {
    if (data.length > 0) {
      const chart = echarts.init(document.getElementById('user-chart'))
      chart.setOption({
        xAxis: { type: 'category', data: data.map((d) => d.date) },
        yAxis: { type: 'value' },
        series: [{ data: data.map((d) => d.count), type: 'bar' }],
      })
    }
  }, [data])

  const fetchData = async () => {
    const result = await getUserStat({ days })
    if (result.code === 0) {
      setData(result.data)
    }
  }

  return (
    <div>
      <h2>用户统计</h2>
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
        <div id="user-chart" style={{ height: 400 }} />
      </Card>
    </div>
  )
}

export default UserStat