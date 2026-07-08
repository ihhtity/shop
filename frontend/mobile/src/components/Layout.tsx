import { Outlet, useLocation, Link } from 'react-router-dom'
import './Layout.css'

const tabs = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/category', label: '分类', icon: '📦' },
  { path: '/cart', label: '购物车', icon: '🛒' },
  { path: '/user', label: '我的', icon: '👤' },
]

function Layout() {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <div className="mobile-layout">
      <main className="mobile-main">
        <Outlet />
      </main>
      <nav className="mobile-tabbar">
        {tabs.map((tab) => (
          <Link key={tab.path} to={tab.path} className={`tab-item ${currentPath === tab.path ? 'active' : ''}`}>
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Layout