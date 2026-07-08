import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  getUserInfo, updateUserInfo, changeUserPassword,
  bindPhone, unbindPhone, changePhone,
  bindEmail, unbindEmail, changeEmail, sendEmailCode
} from '@/api/users'
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
  const [user, setUser] = useState<any>(null)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showPhoneModal, setShowPhoneModal] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showThemeModal, setShowThemeModal] = useState(false)
  const [profileForm, setProfileForm] = useState({ nickname: '', avatar: '' })
  const [passwordForm, setPasswordForm] = useState({ old_password: '', new_password: '', confirm_password: '' })
  const [phoneForm, setPhoneForm] = useState({ phone: '' })
  const [emailForm, setEmailForm] = useState({ email: '', code: '' })
  const [emailStep, setEmailStep] = useState(1)
  const [phoneAction, setPhoneAction] = useState<'bind' | 'unbind' | 'change'>('bind')
  const [emailAction, setEmailAction] = useState<'bind' | 'unbind' | 'change'>('bind')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [codeTimer, setCodeTimer] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    fetchUserInfo()
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light'
    setTheme(savedTheme)
  }, [])

  useEffect(() => {
    if (codeTimer > 0) {
      const timer = setTimeout(() => setCodeTimer(codeTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [codeTimer])

  const fetchUserInfo = async () => {
    try {
      const result = await getUserInfo()
      if (result.code === 0) {
        setUser(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch user info:', error)
    }
  }

  const handleMenuClick = (action: string) => {
    switch (action) {
      case 'profile':
        if (user) {
          setProfileForm({ nickname: user.nickname || '', avatar: user.avatar || '' })
          setShowProfileModal(true)
        }
        break
      case 'password':
        setShowPasswordModal(true)
        break
      case 'phone':
        handlePhoneClick()
        break
      case 'email':
        handleEmailClick()
        break
      case 'theme':
        setShowThemeModal(true)
        break
      case 'about':
        showAbout()
        break
      case 'rate':
        showRate()
        break
      default:
        alert('功能开发中')
    }
  }

  const handlePhoneClick = () => {
    if (!user?.phone) {
      setPhoneAction('bind')
      setPhoneForm({ phone: '' })
    } else {
      setPhoneAction('change')
      setPhoneForm({ phone: '' })
    }
    setShowPhoneModal(true)
  }

  const handleEmailClick = () => {
    if (!user?.email) {
      setEmailAction('bind')
      setEmailStep(1)
      setEmailForm({ email: '', code: '' })
    } else {
      setEmailAction('change')
      setEmailStep(1)
      setEmailForm({ email: '', code: '' })
    }
    setShowEmailModal(true)
  }

  const handleProfileSubmit = async () => {
    try {
      await updateUserInfo(profileForm)
      setShowProfileModal(false)
      fetchUserInfo()
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

  const handlePhoneSubmit = async () => {
    if (!phoneForm.phone || phoneForm.phone.length !== 11) {
      alert('请输入有效的手机号')
      return
    }
    try {
      if (phoneAction === 'bind') {
        await bindPhone({ phone: phoneForm.phone })
        alert('手机号绑定成功')
      } else if (phoneAction === 'change') {
        await changePhone({ phone: phoneForm.phone })
        alert('手机号换绑成功')
      } else {
        await unbindPhone()
        alert('手机号已解绑')
      }
      setShowPhoneModal(false)
      fetchUserInfo()
    } catch (error: any) {
      alert(error.response?.data?.message || '操作失败')
    }
  }

  const handleSendEmailCode = async () => {
    if (!emailForm.email) {
      alert('请输入邮箱')
      return
    }
    try {
      await sendEmailCode({ email: emailForm.email })
      setCodeTimer(60)
      setEmailStep(2)
      alert('验证码已发送')
    } catch (error) {
      alert('发送验证码失败')
    }
  }

  const handleEmailSubmit = async () => {
    if (!emailForm.code) {
      alert('请输入验证码')
      return
    }
    try {
      if (emailAction === 'bind') {
        await bindEmail({ email: emailForm.email, code: emailForm.code })
        alert('邮箱绑定成功')
      } else if (emailAction === 'change') {
        await changeEmail({ email: emailForm.email, code: emailForm.code })
        alert('邮箱修改成功')
      } else {
        await unbindEmail()
        alert('邮箱已解绑')
      }
      setShowEmailModal(false)
      fetchUserInfo()
    } catch (error: any) {
      alert(error.response?.data?.message || '操作失败')
    }
  }

  const handleThemeChange = (selectedTheme: 'light' | 'dark') => {
    setTheme(selectedTheme)
    localStorage.setItem('theme', selectedTheme)
    document.documentElement.className = selectedTheme
    alert(`已切换到${selectedTheme === 'light' ? '浅色' : '深色'}主题`)
  }

  const showAbout = () => {
    alert(`商城 v1.0.0\n\n开发者：ihhtity\n邮箱：support@shop.com\n客服热线：400-888-8888`)
  }

  const showRate = () => {
    alert('感谢您的支持！\n\n如果您觉得我们的应用不错，请给我们五星好评哦！')
  }

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>设置</h1>
      </div>

      <div className="settings-menu">
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className="menu-item"
            onClick={() => handleMenuClick(item.action)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
            {item.action === 'phone' && user?.phone && (
              <span className="menu-value">{user.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</span>
            )}
            {item.action === 'email' && user?.email && (
              <span className="menu-value">{user.email.replace(/(.).*@/, '$1***@')}</span>
            )}
            <span className="menu-arrow">›</span>
          </div>
        ))}
      </div>

      {showProfileModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>编辑资料</h2>
              <button className="close-btn" onClick={() => setShowProfileModal(false)}>✕</button>
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
              <button className="cancel-btn" onClick={() => setShowProfileModal(false)}>取消</button>
              <button className="submit-btn" onClick={handleProfileSubmit}>保存</button>
            </div>
          </div>
        </div>
      )}

      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>修改密码</h2>
              <button className="close-btn" onClick={() => setShowPasswordModal(false)}>✕</button>
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
              <button className="cancel-btn" onClick={() => setShowPasswordModal(false)}>取消</button>
              <button className="submit-btn" onClick={handlePasswordSubmit}>确认修改</button>
            </div>
          </div>
        </div>
      )}

      {showPhoneModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{phoneAction === 'bind' ? '绑定手机号' : phoneAction === 'unbind' ? '解绑手机号' : '换绑手机号'}</h2>
              <button className="close-btn" onClick={() => setShowPhoneModal(false)}>✕</button>
            </div>
            {(phoneAction === 'bind' || phoneAction === 'change') && (
              <div className="form-group">
                <label>手机号</label>
                <input
                  type="tel"
                  value={phoneForm.phone}
                  onChange={(e) => setPhoneForm({ phone: e.target.value })}
                  placeholder="请输入手机号"
                  maxLength={11}
                />
              </div>
            )}
            {phoneAction === 'change' && user?.phone && (
              <div className="form-group">
                <label>当前手机号</label>
                <input type="text" value={user.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')} disabled className="disabled-input" />
              </div>
            )}
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowPhoneModal(false)}>取消</button>
              <button className="submit-btn" onClick={handlePhoneSubmit}>
                {phoneAction === 'bind' ? '绑定' : phoneAction === 'unbind' ? '解绑' : '确认换绑'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showEmailModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{emailAction === 'bind' ? '绑定邮箱' : emailAction === 'unbind' ? '解绑邮箱' : '换绑邮箱'}</h2>
              <button className="close-btn" onClick={() => setShowEmailModal(false)}>✕</button>
            </div>
            {(emailAction === 'bind' || emailAction === 'change') && (
              <>
                <div className="form-group">
                  <label>邮箱</label>
                  <input
                    type="email"
                    value={emailForm.email}
                    onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                    placeholder="请输入邮箱"
                  />
                </div>
                {emailStep === 1 ? (
                  <button className="send-code-btn" onClick={handleSendEmailCode}>发送验证码</button>
                ) : (
                  <div className="form-group">
                    <label>验证码</label>
                    <div className="code-input-group">
                      <input
                        type="text"
                        value={emailForm.code}
                        onChange={(e) => setEmailForm({ ...emailForm, code: e.target.value })}
                        placeholder="请输入验证码"
                      />
                      <button 
                        className="send-code-btn" 
                        onClick={handleSendEmailCode}
                        disabled={codeTimer > 0}
                      >
                        {codeTimer > 0 ? `${codeTimer}s` : '重新发送'}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
            {emailAction === 'change' && user?.email && (
              <div className="form-group">
                <label>当前邮箱</label>
                <input type="text" value={user.email.replace(/(.).*@/, '$1***@')} disabled className="disabled-input" />
              </div>
            )}
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowEmailModal(false)}>取消</button>
              {emailStep === 2 && (
                <button className="submit-btn" onClick={handleEmailSubmit}>
                  {emailAction === 'bind' ? '绑定' : emailAction === 'unbind' ? '解绑' : '确认换绑'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {showThemeModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>主题设置</h2>
              <button className="close-btn" onClick={() => setShowThemeModal(false)}>✕</button>
            </div>
            <div className="theme-options">
              <div 
                className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                onClick={() => handleThemeChange('light')}
              >
                <div className="theme-preview light-preview"></div>
                <span>浅色主题</span>
              </div>
              <div 
                className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => handleThemeChange('dark')}
              >
                <div className="theme-preview dark-preview"></div>
                <span>深色主题</span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowThemeModal(false)}>取消</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings
