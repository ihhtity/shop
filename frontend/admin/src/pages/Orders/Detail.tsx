import { useState, useEffect } from 'react'
import { Card, Button, Descriptions, Table, Tag } from 'antd'
import { useParams } from 'react-router-dom'
import { getOrderDetail } from '@/api'

const OrderDetail = () => {
  const [data, setData] = useState<any>(null)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const result = await getOrderDetail(Number(id))
    if (result.code === 0) {
      setData(result.data)
    }
  }

  const statusMap: Record<string, string> = {
    '0': '待支付',
    '1': '已支付',
    '2': '已发货',
    '3': '已完成',
    '4': '已取消',
  }

  const columns = [
    { title: '商品名称', dataIndex: 'goods_name', key: 'goods_name' },
    { title: '规格', dataIndex: 'spec_name', key: 'spec_name' },
    { title: '单价', dataIndex: 'price', key: 'price' },
    { title: '数量', dataIndex: 'quantity', key: 'quantity' },
    { title: '小计', dataIndex: 'subtotal', key: 'subtotal' },
  ]

  if (!data) return null

  return (
    <div>
      <h2>订单详情</h2>
      <Card>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="订单号">{data.order_no}</Descriptions.Item>
          <Descriptions.Item label="状态">
            <Tag>{statusMap[String(data.status)]}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="总金额">{data.total_amount}</Descriptions.Item>
          <Descriptions.Item label="支付金额">{data.pay_amount}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{data.created_at}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card title="商品列表" style={{ marginTop: 20 }}>
        <Table columns={columns} dataSource={data.items} rowKey="id" pagination={false} />
      </Card>
      <Card title="收货地址" style={{ marginTop: 20 }}>
        <Descriptions bordered>
          <Descriptions.Item label="收货人">{data.address?.name}</Descriptions.Item>
          <Descriptions.Item label="手机号">{data.address?.phone}</Descriptions.Item>
          <Descriptions.Item label="地址" span={3}>
            {data.address?.province} {data.address?.city} {data.address?.district} {data.address?.detail}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  )
}

export default OrderDetail