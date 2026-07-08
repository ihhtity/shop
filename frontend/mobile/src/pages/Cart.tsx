import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProductImage } from '@/utils/image'
import { getCartList, updateCart, deleteCart } from '@/api/cart'
import './Cart.css'

function Cart() {
  const navigate = useNavigate()
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    setLoading(true)
    try {
      const result = await getCartList()
      if (result.code === 0) {
        const data = result.data || {}
        setItems(data.items || [])
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  const toggleSelect = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, selected: !item.selected } : item))
  }

  const toggleSelectAll = () => {
    const allSelected = items.every(item => item.selected)
    setItems(items.map(item => ({ ...item, selected: !allSelected })))
  }

  const updateQuantity = async (id: number, delta: number) => {
    const item = items.find(i => i.id === id)
    if (!item) return
    const newQuantity = Math.max(1, item.quantity + delta)
    try {
      const result = await updateCart(id, { quantity: newQuantity })
      if (result.code === 0) {
        setItems(items.map(i => i.id === id ? { ...i, quantity: newQuantity } : i))
      }
    } catch (error) {
      console.error('Failed to update cart:', error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const result = await deleteCart(id)
      if (result.code === 0) {
        setItems(items.filter(i => i.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete cart item:', error)
    }
  }

  const selectedItems = items.filter(item => item.selected)
  const totalPrice = selectedItems.reduce((sum, item) => sum + (parseFloat(item.subtotal) || 0), 0)

  if (loading) {
    return <div className="cart-page"><div className="loading">加载中...</div></div>
  }

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <span className="empty-icon">🛒</span>
          <p>购物车是空的</p>
          <button className="go-shopping-btn" onClick={() => navigate('/')}>去逛逛</button>
        </div>
      </div>
    )
  }

  return (
    // 购物车页面
    <div className="cart-page">
      {/* 购物车标题 */}
      <div className="cart-header">
        <span className={`select-all ${items.every(item => item.selected) ? 'selected' : ''}`} onClick={toggleSelectAll}>
          <span className="checkbox">✓</span>
          全选
        </span>
      </div>
      {/* 购物车列表 */}
      <div className="cart-list">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <span className={`item-select ${item.selected ? 'selected' : ''}`} onClick={() => toggleSelect(item.id)}>
              <span className="checkbox">✓</span>
            </span>
            <img src={item.goods_image || getProductImage(item.goods || 1)} alt={item.goods_name} className="item-image" />
            <div className="item-info">
              <h3 className="item-name">{item.goods_name}</h3>
              <p className="item-price">¥{item.price}</p>
              <div className="item-quantity">
                <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span className="qty-value">{item.quantity}</span>
                <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(item.id)}>×</button>
          </div>
        ))}
      </div>
      {/* 购物车结算 */}
      <div className="cart-footer">
        <div className="footer-left">
          <span className="total-label">合计:</span>
          <span className="total-price">¥{totalPrice}</span>
        </div>
        <button className="checkout-btn" onClick={() => navigate('/orders/create')}>结算({selectedItems.length})</button>
      </div>
    </div>
  )
}

export default Cart
