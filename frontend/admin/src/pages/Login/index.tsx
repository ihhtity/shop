import { useState } from 'react'
import { Form, Input, Button, message, Card } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useAuthStore } from '@/store'
import { useNavigate, Link } from 'react-router-dom'
import './style.css'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const { login, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  if (isAuthenticated) {
    navigate('/')
    return null
  }

  const handleSubmit = async (values: { username: string; password: string }) => {
    setLoading(true)
    try {
      await login(values.username, values.password)
      message.success('登录成功')
      navigate('/')
    } catch (error: unknown) {
      message.error((error as Error).message || '登录失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <UserOutlined style={{ fontSize: 48, color: '#1890ff' }} />
          </div>
          <h1>商城管理后台</h1>
          <p className="login-subtitle">欢迎登录管理系统</p>
        </div>
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="username"
            label="用户名"
            initialValue="admin"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={<UserOutlined className="login-icon-input" />}
              placeholder="请输入用户名"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            initialValue="123456"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="login-icon-input" />}
              placeholder="请输入密码"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} size="large" block>
              登录
            </Button>
          </Form.Item>
          <div className="login-footer">
            <Link to="/register">还没有账号？立即注册</Link>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default Login