import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getAddressList } from '@/api/addresses'
import { getCartList } from '@/api/cart'
import { createOrder } from '@/api/orders'
import { getGoodsDetail } from '@/api/goods'
import { Address } from '@/types'
import './OrderCheckout.css'

function OrderCheckout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [, setAddresses] = useState<Address[]>([])
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  const [items, setItems] = useState<any[]>([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [remark, setRemark] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAddresses()
    fetchItems()
  }, [])

  const fetchAddresses = async () => {
    try {
      const result = await getAddressList()
      if (result.code === 0) {
        const addrList = result.data || []
        setAddresses(addrList)
        const defaultAddr = addrList.find(a => a.is_default) || addrList[0]
        setSelectedAddress(defaultAddr || null)
      }
    } catch (error) {
      console.error('Failed to fetch addresses:', error)
    }
  }

  const fetchItems = async () => {
    const state = location.state as { goodsId?: number; quantity?: number } || {}
    const { goodsId, quantity } = state
    
    if (goodsId) {
      try {
        const result = await getGoodsDetail(goodsId)
        if (result.code === 0) {
          const goods = result.data
          const item = {
            id: goods.id,
            goods_id: goods.id,
            goods_name: goods.name,
            goods_image: goods.images?.[0],
            price: goods.price,
            quantity: quantity || 1,
            goods
          }
          setItems([item])
          setTotalAmount(parseFloat(goods.price) * (quantity || 1))
        }
      } catch (error) {
        console.error('Failed to fetch goods detail:', error)
      } finally {
        setLoading(false)
      }
    } else {
      try {
        const result = await getCartList()
        if (result.code === 0) {
          const data = result.data || {}
          const cartItems = data.items || []
          setItems(cartItems)
          setTotalAmount(parseFloat(data.total_price || '0'))
        }
      } catch (error) {
        console.error('Failed to fetch cart items:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSubmit = async () => {
    if (!selectedAddress) {
      alert('请先添加收货地址')
      navigate('/addresses')
      return
    }
    if (items.length === 0) {
      alert('商品列表为空')
      return
    }

    try {
      const result = await createOrder({
        address_id: selectedAddress.id,
        items: items.map(item => ({
          goods_id: item.goods_id || item.goods?.id,
          quantity: item.quantity
        })),
        remark
      })
      if (result.code === 0) {
        alert(`订单创建成功，订单号：${result.data.order_no}`)
        navigate('/orders')
      } else {
        alert(result.message)
      }
    } catch (error: any) {
      console.error('Failed to create order:', error)
      alert(error.response?.data?.message || '下单失败')
    }
  }

  if (loading) {
    return <div className="checkout-page"><div className="loading">加载中...</div></div>
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">确认订单</span>
        <span className="header-placeholder"></span>
      </div>

      <div className="address-section">
        <div className="section-title">收货地址</div>
        {selectedAddress ? (
          <div 
            className="address-card"
            onClick={() => navigate('/addresses')}
          >
            <div className="address-info">
              <div className="address-user">
                <span className="user-name">{selectedAddress.name}</span>
                <span className="user-phone">{selectedAddress.phone}</span>
              </div>
              <div className="address-text">
                {selectedAddress.province}{selectedAddress.city}{selectedAddress.district}{selectedAddress.detail}
              </div>
            </div>
            <span className="address-arrow">›</span>
          </div>
        ) : (
          <div className="no-address" onClick={() => navigate('/addresses')}>
            <span className="add-icon">+</span>
            <span>添加收货地址</span>
          </div>
        )}
      </div>

      <div className="items-section">
        <div className="section-title">商品清单</div>
        <div className="items-list">
          {items.map(item => (
            <div key={item.id} className="item-card">
              <img 
                src={item.goods_image || item.goods?.images?.[0]} 
                alt={item.goods_name || item.goods?.name}
                className="item-image"
              />
              <div className="item-info">
                <div className="item-name">{item.goods_name || item.goods?.name}</div>
                <div className="item-spec">{item.spec_name || ''}</div>
                <div className="item-bottom">
                  <span className="item-price">¥{item.price}</span>
                  <span className="item-quantity">x{item.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="remark-section">
        <div className="section-title">订单备注</div>
        <textarea
          className="remark-input"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="请输入订单备注（选填）"
        />
      </div>

      <div className="summary-section">
        <div className="summary-row">
          <span className="summary-label">商品金额</span>
          <span className="summary-value">¥{totalAmount.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">运费</span>
          <span className="summary-value">¥0.00</span>
        </div>
        <div className="summary-row total">
          <span className="summary-label">合计</span>
          <span className="summary-value">¥{totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <div className="checkout-footer">
        <div className="footer-info">
          <span className="footer-label">实付：</span>
          <span className="footer-price">¥{totalAmount.toFixed(2)}</span>
        </div>
        <button className="submit-btn" onClick={handleSubmit}>提交订单</button>
      </div>
    </div>
  )
}

export default OrderCheckout
