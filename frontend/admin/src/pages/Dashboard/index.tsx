import { useState, useEffect } from 'react'
import { Card, Row, Col, Statistic } from 'antd'
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  TrendingUpOutlined,
} from '@ant-design/icons'
import * as echarts from 'echarts'
import { getDashboard, getSalesStat, getGoodsStat } from '@/api'
import type { DashboardData, SalesData } from '@/types'

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null)
  const [salesData, setSalesData] = useState<SalesData[]>([])

  useEffect(() => {
    fetchDashboard()
    fetchSalesStat()
  }, [])

  useEffect(() => {
    if (salesData.length > 0) {
      const chart = echarts.init(document.getElementById('sales-chart'))
      chart.setOption({
        xAxis: { type: 'category', data: salesData.map((d) => d.date) },
        yAxis: { type: 'value' },
        series: [{ data: salesData.map((d) => d.amount), type: 'line' }],
      })
    }
  }, [salesData])

  const fetchDashboard = async () => {
    const result = await getDashboard()
    if (result.code === 0) {
      setData(result.data)
    }
  }

  const fetchSalesStat = async () => {
    const result = await getSalesStat({ days: 7 })
    if (result.code === 0) {
      setSalesData(result.data)
    }
  }

  return (
    <div>
      <h2>仪表盘</h2>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="用户总数"
              value={data?.total_users || 0}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="商品总数"
              value={data?.total_goods || 0}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="订单总数"
              value={data?.total_orders || 0}
              prefix={<TrendingUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="销售总额"
              value={data?.total_sales || 0}
              prefix={<DollarOutlined />}
              precision={2}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Card title="今日数据">
            <Row gutter={16}>
              <Col span={8}>
                <Statistic title="新增用户" value={data?.today_users || 0} />
              </Col>
              <Col span={8}>
                <Statistic title="今日订单" value={data?.today_orders || 0} />
              </Col>
              <Col span={8}>
                <Statistic title="今日销售" value={data?.today_sales || 0} precision={2} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="近7天销售额">
            <div id="sales-chart" style={{ height: 200 }} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard