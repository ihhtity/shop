import { useState } from 'react'
import './Orders.css'

const tabs = ['全部', '待付款', '待发货', '待收货', '已完成']

const orders = [
  { id: 1, status: '待付款', createTime: '2024-01-15 10:30', items: [{ name: 'iPhone 15 Pro Max', price: 9999, quantity: 1 }], total: 9999 },
  { id: 2, status: '待发货', createTime: '2024-01-14 15:20', items: [{ name: 'Nike Air Jordan', price: 1299, quantity: 2 }], total: 2598 },
  { id: 3, status: '待收货', createTime: '2024-01-13 09:10', items: [{ name: 'Sony WH-1000XM5', price: 2999, quantity: 1 }], total: 2999 },
  { id: 4, status: '已完成', createTime: '2024-01-10 14:45', items: [{ name: 'Apple MacBook Pro', price: 16999, quantity: 1 }], total: 16999 },
]

function Orders() {
  const [activeTab, setActiveTab] = useState(0)

  const filteredOrders = activeTab === 0 ? orders : orders.filter(order => order.status === tabs[activeTab])

  return (
    <div className="orders-page">
      <div className="orders-tabs">
        {tabs.map((tab, index) => (
          <div key={index} className={`tab ${index === activeTab ? 'active' : ''}`} onClick={() => setActiveTab(index)}>
            {tab}
          </div>
        ))}
      </div>
      <div className="orders-list">
        {filteredOrders.map(order => (
          <div key={order.id} className="order-item">
            <div className="order-header">
              <span className="order-id">订单号: {order.id}</span>
              <span className={`order-status ${order.status}`}>{order.status}</span>
            </div>
            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="order-item-row">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">¥{item.price} x{item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="order-footer">
              <span className="order-total">合计: ¥{order.total}</span>
              <span className="order-time">{order.createTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders