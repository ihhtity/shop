import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from '@/api/users'
import '../static/Login.css'

function Login() {
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('123456')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      const response = await userLogin({ username, password })
      if (response.code === 0) {
        localStorage.setItem('user_token', response.data.token)
        localStorage.setItem('user_info', JSON.stringify(response.data.user))
        navigate('/')
      } else {
        setError(response.message)
      }
    } catch (err) {
      setError('登录失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    // 登录页
    <div className="login-page">
      <div className="login-header">
        <div className="login-logo">🛒</div>
        <h1>商城</h1>
        <p className="login-slogan">品质生活，从这里开始</p>
      </div>
      {/* 登录页表单 */}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label className="form-label">用户名</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="请输入用户名"
            className="form-input"
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">密码</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="请输入密码"
            className="form-input"
            required
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? '登录中...' : '登录'}
        </button>
      </form>
      {/* 登录页底部链接 */}
      <div className="login-footer">
        <Link to="/register" className="register-link">
          还没有账号？立即注册
        </Link>
      </div>
    </div>
  )
}

export default Login