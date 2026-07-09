import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUserInfo } from '@/api/users'
import '../static/User.css'

interface UserInfo {
  id: number
  username: string
  nickname: string
  phone: string
  email: string
  avatar: string
}

const menuItems = [
  { icon: '📦', label: '我的订单', path: '/orders' },
  { icon: '🎫', label: '优惠券', path: '/coupons' },
  { icon: '❤️', label: '我的收藏', path: '/favorites' },
  { icon: '📍', label: '收货地址', path: '/addresses' },
  { icon: '🔔', label: '消息通知', path: '/notifications' },
  { icon: '⚙️', label: '设置', path: '/settings' },
  { icon: '❌', label: '退出登录', path: '/login' },
]

function User() {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('user_token')
    if (!token) {
      setLoading(false)
      return
    }
    
    fetchUserInfo()
  }, [])

  const fetchUserInfo = async () => {
    try {
      const response = await getUserInfo()
      if (response.code === 0) {
        setUser(response.data)
        return
      }

      menuItems[6] = { icon: '✅', label: '立即登录', path: '/login' }
    } catch (err) {
      localStorage.removeItem('user_token')
      localStorage.removeItem('user_info')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = (item: any) => {
    if (item.label !== '退出登录') {
      return
    }

    localStorage.removeItem('user_token')
    localStorage.removeItem('user_info')
    setUser(null)
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="user-page">
        <div className="loading">加载中...</div>
      </div>
    )
  }

  return (
    // 用户中心页面
    <div className="user-page">
      {/* 用户信息区域 */}
      <div className="user-header">
        <div className="user-avatar">
          {user?.avatar ? (
            <img src={user.avatar} alt="头像" className="avatar-img" />
          ) : (
            '👤'
          )}
        </div>
        <div className="user-info">
          <h2 className="user-name">{user?.nickname || user?.username || '用户昵称'}</h2>
          <p className="user-phone">{user?.phone || '138****8888'}</p>
        </div>
      </div>
      {/* 统计信息区域 */}
      <div className="stats-section">
        <div className="stat-item" onClick={() => navigate('/orders')}>
          <span className="stat-value">12</span>
          <span className="stat-label">订单</span>
        </div>
        <div className="stat-item" onClick={() => navigate('/coupons')}>
          <span className="stat-value">5</span>
          <span className="stat-label">优惠券</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">88</span>
          <span className="stat-label">积分</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">0</span>
          <span className="stat-label">余额</span>
        </div>
      </div>
      {/* 菜单区域 */}
      <div className="menu-section">
        <div className="menu-grid">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.path} onClick={() => handleLogout(item)} className="menu-item">
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default User
