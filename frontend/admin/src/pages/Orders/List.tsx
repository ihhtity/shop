import { useState, useEffect } from 'react'
import { Table, Button, Input, Tag, Space, Select } from 'antd'
import { SearchOutlined, EyeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { getOrderList } from '@/api'

const OrderList = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [status, setStatus] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [keyword, status])

  const fetchData = async () => {
    setLoading(true)
    const result = await getOrderList({ order_no: keyword, status: status ? Number(status) : undefined })
    if (result.code === 0) {
      setData(result.data.results || result.data)
    }
    setLoading(false)
  }

  const statusMap: Record<string, string> = {
    '0': '待支付',
    '1': '已支付',
    '2': '已发货',
    '3': '已完成',
    '4': '已取消',
  }

  const statusColorMap: Record<string, string> = {
    '0': 'orange',
    '1': 'blue',
    '2': 'cyan',
    '3': 'green',
    '4': 'red',
  }

  const columns = [
    { title: '订单号', dataIndex: 'order_no', key: 'order_no' },
    { title: '用户', dataIndex: 'user', key: 'user', render: (u: any) => u?.username },
    { title: '金额', dataIndex: 'pay_amount', key: 'pay_amount' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (val: number) => (
        <Tag color={statusColorMap[String(val)]}>{statusMap[String(val)]}</Tag>
      ),
    },
    { title: '创建时间', dataIndex: 'created_at', key: 'created_at' },
    {
      title: '操作',
      key: 'action',
      render: (_, record: any) => (
        <Space>
          <Button onClick={() => navigate(`/orders/detail/${record.id}`)} icon={<EyeOutlined />} />
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
        <Input
          placeholder="搜索订单号"
          prefix={<SearchOutlined />}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: 300 }}
        />
        <Select
          placeholder="状态筛选"
          value={status}
          onChange={setStatus}
          options={[
            { value: '', label: '全部' },
            { value: '0', label: '待支付' },
            { value: '1', label: '已支付' },
            { value: '2', label: '已发货' },
            { value: '3', label: '已完成' },
            { value: '4', label: '已取消' },
          ]}
        />
      </div>
      <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />
    </div>
  )
}

export default OrderList