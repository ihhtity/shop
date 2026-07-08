import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductImage } from '@/utils/image'
import { getGoodsDetail } from '@/api/goods'
import { addToCart } from '@/api/cart'
import { addFavorite, removeFavorite, getFavoriteStatus } from '@/api/favorites'
import './GoodsDetail.css'

function GoodsDetail() {
  const { id } = useParams<{ id?: string }>()
  const navigate = useNavigate()
  const [currentImage, setCurrentImage] = useState(0)
  const [quantity] = useState(1)
  const [goods, setGoods] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    fetchGoods()
    fetchFavoriteStatus()
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

  const fetchFavoriteStatus = async () => {
    if (!id) return
    try {
      const result = await getFavoriteStatus(parseInt(id))
      if (result.code === 0) {
        setIsFavorite(result.data.is_favorite)
      }
    } catch (error) {
      console.error('Failed to fetch favorite status:', error)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: goods?.name || '商品详情',
        text: goods?.name || '',
        url: window.location.href,
      }).catch((error) => {
        console.error('Share failed:', error)
      })
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('链接已复制，快去分享给好友吧！')
      }).catch(() => {
        alert('分享功能暂不支持，请手动复制链接')
      })
    }
  }

  const handleFavorite = async () => {
    if (!id) return
    try {
      if (isFavorite) {
        await removeFavorite(parseInt(id))
        setIsFavorite(false)
        alert('已取消收藏')
      } else {
        await addFavorite({ goods_id: parseInt(id) })
        setIsFavorite(true)
        alert('收藏成功')
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error)
      alert(isFavorite ? '取消收藏失败' : '收藏失败')
    }
  }

  const handleContact = () => {
    alert('客服功能开发中，您可以拨打客服热线：400-888-8888')
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

  const handleBuyNow = () => {
    navigate('/checkout', { state: { goodsId: parseInt(id || '0'), quantity } })
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
        <span className="header-share" onClick={handleShare}>↗</span>
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
        <div className="footer-actions">
          <button className="action-item" onClick={handleFavorite}>
            <span className="action-icon">{isFavorite ? '❤️' : '🤍'}</span>
            <span className="action-label">收藏</span>
          </button>
          <button className="action-item" onClick={handleContact}>
            <span className="action-icon">💬</span>
            <span className="action-label">客服</span>
          </button>
        </div>
        <button className="footer-btn add-cart" onClick={handleAddToCart}>加入购物车</button>
        <button className="footer-btn buy" onClick={handleBuyNow}>立即购买</button>
      </div>
    </div>
  )
}

export default GoodsDetail
