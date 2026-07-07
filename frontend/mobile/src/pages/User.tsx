import { Link } from 'react-router-dom'
import './User.css'

const menuItems = [
  { icon: '📦', label: '我的订单', path: '/orders' },
  { icon: '🎫', label: '优惠券', path: '/' },
  { icon: '❤️', label: '我的收藏', path: '/' },
  { icon: '📍', label: '收货地址', path: '/' },
  { icon: '🔔', label: '消息通知', path: '/' },
  { icon: '⚙️', label: '设置', path: '/' },
]

function User() {
  return (
    <div className="user-page">
      <div className="user-header">
        <div className="user-avatar">👤</div>
        <div className="user-info">
          <h2 className="user-name">用户昵称</h2>
          <p className="user-phone">138****8888</p>
        </div>
      </div>
      <div className="menu-section">
        <div className="menu-grid">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.path} className="menu-item">
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="stats-section">
        <div className="stat-item">
          <span className="stat-value">12</span>
          <span className="stat-label">订单</span>
        </div>
        <div className="stat-item">
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
    </div>
  )
}

export default User