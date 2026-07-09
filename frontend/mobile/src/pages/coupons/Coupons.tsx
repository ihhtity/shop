import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCouponList, getUserCoupons, receiveCoupon } from '@/api/coupons'
import { UserCoupon, Coupon } from '@/types'
import '../static/Coupons.css'

const tabs = [
  { key: 'available', label: '可领取' },
  { key: 'mine', label: '我的优惠券' },
]

const couponTypeMap: Record<number, string> = {
  1: '满减券',
  2: '折扣券',
  3: '无门槛券',
}

function Coupons() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([])
  const [myCoupons, setMyCoupons] = useState<UserCoupon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCoupons()
  }, [])

  const fetchCoupons = async () => {
    setLoading(true)
    try {
      const [availableRes, myRes] = await Promise.all([
        getCouponList(),
        getUserCoupons(),
      ])
      
      if (availableRes.code === 0) {
        setAvailableCoupons(availableRes.data.results || availableRes.data || [])
      }
      if (myRes.code === 0) {
        setMyCoupons(myRes.data.results || myRes.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch coupons:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReceive = async (couponId: number) => {
    try {
      const result = await receiveCoupon(couponId)
      if (result.code === 0) {
        alert('领取成功')
        fetchCoupons()
      } else {
        alert(result.message)
      }
    } catch (error) {
      alert('领取失败')
    }
  }

  const isExpired = (endTime: string) => new Date(endTime) < new Date()

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
  }

  return (
    // 优惠券页面
    <div className="coupons-page">
      <div className="checkout-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">优惠券</span>
        <span className="header-placeholder"></span>
      </div>
      {/* 优惠券列表选项卡 */}
      <div className="coupons-tabs">
        {tabs.map((tab, index) => (
          <div
            key={tab.key}
            className={`tab ${index === activeTab ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      {/* 优惠券列表 */}
      <div className="coupons-list">
        {loading ? (
          <div className="loading">加载中...</div>
        ) : activeTab === 0 ? (
          availableCoupons.length > 0 ? (
            availableCoupons.map(coupon => (
              <div key={coupon.id} className="coupon-card available">
                <div className="coupon-left">
                  <div className="coupon-value">
                    {coupon.coupon_type === 2 ? (
                      <>
                        <span className="discount-rate">{Number(coupon.discount_rate) * 10}</span>
                        <span className="rate-unit">折</span>
                      </>
                    ) : (
                      <>
                        <span className="currency">¥</span>
                        <span className="amount">{coupon.discount_amount}</span>
                      </>
                    )}
                  </div>
                  {coupon.min_spend !== '0.00' && (
                    <div className="coupon-condition">满{coupon.min_spend}可用</div>
                  )}
                </div>
                <div className="coupon-right">
                  <div className="coupon-name">{coupon.name}</div>
                  <div className="coupon-type">{couponTypeMap[coupon.coupon_type]}</div>
                  <div className="coupon-validity">有效期至 {formatDate(coupon.end_time)}</div>
                  <button 
                    className="receive-btn"
                    onClick={() => handleReceive(coupon.id)}
                  >
                    立即领取
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty">暂无可领取的优惠券</div>
          )
        ) : (
          myCoupons.length > 0 ? (
            myCoupons.map(userCoupon => {
              const coupon = userCoupon.coupon
              const expired = isExpired(coupon.end_time)
              const used = userCoupon.status === 1
              
              return (
                <div 
                  key={userCoupon.id} 
                  className={`coupon-card ${expired || used ? 'disabled' : ''}`}
                >
                  <div className="coupon-left">
                    <div className="coupon-value">
                      {coupon.coupon_type === 2 ? (
                        <>
                          <span className="discount-rate">{Number(coupon.discount_rate) * 10}</span>
                          <span className="rate-unit">折</span>
                        </>
                      ) : (
                        <>
                          <span className="currency">¥</span>
                          <span className="amount">{coupon.discount_amount}</span>
                        </>
                      )}
                    </div>
                    {coupon.min_spend !== '0.00' && (
                      <div className="coupon-condition">满{coupon.min_spend}可用</div>
                    )}
                  </div>
                  <div className="coupon-right">
                    <div className="coupon-name">{coupon.name}</div>
                    <div className="coupon-type">{couponTypeMap[coupon.coupon_type]}</div>
                    <div className="coupon-validity">有效期至 {formatDate(coupon.end_time)}</div>
                    <div className="coupon-status">
                      {used ? '已使用' : expired ? '已过期' : '未使用'}
                    </div>
                  </div>
                  {expired && <div className="coupon-overlay">已过期</div>}
                  {used && <div className="coupon-overlay">已使用</div>}
                </div>
              )
            })
          ) : (
            <div className="empty">暂无优惠券</div>
          )
        )}
      </div>
    </div>
  )
}

export default Coupons
