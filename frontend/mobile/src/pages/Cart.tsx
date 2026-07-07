import { useState } from 'react'
import './Cart.css'

const cartItems = [
  { id: 1, name: 'iPhone 15 Pro Max', price: 9999, quantity: 1, selected: true, image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=iPhone%2015%20Pro%20Max%20smartphone&image_size=square' },
  { id: 2, name: 'Nike Air Jordan', price: 1299, quantity: 2, selected: true, image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Nike%20Air%20Jordan%20sneakers&image_size=square' },
  { id: 3, name: 'Sony WH-1000XM5', price: 2999, quantity: 1, selected: false, image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Sony%20headphones&image_size=square' },
]

function Cart() {
  const [items, setItems] = useState(cartItems)

  const toggleSelect = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, selected: !item.selected } : item))
  }

  const toggleSelectAll = () => {
    const allSelected = items.every(item => item.selected)
    setItems(items.map(item => ({ ...item, selected: !allSelected })))
  }

  const updateQuantity = (id: number, delta: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta)
        return { ...item, quantity: newQuantity }
      }
      return item
    }))
  }

  const selectedItems = items.filter(item => item.selected)
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <span className="empty-icon">🛒</span>
        <p>购物车是空的</p>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <span className={`select-all ${items.every(item => item.selected) ? 'selected' : ''}`} onClick={toggleSelectAll}>
          <span className="checkbox">✓</span>
          全选
        </span>
      </div>
      <div className="cart-list">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <span className={`item-select ${item.selected ? 'selected' : ''}`} onClick={() => toggleSelect(item.id)}>
              <span className="checkbox">✓</span>
            </span>
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-info">
              <h3 className="item-name">{item.name}</h3>
              <p className="item-price">¥{item.price}</p>
              <div className="item-quantity">
                <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span className="qty-value">{item.quantity}</span>
                <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <div className="footer-left">
          <span className="total-label">合计:</span>
          <span className="total-price">¥{totalPrice}</span>
        </div>
        <button className="checkout-btn">结算({selectedItems.length})</button>
      </div>
    </div>
  )
}

export default Cart