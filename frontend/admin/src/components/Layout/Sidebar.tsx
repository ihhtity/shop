import { Menu } from 'antd'
import {
  DashboardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  BarChartOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'

const menuItems = [
  { key: '/dashboard', icon: <DashboardOutlined />, label: '仪表盘' },
  {
    key: '/goods',
    icon: <ShoppingOutlined />,
    label: '商品管理',
    children: [
      { key: '/goods/list', label: '商品列表' },
      { key: '/goods/add', label: '添加商品' },
    ],
  },
  {
    key: '/orders',
    icon: <ShoppingCartOutlined />,
    label: '订单管理',
    children: [
      { key: '/orders/list', label: '订单列表' },
    ],
  },
  {
    key: '/users',
    icon: <UserOutlined />,
    label: '用户管理',
    children: [
      { key: '/users/list', label: '用户列表' },
    ],
  },
  {
    key: '/statistics',
    icon: <BarChartOutlined />,
    label: '数据统计',
    children: [
      { key: '/statistics/sales', label: '销售统计' },
      { key: '/statistics/users', label: '用户统计' },
      { key: '/statistics/goods', label: '商品统计' },
    ],
  },
  {
    key: '/settings',
    icon: <SettingOutlined />,
    label: '系统设置',
    children: [
      { key: '/settings/profile', label: '个人信息' },
      { key: '/settings/system', label: '系统配置' },
    ],
  },
]

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  return (
    <aside className="sidebar">
      <div className="logo">
        <h1>商城管理</h1>
      </div>
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
      />
    </aside>
  )
}

export default Sidebar