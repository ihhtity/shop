import { useState, useEffect } from 'react'
import { Table, Button, Input, Tag, Space } from 'antd'
import { SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { getUserList, deleteUser } from '@/api'

const UserList = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [keyword])

  const fetchData = async () => {
    setLoading(true)
    const result = await getUserList()
    if (result.code === 0) {
      setData(result.data.results || result.data)
    }
    setLoading(false)
  }

  const handleDelete = async (id: number) => {
    const result = await deleteUser(id)
    if (result.code === 0) {
      fetchData()
    }
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '用户名', dataIndex: 'username', key: 'username' },
    { title: '昵称', dataIndex: 'nickname', key: 'nickname' },
    { title: '手机号', dataIndex: 'phone', key: 'phone' },
    { title: '邮箱', dataIndex: 'email', key: 'email' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (val: number) => (val === 1 ? <Tag color="green">正常</Tag> : <Tag color="red">禁用</Tag>),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: any) => (
        <Space>
          <Button onClick={() => navigate(`/users/detail/${record.id}`)} icon={<EyeOutlined />} />
          <Button onClick={() => navigate(`/users/edit/${record.id}`)} icon={<EditOutlined />} />
          <Button onClick={() => handleDelete(record.id)} icon={<DeleteOutlined />} danger />
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <Input
          placeholder="搜索用户"
          prefix={<SearchOutlined />}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: 300 }}
        />
      </div>
      <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />
    </div>
  )
}

export default UserList