import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getNotifications, markAsRead, markAllAsRead, deleteNotification } from '@/api/notifications'
import { Notification } from '@/types'
import '../static/Notifications.css'

const notifyTypeMap: Record<number, string> = {
  1: '系统通知',
  2: '订单通知',
  3: '优惠活动',
  4: '物流通知',
  5: '消息提醒',
}

const notifyTypeIcon: Record<number, string> = {
  1: '📢',
  2: '📦',
  3: '🎁',
  4: '🚚',
  5: '💬',
}

function Notifications() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    setLoading(true)
    try {
      const result = await getNotifications()
      if (result.code === 0) {
        setNotifications(result.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (id: number) => {
    try {
      await markAsRead(id)
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, is_read: true } : n
      ))
    } catch (error) {
      alert('操作失败')
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead()
      setNotifications(notifications.map(n => ({ ...n, is_read: true })))
    } catch (error) {
      alert('操作失败')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除该通知吗？')) return
    try {
      await deleteNotification(id)
      setNotifications(notifications.filter(n => n.id !== id))
    } catch (error) {
      alert('删除失败')
    }
  }

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (days === 0) {
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60))
        return minutes <= 0 ? '刚刚' : `${minutes}分钟前`
      }
      return `${hours}小时前`
    } else if (days === 1) {
      return '昨天'
    } else if (days < 7) {
      return `${days}天前`
    } else {
      return `${date.getMonth() + 1}/${date.getDate()}`
    }
  }

  const unreadCount = notifications.filter(n => !n.is_read).length

  return (
    // 消息通知页
    <div className="notifications-page">
      <div className="checkout-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">消息通知</span>
        <span className="header-placeholder"></span>
      </div>
      <div className="notifications-header">
        {unreadCount > 0 && (
          <button className="mark-all-btn" onClick={handleMarkAllAsRead}>
            全部已读
          </button>
        )}
      </div>
      {/* 消息通知列表 */}
      {loading ? (
        <div className="loading">加载中...</div>
      ) : notifications.length > 0 ? (
        <div className="notifications-list">
          {notifications.map(notify => (
            <div 
              key={notify.id} 
              className={`notification-item ${notify.is_read ? '' : 'unread'}`}
              onClick={() => !notify.is_read && handleMarkAsRead(notify.id)}
            >
              <div className="notify-icon">{notifyTypeIcon[notify.notify_type] || '📌'}</div>
              <div className="notify-content">
                <div className="notify-header">
                  <span className="notify-title">{notify.title}</span>
                  <span className="notify-time">{formatTime(notify.created_at)}</span>
                </div>
                <p className="notify-text">{notify.content}</p>
                <span className="notify-type">{notifyTypeMap[notify.notify_type] || '通知'}</span>
              </div>
              <button 
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(notify.id)
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <span className="empty-icon">🔔</span>
          <p>暂无消息通知</p>
        </div>
      )}
    </div>
  )
}

export default Notifications
