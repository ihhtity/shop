import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFavorites, removeFavorite } from '@/api/favorites'
import { addToCart } from '@/api/cart'
import { Favorite } from '@/types'
import '../static/Favorites.css'

function Favorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    setLoading(true)
    try {
      const result = await getFavorites()
      if (result.code === 0) {
        setFavorites(result.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch favorites:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (id: number) => {
    if (!confirm('确定要取消收藏吗？')) return
    try {
      const result = await removeFavorite(id)
      if (result.code === 0) {
        setFavorites(favorites.filter(f => f.id !== id))
      }
    } catch (error) {
      alert('操作失败')
    }
  }

  const handleAddToCart = async (goodsId: number) => {
    try {
      const result = await addToCart({ goods_id: goodsId, quantity: 1 })
      if (result.code === 0) {
        alert('已加入购物车')
      } else {
        alert(result.message)
      }
    } catch (error) {
      alert('加入购物车失败')
    }
  }

  const handleGoodsClick = (goodsId: number) => {
    navigate(`/goods/${goodsId}`)
  }

  return (
    // 收藏页面
    <div className="favorites-page">
      <div className="checkout-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">我的收藏</span>
        <span className="header-placeholder"></span>
      </div>
      {/* 收藏列表标题 */}
      <div className="favorites-header">
        {favorites.length > 0 && (
          <span className="favorites-count">{favorites.length}件商品</span>
        )}
      </div>
      {/* 收藏列表 */}
      {loading ? (
        <div className="loading">加载中...</div>
      ) : favorites.length > 0 ? (
        <div className="favorites-list">
          {favorites.map(item => (
            <div key={item.id} className="favorite-item">
              <div 
                className="item-image" 
                onClick={() => handleGoodsClick(item.goods.id)}
              >
                <img 
                  src={item.goods.images?.[0] || '/images/default.png'} 
                  alt={item.goods.name}
                />
              </div>
              <div className="item-info" onClick={() => handleGoodsClick(item.goods.id)}>
                <h3 className="item-name">{item.goods.name}</h3>
                <p className="item-desc">{item.goods.description}</p>
                <div className="item-price-row">
                  <span className="item-price">¥{item.goods.price}</span>
                  <span className="item-original-price">¥{item.goods.original_price}</span>
                </div>
                <div className="item-sales">已售{item.goods.sales}</div>
              </div>
              <div className="item-actions">
                <button 
                  className="action-btn add-cart"
                  onClick={() => handleAddToCart(item.goods.id)}
                >
                  加入购物车
                </button>
                <button 
                  className="action-btn remove"
                  onClick={() => handleRemove(item.id)}
                >
                  取消收藏
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <span className="empty-icon">❤️</span>
          <p>暂无收藏商品</p>
          <button className="go-shopping-btn" onClick={() => navigate('/')}>
            去逛逛
          </button>
        </div>
      )}
    </div>
  )
}

export default Favorites
