import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userRegister } from '@/api/users'
import './Register.css'

function Register() {
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (password !== confirm_password) {
      setError('两次密码不一致')
      return
    }
    
    setLoading(true)
    
    try {
      const response = await userRegister({ username, phone, password, confirm_password })
      if (response.code === 0) {
        navigate('/login')
      } else {
        setError(response.message)
      }
    } catch (err) {
      setError('注册失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    // 用户注册页
    <div className="register-page">
      <div className="register-header">
        <div className="register-logo">👤</div>
        <h1>用户注册</h1>
        <p className="register-slogan">创建您的账号</p>
      </div>
      {/* 用户注册页表单 */}
      <form onSubmit={handleSubmit} className="register-form">
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
        {/* 用户注册页手机号单 */}
        <div className="form-group">
          <label className="form-label">手机号</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="请输入手机号"
            className="form-input"
            required
          />
        </div>
        {/* 用户注册页密码单单 */}
        <div className="form-group">
          <label className="form-label">密码</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="请输入密码（至少6位）"
            className="form-input"
            minLength={6}
            required
          />
        </div>
        {/* 用户注册页确认密码单单 */}
        <div className="form-group">
          <label className="form-label">确认密码</label>
          <input
            type="password"
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="请确认密码"
            className="form-input"
            minLength={6}
            required
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" className="register-btn" disabled={loading}>
          {loading ? '注册中...' : '注册'}
        </button>
      </form>
      
      <div className="register-footer">
        <Link to="/login" className="login-link">
          已有账号？立即登录
        </Link>
      </div>
    </div>
  )
}

export default Register