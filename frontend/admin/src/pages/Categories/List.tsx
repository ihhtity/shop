import { useState, useEffect } from 'react'
import { Table, Button, Tag, Space } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { getCategories } from '@/api'

const CategoryList = () => {
  const [data, setData] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const result = await getCategories()
    if (result.code === 0) {
      setData(result.data)
    }
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '分类名称', dataIndex: 'name', key: 'name' },
    { title: '排序', dataIndex: 'sort_order', key: 'sort_order' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (val: number) => (val === 1 ? <Tag color="green">启用</Tag> : <Tag color="red">禁用</Tag>),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: any) => (
        <Space>
          <Button icon={<EditOutlined />} />
          <Button icon={<DeleteOutlined />} danger />
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2>分类管理</h2>
        <Button onClick={() => navigate('/categories/add')} type="primary" icon={<PlusOutlined />}>
          添加分类
        </Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  )
}

export default CategoryList