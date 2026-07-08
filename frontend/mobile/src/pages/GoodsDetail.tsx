import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductImage } from '@/utils/image'
import { getGoodsDetail } from '@/api/goods'
import { addToCart } from '@/api/cart'
import { createOrder } from '@/api/orders'
import { getAddressList } from '@/api/addresses'
import './GoodsDetail.css'

function GoodsDetail() {
  const { id } = useParams<{ id?: string }>()
  const navigate = useNavigate()
  const [currentImage, setCurrentImage] = useState(0)
  const [quantity] = useState(1)
  const [goods, setGoods] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [addresses, setAddresses] = useState<any[]>([])

  useEffect(() => {
    fetchGoods()
    fetchAddresses()
  }, [id])

  const fetchGoods = async () => {
    if (!id) return
    setLoading(true)
    try {
      const result = await getGoodsDetail(parseInt(id))
      if (result.code === 0) {
        setGoods(result.data)
        if (result.data.images && result.data.images.length > 0) {
          setCurrentImage(0)
        }
      }
    } catch (error) {
      console.error('Failed to fetch goods detail:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAddresses = async () => {
    try {
      const result = await getAddressList()
      if (result.code === 0) {
        setAddresses(result.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch addresses:', error)
    }
  }

  const handleAddToCart = async () => {
    try {
      const result = await addToCart({
        goods: parseInt(id || '0'),
        quantity,
      })
      if (result.code === 0) {
        alert('添加成功')
        navigate('/cart')
      }
    } catch (error) {
      console.error('Failed to add to cart:', error)
    }
  }

  const handleBuyNow = async () => {
    const defaultAddress = addresses.find((addr: any) => addr.is_default) || addresses[0]
    if (!defaultAddress) {
      alert('请先添加收货地址')
      navigate('/addresses')
      return
    }
    try {
      const result = await createOrder({
        address_id: defaultAddress.id,
        items: [{ goods_id: parseInt(id || '0'), quantity }],
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
    return <div className="goods-detail-page"><div className="loading">加载中...</div></div>
  }

  if (!goods) {
    return <div className="goods-detail-page"><div className="empty">商品不存在</div></div>
  }

  const images = goods.images || []

  return (
    <div className="goods-detail-page">
      <div className="detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">商品详情</span>
        <span className="header-share">↗</span>
      </div>
      <div className="detail-images">
        <div className="main-image">
          <img src={images[currentImage] || getProductImage(goods.id)} alt={goods.name} />
        </div>
        <div className="image-thumbnails">
          {images.map((img: string, index: number) => (
            <img
              key={index}
              src={img}
              alt=""
              className={`thumbnail ${index === currentImage ? 'active' : ''}`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      </div>
      <div className="detail-info">
        <div className="price-section">
          <span className="current-price">¥{goods.price}</span>
          <span className="original-price">¥{goods.original_price}</span>
        </div>
        <h1 className="goods-name">{goods.name}</h1>
        <p className="goods-desc">{goods.description}</p>
        <div className="goods-meta">
          <span>已售 {goods.sales}</span>
          <span>库存 {goods.stock}</span>
        </div>
      </div>
      <div className="detail-footer">
        <button className="footer-btn cart" onClick={() => navigate('/cart')}>🛒 购物车</button>
        <button className="footer-btn buy" onClick={handleBuyNow}>立即购买</button>
        <button className="footer-btn add-cart" onClick={handleAddToCart}>加入购物车</button>
      </div>
    </div>
  )
}

export default GoodsDetail
