import { useState, useEffect } from 'react'
import { Form, Input, Button, message } from 'antd'
import { useAuthStore } from '@/store'

const Profile = () => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { user } = useAuthStore()

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        nickname: user.nickname,
        phone: user.phone,
        email: user.email,
      })
    }
  }, [user])

  const handleSubmit = async (values: Record<string, unknown>) => {
    setLoading(true)
    message.success('更新成功')
    setLoading(false)
  }

  return (
    <div>
      <h2>个人信息</h2>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item label="用户名">
          <Input disabled value={user?.username} />
        </Form.Item>
        <Form.Item name="nickname" label="昵称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="手机号">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="邮箱">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Profile