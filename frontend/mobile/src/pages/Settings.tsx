import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserInfo, updateUserInfo, changeUserPassword } from '@/api/users'
import './Settings.css'

const menuItems = [
  { icon: '👤', label: '编辑资料', action: 'profile' },
  { icon: '🔒', label: '修改密码', action: 'password' },
  { icon: '📱', label: '绑定手机', action: 'phone' },
  { icon: '📧', label: '绑定邮箱', action: 'email' },
  { icon: '🎨', label: '主题设置', action: 'theme' },
  { icon: '📋', label: '关于我们', action: 'about' },
  { icon: '⭐', label: '给个好评', action: 'rate' },
]

function Settings() {
  const [, setUser] = useState<any>(null)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [profileForm, setProfileForm] = useState({ nickname: '', avatar: '' })
  const [passwordForm, setPasswordForm] = useState({ old_password: '', new_password: '', confirm_password: '' })
  const navigate = useNavigate()

  const handleMenuClick = (action: string) => {
    switch (action) {
      case 'profile':
        fetchUserInfo()
        break
      case 'password':
        setShowPasswordModal(true)
        break
      case 'about':
        alert('商城 v1.0.0')
        break
      case 'rate':
        alert('感谢您的支持！')
        break
      default:
        alert('功能开发中')
    }
  }

  const fetchUserInfo = async () => {
    try {
      const result = await getUserInfo()
      if (result.code === 0) {
        setUser(result.data)
        setProfileForm({
          nickname: result.data.nickname || '',
          avatar: result.data.avatar || '',
        })
        setShowProfileModal(true)
      }
    } catch (error) {
      console.error('Failed to fetch user info:', error)
    }
  }

  const handleProfileSubmit = async () => {
    try {
      await updateUserInfo(profileForm)
      setShowProfileModal(false)
      alert('修改成功')
    } catch (error) {
      alert('修改失败')
    }
  }

  const handlePasswordSubmit = async () => {
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      alert('两次密码不一致')
      return
    }
    try {
      await changeUserPassword({ old_password: passwordForm.old_password, new_password: passwordForm.new_password })
      setShowPasswordModal(false)
      setPasswordForm({ old_password: '', new_password: '', confirm_password: '' })
      alert('密码修改成功，请重新登录')
      localStorage.removeItem('user_token')
      navigate('/login')
    } catch (error) {
      alert('修改失败，原密码错误')
    }
  }

  return (
    // 设置页面
    <div className="settings-page">
      {/* 设置标题 */}
      <div className="settings-header">
        <h1>设置</h1>
      </div>
      {/* 设置菜单 */}
      <div className="settings-menu">
        <div className="menu-grid">
          {menuItems.map((item, index) => (
            <div key={index} onClick={() => handleMenuClick(item.action)} className="menu-item">
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      {/* 编辑资料弹窗 */}
      {showProfileModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>编辑资料</h2>
              <button className="close-btn" onClick={() => setShowProfileModal(false)}>
                ✕
              </button>
            </div>
            <div className="form-group">
              <label>昵称</label>
              <input
                type="text"
                value={profileForm.nickname}
                onChange={(e) => setProfileForm({ ...profileForm, nickname: e.target.value })}
                placeholder="请输入昵称"
              />
            </div>
            <div className="form-group">
              <label>头像</label>
              <input
                type="text"
                value={profileForm.avatar}
                onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                placeholder="请输入头像URL"
              />
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowProfileModal(false)}>
                取消
              </button>
              <button className="submit-btn" onClick={handleProfileSubmit}>
                保存
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 修改密码弹窗 */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>修改密码</h2>
              <button className="close-btn" onClick={() => setShowPasswordModal(false)}>
                ✕
              </button>
            </div>
            <div className="form-group">
              <label>原密码</label>
              <input
                type="password"
                value={passwordForm.old_password}
                onChange={(e) => setPasswordForm({ ...passwordForm, old_password: e.target.value })}
                placeholder="请输入原密码"
              />
            </div>
            <div className="form-group">
              <label>新密码</label>
              <input
                type="password"
                value={passwordForm.new_password}
                onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                placeholder="请输入新密码"
              />
            </div>
            <div className="form-group">
              <label>确认密码</label>
              <input
                type="password"
                value={passwordForm.confirm_password}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirm_password: e.target.value })}
                placeholder="请再次输入新密码"
              />
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowPasswordModal(false)}>
                取消
              </button>
              <button className="submit-btn" onClick={handlePasswordSubmit}>
                确认修改
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings
