import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getOrderList } from '@/api/orders'
import '../static/Orders.css'

const tabs = ['全部', '待付款', '待发货', '待收货', '已完成']
const statusMap: Record<string, string> = {
  '0': '待付款',
  '1': '已支付',
  '2': '已发货',
  '3': '已完成',
  '4': '已取消',
}

function Orders() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const result = await getOrderList()
      if (result.code === 0) {
        setOrders(result.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredOrders = activeTab === 0 
    ? orders 
    : orders.filter(order => statusMap[String(order.status)] === tabs[activeTab])

  return (
    // 订单页
    <div className="orders-page">
      <div className="checkout-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">我的订单</span>
        <span className="header-placeholder"></span>
      </div>
      {/* 订单页标签 */}
      <div className="orders-tabs">
        {tabs.map((tab, index) => (
          <div key={index} className={`tab ${index === activeTab ? 'active' : ''}`} onClick={() => setActiveTab(index)}>
            {tab}
          </div>
        ))}
      </div>
      {/* 订单列表 */}
      <div className="orders-list">
        {loading ? (
          <div className="loading">加载中...</div>
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <div key={order.id} className="order-item">
              <div className="order-header">
                <span className="order-id">订单号: {order.order_no}</span>
                <span className={`order-status ${order.status}`}>{statusMap[String(order.status)]}</span>
              </div>
              <div className="order-items">
                {order.items?.map((item: any, index: number) => (
                  <div key={index} className="order-item-row">
                    <span className="item-name">{item.goods_name}</span>
                    <span className="item-price">¥{item.price} x{item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <span className="order-total">合计: ¥{order.pay_amount}</span>
                <span className="order-time">{order.created_at}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="empty">暂无订单</div>
        )}
      </div>
    </div>
  )
}

export default Orders
