import { useState } from 'react'
import { Form, Input, Button, message, Card } from 'antd'
import { LockOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { adminRegister } from '@/api/users'
import { useNavigate, Link } from 'react-router-dom'
import './style.css'

const Register = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (values: { username: string; email: string; phone: string; password: string; confirm_password: string }) => {
    setLoading(true)
    try {
      const response = await adminRegister(values)
      if (response.code === 0) {
        message.success('注册成功，请登录')
        navigate('/login')
      } else {
        message.error(response.message)
      }
    } catch (error: unknown) {
      message.error((error as Error).message || '注册失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-container">
      <Card className="register-card">
        <div className="register-header">
          <div className="register-icon">
            <UserOutlined style={{ fontSize: 48, color: '#1890ff' }} />
          </div>
          <h1>管理员注册</h1>
          <p className="register-subtitle">创建您的管理账号</p>
        </div>
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="username"
            label="用户名"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, message: '用户名至少3个字符' },
            ]}
          >
            <Input
              prefix={<UserOutlined className="register-icon-input" />}
              placeholder="请输入用户名"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { type: 'email', message: '请输入有效的邮箱地址' },
            ]}
          >
            <Input
              prefix={<MailOutlined className="register-icon-input" />}
              placeholder="请输入邮箱（可选）"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label="手机号"
            rules={[
              { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' },
            ]}
          >
            <Input
              prefix={<PhoneOutlined className="register-icon-input" />}
              placeholder="请输入手机号（可选）"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6个字符' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="register-icon-input" />}
              placeholder="请输入密码"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="confirm_password"
            label="确认密码"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'))
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="register-icon-input" />}
              placeholder="请确认密码"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} size="large" block>
              注册
            </Button>
          </Form.Item>
          <div className="register-footer">
            <Link to="/login">已有账号？立即登录</Link>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default Register