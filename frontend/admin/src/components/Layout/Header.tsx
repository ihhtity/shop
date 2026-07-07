import { Button, Avatar, Dropdown } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { useAuthStore } from '@/store'

const Header = () => {
  const { user, logout } = useAuthStore()

  const menuItems = [
    { key: '1', label: '个人中心', icon: <UserOutlined /> },
    {
      key: '2',
      label: '退出登录',
      icon: <LogoutOutlined />,
      onClick: logout,
    },
  ]

  return (
    <header className="header">
      <div className="header-right">
        <Dropdown menu={{ items: menuItems }} placement="bottomRight">
          <div className="user-info">
            <Avatar icon={<UserOutlined />} />
            <span>{user?.nickname || '管理员'}</span>
          </div>
        </Dropdown>
      </div>
    </header>
  )
}

export default Header