import { useState, useEffect } from 'react'
import { Table, Button, Input, Tag, Space } from 'antd'
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { getGoodsList, deleteGoods } from '@/api'

const GoodsList = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [keyword])

  const fetchData = async () => {
    setLoading(true)
    const result = await getGoodsList({ keyword })
    if (result.code === 0) {
      setData(result.data.results || result.data)
    }
    setLoading(false)
  }

  const handleDelete = async (id: number) => {
    const result = await deleteGoods(id)
    if (result.code === 0) {
      fetchData()
    }
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '商品名称', dataIndex: 'name', key: 'name' },
    { title: '价格', dataIndex: 'price', key: 'price' },
    { title: '库存', dataIndex: 'stock', key: 'stock' },
    { title: '销量', dataIndex: 'sales', key: 'sales' },
    {
      title: '状态',
      dataIndex: 'is_on_sale',
      key: 'is_on_sale',
      render: (val: boolean) => (val ? <Tag color="green">在售</Tag> : <Tag color="red">下架</Tag>),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: any) => (
        <Space>
          <Button onClick={() => navigate(`/goods/edit/${record.id}`)} icon={<EditOutlined />} />
          <Button onClick={() => handleDelete(record.id)} icon={<DeleteOutlined />} danger />
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <Input
          placeholder="搜索商品"
          prefix={<SearchOutlined />}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: 300 }}
        />
        <Button onClick={() => navigate('/goods/add')} type="primary" icon={<PlusOutlined />}>
          添加商品
        </Button>
      </div>
      <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />
    </div>
  )
}

export default GoodsList