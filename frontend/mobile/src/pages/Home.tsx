import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const banners = [
  { id: 1, image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=modern%20shopping%20mall%20banner%20promotion%20sale%20discount&image_size=landscape_16_9', title: '夏日促销' },
  { id: 2, image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=mobile%20app%20shopping%20banner%20fashion%20clothes&image_size=landscape_16_9', title: '时尚新品' },
  { id: 3, image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=electronic%20gadgets%20shopping%20banner%20tech%20sale&image_size=landscape_16_9', title: '数码特惠' },
]

const categories = [
  { id: 1, icon: '👕', name: '服饰' },
  { id: 2, icon: '📱', name: '数码' },
  { id: 3, icon: '🏠', name: '家居' },
  { id: 4, icon: '🍎', name: '生鲜' },
  { id: 5, icon: '🎁', name: '礼品' },
  { id: 6, icon: '🏃', name: '运动' },
  { id: 7, icon: '💄', name: '美妆' },
  { id: 8, icon: '👶', name: '母婴' },
]

const hotGoods = [
  { id: 1, name: 'iPhone 15 Pro Max', price: 9999, image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=iPhone%2015%20Pro%20Max%20smartphone%20product%20photo&image_size=square', sales: 1234 },
  { id: 2, name: 'Nike Air Jordan', price: 1299, image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Nike%20Air%20Jordan%20sneakers%20shoes%20product&image_size=square', sales: 856 },
  { id: 3, name: 'Apple MacBook Pro', price: 16999, image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Apple%20MacBook%20Pro%20laptop%20product%20photo&image_size=square', sales: 523 },
  { id: 4, name: 'Sony WH-1000XM5', price: 2999, image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Sony%20WH-1000XM5%20headphones%20product%20photo&image_size=square', sales: 789 },
]

function Home() {
  const [currentBanner, setCurrentBanner] = useState(0)

  return (
    <div className="home-page">
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
            <span key={index} className={`dot ${index === currentBanner ? 'active' : ''}`} onClick={() => setCurrentBanner(index)} />
          ))}
        </div>
      </div>

      <div className="category-section">
        <div className="category-grid">
          {categories.map((cat) => (
            <Link key={cat.id} to="/category" className="category-item">
              <span className="category-icon">{cat.icon}</span>
              <span className="category-name">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="hot-section">
        <h2 className="section-title">🔥 热门商品</h2>
        <div className="goods-grid">
          {hotGoods.map((goods) => (
            <Link key={goods.id} to={`/goods/${goods.id}`} className="goods-item">
              <img src={goods.image} alt={goods.name} className="goods-image" />
              <div className="goods-info">
                <h3 className="goods-name">{goods.name}</h3>
                <p className="goods-price">¥{goods.price}</p>
                <p className="goods-sales">已售 {goods.sales}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home