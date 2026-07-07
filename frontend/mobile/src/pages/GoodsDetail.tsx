import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './GoodsDetail.css'

const goods = {
  id: 1,
  name: 'iPhone 15 Pro Max',
  description: '全新A17 Pro芯片，钛金属设计，专业相机系统',
  price: 9999,
  originalPrice: 10999,
  sales: 1234,
  stock: 99,
  images: [
    'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=iPhone%2015%20Pro%20Max%20smartphone%20front%20view&image_size=square',
    'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=iPhone%2015%20Pro%20Max%20smartphone%20back%20view&image_size=square',
    'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=iPhone%2015%20Pro%20Max%20smartphone%20side%20view&image_size=square',
  ],
}

function GoodsDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [currentImage, setCurrentImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="goods-detail-page">
      <div className="detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">商品详情</span>
        <span className="header-share">↗</span>
      </div>
      <div className="detail-images">
        <div className="main-image">
          <img src={goods.images[currentImage]} alt={goods.name} />
        </div>
        <div className="image-thumbnails">
          {goods.images.map((img, index) => (
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
          <span className="original-price">¥{goods.originalPrice}</span>
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
        <button className="footer-btn buy">立即购买</button>
        <button className="footer-btn add-cart">加入购物车</button>
      </div>
    </div>
  )
}

export default GoodsDetail