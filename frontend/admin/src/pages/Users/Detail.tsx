import { useState, useEffect } from 'react'
import { Card, Descriptions, Tag } from 'antd'
import { useParams } from 'react-router-dom'
import { getUserDetail } from '@/api'

const UserDetail = () => {
  const [data, setData] = useState<any>(null)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const result = await getUserDetail(Number(id))
    if (result.code === 0) {
      setData(result.data)
    }
  }

  if (!data) return null

  return (
    <div>
      <h2>用户详情</h2>
      <Card>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="ID">{data.id}</Descriptions.Item>
          <Descriptions.Item label="用户名">{data.username}</Descriptions.Item>
          <Descriptions.Item label="昵称">{data.nickname}</Descriptions.Item>
          <Descriptions.Item label="手机号">{data.phone}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{data.email}</Descriptions.Item>
          <Descriptions.Item label="状态">
            {data.status === 1 ? <Tag color="green">正常</Tag> : <Tag color="red">禁用</Tag>}
          </Descriptions.Item>
          <Descriptions.Item label="是否管理员">
            {data.is_admin ? <Tag color="blue">是</Tag> : <Tag color="gray">否</Tag>}
          </Descriptions.Item>
          <Descriptions.Item label="注册时间">{data.date_joined}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  )
}

export default UserDetail