import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getBannerImage, getProductImage } from '@/utils/image'
import { getCategories, getHotGoods, getNewGoods } from '@/api/goods'
import '../static/Home.css'

const banners = [
  { id: 1, image: getBannerImage(1, 750, 250), title: '夏日促销' },
  { id: 2, image: getBannerImage(2, 750, 250), title: '时尚新品' },
  { id: 3, image: getBannerImage(3, 750, 250), title: '数码特惠' },
]

const defaultCategoryIcons: Record<string, string> = {
  '服饰': '👕',
  '数码': '📱',
  '家居': '🏠',
  '生鲜': '🍎',
  '礼品': '🎁',
  '运动': '🏃',
  '美妆': '💄',
  '母婴': '👶',
  '食品': '🍔',
  '图书': '📚',
  '家电': '📺',
  '汽车': '�',
}

function Home() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [categories, setCategories] = useState<any[]>([])
  const [hotGoods, setHotGoods] = useState<any[]>([])
  const [newGoods, setNewGoods] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
    fetchHotGoods()
    fetchNewGoods()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const fetchCategories = async () => {
    try {
      const result = await getCategories()
      if (result.code === 0) {
        setCategories(result.data.slice(0, 8))
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const fetchHotGoods = async () => {
    try {
      const result = await getHotGoods()
      if (result.code === 0) {
        const goods = (result.data || []).slice(0, 4).map((item: any) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          original_price: item.original_price,
          image: item.images?.[0] || getProductImage(item.id),
          sales: item.sales,
        }))
        setHotGoods(goods)
      }
    } catch (error) {
      console.error('Failed to fetch hot goods:', error)
    }
  }

  const fetchNewGoods = async () => {
    try {
      const result = await getNewGoods()
      if (result.code === 0) {
        const goods = (result.data || []).slice(0, 4).map((item: any) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          original_price: item.original_price,
          image: item.images?.[0] || getProductImage(item.id),
          sales: item.sales,
        }))
        setNewGoods(goods)
      }
    } catch (error) {
      console.error('Failed to fetch new goods:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryIcon = (name: string) => {
    return defaultCategoryIcons[name] || '📦'
  }

  const renderGoods = (goods: any[]) => (
    <div className="goods-grid">
      {goods.map((item) => (
        <Link key={item.id} to={`/goods/${item.id}`} className="goods-item">
          <div className="goods-image-wrapper">
            <img src={item.image} alt={item.name} className="goods-image" />
          </div>
          <div className="goods-info">
            <h3 className="goods-name">{item.name}</h3>
            <div className="goods-price-area">
              <span className="goods-price">¥{item.price}</span>
              {item.original_price && parseFloat(item.original_price) > parseFloat(item.price) && (
                <span className="goods-original-price">¥{item.original_price}</span>
              )}
            </div>
            <p className="goods-sales">已售 {item.sales}</p>
          </div>
        </Link>
      ))}
    </div>
  )

  return (
    // 首页
    <div className="home-page">
      {/* 首页banner */}
      <div className="banner">
        <div className="banner-content" style={{ transform: `translateX(-${currentBanner * 100}%)` }}>
          {banners.map((banner) => (
            <div key={banner.id} className="banner-item">
              <img src={banner.image} alt={banner.title} />
            </div>
          ))}
        </div>
        <div className="banner-dots">
          {banners.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentBanner ? 'active' : ''}`}
              onClick={() => setCurrentBanner(index)}
            />
          ))}
        </div>
      </div>
      {/* 首页分类 */}
      <div className="category-section">
        <div className="category-grid">
          {categories.map((cat) => (
            <Link key={cat.id} to={`/category/${cat.id}`} className="category-item">
              <span className="category-icon">{getCategoryIcon(cat.name)}</span>
              <span className="category-name">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
      {/* 首页热门商品 */}
      <div className="hot-section">
        <div className="section-header">
          <h2 className="section-title">🔥 热门商品</h2>
          <Link to="/category" className="section-more">查看更多 ›</Link>
        </div>
        {loading ? (
          <div className="loading">加载中...</div>
        ) : hotGoods.length > 0 ? (
          renderGoods(hotGoods)
        ) : (
          <div className="empty-section">暂无热门商品</div>
        )}
      </div>
      {/* 首页新品上市 */}
      <div className="new-section">
        <div className="section-header">
          <h2 className="section-title">✨ 新品上市</h2>
          <Link to="/category" className="section-more">查看更多 ›</Link>
        </div>
        {loading ? (
          <div className="loading">加载中...</div>
        ) : newGoods.length > 0 ? (
          renderGoods(newGoods)
        ) : (
          <div className="empty-section">暂无新品</div>
        )}
      </div>
    </div>
  )
}

export default Home
